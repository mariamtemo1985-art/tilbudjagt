import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Store as StoreIcon, Tag } from "lucide-react";
import { STORE_CATEGORIES, STORES, getStore, isAffiliateLink } from "@/lib/stores";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return STORES.map((store) => ({ slug: store.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) return { title: "Butik ikke fundet" };
  return {
    title: `${store.name} – butiksinfo`,
    description: store.description.da,
    alternates: { canonical: `https://tilbudjagt.dk/butikker/${store.slug}` },
  };
}

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store) notFound();

  const partner = isAffiliateLink(store);
  const href = partner ? store.affiliateUrl! : store.website;

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
      <section className="wrap store-detail">
        <a className="text-link" href="/butikker">
          <ArrowLeft size={16} /> Alle butikker
        </a>
        <div className="store-detail-card">
          <span className="store-avatar large" aria-hidden="true">
            {store.name.slice(0, 1)}
          </span>
          <div>
            <span className="eyebrow muted">{STORE_CATEGORIES[store.category].da}</span>
            <h1>{store.name}</h1>
            <p>{store.description.da}</p>
            <span
              className={
                partner ? "status-badge partner" : "status-badge directory"
              }
            >
              {partner ? (
                <>
                  <Tag size={11} /> Godkendt partner
                </>
              ) : (
                <>
                  <StoreIcon size={11} /> Direkte link
                </>
              )}
            </span>
          </div>
        </div>

        <div className="store-detail-actions">
          <span className="visit-hint">Klik her for at åbne butikkens hjemmeside:</span>
          <a
            className={partner ? "partner-cta" : "store-direct-cta"}
            href={href}
            target="_blank"
            rel={partner ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          >
            Besøg {store.name} <ArrowRight size={16} />
          </a>
          {partner ? (
            <p className="partner-disclosure">
              Reklamelink: TilbudJagt kan modtage provision, hvis du klikker på
              linket og handler hos {store.name}. Din pris ændres ikke.
            </p>
          ) : (
            <p className="partner-disclosure">
              Direkte link uden provision: TilbudJagt har endnu ikke en godkendt
              partneraftale med {store.name}. Linket går til butikkens egen
              hjemmeside.
            </p>
          )}
        </div>

        <div className="demo-note store-detail-note">
          <Tag size={15} />
          <span>
            <b>Ingen verificerede tilbud endnu.</b> Vi viser først priser og
            tilbud, når de kommer fra butikkens egne data eller et godkendt
            partnerfeed. Kontroller altid aktuelle priser hos butikken.
          </span>
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
          <p>© {new Date().getFullYear()} TilbudJagt.dk</p>
          <nav aria-label="Footer links">
            <a href="/about.html">Om os</a> · <a href="/contact.html">Kontakt</a> ·{" "}
            <a href="/privacy.html">Privatlivspolitik</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
