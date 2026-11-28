"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Store as StoreIcon, Tag } from "lucide-react";
import ShareStoreButton from "@/components/ShareStoreButton";
import StoreLogo from "@/components/store-logo";
import AdSlot from "@/components/AdSlot";
import SiteNav from "@/components/site-nav";
import { getStoreCommission } from "@/lib/store-commissions";
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
    partnerStatusTitle: "Partnerstatus og linkdetaljer",
    partnerStatusIntro:
      "Her kan du se, hvordan TilbudJagt linker til denne butik, og om vi modtager provision.",
    statusLabel: "Partneraftale",
    statusPartner: "Godkendt partneraftale",
    statusDirect: "Direkte link – ingen partneraftale",
    commissionLabel: "Provision til TilbudJagt",
    commissionValue: (rate: number) =>
      rate > 0 ? `${rate}% af købet` : "0% – ingen provision",
    linkTypeLabel: "Linktype",
    linkTypePartner: "Kommercielt partnerlink",
    linkTypeDirect: "Direkte link til butikkens egen side",
    trackingLabel: "Sporingsparameter",
    trackingPartner: "Ja, via partnerlink",
    trackingDirect: "Nej – TilbudJagt tilføjer ingen sporingsparameter",
    checkedLabel: "Sidst kontrolleret",
    destinationLabel: "Destination",
    lastChecked: "Sidst tjekket",
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
    partnerStatusTitle: "Partner status and link details",
    partnerStatusIntro:
      "Here you can see how TilbudJagt links to this store and whether we receive a commission.",
    statusLabel: "Partner agreement",
    statusPartner: "Approved partner agreement",
    statusDirect: "Direct link – no partner agreement",
    commissionLabel: "Commission to TilbudJagt",
    commissionValue: (rate: number) =>
      rate > 0 ? `${rate}% of the purchase` : "0% – no commission",
    linkTypeLabel: "Link type",
    linkTypePartner: "Commercial partner link",
    linkTypeDirect: "Direct link to the store’s own website",
    trackingLabel: "Tracking parameter",
    trackingPartner: "Yes, through the partner link",
    trackingDirect: "No – TilbudJagt adds no tracking parameter",
    checkedLabel: "Last checked",
    destinationLabel: "Destination",
    lastChecked: "Last checked",
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
    partnerStatusTitle: "حالة الشراكة وتفاصيل الرابط",
    partnerStatusIntro:
      "هنا يمكنك معرفة كيف يربط TilbudJagt إلى هذا المتجر وما إذا كان يحصل على عمولة.",
    statusLabel: "اتفاقية الشراكة",
    statusPartner: "اتفاقية شراكة معتمدة",
    statusDirect: "رابط مباشر – لا توجد اتفاقية شراكة",
    commissionLabel: "العمولة إلى TilbudJagt",
    commissionValue: (rate: number) =>
      rate > 0 ? `${rate}% من قيمة الشراء` : "0% – لا توجد عمولة",
    linkTypeLabel: "نوع الرابط",
    linkTypePartner: "رابط تسويق بالعمولة",
    linkTypeDirect: "رابط مباشر إلى الموقع الرسمي للمتجر",
    trackingLabel: "معامل التتبع",
    trackingPartner: "نعم، عبر رابط الشراكة",
    trackingDirect: "لا – لا يضيف TilbudJagt أي معامل تتبع",
    checkedLabel: "آخر تحقق",
    destinationLabel: "وجهة الرابط",
    lastChecked: "آخر تحقق",
    advertising: "الإعلان",
    privacy: "سياسة الخصوصية",
    language: "اللغة",
  },
} as const;

function isLanguage(value: string | null): value is Language {
  return value === "da" || value === "en" || value === "ar";
}

