import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Tag } from "lucide-react";
import StoreBrowser from "@/app/butikker/store-browser";
import BlackFridayStrip from "@/components/pages/black-friday-strip";
import AdSlot from "@/components/AdSlot";
import SponsoredBanner from "@/components/SponsoredBanner";
import SiteNav from "@/components/site-nav";
import { STORES } from "@/lib/stores";
import {
  PAGE_META,
  isLocalizedLocale,
  languageAlternates,
  localePath,
  localeUrl,
  type Locale,
} from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const COPY: Record<"en" | "ar", {
  navStores: string;
  navAbout: string;
  navContact: string;
  vip: string;
  footer: string;
  footerLinks: string;
  itemListName: string;
}> = {
  en: {
    navStores: "Stores",
    navAbout: "About us",
    navContact: "Contact",
    vip: "Become VIP",
    footer: "TilbudJagt only shows offers and prices when they come from the store itself. Always check the price and terms with the store.",
    footerLinks: "Footer links",
    itemListName: "Stores in Denmark",
  },
  ar: {
    navStores: "المتاجر",
    navAbout: "من نحن",
    navContact: "اتصل بنا",
    vip: "انضم إلى VIP",
    footer: "تعرض TilbudJagt العروض والأسعار فقط عندما تأتي من المتجر نفسه. تحقق دائمًا من السعر والشروط عند المتجر.",
    footerLinks: "روابط الفوتر",
    itemListName: "المتاجر في الدنمارك",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) return {};
  const meta = PAGE_META.stores[locale];
  const url = localeUrl(locale, "/butikker");
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url, languages: languageAlternates("/butikker") },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      title: meta.title,
      description: meta.description,
      url,
    },
  };
}

export default async function LocalizedStoresPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocalizedLocale(locale)) notFound();
  const lang = locale as "en" | "ar";
  const t = COPY[lang];
  const home = localePath(lang, "/");
  const stores = localePath(lang, "/butikker");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.itemListName,
    numberOfItems: STORES.length,
    itemListElement: STORES.map((store, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: store.name,
      url: localeUrl(lang, `/butikker/${store.slug}`),
    })),
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
        <SiteNav ariaLabel={t.navStores}>
          <a href={`${home}#butikker`}>{t.navStores}</a>
          <a href="/about.html">{t.navAbout}</a>
          <a href="/contact.html">{t.navContact}</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href={`${home}#vip`}>{t.vip}</a>
        </div>
      </header>
      <SponsoredBanner />
      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_STORES} />
      </div>
      <BlackFridayStrip lang={lang} />
      <StoreBrowser stores={STORES} initialLang={lang} forcedLang />
      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href={home}>
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>{t.footer}</p>
          <nav aria-label={t.footerLinks}>
            <a href={stores}>{t.navStores}</a> · <a href={localePath(lang, "/rabatkoder")}>{lang === "ar" ? "أكواد الخصم" : "Coupon codes"}</a> ·{" "}
            <a href="/about.html">{t.navAbout}</a> · <a href="/contact.html">{t.navContact}</a> ·{" "}
            <a href="/privacy.html">{lang === "ar" ? "سياسة الخصوصية" : "Privacy policy"}</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
