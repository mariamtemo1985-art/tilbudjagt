import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck, Tag } from "lucide-react";
import SiteNav from "@/components/site-nav";
import { getStoreCommission } from "@/lib/store-commissions";
import { getStoreLogo } from "@/lib/store-logos";
import { getStore, isAffiliateLink } from "@/lib/stores";
import GoRedirect from "./go-redirect";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ uid?: string | string[] }>;
};

const SITE = "https://www.tilbudjagt.dk";
const UID_PATTERN = /^[a-zA-Z0-9_-]{1,40}$/;

function campaignFrom(value: string | string[] | undefined): string {
  if (typeof value === "string" && UID_PATTERN.test(value)) return value;
  return "tilbudjagt";
}

/**
 * Only Partner-ads links get uid/uid2. Other networks use their own
 * tracking format and must not receive parameters they do not understand.
 */
function destinationFor(url: string, slug: string, campaign: string): string {
  if (!url.includes("partner-ads.com")) return url;
  try {
    const destination = new URL(url);
    destination.searchParams.set("uid", campaign);
    destination.searchParams.set("uid2", slug);
    return destination.toString();
  } catch {
    return url;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store || !isAffiliateLink(store)) {
    return { title: "Butik ikke fundet", robots: { index: false, follow: false } };
  }

  const url = `${SITE}/go/${store.slug}`;
  const title = `${store.name} – se butikken`;
  const description = store.description.da;
  const image = "/og-image.png";

  return {
    title: { absolute: `${title} | TilbudJagt.dk` },
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "da_DK",
      siteName: "TilbudJagt.dk",
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${store.name} på TilbudJagt.dk`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function GoPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store || !isAffiliateLink(store) || !store.affiliateUrl) notFound();

  const { uid } = await searchParams;
  const campaign = campaignFrom(uid);
  const destination = destinationFor(store.affiliateUrl, store.slug, campaign);
  const logo = getStoreLogo(store.slug);
  const rate = getStoreCommission(store.slug);

  return (
    <main>
      <header className="header wrap">
        <a className="brand" href="/">
          <span className="brand-mark">
            <Tag size={22} />
          </span>
          <span>
            Tilbud<span className="brand-accent">Jagt</span>
            <small>.dk</small>
          </span>
        </a>
        <SiteNav ariaLabel="Hovedmenu">
          <a href="/butikker">Butikker</a>
          <a href="/guides">Guides</a>
          <a href="/rabatkoder">Rabatkoder</a>
          <a href="/about.html">Om os</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">
            Bliv VIP
          </a>
        </div>
      </header>

      <section className="wrap go-page">
        <div className="go-card">
          {logo ? (
            <span className="go-logo">
              {/* Local store logo, kept small so the redirect stays fast. */}
              <img src={logo} alt={`${store.name} logo`} width={96} height={72} />
            </span>
          ) : (
            <span className="go-logo go-logo-fallback">{store.name.slice(0, 1)}</span>
          )}

          <span className="eyebrow">PARTNERLINK</span>
          <h1>Du sendes videre til {store.name}</h1>
          <p className="lead">{store.description.da}</p>
          <p className="go-disclosure">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>
              <strong>Reklamelink:</strong> TilbudJagt kan modtage{" "}
              {rate > 0 ? `${String(rate).replace(".", ",")}%` : "en"} provision, hvis
              du klikker videre og handler hos {store.name}. Din pris ændres ikke.
            </span>
          </p>

          <a
            className="go-button"
            href={destination}
            rel="sponsored noopener noreferrer"
          >
            Fortsæt til {store.name}
            <ArrowRight size={17} aria-hidden="true" />
          </a>

          <GoRedirect href={destination} store={store.slug} campaign={campaign} />
          <a className="go-back" href={`/butikker/${store.slug}`}>
            Læs mere om {store.name} på TilbudJagt
          </a>
        </div>
      </section>

      <footer className="wrap go-footer">
        <span>© {new Date().getFullYear()} TilbudJagt.dk</span>
        <span>
          <a href="/privacy.html">Privatlivspolitik</a>
          <a href="/cookies.html">Cookies</a>
        </span>
      </footer>
    </main>
  );
}
