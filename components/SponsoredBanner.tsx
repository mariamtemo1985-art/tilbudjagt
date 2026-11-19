import { ArrowRight, Megaphone } from "lucide-react";

type SponsoredBannerProps = {
  className?: string;
};

/**
 * Direct sponsor placement. It renders only when all three public variables
 * are configured. It does not set cookies or load third-party tracking.
 *
 * A paid placement must be clearly labelled "Sponsoreret" and must not be
 * presented as an editorial recommendation or a normal store listing.
 */
export default function SponsoredBanner({ className = "" }: SponsoredBannerProps) {
  const name = process.env.NEXT_PUBLIC_SPONSOR_NAME?.trim();
  const url = process.env.NEXT_PUBLIC_SPONSOR_URL?.trim();
  const text = process.env.NEXT_PUBLIC_SPONSOR_TEXT?.trim();

  if (!name || !url || !text) return null;

  return (
    <aside className={`wrap tj-sponsored ${className}`.trim()} aria-label="Sponsoreret indhold">
      <div className="tj-sponsored__label">
        <Megaphone size={13} /> Sponsoreret
      </div>
      <div className="tj-sponsored__copy">
        <strong>{name}</strong>
        <p>{text}</p>
      </div>
      <a
        className="tj-sponsored__cta"
        href={url}
        target="_blank"
        rel="sponsored noopener noreferrer"
      >
        Besøg {name} <ArrowRight size={15} />
      </a>
    </aside>
  );
}
