"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import CookieSettingsLink from "@/components/cookie-settings-link";
import {
  ArrowRight, Bell, Check, Heart, ShieldCheck, Sparkles,
  Tag, X, Zap,
} from "lucide-react";
import { STORES } from "@/lib/stores";
import { sortStoresByCommission } from "@/lib/store-commissions";
import AdSlot from "@/components/AdSlot";
import SponsoredBanner from "@/components/SponsoredBanner";
import StoreLogo from "@/components/store-logo";
import StoreBrowser from "@/app/butikker/store-browser";

type Language = "da" | "en" | "ar";
const LANG_KEY = "tilbudjagt_lang";

const copy = {
  da: {
    tagline: "Jagten på de bedste tilbud starter her",
    search: "Søg butik, fx Netto, Elgiganten, JYSK…",
    categories: "Kategorier", storesTitle: "Butikker i oversigten",
    allStores: "Se alle butikker", safe: "Trygge og tydelige links",
    hero: "De stærke tilbud. Samlet ét sted.",
    heroText: "Find butikker og tilbud i Danmark. Vi viser kun priser, når de kommer fra butikken selv.",
    explore: "Se butikker", hot: "Sådan virker det",
    howTitle: "Sådan virker TilbudJagt",
    howText: "Vi samler butikker og godkendte partnere. Når en butik deler sine priser med os, viser vi dem – ellers linker vi direkte uden at gætte.",
    partnerTitle: "Udvalgt partner", partnerText: "Bazta DK er vores udvalgte partner. Se alle godkendte partnere nedenfor.",
    partnerCta: "Besøg Bazta",
    partnerDisclosure: "Reklamelinks: TilbudJagt kan modtage provision, hvis du klikker på et partnerlink og handler hos partneren. Din pris ændres ikke.",
    vipTitle: "TilbudJagt VIP", vipText: "En mere personlig tilbudsoplevelse for 40 kr./md.",
    vipList: ["Personlige tilbud baseret på dine interesser", "Gemte favoritter og tilbudsoverblik", "Ingen skjulte gebyrer – opsig når du vil"],
    close: "Luk", login: "Log ind", account: "Opret konto",
    footer: "TilbudJagt gør det lettere at finde butikker og tilbud. Tjek altid pris og vilkår hos butikken.",
    partnerLabel: "Godkendt partner", directoryLabel: "Direkte link",
    noOffers: "Ingen verificerede tilbud endnu – vi viser dem, når butikken deler sine data.",
    eyebrow: "DANMARKS BUTIKSOVERSIGT",
    storesEyebrow: "BUTIKKER", partnerEyebrow: "PARTNER",
    visit: "Besøg", storeInfo: "Butiksinfo", newTab: "åbner butikkens hjemmeside i ny fane",
    navProducts: "Produkter", navGuides: "Guides", navAbout: "Om os", navContact: "Kontakt",
    menu: "Menu", language: "Sprog", footerAria: "Footerlinks",
    vipWaitlistTitle: "VIP-interesseliste",
    vipWaitlistText: "Gratis tilmelding uden betaling. Få en velkomstmail og besked, når medlemskabet er klar.",
    emailLabel: "E-mail", emailPlaceholder: "Din e-mailadresse",
    consent: "Jeg accepterer at modtage information om TilbudJagt VIP.",
    submit: "Tilmeld", sending: "Sender…", success: "Tak! Tjek din indbakke.", already: "Du er allerede på VIP-listen.", error: "Kunne ikke sende endnu. Prøv igen senere.",
    vipEyebrow: "TILBUDJAGT VIP", vipCta: "Bliv VIP", vipPrice: "40 kr.", perMonth: "/ md.",
    vipModalNote: "Betaling er midlertidigt deaktiveret. Dette er kun en gratis interesseliste.",
    footerProducts: "Produkter", footerStores: "Butikker", footerGuides: "Guides", footerAbout: "Om os",
    footerAds: "Annoncering", footerContact: "Kontakt", footerPrivacy: "Privatlivspolitik",
    footerTerms: "Vilkår", footerCookies: "Cookies",
  },
  en: {
    tagline: "The hunt for great deals starts here",
    search: "Search a store, e.g. Netto, Elgiganten, JYSK…",
    categories: "Categories", storesTitle: "Stores in the directory",
    allStores: "See all stores", safe: "Clear and safer links",
    hero: "The best deals. All in one place.",
    heroText: "Find Danish stores and deals. We only show prices when the store itself provides them.",
    explore: "Browse stores", hot: "How it works",
    howTitle: "How TilbudJagt works",
    howText: "We collect stores and approved partners. When a store shares its prices, we show them – otherwise we link directly without guessing.",
    partnerTitle: "Featured partner", partnerText: "Bazta DK is our featured partner. See all approved partners below.",
    partnerCta: "Visit Bazta",
    partnerDisclosure: "Affiliate links: TilbudJagt may receive a commission if you click a partner link and buy from that partner. Your price does not change.",
    vipTitle: "TilbudJagt VIP", vipText: "A more personal deal experience for DKK 40/month.",
    vipList: ["Personalised deals based on your interests", "Saved favourites and deal overview", "No hidden fees – cancel anytime"],
    close: "Close", login: "Log in", account: "Create account",
    footer: "TilbudJagt makes it easier to find stores and deals. Always check prices and terms with the retailer.",
    partnerLabel: "Approved partner", directoryLabel: "Direct link",
    noOffers: "No verified offers yet – we show them when the store shares its data.",
    eyebrow: "DENMARK'S STORE DIRECTORY",
    storesEyebrow: "STORES", partnerEyebrow: "PARTNER",
    visit: "Visit", storeInfo: "Store info", newTab: "opens the store website in a new tab",
    navProducts: "Products", navGuides: "Guides", navAbout: "About us", navContact: "Contact",
    menu: "Menu", language: "Language", footerAria: "Footer links",
    vipWaitlistTitle: "VIP waitlist",
    vipWaitlistText: "Free signup without payment. Get a welcome email and a message when membership is ready.",
    emailLabel: "Email", emailPlaceholder: "Your email address",
    consent: "I agree to receive information about TilbudJagt VIP.",
    submit: "Sign up", sending: "Sending…", success: "Thanks! Check your inbox.", already: "You're already on the VIP list.", error: "Could not send yet. Please try again later.",
    vipEyebrow: "TILBUDJAGT VIP", vipCta: "Become VIP", vipPrice: "DKK 40", perMonth: "/ month",
    vipModalNote: "Payment is temporarily disabled. This is only a free interest list.",
    footerProducts: "Products", footerStores: "Stores", footerGuides: "Guides", footerAbout: "About us",
    footerAds: "Advertising", footerContact: "Contact", footerPrivacy: "Privacy policy",
    footerTerms: "Terms", footerCookies: "Cookies",
  },
  ar: {
    tagline: "صيد أفضل العروض يبدأ من هون",
    search: "ابحث عن متجر، مثل Netto أو Elgiganten أو JYSK…",
    categories: "التصنيفات", storesTitle: "متاجر في الدليل",
    allStores: "شاهد كل المتاجر", safe: "روابط واضحة وموثوقة",
    hero: "أقوى العروض… كلها بمكان واحد.",
    heroText: "اكتشف المتاجر والعروض في الدنمارك. لا نعرض الأسعار إلا عندما يوفّرها المتجر نفسه.",
    explore: "استعرض المتاجر", hot: "كيف يعمل",
    howTitle: "كيف تعمل TilbudJagt",
    howText: "نجمع المتاجر والشركاء المعتمدين. عندما يشارك المتجر أسعاره نعرضها، وإلا نضع رابطًا مباشرًا دون تخمين.",
    partnerTitle: "شريك مختار", partnerText: "Bazta DK هو شريكنا المختار. شاهد جميع الشركاء المعتمدين أدناه.",
    partnerCta: "زيارة Bazta",
    partnerDisclosure: "روابط تسويق بالعمولة: قد تحصل TilbudJagt على عمولة إذا ضغطت على رابط شريك وأتممت شراءً لديه. السعر عليك لا يتغير.",
    vipTitle: "عضوية TilbudJagt VIP", vipText: "تجربة عروض شخصية مقابل 40 كرونة دنماركية شهرياً.",
    vipList: ["عروض حسب اهتماماتك", "حفظ المفضلة ومتابعة العروض", "بدون رسوم مخفية – ألغِ متى شئت"],
    close: "إغلاق", login: "تسجيل الدخول", account: "إنشاء حساب",
    footer: "TilbudJagt تساعدك تكتشف المتاجر والعروض. تحقق دائماً من السعر والشروط عند المتجر.",
    partnerLabel: "شريك معتمد", directoryLabel: "رابط مباشر",
    noOffers: "لا توجد عروض مؤكدة بعد – نعرضها عندما يشارك المتجر بياناته.",
    eyebrow: "دليل المتاجر في الدنمارك",
    storesEyebrow: "المتاجر", partnerEyebrow: "شريك",
    visit: "زيارة", storeInfo: "تفاصيل المتجر", newTab: "يفتح موقع المتجر في تبويب جديد",
    navProducts: "المنتجات", navGuides: "الأدلة", navAbout: "من نحن", navContact: "اتصل بنا",
    menu: "القائمة", language: "اللغة", footerAria: "روابط الفوتر",
    vipWaitlistTitle: "قائمة VIP",
    vipWaitlistText: "تسجيل مجاني دون دفع. ستصلك رسالة ترحيب وإشعار عندما تصبح العضوية جاهزة.",
    emailLabel: "البريد الإلكتروني", emailPlaceholder: "بريدك الإلكتروني",
    consent: "أوافق على تلقي معلومات عن عضوية TilbudJagt VIP.",
    submit: "تسجيل", sending: "جارٍ الإرسال…", success: "شكرًا! تحقق من بريدك.", already: "أنت مشترك بالفعل في قائمة VIP.", error: "لم نتمكن من الإرسال بعد. حاولي لاحقًا.",
    vipEyebrow: "TILBUDJAGT VIP", vipCta: "انضم إلى VIP", vipPrice: "40 كرونة", perMonth: "/ شهريًا",
    vipModalNote: "الدفع متوقف مؤقتًا. هذه قائمة اهتمام مجانية فقط.",
    footerProducts: "المنتجات", footerStores: "المتاجر", footerGuides: "الأدلة", footerAbout: "من نحن",
    footerAds: "الإعلان", footerContact: "اتصل بنا", footerPrivacy: "سياسة الخصوصية",
    footerTerms: "الشروط", footerCookies: "الكوكيز",
  },
} as const;

