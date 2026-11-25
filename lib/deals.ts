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
 * Pick one strong current deal per partner store, then put the verified
 * coffee-machine deal first as the visual lead.
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

  const unique = [...byStore.values()];
  // Lead with the verified coffee-machine deal: it is the clearest visual example
  // of the product-price strip and gives the section a strong first card.
  const lead = unique.find((deal) => deal.storeSlug === "proshop");
  const ordered = lead
    ? [lead, ...unique.filter((deal) => deal.storeSlug !== "proshop")]
    : unique;

  return ordered.slice(0, limit);
}
