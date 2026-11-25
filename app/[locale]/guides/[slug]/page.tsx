import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuidePage from "@/components/pages/guide-page";
import { getGuide, getPublishedGuides } from "@/lib/guides";
import { localizeGuide } from "@/lib/guides-i18n";
import {
  danishArabicAlternates,
  localeUrl,
} from "@/lib/i18n";

export const dynamicParams = false;

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ locale: "ar", slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== "ar") return {};
  const source = getGuide(slug);
  if (!source) return { title: "الدليل غير موجود" };
  const guide = localizeGuide(source, "ar");
  const url = localeUrl("ar", `/guides/${guide.slug}`);
  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: url,
      languages: danishArabicAlternates(`/guides/${guide.slug}`),
    },
    openGraph: {
      type: "article",
      locale: "ar_AR",
      title: guide.title,
      description: guide.description,
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: guide.title }],
    },
  };
}

export default async function LocalizedGuidePage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (locale !== "ar") notFound();
  if (!getGuide(slug)) notFound();
  return <GuidePage slug={slug} lang="ar" />;
}
