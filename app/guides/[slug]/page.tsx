import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Tag } from "lucide-react";
import { getGuide, getPublishedGuides } from "@/lib/guides";
import AdSlot from "@/components/AdSlot";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide ikke fundet" };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `https://tilbudjagt.dk/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `https://tilbudjagt.dk/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.publishAt || "2026-11-19",
    inLanguage: "da-DK",
    author: { "@type": "Organization", name: "TilbudJagt.dk" },
    publisher: { "@type": "Organization", name: "TilbudJagt.dk" },
    mainEntityOfPage: `https://tilbudjagt.dk/guides/${guide.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

      <article className="wrap guide-article">
        <a className="text-link" href="/guides">
          <ArrowLeft size={15} /> Alle guides
        </a>
        <span className="eyebrow muted"><BookOpen size={14} /> {guide.kicker}</span>
        <h1>{guide.title}</h1>
        <p className="guide-article-lead">{guide.lead}</p>
        <p className="guide-updated">Opdateret {guide.updated} · TilbudJagt.dk</p>

        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES} />

        <p className="guide-disclaimer">
          Guiden er generel forbrugerinformation og ikke personlig rådgivning.
          Kontroller altid pris, lager og vilkår hos butikken, før du køber.
        </p>

        <div className="guide-article-cta">
          <a className="partner-cta" href="/butikker">
            Se butikker <ArrowRight size={16} />
          </a>
          <a className="store-card-info" href="/guides">
            Læs flere guides
          </a>
        </div>
      </article>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>Guiderne er generel forbrugerinformation, ikke personlig rådgivning.</p>
          <nav aria-label="Footer links">
            <a href="/butikker">Butikker</a> · <a href="/about.html">Om os</a> ·{" "}
            <a href="/annoncering">Annoncering</a> · <a href="/contact.html">Kontakt</a> ·{" "}
            <a href="/privacy.html">Privatlivspolitik</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
