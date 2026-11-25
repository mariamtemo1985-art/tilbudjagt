import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Tag } from "lucide-react";
import AdSlot from "@/components/AdSlot";
import CookieSettingsLink from "@/components/cookie-settings-link";
import SiteNav from "@/components/site-nav";
import {
  DEAL_CATEGORIES,
  getCategoryProducts,
  getCategoryTotal,
  getDealCategory,
} from "@/lib/deal-categories";
import { PRODUCTS_UPDATED } from "@/lib/products";
import { SITE_URL } from "@/lib/i18n";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DEAL_CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getDealCategory(slug);
  if (!category) return { title: "Kategori ikke fundet" };
  const url = `${SITE_URL}/tilbud/${category.slug}`;
  return {
    title: { absolute: category.title },
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "da_DK",
      title: category.title,
      description: category.description,
      url,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${category.h1} på TilbudJagt.dk`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getDealCategory(slug);
  if (!category) notFound();

  const products = getCategoryProducts(category, 24);
  const total = getCategoryTotal(category);
  const url = `${SITE_URL}/tilbud/${category.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: category.title,
        description: category.description,
        url,
        inLanguage: "da-DK",
        isPartOf: { "@type": "WebSite", name: "TilbudJagt.dk", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Forside", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tilbud",
            item: `${SITE_URL}/tilbud`,
          },
          { "@type": "ListItem", position: 3, name: category.h1, item: url },
        ],
      },
      {
        "@type": "ItemList",
        name: category.h1,
        numberOfItems: total,
        itemListElement: products.slice(0, 10).map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: product.url,
        })),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main lang="da" dir="ltr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
        <SiteNav ariaLabel={category.h1}>
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
        <p className="eyebrow">Priser fra partnerbutikker</p>
        <h1>{category.h1}</h1>
        <p className="lead">{category.lead}</p>
        <p className="notice" role="note">
          <strong>Reklame:</strong> Linkene på denne side er affiliate-links. Hvis
          du køber via et link, kan TilbudJagt modtage en provision – prisen for
          dig er den samme. Priserne blev sidst hentet {PRODUCTS_UPDATED}.
        </p>
      </section>

      <section className="wrap category-intro">
        {category.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="wrap category-products" aria-labelledby="category-products">
        <div className="section-title">
          <div>
            <p className="eyebrow">Sammenlign priser</p>
            <h2 id="category-products">Aktuelle produkter</h2>
          </div>
          <span className="result-count">
            {total > products.length
              ? `Viser de ${products.length} billigste af ${total} varer`
              : `${total} varer i kategorien`}
          </span>
        </div>
        <p className="result-count">
          Sorteret efter laveste pris blandt de varer, vi har data på. Klik for
          at se den aktuelle pris hos butikken.
        </p>
        <div className="product-grid">
          {products.map((product) => (
            <a
              key={product.id}
              className="product-card"
              href={product.url}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
            >
              <span className="product-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={product.name} loading="lazy" />
              </span>
              <span className="product-body">
                <span className="product-brand">
                  {product.brand || product.category}
                </span>
                <span className="product-name">{product.name}</span>
                <span className="product-price">
                  {product.price.toFixed(2).replace(".", ",")} kr.
                </span>
                <span className="product-store">
                  {product.store} <ExternalLink size={12} />
                </span>
              </span>
            </a>
          ))}
        </div>
        {products.length === 0 && (
          <p className="notice">
            Der er ingen produkter i denne kategori lige nu. Prøv vores samlede
            produktoversigt.
          </p>
        )}
        <a className="product-more" href="/produkter">
          Se alle produkter <ArrowRight size={14} />
        </a>
      </section>

      <section className="wrap category-seo">
        <h2>Sådan vælger du</h2>
        <div className="category-tips">
          {category.tips.map((tip) => (
            <div className="category-tip" key={tip.title}>
              <h3>{tip.title}</h3>
              <p>{tip.body}</p>
            </div>
          ))}
        </div>

        <h2>Ofte stillede spørgsmål</h2>
        <div className="faq-list">
          {category.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>

        <h2>Relaterede sider</h2>
        <div className="related-links">
          {category.related.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label} <ArrowRight size={13} />
            </a>
          ))}
        </div>
      </section>

      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCTS} />
      </div>

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
            <a href="/privacy.html">Privatliv</a> · <a href="/vilkaar.html">Vilkår</a> ·{" "}
            <a href="/cookies.html">Cookies</a> · <CookieSettingsLink />
          </p>
        </div>
      </footer>
    </main>
  );
}
