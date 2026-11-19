import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { STORES } from "@/lib/stores";
import StoreBrowser from "./store-browser";
import AdSlot from "@/components/AdSlot";
import SponsoredBanner from "@/components/SponsoredBanner";

export const metadata: Metadata = {
  title: "Butikker – find danske butikker",
  description:
    "Søg blandt danske butikker på navn eller kategori. Se hvilke butikker der er godkendte partnere, og hvilke der kun er direkte links.",
  alternates: { canonical: "https://tilbudjagt.dk/butikker" },
};

export default function StoresPage() {
  return (
    <main>
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
        <nav className="nav nav-open" aria-label="Hovedmenu">
          <a href="/butikker">Butikker</a>
          <a href="/about.html">Om os</a>
          <a href="/contact.html">Kontakt</a>
        </nav>
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
