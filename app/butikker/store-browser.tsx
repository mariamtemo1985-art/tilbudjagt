"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, Store as StoreIcon, Tag } from "lucide-react";
import {
  STORE_CATEGORIES,
  STORE_SPECIALTIES,
  getStoreCategoryLabel,
  type Store,
  type StoreCategory,
} from "@/lib/stores";
import StoreLogo from "@/components/store-logo";
import ShareStoreButton from "@/components/ShareStoreButton";
import { sortStoresByCommission } from "@/lib/store-commissions";

type CategoryKey = "alle" | StoreCategory;
type Language = "da" | "en" | "ar";
const LANG_KEY = "tilbudjagt_lang";

const COPY: Record<
  Language,
  {
    all: string;
    supermarkets: string;
    electronicsKicker: string;
    electronicsTitle: string;
    electronicsDescription: (count: number) => string;
    visit: string;
    storeInfo: string;
    share: string;
    shareCopied: string;
    shareText: (name: string) => string;
    shareAria: (name: string) => string;
    sharePrompt: string;
    partner: string;
    direct: string;
    searchPlaceholder: string;
    searchAria: string;
    categoriesAria: string;
    empty: string;
    supermarketKicker: string;
    supermarketTitle: string;
    supermarketDescription: string;
    partnersKicker: string;
    partnersTitle: string;
    partnersDescription: string;
    othersKicker: string;
    othersTitle: string;
    othersDescription: string;
    categoryKicker: string;
    categoryDescription: (label: string) => string;
    featuredKicker: string;
    featuredTitle: string;
    featuredDescription: string;
  }
