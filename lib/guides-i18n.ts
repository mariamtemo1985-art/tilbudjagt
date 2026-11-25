import type { Guide } from "@/lib/guides";
import { GUIDES_AR } from "@/lib/guides-ar";
import type { Locale } from "@/lib/i18n";

function translate(value: string, locale: Locale): string {
  if (locale === "ar") return GUIDES_AR[value] || value;
  return value;
}

/** Arabic guide copy is already maintained in lib/guides-ar.ts. English falls back to the Danish source for now. */
export function localizeGuide(guide: Guide, locale: Locale): Guide {
  if (locale === "da") return guide;
  return {
    ...guide,
    kicker: translate(guide.kicker, locale),
    title: translate(guide.title, locale),
    description: translate(guide.description, locale),
    lead: translate(guide.lead, locale),
    sections: guide.sections.map((section) => ({
      heading: translate(section.heading, locale),
      paragraphs: section.paragraphs.map((paragraph) => translate(paragraph, locale)),
    })),
  };
}
