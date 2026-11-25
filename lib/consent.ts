"use client";

export type ConsentChoice = {
  v: 1;
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

export const CONSENT_KEY = "tilbudjagt_consent";
export const CONSENT_EVENT = "tilbudjagt:consentchange";
export const OPEN_CONSENT_EVENT = "tilbudjagt:openconsent";

function isValid(value: unknown): value is ConsentChoice {
  if (!value || typeof value !== "object") return false;
  const c = value as Partial<ConsentChoice>;
  return (
    c.v === 1 &&
    typeof c.analytics === "boolean" &&
    typeof c.marketing === "boolean"
  );
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, marketing: boolean): ConsentChoice {
  const choice: ConsentChoice = {
    v: 1,
    analytics,
    marketing,
    ts: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    const value = `a${analytics ? 1 : 0}m${marketing ? 1 : 0}`;
    document.cookie = `tj_consent=${value}; Max-Age=31536000; Path=/; SameSite=Lax`;
  } catch {
    /* storage can be unavailable in private mode; the session still works */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
  return choice;
}

export function hasAnalyticsConsent(): boolean {
  return readConsent()?.analytics === true;
}

export function hasMarketingConsent(): boolean {
  return readConsent()?.marketing === true;
}