> = {
  da: {
    all: "Alle",
    supermarkets: "Supermarkeder",
    electronicsKicker: "ELEKTRONIK",
    electronicsTitle: "Elektronik",
    electronicsDescription: (count) =>
      `${count} elektronikbutikker samlet i ét overblik. Brug specialet på kortet til at finde den rigtige type butik.`,
    visit: "Besøg",
    storeInfo: "Butiksinfo",
    share: "Del",
    shareCopied: "Kopieret",
    shareText: (name) => `Se ${name} på TilbudJagt.dk`,
    shareAria: (name) => `Del ${name}`,
    sharePrompt: "Kopiér linket:",
    partner: "Godkendt partner",
    direct: "Direkte link",
    searchPlaceholder: "Søg butik, fx Netto, Elgiganten, JYSK…",
    searchAria: "Søg butik",
    categoriesAria: "Kategorier",
    empty: "Ingen butikker matcher søgningen. Prøv et andet navn eller en anden kategori.",
    supermarketKicker: "DAGLIGVARER",
    supermarketTitle: "Supermarkeder",
    supermarketDescription:
      "Dagligvarebutikker og supermarkeder samlet ét sted. Klik på logoet for at åbne butikken.",
    partnersKicker: "PARTNERE",
    partnersTitle: "Øvrige godkendte partnere",
    partnersDescription:
      "Butikker uden for dagligvarer og elektronik, hvor vi har en godkendt partneraftale. Links er reklame og kan give os provision.",
    othersKicker: "ØVRIGE",
    othersTitle: "Andre butikker",
    othersDescription:
      "Øvrige butikker uden en godkendt partneraftale. Linket går direkte til butikken uden provision.",
    categoryKicker: "KATEGORI",
    categoryDescription: (label) =>
      `Butikker i kategorien ${label}. Klik på et logo for at besøge butikken.`,
    featuredKicker: "UDVALGTE",
    featuredTitle: "Fremhævede partnerbutikker",
    featuredDescription:
      "Et udvalg af vores godkendte partnere samlet øverst. Links er reklame, og vi kan få provision, hvis du køber.",
  },
  en: {
    all: "All",
    supermarkets: "Supermarkets",
    electronicsKicker: "ELECTRONICS",
    electronicsTitle: "Electronics",
    electronicsDescription: (count) =>
      `${count} electronics stores in one overview. Use the specialty label on each card to find the right type of store.`,
    visit: "Visit",
    storeInfo: "Store info",
    share: "Share",
    shareCopied: "Copied",
    shareText: (name) => `Check out ${name} on TilbudJagt.dk`,
    shareAria: (name) => `Share ${name}`,
    sharePrompt: "Copy link:",
    partner: "Approved partner",
    direct: "Direct link",
    searchPlaceholder: "Search a store, e.g. Netto, Elgiganten, JYSK…",
    searchAria: "Search stores",
    categoriesAria: "Categories",
    empty: "No stores match your search. Try another name or category.",
    supermarketKicker: "GROCERIES",
    supermarketTitle: "Supermarkets",
    supermarketDescription:
      "Grocery stores and supermarkets in one place. Click a logo to open the store.",
    partnersKicker: "PARTNERS",
    partnersTitle: "Other approved partners",
    partnersDescription:
      "Stores outside groceries and electronics with an approved partner agreement. Links are advertising and may earn us a commission.",
    othersKicker: "OTHERS",
    othersTitle: "Other stores",
    othersDescription:
      "Other stores without an approved partner agreement. The link goes directly to the store without commission.",
    categoryKicker: "CATEGORY",
    categoryDescription: (label) =>
      `Stores in ${label}. Click a logo to visit the store.`,
    featuredKicker: "FEATURED",
    featuredTitle: "Featured partner stores",
    featuredDescription:
      "A selection of our approved partners at the top. Links are advertising and we may earn a commission if you buy.",
  },
  ar: {
    all: "الكل",
    supermarkets: "محلات السوبر ماركت",
    electronicsKicker: "إلكترونيات",
    electronicsTitle: "إلكترونيات",
    electronicsDescription: (count) =>
      `${count} متجر إلكترونيات في نظرة واحدة. استخدم اختصاص المتجر الظاهر على البطاقة للعثور على النوع المناسب.`,
    visit: "زيارة",
    storeInfo: "تفاصيل المتجر",
    share: "شارك",
    shareCopied: "تم النسخ",
    shareText: (name) => `شاهدي ${name} على TilbudJagt.dk`,
    shareAria: (name) => `شارك متجر ${name}`,
    sharePrompt: "انسخ الرابط:",
    partner: "شريك معتمد",
    direct: "رابط مباشر",
    searchPlaceholder: "ابحث عن متجر، مثل Netto أو Elgiganten أو JYSK…",
    searchAria: "ابحث عن متجر",
    categoriesAria: "التصنيفات",
    empty: "لا توجد متاجر مطابقة. جرّب اسمًا أو تصنيفًا آخر.",
    supermarketKicker: "مواد غذائية",
    supermarketTitle: "محلات السوبر ماركت",
    supermarketDescription:
      "متاجر المواد الغذائية والسوبر ماركت في مكان واحد. اضغط على الشعار لفتح المتجر.",
    partnersKicker: "شركاء",
    partnersTitle: "شركاء معتمدون آخرون",
    partnersDescription:
      "متاجر خارج المواد الغذائية والإلكترونيات لديها اتفاقية شراكة معتمدة. الروابط إعلانية وقد تدرّ علينا عمولة.",
    othersKicker: "أخرى",
    othersTitle: "متاجر أخرى",
    othersDescription:
      "متاجر أخرى دون اتفاقية شراكة معتمدة. يفتح الرابط المتجر مباشرة دون عمولة.",
    categoryKicker: "تصنيف",
    categoryDescription: (label) =>
      `متاجر في تصنيف ${label}. اضغط على الشعار لزيارة المتجر.`,
    featuredKicker: "مختارة",
    featuredTitle: "متاجر شركاء مميزة",
    featuredDescription:
      "مجموعة مختارة من شركائنا المعتمدين في الأعلى. الروابط إعلانية وقد نحصل على عمولة إذا اشتريت.",
  },
};

const CATEGORY_ORDER: CategoryKey[] = [
  "alle",
  "dagligvarer",
  "elektronik",
  "hjem",
  "mode",
  "skoenhed",
  "sport",
  "stormagasin",
  "pleje",
];

type StoreGroup = {
  key: "fremhaevede" | StoreCategory;
  kicker: string;
  title: string;
  description: string;
  stores: Store[];
};

