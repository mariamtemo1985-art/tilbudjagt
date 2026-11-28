import type { Metadata } from "next";
import CookieSettingsLink from "@/components/cookie-settings-link";
import { ArrowRight, BookOpen, Tag } from "lucide-react";
import { getPublishedGuides } from "@/lib/guides";
import { localizeGuide } from "@/lib/guides-i18n";
import SiteNav from "@/components/site-nav";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guides – sådan vurderer du et tilbud",
  description:
    "Praktiske guides fra TilbudJagt: gennemskue falske tilbud, sammenligne dagligvarepriser, vurdere elektronik og forstå affiliate-links.",
  alternates: {
    canonical: "https://www.tilbudjagt.dk/guides",
    languages: languageAlternates("/guides"),
  },
};

const COPY: Record<Locale, {
  navStores: string;
  navGuides: string;
  navCoupons: string;
  navContact: string;
  vip: string;
  eyebrow: string;
  title: string;
  intro: string;
  readGuide: string;
  methodology: string;
  ctaTitle: string;
  ctaText: string;
  seeStores: string;
  footer: string;
  footerLinks: string;
}> = {
  da: {
    navStores: "Butikker",
    navGuides: "Guides",
    navCoupons: "Rabatkoder",
    navContact: "Kontakt",
    vip: "Bliv VIP",
    eyebrow: "GUIDES",
    title: "Bliv klogere på tilbud",
    intro:
      "Vi viser først priser, når de kommer fra butikken selv. Indtil da kan du bruge vores guides til at vurdere, om et tilbud er værd at tage.",
    readGuide: "Læs guiden",
    methodology: "Sådan tjekker vi tilbud og butikker",
    ctaTitle: "Find butikkerne bag tilbuddene",
    ctaText: "Søg på navn eller kategori og se, hvilke butikker der er godkendte partnere.",
    seeStores: "Se butikker",
    footer: "Guiderne er generel forbrugerinformation, ikke personlig rådgivning.",
    footerLinks: "Footer links",
  },
  en: {
    navStores: "Stores",
    navGuides: "Guides",
    navCoupons: "Coupon codes",
    navContact: "Contact",
    vip: "Become VIP",
    eyebrow: "GUIDES",
    title: "Make better sense of deals",
    intro:
      "We only show prices when they come from the store itself. Until then, use our guides to judge whether an offer is worth taking.",
    readGuide: "Read the guide",
    methodology: "How we check offers and stores",
    ctaTitle: "Find the stores behind the deals",
    ctaText: "Search by name or category and see which stores are approved partners.",
    seeStores: "See stores",
    footer: "The guides are general consumer information, not personal advice.",
    footerLinks: "Footer links",
  },
  ar: {
    navStores: "المتاجر",
    navGuides: "الأدلة",
    navCoupons: "أكواد الخصم",
    navContact: "اتصل بنا",
    vip: "انضم إلى VIP",
    eyebrow: "أدلة",
    title: "افهم العروض قبل أن تشتري",
    intro:
      "لا نعرض الأسعار إلا عندما تأتي من المتجر نفسه. حتى ذلك الحين، استخدم أدلتنا لتقييم ما إذا كان العرض يستحق المتابعة.",
    readGuide: "اقرأ الدليل",
    methodology: "كيف نتحقق من العروض والمتاجر",
    ctaTitle: "اكتشف المتاجر وراء العروض",
    ctaText: "ابحث بالاسم أو الفئة وتعرّف على المتاجر الشريكة المعتمدة.",
    seeStores: "شاهد المتاجر",
    footer: "الأدلة معلومات عامة للمستهلك وليست نصيحة شخصية.",
    footerLinks: "روابط الفوتر",
  },
};

function guideHref(locale: Locale, slug: string) {
  // English guide bodies are not translated yet; keep English readers on the Danish original.
  return locale === "en" ? `/guides/${slug}` : localePath(locale, `/guides/${slug}`);
}

export default function GuidesPage({ lang = "da" }: { lang?: Locale }) {
  const t = COPY[lang];
  const home = localePath(lang, "/");
  const stores = `${home}#butikker`;
  const guidesPath = localePath(lang, "/guides");
  const guides = getPublishedGuides()
    .sort(
      (a, b) =>
        new Date(b.publishAt ?? "2026-11-19").getTime() -
        new Date(a.publishAt ?? "2026-11-19").getTime(),
    )
    .map((guide) => localizeGuide(guide, lang));

  return (
    <main lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="header wrap">
        <a className="brand" href={home}>
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <SiteNav ariaLabel={t.navGuides}>
          <a href={stores}>{t.navStores}</a>
          <a href={guidesPath}>{t.navGuides}</a>
          <a href={localePath(lang, "/rabatkoder")}>{t.navCoupons}</a>
          <a href="/contact.html">{t.navContact}</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href={`${home}#vip`}>{t.vip}</a>
        </div>
      </header>
      <section className="wrap guides-hero">
        <span className="eyebrow muted"><BookOpen size={14} /> {t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <a className="text-link" href={guideHref(lang, "saadan-tjekker-vi-tilbud")}>
          {t.methodology} <ArrowRight size={15} />
        </a>
      </section>
      <section className="wrap guides-list">
        {guides.map((guide) => (
          <article className="guide-card" id={guide.slug} key={guide.slug}>
            <span className="eyebrow">{guide.kicker}</span>
            <h2>
              <a href={guideHref(lang, guide.slug)}>{guide.title}</a>
            </h2>
            <p className="guide-lead">{guide.lead}</p>
            <a className="text-link" href={guideHref(lang, guide.slug)}>
              {t.readGuide} <ArrowRight size={15} />
            </a>
          </article>
        ))}
      </section>
      <section className="wrap guides-cta">
        <div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <a className="partner-cta" href={stores}>{t.seeStores} <ArrowRight size={16} /></a>
      </section>
      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href={home}>
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>{t.footer}</p>
          <nav aria-label={t.footerLinks}>
            <a href={stores}>{t.navStores}</a> · <a href="/about.html">{lang === "ar" ? "من نحن" : lang === "en" ? "About us" : "Om os"}</a> ·{" "}
            <a href="/contact.html">{t.navContact}</a> ·{" "}
            <a href="/privacy.html">{lang === "ar" ? "سياسة الخصوصية" : lang === "en" ? "Privacy policy" : "Privatlivspolitik"}</a> · <CookieSettingsLink />
          </nav>
        </div>
      </footer>
    </main>
  );
}
