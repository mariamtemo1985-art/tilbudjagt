"use client";

import { useMemo, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShieldCheck,
} from "lucide-react";
import { getFeaturedDeals } from "@/lib/deals";

type Language = "da" | "en" | "ar";

const COPY: Record<
  Language,
  {
    kicker: string;
    title: string;
    subtitle: string;
    guide: string;
    all: string;
    visit: string;
    previous: string;
    next: string;
    disclosure: string;
    scrollLabel: string;
  }
> = {
  da: {
    kicker: "BLACK FRIDAY · 27. NOVEMBER 2026",
    title: "Black Friday-priser",
    subtitle:
      "Aktuelle nedsatte produkter fra godkendte partnerbutikker. Se prisen og gå direkte til butikken.",
    guide: "Black Friday-guide",
    all: "Se alle tilbud",
    visit: "Besøg butik",
    previous: "Forrige produkter",
    next: "Næste produkter",
    disclosure:
      "Udvalgte varer fra butikkernes egne feeds. Pris og lager bekræftes hos butikken. Links kan give os provision.",
    scrollLabel: "Black Friday-produkter",
  },
  en: {
    kicker: "BLACK FRIDAY · 27 NOVEMBER 2026",
    title: "Black Friday prices",
    subtitle:
      "Current discounted products from approved partner stores. See the price and go straight to the store.",
    guide: "Black Friday guide",
    all: "See all deals",
    visit: "Visit store",
    previous: "Previous products",
    next: "Next products",
    disclosure:
      "Selected items from the stores’ own feeds. Price and stock are confirmed at the store. Links may earn us a commission.",
    scrollLabel: "Black Friday products",
  },
  ar: {
    kicker: "البلاك فريدي · 27 نوفمبر 2026",
    title: "أسعار البلاك فريدي",
    subtitle:
      "منتجات مخفّضة حالياً من متاجر شريكة معتمدة. شاهد السعر وانتقل مباشرة إلى المتجر.",
    guide: "دليل البلاك فريدي",
    all: "كل العروض",
    visit: "زيارة المتجر",
    previous: "المنتجات السابقة",
    next: "المنتجات التالية",
    disclosure:
      "منتجات مختارة من مصادر المتاجر نفسها. يُؤكَّد السعر والتوفر عند المتجر. قد نحصل على عمولة من الروابط.",
    scrollLabel: "منتجات البلاك فريدي",
  },
};

export default function BlackFridayStrip({ lang = "da" }: { lang?: Language }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const copy = COPY[lang];
  const items = useMemo(() => getFeaturedDeals(12), []);
  const rtl = lang === "ar";
  const formatter = new Intl.NumberFormat(
    lang === "da" ? "da-DK" : lang === "ar" ? "ar-DK" : "en-DK",
    { style: "currency", currency: "DKK", maximumFractionDigits: 0 },
  );
  const guideHref =
    lang === "ar"
      ? "/ar/guides/black-friday-2026-danmark"
      : "/guides/black-friday-2026-danmark";
  const allHref =
    lang === "ar" ? "/ar/rabatkoder" : lang === "en" ? "/en/rabatkoder" : "/rabatkoder";
  const guidesHref = lang === "ar" ? "/ar/guides" : lang === "en" ? "/en/guides" : "/guides";

  const scroll = (direction: "previous" | "next") => {
    const node = scrollRef.current;
    if (!node) return;
    const amount = Math.min(node.clientWidth * 0.8, 520);
    const forward = direction === "next";
    node.scrollBy({
      left: (forward ? 1 : -1) * amount * (rtl ? -1 : 1),
      behavior: "smooth",
    });
  };

  return (
    <section className="wrap bf-section" aria-labelledby="bf-title">
      <div className="bf-head">
        <div className="bf-head-copy">
          <span className="bf-kicker">
            <Flame size={14} /> {copy.kicker}
          </span>
          <h2 className="bf-title" id="bf-title">
            {copy.title}
          </h2>
          <p className="bf-sub">{copy.subtitle}</p>
        </div>
        <div className="bf-actions">
          <a className="bf-guide-link" href={guideHref}>
            {copy.guide} <ArrowRight size={14} />
          </a>
          <a className="bf-all-link" href={allHref}>
            {copy.all} <ArrowRight size={14} />
          </a>
        </div>
      </div>

      <div className="bf-scroll-wrap">
        <button
          className="bf-nav bf-nav-prev"
          type="button"
          aria-label={copy.previous}
          onClick={() => scroll("previous")}
        >
          {rtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <div
          className="bf-scroll"
          ref={scrollRef}
          aria-label={copy.scrollLabel}
          tabIndex={0}
        >
          {items.map((deal, index) => (
            <article className="bf-card" key={`${deal.storeSlug}-${deal.title}`}>
              <a
                className="bf-image"
                href={deal.url}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                aria-label={`${deal.title} – ${deal.store}`}
              >
                <img
                  src={deal.image}
                  alt={deal.title}
                  width={320}
                  height={320}
                  loading={index < 4 ? "eager" : "lazy"}
                  decoding="async"
                />
                <span className="bf-badge">-{deal.discount}%</span>
              </a>
              <div className="bf-body">
                <span className="bf-store">{deal.store}</span>
                <h3 className="bf-name">
                  <a
                    href={deal.url}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                  >
                    {deal.title}
                  </a>
                </h3>
                <div className="bf-prices">
                  <strong>{formatter.format(deal.price)}</strong>
                  <s>{formatter.format(deal.oldPrice)}</s>
                </div>
                <a
                  className="bf-visit"
                  href={deal.url}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                >
                  {copy.visit} <ArrowRight size={13} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <button
          className="bf-nav bf-nav-next"
          type="button"
          aria-label={copy.next}
          onClick={() => scroll("next")}
        >
          {rtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <div className="bf-foot">
        <p className="bf-disclosure">
          <ShieldCheck size={13} /> {copy.disclosure}
        </p>
        <a className="bf-guides-link" href={guidesHref}>
          {lang === "ar" ? "كل الأدلة والمقالات" : lang === "en" ? "All guides and articles" : "Alle guides og artikler"}{" "}
          <ArrowRight size={13} />
        </a>
      </div>
    </section>
  );
}
