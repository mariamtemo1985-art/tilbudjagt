"use client";

import { useMemo, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
  categories: string[];
};

const PAGE_SIZE = 48;

export default function ProductBrowser({ products, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [products, query, category]);

  const shown = filtered.slice(0, visible);

  return (
    <section className="wrap section product-section">
      <div className="product-toolbar">
        <label className="product-search">
          <Search size={18} />
          <input
            type="search"
            value={query}
            placeholder="Søg efter vare, brand eller kategori…"
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            aria-label="Søg produkter"
          />
        </label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setVisible(PAGE_SIZE);
          }}
          aria-label="Vælg kategori"
        >
          <option value="">Alle kategorier</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <p className="product-count">
        {filtered.length} varer fundet
      </p>

      {shown.length === 0 ? (
        <p className="notice">Ingen varer matcher din søgning. Prøv et andet ord.</p>
      ) : (
        <div className="product-grid">
          {shown.map((p) => (
            <a
              key={p.id}
              className="product-card"
              href={p.url}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
            >
              <span className="product-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} loading="lazy" />
              </span>
              <span className="product-body">
                <span className="product-brand">{p.brand || p.category}</span>
                <span className="product-name">{p.name}</span>
                <span className="product-price">{p.price.toFixed(2).replace(".", ",")} kr.</span>
                <span className="product-store">
                  {p.store} <ExternalLink size={12} />
                </span>
              </span>
            </a>
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <button className="product-more" onClick={() => setVisible(visible + PAGE_SIZE)}>
          Vis flere varer
        </button>
      )}
    </section>
  );
}
