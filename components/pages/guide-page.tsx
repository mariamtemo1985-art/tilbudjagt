import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Tag } from "lucide-react";
import { getGuide, getPublishedGuides } from "@/lib/guides";
import { localizeGuide } from "@/lib/guides-i18n";
import { getStore, getStoreCategoryLabel } from "@/lib/stores";
import { getStoreLogo } from "@/lib/store-logos";
import AdSlot from "@/components/AdSlot";
import ShareStoreButton from "@/components/ShareStoreButton";
import SiteNav from "@/components/site-nav";
import {
  danishArabicAlternates,
  localePath,
  localeUrl,
  type Locale,
} from "@/lib/i18n";

type PageProps = { params: Promise<{ slug: string }> };
type GuidePageProps = { slug: string; lang?: Locale };

export const dynamicParams = true;
export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }));
}

const COPY: Record<Locale, {
  navStores: string;
  navGuides: string;
  navContact: string;
  vip: string;
  allGuides: string;
  updated: string;
  readAlso: string;
  readGuide: string;
  seeStores: string;
  seeCoupons: string;
  readMore: string;
  relatedStoresTitle: string;
  visitStore: string;
  faqTitle: string;
  methodology: string;
  disclaimer: string;
  footer: string;
  footerLinks: string;
}> = {
  da: {
    navStores: "Butikker",
    navGuides: "Guides",
    navContact: "Kontakt",
    vip: "Bliv VIP",
    allGuides: "Alle guides",
    updated: "Opdateret",
    readAlso: "Læs også",
    readGuide: "Læs guiden",
    seeStores: "Se butikker",
    seeCoupons: "Se rabatkoder",
    readMore: "Læs flere guides",
    relatedStoresTitle: "Butikker du kan sammenligne",
    visitStore: "Se butik",
    faqTitle: "Ofte stillede spørgsmål",
    methodology: "Sådan tjekker vi tilbud",
    disclaimer:
      "Guiden er generel forbrugerinformation og ikke personlig rådgivning. Kontroller altid pris, lager og vilkår hos butikken, før du køber.",
    footer: "Guiderne er generel forbrugerinformation, ikke personlig rådgivning.",
    footerLinks: "Footer links",
  },
  en: {
    navStores: "Stores",
    navGuides: "Guides",
    navContact: "Contact",
    vip: "Become VIP",
    allGuides: "All guides",
    updated: "Updated",
    readAlso: "Read also",
    readGuide: "Read the guide",
    seeStores: "See stores",
    seeCoupons: "See coupon codes",
    readMore: "Read more guides",
    relatedStoresTitle: "Stores to compare",
    visitStore: "View store",
    faqTitle: "Frequently asked questions",
    methodology: "How we check offers",
    disclaimer:
      "This guide is general consumer information, not personal advice. Always check price, stock and terms with the store before buying.",
    footer: "The guides are general consumer information, not personal advice.",
    footerLinks: "Footer links",
  },
  ar: {
    navStores: "المتاجر",
    navGuides: "الأدلة",
    navContact: "اتصل بنا",
    vip: "انضم إلى VIP",
    allGuides: "كل الأدلة",
    updated: "آخر تحديث",
    readAlso: "اقرأ أيضًا",
    readGuide: "اقرأ الدليل",
    seeStores: "شاهد المتاجر",
    seeCoupons: "شاهد أكواد الخصم",
    readMore: "اقرأ المزيد من الأدلة",
    relatedStoresTitle: "متاجر يمكنك مقارنتها",
    visitStore: "شاهد المتجر",
    faqTitle: "الأسئلة الشائعة",
    methodology: "كيف نتحقق من العروض",
    disclaimer:
      "هذا الدليل معلومات عامة للمستهلك وليس نصيحة شخصية. تحقق دائمًا من السعر والتوفر والشروط عند المتجر قبل الشراء.",
    footer: "الأدلة معلومات عامة للمستهلك وليست نصيحة شخصية.",
    footerLinks: "روابط الفوتر",
  },
};

function guideHref(lang: Locale, slug: string) {
  return lang === "da" ? `/guides/${slug}` : localePath(lang, `/guides/${slug}`);
}
function contentHref(lang: Locale, href: string) {
  if (href.endsWith(".html")) return href;
  return localePath(lang, href);
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
    alternates: {
      canonical: url,
      languages: danishArabicAlternates(`/guides/${guide.slug}`),
    },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: guide.title }],
      publishedTime: published,
      modifiedTime: published,
    },
  };
}

