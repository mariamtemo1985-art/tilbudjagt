import type { Metadata } from "next";
import { ArrowRight, RefreshCw, Tag, TicketPercent } from "lucide-react";
import SiteNav from "@/components/site-nav";
import StoreLogo from "@/components/store-logo";
import CopyCode from "@/components/copy-code";
import coupons from "@/content/coupons.json";
import deals from "@/content/deals.json";

export const metadata: Metadata = {
  title: "Rabatkoder og aktuelle tilbud",
  description:
    "Officielle rabatkoder og aktuelle nedsatte produkter fra danske partnerbutikker. Kopier koden og shop direkte hos butikken.",
  alternates: { canonical: "https://www.tilbudjagt.dk/rabatkoder" },
};

type Deal = {
  store: string;
  storeSlug: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  url: string;
};

const formatter = new Intl.NumberFormat("da-DK", {
  style: "currency",
  currency: "DKK",
  maximumFractionDigits: 0,
});

export default function RabatkoderPage() {
  const dealList = deals as Deal[];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Rabatkoder og tilbud på TilbudJagt.dk",
    numberOfItems: dealList.length,
    itemListElement: dealList.map((deal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: deal.title,
      url: deal.url,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <header className="header wrap">
        <a className="brand" href="/">
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <SiteNav ariaLabel="Hovedmenu">
          <a href="/rabatkoder">Rabatkoder</a>
          <a href="/#butikker">Butikker</a>
          <a href="/guides">Guides</a>
          <a href="/contact.html">Kontakt</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">Bliv VIP</a>
        </div>
      </header>

      <section className="wrap deals-hero">
        <span className="eyebrow muted"><TicketPercent size={14} /> RABATKODER</span>
        <h1>Rabatkoder og aktuelle tilbud</h1>
        <p>
          Her samler vi officielle rabatkoder fra vores partnerbutikker og et udvalg
          af nedsatte produkter. Priserne kommer direkte fra butikkernes produktfeeds
          og kan ændre sig, så tjek altid den endelige pris hos butikken.
        </p>
        <p className="deals-updated">
          <RefreshCw size={13} /> Opdateret 25. november 2026 ·{" "}
          <span>Vi kan modtage provision, når du handler via vores links. Det koster ikke ekstra for dig.</span>
        </p>
      </section>

      <section className="wrap deals-section">
        <h2>Rabatkoder</h2>
        <div className="coupon-grid">
          {coupons.map((coupon) => (
            <article className="coupon-card" key={coupon.code}>
              <div className="coupon-head">
                <StoreLogo slug={coupon.slug} name={coupon.store} />
                <div>
                  <strong>{coupon.store}</strong>
                  <p>{coupon.title}</p>
                </div>
              </div>
              <CopyCode code={coupon.code} />
              <p className="coupon-desc">{coupon.description}</p>
              <p className="coupon-expiry">Gyldig til: {coupon.expires}</p>
              <a
                className="coupon-cta"
                href={coupon.url}
                target="_blank"
                rel="sponsored nofollow noopener"
              >
                Brug koden hos {coupon.store} <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap deals-section">
        <h2>Aktuelle tilbud fra partnerbutikker</h2>
        <p className="deals-note">
          Udvalgte nedsatte produkter fra de seneste produktfeeds. Lagerstatus og pris
          bekræftes hos butikken.
        </p>
        <div className="deal-grid">
          {dealList.map((deal) => (
            <article className="deal-card" key={`${deal.storeSlug}-${deal.title}-${deal.price}`}>
              <a
                className="deal-image"
                href={deal.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                aria-label={`Se ${deal.title} hos ${deal.store}`}
              >
                <img src={deal.image} alt="" loading="lazy" width={640} height={640} />
                <span className="deal-badge">-{deal.discount}%</span>
              </a>
              <div className="deal-body">
                <span className="deal-store">{deal.store}</span>
                <h3>{deal.title}</h3>
                <div className="deal-prices">
                  <strong>{formatter.format(deal.price)}</strong>
                  <s>{formatter.format(deal.oldPrice)}</s>
                </div>
                <a
                  className="text-link"
                  href={deal.url}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                >
                  Se tilbud <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap guides-cta">
        <div>
          <h2>Flere butikker, flere tilbud</h2>
          <p>Søg blandt alle danske butikker og se, hvor du kan handle i dag.</p>
        </div>
        <a className="partner-cta" href="/#butikker">Se alle butikker <ArrowRight size={16} /></a>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>Rabatkoder og priser er indsamlet fra butikkernes egne feeds og kan ændre sig.</p>
          <nav aria-label="Footer links">
            <a href="/#butikker">Butikker</a> · <a href="/guides">Guides</a> ·{" "}
            <a href="/about.html">Om os</a> · <a href="/contact.html">Kontakt</a> ·{" "}
            <a href="/privacy.html">Privatlivspolitik</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
