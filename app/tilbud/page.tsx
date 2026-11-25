import type { Metadata } from "next";
import { ArrowRight, Tag } from "lucide-react";
import CookieSettingsLink from "@/components/cookie-settings-link";
import SiteNav from "@/components/site-nav";
import { DEAL_CATEGORIES, getCategoryTotal } from "@/lib/deal-categories";
import { SITE_URL } from "@/lib/i18n";

export const metadata: Metadata = {
  title: { absolute: "Tilbud efter kategori – elektronik og hverdag | TilbudJagt.dk" },
  description:
    "Find aktuelle produkter og priser efter kategori: mobiltelefoner, printertilbehør, luftrensere, høretelefoner og spil fra godkendte partnere.",
  alternates: { canonical: `${SITE_URL}/tilbud` },
};

export default function DealCategoriesPage() {
  return (
    <main lang="da" dir="ltr">
      <header className="header wrap">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Tag size={22} />
          </span>
          <span>
            Tilbud<span className="brand-accent">Jagt</span>
            <small>.dk</small>
          </span>
        </a>
        <SiteNav ariaLabel="Tilbud efter kategori">
          <a href="/produkter">Produkter</a>
          <a href="/butikker">Butikker</a>
          <a href="/guides">Guides</a>
          <a href="/about.html">Om os</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">
            Bliv VIP
          </a>
        </div>
      </header>

      <section className="wrap category-hero">
        <p className="eyebrow">Sammenlign efter behov</p>
        <h1>Tilbud efter kategori</h1>
        <p className="lead">
          Find produkter og priser samlet efter kategori. Vi viser kun varer fra
          butikker, hvor vi har en godkendt partneraftale og et fungerende link.
        </p>
      </section>

      <section className="wrap category-grid" aria-label="Kategorier">
        {DEAL_CATEGORIES.map((category) => {
          const total = getCategoryTotal(category);
          return (
            <a className="category-card" href={`/tilbud/${category.slug}`} key={category.slug}>
              <span className="eyebrow">{total} varer</span>
              <h2>{category.h1}</h2>
              <p>{category.lead}</p>
              <span className="category-card-link">
                Se kategorien <ArrowRight size={14} />
              </span>
            </a>
          );
        })}
      </section>

      <section className="wrap category-seo">
        <h2>Sådan bruger du kategorisiderne</h2>
        <p>
          Kategorisiderne er lavet til dig, der allerede ved, hvilken type produkt
          du leder efter. Hvis du vil søge bredere, kan du bruge den samlede
          produktoversigt eller gå til butiksoversigten og sammenligne hele
          butikker.
        </p>
        <div className="related-links">
          <a href="/produkter">
            Alle produkter <ArrowRight size={13} />
          </a>
          <a href="/butikker">
            Alle butikker <ArrowRight size={13} />
          </a>
          <a href="/guides">
            Guides <ArrowRight size={13} />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark">
              <Tag size={20} />
            </span>
            <span>
              Tilbud<span className="brand-accent">Jagt</span>
              <small>.dk</small>
            </span>
          </a>
          <p className="footer-links">
            <a href="/produkter">Produkter</a> · <a href="/butikker">Butikker</a> ·{" "}
            <a href="/guides">Guides</a> · <a href="/annoncering">Annoncering</a> ·{" "}
            <a href="/about.html">Om os</a> · <a href="/contact.html">Kontakt</a> ·{" "}
            <a href="/privacy.html">Privatliv</a> · <a href="/cookies.html">Cookies</a> ·{" "}
            <CookieSettingsLink />
          </p>
        </div>
      </footer>
    </main>
  );
}
