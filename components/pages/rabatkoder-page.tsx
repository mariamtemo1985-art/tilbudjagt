import type { Metadata } from "next";
import CookieSettingsLink from "@/components/cookie-settings-link";
import { ArrowRight, RefreshCw, Tag, TicketPercent } from "lucide-react";
import SiteNav from "@/components/site-nav";
import StoreLogo from "@/components/store-logo";
import CopyCode from "@/components/copy-code";
import coupons from "@/content/coupons.json";
import deals from "@/content/deals.json";
import { languageAlternates, localePath, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Rabatkoder og aktuelle tilbud",
  description:
    "Officielle rabatkoder og aktuelle nedsatte produkter fra danske partnerbutikker. Kopier koden og shop direkte hos butikken.",
  alternates: {
    canonical: "https://www.tilbudjagt.dk/rabatkoder",
    languages: languageAlternates("/rabatkoder"),
  },
};

type Deal = {
  store: string;
  storeSlug: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
  url: string;
};

const COPY: Record<Locale, {
  navCoupons: string;
  navStores: string;
  navGuides: string;
  navContact: string;
  vip: string;
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  disclosure: string;
  couponsTitle: string;
  validUntil: string;
  useCode: (store: string) => string;
  dealsTitle: string;
  dealsNote: string;
  seeDeal: string;
  ctaTitle: string;
  ctaText: string;
  seeAllStores: string;
  footer: string;
  footerLinks: string;
  itemListName: string;
}> = {
  da: {
    navCoupons: "Rabatkoder",
    navStores: "Butikker",
    navGuides: "Guides",
    navContact: "Kontakt",
    vip: "Bliv VIP",
    eyebrow: "RABATKODER",
    title: "Rabatkoder og aktuelle tilbud",
    intro:
      "Her samler vi officielle rabatkoder fra vores partnerbutikker og et udvalg af nedsatte produkter. Priserne kommer direkte fra butikkernes produktfeeds og kan ændre sig, så tjek altid den endelige pris hos butikken.",
    updated: "Opdateret 25. november 2026",
    disclosure:
      "Vi kan modtage provision, når du handler via vores links. Det koster ikke ekstra for dig.",
    couponsTitle: "Rabatkoder",
    validUntil: "Gyldig til",
    useCode: (store) => `Brug koden hos ${store}`,
    dealsTitle: "Aktuelle tilbud fra partnerbutikker",
    dealsNote:
      "Udvalgte nedsatte produkter fra de seneste produktfeeds. Lagerstatus og pris bekræftes hos butikken.",
    seeDeal: "Se tilbud",
    ctaTitle: "Flere butikker, flere tilbud",
    ctaText: "Søg blandt alle danske butikker og se, hvor du kan handle i dag.",
    seeAllStores: "Se alle butikker",
    footer:
      "Rabatkoder og priser er indsamlet fra butikkernes egne feeds og kan ændre sig.",
    footerLinks: "Footer links",
    itemListName: "Rabatkoder og tilbud på TilbudJagt.dk",
  },
  en: {
    navCoupons: "Coupon codes",
    navStores: "Stores",
    navGuides: "Guides",
    navContact: "Contact",
    vip: "Become VIP",
    eyebrow: "COUPON CODES",
    title: "Coupon codes and current deals",
    intro:
      "We collect official coupon codes from our partner stores and a selection of discounted products. Prices come directly from the stores’ product feeds and can change, so always check the final price with the store.",
    updated: "Updated 25 November 2026",
    disclosure:
      "We may receive a commission when you shop through our links. It costs you nothing extra.",
    couponsTitle: "Coupon codes",
    validUntil: "Valid until",
    useCode: (store) => `Use the code at ${store}`,
    dealsTitle: "Current deals from partner stores",
    dealsNote:
      "Selected discounted products from recent product feeds. Stock and price are confirmed with the store.",
    seeDeal: "See deal",
    ctaTitle: "More stores, more deals",
    ctaText: "Search all Danish stores and see where you can shop today.",
    seeAllStores: "See all stores",
    footer:
      "Coupon codes and prices are collected from the stores’ own feeds and can change.",
    footerLinks: "Footer links",
    itemListName: "Coupon codes and deals on TilbudJagt.dk",
  },
  ar: {
    navCoupons: "أكواد الخصم",
    navStores: "المتاجر",
    navGuides: "الأدلة",
    navContact: "اتصل بنا",
    vip: "انضم إلى VIP",
    eyebrow: "أكواد الخصم",
    title: "أكواد الخصم والعروض الحالية",
    intro:
      "نجمع هنا أكواد خصم رسمية من المتاجر الشريكة ومجموعة مختارة من المنتجات المخفّضة. تأتي الأسعار مباشرة من مصادر المتاجر وقد تتغير، لذا تحقق دائمًا من السعر النهائي عند المتجر.",
    updated: "آخر تحديث 25 نوفمبر 2026",
    disclosure:
      "قد نحصل على عمولة عندما تتسوق عبر روابطنا. لا يكلفك ذلك أي مبلغ إضافي.",
    couponsTitle: "أكواد الخصم",
    validUntil: "صالح حتى",
    useCode: (store) => `استخدم الكود لدى ${store}`,
    dealsTitle: "عروض حالية من المتاجر الشريكة",
    dealsNote:
      "منتجات مخفّضة مختارة من أحدث مصادر المنتجات. يتم تأكيد التوفر والسعر عند المتجر.",
    seeDeal: "شاهد العرض",
    ctaTitle: "متاجر أكثر وعروض أكثر",
    ctaText: "ابحث بين جميع المتاجر الدنماركية واكتشف أين يمكنك التسوق اليوم.",
    seeAllStores: "شاهد كل المتاجر",
    footer:
      "تم جمع أكواد الخصم والأسعار من مصادر المتاجر نفسها وقد تتغير.",
    footerLinks: "روابط الفوتر",
    itemListName: "أكواد الخصم والعروض على TilbudJagt.dk",
  },
};

