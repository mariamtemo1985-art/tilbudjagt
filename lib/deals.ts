import rawDeals from "@/content/deals.json";

export type Deal = {
  store: string;
  storeSlug: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  url: string;
};

export const DEALS = rawDeals as Deal[];

/**
 * Pick one strong current deal per partner store, then sort by discount.
 * This keeps the strip varied instead of showing ten products from one shop.
 */
export function getFeaturedDeals(limit = 12): Deal[] {
  const byStore = new Map<string, Deal>();
  const sorted = [...DEALS].sort((a, b) => b.discount - a.discount);

  for (const deal of sorted) {
    if (!deal.image || !deal.url || !Number.isFinite(deal.price)) continue;
    if (deal.discount < 20) continue;
    if (!byStore.has(deal.storeSlug)) byStore.set(deal.storeSlug, deal);
  }

  return [...byStore.values()].slice(0, limit);
}
