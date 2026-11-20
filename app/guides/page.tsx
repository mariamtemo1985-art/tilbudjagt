import type { Metadata } from "next";
import { ArrowRight, BookOpen, Tag } from "lucide-react";
import { getPublishedGuides } from "@/lib/guides";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guides – sådan vurderer du et tilbud",
  description:
    "Praktiske guides fra TilbudJagt: gennemskue falske tilbud, sammenligne dagligvarepriser, vurdere elektronik og forstå affiliate-links.",
  alternates: { canonical: "https://www.tilbudjagt.dk/guides" },
};

export default function GuidesPage() {
  const guides = getPublishedGuides();
  return (
    <main>
      <header className="header wrap">
        <a className="brand" href="/">
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <nav className="nav nav-open" aria-label="Hovedmenu">
          <a href="/butikker">Butikker</a>
          <a href="/guides">Guides</a>
          <a href="/contact.html">Kontakt</a>
        </nav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">Bliv VIP</a>
        </div>
      </header>
      <section className="wrap guides-hero">
        <span className="eyebrow muted"><BookOpen size={14} /> GUIDES</span>
        <h1>Bliv klogere på tilbud</h1>
        <p>
          Vi viser først priser, når de kommer fra butikken selv. Indtil da kan du
          bruge vores guides til at vurdere, om et tilbud er værd at tage.
        </p>
      </section>
      <section className="wrap guides-list">
        {guides.map((guide) => (
          <article className="guide-card" id={guide.slug} key={guide.slug}>
            <span className="eyebrow">{guide.kicker}</span>
            <h2>
              <a href={`/guides/${guide.slug}`}>{guide.title}</a>
            </h2>
            <p className="guide-lead">{guide.lead}</p>
            <a className="text-link" href={`/guides/${guide.slug}`}>
              Læs guiden <ArrowRight size={15} />
            </a>
          </article>
        ))}
      </section>
      <section className="wrap guides-cta">
        <div>
          <h2>Find butikkerne bag tilbuddene</h2>
          <p>Søg på navn eller kategori og se, hvilke butikker der er godkendte partnere.</p>
        </div>
        <a className="partner-cta" href="/butikker">Se butikker <ArrowRight size={16} /></a>
      </section>
      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>Guiderne er generel forbrugerinformation, ikke personlig rådgivning.</p>
          <nav aria-label="Footer links">
            <a href="/butikker">Butikker</a> · <a href="/about.html">Om os</a> ·{" "}
            <a href="/contact.html">Kontakt</a> · <a href="/privacy.html">Privatlivspolitik</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
