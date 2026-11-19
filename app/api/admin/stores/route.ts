import { createHash, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { clientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

const OWNER = "mariamtemo1985-art";
const REPO = "tilbudjagt";
const BRANCH = "feature/full-platform-foundation";
const PATH = "content/stores.json";
const CATEGORIES = [
  "dagligvarer",
  "elektronik",
  "hjem",
  "mode",
  "skoenhed",
  "sport",
  "stormagasin",
  "pleje",
];

type Body = {
  store?: {
    name?: unknown;
    slug?: unknown;
    category?: unknown;
    status?: unknown;
    website?: unknown;
    network?: unknown;
    affiliateUrl?: unknown;
    descriptionDa?: unknown;
  };
};

function text(value: unknown, max = 240): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ø/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function httpsUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeEqual(a: string, b: string): boolean {
  const left = createHash("sha256").update(a).digest();
  const right = createHash("sha256").update(b).digest();
  return timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  const limited = rateLimit(`admin:${clientIp(request)}`, 10, 10 * 60 * 1000);
  if (!limited.ok) return tooManyRequests(limited.retryAfter);
  if (Number(request.headers.get("content-length") || 0) > 10_000) {
    return NextResponse.json({ error: "Forespørgslen er for stor." }, { status: 413 });
  }
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  const token = process.env.GITHUB_ADMIN_TOKEN ?? "";
  const suppliedPassword = request.headers.get("x-admin-password") ?? "";
  if (!expectedPassword || !safeEqual(suppliedPassword, expectedPassword)) {
    return NextResponse.json({ error: "Forkert adgangskode." }, { status: 401 });
  }
  if (!token) {
    return NextResponse.json({ error: "Serveren mangler GitHub-nøglen." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as Body | null;
  const input = body?.store ?? {};
  const name = text(input.name, 80);
  const slug = slugify(text(input.slug, 80) || name);
  const category = text(input.category, 30);
  const status = text(input.status, 20);
  const website = httpsUrl(text(input.website, 300));
  const affiliateUrlRaw = text(input.affiliateUrl, 500);
  const affiliateUrl = affiliateUrlRaw ? httpsUrl(affiliateUrlRaw) : undefined;
  const descriptionDa = text(input.descriptionDa, 400);
  const network = text(input.network, 30) || undefined;

  if (!name || !slug) {
    return NextResponse.json({ error: "Butiksnavn mangler." }, { status: 400 });
  }
  if (!CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Vælg en gyldig kategori." }, { status: 400 });
  }
  if (status !== "partner" && status !== "directory") {
    return NextResponse.json({ error: "Vælg partner eller direkte link." }, { status: 400 });
  }
  if (!website) {
    return NextResponse.json(
      { error: "Hjemmesiden skal være en gyldig https-adresse." },
      { status: 400 },
    );
  }
  if (status === "partner" && !affiliateUrl) {
    return NextResponse.json(
      { error: "En partner skal have et gyldigt https-affiliatelink." },
      { status: 400 },
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "TilbudJagt-Admin",
  };

  const repoResponse = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
    headers,
    cache: "no-store",
  });
  if (!repoResponse.ok) {
    return NextResponse.json(
      { error: "GitHub afviste token, eller det har ikke adgang til repository." },
      { status: 403 },
    );
  }

  const fileResponse = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`,
    { headers, cache: "no-store" },
  );
  if (!fileResponse.ok) {
    return NextResponse.json({ error: "Kunne ikke læse stores.json." }, { status: 502 });
  }
  const file = (await fileResponse.json()) as { content?: string; sha?: string };
  if (!file.content || !file.sha) {
    return NextResponse.json({ error: "stores.json er tom eller utilgængelig." }, { status: 502 });
  }

  let list: Record<string, unknown>[];
  try {
    list = JSON.parse(Buffer.from(file.content, "base64").toString("utf8"));
  } catch {
    return NextResponse.json({ error: "stores.json kunne ikke læses." }, { status: 502 });
  }
  if (!Array.isArray(list)) list = [];

  const entry = {
    slug,
    name,
    category,
    status,
    website,
    ...(network ? { network } : {}),
    ...(affiliateUrl ? { affiliateUrl } : {}),
    description: {
      da: descriptionDa || `${name} i TilbudJagts butiksoversigt.`,
      en: `${name} in the TilbudJagt store directory.`,
      ar: `${name} في دليل متاجر TilbudJagt.`,
    },
    ...(status === "partner" ? { checkedAt: new Date().toISOString() } : {}),
  };

  const index = list.findIndex((item) => item && item.slug === slug);
  const action = index >= 0 ? "opdaterede" : "tilføjede";
  if (index >= 0) list[index] = entry;
  else list.push(entry);

  const putResponse = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
    {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Admin ${action} butik: ${name}`,
        content: Buffer.from(JSON.stringify(list, null, 2) + "\n").toString("base64"),
        branch: BRANCH,
        sha: file.sha,
      }),
    },
  );

  if (!putResponse.ok) {
    const detail = await putResponse.text();
    return NextResponse.json(
      { error: "GitHub kunne ikke gemme ændringen.", detail: detail.slice(0, 200) },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, slug, action });
}
