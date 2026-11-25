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

const isValidDeal = (deal: Deal) =>
  Boolean(deal.image && deal.url) &&
  Number.isFinite(deal.price) &&
  Number.isFinite(deal.oldPrice) &&
  deal.oldPrice > deal.price;

/**
 * Pick one strong current deal per partner store, then fill up with the next
 * best offers. The verified coffee-machine deal stays first as the visual lead.
 * This keeps the strip varied while showing more than one screen of products.
 */
export function getFeaturedDeals(limit = 20): Deal[] {
  const byStore = new Map<string, Deal>();
  const sorted = [...DEALS].sort((a, b) => b.discount - a.discount);

  for (const deal of sorted) {
    if (!isValidDeal(deal) || deal.discount < 20) continue;
    if (!byStore.has(deal.storeSlug)) byStore.set(deal.storeSlug, deal);
  }

  const unique = [...byStore.values()];
  const used = new Set(unique.map((deal) => `${deal.storeSlug}|${deal.title}`));
  const extras = sorted
    .filter(
      (deal) =>
        isValidDeal(deal) &&
        deal.discount >= 20 &&
        !used.has(`${deal.storeSlug}|${deal.title}`),
    )
    .slice(0, Math.max(0, limit - unique.length));
  const pool = [...unique, ...extras];

  // Lead with the verified coffee-machine deal: it is the clearest visual example
  // of the product-price strip and gives the section a strong first card.
  const lead = pool.find((deal) => deal.storeSlug === "proshop");
  const ordered = lead
    ? [lead, ...pool.filter((deal) => deal !== lead)]
    : pool;

  return ordered.slice(0, limit);
}
