"use client";

import { useEffect, useState } from "react";
import { GUIDES_AR } from "@/lib/guides-ar";

export type SiteLanguage = "da" | "en" | "ar";
export const SITE_LANG_KEY = "tilbudjagt_lang";

function readLang(): SiteLanguage {
  if (typeof window === "undefined") return "da";
  try {
    const path = window.location.pathname;
    if (path === "/en" || path.startsWith("/en/")) return "en";
    if (path === "/ar" || path.startsWith("/ar/")) return "ar";
    const stored = window.localStorage.getItem(SITE_LANG_KEY);
    if (stored === "ar" || stored === "en" || stored === "da") return stored;
    const match = document.cookie.match(/(?:^|; )tilbudjagt_lang=([^;]+)/);
    if (match?.[1] === "ar" || match?.[1] === "en") return match[1];
  } catch {
    /* ignore */
  }
  return "da";
}

export function useSiteLang() {
  const [lang, setLang] = useState<SiteLanguage>("da");
  useEffect(() => {
    const sync = () => setLang(readLang());
    sync();
    window.addEventListener("tilbudjagt:langchange", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tilbudjagt:langchange", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return lang;
}

const DA_AR: Record<string, string> = {
  ...GUIDES_AR,
  // Navigation / shared
  "Hovedmenu": "القائمة الرئيسية",
  "Footer links": "روابط التذييل",
  "Produkter": "المنتجات",
  "Rabatkoder": "أكواد الخصم",
  "Butikker": "المتاجر",
  "Guides": "الأدلة",
  "Om os": "من نحن",
  "Bliv VIP": "انضم إلى VIP",
  "Annoncering": "الإعلان",
  "Kontakt": "التواصل",
  "Privatliv": "الخصوصية",
  "Privatlivspolitik": "سياسة الخصوصية",
  "Vilkår": "الشروط",
  "Cookies": "ملفات الارتباط",
  "Alle guides": "كل الأدلة",
  "Læs guiden": "اقرأ الدليل",
  "Se butikker": "شاهد المتاجر",
  "Del": "شارك",
  "Kopier link": "نسخ الرابط",
  "Kopieret": "تم النسخ",

  // Products page
  "Priser fra partnerbutikker": "أسعار من المتاجر الشريكة",
  "Produkter og priser": "المنتجات والأسعار",
  "Vi viser varer fra butikker, hvor vi har en godkendt partneraftale. Priserne er butikkens egne priser og kan ændre sig. Tjek altid den endelige pris hos butikken, før du køber.":
    "نعرض منتجات من متاجر لدينا معها اتفاقية شراكة معتمدة. الأسعار هي أسعار المتجر نفسه وقد تتغير. تحقق دائمًا من السعر النهائي لدى المتجر قبل الشراء.",
  "Reklame:": "إعلان:",
  "Linkene på denne side er affiliate-links. Hvis du køber via et link, kan vi få en provision – prisen for dig er den samme. Priserne blev sidst hentet":
    "الروابط في هذه الصفحة هي روابط تسويق بالعمولة. إذا اشتريت عبر رابط، فقد نحصل على عمولة – السعر عليك يبقى نفسه. تم آخر جلب للأسعار",
  "Søg efter vare, brand eller kategori…": "ابحث عن منتج أو علامة تجارية أو فئة…",
  "Søg produkter": "ابحث عن المنتجات",
  "Vælg kategori": "اختر الفئة",
  "Alle kategorier": "كل الفئات",
  "Søger…": "جارٍ البحث…",
  "Ingen varer matcher din søgning. Prøv et andet ord.": "لا توجد منتجات تطابق بحثك. جرّب كلمة أخرى.",
  "Vis flere varer": "عرض المزيد من المنتجات",
  "Søgningen kunne ikke hentes lige nu. Prøv igen om et øjeblik.": "تعذّر تحميل البحث الآن. حاول مرة أخرى بعد قليل.",
  "Kunne ikke hente flere varer. Prøv igen.": "تعذّر تحميل المزيد من المنتجات. حاول مرة أخرى.",

  // Advertising page
  "FOR BUTIKKER OG BRANDS": "للمتاجر والعلامات التجارية",
  "Synlighed hos forbrugere, der leder efter et godt tilbud.":
    "ظهور أمام المستهلكين الذين يبحثون عن عرض جيد.",
  "TilbudJagt samler butikker, produkter og forbrugerGuides på ét sted. Vi tilbyder enkle og tydeligt mærkede samarbejder – uden popups, skjulte annoncer eller placeringer, der ligner vores eget indhold.":
    "يجمع TilbudJagt المتاجر والمنتجات والأدلة الاستهلاكية في مكان واحد. نقدّم تعاونًا بسيطًا وواضح العلامات – بلا نوافذ منبثقة أو إعلانات خفية أو مواضع تبدو وكأنها محتوى موقعنا.",
  "Kontakt om annoncering": "تواصل بشأن الإعلان",
  "Se kontaktoplysninger": "عرض بيانات التواصل",
  "Annonceformater": "صيغ الإعلان",
  "Sponsoreret butik": "متجر مُرعَى",
  "Få en tydelig plads i den relevante kategori eller blandt udvalgte butikker. Placeringen mærkes altid":
    "احصل على مكان واضح في الفئة المناسبة أو بين متاجر مختارة. يُعلَّم الموضع دائمًا",
  "“Sponsoreret”": "«مُموَّل»",
  ", så besøgende kan se forskellen mellem betalt synlighed og vores øvrige butiksoversigt.":
    "، ليرى الزوار الفرق بين الظهور المدفوع وقائمة متاجرنا الأخرى.",
  "Relevant kategori eller forsideplacering": "فئة مناسبة أو موضع في الصفحة الرئيسية",
  "Fast periode efter aftale": "مدة ثابتة حسب الاتفاق",
  "Ingen skjulte rangordninger": "بلا ترتيب مخفي",
  "Display og banner": "العرض والبانر",
  "Diskrete annoncefelter på udvalgte sider, hvor de ikke dækker indhold eller forveksles med navigation. Vi bruger kun annoncenetværk og samtykkeløsninger, der lever op til de gældende krav.":
    "مساحات إعلانية غير مزعجة في صفحات مختارة، لا تغطي المحتوى ولا تُخلط مع التنقل. نستخدم فقط شبكات إعلانية وحلول موافقة تستوفي المتطلبات السارية.",
  "Mærket “Annonce”": "موسوم «إعلان»",
  "Ingen popups eller overlay": "بلا نوافذ منبثقة أو طبقات تغطية",
  "Aktiveres først efter godkendt samtykkeopsætning": "يُفعّل فقط بعد اعتماد إعداد الموافقة",
  "Nyhedsbrev og performance": "النشرة الإخبارية والأداء",
  "Vi kan også drøfte en relevant sponsorplads i vores e-mailliste eller et performancebaseret samarbejde via et godkendt affiliate-netværk. Indhold og vilkår aftales konkret, før noget publiceres.":
    "يمكننا أيضًا مناقشة مساحة رعاية مناسبة في قائمتنا البريدية أو تعاون قائم على الأداء عبر شبكة تسويق بالعمولة معتمدة. يُتفق على المحتوى والشروط بشكل محدد قبل نشر أي شيء.",
  "Kun relevante tilbud til modtagerne": "عروض مناسبة فقط للمستلمين",
  "Affiliate/CPC efter aftale": "تسويق بالعمولة/الدفع مقابل النقرة حسب الاتفاق",
  "Ingen køb af personoplysninger": "لا شراء لبيانات الأشخاص",
  "Klare regler for alle samarbejder:": "قواعد واضحة لكل التعاون:",
  "Betalte placeringer mærkes “Sponsoreret” eller “Reklame”. De blandes ikke med redaktionelle guides, og de ændrer ikke vores omtale af en butik. Vi tager ikke imod skjulte annoncer, vildledende knapper, popups eller annoncer, der ser ud som en del af vores menu. Alle priser og vilkår aftales skriftligt, og annoncøren er selv ansvarlig for indholdet i annoncen.":
    "المواضع المدفوعة تُعلَّم بـ«مُموَّل» أو «إعلان». لا تُخلط مع الأدلة التحريرية، ولا تغيّر تقييمنا لأي متجر. لا نقبل إعلانات خفية أو أزرارًا مضللة أو نوافذ منبثقة أو إعلانات تبدو جزءًا من قائمتنا. تُتفق كل الأسعار والشروط كتابيًا، والمعلن مسؤول بنفسه عن محتوى إعلانه.",
  "Performance:": "الأداء:",
  "Et affiliate- eller CPC-samarbejde giver først betaling ved en kvalificeret handling efter aftale – ikke ved blot at vise siden. Vi oplyser aktuelle trafiktal og muligheder i dialogen, så I kan vurdere samarbejdet på et realistisk grundlag.":
    "تعاون التسويق بالعمولة أو الدفع مقابل النقرة لا يمنح دفعة إلا عند تنفيذ إجراء مؤهل حسب الاتفاق – وليس بمجرد عرض الصفحة. نذكر أرقام الزيارات والفرص الحالية في الحوار، لتقييم التعاون على أساس واقعي.",
  "HVORFOR TILBUDJAGT": "لماذا TilbudJagt",
  "En enkel ramme for et seriøst samarbejde": "إطار بسيط لتعاون جاد",
  "Tydelig brugerrejse": "رحلة مستخدم واضحة",
  "Besøgende kan se, hvornår de forlader TilbudJagt, og hvornår et link er betalt.":
    "يمكن للزائر معرفة متى يغادر TilbudJagt ومتى يكون الرابط مدفوعًا.",
  "Ingen skjulte aftaler": "بلا اتفاقيات خفية",
  "Alle betalte placeringer er mærket, og vi lover ikke bestemte salgstal.":
    "كل المواضع المدفوعة معلّمة، ولا نعد بأرقام مبيعات محددة.",
  "Direkte kontakt": "تواصل مباشر",
  "Skriv til support@tilbudjagt.dk, så vender vi tilbage med næste skridt.":
    "اكتب إلى support@tilbudjagt.dk وسنعود إليك بالخطوة التالية.",
  "Annoncering og sponsorering mærkes altid tydeligt. Kontakt support@tilbudjagt.dk.":
    "الإعلان والرعاية يُعلَّمان دائمًا بوضوح. تواصل مع support@tilbudjagt.dk.",

  // Guides page
  "GUIDES": "الأدلة",
  "Bliv klogere på tilbud": "تعلّم كيف تقيّم العروض",
  "Vi viser først priser, når de kommer fra butikken selv. Indtil da kan du bruge vores guides til at vurdere, om et tilbud er værd at tage.":
    "لا نعرض الأسعار إلا عندما تأتي من المتجر نفسه. حتى ذلك الحين، استخدم أدلتنا لتقييم ما إذا كان العرض يستحق.",
  "Find butikkerne bag tilbuddene": "اعثر على المتاجر التي تقدّم العروض",
  "Søg på navn eller kategori og se, hvilke butikker der er godkendte partnere.":
    "ابحث بالاسم أو الفئة وشاهد المتاجر الشريكة المعتمدة.",
  "Guiderne er generel forbrugerinformation, ikke personlig rådgivning.":
    "الأدلة معلومات استهلاكية عامة وليست استشارة شخصية.",
  "Forbrug": "استهلاك",
  "Dagligvarer": "مواد غذائية",
  "Elektronik": "إلكترونيات",
  "Om TilbudJagt": "عن TilbudJagt",
  "Hverdagen": "الحياة اليومية",
  "Tryghed": "الأمان",
  "Sæson": "الموسم",
  "Jul": "عيد الميلاد",
  "Black Friday": "Black Friday",
  "Læs også": "اقرأ أيضًا",
  "Læs flere guides": "اقرأ المزيد من الأدلة",
  "Del guide": "شارك الدليل",
  "Guiden er generel forbrugerinformation og ikke personlig rådgivning. Kontroller altid pris, lager og vilkår hos butikken, før du køber.":
    "الدليل معلومات استهلاكية عامة وليس استشارة شخصية. تحقق دائمًا من السعر والمخزون والشروط لدى المتجر قبل الشراء.",
  "Opdateret": "آخر تحديث",
};

const PATTERNS: Array<[RegExp, string]> = [
  [/^(\d+)\s+varer fundet$/, "$1 منتجًا تم العثور عليها"],
  [/^(\d+)\s+butikker$/, "$1 متجرًا"],
  [/^Priserne blev sidst hentet (.+)$/, "تم آخر جلب للأسعار $1"],
  [/^Opdateret (.+) · TilbudJagt\.dk$/, "آخر تحديث $1 · TilbudJagt.dk"],
  [
    /^Linkene på denne side er affiliate-links\. Hvis du køber via et link, kan vi få en provision – prisen for dig er den samme\. Priserne blev sidst hentet (.+)\.$/,
    "الروابط في هذه الصفحة هي روابط تسويق بالعمولة. إذا اشتريت عبر رابط، فقد نحصل على عمولة – السعر عليك يبقى نفسه. تم آخر جلب للأسعار $1.",
  ],
  [
    /^(\d{1,2})\. (januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december) (\d{4})$/,
    "$1 $3",
  ],
];

const MONTHS_AR: Record<string, string> = {
  januar: "يناير",
  februar: "فبراير",
  marts: "مارس",
  april: "أبريل",
  maj: "مايو",
  juni: "يونيو",
  juli: "يوليو",
  august: "أغسطس",
  september: "سبتمبر",
  oktober: "أكتوبر",
  november: "نوفمبر",
  december: "ديسمبر",
};

function translateValue(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const normalized = trimmed.replace(/\s+/g, " ");
  const exact = DA_AR[normalized];
  if (exact) {
    const index = value.indexOf(trimmed);
    if (index >= 0) return value.slice(0, index) + exact + value.slice(index + trimmed.length);
    return exact;
  }
  for (const [pattern, replacement] of PATTERNS) {
    if (pattern.test(normalized)) {
      const match = normalized.match(pattern);
      if (match && pattern.source.startsWith("^(\\d{1,2})")) {
        return `${match[1]} ${MONTHS_AR[match[2]] || match[2]} ${match[3]}`;
      }
      return value.replace(trimmed, normalized.replace(pattern, replacement));
    }
  }
  return value;
}

type TextOriginal = { node: Text; value: string };
type AttrOriginal = { element: Element; name: string; value: string };

const textOriginals = new WeakMap<Text, string>();
const attrOriginals = new WeakMap<Element, Record<string, string>>();

function shouldSkip(element: Element | null): boolean {
  if (!element) return false;
  if (element.closest("[data-no-translate]")) return true;
  const tag = element.tagName;
  return tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "TEXTAREA";
}

function applyTranslations(lang: SiteLanguage) {
  if (typeof document === "undefined") return;
  const body = document.body;
  if (!body) return;

  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const text = node as Text;
    const parent = text.parentElement;
    if (!shouldSkip(parent)) {
      if (!textOriginals.has(text)) textOriginals.set(text, text.nodeValue ?? "");
      const original = textOriginals.get(text) ?? "";
      const next = lang === "ar" ? translateValue(original) : original;
      if (text.nodeValue !== next) text.nodeValue = next;
    }
    node = walker.nextNode();
  }

  const attrs = ["placeholder", "aria-label", "title"];
  body.querySelectorAll("*").forEach((element) => {
    if (shouldSkip(element)) return;
    let saved = attrOriginals.get(element);
    if (!saved) {
      saved = {};
      for (const name of attrs) {
        const value = element.getAttribute(name);
        if (value) saved[name] = value;
      }
      attrOriginals.set(element, saved);
    }
    for (const name of attrs) {
      const original = saved[name];
      if (!original) continue;
      const next = lang === "ar" ? translateValue(original) : original;
      if (element.getAttribute(name) !== next) element.setAttribute(name, next);
    }
  });
}

export default function SiteTranslator() {
  const lang = useSiteLang();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("translate", lang === "da" ? "yes" : "no");
    document.documentElement.classList.toggle("notranslate", lang !== "da");
    applyTranslations(lang);

    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        scheduled = false;
        applyTranslations(lang);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [lang]);

  return null;
}
