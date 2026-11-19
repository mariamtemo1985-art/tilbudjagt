import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES, PRODUCTS_UPDATED } from "@/lib/products";
import ProductBrowser from "./product-browser";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Produkter og priser – aktuelle varer",
  description:
    "Se aktuelle produkter og priser fra godkendte partnerbutikker. Søg efter vare, brand eller kategori og se prisen direkte hos butikken.",
  alternates: { canonical: "https://tilbudjagt.dk/produkter" },
};

export default function ProductsPage() {
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
          <a href="/produkter">Produkter</a>
          <a href="/butikker">Butikker</a>
          <a href="/guides">Guides</a>
          <a href="/about.html">Om os</a>
        </nav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">Bliv VIP</a>
        </div>
      </header>

      <section className="wrap section">
        <p className="eyebrow">Priser fra partnerbutikker</p>
        <h1>Produkter og priser</h1>
        <p className="lead">
          Vi viser varer fra butikker, hvor vi har en godkendt partneraftale. Priserne er
          butikkens egne priser og kan ændre sig. Tjek altid den endelige pris hos butikken,
          før du køber.
        </p>
        <p className="notice" role="note">
          <strong>Reklame:</strong> Linkene på denne side er affiliate-links. Hvis du køber
          via et link, kan vi få en provision – prisen for dig er den samme. Priserne blev
          sidst hentet {PRODUCTS_UPDATED}.
        </p>
      </section>

      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCTS} />
      </div>

      <ProductBrowser
        initialProducts={PRODUCTS.slice(0, 48)}
        initialTotal={PRODUCTS.length}
        categories={PRODUCT_CATEGORIES}
      />

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
            <a href="/about.html">Om os</a> ·{" "}
            <a href="/contact.html">Kontakt</a> · <a href="/privacy.html">Privatliv</a> ·{" "}
            <a href="/vilkaar.html">Vilkår</a> · <a href="/cookies.html">Cookies</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
