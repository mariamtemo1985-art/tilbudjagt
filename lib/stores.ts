import rawStores from "@/content/stores.json";

export type StoreCategory =
  | "dagligvarer"
  | "elektronik"
  | "hjem"
  | "mode"
  | "skoenhed"
  | "sport"
  | "stormagasin"
  | "pleje";

export type StoreNetwork = "Awin" | "Adtraction" | "Partner-ads" | "Adservice";

/**
 * partner   = godkendt partneraftale; linket er et tracking-link og skal mærkes som reklame.
 * directory = butikken findes, men der er ingen godkendt aftale; linket er et almindeligt
 *             link uden provision og må ikke præsenteres som et tilbud.
 */
export type StoreStatus = "partner" | "directory";

export type Store = {
  slug: string;
  name: string;
  category: StoreCategory;
  status: StoreStatus;
  website: string;
  network?: StoreNetwork;
  affiliateUrl?: string;
  description: { da: string; en: string; ar: string };
  checkedAt?: string;
};

export const STORE_CATEGORIES: Record<
  StoreCategory,
  { da: string; en: string; ar: string }
> = {
  dagligvarer: { da: "Dagligvarer", en: "Groceries", ar: "مواد غذائية" },
  elektronik: { da: "Elektronik", en: "Electronics", ar: "إلكترونيات" },
  hjem: { da: "Hjem & bolig", en: "Home", ar: "المنزل" },
  mode: { da: "Mode", en: "Fashion", ar: "أزياء" },
  skoenhed: { da: "Skønhed", en: "Beauty", ar: "جمال" },
  sport: { da: "Sport & fritid", en: "Sports", ar: "رياضة" },
  stormagasin: { da: "Stormagasin", en: "Department store", ar: "متجر شامل" },
  pleje: { da: "Personlig pleje", en: "Personal care", ar: "العناية الشخصية" },
};

export const STORES: Store[] = rawStores as Store[];

export function getStore(slug: string): Store | undefined {
  return STORES.find((store) => store.slug === slug);
}

export function isAffiliateLink(store: Store): boolean {
  return store.status === "partner" && Boolean(store.affiliateUrl);
}
