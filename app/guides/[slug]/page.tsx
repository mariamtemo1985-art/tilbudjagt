import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Tag } from "lucide-react";
import { getGuide, getPublishedGuides } from "@/lib/guides";
import AdSlot from "@/components/AdSlot";
import ShareStoreButton from "@/components/ShareStoreButton";

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
  const url = `https://www.tilbudjagt.dk/guides/${guide.slug}`;
  const published = guide.publishAt || "2026-11-19";
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
      publishedTime: published,
      modifiedTime: published,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const url = `https://www.tilbudjagt.dk/guides/${guide.slug}`;
  const published = guide.publishAt || "2026-11-19";
  const related = getPublishedGuides()
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: published,
        dateModified: published,
        inLanguage: "da-DK",
        image: "https://www.tilbudjagt.dk/og-image.png",
        author: {
          "@type": "Organization",
          name: "TilbudJagt.dk",
          url: "https://www.tilbudjagt.dk/",
        },
        publisher: {
          "@type": "Organization",
          name: "TilbudJagt.dk",
          url: "https://www.tilbudjagt.dk/",
          logo: {
            "@type": "ImageObject",
            url: "https://www.tilbudjagt.dk/icon.png",
          },
        },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Forside",
            item: "https://www.tilbudjagt.dk/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: "https://www.tilbudjagt.dk/guides",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: url,
          },
        ],
      },
    ],
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
        <div className="guide-share">
          <ShareStoreButton
            name={guide.title}
            url={url}
            label="Del guide"
            text={`Læs ${guide.title} på TilbudJagt.dk`}
            ariaLabel={`Del guiden ${guide.title}`}
          />
        </div>

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
      {related.length > 0 && (
        <section className="wrap related-guides">
          <h2>Læs også</h2>
          <div className="guides-list">
            {related.map((item) => (
              <article className="guide-card" key={item.slug}>
                <span className="eyebrow">{item.kicker}</span>
                <h2>
                  <a href={`/guides/${item.slug}`}>{item.title}</a>
                </h2>
                <p className="guide-lead">{item.lead}</p>
                <a className="text-link" href={`/guides/${item.slug}`}>
                  Læs guiden <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

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
