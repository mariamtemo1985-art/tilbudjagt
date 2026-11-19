#!/usr/bin/env node
/**
 * Kontrollerer TilbudJagts partnerlinks uden at åbne butikkerne manuelt.
 *
 * Brug:
 *   node scripts/check-affiliate-links.mjs
 *   node scripts/check-affiliate-links.mjs --all
 *
 * --all kontrollerer også de direkte butikslinks (directory).
 *
 * Scriptet bruger kun Node's indbyggede moduler. Et link markeres som:
 *   OK      = HTTP 2xx/3xx efter redirects
 *   WARN    = 403/429/503 (typisk bot-beskyttelse) eller ukendt netværk
 *   FAIL    = forbindelsesfejl, 4xx/5xx eller manglende tracking-parametre
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const STORE_FILE = resolve(process.cwd(), "content/stores.json");
const CHECK_ALL = process.argv.includes("--all");
const TIMEOUT_MS = 12_000;
const CONCURRENCY = 6;
const AWIN_AFFILIATE_ID = "3155813";
const PARTNER_ADS_ID = "58143";

const stores = JSON.parse(readFileSync(STORE_FILE, "utf8"));

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function validateAffiliateUrl(store, url) {
  const errors = [];
  const warnings = [];
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return { errors: ["Ugyldig URL"], warnings };
  }

  if (parsed.protocol !== "https:") errors.push("Linket er ikke HTTPS");

  const host = parsed.hostname.toLowerCase();
  const network = (store.network || "").toLowerCase();

  if (network === "awin" || host.includes("awin1.com")) {
    const awinmid = parsed.searchParams.get("awinmid");
    const awinaffid = parsed.searchParams.get("awinaffid");
    const ued = parsed.searchParams.get("ued");
    if (!awinmid) errors.push("Mangler awinmid");
    if (!awinaffid) errors.push("Mangler awinaffid");
    else if (awinaffid !== AWIN_AFFILIATE_ID) {
      errors.push(`Forkert awinaffid (${awinaffid})`);
    }
    if (!ued) errors.push("Mangler ued (destination)");
    else {
      const destination = decode(ued);
      if (!/^https?:\/\//i.test(destination)) {
        errors.push("ued er ikke en gyldig destination");
      }
    }
  } else if (network === "partner-ads" || host.includes("partner-ads.com")) {
    const partnerid = parsed.searchParams.get("partnerid");
    const bannerid = parsed.searchParams.get("bannerid");
    if (!partnerid) errors.push("Mangler partnerid");
    else if (partnerid !== PARTNER_ADS_ID) {
      errors.push(`Forkert partnerid (${partnerid})`);
    }
    if (!bannerid) errors.push("Mangler bannerid");
    else if (!/^\d+$/.test(bannerid)) errors.push("bannerid er ikke numerisk");
  } else if (store.status === "partner") {
    warnings.push(`Ukendt netværk: ${store.network || "ikke angivet"}`);
  }

  return { errors, warnings, parsed };
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "TilbudJagt-LinkChecker/1.0 (+https://www.tilbudjagt.dk; support@tilbudjagt.dk)",
        accept: "text/html,application/xhtml+xml",
        "accept-language": "da-DK,da;q=0.9,en;q=0.7",
      },
    });
    // Vi har kun brug for status og endelig URL, ikke hele siden.
    try {
      await response.body?.cancel();
    } catch {
      // Ignorer fejl ved annullering af body.
    }
    return {
      status: response.status,
      finalUrl: response.url,
      redirected: response.redirected,
    };
  } catch (error) {
    return {
      status: 0,
      finalUrl: "",
      redirected: false,
      error: error?.name === "AbortError" ? "Timeout" : String(error?.message || error),
    };
  } finally {
    clearTimeout(timer);
  }
}

function classify(store, url, result) {
  const { errors, warnings } = validateAffiliateUrl(store, url);
  const status = result.status;
  let level = "OK";
  const notes = [];

  if (errors.length) {
    level = "FAIL";
    notes.push(...errors);
  }
  if (warnings.length) {
    if (level === "OK") level = "WARN";
    notes.push(...warnings);
  }
  if (!status) {
    // En timeout/forbindelsesfejl beviser ikke, at linket er dødt.
    level = "WARN";
    notes.push(`Ikke verificeret: ${result.error || "ingen HTTP-status"}`);
  } else if (status >= 400) {
    // 403/429/503 er ofte bot-beskyttelse, ikke et dødt link.
    if ([403, 429, 503].includes(status) && level !== "FAIL") level = "WARN";
    else level = "FAIL";
    notes.push(`HTTP ${status}`);
  } else if (status >= 300) {
    level = "WARN";
    notes.push(`HTTP ${status} efter redirect`);
  } else {
    notes.push(`HTTP ${status}`);
  }

  return { level, notes, finalUrl: result.finalUrl, redirected: result.redirected };
}

async function runPool(items, worker, limit) {
  const results = new Array(items.length);
  let next = 0;
  async function runner() {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, runner));
  return results;
}

const targets = stores
  .filter((store) => (CHECK_ALL ? true : store.status === "partner"))
  .map((store) => {
    const url = store.status === "partner" ? store.affiliateUrl : store.website;
    return { store, url };
  })
  .filter(({ url }) => typeof url === "string" && url.length > 0);

if (!targets.length) {
  console.error("Ingen links at kontrollere. Tjek content/stores.json.");
  process.exit(1);
}

console.log(`Kontrollerer ${targets.length} links (${CHECK_ALL ? "alle butikker" : "kun partnere"})...\n`);

const results = await runPool(
  targets,
  async ({ store, url }) => {
    const result = await checkUrl(url);
    const checked = classify(store, url, result);
    return { store, url, ...checked };
  },
  CONCURRENCY,
);

const counts = { OK: 0, WARN: 0, FAIL: 0 };
for (const row of results) {
  counts[row.level]++;
  const icon = row.level === "OK" ? "✓" : row.level === "WARN" ? "!" : "✗";
  const redirect = row.redirected ? ` → ${row.finalUrl}` : "";
  console.log(`${icon} ${row.level.padEnd(4)} ${row.store.name} (${row.store.slug})`);
  console.log(`  ${row.url}${redirect}`);
  console.log(`  ${row.notes.join(" · ")}`);
}

console.log(`\nResultat: ${counts.OK} OK, ${counts.WARN} WARN, ${counts.FAIL} FAIL.`);
if (counts.FAIL > 0) process.exitCode = 1;
