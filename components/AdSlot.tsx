"use client";

import { useEffect, useRef, useState } from "react";
import { CONSENT_EVENT, hasMarketingConsent } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  /** AdSense ad unit ID. Leave empty until the unit exists in AdSense. */
  slot?: string;
  /** AdSense format, for example "auto" or "fluid". */
  format?: string;
  className?: string;
  label?: string;
};

/**
 * Display-ad slot for the website.
 *
 * Safety rules:
 * - Nothing is rendered or loaded unless a client ID, a real ad-unit ID and
 *   NEXT_PUBLIC_ADSENSE_CMP_READY=true are all present.
 * - The CMP flag means a Google-certified consent solution is configured in
 *   AdSense. Do not set it before that is true.
 * - The slot is always labelled "Annonce" and must not be styled as a store
 *   link, navigation button or editorial recommendation.
 */
export default function AdSlot({
  slot,
  format = "auto",
  className = "",
  label = "Annonce",
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const cmpReady = process.env.NEXT_PUBLIC_ADSENSE_CMP_READY === "true";
  const [consented, setConsented] = useState(false);
  useEffect(() => {
    const sync = () => setConsented(hasMarketingConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);
  const enabled = Boolean(client && slot && cmpReady && consented);

  useEffect(() => {
    if (!enabled || !client || !adRef.current) return;

    const pushAd = () => {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch {
        // AdSense can reject an individual request; the page must stay usable.
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-tj-adsense="1"]',
    );

    if (existing?.dataset.loaded === "1") {
      pushAd();
      return;
    }

    if (existing) {
      existing.addEventListener("load", pushAd, { once: true });
      return () => existing.removeEventListener("load", pushAd);
    }

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.tjAdsense = "1";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "1";
        pushAd();
      },
      { once: true },
    );
    document.head.appendChild(script);
  }, [client, enabled]);

  if (!enabled) return null;

  return (
    <aside className={`tj-ad ${className}`.trim()} aria-label={label}>
      <span className="tj-ad__label">{label}</span>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
