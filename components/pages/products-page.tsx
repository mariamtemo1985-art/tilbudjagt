import type { Metadata } from "next";
import CookieSettingsLink from "@/components/cookie-settings-link";
import { Tag } from "lucide-react";
import { PRODUCTS, PRODUCT_CATEGORIES, PRODUCTS_UPDATED } from "@/lib/products";
import { DEAL_CATEGORIES, getCategoryTotal } from "@/lib/deal-categories";
import ProductBrowser from "@/app/produkter/product-browser";
import AdSlot from "@/components/AdSlot";
import SiteNav from "@/components/site-nav";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Produkter og priser – aktuelle varer",
  description:
    "Se aktuelle produkter og priser fra godkendte partnerbutikker. Søg efter vare, brand eller kategori og se prisen direkte hos butikken.",
  alternates: {
    canonical: "https://www.tilbudjagt.dk/produkter",
    languages: languageAlternates("/produkter"),
  },
};

const COPY: Record<Locale, {
  navProducts: string;
  navStores: string;
  navGuides: string;
  navAbout: string;
  vip: string;
  eyebrow: string;
  title: string;
  lead: string;
  noticeLabel: string;
  notice: string;
  footerProducts: string;
  footerStores: string;
  footerGuides: string;
  footerAdvertising: string;
  footerAbout: string;
  footerContact: string;
  footerPrivacy: string;
  footerTerms: string;
  footerCookies: string;
}> = {
  da: {
    navProducts: "Produkter",
    navStores: "Butikker",
    navGuides: "Guides",
    navAbout: "Om os",
    vip: "Bliv VIP",
    eyebrow: "Priser fra partnerbutikker",
    title: "Produkter og priser",
    lead:
      "Vi viser varer fra butikker, hvor vi har en godkendt partneraftale. Priserne er butikkens egne priser og kan ændre sig. Tjek altid den endelige pris hos butikken, før du køber.",
    noticeLabel: "Reklame:",
    notice:
      `Linkene på denne side er affiliate-links. Hvis du køber via et link, kan vi få en provision – prisen for dig er den samme. Priserne blev sidst hentet ${PRODUCTS_UPDATED}.`,
    footerProducts: "Produkter",
    footerStores: "Butikker",
    footerGuides: "Guides",
    footerAdvertising: "Annoncering",
    footerAbout: "Om os",
    footerContact: "Kontakt",
    footerPrivacy: "Privatliv",
    footerTerms: "Vilkår",
    footerCookies: "Cookies",
  },
  en: {
    navProducts: "Products",
    navStores: "Stores",
    navGuides: "Guides",
    navAbout: "About us",
    vip: "Become VIP",
    eyebrow: "Prices from partner stores",
    title: "Products and prices",
    lead:
      "We show products from stores where we have an approved partner agreement. Prices are the stores’ own prices and can change. Always check the final price with the store before buying.",
    noticeLabel: "Advertising:",
    notice:
      `The links on this page are affiliate links. If you buy through a link, we may receive a commission – your price stays the same. Prices were last fetched ${PRODUCTS_UPDATED}.`,
    footerProducts: "Products",
    footerStores: "Stores",
    footerGuides: "Guides",
    footerAdvertising: "Advertising",
    footerAbout: "About us",
    footerContact: "Contact",
    footerPrivacy: "Privacy",
    footerTerms: "Terms",
    footerCookies: "Cookies",
  },
  ar: {
    navProducts: "المنتجات",
    navStores: "المتاجر",
    navGuides: "الأدلة",
    navAbout: "من نحن",
    vip: "انضم إلى VIP",
    eyebrow: "أسعار من المتاجر الشريكة",
    title: "المنتجات والأسعار",
    lead:
      "نعرض منتجات من متاجر لدينا معها اتفاقية شراكة معتمدة. الأسعار هي أسعار المتاجر نفسها وقد تتغير. تحقق دائمًا من السعر النهائي عند المتجر قبل الشراء.",
    noticeLabel: "إعلان:",
    notice:
      `روابط هذه الصفحة هي روابط تسويق بالعمولة. إذا اشتريت عبر رابط، فقد نحصل على عمولة – السعر عليك يبقى كما هو. تم جلب الأسعار آخر مرة في ${PRODUCTS_UPDATED}.`,
    footerProducts: "المنتجات",
    footerStores: "المتاجر",
    footerGuides: "الأدلة",
    footerAdvertising: "الإعلان",
    footerAbout: "من نحن",
    footerContact: "اتصل بنا",
    footerPrivacy: "الخصوصية",
    footerTerms: "الشروط",
    footerCookies: "الكوكيز",
  },
};

type PageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
  lang?: Locale;
};

export default async function ProductsPage({ searchParams, lang = "da" }: PageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const initialQuery = typeof rawQuery === "string" ? rawQuery.slice(0, 120) : "";
  const t = COPY[lang];
  const home = localePath(lang, "/");
  const stores = `${home}#butikker`;
  const products = localePath(lang, "/produkter");
  const guides = localePath(lang, "/guides");

  return (
    <main lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <header className="header wrap">
        <a className="brand" href={home}>
          <span className="brand-mark">
            <Tag size={22} />
          </span>
          <span>
            Tilbud<span className="brand-accent">Jagt</span>
            <small>.dk</small>
          </span>
        </a>
        <SiteNav ariaLabel={t.navProducts}>
          <a href={products}>{t.navProducts}</a>
          <a href={stores}>{t.navStores}</a>
          <a href={guides}>{t.navGuides}</a>
          <a href="/about.html">{t.navAbout}</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href={`${home}#vip`}>{t.vip}</a>
        </div>
      </header>
      <section className="wrap section">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="lead">{t.lead}</p>
        <p className="notice" role="note">
          <strong>{t.noticeLabel}</strong> {t.notice}
        </p>
      </section>
      {lang === "da" && (
        <section className="wrap category-pills-section" aria-labelledby="popular-categories">
          <div className="section-title">
            <div>
              <p className="eyebrow">Sammenlign efter behov</p>
              <h2 id="popular-categories">Populære kategorier</h2>
            </div>
            <a className="text-link" href="/tilbud">
              Se alle kategorier
            </a>
          </div>
          <div className="category-pills">
            {DEAL_CATEGORIES.map((category) => (
              <a className="category-pill" href={`/tilbud/${category.slug}`} key={category.slug}>
                <strong>{category.h1}</strong>
                <span>{getCategoryTotal(category)} varer</span>
              </a>
            ))}
          </div>
        </section>
      )}
      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCTS} />
      </div>
      <ProductBrowser
        initialProducts={PRODUCTS.slice(0, 48)}
        initialTotal={PRODUCTS.length}
        categories={PRODUCT_CATEGORIES}
        initialQuery={initialQuery}
        initialLang={lang}
        forcedLang={lang !== "da"}
      />
      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href={home}>
            <span className="brand-mark">
              <Tag size={20} />
            </span>
            <span>
              Tilbud<span className="brand-accent">Jagt</span>
              <small>.dk</small>
            </span>
          </a>
          <p className="footer-links">
            <a href={products}>{t.footerProducts}</a> · <a href={stores}>{t.footerStores}</a> ·{" "}
            <a href={guides}>{t.footerGuides}</a> · <a href="/annoncering">{t.footerAdvertising}</a> ·{" "}
            <a href="/about.html">{t.footerAbout}</a> ·{" "}
            <a href="/contact.html">{t.footerContact}</a> · <a href="/privacy.html">{t.footerPrivacy}</a> ·{" "}
            <a href="/vilkaar.html">{t.footerTerms}</a> · <a href="/cookies.html">{t.footerCookies}</a> · <CookieSettingsLink />
          </p>
        </div>
      </footer>
    </main>
  );
}
