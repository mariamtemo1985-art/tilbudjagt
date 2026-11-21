"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Store as StoreIcon, Tag } from "lucide-react";
import ShareStoreButton from "@/components/ShareStoreButton";
import StoreLogo from "@/components/store-logo";
import AdSlot from "@/components/AdSlot";
import SiteNav from "@/components/site-nav";
import {
  getStoreCategoryLabel,
  type Store,
  isAffiliateLink,
} from "@/lib/stores";

type Language = "da" | "en" | "ar";

const LANG_KEY = "tilbudjagt_lang";

const copy = {
  da: {
    stores: "Butikker",
    about: "Om os",
    contact: "Kontakt",
    vip: "Bliv VIP",
    allStores: "Alle butikker",
    partner: "Godkendt partner",
    directory: "Direkte link",
    visitHint: "Klik her for at åbne butikkens hjemmeside:",
    visit: (name: string) => `Besøg ${name}`,
    partnerDisclosure: (name: string) =>
      `Reklamelink: TilbudJagt kan modtage provision, hvis du klikker på linket og handler hos ${name}. Din pris ændres ikke.`,
    directoryDisclosure: (name: string) =>
      `Direkte link uden provision: TilbudJagt har endnu ikke en godkendt partneraftale med ${name}. Linket går til butikkens egen hjemmeside.`,
    noOffersTitle: "Ingen verificerede tilbud endnu.",
    noOffersText:
      "Vi viser først priser og tilbud, når de kommer fra butikkens egne data eller et godkendt partnerfeed. Kontroller altid aktuelle priser hos butikken.",
    advertising: "Annoncering",
    privacy: "Privatlivspolitik",
    language: "Sprog",
  },
  en: {
    stores: "Stores",
    about: "About us",
    contact: "Contact",
    vip: "Become VIP",
    allStores: "All stores",
    partner: "Approved partner",
    directory: "Direct link",
    visitHint: "Click here to open the store’s website:",
    visit: (name: string) => `Visit ${name}`,
    partnerDisclosure: (name: string) =>
      `Affiliate link: TilbudJagt may receive a commission if you click the link and buy from ${name}. Your price does not change.`,
    directoryDisclosure: (name: string) =>
      `Direct link without commission: TilbudJagt does not yet have an approved partner agreement with ${name}. The link goes to the store’s own website.`,
    noOffersTitle: "No verified offers yet.",
    noOffersText:
      "We only show prices and offers when they come from the store’s own data or an approved partner feed. Always check current prices with the store.",
    advertising: "Advertising",
    privacy: "Privacy policy",
    language: "Language",
  },
  ar: {
    stores: "المتاجر",
    about: "من نحن",
    contact: "اتصل بنا",
    vip: "انضم إلى VIP",
    allStores: "كل المتاجر",
    partner: "شريك معتمد",
    directory: "رابط مباشر",
    visitHint: "اضغط هنا لفتح الموقع الرسمي للمتجر:",
    visit: (name: string) => `زيارة ${name}`,
    partnerDisclosure: (name: string) =>
      `رابط تسويق بالعمولة: قد تحصل TilbudJagt على عمولة إذا ضغطت على الرابط وأتممت شراءً لدى ${name}. السعر عليك لا يتغير.`,
    directoryDisclosure: (name: string) =>
      `رابط مباشر بدون عمولة: لا تملك TilbudJagt بعد اتفاقية شراكة معتمدة مع ${name}. ينقلك الرابط إلى الموقع الرسمي للمتجر.`,
    noOffersTitle: "لا توجد عروض مؤكدة بعد.",
    noOffersText:
      "نعرض الأسعار والعروض فقط عندما تأتي من بيانات المتجر نفسه أو من مصدر شركاء معتمد. تحقق دائمًا من السعر الحالي عند المتجر.",
    advertising: "الإعلان",
    privacy: "سياسة الخصوصية",
    language: "اللغة",
  },
} as const;

function isLanguage(value: string | null): value is Language {
  return value === "da" || value === "en" || value === "ar";
}

export default function StoreDetail({ store }: { store: Store }) {
  const [lang, setLang] = useState<Language>("da");
  const partner = isAffiliateLink(store);
  const href = partner ? store.affiliateUrl! : store.website;
  const t = copy[lang];
  const rtl = lang === "ar";

  useEffect(() => {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (isLanguage(saved)) setLang(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [lang, rtl]);

  return (
    <main dir={rtl ? "rtl" : "ltr"}>
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
        <SiteNav ariaLabel={t.stores}>
          <a href="/#butikker">{t.stores}</a>
          <a href="/about.html">{t.about}</a>
          <a href="/contact.html">{t.contact}</a>
        </SiteNav>
        <div className="header-actions">
          <select
            aria-label={t.language}
            className="language"
            value={lang}
            onChange={(event) => setLang(event.target.value as Language)}
          >
            <option value="da">DA</option>
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
          <a className="vip-btn" href="/#vip">
            {t.vip}
          </a>
        </div>
      </header>
      <section className="wrap store-detail">
        <a className="text-link" href="/#butikker">
          <ArrowLeft size={16} /> {t.allStores}
        </a>
        <div className="store-detail-card">
          <StoreLogo slug={store.slug} name={store.name} large />
          <div>
            <span className="eyebrow muted">
              {getStoreCategoryLabel(store, lang)}
            </span>
            <h1>{store.name}</h1>
            <p>{store.description[lang]}</p>
            <span
              className={
                partner ? "status-badge partner" : "status-badge directory"
              }
            >
              {partner ? (
                <>
                  <Tag size={11} /> {t.partner}
                </>
              ) : (
                <>
                  <StoreIcon size={11} /> {t.directory}
                </>
              )}
            </span>
          </div>
        </div>
        <div className="store-detail-actions">
          <span className="visit-hint">{t.visitHint}</span>
          <a
            className={partner ? "partner-cta" : "store-direct-cta"}
            href={href}
            target="_blank"
            rel={
              partner
                ? "sponsored nofollow noopener noreferrer"
                : "noopener noreferrer"
            }
          >
            {t.visit(store.name)} <ArrowRight size={16} />
          </a>
          <ShareStoreButton
            name={store.name}
            url={`https://www.tilbudjagt.dk/butikker/${store.slug}`}
          />
          <p className="partner-disclosure">
            {partner
              ? t.partnerDisclosure(store.name)
              : t.directoryDisclosure(store.name)}
          </p>
        </div>
        <div className="demo-note store-detail-note">
          <Tag size={15} />
          <span>
            <b>{t.noOffersTitle}</b> {t.noOffersText}
          </span>
        </div>
      </section>
      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_STORE} />
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
          <p>© {new Date().getFullYear()} TilbudJagt.dk</p>
          <nav aria-label="Footer links">
            <a href="/about.html">{t.about}</a> ·{" "}
            <a href="/annoncering">{t.advertising}</a> ·{" "}
            <a href="/contact.html">{t.contact}</a> ·{" "}
            <a href="/privacy.html">{t.privacy}</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
