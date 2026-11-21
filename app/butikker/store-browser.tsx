"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, Store as StoreIcon, Tag } from "lucide-react";
import {
  STORE_CATEGORIES,
  STORE_SPECIALTIES,
  getStoreCategoryLabel,
  type Store,
  type StoreCategory,
  type StoreSpecialty,
} from "@/lib/stores";
import StoreLogo from "@/components/store-logo";

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
    electronicsDescription: (count: number, specialties: number) => string;
    visit: string;
    storeInfo: string;
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
  }
> = {
  da: {
    all: "Alle",
    supermarkets: "Supermarkeder",
    electronicsKicker: "ELEKTRONIK",
    electronicsTitle: "Elektronik efter speciale",
    electronicsDescription: (count, specialties) =>
      `${count} butikker opdelt i ${specialties} specialer, så det er nemt at finde den rigtige type butik.`,
    visit: "Besøg",
    storeInfo: "Butiksinfo",
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
  },
  en: {
    all: "All",
    supermarkets: "Supermarkets",
    electronicsKicker: "ELECTRONICS",
    electronicsTitle: "Electronics by specialty",
    electronicsDescription: (count, specialties) =>
      `${count} stores across ${specialties} specialties, making it easier to find the right kind of store.`,
    visit: "Visit",
    storeInfo: "Store info",
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
  },
  ar: {
    all: "الكل",
    supermarkets: "محلات السوبر ماركت",
    electronicsKicker: "إلكترونيات",
    electronicsTitle: "إلكترونيات حسب الاختصاص",
    electronicsDescription: (count, specialties) =>
      `${count} متجرًا موزعة على ${specialties} اختصاصات، لتسهيل العثور على نوع المتجر المناسب.`,
    visit: "زيارة",
    storeInfo: "تفاصيل المتجر",
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

const SPECIALTY_ORDER: StoreSpecialty[] = [
  "tv-lyd",
  "computer",
  "mobil",
  "printer",
  "batterier",
  "kamera",
];

type StoreGroup = {
  key: "supermarkeder" | "partnere" | "andre";
  kicker: string;
  title: string;
  description: string;
  stores: Store[];
};

function StoreCard({ store, lang }: { store: Store; lang: Language }) {
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
        <StoreLogo slug={store.slug} name={store.name} large={isSupermarket} />
        <span className="store-card-body">
          <strong>{store.name}</strong>
          <small>{getStoreCategoryLabel(store, lang)}</small>
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
            {copy.visit} {store.name} <ArrowRight size={12} />
          </span>
        </span>
      </a>
      <a className="store-card-info" href={`/butikker/${store.slug}`}>
        {copy.storeInfo}
      </a>
    </div>
  );
}

function StoreGroupSection({ group, lang }: { group: StoreGroup; lang: Language }) {
  return (
    <section className={`store-group store-group-${group.key}`}>
      <div className="store-group-head">
        <div>
          <span className="eyebrow muted">{group.kicker}</span>
          <h2>{group.title}</h2>
          <p>{group.description}</p>
        </div>
      </div>
      <div
        className={
          group.key === "supermarkeder"
            ? "store-grid supermarket-grid"
            : "store-grid"
        }
      >
        {group.stores.map((store) => (
          <StoreCard key={store.slug} store={store} lang={lang} />
        ))}
      </div>
    </section>
  );
}

export default function StoreBrowser({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("alle");
  const [lang, setLang] = useState<Language>("da");
  const copy = COPY[lang];

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

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

  const electronicsBySpecialty = useMemo(
    () =>
      SPECIALTY_ORDER.map((key) => ({
        key,
        stores: visible.filter(
          (store) => store.category === "elektronik" && store.specialty === key,
        ),
      })).filter((group) => group.stores.length > 0),
    [visible],
  );
  const visibleElectronicsCount = electronicsBySpecialty.reduce(
    (total, group) => total + group.stores.length,
    0,
  );

  const groups = useMemo<StoreGroup[]>(() => {
    const supermarkets = visible.filter((store) => store.category === "dagligvarer");
    const partners = visible.filter(
      (store) =>
        store.category !== "dagligvarer" &&
        store.category !== "elektronik" &&
        store.status === "partner",
    );
    const others = visible.filter(
      (store) =>
        store.category !== "dagligvarer" &&
        store.category !== "elektronik" &&
        store.status !== "partner",
    );

    const allGroups: StoreGroup[] = [
      {
        key: "supermarkeder",
        kicker: copy.supermarketKicker,
        title: copy.supermarketTitle,
        description: copy.supermarketDescription,
        stores: supermarkets,
      },
      {
        key: "partnere",
        kicker: copy.partnersKicker,
        title: copy.partnersTitle,
        description: copy.partnersDescription,
        stores: partners,
      },
      {
        key: "andre",
        kicker: copy.othersKicker,
        title: copy.othersTitle,
        description: copy.othersDescription,
        stores: others,
      },
    ];

    return allGroups.filter((group) => group.stores.length > 0);
  }, [visible, copy]);

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
        {groups
          .filter((group) => group.key === "supermarkeder")
          .map((group) => (
            <StoreGroupSection key={group.key} group={group} lang={lang} />
          ))}

        {electronicsBySpecialty.length > 0 && (
          <section className="store-group store-group-elektronik">
            <div className="store-group-head">
              <div>
                <span className="eyebrow muted">{copy.electronicsKicker}</span>
                <h2>{copy.electronicsTitle}</h2>
                <p>
                  {copy.electronicsDescription(
                    visibleElectronicsCount,
                    electronicsBySpecialty.length,
                  )}
                </p>
              </div>
            </div>
            <div className="specialty-groups">
              {electronicsBySpecialty.map(({ key, stores: specialtyStores }) => (
                <div className="specialty-group" key={key}>
                  <div className="specialty-head">
                    <h3>{STORE_SPECIALTIES[key][lang]}</h3>
                  </div>
                  <div className="store-grid">
                    {specialtyStores.map((store) => (
                      <StoreCard key={store.slug} store={store} lang={lang} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {groups
          .filter((group) => group.key !== "supermarkeder")
          .map((group) => (
            <StoreGroupSection key={group.key} group={group} lang={lang} />
          ))}

        {visible.length === 0 && (
          <div className="empty-state">{copy.empty}</div>
        )}
      </section>
    </>
  );
}
