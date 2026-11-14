"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownUp, ArrowRight, Bell, Check, ChevronDown, Heart, Menu, Search,
  ShieldCheck, Sparkles, Tag, TrendingUp, X, Zap,
} from "lucide-react";

type Language = "da" | "en" | "ar";
type Deal = {
  id: number; title: string; store: string; category: string; price: string;
  oldPrice: string; discount: string; tag: string; color: string; symbol: string;
};

const copy = {
  da: {
    tagline: "Jagten på de bedste tilbud starter her",
    search: "Søg efter produkter, butikker og tilbud…",
    categories: "Kategorier", latest: "Nyeste tilbud", popular: "Populære",
    all: "Alle tilbud", electronics: "Elektronik", home: "Hjem & bolig",
    fashion: "Mode", groceries: "Dagligvarer", beauty: "Skønhed",
    sports: "Sport & fritid", travel: "Rejser", saved: "Gemte tilbud",
    submit: "Del et tilbud", vip: "Bliv VIP", hero: "Gode tilbud. Smartere køb.",
    heroText: "Find, sammenlign og del de bedste tilbud fra danske butikker – samlet ét sted.",
    explore: "Udforsk tilbud", how: "Sådan fungerer det", safe: "Trygge links",
    safeText: "Vi arbejder for gennemsigtige tilbud og tydelig mærkning af reklamer.",
    community: "Et fællesskab for gode køb", communityText: "Del fund, gem favoritter og hjælp andre med at spare.",
    demo: "Eksempelvisning", demoText: "Tilbuddene her er demodata – aktuelle priser og butikstilbud tilkobles før lancering.",
    results: "tilbud fundet", sort: "Sorter", newest: "Nyeste først", discountSort: "Største rabat",
    view: "Se tilbud", noResults: "Ingen tilbud matcher din søgning.",
    newsletter: "Få besked om nye tilbud", email: "Din e-mailadresse", join: "Tilmeld",
    footer: "TilbudJagt gør det lettere at opdage gode tilbud. Tjek altid pris og vilkår hos butikken.",
    vipTitle: "TilbudJagt VIP", vipText: "Få en mere personlig tilbudsoplevelse for 40 kr./md.",
    vipList: ["Personlige tilbud baseret på dine interesser", "Gemte favoritter og tilbudsoverblik", "Ingen skjulte gebyrer – opsig når du vil"],
    close: "Luk", login: "Log ind", account: "Opret konto",
  },
  en: {
    tagline: "The hunt for great deals starts here", search: "Search products, stores and deals…",
    categories: "Categories", latest: "Latest deals", popular: "Popular", all: "All deals",
    electronics: "Electronics", home: "Home", fashion: "Fashion", groceries: "Groceries",
    beauty: "Beauty", sports: "Sports & leisure", travel: "Travel", saved: "Saved deals",
    submit: "Submit a deal", vip: "Become VIP", hero: "Great deals. Smarter shopping.",
    heroText: "Find, compare and share great offers from Danish stores – all in one place.",
    explore: "Explore deals", how: "How it works", safe: "Safer links",
    safeText: "We aim for transparent offers and clear advertising labels.",
    community: "A community for smart shopping", communityText: "Share finds, save favourites and help others save.",
    demo: "Preview", demoText: "These are demo offers. Live prices and retailer offers will be connected before launch.",
    results: "deals found", sort: "Sort", newest: "Newest first", discountSort: "Biggest discount",
    view: "View deal", noResults: "No deals match your search.",
    newsletter: "Get alerts for new deals", email: "Your email address", join: "Subscribe",
    footer: "TilbudJagt helps you discover great offers. Always check prices and terms with the retailer.",
    vipTitle: "TilbudJagt VIP", vipText: "A more personal deal experience for DKK 40/month.",
    vipList: ["Personalised deals based on your interests", "Saved favourites and deal overview", "No hidden fees – cancel anytime"],
    close: "Close", login: "Log in", account: "Create account",
  },
  ar: {
    tagline: "رحلتك لاكتشاف أفضل العروض تبدأ من هون", search: "ابحث عن المنتجات والمتاجر والعروض…",
    categories: "التصنيفات", latest: "أحدث العروض", popular: "الأكثر شعبية", all: "كل العروض",
    electronics: "إلكترونيات", home: "المنزل", fashion: "الأزياء", groceries: "مواد غذائية",
    beauty: "الجمال", sports: "رياضة وترفيه", travel: "السفر", saved: "العروض المحفوظة",
    submit: "أضف عرضاً", vip: "اشترك VIP", hero: "عروض أحسن. تسوّق أذكى.",
    heroText: "اكتشف وقارن وشارك أفضل العروض من المتاجر الدنماركية بمكان واحد.",
    explore: "اكتشف العروض", how: "كيف تعمل المنصة", safe: "روابط موثوقة",
    safeText: "نعمل على توضيح العروض والإعلانات والروابط بشكل شفاف.",
    community: "مجتمع للتسوّق الذكي", communityText: "شارك اكتشافاتك واحفظ المفضلة وساعد غيرك على التوفير.",
    demo: "معاينة تجريبية", demoText: "العروض الظاهرة بيانات تجريبية؛ سيتم ربط الأسعار والعروض الحقيقية قبل الإطلاق.",
    results: "عرض", sort: "ترتيب", newest: "الأحدث أولاً", discountSort: "أكبر خصم",
    view: "عرض التفاصيل", noResults: "ما لقينا عروض مطابقة لبحثك.",
    newsletter: "وصلك تنبيه بالعروض الجديدة", email: "بريدك الإلكتروني", join: "اشتراك",
    footer: "TilbudJagt بتسهّل عليك اكتشاف العروض. تأكد دائماً من السعر والشروط عند المتجر.",
    vipTitle: "عضوية TilbudJagt VIP", vipText: "تجربة عروض شخصية أكثر مقابل 40 كرونة دنماركية شهرياً.",
    vipList: ["عروض مخصصة حسب اهتماماتك", "حفظ المفضلة ومتابعة العروض", "بدون رسوم مخفية – ألغِ متى شئت"],
    close: "إغلاق", login: "تسجيل الدخول", account: "إنشاء حساب",
  },
} as const;

