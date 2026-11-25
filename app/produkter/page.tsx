import ProductsPage from "@/components/pages/products-page";

export { metadata } from "@/components/pages/products-page";

type PageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function Page({ searchParams }: PageProps) {
  return <ProductsPage searchParams={searchParams} lang="da" />;
}
