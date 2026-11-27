import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidesPage from "@/components/pages/guides-page";
import {
  PAGE_META,
  isLocalizedLocale,
  danishArabicAlternates,
  localeUrl,
} from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = PAGE_META.guides[locale];
  const url = localeUrl(locale, "/guides");
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url, languages: danishArabicAlternates("/guides") },
    robots:
      locale === "en"
        ? { index: false, follow: true }
        : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      title: meta.title,
      description: meta.description,
      url,
    },
  };
}

export default async function LocalizedGuidesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  return <GuidesPage lang={locale} />;
}
