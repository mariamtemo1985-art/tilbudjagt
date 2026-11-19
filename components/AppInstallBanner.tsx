"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "tj_app_banner_dismissed_until";
const DISMISS_DAYS = 14;
const SHOW_DELAY_MS = 4000;

type Lang = "da" | "en" | "ar";

const COPY: Record<Lang, { title: string; body: string; install: string; later: string; soon: string }> = {
  da: {
    title: "Hent TilbudJagt-appen",
    body: "Få tilbud og besparelser direkte på telefonen.",
    install: "Installer",
    later: "Senere",
    soon: "Appen kommer snart",
  },
  en: {
    title: "Get the TilbudJagt app",
    body: "Deals and savings right on your phone.",
    install: "Install",
    later: "Later",
    soon: "App coming soon",
  },
  ar: {
    title: "حمّلي تطبيق TilbudJagt",
    body: "العروض والوفورات مباشرة على هاتفك.",
    install: "تثبيت",
    later: "لاحقًا",
    soon: "التطبيق قريبًا",
  },
};

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "da";
  const value = (navigator.language || "da").toLowerCase();
  if (value.startsWith("ar")) return "ar";
  if (value.startsWith("en")) return "en";
  return "da";
}

export default function AppInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<Lang>("da");

  const androidUrl = process.env.NEXT_PUBLIC_APP_ANDROID_URL;
  const iosUrl = process.env.NEXT_PUBLIC_APP_IOS_URL;
  const hasStoreLink = Boolean(androidUrl || iosUrl);

  useEffect(() => {
    try {
      const until = Number(window.localStorage.getItem(STORAGE_KEY) || 0);
      if (until > Date.now()) return;
    } catch {
      // localStorage may be blocked; still show the banner once per visit.
    }
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("tilbudjagt_lang");
    } catch {
      // ignore storage restrictions
    }
    setLang(saved === "da" || saved === "en" || saved === "ar" ? saved : detectLang());
    const timer = window.setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now() + DISMISS_DAYS * 86400000));
    } catch {
      // ignore
    }
  }

  function openStore() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const url = isIOS ? iosUrl || androidUrl : androidUrl || iosUrl;
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    dismiss();
  }

  if (!visible) return null;
  const text = COPY[lang];
  const rtl = lang === "ar";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={text.title}
      dir={rtl ? "rtl" : "ltr"}
      className="tj-app-banner"
    >
      <button type="button" className="tj-app-banner__close" aria-label="Luk" onClick={dismiss}>
        ×
      </button>
      <div className="tj-app-banner__icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="7" y="2.5" width="10" height="19" rx="2.4" />
          <path d="M11 18.6h2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="tj-app-banner__content">
        <strong>{hasStoreLink ? text.title : text.soon}</strong>
        <p>{text.body}</p>
      </div>
      <div className="tj-app-banner__actions">
        {hasStoreLink ? (
          <button type="button" className="tj-app-banner__primary" onClick={openStore}>
            {text.install}
          </button>
        ) : null}
        <button type="button" className="tj-app-banner__secondary" onClick={dismiss}>
          {text.later}
        </button>
      </div>
    </div>
  );
}
