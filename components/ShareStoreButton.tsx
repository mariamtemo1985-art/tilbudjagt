"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

type ShareStoreButtonProps = {
  name: string;
  url: string;
  label?: string;
  text?: string;
  ariaLabel?: string;
};

export default function ShareStoreButton({
  name,
  url,
  label = "Del butik",
  text,
  ariaLabel,
}: ShareStoreButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: `${name} – TilbudJagt.dk`,
      text: text ?? `Se ${name} på TilbudJagt.dk`,
      url,
    };

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Kopiér linket:", url);
    }
  }

  return (
    <button
      type="button"
      className={copied ? "share-store copied" : "share-store"}
      onClick={handleShare}
      aria-label={ariaLabel ?? `Del ${name}`}
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      <span>{copied ? "Link kopieret" : label}</span>
    </button>
  );
}
