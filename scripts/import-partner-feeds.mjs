#!/usr/bin/env node
/**
 * Import approved Partner-ads product feeds into content/products.json.
 *
 * The feed URLs are affiliate feed URLs supplied by Partner-ads. They are
 * fetched server-side only; product images stay on the advertiser's CDN.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const FEEDS = [
  {
    slug: "proshop",
    store: "Proshop",
    fallbackCategory: "Elektronik",
    max: 1500,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=67757&feedid=1399",
  },
  {
    slug: "okologisk-supermarked",
    store: "Økologisk-Supermarked",
    fallbackCategory: "Dagligvarer",
    max: 800,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=99972&feedid=2863",
  },
  {
    slug: "offi",
    store: "Offi",
    fallbackCategory: "Printer & blæk",
    max: 800,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=118192&feedid=4459",
  },
  {
    slug: "din-printer",
    store: "Din printer",
    fallbackCategory: "Printer & blæk",
    max: 800,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=114765&feedid=4077",
  },
  {
    slug: "bymoller",
    store: "ByMøller",
    fallbackCategory: "Hjem & luft",
    max: 400,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=115965&feedid=4222",
  },
  {
    slug: "soundliving",
    store: "Soundliving",
    fallbackCategory: "Lyd & billede",
    max: 400,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=112626&feedid=3856",
  },
  {
    slug: "beauty4me",
    store: "Beauty4Me",
    fallbackCategory: "Personlig pleje",
    max: 400,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=111598&feedid=3735",
  },
  {
    slug: "care-copenhagen",
    store: "Care Copenhagen",
    fallbackCategory: "Personlig pleje",
    max: 400,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=117097&feedid=4338",
  },
  {
    slug: "hugcare",
    store: "Hugcare",
    fallbackCategory: "Personlig pleje",
    max: 400,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=117150&feedid=4348",
  },
  {
    slug: "brusefilteret",
    store: "Brusefilteret.dk",
    fallbackCategory: "Bad & filtre",
    max: 300,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=101304&feedid=2939",
  },
  {
    slug: "fit-fun",
    store: "Fit & Fun",
    fallbackCategory: "Sport & sundhed",
    max: 400,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=116722&feedid=4287",
  },
  {
    slug: "flicks",
    store: "Flicks",
    fallbackCategory: "Foto & kamera",
    max: 300,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=116302&feedid=4256",
  },
  {
    slug: "gucca",
    store: "Gucca.dk",
    fallbackCategory: "Stormagasin",
    max: 1500,
    category: guccaCategory,
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=94931&feedid=2573",
  },
];

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

function text(block, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
  const match = block.match(re);
  if (!match) return "";
  return decodeEntities(match[1])
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function urlText(block, tagName) {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
  const match = block.match(re);
  if (!match) return "";
  return decodeEntities(decodeEntities(match[1])).replace(/\s+/g, "").trim();
}

function firstCategory(value, fallback) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (!clean) return fallback;
  const first = clean.split(">")[0].trim();
  if (!first || first.length > 42) return fallback;
  return first;
}

function guccaCategory(value) {
  const parts = value
    .toLowerCase()
    .split(/[|>]/)
    .map((part) => part.trim())
    .filter(Boolean);
  const joined = parts.join(" ");
  if (/(film|tv-serie|dvd|blu-ray)/.test(joined)) return "Film & TV";
  if (/(musik|cd|vinyl)/.test(joined)) return "Musik";
  if (/(bog|bøger|lydbog)/.test(joined)) return "Bøger";
  if (/(spil|gaming|playstation|xbox|nintendo)/.test(joined)) return "Spil";
  if (/(elektronik|computer|mobil|lyd|højttaler|headset)/.test(joined)) return "Elektronik";
  if (/(hjem|bolig|møbel|køkken|have)/.test(joined)) return "Hjem & bolig";
  if (/(gave|gaveartikel|gavekort)/.test(joined)) return "Gaver";
  if (/(sport|fitness|outdoor)/.test(joined)) return "Sport";
  if (/(legetøj|leg)/.test(joined)) return "Legetøj";
  if (/(pleje|skønhed|kosmetik|parfume)/.test(joined)) return "Skønhed & pleje";
  if (/(tøj|mode|sko|accessor)/.test(joined)) return "Mode";
  return parts.length > 1 ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : "Stormagasin";
}

function price(value) {
  const normalized = value.replace(/\s/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  const n = Number.parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}

function cleanId(value) {
  return value
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

function parseBlock(block, feed, seen) {
  const name = text(block, "produktnavn");
  const url = urlText(block, "vareurl");
  const image = urlText(block, "billedurl");
  const currentPrice = price(text(block, "nypris"));
  const rawId = text(block, "produktid") || name;
  const stock = text(block, "lagerantal").toLowerCase();

  if (!name || !url || !image || currentPrice <= 0) return null;
  if (stock === "0" || stock.includes("out of stock") || stock.includes("udsolgt")) return null;

  const id = `${feed.slug}-${cleanId(rawId)}`;
  const key = `${id}|${url}`;
  if (seen.has(key)) return null;
  seen.add(key);

  const category = feed.category
    ? feed.category(text(block, "kategorinavn"))
    : firstCategory(text(block, "kategorinavn"), feed.fallbackCategory);
  const brand = text(block, "brand") || feed.store;
  const description = text(block, "beskrivelse").slice(0, 220);

  return {
    id,
    name,
    brand,
    category,
    price: currentPrice,
    image,
    url,
    store: feed.store,
    ...(description ? { description } : {}),
  };
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: {
      "user-agent": "TilbudJagt/1.0 (support@tilbudjagt.dk)",
      accept: "application/xml,text/xml,*/*",
    },
    signal: AbortSignal.timeout(180_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (!response.body) throw new Error("Feed response has no body");

  const reader = response.body.getReader();
  const decoder = new TextDecoder("iso-8859-1");
  const products = [];
  const seen = new Set();
  let buffer = "";
  let readError = null;

  try {
    while (products.length < feed.max) {
      let chunk;
      try {
        chunk = await reader.read();
      } catch (error) {
        readError = error;
        break;
      }
      const { done, value } = chunk;
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (products.length < feed.max) {
        const match = buffer.match(/<produkt>[\s\S]*?<\/produkt>/i);
        if (!match) break;
        const end = buffer.indexOf(match[0]) + match[0].length;
        buffer = buffer.slice(end);
        const product = parseBlock(match[0], feed, seen);
        if (product) products.push(product);
      }

      // Keep only the tail when a chunk contains a very large non-product header.
      if (buffer.length > 2_000_000) buffer = buffer.slice(-200_000);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }

  if (products.length === 0 && readError) throw readError;
  return products;
}

function interleave(groups) {
  const result = [];
  const longest = Math.max(0, ...groups.map((group) => group.length));
  for (let i = 0; i < longest; i += 1) {
    for (const group of groups) {
      if (group[i]) result.push(group[i]);
    }
  }
  return result;
}

async function main() {
  const groups = [];
  const counts = {};
  const errors = [];

  // Sequential fetching keeps the feed provider happy and avoids memory spikes.
  for (const feed of FEEDS) {
    try {
      const products = await fetchFeed(feed);
      groups.push(products);
      counts[feed.slug] = products.length;
      console.log(`${feed.slug}: ${products.length} products`);
    } catch (error) {
      errors.push(`${feed.slug}: ${error.message}`);
      counts[feed.slug] = 0;
      console.error(`${feed.slug}: ${error.message}`);
    }
  }

  const products = interleave(groups);
  // Awin feeds are imported separately because their URLs contain private API keys.
  // Preserve those products when the weekly Partner-ads refresh runs.
  try {
    const previous = JSON.parse(
      await readFile(resolve(root, "content/products.json"), "utf8"),
    );
    const preserved = previous.filter(
      (product) =>
        product?.id?.startsWith("dyson-") ||
        product?.id?.startsWith("bazta-") ||
        product?.id?.startsWith("gucca-"),
    );
    if (preserved.length) {
      const existingIds = new Set(products.map((product) => product.id));
      for (const product of preserved) {
        if (!existingIds.has(product.id)) {
          products.push(product);
          existingIds.add(product.id);
        }
      }
      counts.dyson = preserved.filter((product) => product.id.startsWith("dyson-")).length;
      counts["bazta-dk"] = preserved.filter((product) => product.id.startsWith("bazta-")).length;
      if (!counts.gucca) {
        counts.gucca = preserved.filter((product) => product.id.startsWith("gucca-")).length;
      }
      console.log(`Preserved ${preserved.length} external feed products`);
    }
  } catch {
    // No previous catalog yet; nothing to preserve.
  }
  if (products.length < 100) {
    throw new Error(`Only ${products.length} products imported; refusing to overwrite data.`);
  }

  const updatedAt = new Date().toISOString();
  await writeFile(resolve(root, "content/products.json"), `${JSON.stringify(products)}\n`);
  await writeFile(
    resolve(root, "content/products-meta.json"),
    `${JSON.stringify({ updatedAt, total: products.length, stores: counts, errors }, null, 2)}\n`,
  );

  console.log(`Wrote ${products.length} products (${errors.length} feed errors).`);
  if (errors.length) console.log(`Errors: ${errors.join(" | ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
