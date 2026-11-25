import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/pages/home-page";
import {
  PAGE_META,
  isLocalizedLocale,
  languageAlternates,
  localeUrl,
} from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = PAGE_META.home[locale];
  const url = localeUrl(locale, "/");
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      title: meta.title,
      description: meta.description,
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: meta.title }],
    },
  };
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  return <HomePage initialLang={locale} forcedLang />;
}
