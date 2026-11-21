#!/usr/bin/env node
/**
 * Import a curated first batch of Gucca.dk products from the approved
 * Partner-ads feed. The feed is streamed and never stored on disk.
 *
 * Gucca's category paths use "|" separators (for example
 * "underholdning|film|dvd|komedie"), so they are mapped to the same
 * human-readable categories used by the rest of the catalogue.
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const FEED = {
  slug: "gucca",
  store: "Gucca.dk",
  max: 1500,
  url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=58143&bannerid=94931&feedid=2573",
};

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&nbsp;/gi, " ");
}

function decodeUrl(value) {
  // Gucca's feed double-escapes the query string in vareurl.
  return decodeEntities(decodeEntities(value));
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
  return decodeUrl(match[1]).replace(/\s+/g, "").trim();
}

function price(value) {
  const normalized = value
    .replace(/\s/g, "")
    .replace(/\u00a0/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".");
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

function capitalize(value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function guccaCategory(raw) {
  const parts = raw
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
  return parts.length > 1 ? capitalize(parts[1]) : "Gucca";
}

function parseBlock(block, seen) {
  const name = text(block, "produktnavn");
  const url = urlText(block, "vareurl");
  const image = urlText(block, "billedurl");
  const currentPrice = price(text(block, "nypris"));
  const rawId = text(block, "produktid") || name;
  const stock = text(block, "lagerantal").toLowerCase();
  if (!name || !url || !image || currentPrice <= 0) return null;
  if (stock === "0" || stock.includes("out of stock") || stock.includes("udsolgt")) return null;
  const id = `${FEED.slug}-${cleanId(rawId)}`;
  const key = `${id}|${url}`;
  if (seen.has(key)) return null;
  seen.add(key);
  const brand = text(block, "brand") || FEED.store;
  const description = text(block, "beskrivelse").slice(0, 220);
  return {
    id,
    name,
    brand,
    category: guccaCategory(text(block, "kategorinavn")),
    price: currentPrice,
    image,
    url,
    store: FEED.store,
    ...(description ? { description } : {}),
  };
}

async function fetchFeed() {
  const response = await fetch(FEED.url, {
    headers: {
      "user-agent": "TilbudJagt/1.0 (support@tilbudjagt.dk)",
      accept: "application/xml,text/xml,*/*",
    },
    signal: AbortSignal.timeout(300_000),
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
    while (products.length < FEED.max) {
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
      while (products.length < FEED.max) {
        const match = buffer.match(/<produkt>[\s\S]*?<\/produkt>/i);
        if (!match) break;
        const end = buffer.indexOf(match[0]) + match[0].length;
        buffer = buffer.slice(end);
        const product = parseBlock(match[0], seen);
        if (product) products.push(product);
      }
      if (buffer.length > 2_000_000) buffer = buffer.slice(-200_000);
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
  if (products.length === 0 && readError) throw readError;
  return products;
}

async function main() {
  const products = await fetchFeed();
  if (products.length < 100) {
    throw new Error(`Only ${products.length} Gucca products parsed; refusing to update.`);
  }
  const catalogPath = resolve(root, "content/products.json");
  const metaPath = resolve(root, "content/products-meta.json");
  const previous = JSON.parse(await readFile(catalogPath, "utf8"));
  const preserved = previous.filter((product) => !product?.id?.startsWith("gucca-"));
  const merged = [...preserved, ...products];
  let meta = {};
  try {
    meta = JSON.parse(await readFile(metaPath, "utf8"));
  } catch {
    // No metadata yet; create it below.
  }
  const stores = { ...(meta.stores ?? {}), gucca: products.length };
  await writeFile(catalogPath, `${JSON.stringify(merged)}\n`);
  await writeFile(
    metaPath,
    `${JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        total: merged.length,
        stores,
        errors: [],
      },
      null,
      2,
    )}\n`,
  );
  console.log(`Gucca: ${products.length} products`);
  console.log(`Catalogue: ${merged.length} products`);
  console.log(`Gucca categories: ${JSON.stringify(
    products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    }, {}),
  )}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