const bazta = STORES.find((store) => store.slug === "bazta-dk")!;
const partners = sortStoresByCommission(
  STORES.filter((store) => store.status === "partner"),
);

type HomePageProps = {
  initialLang?: Language;
  forcedLang?: boolean;
};

export default function HomePage({ initialLang = "da", forcedLang = false }: HomePageProps) {
  const [lang, setLang] = useState<Language>(initialLang);
  const [langReady, setLangReady] = useState(forcedLang);
  useEffect(() => {
    if (forcedLang) return;
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "da" || saved === "en" || saved === "ar") setLang(saved);
    setLangReady(true);
  }, [forcedLang]);
  useEffect(() => {
    if (!langReady) return;
    if (!forcedLang) {
      window.localStorage.setItem(LANG_KEY, lang);
      document.cookie = `${LANG_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.dispatchEvent(new CustomEvent("tilbudjagt:langchange", { detail: lang }));
  }, [lang, langReady, forcedLang]);
  const [vipOpen, setVipOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const newsletterSubmittingRef = useRef(false);
  const t = copy[lang];
  const rtl = lang === "ar";
  const localHref = (path: string) => {
    if (!forcedLang) return path;
    if (path === "/") return `/${initialLang}`;
    if (path.startsWith("/#")) return `/${initialLang}${path}`;
    if (
      path.startsWith("/produkter") ||
      path.startsWith("/rabatkoder") ||
      path.startsWith("/guides") ||
      path.startsWith("/butikker")
    ) {
      return `/${initialLang}${path}`;
    }
    return path;
  };

  const joinVipWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newsletterSubmittingRef.current) return;
    newsletterSubmittingRef.current = true;
    setNewsletterSubmitting(true);
    setNewsletterStatus(copy[lang].sending);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail, consent: newsletterConsent }),
      });
      const data = await response.json().catch(() => null);
      setNewsletterStatus(
        response.ok
          ? data?.alreadySubscribed
            ? copy[lang].already
            : copy[lang].success
          : copy[lang].error,
      );
      if (response.ok) setNewsletterEmail("");
    } catch {
      setNewsletterStatus(copy[lang].error);
    } finally {
      newsletterSubmittingRef.current = false;
      setNewsletterSubmitting(false);
    }
  };

  return (
    <main lang={lang} dir={rtl ? "rtl" : "ltr"} data-no-translate>
      <div className="top-strip">
        <span><Zap size={14} /> {t.tagline}</span>
        <span><ShieldCheck size={14} /> {t.safe}</span>
      </div>
      <header className="header wrap">
        <a className="brand" href={localHref("/")}>
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <nav className="nav">
          <a href={localHref("/produkter")}>{t.navProducts}</a>
          <a href={localHref("/rabatkoder")}>Rabatkoder</a>
          <a href={localHref("/#butikker")}>{t.explore}</a>
          <a href={localHref("/guides")}>{t.navGuides}</a>
          <a href="/about.html">{t.navAbout}</a>
          <a href="/contact.html">{t.navContact}</a>
        </nav>
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
          <a className="login-btn" href="/login">{t.login}</a>
          <a className="login-btn" href="/register">{t.account}</a>
          <button className="vip-btn" onClick={() => setVipOpen(true)}>
            <Sparkles size={15} /> VIP
          </button>
        </div>
      </header>

      <div id="butikker">
        <StoreBrowser stores={STORES} initialLang={lang} forcedLang={forcedLang} />
      </div>

      <SponsoredBanner />
      <div className="wrap">
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME} />
      </div>

      <section className="wrap partner-section" aria-labelledby="partner-title">
        <div className="partner-card">
          <div className="partner-copy">
            <span className="eyebrow muted">{t.partnerEyebrow}</span>
            <h2 id="partner-title">{t.partnerTitle}</h2>
            <p>{t.partnerText}</p>
            <p className="partner-disclosure">{t.partnerDisclosure}</p>
          </div>
          <a
            className="partner-cta"
            href={bazta.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
          >
            {t.partnerCta} <ArrowRight size={16} />
          </a>
        </div>
        <div className="partner-strip" aria-label={t.partnerLabel}>
          {partners.map((store) => (
            <a
              className="partner-chip"
              key={store.slug}
              href={store.affiliateUrl!}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
            >
              <StoreLogo slug={store.slug} name={store.name} />
              <span>{store.name}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="wrap feature-row" id="vip">
        <div className="feature-card">
          <ShieldCheck />
          <div>
            <h3>{t.safe}</h3>
            <p>{t.footer}</p>
          </div>
        </div>
        <div className="feature-card">
          <Heart />
          <div>
            <h3>{t.vipTitle}</h3>
            <p>{t.vipText}</p>
          </div>
        </div>
        <div className="feature-card">
          <Bell />
          <div>
            <h3>{t.vipWaitlistTitle}</h3>
            <p>{t.vipWaitlistText}</p>
            <form onSubmit={joinVipWaitlist}>
              <input
                aria-label={t.emailLabel}
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder={t.emailPlaceholder}
                required
                disabled={newsletterSubmitting}
              />
              <label>
                <input
                  type="checkbox"
                  checked={newsletterConsent}
                  onChange={(event) => setNewsletterConsent(event.target.checked)}
                  required
                  disabled={newsletterSubmitting}
                />{" "}
                {t.consent}
              </label>
              <button type="submit" disabled={newsletterSubmitting}>
                {newsletterSubmitting ? t.sending : t.submit}
              </button>
              <small>{newsletterStatus}</small>
            </form>
          </div>
        </div>
      </section>

      <section className="vip-banner">
        <div className="wrap vip-inner">
          <div>
            <span className="eyebrow">{t.vipEyebrow}</span>
            <h2>{t.vipTitle}</h2>
            <p>{t.vipText}</p>
          </div>
          <button onClick={() => setVipOpen(true)}>{t.vipCta} <ArrowRight size={17} /></button>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href={localHref("/")}>
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>{t.footer}</p>
          <nav aria-label={t.footerAria}>
            <a href={localHref("/produkter")}>{t.footerProducts}</a> · <a href={localHref("/#butikker")}>{t.footerStores}</a> · <a href={localHref("/guides")}>{t.footerGuides}</a> · <a href="/about.html">{t.footerAbout}</a> ·{" "}
            <a href="/annoncering">{t.footerAds}</a> · <a href="/contact.html">{t.footerContact}</a> · <a href="/privacy.html">{t.footerPrivacy}</a> · <a href="/vilkaar.html">{t.footerTerms}</a> · <a href="/cookies.html">{t.footerCookies}</a> · <CookieSettingsLink />
          </nav>
          <span>© {new Date().getFullYear()} TilbudJagt.dk</span>
        </div>
      </footer>

      {vipOpen && (
        <div className="modal-backdrop" onClick={() => setVipOpen(false)}>
          <section
            className="vip-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setVipOpen(false)}><X /></button>
            <span className="modal-spark"><Sparkles /></span>
            <h2>{t.vipTitle}</h2>
            <p>{t.vipText}</p>
            <ul>{t.vipList.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
            <strong className="vip-price">{t.vipPrice} <small>{t.perMonth}</small></strong>
            <p className="modal-footnote">{t.vipModalNote}</p>
            <button className="modal-primary" onClick={() => setVipOpen(false)}>{t.close}</button>
          </section>
        </div>
      )}
    </main>
  );
}
