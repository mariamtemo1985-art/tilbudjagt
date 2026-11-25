"use client";

import { useState } from "react";

const LABELS = {
  da: { copy: "Kopier", copied: "Kopieret", aria: (code: string) => `Kopier rabatkode ${code}` },
  en: { copy: "Copy", copied: "Copied", aria: (code: string) => `Copy coupon code ${code}` },
  ar: { copy: "نسخ", copied: "تم النسخ", aria: (code: string) => `نسخ كود الخصم ${code}` },
} as const;

export default function CopyCode({ code, lang = "da" }: { code: string; lang?: "da" | "en" | "ar" }) {
  const [copied, setCopied] = useState(false);
  const labels = LABELS[lang];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className={`code-copy${copied ? " is-copied" : ""}`}
      onClick={copy}
      aria-label={labels.aria(code)}
    >
      <code>{code}</code>
      <span>{copied ? labels.copied : labels.copy}</span>
    </button>
  );
}
