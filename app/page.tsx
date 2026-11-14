"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownUp, ArrowRight, Bell, Check, ChevronDown, Heart, Menu, Search,
  ShieldCheck, Sparkles, Tag, TrendingUp, X, Zap, Flame, MessageCircle,
  ThumbsUp, Clock3, Store, ShoppingBasket, Coffee, Laptop, Shirt, Sofa,
} from "lucide-react";

type Language = "da" | "en" | "ar";
type Deal = {
  id: number; title: string; store: string; category: string; price: string;
  oldPrice: string; discount: string; tag: string; symbol: string;
  votes: number; comments: number; time: string; note: string;
};
const copy = {
  da: {
    tagline: "Jagten på de bedste tilbud starter her", search: "Søg produkter, butikker og tilbud…",
    categories: "Kategorier", latest: "Seneste tilbud", popular: "Populære tilbud", all: "Alle",
    electronics: "Elektronik", home: "Hjem & bolig", fashion: "Mode", groceries: "Dagligvarer",
    beauty: "Skønhed", sports: "Sport & fritid", travel: "Rejser", saved: "Gemte tilbud",
    submit: "Del et tilbud", vip: "Bliv VIP", hero: "De stærke tilbud. Samlet ét sted.",
    heroText: "Find ugens bedste priser på dagligvarer, elektronik, bolig, mode og meget mere.",
    explore: "Se dagens tilbud", safe: "Trygge og tydelige links", supermarket: "Supermarkedstilbud",
    supermarketText: "Hold øje med ugens priser hos de danske supermarkeder.",
    hot: "Dagens hotteste", fresh: "Nye fund fra fællesskabet", best: "Stærke tilbud lige nu",
    view: "Se tilbuddet", noResults: "Ingen tilbud matcher din søgning.",
    results: "tilbud", sort: "Sorter", newest: "Nyeste først", discountSort: "Største rabat",
    demo: "Designforhåndsvisning", demoText: "Eksempeltilbud – ikke aktuelle priser. Rigtige tilbud vises, når butikskilder og feeds er tilsluttet.",
    grocery: "Ugens dagligvarer", stores: "Populære butikker", allDeals: "Se alle tilbud",
    community: "Stem på tilbud", comments: "kommentarer", vote: "Stem", newsletter: "Få besked om stærke tilbud",
    email: "Din e-mailadresse", join: "Tilmeld", footer: "TilbudJagt gør det lettere at finde og dele gode tilbud. Tjek altid pris og vilkår hos butikken.",
    vipTitle: "TilbudJagt VIP", vipText: "Få en mere personlig tilbudsoplevelse for 40 kr./md.",
    vipList: ["Personlige tilbud baseret på dine interesser", "Gemte favoritter og tilbudsoverblik", "Ingen skjulte gebyrer – opsig når du vil"],
    close: "Luk", login: "Log ind", account: "Opret konto", allStores: "Alle butikker", sample: "Eksempel",
  },
  en: {
    tagline: "The hunt for great deals starts here", search: "Search products, stores and deals…",
    categories: "Categories", latest: "Latest deals", popular: "Popular deals", all: "All",
    electronics: "Electronics", home: "Home", fashion: "Fashion", groceries: "Groceries",
    beauty: "Beauty", sports: "Sports & leisure", travel: "Travel", saved: "Saved deals",
    submit: "Share a deal", vip: "Become VIP", hero: "The best deals. All in one place.",
    heroText: "Find this week’s best prices on groceries, electronics, home, fashion and more.",
    explore: "Browse today’s deals", safe: "Clear and safer links", supermarket: "Supermarket deals",
    supermarketText: "Keep an eye on weekly prices at Danish supermarkets.",
    hot: "Hottest today", fresh: "Fresh finds from the community", best: "Great deals right now",
    view: "View deal", noResults: "No deals match your search.", results: "deals",
    sort: "Sort", newest: "Newest first", discountSort: "Biggest discount",
    demo: "Design preview", demoText: "Example deals – not current prices. Real offers will appear when retailer sources and feeds are connected.",
    grocery: "This week’s groceries", stores: "Popular stores", allDeals: "See all deals",
    community: "Vote on deals", comments: "comments", vote: "Vote", newsletter: "Get alerts for great deals",
    email: "Your email address", join: "Subscribe", footer: "TilbudJagt makes it easier to find and share great deals. Always check prices and terms with the retailer.",
    vipTitle: "TilbudJagt VIP", vipText: "A more personal deal experience for DKK 40/month.",
    vipList: ["Personalised deals based on your interests", "Saved favourites and deal overview", "No hidden fees – cancel anytime"],
    close: "Close", login: "Log in", account: "Create account", allStores: "All stores", sample: "Example",
  },
  ar: {
    tagline: "صيد أفضل العروض يبدأ من هون", search: "ابحث عن منتج أو متجر أو عرض…",
    categories: "التصنيفات", latest: "أحدث العروض", popular: "العروض الرائجة", all: "الكل",
    electronics: "إلكترونيات", home: "المنزل", fashion: "الأزياء", groceries: "السوبرماركت",
    beauty: "الجمال", sports: "رياضة وترفيه", travel: "السفر", saved: "العروض المحفوظة",
    submit: "شارك عرضاً", vip: "عضوية VIP", hero: "أقوى العروض… كلها بمكان واحد.",
    heroText: "اكتشف أسعار الأسبوع على المواد الغذائية والإلكترونيات والمنزل والأزياء وأكثر.",
    explore: "شاهد عروض اليوم", safe: "روابط واضحة وموثوقة", supermarket: "عروض السوبرماركت",
    supermarketText: "تابع أسعار الأسبوع والتخفيضات في المتاجر الدنماركية.",
    hot: "الأقوى اليوم", fresh: "أحدث اكتشافات المجتمع", best: "عروض قوية الآن",
    view: "شاهد العرض", noResults: "ما لقينا عروض مطابقة لبحثك.", results: "عروض",
    sort: "ترتيب", newest: "الأحدث أولاً", discountSort: "أكبر تخفيض",
    demo: "معاينة للتصميم", demoText: "هذه أمثلة توضيحية وليست أسعاراً حالية. ستظهر العروض الحقيقية بعد ربط مصادر المتاجر وخلاصات المنتجات.",
    grocery: "مواد الأسبوع الغذائية", stores: "متاجر مشهورة", allDeals: "شاهد كل العروض",
    community: "صوّت على العروض", comments: "تعليقات", vote: "تصويت", newsletter: "تنبيهات بأقوى العروض",
    email: "بريدك الإلكتروني", join: "اشتراك", footer: "TilbudJagt تساعدك تكتشف العروض وتشاركها. تحقق دائماً من السعر والشروط عند المتجر.",
    vipTitle: "عضوية TilbudJagt VIP", vipText: "تجربة عروض شخصية مقابل 40 كرونة دنماركية شهرياً.",
    vipList: ["عروض حسب اهتماماتك", "حفظ المفضلة ومتابعة العروض", "بدون رسوم مخفية – ألغِ متى شئت"],
    close: "إغلاق", login: "تسجيل الدخول", account: "إنشاء حساب", allStores: "كل المتاجر", sample: "مثال",
  },
} as const;

