import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { STORES } from "@/lib/stores";
import StoreBrowser from "./store-browser";
import AdSlot from "@/components/AdSlot";
import SponsoredBanner from "@/components/SponsoredBanner";
import SiteNav from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Butikker – find danske butikker",
  description:
    "Søg blandt danske butikker på navn eller kategori. Se hvilke butikker der er godkendte partnere, og hvilke der kun er direkte links.",
  alternates: { canonical: "https://www.tilbudjagt.dk/butikker" },
};

export default function StoresPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Butikker i Danmark",
    numberOfItems: STORES.length,
    itemListElement: STORES.map((store, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: store.name,
      url: `https://www.tilbudjagt.dk/butikker/${store.slug}`,
    })),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <SiteNav ariaLabel="Hovedmenu">
          <a href="/#butikker">Butikker</a>
          <a href="/about.html">Om os</a>
          <a href="/contact.html">Kontakt</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">Bliv VIP</a>
        </div>
      </header>
      <SponsoredBanner />
      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_STORES} />
      </div>
      <StoreBrowser stores={STORES} />
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
          <p>
            TilbudJagt viser kun tilbud og priser, når de kommer fra butikken selv.
            Kontroller altid pris og vilkår hos butikken.
          </p>
          <nav aria-label="Footer links">
            <a href="/about.html">Om os</a> · <a href="/annoncering">Annoncering</a> ·{" "}
            <a href="/contact.html">Kontakt</a> ·{" "}
            <a href="/privacy.html">Privatlivspolitik</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
