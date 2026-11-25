"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/consent";

export default function CookieSettingsLink({
  label = "Cookieindstillinger",
}: {
  label?: string;
}) {
  return (
    <button
      type="button"
      className="footer-cookie-btn"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {label}
    </button>
  );
}