const categoryKeys = ["all", "groceries", "electronics", "home", "fashion", "beauty", "sports", "travel"] as const;
const deals: Deal[] = [
  { id: 1, title: "Frugt og grønt – ugens udvalg", store: "Lidl · Dagligvarer", category: "groceries", price: "Eksempel", oldPrice: "", discount: "Ugens pris", tag: "Supermarked", symbol: "🥦", votes: 128, comments: 24, time: "I dag", note: "Frugt, grønt og hverdagsfavoritter" },
  { id: 2, title: "Kaffe – stor pakke", store: "føtex · Dagligvarer", category: "groceries", price: "Eksempel", oldPrice: "", discount: "Skarp pris", tag: "Populær", symbol: "☕", votes: 96, comments: 18, time: "I dag", note: "Kaffe og morgenmadsfavoritter" },
  { id: 3, title: "Pasta, ris og basisvarer", store: "Netto · Dagligvarer", category: "groceries", price: "Eksempel", oldPrice: "", discount: "Ugens tilbud", tag: "Dagligvarer", symbol: "🍝", votes: 84, comments: 12, time: "I går", note: "Fyld kurven med basisvarer" },
  { id: 4, title: "Vaskemiddel og rengøring", store: "REMA 1000 · Husholdning", category: "home", price: "Eksempel", oldPrice: "", discount: "God pris", tag: "Hverdag", symbol: "🧼", votes: 72, comments: 9, time: "I går", note: "Til hjemmets faste indkøb" },
  { id: 5, title: "Trådløse hovedtelefoner", store: "Elgiganten · Elektronik", category: "electronics", price: "Eksempel", oldPrice: "", discount: "Stærkt fund", tag: "Populær", symbol: "🎧", votes: 63, comments: 15, time: "2 timer siden", note: "Elektronik og lyd" },
  { id: 6, title: "Løbesko til hverdag", store: "Sport 24 · Sport", category: "sports", price: "Eksempel", oldPrice: "", discount: "God pris", tag: "Udvalgt", symbol: "👟", votes: 48, comments: 7, time: "3 timer siden", note: "Sport og fritid" },
  { id: 7, title: "Hudpleje gaveæske", store: "Matas · Skønhed", category: "beauty", price: "Eksempel", oldPrice: "", discount: "Populær", tag: "Skønhed", symbol: "🧴", votes: 41, comments: 6, time: "I dag", note: "Pleje og velvære" },
  { id: 8, title: "Sengetøj i blød bomuld", store: "JYSK · Hjem & bolig", category: "home", price: "Eksempel", oldPrice: "", discount: "Stærkt fund", tag: "Hjem", symbol: "🛏️", votes: 35, comments: 4, time: "I dag", note: "Gør hjemmet hyggeligt" },
];
const stores = ["Lidl", "Netto", "REMA 1000", "føtex", "Bilka", "365discount", "Coop"];

