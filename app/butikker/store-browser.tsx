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

function StoreCard({ store }: { store: Store }) {
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
        aria-label={`Besøg ${store.name} – åbner butikkens hjemmeside i ny fane`}
      >
        <StoreLogo slug={store.slug} name={store.name} large={isSupermarket} />
        <span className="store-card-body">
          <strong>{store.name}</strong>
          <small>{getStoreCategoryLabel(store, "da")}</small>
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
}

function StoreGroupSection({ group }: { group: StoreGroup }) {
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
          <StoreCard key={store.slug} store={store} />
        ))}
      </div>
    </section>
  );
}

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
      const specialty = store.specialty ? STORE_SPECIALTIES[store.specialty].da : "";
      const haystack =
        `${store.name} ${store.description.da} ${STORE_CATEGORIES[store.category].da} ${specialty}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [stores, query, category]);

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
        kicker: "DAGLIGVARER",
        title: "Supermarkeder",
        description:
          "Dagligvarebutikker og supermarkeder samlet ét sted. Klik på logoet for at åbne butikken.",
        stores: supermarkets,
      },
      {
        key: "partnere",
        kicker: "PARTNERE",
        title: "Øvrige godkendte partnere",
        description:
          "Butikker uden for dagligvarer og elektronik, hvor vi har en godkendt partneraftale. Links er reklame og kan give os provision.",
        stores: partners,
      },
      {
        key: "andre",
        kicker: "ØVRIGE",
        title: "Andre butikker",
        description:
          "Øvrige butikker uden en godkendt partneraftale. Linket går direkte til butikken uden provision.",
        stores: others,
      },
    ];

    return allGroups.filter((group) => group.stores.length > 0);
  }, [visible]);

  const supermarketCount = stores.filter(
    (store) => store.category === "dagligvarer",
  ).length;
  const electronicsCount = stores.filter(
    (store) => store.category === "elektronik",
  ).length;
  const otherPartnerCount = stores.filter(
    (store) =>
      store.category !== "dagligvarer" &&
      store.category !== "elektronik" &&
      store.status === "partner",
  ).length;
  const otherCount =
    stores.length - supermarketCount - electronicsCount - otherPartnerCount;
  const totalPartnerCount = stores.filter(
    (store) => store.status === "partner",
  ).length;

  return (
    <>
      <section className="wrap stores-hero">
        <span className="eyebrow muted">BUTIKKER</span>
        <h1>Find butikker i Danmark</h1>
        <p>
          {stores.length} butikker i oversigten: {supermarketCount} supermarkeder,{" "}
          {electronicsCount} elektronikbutikker, {otherPartnerCount} øvrige partnere
          og {otherCount} andre butikker. I alt {totalPartnerCount} butikker har en
          godkendt partneraftale.
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
        {groups
          .filter((group) => group.key === "supermarkeder")
          .map((group) => (
            <StoreGroupSection key={group.key} group={group} />
          ))}

        {electronicsBySpecialty.length > 0 && (
          <section className="store-group store-group-elektronik">
            <div className="store-group-head">
              <div>
                <span className="eyebrow muted">ELEKTRONIK</span>
                <h2>Elektronik efter speciale</h2>
                <p>
                  {visibleElectronicsCount} butikker opdelt i{" "}
                  {electronicsBySpecialty.length} specialer, så det er nemt at finde
                  den rigtige type butik.
                </p>
              </div>
            </div>
            <div className="specialty-groups">
              {electronicsBySpecialty.map(({ key, stores: specialtyStores }) => (
                <div className="specialty-group" key={key}>
                  <div className="specialty-head">
                    <h3>{STORE_SPECIALTIES[key].da}</h3>
                    <span>{specialtyStores.length}</span>
                  </div>
                  <div className="store-grid">
                    {specialtyStores.map((store) => (
                      <StoreCard key={store.slug} store={store} />
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
            <StoreGroupSection key={group.key} group={group} />
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
