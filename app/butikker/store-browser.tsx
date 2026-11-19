"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search, Store as StoreIcon, Tag } from "lucide-react";
import { STORE_CATEGORIES, type Store, type StoreCategory } from "@/lib/stores";

type CategoryKey = "alle" | StoreCategory;

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

const SUPERMARKET_LOGOS: Record<string, string> = {
  netto: "/logos/netto.png",
  foetex: "/logos/foetex.png",
  "rema-1000": "/logos/rema-1000.png",
  lidl: "/logos/lidl.png",
  bilka: "/logos/bilka.png",
  meny: "/logos/meny.png",
  spar: "/logos/spar.png",
  superbrugsen: "/logos/superbrugsen.png",
  kvickly: "/logos/kvickly.png",
  "365discount": "/logos/365discount.png",
  aldi: "/logos/aldi.png",
  nemlig: "/logos/nemlig.png",
  motatos: "/logos/motatos.png",
  loevbjerg: "/logos/loevbjerg.jpg",
  "okologisk-supermarked": "/logos/okologisk-supermarked.png",
};

type StoreGroup = {
  key: "supermarkeder" | "partnere" | "andre";
  kicker: string;
  title: string;
  description: string;
  stores: Store[];
};

export default function StoreBrowser({ stores }: { stores: Store[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("alle");

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
      const haystack = `${store.name} ${store.description.da} ${STORE_CATEGORIES[store.category].da}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [stores, query, category]);

  const groups = useMemo<StoreGroup[]>(() => {
    const supermarkets = visible.filter((store) => store.category === "dagligvarer");
    const partners = visible.filter(
      (store) => store.category !== "dagligvarer" && store.status === "partner",
    );
    const others = visible.filter(
      (store) => store.category !== "dagligvarer" && store.status !== "partner",
    );

    const allGroups: StoreGroup[] = [
      {
        key: "supermarkeder",
        kicker: "DAGLIGVARER",
        title: "Supermarkeder",
        description:
          "Dagligvarebutikker og supermarkeder samlet ét sted. Klik på logoet for at åbne butikken.",
        stores: supermarkets,
      },
      {
        key: "partnere",
        kicker: "PARTNERE",
        title: "Godkendte partnere",
        description:
          "Butikker hvor vi har en godkendt partneraftale. Links er reklame og kan give os provision.",
        stores: partners,
      },
      {
        key: "andre",
        kicker: "ØVRIGE",
        title: "Andre butikker",
        description:
          "Butikker uden en godkendt partneraftale. Linket går direkte til butikken uden provision.",
        stores: others,
      },
    ];

    return allGroups.filter((group) => group.stores.length > 0);
  }, [visible]);

  const supermarketCount = stores.filter((store) => store.category === "dagligvarer").length;
  const partnerCount = stores.filter(
    (store) => store.category !== "dagligvarer" && store.status === "partner",
  ).length;
  const otherCount = stores.length - supermarketCount - partnerCount;

  return (
    <>
      <section className="wrap stores-hero">
        <span className="eyebrow muted">BUTIKKER</span>
        <h1>Find butikker i Danmark</h1>
        <p>
          {stores.length} butikker i oversigten: {supermarketCount} supermarkeder,{" "}
          {partnerCount} godkendte partnere og {otherCount} andre butikker. Supermarkeder
          og partnere er samlet i hver sin gruppe, så det er nemt at finde rundt.
        </p>
        <div className="hero-search store-search">
          <Search size={19} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Søg butik, fx Netto, Elgiganten, JYSK…"
            aria-label="Søg butik"
          />
          <button type="button" aria-label="Søg">
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
      <section className="wrap stores-section">
        <div className="deal-toolbar" role="tablist" aria-label="Kategorier">
          {CATEGORY_ORDER.map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={category === key}
              className={category === key ? "filter-chip selected" : "filter-chip"}
              onClick={() => setCategory(key)}
            >
              {key === "alle"
                ? "Alle"
                : key === "dagligvarer"
                  ? "Supermarkeder"
                  : STORE_CATEGORIES[key].da}
            </button>
          ))}
        </div>
        <p className="result-count">
          {visible.length} {visible.length === 1 ? "butik" : "butikker"}
        </p>

        {groups.map((group) => (
          <section className={`store-group store-group-${group.key}`} key={group.key}>
            <div className="store-group-head">
              <div>
                <span className="eyebrow muted">{group.kicker}</span>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <span className="store-group-count">{group.stores.length}</span>
            </div>
            <div
              className={
                group.key === "supermarkeder"
                  ? "store-grid supermarket-grid"
                  : "store-grid"
              }
            >
              {group.stores.map((store) => {
                const logoSrc = SUPERMARKET_LOGOS[store.slug];
                return (
                  <div
                    className={
                      logoSrc ? "store-card supermarket-card" : "store-card"
                    }
                    key={store.slug}
                  >
                    <a
                      className="store-card-main"
                      href={store.status === "partner" ? store.affiliateUrl! : store.website}
                      target="_blank"
                      rel={
                        store.status === "partner"
                          ? "sponsored noopener noreferrer"
                          : "noopener noreferrer"
                      }
                      aria-label={`Besøg ${store.name} – åbner butikkens hjemmeside i ny fane`}
                    >
                      <span
                        className={logoSrc ? "store-avatar store-logo" : "store-avatar"}
                        aria-hidden="true"
                      >
                        {logoSrc ? (
                          <img src={logoSrc} alt="" loading="lazy" />
                        ) : (
                          store.name.slice(0, 1)
                        )}
                      </span>
                      <span className="store-card-body">
                        <strong>{store.name}</strong>
                        <small>
                          {store.category === "dagligvarer"
                            ? "Supermarked"
                            : STORE_CATEGORIES[store.category].da}
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
                              <Tag size={11} /> Godkendt partner
                            </>
                          ) : (
                            <>
                              <StoreIcon size={11} /> Direkte link
                            </>
                          )}
                        </span>
                        <span className="store-visit">
                          Besøg {store.name} <ArrowRight size={12} />
                        </span>
                      </span>
                    </a>
                    <a className="store-card-info" href={`/butikker/${store.slug}`}>
                      Butiksinfo
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {visible.length === 0 && (
          <div className="empty-state">
            Ingen butikker matcher søgningen. Prøv et andet navn eller en anden
            kategori.
          </div>
        )}
      </section>
    </>
  );
}
