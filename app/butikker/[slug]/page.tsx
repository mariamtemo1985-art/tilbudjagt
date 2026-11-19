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
  return {
    title: `${store.name} – butiksinfo`,
    description: store.description.da,
    alternates: { canonical: `https://tilbudjagt.dk/butikker/${store.slug}` },
  };
}

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();
  return <StoreDetail store={store} />;
}
