import { NextRequest, NextResponse } from "next/server";
import raw from "@/content/products.json";
import type { Product } from "@/lib/products";

const ALL_PRODUCTS = raw as Product[];

function text(value: string | null): string {
  return (value ?? "").trim();
}

function number(value: string | null, fallback: number, max: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(parsed, max);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = text(params.get("q")).toLowerCase();
  const category = text(params.get("category"));
  const limit = Math.max(1, Math.min(number(params.get("limit"), 48, 96), 96));
  const offset = number(params.get("offset"), 0, ALL_PRODUCTS.length);

  const filtered = ALL_PRODUCTS.filter((product) => {
    if (category && product.category !== category) return false;
    if (!query) return true;
    return (
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description ?? "").toLowerCase().includes(query)
    );
  });

  return NextResponse.json(
    {
      total: filtered.length,
      products: filtered.slice(offset, offset + limit),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