export default function RabatkoderPage({ lang = "da" }: { lang?: Locale }) {
  const dealList = deals as Deal[];
  const t = COPY[lang];
  const home = localePath(lang, "/");
  const stores = `${home}#butikker`;
  const guides = localePath(lang, "/guides");
  const formatter = new Intl.NumberFormat(
    lang === "da" ? "da-DK" : lang === "ar" ? "ar-DK" : "en-DK",
    { style: "currency", currency: "DKK", maximumFractionDigits: 0 },
  );
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.itemListName,
    numberOfItems: dealList.length,
    itemListElement: dealList.map((deal, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: deal.title,
      url: deal.url,
    })),
  };

  return (
    <main lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <header className="header wrap">
        <a className="brand" href={home}>
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <SiteNav ariaLabel={t.navCoupons}>
          <a href={localePath(lang, "/rabatkoder")}>{t.navCoupons}</a>
          <a href={stores}>{t.navStores}</a>
          <a href={guides}>{t.navGuides}</a>
          <a href="/contact.html">{t.navContact}</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href={`${home}#vip`}>{t.vip}</a>
        </div>
      </header>
      <section className="wrap deals-hero">
        <span className="eyebrow muted"><TicketPercent size={14} /> {t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
        <p className="deals-updated">
          <RefreshCw size={13} /> {t.updated} · <span>{t.disclosure}</span>
        </p>
      </section>
      <section className="wrap deals-section">
        <h2>{t.couponsTitle}</h2>
        <div className="coupon-grid">
          {coupons.map((coupon) => (
            <article className="coupon-card" key={coupon.code}>
              <div className="coupon-head">
                <StoreLogo slug={coupon.slug} name={coupon.store} />
                <div>
                  <strong>{coupon.store}</strong>
                  <p>{coupon.title}</p>
                </div>
              </div>
              <CopyCode code={coupon.code} lang={lang} />
              <p className="coupon-desc">{coupon.description}</p>
              <p className="coupon-expiry">{t.validUntil}: {coupon.expires}</p>
              <a
                className="coupon-cta"
                href={coupon.url}
                target="_blank"
                rel="sponsored nofollow noopener"
              >
                {t.useCode(coupon.store)} <ArrowRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap deals-section">
        <h2>{t.dealsTitle}</h2>
        <p className="deals-note">{t.dealsNote}</p>
        <div className="deal-grid">
          {dealList.map((deal) => (
            <article className="deal-card" key={`${deal.storeSlug}-${deal.title}-${deal.price}`}>
              <a
                className="deal-image"
                href={deal.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                aria-label={`${t.seeDeal}: ${deal.title} – ${deal.store}`}
              >
                <img src={deal.image} alt="" loading="lazy" width={640} height={640} />
                <span className="deal-badge">-{deal.discount}%</span>
              </a>
              <div className="deal-body">
                <span className="deal-store">{deal.store}</span>
                <h3>{deal.title}</h3>
                <div className="deal-prices">
                  <strong>{formatter.format(deal.price)}</strong>
                  <s>{formatter.format(deal.oldPrice)}</s>
                </div>
                <a
                  className="text-link"
                  href={deal.url}
                  target="_blank"
                  rel="sponsored nofollow noopener"
                >
                  {t.seeDeal} <ArrowRight size={15} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap guides-cta">
        <div>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
        </div>
        <a className="partner-cta" href={stores}>{t.seeAllStores} <ArrowRight size={16} /></a>
      </section>
      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href={home}>
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>{t.footer}</p>
          <nav aria-label={t.footerLinks}>
            <a href={stores}>{t.navStores}</a> · <a href={guides}>{t.navGuides}</a> ·{" "}
            <a href="/about.html">{lang === "ar" ? "من نحن" : lang === "en" ? "About us" : "Om os"}</a> ·{" "}
            <a href="/contact.html">{t.navContact}</a> ·{" "}
            <a href="/privacy.html">{lang === "ar" ? "سياسة الخصوصية" : lang === "en" ? "Privacy policy" : "Privatlivspolitik"}</a> · <CookieSettingsLink />
          </nav>
        </div>
      </footer>
    </main>
  );
}
