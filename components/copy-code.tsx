"use client";

import { useState } from "react";

export default function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

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
      aria-label={`Kopier rabatkode ${code}`}
    >
      <code>{code}</code>
      <span>{copied ? "Kopieret" : "Kopier"}</span>
    </button>
  );
}
