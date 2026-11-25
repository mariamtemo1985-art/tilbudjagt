"use client";

import { ArrowRight, BookOpen } from "lucide-react";

type Language = "da" | "en" | "ar";
type GuideCard = {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  date: string;
};

const COPY: Record<
  Language,
  {
    kicker: string;
    title: string;
    intro: string;
    read: string;
    all: string;
    note?: string;
    cards: GuideCard[];
  }
> = {
  da: {
    kicker: "GUIDES & NYHEDER",
    title: "Nye guides og nyheder",
    intro:
      "Praktiske råd om tilbud, priser og smartere indkøb – samlet i vores guides.",
    read: "Læs guide",
    all: "Se alle guides",
    cards: [
      {
        slug: "black-friday-2026-danmark",
        kicker: "BLACK FRIDAY",
        title: "Black Friday 2026 i Danmark: find de reelle tilbud",
        description:
          "Planlæg købene, sammenlign priser og undgå falske førpriser med den praktiske tjekliste.",
        date: "25. november 2026",
      },
      {
        slug: "black-friday-tjekliste",
        kicker: "TJEKLISTE",
        title: "Black Friday-tjekliste: køb rigtigt tilbud",
        description:
          "Black Friday er fyldt med rabatter, men ikke alle er reelle. Brug tjeklisten, før du køber.",
        date: "19. november 2026",
      },
      {
        slug: "koekken-og-husholdning-spar-penge",
        kicker: "HUSHOLDNING",
        title: "Køkken og husholdning: spar penge i hverdagen",
        description:
          "Færre gadgets, bedre materialer og styr på filtre og rengøring gør køkkenet billigere.",
        date: "25. november 2026",
      },
    ],
  },
  en: {
    kicker: "GUIDES & NEWS",
    title: "New guides and news",
    intro:
      "Practical advice on deals, prices and smarter shopping – collected in our guides.",
    read: "Read guide",
    all: "See all guides",
    note: "Guides are currently published in Danish and Arabic.",
    cards: [
      {
        slug: "black-friday-2026-danmark",
        kicker: "BLACK FRIDAY",
        title: "Black Friday 2026 in Denmark: find the real deals",
        description:
          "Plan your purchases, compare prices and avoid fake pre-sale prices with the practical checklist.",
        date: "25 November 2026",
      },
      {
        slug: "black-friday-tjekliste",
        kicker: "CHECKLIST",
        title: "Black Friday checklist: buy the right deal",
        description:
          "Black Friday is full of discounts, but not all of them are real. Use the checklist before you buy.",
        date: "19 November 2026",
      },
      {
        slug: "koekken-og-husholdning-spar-penge",
        kicker: "HOUSEHOLD",
        title: "Kitchen and household: save money every day",
        description:
          "Fewer gadgets, better materials and control over filters and cleaning make the kitchen cheaper.",
        date: "25 November 2026",
      },
    ],
  },
  ar: {
    kicker: "الأدلة والمقالات",
    title: "أدلة ومقالات جديدة",
    intro:
      "نصائح عملية عن العروض والأسعار والتسوق الذكي، جمعناها لك في مكان واحد.",
    read: "اقرأ الدليل",
    all: "كل الأدلة",
    cards: [
      {
        slug: "black-friday-2026-danmark",
        kicker: "البلاك فريدي",
        title: "Black Friday 2026 في الدنمارك: اعثر على العروض الحقيقية",
        description:
          "خطّط لمشترياتك، وقارن الأسعار، وتجنّب الأسعار السابقة الوهمية مع قائمة التحقق العملية.",
        date: "25 نوفمبر 2026",
      },
      {
        slug: "black-friday-tjekliste",
        kicker: "قائمة تحقق",
        title: "قائمة التحقق لـ Black Friday: اشترِ العرض الحقيقي",
        description:
          "تفيض عروض Black Friday بالتخفيضات، لكن ليس كلها حقيقياً. استخدم القائمة قبل أن تشتري.",
        date: "19 نوفمبر 2026",
      },
      {
        slug: "koekken-og-husholdning-spar-penge",
        kicker: "المطبخ والمنزل",
        title: "المطبخ والمنزل: كيف توفر المال في حياتك اليومية",
        description:
          "أدوات أقل، ومواد أفضل، وإدارة الفلاتر والتنظيف تجعل المطبخ أرخص وأسهل.",
        date: "25 نوفمبر 2026",
      },
    ],
  },
};

export default function GuideHighlights({ lang = "da" }: { lang?: Language }) {
  const copy = COPY[lang];
  const prefix = lang === "ar" ? "/ar" : "";
  const allHref = lang === "en" ? "/en/guides" : `${prefix}/guides`;

  return (
    <section className="wrap gh-section" id="guides-news" aria-labelledby="gh-title">
      <div className="gh-head">
        <div>
          <span className="gh-kicker">
            <BookOpen size={14} /> {copy.kicker}
          </span>
          <h2 className="gh-title" id="gh-title">
            {copy.title}
          </h2>
          <p className="gh-intro">{copy.intro}</p>
        </div>
        <a className="gh-all" href={allHref}>
          {copy.all} <ArrowRight size={14} />
        </a>
      </div>
      <div className="gh-grid">
        {copy.cards.map((card) => (
          <article className="gh-card" key={card.slug}>
            <span className="gh-card-kicker">{card.kicker}</span>
            <h3>
              <a href={`${prefix}/guides/${card.slug}`}>{card.title}</a>
            </h3>
            <p>{card.description}</p>
            <div className="gh-card-foot">
              <span>{card.date}</span>
              <a href={`${prefix}/guides/${card.slug}`}>
                {copy.read} <ArrowRight size={13} />
              </a>
            </div>
          </article>
        ))}
      </div>
      {copy.note && <p className="gh-note">{copy.note}</p>}
    </section>
  );
}
