"use client";

import { useEffect, useState } from "react";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  saveConsent,
  type ConsentChoice,
} from "@/lib/consent";

type Lang = "da" | "en" | "ar";

const COPY: Record<
  Lang,
  {
    title: string;
    body: string;
    accept: string;
    necessary: string;
    customize: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
    necessaryTitle: string;
    necessaryDesc: string;
    save: string;
    more: string;
    settings: string;
  }
> = {
  da: {
    title: "Vi bruger cookies",
    body: "Nødvendige cookies får siden til at virke. Med din tilladelse bruger vi også statistik og markedsføring, så vi kan forbedre TilbudJagt og måle vores partnerlinks.",
    accept: "Acceptér alle",
    necessary: "Kun nødvendige",
    customize: "Tilpas",
    analytics: "Statistik",
    analyticsDesc: "Google Analytics og Microsoft Clarity hjælper os med at forstå, hvordan siden bruges.",
    marketing: "Markedsføring",
    marketingDesc: "Gør det muligt at måle partnerlinks og vise relevante annoncer.",
    necessaryTitle: "Nødvendige",
    necessaryDesc: "Kræves for at siden og dine valg fungerer. Kan ikke slås fra.",
    save: "Gem valg",
    more: "Cookiepolitik",
    settings: "Cookieindstillinger",
  },
  en: {
    title: "We use cookies",
    body: "Necessary cookies keep the site working. With your permission we also use analytics and marketing cookies to improve TilbudJagt and measure our partner links.",
    accept: "Accept all",
    necessary: "Necessary only",
    customize: "Customise",
    analytics: "Analytics",
    analyticsDesc: "Google Analytics and Microsoft Clarity help us understand how the site is used.",
    marketing: "Marketing",
    marketingDesc: "Lets us measure partner links and show relevant ads.",
    necessaryTitle: "Necessary",
    necessaryDesc: "Required for the site and your choices to work. Always on.",
    save: "Save choices",
    more: "Cookie policy",
    settings: "Cookie settings",
  },
  ar: {
    title: "نستخدم ملفات تعريف الارتباط",
    body: "الملفات الضرورية تُبقي الموقع يعمل. بموافقتك نستخدم أيضًا ملفات الإحصاء والتسويق لتحسين TilbudJagt وقياس روابط الشركاء.",
    accept: "قبول الكل",
    necessary: "الضروري فقط",
    customize: "تخصيص",
    analytics: "الإحصاء",
    analyticsDesc: "يساعدنا Google Analytics وMicrosoft Clarity على فهم طريقة استخدام الموقع.",
    marketing: "التسويق",
    marketingDesc: "يسمح بقياس روابط الشركاء وعرض إعلانات مناسبة.",
    necessaryTitle: "ضروري",
    necessaryDesc: "مطلوب لعمل الموقع وحفظ اختياراتك، ولا يمكن تعطيله.",
    save: "حفظ الاختيار",
    more: "سياسة الكوكيز",
    settings: "إعدادات الكوكيز",
  },
};

function readLang(): Lang {
  try {
    const stored = window.localStorage.getItem("tilbudjagt_lang");
    if (stored === "ar" || stored === "en" || stored === "da") return stored;
  } catch {
    /* ignore */
  }
  return "da";
}

export default function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [lang, setLang] = useState<Lang>("da");

  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    if (stored) setOpen(false);
    setReady(true);
    if (stored) {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    }
    const syncLang = () => setLang(readLang());
    syncLang();
    const openSettings = () => {
      const current = readConsent();
      setChoice(current);
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setExpanded(true);
      setOpen(true);
    };
    window.addEventListener("tilbudjagt:langchange", syncLang);
    window.addEventListener("storage", syncLang);
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings);
    return () => {
      window.removeEventListener("tilbudjagt:langchange", syncLang);
      window.removeEventListener("storage", syncLang);
      window.removeEventListener(OPEN_CONSENT_EVENT, openSettings);
    };
  }, []);

  if (!ready) return null;

  const t = COPY[lang];
  const decide = (a: boolean, m: boolean) => {
    const saved = saveConsent(a, m);
    setChoice(saved);
    setAnalytics(a);
    setMarketing(m);
    setOpen(false);
    setExpanded(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        className="tj-consent-fab"
        aria-label={t.settings}
        title={t.settings}
        onClick={() => setOpen(true)}
      >
        <span aria-hidden="true">🍪</span>
      </button>
    );
  }

  return (
    <section
      className="tj-consent"
      role="dialog"
      aria-modal="false"
      aria-label={t.title}
    >
      <h2 className="tj-consent-title">{t.title}</h2>
      <p className="tj-consent-body">
        {t.body}{" "}
        <a href="/cookies.html" className="tj-consent-link">
          {t.more}
        </a>
      </p>

      {expanded && (
        <div className="tj-consent-options">
          <div className="tj-consent-row">
            <div>
              <strong>{t.necessaryTitle}</strong>
              <p>{t.necessaryDesc}</p>
            </div>
            <input type="checkbox" checked disabled aria-label={t.necessaryTitle} />
          </div>
          <div className="tj-consent-row">
            <div>
              <strong>{t.analytics}</strong>
              <p>{t.analyticsDesc}</p>
            </div>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              aria-label={t.analytics}
            />
          </div>
          <div className="tj-consent-row">
            <div>
              <strong>{t.marketing}</strong>
              <p>{t.marketingDesc}</p>
            </div>
            <input
              type="checkbox"
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
              aria-label={t.marketing}
            />
          </div>
        </div>
      )}

      <div className="tj-consent-actions">
        {expanded ? (
          <button
            type="button"
            className="tj-consent-btn tj-consent-btn-primary"
            onClick={() => decide(analytics, marketing)}
          >
            {t.save}
          </button>
        ) : (
          <>
            <button
              type="button"
              className="tj-consent-btn tj-consent-btn-primary"
              onClick={() => decide(true, true)}
            >
              {t.accept}
            </button>
            <button
              type="button"
              className="tj-consent-btn"
              onClick={() => decide(false, false)}
            >
              {t.necessary}
            </button>
            <button
              type="button"
              className="tj-consent-btn tj-consent-btn-ghost"
              onClick={() => setExpanded(true)}
            >
              {t.customize}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
