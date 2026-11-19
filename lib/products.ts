import raw from "@/content/products.json";
import meta from "@/content/products-meta.json";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  url: string;
  store: string;
  description?: string;
};

export const PRODUCTS: Product[] = raw as Product[];

export const PRODUCT_CATEGORIES: string[] = Array.from(
  new Set(PRODUCTS.map((p) => p.category).filter(Boolean))
).sort((a, b) => a.localeCompare(b, "da"));

export const PRODUCTS_UPDATED = new Date(meta.updatedAt).toLocaleDateString("da-DK", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
