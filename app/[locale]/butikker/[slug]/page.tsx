import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StoreDetail from "@/app/butikker/[slug]/store-detail";
import { STORES, getStore } from "@/lib/stores";
import {
  LOCALIZED_LOCALES,
  isLocalizedLocale,
  languageAlternates,
  localePath,
  localeUrl,
  type Locale,
} from "@/lib/i18n";

export const dynamicParams = false;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALIZED_LOCALES.flatMap((locale) =>
    STORES.map((store) => ({ locale, slug: store.slug })),
  );
}

function storeTitle(name: string, locale: "en" | "ar") {
  return locale === "ar" ? `${name} – معلومات المتجر` : `${name} – store information`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const store = getStore(slug);
  if (!store) return { title: locale === "ar" ? "المتجر غير موجود" : "Store not found" };
  const title = storeTitle(store.name, locale);
  const description = store.description[locale];
  const url = localeUrl(locale, `/butikker/${store.slug}`);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(`/butikker/${store.slug}`),
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      title,
      description,
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${store.name} – TilbudJagt.dk` }],
    },
  };
}

export default async function LocalizedStorePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  const store = getStore(slug);
  if (!store) notFound();
  const lang = locale as Locale;
  const url = localeUrl(lang, `/butikker/${store.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: storeTitle(store.name, locale),
    description: store.description[lang],
    url,
    inLanguage: lang === "ar" ? "ar" : "en",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: lang === "ar" ? "الرئيسية" : "Home",
          item: localeUrl(lang, "/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: lang === "ar" ? "المتاجر" : "Stores",
          item: localeUrl(lang, "/butikker"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: store.name,
          item: url,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreDetail store={store} initialLang={lang} forcedLang />
    </>
  );
}