export default async function GuidePage({ slug, lang = "da" }: GuidePageProps) {
  const source = getGuide(slug);
  if (!source) notFound();
  const guide = localizeGuide(source, lang);
  const t = COPY[lang];
  const home = localePath(lang, "/");
  const guidesPath = localePath(lang, "/guides");
  const url = localeUrl(lang, `/guides/${guide.slug}`);
  const published = guide.publishAt || "2026-11-19";
  const related = getPublishedGuides()
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3)
    .map((item) => localizeGuide(item, lang));
  const faqJsonLd = guide.faq?.length
    ? [
        {
          "@type": "FAQPage",
          mainEntity: guide.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },
      ]
    : [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: guide.title,
        description: guide.description,
        datePublished: published,
        dateModified: published,
        inLanguage: lang === "ar" ? "ar" : "da-DK",
        image: "https://www.tilbudjagt.dk/og-image.png",
        author: {
          "@type": "Organization",
          "@id": "https://www.tilbudjagt.dk/#organization",
          name: "TilbudJagt.dk",
          url: "https://www.tilbudjagt.dk/",
        },
        editor: {
          "@type": "Organization",
          "@id": "https://www.tilbudjagt.dk/#organization",
          name: "TilbudJagt.dk",
          url: "https://www.tilbudjagt.dk/",
        },
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: "TilbudJagt.dk",
          url: "https://www.tilbudjagt.dk/",
          logo: { "@type": "ImageObject", url: "https://www.tilbudjagt.dk/icon.png" },
        },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: lang === "ar" ? "الرئيسية" : "Forside",
            item: home,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: lang === "ar" ? "الأدلة" : "Guides",
            item: guidesPath,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: url,
          },
        ],
      },
      ...faqJsonLd,
    ],
  };

  return (
    <main lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="header wrap">
        <a className="brand" href={home}>
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <SiteNav ariaLabel={t.navGuides}>
          <a href={`${home}#butikker`}>{t.navStores}</a>
          <a href={guidesPath}>{t.navGuides}</a>
          <a href="/contact.html">{t.navContact}</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href={`${home}#vip`}>{t.vip}</a>
        </div>
      </header>
      <article className="wrap guide-article">
        <a className="text-link" href={guidesPath}>
          <ArrowLeft size={15} /> {t.allGuides}
        </a>
        <span className="eyebrow muted"><BookOpen size={14} /> {guide.kicker}</span>
        <h1>{guide.title}</h1>
        <p className="guide-article-lead">{guide.lead}</p>
        <p className="guide-updated">{t.updated} {guide.updated} · TilbudJagt.dk</p>
        <div className="guide-share">
          <ShareStoreButton
            name={guide.title}
            url={url}
            label={t.readGuide}
            text={`${t.readGuide}: ${guide.title} – TilbudJagt.dk`}
            ariaLabel={`${t.readGuide}: ${guide.title}`}
          />
        </div>
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {section.links && section.links.length > 0 && (
              <p className="guide-section-links">
                {section.links.map((link) => (
                  <a className="text-link" href={contentHref(lang, link.href)} key={link.href}>
                    {link.label} <ArrowRight size={15} />
                  </a>
                ))}
              </p>
            )}
          </section>
        ))}
        {guide.faq && guide.faq.length > 0 && (
          <section className="guide-faq">
            <h2>{t.faqTitle}</h2>
            {guide.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </section>
        )}
        {guide.relatedStores && guide.relatedStores.length > 0 && (
          <section className="guide-related-stores">
            <h2>{t.relatedStoresTitle}</h2>
            <div className="store-grid">
              {guide.relatedStores.map((storeSlug) => {
                const store = getStore(storeSlug);
                if (!store) return null;
                const logo = getStoreLogo(storeSlug);
                return (
                  <a
                    className="store-card"
                    href={localePath(lang, `/butikker/${store.slug}`)}
                    key={storeSlug}
                  >
                    <span className="store-card-main">
                      <span className={logo ? "store-avatar store-avatar-logo" : "store-avatar"}>
                        {logo ? (
                          <img src={logo} alt="" />
                        ) : (
                          store.name.slice(0, 2).toUpperCase()
                        )}
                      </span>
                      <span className="store-card-body">
                        <strong>{store.name}</strong>
                        <small>{getStoreCategoryLabel(store, lang)}</small>
                      </span>
                    </span>
                    <span className="store-card-info">{t.visitStore}</span>
                  </a>
                );
              })}
            </div>
          </section>
        )}
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES} />
        <p className="guide-disclaimer">{t.disclaimer}</p>
        <div className="guide-article-cta">
          <a className="partner-cta" href={`${home}#butikker`}>
            {t.seeStores} <ArrowRight size={16} />
          </a>
          <a className="store-card-info" href={localePath(lang, "/rabatkoder")}>
            {t.seeCoupons}
          </a>
          {guide.slug !== "saadan-tjekker-vi-tilbud" && (
            <a
              className="store-card-info"
              href={localePath(lang, "/guides/saadan-tjekker-vi-tilbud")}
            >
              {t.methodology}
            </a>
          )}
          <a className="store-card-info" href={guidesPath}>
            {t.readMore}
          </a>
        </div>
      </article>
      {related.length > 0 && (
        <section className="wrap related-guides">
          <h2>{t.readAlso}</h2>
          <div className="guides-list">
            {related.map((item) => (
              <article className="guide-card" key={item.slug}>
                <span className="eyebrow">{item.kicker}</span>
                <h2>
                  <a href={guideHref(lang, item.slug)}>{item.title}</a>
                </h2>
                <p className="guide-lead">{item.lead}</p>
                <a className="text-link" href={guideHref(lang, item.slug)}>
                  {t.readGuide} <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>
      )}
      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href={home}>
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>{t.footer}</p>
          <nav aria-label={t.footerLinks}>
            <a href={`${home}#butikker`}>{t.navStores}</a> · <a href="/about.html">{lang === "ar" ? "من نحن" : "Om os"}</a> ·{" "}
            <a href="/annoncering">{lang === "ar" ? "الإعلان" : "Annoncering"}</a> ·{" "}
            <a href="/contact.html">{t.navContact}</a> ·{" "}
            <a href="/privacy.html">{lang === "ar" ? "سياسة الخصوصية" : "Privatlivspolitik"}</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
