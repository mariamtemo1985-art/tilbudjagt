// Verified sales-commission percentages per store slug (percent of the sale,
// not per click). Source: affiliate network program pages, checked 2026-11-25.
// Only stores with a verified rate are listed; unlisted partners rank after them.
export const STORE_COMMISSIONS: Record<string, number> = {
  goldi: 30,
  kidskitchen: 15,
  hjemmely: 15,
  kurvemageren: 15,
  "maet-modig": 15,
  goblend: 12,
  "my-little-nordic": 12,
  matrivo: 12,
  greenvibe: 10,
  copenhagenpure: 30,
  deepbalance: 25,
  kispus: 25,
  offi: 21,
  "kitchen-gadget": 20,
  kirlund: 20,
  brusefilteret: 20,
  "care-copenhagen": 20,
  beauty4me: 20,
  "din-printer": 18,
  bymoller: 15,
  hugcare: 15,
  hydrolife: 15,
  nobllife: 15,
  mysports: 15,
  "fit-fun": 15,
  "billige-teste": 15,
  soundliving: 14,
  "skeen-piskeriset": 14,
  flicks: 12,
  topsko: 12,
  batteribyen: 10,
  retrotrojer: 10,
  moebelsalg: 8,
  gucca: 6.25,
  "okologisk-supermarked": 5,
  proshop: 4,
};

export function getStoreCommission(slug: string): number {
  return STORE_COMMISSIONS[slug] ?? 0;
}

/** Highest verified commission first; unknown rates after known ones, then by name. */
export function sortStoresByCommission<T extends { slug: string; name: string }>(
  stores: T[],
): T[] {
  return [...stores].sort(
    (a, b) =>
      getStoreCommission(b.slug) - getStoreCommission(a.slug) ||
      a.name.localeCompare(b.name, "da"),
  );
}
