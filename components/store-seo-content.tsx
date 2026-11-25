import type { StoreSeoContent as StoreSeoContentType } from "@/lib/store-seo-content";

type Props = {
  storeName: string;
  slug: string;
  content: StoreSeoContentType;
};

export default function StoreSeoContent({ storeName, slug, content }: Props) {
  const headingId = `store-seo-${slug}`;

  return (
    <section className="store-seo" aria-labelledby={headingId}>
      <div className="store-seo-block">
        <h2 id={headingId}>Om {storeName}</h2>
        <p>{content.intro}</p>
      </div>

      {content.sections.map((section) => (
        <div className="store-seo-block" key={section.heading}>
          <h2>{section.heading}</h2>
          <p>{section.body}</p>
          {section.bullets && section.bullets.length > 0 && (
            <ul className="store-seo-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="store-seo-block">
        <h2>Ofte stillede spørgsmål om {storeName}</h2>
        <div className="store-seo-faq">
          {content.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="store-seo-block">
        <h2>Relaterede sider</h2>
        <div className="store-seo-links">
          {content.related.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
