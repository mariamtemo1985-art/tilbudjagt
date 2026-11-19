"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Bell, Check, Heart, Menu, Search, ShieldCheck, Sparkles,
  Tag, TrendingUp, X, Zap, Flame, Store as StoreIcon, ShoppingBasket,
  Laptop, Shirt, Sofa, Scissors, Dumbbell, Building2,
} from "lucide-react";
import { STORE_CATEGORIES, STORES, type StoreCategory } from "@/lib/stores";

type Language = "da" | "en" | "ar";

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
    partnerTitle: "Udvalgt partner", partnerText: "Se udvalgte produkter hos Bazta DK.",
    partnerCta: "Besøg Bazta",
    partnerDisclosure: "Reklamelink: TilbudJagt kan modtage provision, hvis du klikker på linket og handler hos Bazta. Din pris ændres ikke.",
    vipTitle: "TilbudJagt VIP", vipText: "En mere personlig tilbudsoplevelse for 40 kr./md.",
    vipList: ["Personlige tilbud baseret på dine interesser", "Gemte favoritter og tilbudsoverblik", "Ingen skjulte gebyrer – opsig når du vil"],
    close: "Luk", login: "Log ind", account: "Opret konto",
    footer: "TilbudJagt gør det lettere at finde butikker og tilbud. Tjek altid pris og vilkår hos butikken.",
    partnerLabel: "Godkendt partner", directoryLabel: "Direkte link",
    noOffers: "Ingen verificerede tilbud endnu – vi viser dem, når butikken deler sine data.",
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
    partnerTitle: "Featured partner", partnerText: "Browse selected products at Bazta DK.",
    partnerCta: "Visit Bazta",
    partnerDisclosure: "Affiliate link: TilbudJagt may receive a commission if you click and buy at Bazta. Your price does not change.",
    vipTitle: "TilbudJagt VIP", vipText: "A more personal deal experience for DKK 40/month.",
    vipList: ["Personalised deals based on your interests", "Saved favourites and deal overview", "No hidden fees – cancel anytime"],
    close: "Close", login: "Log in", account: "Create account",
    footer: "TilbudJagt makes it easier to find stores and deals. Always check prices and terms with the retailer.",
    partnerLabel: "Approved partner", directoryLabel: "Direct link",
    noOffers: "No verified offers yet – we show them when the store shares its data.",
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
    partnerTitle: "شريك مختار", partnerText: "تصفّح منتجات مختارة لدى Bazta DK.",
    partnerCta: "زيارة Bazta",
    partnerDisclosure: "رابط تسويق بالعمولة: قد تحصل TilbudJagt على عمولة إذا ضغطت على الرابط وأتممت شراءً لدى Bazta. السعر عليك لا يتغير.",
    vipTitle: "عضوية TilbudJagt VIP", vipText: "تجربة عروض شخصية مقابل 40 كرونة دنماركية شهرياً.",
    vipList: ["عروض حسب اهتماماتك", "حفظ المفضلة ومتابعة العروض", "بدون رسوم مخفية – ألغِ متى شئت"],
    close: "إغلاق", login: "تسجيل الدخول", account: "إنشاء حساب",
    footer: "TilbudJagt تساعدك تكتشف المتاجر والعروض. تحقق دائماً من السعر والشروط عند المتجر.",
    partnerLabel: "شريك معتمد", directoryLabel: "رابط مباشر",
    noOffers: "لا توجد عروض مؤكدة بعد – نعرضها عندما يشارك المتجر بياناته.",
  },
} as const;

const CATEGORY_TILES: { key: StoreCategory; icon: ReactNode }[] = [
  { key: "dagligvarer", icon: <ShoppingBasket /> },
  { key: "elektronik", icon: <Laptop /> },
  { key: "hjem", icon: <Sofa /> },
  { key: "mode", icon: <Shirt /> },
  { key: "skoenhed", icon: <Scissors /> },
  { key: "sport", icon: <Dumbbell /> },
  { key: "stormagasin", icon: <Building2 /> },
  { key: "pleje", icon: <Sparkles /> },
];