const categoryKeys = ["all", "electronics", "home", "fashion", "groceries", "beauty", "sports", "travel"] as const;
const deals: Deal[] = [
  { id: 1, title: "Trådløse hovedtelefoner", store: "Elektronik · Eksempelbutik", category: "electronics", price: "599 kr.", oldPrice: "899 kr.", discount: "-33%", tag: "Populær", color: "lavender", symbol: "🎧" },
  { id: 2, title: "Kaffemaskine til hjemmet", store: "Bolig · Eksempelbutik", category: "home", price: "749 kr.", oldPrice: "999 kr.", discount: "-25%", tag: "God pris", color: "sand", symbol: "☕" },
  { id: 3, title: "Løbesko til hverdag", store: "Sport · Eksempelbutik", category: "sports", price: "399 kr.", oldPrice: "650 kr.", discount: "-39%", tag: "Skarp pris", color: "mint", symbol: "👟" },
  { id: 4, title: "Hudpleje gaveæske", store: "Skønhed · Eksempelbutik", category: "beauty", price: "229 kr.", oldPrice: "349 kr.", discount: "-34%", tag: "Udvalgt", color: "rose", symbol: "🧴" },
  { id: 5, title: "Smart lampe med dæmpning", store: "Elektronik · Eksempelbutik", category: "electronics", price: "189 kr.", oldPrice: "299 kr.", discount: "-37%", tag: "Populær", color: "blue", symbol: "💡" },
  { id: 6, title: "Sengetøj i blød bomuld", store: "Bolig · Eksempelbutik", category: "home", price: "249 kr.", oldPrice: "399 kr.", discount: "-38%", tag: "God pris", color: "peach", symbol: "🛏️" },
];