export default function HomePage() {
  const [lang, setLang] = useState<Language>("da");
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([]);
  const [voted, setVoted] = useState<number[]>([]);
  const [sort, setSort] = useState("newest");
  const [vipOpen, setVipOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const t = copy[lang], rtl = lang === "ar";
  const visibleDeals = useMemo(() => {
    let list = deals.filter(d => (category === "all" || d.category === category) && (d.title + " " + d.store).toLowerCase().includes(query.toLowerCase()));
    if (sort === "discount") list = [...list].sort((a,b) => b.votes-a.votes);
    return list;
  }, [category, query, sort]);
  const categoryName = (key: string) => t[key as keyof typeof t] || key;
  const toggleCategory = (key: string) => { setCategory(key); document.getElementById("deals")?.scrollIntoView({behavior:"smooth"}); };
  return (
    <main dir={rtl ? "rtl" : "ltr"}>
      <div className="top-strip"><span><Zap size={14}/> {t.tagline}</span><span><ShieldCheck size={14}/> {t.safe}</span></div>
      <header className="header wrap">
        <a className="brand" href="#"><span className="brand-mark"><Tag size={22}/></span><span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span></a>
        <nav className={mobileMenu ? "nav nav-open" : "nav"}><a href="#deals">{t.latest}</a><a href="#categories">{t.categories}</a><a href="#supermarkets">{t.supermarket}</a></nav>
        <div className="header-actions">
          <select aria-label="Language" className="language" value={lang} onChange={e=>setLang(e.target.value as Language)}><option value="da">DA</option><option value="en">EN</option><option value="ar">AR</option></select>
          <a className="login-btn" href="/login">{t.login}</a><a className="login-btn" href="/register">{t.account}</a><a className="login-btn" href="/submit">{t.submit}</a>
          <button className="vip-btn" onClick={()=>setVipOpen(true)}><Sparkles size={15}/> {t.vip}</button>
          <button className="menu-btn" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Menu">{mobileMenu?<X/>:<Menu/>}</button>
        </div>
      </header>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-copy"><div className="eyebrow"><Flame size={15}/> DANMARKS DEALUNIVERS</div><h1>{t.hero}</h1><p>{t.heroText}</p>
            <div className="hero-search"><Search size={19}/><input value={query} onChange={e=>{setQuery(e.target.value);document.getElementById("deals")?.scrollIntoView({behavior:"smooth"});}} placeholder={t.search}/><button onClick={()=>document.getElementById("deals")?.scrollIntoView({behavior:"smooth"})}><ArrowRight size={18}/></button></div>
            <div className="hero-quick"><span><ShieldCheck size={15}/> {t.safe}</span><span><TrendingUp size={15}/> {t.hot}</span></div>
          </div>
          <div className="hero-feature"><div className="feature-kicker"><Flame size={15}/> {t.hot}</div><div className="feature-emoji">🛒</div><strong>{t.supermarket}</strong><p>{t.supermarketText}</p><button onClick={()=>toggleCategory("groceries")}>{t.explore} <ArrowRight size={16}/></button></div>
        </div>
      </section>
      <section className="wrap store-section" id="supermarkets"><div className="section-title"><div><span className="eyebrow muted">{t.stores}</span><h2>{t.supermarket}</h2></div><ShoppingBasket size={25}/></div>
        <div className="store-pills">{stores.map((s,i)=><button key={s} onClick={()=>{setCategory("groceries");setQuery(s);document.getElementById("deals")?.scrollIntoView({behavior:"smooth"});}}><span>{["🟡","🟢","🔴","🔵","🟡","🟣","🟢"][i]}</span>{s}</button>)}</div>
      </section>
      <section className="wrap category-section" id="categories"><div className="section-title"><div><span className="eyebrow muted">{t.categories}</span><h2>{t.best}</h2></div><a className="text-link" href="#deals">{t.allDeals} <ArrowRight size={16}/></a></div>
        <div className="category-grid">{categoryKeys.map((key,i)=><button key={key} onClick={()=>toggleCategory(key)} className={category===key?"category-tile active":"category-tile"}><span className={"category-icon cat-"+i}>{[<Tag/>,<ShoppingBasket/>,<Laptop/>,<Sofa/>,<Shirt/>,<Sparkles/>,<Zap/>,<Bell/>][i]}</span><span>{categoryName(key)}</span></button>)}</div>
      </section>
      <section className="deals-section" id="deals"><div className="wrap">
        <div className="section-title"><div><span className="eyebrow muted">{t.fresh}</span><h2><Flame size={23}/> {t.popular}</h2></div><label className="sort-control"><ArrowDownUp size={15}/><select value={sort} onChange={e=>setSort(e.target.value)}><option value="newest">{t.newest}</option><option value="discount">{t.discountSort}</option></select><ChevronDown size={14}/></label></div>
        <div className="deal-toolbar">{categoryKeys.map(key=><button key={key} className={category===key?"filter-chip selected":"filter-chip"} onClick={()=>setCategory(key)}>{categoryName(key)}</button>)}</div>
        <div className="demo-note"><Check size={15}/><span><b>{t.demo}</b> — {t.demoText}</span></div>
        <p className="result-count">{visibleDeals.length} {t.results}</p>
        <div className="deal-list">{visibleDeals.map((deal,i)=><article className="deal-row" key={deal.id}>
          <div className="deal-votes"><button className={voted.includes(deal.id)?"vote-btn voted":"vote-btn"} onClick={()=>setVoted(old=>old.includes(deal.id)?old.filter(x=>x!==deal.id):[...old,deal.id])}><ThumbsUp size={18}/><b>{deal.votes+(voted.includes(deal.id)?1:0)}</b></button><span>{t.vote}</span></div>
          <div className="deal-visual"><span>{deal.symbol}</span><b>{deal.discount}</b></div>
          <div className="deal-info"><div className="deal-meta"><span className="store-label"><Store size={13}/> {deal.store}</span><span><Clock3 size={12}/> {deal.time}</span></div><h3>{deal.title}</h3><p>{deal.note}</p><div className="deal-bottom"><span className="deal-price">{deal.price}</span><span className="deal-tag">{deal.tag}</span><span className="comments"><MessageCircle size={14}/> {deal.comments} {t.comments}</span></div></div>
          <div className="deal-actions"><button className={saved.includes(deal.id)?"save-btn saved":"save-btn"} onClick={()=>setSaved(old=>old.includes(deal.id)?old.filter(x=>x!==deal.id):[...old,deal.id])} aria-label={t.saved}><Heart size={18} fill={saved.includes(deal.id)?"currentColor":"none"}/></button><span className="deal-link preview-link">{t.sample}</span></div>
        </article>)}</div>
        {!visibleDeals.length&&<div className="empty-state">{t.noResults}</div>}
      </div></section>
      <section className="wrap feature-row"><div className="feature-card"><ShieldCheck/><div><h3>{t.safe}</h3><p>{t.footer}</p></div></div><div className="feature-card"><Heart/><div><h3>{t.community}</h3><p>{t.supermarketText}</p></div></div><div className="feature-card"><Bell/><div><h3>{t.newsletter}</h3><p>{t.heroText}</p></div></div></section>
      <section className="vip-banner"><div className="wrap vip-inner"><div><span className="eyebrow">TILBUDJAGT VIP</span><h2>{t.vipTitle}</h2><p>{t.vipText}</p></div><button onClick={()=>setVipOpen(true)}>{t.vip} <ArrowRight size={17}/></button></div></section>
      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#"><span className="brand-mark"><Tag size={20}/></span><span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span></a><p>{t.footer}</p><span>© {new Date().getFullYear()} TilbudJagt.dk</span></div></footer>
      {vipOpen&&<div className="modal-backdrop" onClick={()=>setVipOpen(false)}><section className="vip-modal" role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setVipOpen(false)}><X/></button><span className="modal-spark"><Sparkles/></span><h2>{t.vipTitle}</h2><p>{t.vipText}</p><ul>{t.vipList.map(x=><li key={x}><Check size={17}/>{x}</li>)}</ul><strong className="vip-price">40 kr. <small>/ md.</small></strong><p className="modal-footnote">Betaling aktiveres først, når medlemskab og Stripe er sat sikkert op.</p><button className="modal-primary" onClick={()=>setVipOpen(false)}>{t.close}</button></section></div>}
    </main>
  );
}
