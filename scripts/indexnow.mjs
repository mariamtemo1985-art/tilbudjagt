#!/usr/bin/env node

const HOST = "www.tilbudjagt.dk";
const SITE = `https://${HOST}`;
const KEY = process.env.INDEXNOW_KEY || "b54f68221c279d4187e499f5638abc1c";
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function readSitemap() {
  let lastStatus = 0;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    const response = await fetch(`${SITE}/sitemap.xml`, { cache: "no-store" });
    lastStatus = response.status;
    if (response.ok) {
      const xml = await response.text();
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((match) => match[1].trim())
        .filter((url) => url.startsWith(`${SITE}/`));
      if (urls.length >= 50) return urls;
    }
    console.log(`Sitemap ikke klar endnu (status ${lastStatus}, forsøg ${attempt}/12).`);
    await sleep(20000);
  }
  throw new Error(`Kunne ikke hente en komplet sitemap (sidste status ${lastStatus}).`);
}

async function main() {
  const urls = await readSitemap();
  const unique = [...new Set(urls)];
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: unique,
    }),
  });
  const body = await response.text();
  console.log(`IndexNow status=${response.status} urls=${unique.length}`);
  if (body) console.log(body.slice(0, 300));
  if (![200, 202].includes(response.status)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
