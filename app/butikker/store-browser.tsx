"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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
];

export default function StoreBrowser({ stores }: { stores: Store[] }) {
  const params = useSearchParams();
  const initialQuery = params.get("q") ?? "";
  const initialCategory = params.get("kategori");
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryKey>(
    CATEGORY_ORDER.includes(initialCategory as CategoryKey)
      ? (initialCategory as CategoryKey)
      : "alle",
  );

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

  const partnerCount = stores.filter((store) => store.status === "partner").length;

  return (
    <>
      <section className="wrap stores-hero">
        <span className="eyebrow muted">BUTIKKER</span>
        <h1>Find butikker i Danmark</h1>
        <p>
          Søg på butiksnavn eller kategori. {stores.length} butikker i oversigten,
          hvoraf {partnerCount} er godkendt partner. Vi viser kun priser og tilbud,
          når de kommer fra butikken selv.
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
              {key === "alle" ? "Alle" : STORE_CATEGORIES[key].da}
            </button>
          ))}
        </div>

        <p className="result-count">
          {visible.length} {visible.length === 1 ? "butik" : "butikker"}
        </p>

        <div className="store-grid">
          {visible.map((store) => (
            <a className="store-card" href={`/butikker/${store.slug}`} key={store.slug}>
              <span className="store-avatar" aria-hidden="true">
                {store.name.slice(0, 1)}
              </span>
              <span className="store-card-body">
                <strong>{store.name}</strong>
                <small>{STORE_CATEGORIES[store.category].da}</small>
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
              </span>
              <ArrowRight size={16} />
            </a>
          ))}
        </div>

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
