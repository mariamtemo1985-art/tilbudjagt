"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type Props = {
  href: string;
  store: string;
  campaign: string;
};

export default function GoRedirect({ href, store, campaign }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      // GA4 is consent-gated; the event is simply skipped if gtag is absent.
      window.gtag?.("event", "affiliate_redirect", {
        store_slug: store,
        campaign,
      });
      window.location.replace(href);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [href, store, campaign]);

  return (
    <p className="go-wait" role="status">
      Du bliver automatisk sendt videre om et øjeblik …
    </p>
  );
}
