export const SITE_URL = "https://www.tilbudjagt.dk";

export type Locale = "da" | "en" | "ar";

export const LOCALES: Locale[] = ["da", "en", "ar"];
export const LOCALIZED_LOCALES: Locale[] = ["en", "ar"];

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  da: "da-DK",
  en: "en",
  ar: "ar",
};

export const LOCALE_OG_LOCALE: Record<Locale, string> = {
  da: "da_DK",
  en: "en_US",
  ar: "ar_AR",
};

export function isLocale(value: string | undefined): value is Locale {
  return value === "da" || value === "en" || value === "ar";
}

export function isLocalizedLocale(value: string | undefined): value is "en" | "ar" {
  return value === "en" || value === "ar";
}

export function localePrefix(locale: Locale): "" | "/en" | "/ar" {
  return locale === "da" ? "" : `/${locale}`;
}

/** Path for a locale. Danish lives at the root, English/Arabic under /en and /ar. */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const prefix = localePrefix(locale);
  if (clean === "/") return prefix || "/";
  return `${prefix}${clean}`;
}

/** Absolute URL for a locale. */
export function localeUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * hreflang map used by every translated page.
 * x-default points to the Danish original, which is the primary market.
 */
export function languageAlternates(path: string): Record<string, string> {
  return {
    "da-DK": localeUrl("da", path),
    en: localeUrl("en", path),
    ar: localeUrl("ar", path),
    "x-default": localeUrl("da", path),
  };
}

/** hreflang map for content that only exists in Danish and Arabic. */
export function danishArabicAlternates(path: string): Record<string, string> {
  return {
    "da-DK": localeUrl("da", path),
    ar: localeUrl("ar", path),
    "x-default": localeUrl("da", path),
  };
}

export const PAGE_META: Record<
  "home" | "stores" | "products" | "coupons" | "guides",
  Record<Locale, { title: string; description: string }>
> = {
  home: {
    da: {
      title: "TilbudJagt.dk – Find de bedste tilbud i Danmark",
      description:
        "Find, gem og del gode tilbud fra danske butikker. Sammenlign kampagner og opdag nye besparelser på TilbudJagt.dk.",
    },
    en: {
      title: "TilbudJagt.dk – Find the best deals in Denmark",
      description:
        "Discover Danish stores and current deals. Compare offers, browse store information and find savings across Denmark.",
    },
    ar: {
      title: "TilbudJagt.dk – اكتشف أفضل العروض في الدنمارك",
      description:
        "اكتشف المتاجر الدنماركية والعروض الحالية، وقارن العروض وتصفّح معلومات المتاجر ووفّر أكثر في الدنمارك.",
    },
  },
  stores: {
    da: {
      title: "Butikker – find danske butikker",
      description:
        "Søg blandt danske butikker på navn eller kategori. Se hvilke butikker der er godkendte partnere, og hvilke der kun er direkte links.",
    },
    en: {
      title: "Stores in Denmark – full directory",
      description:
        "Search Danish stores by name or category. See approved partners and direct store links, with store information in English.",
    },
    ar: {
      title: "المتاجر في الدنمارك – الدليل الكامل",
      description:
        "ابحث بين المتاجر الدنماركية بالاسم أو الفئة، وتعرّف على الشركاء المعتمدين وروابط المتاجر المباشرة بالعربية.",
    },
  },
  products: {
    da: {
      title: "Produkter og priser – aktuelle varer",
      description:
        "Se aktuelle produkter og priser fra godkendte partnerbutikker. Søg efter vare, brand eller kategori og se prisen direkte hos butikken.",
    },
    en: {
      title: "Products and prices in Denmark",
      description:
        "Browse current products and prices from approved Danish partner stores. Search by product, brand or category and check the price at the store.",
    },
    ar: {
      title: "المنتجات والأسعار في الدنمارك",
      description:
        "تصفّح المنتجات والأسعار الحالية من متاجر دنماركية شريكة معتمدة. ابحث حسب المنتج أو العلامة أو الفئة وتحقق من السعر عند المتجر.",
    },
  },
  coupons: {
    da: {
      title: "Rabatkoder og aktuelle tilbud",
      description:
        "Officielle rabatkoder og aktuelle nedsatte produkter fra danske partnerbutikker. Kopier koden og shop direkte hos butikken.",
    },
    en: {
      title: "Coupon codes and current deals in Denmark",
      description:
        "Official coupon codes and discounted products from Danish partner stores. Copy a code and shop directly with the store.",
    },
    ar: {
      title: "أكواد الخصم والعروض الحالية في الدنمارك",
      description:
        "أكواد خصم رسمية ومنتجات مخفّضة من متاجر دنماركية شريكة. انسخ الكود وتسوّق مباشرة من المتجر.",
    },
  },
  guides: {
    da: {
      title: "Guides – sådan vurderer du et tilbud",
      description:
        "Praktiske guides fra TilbudJagt: gennemskue falske tilbud, sammenligne dagligvarepriser, vurdere elektronik og forstå affiliate-links.",
    },
    en: {
      title: "Guides – how to evaluate a deal",
      description:
        "Practical guides from TilbudJagt: spot misleading offers, compare grocery prices, evaluate electronics and understand affiliate links.",
    },
    ar: {
      title: "أدلة – كيف تقيّم العرض قبل الشراء",
      description:
        "أدلة عملية من TilbudJagt: اكتشف العروض المضللة، قارن أسعار البقالة، قيّم الإلكترونيات وافهم روابط التسويق بالعمولة.",
    },
  },
};
