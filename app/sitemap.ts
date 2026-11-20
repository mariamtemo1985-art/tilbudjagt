import type { MetadataRoute } from "next";
import productsMeta from "@/content/products-meta.json";
import { getPublishedGuides } from "@/lib/guides";
import { STORES } from "@/lib/stores";

export const revalidate = 3600;

const SITE = "https://www.tilbudjagt.dk";
const FALLBACK_DATE = new Date("2026-11-19T00:00:00+01:00");

function safeDate(value?: string): Date {
  if (!value) return FALLBACK_DATE;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? FALLBACK_DATE : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getPublishedGuides().map((guide) => ({
    url: `${SITE}/guides/${guide.slug}`,
    lastModified: safeDate(guide.publishAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const stores = STORES.map((store) => ({
    url: `${SITE}/butikker/${store.slug}`,
    lastModified: safeDate(store.checkedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${SITE}/`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE}/butikker`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE}/produkter`,
      lastModified: safeDate(productsMeta.updatedAt),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE}/guides`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE}/annoncering`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...guides,
    ...stores,
    {
      url: `${SITE}/about.html`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE}/contact.html`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE}/privacy.html`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE}/vilkaar.html`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE}/cookies.html`,
      lastModified: FALLBACK_DATE,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
