import type { MetadataRoute } from "next";
import productsMeta from "@/content/products-meta.json";
import { DEAL_CATEGORIES } from "@/lib/deal-categories";
import { getPublishedGuides } from "@/lib/guides";
import { STORES } from "@/lib/stores";
import {
  danishArabicAlternates,
  languageAlternates,
  localeUrl,
  type Locale,
} from "@/lib/i18n";

export const revalidate = 3600;

const FALLBACK_DATE = new Date("2026-11-19T00:00:00+01:00");

function safeDate(value?: string): Date {
  if (!value) return FALLBACK_DATE;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? FALLBACK_DATE : parsed;
}

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

function translatedPages(
  path: string,
  lastModified: Date,
  changeFrequency: ChangeFrequency,
  priority: number,
  languages: Record<string, string>,
  locales: Locale[] = ["da", "en", "ar"],
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localeUrl(locale, path),
    lastModified,
    changeFrequency,
    priority: locale === "da" ? priority : Math.max(0.3, priority - 0.1),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const productDate = safeDate(productsMeta.updatedAt);
  const guides = getPublishedGuides();
  const basePages = [
    ...translatedPages("/", FALLBACK_DATE, "daily", 1, languageAlternates("/")),
    ...translatedPages("/butikker", FALLBACK_DATE, "weekly", 0.9, languageAlternates("/butikker")),
    ...translatedPages("/produkter", productDate, "daily", 0.9, languageAlternates("/produkter")),
    ...translatedPages("/rabatkoder", FALLBACK_DATE, "daily", 0.9, languageAlternates("/rabatkoder")),
    ...translatedPages(
      "/guides",
      FALLBACK_DATE,
      "weekly",
      0.8,
      danishArabicAlternates("/guides"),
      ["da", "ar"],
    ),
  ];
  const guidePages = guides.flatMap((guide) =>
    translatedPages(
      `/guides/${guide.slug}`,
      safeDate(guide.publishAt),
      "monthly",
      0.6,
      danishArabicAlternates(`/guides/${guide.slug}`),
      ["da", "ar"],
    ),
  );
  const storePages = STORES.flatMap((store) =>
    translatedPages(
      `/butikker/${store.slug}`,
      safeDate(store.checkedAt),
      "monthly",
      0.6,
      languageAlternates(`/butikker/${store.slug}`),
    ),
  );
  const categoryPages: MetadataRoute.Sitemap = [
    {
      url: "https://www.tilbudjagt.dk/tilbud",
      lastModified: productDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...DEAL_CATEGORIES.map((category) => ({
      url: `https://www.tilbudjagt.dk/tilbud/${category.slug}`,
      lastModified: productDate,
      changeFrequency: "daily" as ChangeFrequency,
      priority: 0.8,
    })),
  ];
  const danishOnly: MetadataRoute.Sitemap = [
    {
      url: "https://www.tilbudjagt.dk/annoncering",
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://www.tilbudjagt.dk/about.html",
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: "https://www.tilbudjagt.dk/contact.html",
      lastModified: FALLBACK_DATE,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: "https://www.tilbudjagt.dk/privacy.html",
      lastModified: FALLBACK_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.tilbudjagt.dk/vilkaar.html",
      lastModified: FALLBACK_DATE,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: "https://www.tilbudjagt.dk/cookies.html",
      lastModified: FALLBACK_DATE,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  return [...basePages, ...guidePages, ...storePages, ...categoryPages, ...danishOnly];
}