const bazta = STORES.find((store) => store.slug === "bazta-dk")!;
const featuredStores = STORES.slice(0, 8);

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("da");
  const [query, setQuery] = useState("");
  const [vipOpen, setVipOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterConsent, setNewsletterConsent] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = copy[lang];
  const rtl = lang === "ar";

  const goSearch = (event?: FormEvent) => {
    event?.preventDefault();
    const value = query.trim();
    router.push(value ? `/butikker?q=${encodeURIComponent(value)}` : "/butikker");
  };

  const joinVipWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus("Sender…");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newsletterEmail, consent: newsletterConsent }),
    });
    setNewsletterStatus(
      response.ok ? "Tak! Tjek din indbakke." : "Kunne ikke sende endnu. Prøv igen senere.",
    );
    if (response.ok) setNewsletterEmail("");
  };

  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      <div className="top-strip">
        <span><Zap size={14} /> {t.tagline}</span>
        <span><ShieldCheck size={14} /> {t.safe}</span>
      </div>
      <header className="header wrap">
        <a className="brand" href="/">
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <nav className={mobileMenu ? "nav nav-open" : "nav"}>
          <a href="/butikker">{t.explore}</a>
          <a href="/guides">Guides</a>
          <a href="/about.html">Om os</a>
          <a href="/contact.html">Kontakt</a>
        </nav>
        <div className="header-actions">
          <select
            aria-label="Language"
            className="language"
            value={lang}
            onChange={(event) => setLang(event.target.value as Language)}
          >
            <option value="da">DA</option>
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
          <a className="login-btn" href="/login">{t.login}</a>
          <a className="login-btn" href="/register">{t.account}</a>
          <button className="vip-btn" onClick={() => setVipOpen(true)}>
            <Sparkles size={15} /> VIP
          </button>
          <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><Flame size={15} /> DANMARKS BUTIKSOVERSIGT</div>
            <h1>{t.hero}</h1>
            <p>{t.heroText}</p>
            <form className="hero-search" onSubmit={goSearch}>
              <Search size={19} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.search}
                aria-label={t.search}
              />
              <button type="submit" aria-label="Søg"><ArrowRight size={18} /></button>
            </form>
            <div className="hero-quick">
              <span><ShieldCheck size={15} /> {t.safe}</span>
              <span><TrendingUp size={15} /> {t.hot}</span>
            </div>
          </div>
          <div className="hero-feature">
            <div className="feature-kicker"><Flame size={15} /> {t.hot}</div>
            <div className="feature-emoji">🛍️</div>
            <strong>{t.howTitle}</strong>
            <p>{t.howText}</p>
            <button onClick={() => router.push("/butikker")}>
              {t.explore} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="wrap store-section" id="stores">
        <div className="section-title">
          <div>
            <span className="eyebrow muted">BUTIKKER</span>
            <h2>{t.storesTitle}</h2>
          </div>
          <StoreIcon size={25} />
        </div>
        <div className="store-grid home-store-grid">
          {featuredStores.map((store) => (
            <div className="store-card" key={store.slug}>
              <a
                className="store-card-main"
                href={store.status === "partner" ? store.affiliateUrl! : store.website}
                target="_blank"
                rel={store.status === "partner" ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                aria-label={`Besøg ${store.name} – åbner butikkens hjemmeside i ny fane`}
              >
                <span className="store-avatar" aria-hidden="true">{store.name.slice(0, 1)}</span>
                <span className="store-card-body">
                  <strong>{store.name}</strong>
                  <small>{STORE_CATEGORIES[store.category].da}</small>
                  <span className="store-visit">Besøg {store.name} <ArrowRight size={12} /></span>
                </span>
              </a>
              <a className="store-card-info" href={`/butikker/${store.slug}`}>Butiksinfo</a>
            </div>
          ))}
        </div>
        <p className="home-store-note">{t.noOffers}</p>
      </section>

      <section className="wrap category-section" id="categories">
        <div className="section-title">
          <div>
            <span className="eyebrow muted">{t.categories}</span>
            <h2>{t.hot}</h2>
          </div>
          <a className="text-link" href="/butikker">{t.allStores} <ArrowRight size={16} /></a>
        </div>
        <div className="category-grid">
          {CATEGORY_TILES.map((tile, index) => (
            <a
              className="category-tile"
              key={tile.key}
              href={`/butikker?kategori=${tile.key}`}
            >
              <span className={"category-icon cat-" + (index + 1)}>{tile.icon}</span>
              <span>{STORE_CATEGORIES[tile.key].da}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="wrap partner-section" aria-labelledby="partner-title">
        <div className="partner-card">
          <div className="partner-copy">
            <span className="eyebrow muted">PARTNER</span>
            <h2 id="partner-title">{t.partnerTitle}</h2>
            <p>{t.partnerText}</p>
            <p className="partner-disclosure">{t.partnerDisclosure}</p>
          </div>
          <a
            className="partner-cta"
            href={bazta.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
          >
            {t.partnerCta} <ArrowRight size={16} />
          </a>
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
            <h3>VIP-interesseliste</h3>
            <p>Gratis tilmelding uden betaling. Få en velkomstmail og besked, når medlemskabet er klar.</p>
            <form onSubmit={joinVipWaitlist}>
              <input
                aria-label="E-mail"
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Din e-mailadresse"
                required
              />
              <label>
                <input
                  type="checkbox"
                  checked={newsletterConsent}
                  onChange={(event) => setNewsletterConsent(event.target.checked)}
                  required
                />{" "}
                Jeg accepterer at modtage information om TilbudJagt VIP.
              </label>
              <button type="submit">Tilmeld</button>
              <small>{newsletterStatus}</small>
            </form>
          </div>
        </div>
      </section>

      <section className="vip-banner">
        <div className="wrap vip-inner">
          <div>
            <span className="eyebrow">TILBUDJAGT VIP</span>
            <h2>{t.vipTitle}</h2>
            <p>{t.vipText}</p>
          </div>
          <button onClick={() => setVipOpen(true)}>Bliv VIP <ArrowRight size={17} /></button>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>{t.footer}</p>
          <nav aria-label="Footer links">
            <a href="/butikker">Butikker</a> · <a href="/guides">Guides</a> · <a href="/about.html">Om os</a> ·{" "}
            <a href="/contact.html">Kontakt</a> · <a href="/privacy.html">Privatlivspolitik</a>
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
            <strong className="vip-price">40 kr. <small>/ md.</small></strong>
            <p className="modal-footnote">Betaling er midlertidigt deaktiveret. Dette er kun en gratis interesseliste.</p>
            <button className="modal-primary" onClick={() => setVipOpen(false)}>{t.close}</button>
          </section>
        </div>
      )}
    </main>
  );
}