export default function HomePage() {
  const [lang, setLang] = useState<Language>("da");
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [sort, setSort] = useState("newest");
  const [vipOpen, setVipOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(true);
  const t = copy[lang];
  const rtl = lang === "ar";
  const visibleDeals = useMemo(() => {
    let list = deals.filter(d => (category === "all" || d.category === category) &&
      (d.title + " " + d.store).toLowerCase().includes(query.toLowerCase()));
    if (sort === "discount") list = [...list].sort((a, b) => Number(b.discount.replace(/[^0-9]/g, "")) - Number(a.discount.replace(/[^0-9]/g, "")));
    return list;
  }, [category, query, sort]);

  const categoryName = (key: string) => t[key as keyof typeof t] || key;
  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      <div className="top-strip"><span><Zap size={14} /> {t.tagline}</span><span className="top-right"><ShieldCheck size={14} /> {t.safe}</span></div>
      <header className="header wrap">
        <a className="brand" href="#" aria-label="TilbudJagt forsiden"><span className="brand-mark"><Tag size={22} /></span><span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span></a>
        <nav className={mobileMenu ? "nav nav-open" : "nav"}>
          <a href="#deals">{t.latest}</a><a href="#categories">{t.categories}</a><a href="#community">{t.how}</a>
        </nav>
        <div className="header-actions">
          <select aria-label="Language" className="language" value={lang} onChange={e => setLang(e.target.value as Language)}>
            <option value="da">DA</option><option value="en">EN</option><option value="ar">AR</option>
          </select>
          <a className="login-btn" href="/login">{t.login}</a><a className="login-btn" href="/register">{t.account}</a>
          <button className="vip-btn" type="button" onClick={() => setVipOpen(true)}><Sparkles size={15} /> {t.vip}</button>
          <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Menu">{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="wrap hero-inner">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> DANMARKS DEALUNIVERS</div>
            <h1>{t.hero}</h1><p>{t.heroText}</p>
            <div className="hero-search"><Search size={20} /><input value={query} onChange={e => { setQuery(e.target.value); document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" }); }} placeholder={t.search} /><button onClick={() => document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" })}><ArrowRight size={18} /></button></div>
            <div className="hero-trust"><span><ShieldCheck size={16} /> {t.safe}</span><span><TrendingUp size={16} /> {t.popular}</span></div>
          </div>
          <div className="hero-art" aria-hidden="true"><div className="hero-card card-back"><span>GODE FUND</span><b>–40%</b><small>SMARTE KØB</small></div><div className="hero-card card-front"><div className="floating-tag"><Tag size={18} /></div><span className="art-caption">UGENS JAGT</span><strong>Find<br/>mere.<br/><em>Betal mindre.</em></strong><div className="art-bottom"><span>TilbudJagt.dk</span><span>✦ ✦ ✦</span></div></div><div className="sparkle s1">✦</div><div className="sparkle s2">✧</div></div>
        </div>
      </section>

      <section className="wrap category-section" id="categories">
        <div className="section-heading"><div><span className="eyebrow muted">{t.categories}</span><h2>Find tilbud i din kategori</h2></div><a href="#deals" className="text-link">{t.all} <ArrowRight size={16}/></a></div>
        <div className="category-grid">
          {categoryKeys.map((key, i) => <button key={key} onClick={() => { setCategory(key); document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" }); }} className={category === key ? "category-tile active" : "category-tile"}><span className={"category-icon cat-" + i}>{["✦","⌘","⌂","✧","▤","♡","◉","✈"][i]}</span><span>{categoryName(key)}</span></button>)}
        </div>
      </section>

      <section className="deals-section" id="deals"><div className="wrap">
        <div className="section-heading"><div><span className="eyebrow muted">{t.latest}</span><h2>{t.popular} <span className="heading-dot">.</span></h2></div><label className="sort-control"><ArrowDownUp size={16}/><span>{t.sort}</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="newest">{t.newest}</option><option value="discount">{t.discountSort}</option></select><ChevronDown size={14}/></label></div>
        <div className="filter-row">{categoryKeys.map(key => <button key={key} className={category === key ? "filter-chip selected" : "filter-chip"} onClick={() => setCategory(key)}>{categoryName(key)}</button>)}</div>
        <div className="demo-note"><span><Check size={15}/>{t.demo}</span><p>{t.demoText}</p></div>
        <p className="result-count">{visibleDeals.length} {t.results}</p>
        {visibleDeals.length ? <div className="deal-grid">{visibleDeals.map(deal => <article className="deal-card" key={deal.id}>
          <div className={"deal-image " + deal.color}><span className="deal-tag">{deal.tag}</span><button className={saved.includes(deal.id) ? "save-btn saved" : "save-btn"} aria-label={t.saved} onClick={() => setSaved(old => old.includes(deal.id) ? old.filter(id => id !== deal.id) : [...old, deal.id])}><Heart size={19} fill={saved.includes(deal.id) ? "currentColor" : "none"}/></button><span className="product-symbol">{deal.symbol}</span><span className="discount-bubble">{deal.discount}</span></div>
          <div className="deal-content"><p className="store-name">{deal.store}</p><h3>{deal.title}</h3><div className="price-row"><strong>{deal.price}</strong><del>{deal.oldPrice}</del></div><button className="deal-link" type="button" onClick={() => setVipOpen(true)}>{t.view} <ArrowRight size={16}/></button></div>
        </article>)}</div> : <div className="empty-state">{t.noResults}</div>}
      </div></section>

      <section className="wrap feature-row" id="community"><div className="feature-card"><span className="feature-icon"><ShieldCheck/></span><div><h3>{t.safe}</h3><p>{t.safeText}</p></div></div><div className="feature-card"><span className="feature-icon"><Heart/></span><div><h3>{t.community}</h3><p>{t.communityText}</p></div></div><div className="feature-card"><span className="feature-icon"><Bell/></span><div><h3>{t.newsletter}</h3><p>{t.communityText}</p></div></div></section>

      <section className="vip-banner"><div className="wrap vip-inner"><div><span className="eyebrow">TILBUDJAGT VIP</span><h2>{t.vipTitle}</h2><p>{t.vipText}</p></div><button onClick={() => setVipOpen(true)}>{t.vip} <ArrowRight size={17}/></button></div></section>
      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#"><span className="brand-mark"><Tag size={20}/></span><span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span></a><p>{t.footer}</p><span>© {new Date().getFullYear()} TilbudJagt.dk</span></div></footer>

      {cookieVisible && <div className="cookie-bar"><div><strong>Cookies & privatliv</strong><p>Vi bruger nødvendige cookies til at få siden til at fungere. Valgfrie cookies aktiveres først efter samtykke.</p></div><button onClick={() => setCookieVisible(false)}>OK</button></div>}
      {vipOpen && <div className="modal-backdrop" role="presentation" onClick={() => setVipOpen(false)}><section className="vip-modal" role="dialog" aria-modal="true" aria-labelledby="vip-heading" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setVipOpen(false)} aria-label={t.close}><X/></button><span className="modal-spark"><Sparkles/></span><h2 id="vip-heading">{t.vipTitle}</h2><p>{t.vipText}</p><ul>{t.vipList.map(item => <li key={item}><Check size={17}/>{item}</li>)}</ul><strong className="vip-price">40 kr. <small>/ md.</small></strong><p className="modal-footnote">Betaling aktiveres først, når medlemskab og Stripe er sat sikkert op.</p><button className="modal-primary" onClick={() => setVipOpen(false)}>{t.close}</button></section></div>}
    </main>
  );
}
