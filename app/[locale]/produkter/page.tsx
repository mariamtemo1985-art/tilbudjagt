import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductsPage from "@/components/pages/products-page";
import {
  PAGE_META,
  isLocalizedLocale,
  languageAlternates,
  localeUrl,
} from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = PAGE_META.products[locale];
  const url = localeUrl(locale, "/produkter");
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url, languages: languageAlternates("/produkter") },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      title: meta.title,
      description: meta.description,
      url,
    },
  };
}

export default async function LocalizedProductsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  return <ProductsPage searchParams={searchParams} lang={locale} />;
}
