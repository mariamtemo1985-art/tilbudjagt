"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function loadGa(id: string) {
  if (document.querySelector('script[data-tj-ga="1"]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.dataset.tjGa = "1";
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // Google's own snippet pushes the arguments object on purpose.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
}

function loadClarity(id: string) {
  if (document.querySelector('script[data-tj-clarity="1"]')) return;
  const script = document.createElement("script");
  script.async = true;
  script.dataset.tjClarity = "1";
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  document.head.appendChild(script);
}

function applyConsent(analytics: boolean, marketing: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });
  if (analytics) {
    if (GA_ID) loadGa(GA_ID);
    if (CLARITY_ID) loadClarity(CLARITY_ID);
  }
}

export default function AnalyticsScripts() {
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    const sync = () => {
      const choice = readConsent();
      if (choice) applyConsent(choice.analytics, choice.marketing);
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (!GA_ID || !window.gtag || !document.querySelector('script[data-tj-ga="1"]')) return;
    window.gtag("event", "page_view", {
      page_path: `${pathname}${window.location.search}`,
      page_location: window.location.href,
    });
  }, [pathname]);

  return null;
}