const FEATURED_COUNT = 8;

function StoreCard({
  store,
  lang,
  prefix,
}: {
  store: Store;
  lang: Language;
  prefix: string;
}) {
  const copy = COPY[lang];
  const isSupermarket = store.category === "dagligvarer";
  return (
    <div className={isSupermarket ? "store-card supermarket-card" : "store-card"}>
      <a
        className="store-card-main"
        href={store.status === "partner" ? store.affiliateUrl! : store.website}
        target="_blank"
        rel={
          store.status === "partner"
            ? "sponsored nofollow noopener noreferrer"
            : "noopener noreferrer"
        }
        aria-label={`${copy.visit} ${store.name} – ${lang === "ar" ? "يفتح موقع المتجر في تبويب جديد" : lang === "en" ? "opens the store website in a new tab" : "åbner butikkens hjemmeside i ny fane"}`}
      >
        <StoreLogo
          slug={store.slug}
          name={store.name}
          large={isSupermarket || store.status === "partner"}
        />
        <span className="store-card-body">
          <strong>{store.name}</strong>
          <small>
            {getStoreCategoryLabel(store, lang)}
            {store.specialty
              ? ` · ${STORE_SPECIALTIES[store.specialty][lang]}`
              : ""}
          </small>
          <span
            className={
              store.status === "partner"
                ? "status-badge partner"
                : "status-badge directory"
            }
          >
            {store.status === "partner" ? (
              <>
                <Tag size={11} /> {copy.partner}
              </>
            ) : (
              <>
                <StoreIcon size={11} /> {copy.direct}
              </>
            )}
          </span>
          <span className="store-visit">
            {copy.visit} <ArrowRight size={12} />
          </span>
        </span>
      </a>
      <div className="store-card-footer">
        <a className="store-card-info" href={`${prefix}/butikker/${store.slug}`}>
          {copy.storeInfo}
        </a>
        {store.status === "partner" && (
          <ShareStoreButton
            name={store.name}
            url={`https://www.tilbudjagt.dk/go/${store.slug}?uid=share`}
            label={copy.share}
            copiedLabel={copy.shareCopied}
            copyPrompt={copy.sharePrompt}
            text={copy.shareText(store.name)}
            ariaLabel={copy.shareAria(store.name)}
            className="store-share"
          />
        )}
      </div>
    </div>
  );
}

function StoreGroupSection({
  group,
  lang,
  prefix,
}: {
  group: StoreGroup;
  lang: Language;
  prefix: string;
}) {
  return (
    <section className={`store-group store-group-${group.key}`}>
      <div className="store-group-head">
        <div>
          <span className="eyebrow muted">{group.kicker}</span>
          <h2>{group.title}</h2>
          <p>{group.description}</p>
        </div>
        <span className="store-group-count">{group.stores.length}</span>
      </div>
      <div className="store-grid">
        {group.stores.map((store) => (
          <StoreCard key={store.slug} store={store} lang={lang} prefix={prefix} />
        ))}
      </div>
    </section>
  );
}

