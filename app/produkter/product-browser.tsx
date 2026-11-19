"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/products";

type Props = {
  initialProducts: Product[];
  initialTotal: number;
  categories: string[];
};

const PAGE_SIZE = 48;

type SearchResponse = {
  products: Product[];
  total: number;
};

export default function ProductBrowser({ initialProducts, initialTotal, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const requestId = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (!q && !category) {
      requestId.current += 1;
      setProducts(initialProducts);
      setTotal(initialTotal);
      setLoading(false);
      setError("");
      return;
    }

    const id = requestId.current + 1;
    requestId.current = id;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams({ q, category, limit: String(PAGE_SIZE), offset: "0" });
        const res = await fetch(`/api/products/search?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("search failed");
        const data = (await res.json()) as SearchResponse;
        if (requestId.current !== id) return;
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        if (controller.signal.aborted) return;
        if (requestId.current === id) {
          setProducts([]);
          setTotal(0);
          setError("Søgningen kunne ikke hentes lige nu. Prøv igen om et øjeblik.");
        }
      } finally {
        if (requestId.current === id) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, category, initialProducts, initialTotal]);

  async function loadMore() {
    const id = requestId.current + 1;
    requestId.current = id;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        q: query.trim(),
        category,
        limit: String(PAGE_SIZE),
        offset: String(products.length),
      });
      const res = await fetch(`/api/products/search?${params.toString()}`);
      if (!res.ok) throw new Error("search failed");
      const data = (await res.json()) as SearchResponse;
      if (requestId.current !== id) return;
      setProducts((current) => [...current, ...data.products]);
      setTotal(data.total);
    } catch {
      if (requestId.current === id) setError("Kunne ikke hente flere varer. Prøv igen.");
    } finally {
      if (requestId.current === id) setLoading(false);
    }
  }

  return (
    <section className="wrap section product-section">
      <div className="product-toolbar">
        <label className="product-search">
          <Search size={18} />
          <input
            type="search"
            value={query}
            placeholder="Søg efter vare, brand eller kategori…"
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Søg produkter"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

      <p className="product-count" aria-live="polite">
        {loading ? "Søger…" : `${total} varer fundet`}
      </p>

      {error && <p className="notice">{error}</p>}

      {!loading && products.length === 0 ? (
        <p className="notice">Ingen varer matcher din søgning. Prøv et andet ord.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
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

      {!loading && products.length < total && (
        <button className="product-more" onClick={loadMore}>
          Vis flere varer
        </button>
      )}
    </section>
  );
}
