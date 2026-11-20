import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { STORES, getStore } from "@/lib/stores";
import StoreDetail from "./store-detail";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STORES.map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) return { title: "Butik ikke fundet" };
  const url = `https://www.tilbudjagt.dk/butikker/${store.slug}`;
  return {
    title: `${store.name} – butiksinfo`,
    description: store.description.da,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: `${store.name} – butiksinfo`,
      description: store.description.da,
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${store.name} – butiksinfo`,
    description: store.description.da,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreDetail store={store} />
    </>
  );
}
