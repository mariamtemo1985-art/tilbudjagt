"use client";

import { useEffect, useState } from "react";
import { readConsent, saveConsent } from "@/lib/consent";

type Lang = "da" | "en" | "ar";

const COPY: Record<
  Lang,
  {
    title: string;
    body: string;
    allow: string;
    cancel: string;
    more: string;
  }
> = {
  da: {
    title: "Reklamelink til en partnerbutik",
    body: "Når du fortsætter, kan butikken eller partner-netværket sætte en cookie for at registrere et eventuelt køb. Vi modtager muligvis en provision, og det koster ikke ekstra for dig.",
    allow: "Tillad og fortsæt",
    cancel: "Annuller",
    more: "Læs om cookies",
  },
  en: {
    title: "Advertising link to a partner store",
    body: "If you continue, the store or its partner network may set a cookie to register a possible purchase. We may receive a commission, at no extra cost to you.",
    allow: "Allow and continue",
    cancel: "Cancel",
    more: "About cookies",
  },
  ar: {
    title: "رابط إعلاني إلى متجر شريك",
    body: "إذا تابعت، قد يضع المتجر أو شبكة الشركاء ملف تعريف ارتباط لتسجيل أي عملية شراء. قد نحصل على عمولة دون أي تكلفة إضافية عليك.",
    allow: "السماح والمتابعة",
    cancel: "إلغاء",
    more: "سياسة الكوكيز",
  },
};

const AFFILIATE_HOSTS = [
  "partner-ads.com",
  "awin1.com",
  "adtraction.com",
  "go.adt",
  "csmegastore.dk",
  "ihero.dk",
];

function isAffiliate(anchor: HTMLAnchorElement): boolean {
  const rel = anchor.getAttribute("rel") || "";
  if (/(^|\s)sponsored(\s|$)/.test(rel)) return true;
  try {
    const host = new URL(anchor.href, window.location.href).hostname;
    return AFFILIATE_HOSTS.some((item) => host === item || host.endsWith(`.${item}`));
  } catch {
    return false;
  }
}

function readLang(): Lang {
  try {
    const stored = window.localStorage.getItem("tilbudjagt_lang");
    if (stored === "ar" || stored === "en" || stored === "da") return stored;
  } catch {
    /* ignore */
  }
  return "da";
}

export default function AffiliateLinkGuard() {
  const [pending, setPending] = useState<HTMLAnchorElement | null>(null);
  const [lang, setLang] = useState<Lang>("da");

  useEffect(() => {
    const syncLang = () => setLang(readLang());
    syncLang();
    window.addEventListener("tilbudjagt:langchange", syncLang);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href || !isAffiliate(anchor)) return;
      if (readConsent()?.marketing) return;
      event.preventDefault();
      setPending(anchor);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("tilbudjagt:langchange", syncLang);
    };
  }, []);

  if (!pending) return null;
  const t = COPY[lang];

  const allow = () => {
    const current = readConsent();
    saveConsent(current?.analytics ?? false, true);
    const url = pending.href;
    const newTab = pending.target === "_blank";
    setPending(null);
    if (newTab) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.assign(url);
    }
  };

  return (
    <div className="tj-affiliate-overlay" role="presentation" onClick={() => setPending(null)}>
      <section
        className="tj-affiliate"
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        onClick={(event) => event.stopPropagation()}
      >
        <h2>{t.title}</h2>
        <p>{t.body}</p>
        <a href="/cookies.html" className="tj-affiliate-more">{t.more}</a>
        <div className="tj-affiliate-actions">
          <button type="button" className="tj-consent-btn tj-consent-btn-primary" onClick={allow}>
            {t.allow}
          </button>
          <button type="button" className="tj-consent-btn" onClick={() => setPending(null)}>
            {t.cancel}
          </button>
        </div>
      </section>
    </div>
  );
}
