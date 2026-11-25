import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocaleDocument from "@/components/locale-document";
import {
  PAGE_META,
  isLocalizedLocale,
  type Locale,
} from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocalizedLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const meta = PAGE_META.home[locale];
  return {
    title: {
      default: meta.title,
      template: "%s | TilbudJagt.dk",
    },
    description: meta.description,
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      siteName: "TilbudJagt.dk",
      title: meta.title,
      description: meta.description,
    },
    other: {
      google: "notranslate",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();

  return (
    <>
      <LocaleDocument locale={locale} />
      {children}
    </>
  );
}
