import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StoreDetail from "@/app/butikker/[slug]/store-detail";
import StoreSeoContent from "@/components/store-seo-content";
import { STORES, getStore } from "@/lib/stores";
import { getStoreSeoContentEn } from "@/lib/store-seo-content-en";
import {
  LOCALIZED_LOCALES,
  danishArabicAlternates,
  isLocalizedLocale,
  languageAlternates,
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
  const seo = locale === "en" ? getStoreSeoContentEn(store.slug) : undefined;
  const title = seo?.title ?? storeTitle(store.name, locale);
  const description = seo?.description ?? store.description[locale];
  const url = localeUrl(locale, `/butikker/${store.slug}`);
  return {
    title: seo ? { absolute: seo.title } : title,
    description,
    alternates: {
      canonical: url,
      languages:
        locale === "en" && !seo
          ? danishArabicAlternates(`/butikker/${store.slug}`)
          : languageAlternates(`/butikker/${store.slug}`),
    },
    robots:
      locale === "en" && !seo
        ? { index: false, follow: true }
        : { index: true, follow: true },
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
  const seo = lang === "en" ? getStoreSeoContentEn(store.slug) : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo?.title ?? storeTitle(store.name, locale),
    description: seo?.description ?? store.description[lang],
    url,
    inLanguage: lang === "ar" ? "ar" : "en",
    dateModified: store.checkedAt,
    publisher: {
      "@type": "Organization",
      name: "TilbudJagt.dk",
      url: "https://www.tilbudjagt.dk/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tilbudjagt.dk/icon.png",
      },
    },
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
  const faqJsonLd = seo
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: seo.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <StoreDetail store={store} initialLang={lang} forcedLang>
        {seo && (
          <StoreSeoContent
            storeName={store.name}
            slug={store.slug}
            content={seo}
            lang="en"
          />
        )}
      </StoreDetail>
    </>
  );
}
