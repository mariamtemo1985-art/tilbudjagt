"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/products";
import { useSiteLang } from "@/components/site-translator";

type Props = {
  initialProducts: Product[];
  initialTotal: number;
  categories: string[];
  initialQuery?: string;
  initialLang?: "da" | "en" | "ar";
  forcedLang?: boolean;
};

const PAGE_SIZE = 48;

type SearchResponse = {
  products: Product[];
  total: number;
};

const COPY = {
  da: {
    searchPlaceholder: "Søg efter vare, brand eller kategori…",
    searchAria: "Søg produkter",
    categoryAria: "Vælg kategori",
    allCategories: "Alle kategorier",
    searching: "Søger…",
    found: (n: number) => `${n} varer fundet`,
    noResults: "Ingen varer matcher din søgning. Prøv et andet ord.",
    loadMore: "Vis flere varer",
    searchError: "Søgningen kunne ikke hentes lige nu. Prøv igen om et øjeblik.",
    moreError: "Kunne ikke hente flere varer. Prøv igen.",
  },
  en: {
    searchPlaceholder: "Search for a product, brand or category…",
    searchAria: "Search products",
    categoryAria: "Choose category",
    allCategories: "All categories",
    searching: "Searching…",
    found: (n: number) => `${n} products found`,
    noResults: "No products match your search. Try another word.",
    loadMore: "Show more products",
    searchError: "Search could not be loaded right now. Please try again shortly.",
    moreError: "Could not load more products. Please try again.",
  },
  ar: {
    searchPlaceholder: "ابحث عن منتج أو علامة تجارية أو فئة…",
    searchAria: "ابحث عن المنتجات",
    categoryAria: "اختر الفئة",
    allCategories: "كل الفئات",
    searching: "جارٍ البحث…",
    found: (n: number) => `${n} منتجًا تم العثور عليها`,
    noResults: "لا توجد منتجات تطابق بحثك. جرّب كلمة أخرى.",
    loadMore: "عرض المزيد من المنتجات",
    searchError: "تعذّر تحميل البحث الآن. حاول مرة أخرى بعد قليل.",
    moreError: "تعذّر تحميل المزيد من المنتجات. حاول مرة أخرى.",
  },
} as const;

const CATEGORY_AR: Record<string, string> = {
  Spil: "ألعاب",
  Legetøj: "ألعاب",
  Elektronik: "إلكترونيات",
  Mobil: "هواتف",
  Computer: "كمبيوتر",
  Printer: "طابعات",
  Høretelefoner: "سماعات",
  Speakers: "مكبرات صوت",
  TV: "تلفزيونات",
  Køkken: "مطبخ",
  Hjem: "منزل",
  Møbler: "أثاث",
  Sport: "رياضة",
  Skønhed: "جمال",
  Pleje: "عناية",
  Tøj: "ملابس",
  Sko: "أحذية",
  Baby: "مستلزمات أطفال",
  Have: "حديقة",
  Værktøj: "أدوات",
};

function categoryLabel(value: string, lang: "da" | "en" | "ar") {
  if (lang !== "ar") return value;
  return CATEGORY_AR[value] || value;
}

export default function ProductBrowser({
  initialProducts,
  initialTotal,
  categories,
  initialQuery = "",
  initialLang = "da",
  forcedLang = false,
}: Props) {
  const detectedLang = useSiteLang();
  const lang = forcedLang ? initialLang : detectedLang;
  const t = COPY[lang];
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"" | "search" | "more">("");
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
          setError("search");
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
      if (requestId.current === id) setError("more");
    } finally {
      if (requestId.current === id) setLoading(false);
    }
  }

  return (
    <section className="wrap section product-section" data-no-translate>
      <div className="product-toolbar">
        <label className="product-search">
          <Search size={18} />
          <input
            type="search"
            value={query}
            placeholder={t.searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t.searchAria}
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label={t.categoryAria}
        >
          <option value="">{t.allCategories}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabel(c, lang)}
            </option>
          ))}
        </select>
      </div>

      <p className="product-count" aria-live="polite">
        {loading ? t.searching : t.found(total)}
      </p>

      {error && <p className="notice">{t[error === "search" ? "searchError" : "moreError"]}</p>}

      {!loading && products.length === 0 ? (
        <p className="notice">{t.noResults}</p>
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
          {t.loadMore}
        </button>
      )}
    </section>
  );
}
