import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STORES, getStore } from "@/lib/stores";
import StoreDetail from "./store-detail";
import StoreSeoContent from "@/components/store-seo-content";
import { getStoreSeoContent } from "@/lib/store-seo-content";
import { languageAlternates } from "@/lib/i18n";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STORES.map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) return { title: "Butik ikke fundet" };
  const url = `https://www.tilbudjagt.dk/butikker/${store.slug}`;
  const seo = getStoreSeoContent(store.slug);
  const title = seo?.title ?? `${store.name} – butiksinfo`;
  const description = seo?.description ?? store.description.da;
  return {
    title: seo ? { absolute: seo.title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(`/butikker/${store.slug}`),
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${store.name} på TilbudJagt.dk`,
        },
      ],
    },
  };
}

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();
  const url = `https://www.tilbudjagt.dk/butikker/${store.slug}`;
  const seo = getStoreSeoContent(store.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo?.title ?? `${store.name} – butiksinfo`,
    description: seo?.description ?? store.description.da,
    url,
    inLanguage: "da-DK",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Forside",
          item: "https://www.tilbudjagt.dk/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Butikker",
          item: "https://www.tilbudjagt.dk/butikker",
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
      <StoreDetail store={store}>
        {seo && (
          <StoreSeoContent
            storeName={store.name}
            slug={store.slug}
            content={seo}
          />
        )}
      </StoreDetail>
    </>
  );
}
