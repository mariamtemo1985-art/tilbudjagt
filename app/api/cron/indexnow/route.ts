import productsMeta from "@/content/products-meta.json";
import { getPublishedGuides } from "@/lib/guides";
import { STORES } from "@/lib/stores";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE = "https://www.tilbudjagt.dk";
const HOST = "www.tilbudjagt.dk";
const KEY = "b54f68221c279d4187e499f5638abc1c";
const FALLBACK_DATE = "2026-11-19";
const SUPABASE_KEEPALIVE_QUERIES = 5;

async function pingSupabase(): Promise<{
  configured: boolean;
  statuses: number[];
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { configured: false, statuses: [] };
  }

  const endpoint = `${url.replace(/\/+$/, "")}/rest/v1/stores?select=id&limit=1`;
  const statuses: number[] = [];
  for (let i = 0; i < SUPABASE_KEEPALIVE_QUERIES; i += 1) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      statuses.push(response.status);
      await response.text();
    } catch {
      statuses.push(0);
    }
  }
  return { configured: true, statuses };
}

function isoDate(value?: string): string {
  if (!value) return FALLBACK_DATE;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? FALLBACK_DATE : date.toISOString().slice(0, 10);
}

function sitemapUrls(): string[] {
  const urls = [
    `${SITE}/`,
    `${SITE}/butikker`,
    `${SITE}/produkter`,
    `${SITE}/guides`,
    `${SITE}/annoncering`,
    `${SITE}/about.html`,
    `${SITE}/contact.html`,
    `${SITE}/privacy.html`,
    `${SITE}/vilkaar.html`,
    `${SITE}/cookies.html`,
    ...getPublishedGuides().map((guide) => `${SITE}/guides/${guide.slug}`),
    ...STORES.map((store) => `${SITE}/butikker/${store.slug}`),
  ];
  return [...new Set(urls)];
}

export async function GET(request: Request) {
  const expected = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization") || "";
  if (!expected || auth !== `Bearer ${expected}`) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const urls = sitemapUrls();
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE}/${KEY}.txt`,
      urlList: urls,
    }),
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  const supabase = await pingSupabase();

  return Response.json({
    ok: [200, 202].includes(response.status),
    status: response.status,
    submitted: urls.length,
    productsUpdated: isoDate(productsMeta.updatedAt),
    supabase,
  });
}
