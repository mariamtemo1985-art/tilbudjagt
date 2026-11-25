"use client";

import { useEffect } from "react";

export default function LocaleDocument({ locale }: { locale: "en" | "ar" }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("translate", "no");
    document.documentElement.classList.add("notranslate");
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  return null;
}
