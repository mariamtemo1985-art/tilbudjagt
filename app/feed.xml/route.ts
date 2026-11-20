import { getPublishedGuides } from "@/lib/guides";

const SITE = "https://www.tilbudjagt.dk";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function pubDate(value?: string): string {
  const date = value ? new Date(`${value}T00:00:00+01:00`) : new Date("2026-11-19T00:00:00+01:00");
  return Number.isNaN(date.getTime()) ? new Date("2026-11-19T00:00:00+01:00").toUTCString() : date.toUTCString();
}

export async function GET() {
  const guides = [...getPublishedGuides()].sort((a, b) =>
    (b.publishAt ?? "").localeCompare(a.publishAt ?? ""),
  );

  const items = guides
    .map((guide) => {
      const url = `${SITE}/guides/${guide.slug}`;
      return [
        "<item>",
        `<title>${escapeXml(guide.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<description>${escapeXml(guide.description)}</description>`,
        `<pubDate>${pubDate(guide.publishAt)}</pubDate>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "<title>TilbudJagt.dk – Guides</title>",
    `<link>${SITE}/guides</link>`,
    "<description>Praktiske guides til at forstå tilbud, priser og gode køb i Danmark.</description>",
    "<language>da-DK</language>",
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `<atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "</channel>",
    "</rss>",
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
