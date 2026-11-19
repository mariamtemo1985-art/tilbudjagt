import raw from "@/content/products.json";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  url: string;
  store: string;
};

export const PRODUCTS: Product[] = raw as Product[];

export const PRODUCT_CATEGORIES: string[] = Array.from(
  new Set(PRODUCTS.map((p) => p.category).filter(Boolean))
).sort((a, b) => a.localeCompare(b, "da"));

export const PRODUCTS_UPDATED = "19. november 2026";