function formatCheckedAt(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getUTCFullYear()}`;
}

function linkHostname(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return value;
  }
}

export default function StoreDetail({
  store,
  initialLang = "da",
  forcedLang = false,
  children,
}: {
  store: Store;
  initialLang?: Language;
  forcedLang?: boolean;
  children?: ReactNode;
}) {
  const [lang, setLang] = useState<Language>(initialLang);
  const partner = isAffiliateLink(store);
  const href = partner ? store.affiliateUrl! : store.website;
  const t = copy[lang];
  const checked = formatCheckedAt(store.checkedAt);
  const commission = getStoreCommission(store.slug);
  const destination = linkHostname(href);
  const rtl = lang === "ar";
  const prefix = forcedLang ? `/${initialLang}` : "";

  useEffect(() => {
    if (forcedLang) return;
    const saved = window.localStorage.getItem(LANG_KEY);
    if (isLanguage(saved)) setLang(saved);
  }, [forcedLang]);

  useEffect(() => {
    if (!forcedLang) {
      window.localStorage.setItem(LANG_KEY, lang);
      document.cookie = `${LANG_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    window.dispatchEvent(new CustomEvent("tilbudjagt:langchange", { detail: lang }));
  }, [lang, rtl, forcedLang]);

  return (
    <main lang={lang} dir={rtl ? "rtl" : "ltr"}>
      <header className="header wrap">
        <a className="brand" href={prefix || "/"}>
          <span className="brand-mark">
            <Tag size={22} />
          </span>
          <span>
            Tilbud<span className="brand-accent">Jagt</span>
            <small>.dk</small>
          </span>
        </a>
        <SiteNav ariaLabel={t.stores}>
          <a href={`${prefix}/#butikker`}>{t.stores}</a>
          <a href="/about.html">{t.about}</a>
          <a href="/contact.html">{t.contact}</a>
        </SiteNav>
        <div className="header-actions">
          {!forcedLang && (
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
          )}
          <a className="vip-btn" href={`${prefix}/#vip`}>
            {t.vip}
          </a>
        </div>
      </header>
      <section className="wrap store-detail">
        <a className="text-link" href={`${prefix}/#butikker`}>
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
            {checked && (
              <small className="store-checked">
                {t.lastChecked}: {checked}
              </small>
            )}
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
            url={`https://www.tilbudjagt.dk${prefix}/butikker/${store.slug}`}
          />
          <p className="partner-disclosure">
            {partner
              ? t.partnerDisclosure(store.name)
              : t.directoryDisclosure(store.name)}
          </p>
        </div>
        <section className="partner-status" aria-labelledby="partner-status-title">
          <h2 id="partner-status-title">{t.partnerStatusTitle}</h2>
          <p>{t.partnerStatusIntro}</p>
          <div className="partner-status-table-wrap">
            <table>
              <tbody>
                <tr>
                  <th scope="row">{t.statusLabel}</th>
                  <td>
                    <span className={partner ? "status-pill partner" : "status-pill direct"}>
                      {partner ? t.statusPartner : t.statusDirect}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{t.commissionLabel}</th>
                  <td>{t.commissionValue(commission)}</td>
                </tr>
                <tr>
                  <th scope="row">{t.linkTypeLabel}</th>
                  <td>{partner ? t.linkTypePartner : t.linkTypeDirect}</td>
                </tr>
                <tr>
                  <th scope="row">{t.trackingLabel}</th>
                  <td>{partner ? t.trackingPartner : t.trackingDirect}</td>
                </tr>
                <tr>
                  <th scope="row">{t.destinationLabel}</th>
                  <td>
                    <a
                      href={href}
                      target="_blank"
                      rel={partner ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
                    >
                      {destination}
                    </a>
                  </td>
                </tr>
                {checked && (
                  <tr>
                    <th scope="row">{t.checkedLabel}</th>
                    <td>{checked}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
        <div className="demo-note store-detail-note">
          <Tag size={15} />
          <span>
            <b>{t.noOffersTitle}</b> {t.noOffersText}
          </span>
        </div>
        {children}
      </section>
      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_STORE} />
      </div>
      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href={prefix || "/"}>
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