export default function StoreBrowser({
  stores,
  initialLang = "da",
  forcedLang = false,
}: {
  stores: Store[];
  initialLang?: Language;
  forcedLang?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("alle");
  const [lang, setLang] = useState<Language>(initialLang);
  const copy = COPY[lang];
  const prefix = forcedLang ? `/${initialLang}` : "";

  useEffect(() => {
    if (forcedLang) return;
    const readLanguage = () => {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "da" || saved === "en" || saved === "ar") setLang(saved);
    };
    const onLanguage = (event: Event) => {
      const detail = (event as CustomEvent<Language>).detail;
      if (detail === "da" || detail === "en" || detail === "ar") setLang(detail);
      else readLanguage();
    };
    readLanguage();
    window.addEventListener("tilbudjagt:langchange", onLanguage);
    window.addEventListener("storage", onLanguage);
    return () => {
      window.removeEventListener("tilbudjagt:langchange", onLanguage);
      window.removeEventListener("storage", onLanguage);
    };
  }, [forcedLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    if (!forcedLang) window.localStorage.setItem(LANG_KEY, lang);
  }, [lang, forcedLang]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
    const k = params.get("kategori");
    if (k && CATEGORY_ORDER.includes(k as CategoryKey)) setCategory(k as CategoryKey);
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stores.filter((store) => {
      const matchesCategory = category === "alle" || store.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;
      const specialty = store.specialty ? STORE_SPECIALTIES[store.specialty][lang] : "";
      const haystack =
        `${store.name} ${store.description[lang]} ${store.description.da} ${STORE_CATEGORIES[store.category][lang]} ${STORE_CATEGORIES[store.category].da} ${specialty}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [stores, query, category, lang]);

  // Highest verified sales commission first; shown as the first row on the page.
  // Only in the default view: a filtered or searched list should keep its own
  // category heading instead of being relabelled as "featured".
  const featured = useMemo(
    () =>
      category === "alle" && query.trim() === ""
        ? sortStoresByCommission(
            visible.filter((store) => store.status === "partner"),
          ).slice(0, FEATURED_COUNT)
        : [],
    [visible, category, query],
  );
  const featuredSlugs = useMemo(
    () => new Set(featured.map((store) => store.slug)),
    [featured],
  );

  const groups = useMemo<StoreGroup[]>(() => {
    const remaining = visible.filter((store) => !featuredSlugs.has(store.slug));
    const categoryGroups = (Object.keys(STORE_CATEGORIES) as StoreCategory[])
      .map((key) => {
        const stores = sortStoresByCommission(
          remaining.filter((store) => store.category === key),
        );
        if (stores.length === 0) return null;
        const label = STORE_CATEGORIES[key][lang];
        const isSupermarket = key === "dagligvarer";
        const isElectronics = key === "elektronik";
        return {
          key,
          kicker: isSupermarket
            ? copy.supermarketKicker
            : isElectronics
              ? copy.electronicsKicker
              : copy.categoryKicker,
          title: isSupermarket
            ? copy.supermarketTitle
            : isElectronics
              ? copy.electronicsTitle
              : label,
          description: isSupermarket
            ? copy.supermarketDescription
            : isElectronics
              ? copy.electronicsDescription(stores.length)
              : copy.categoryDescription(label),
          stores,
        } satisfies StoreGroup;
      })
      .filter((group): group is NonNullable<typeof group> => group !== null);

    const result: StoreGroup[] = [];
    if (featured.length > 0) {
      result.push({
        key: "fremhaevede",
        kicker: copy.featuredKicker,
        title: copy.featuredTitle,
        description: copy.featuredDescription,
        stores: featured,
      });
    }
    result.push(...categoryGroups);
    return result;
  }, [visible, featured, featuredSlugs, copy, lang]);

  return (
    <>
      <section className="wrap stores-hero" data-no-translate>
        <span className="eyebrow muted">
          {lang === "ar" ? "المتاجر" : lang === "en" ? "STORES" : "BUTIKKER"}
        </span>
        <h1>
          {lang === "ar"
            ? "ابحث عن المتاجر في الدنمارك"
            : lang === "en"
              ? "Find stores in Denmark"
              : "Find butikker i Danmark"}
        </h1>
        <div className="hero-search store-search">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            aria-label={copy.searchAria}
          />
          <button type="button" aria-label={copy.searchAria}>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
      <section className="wrap stores-section" data-no-translate>
        <div className="deal-toolbar" role="tablist" aria-label={copy.categoriesAria}>
          {CATEGORY_ORDER.map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={category === key}
              className={category === key ? "filter-chip selected" : "filter-chip"}
              onClick={() => setCategory(key)}
            >
              {key === "alle"
                ? copy.all
                : key === "dagligvarer"
                  ? copy.supermarkets
                  : STORE_CATEGORIES[key][lang]}
            </button>
          ))}
        </div>
        {groups.map((group) => (
          <StoreGroupSection key={group.key} group={group} lang={lang} prefix={prefix} />
        ))}

        {visible.length === 0 && (
          <div className="empty-state">{copy.empty}</div>
        )}
      </section>
    </>
  );
}
