import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./auth.css";
import "./submit.css";
import { Analytics } from "@vercel/analytics/next";
import AppInstallBanner from "@/components/AppInstallBanner";

const SITE = "https://www.tilbudjagt.dk";
const OG_IMAGE = "/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "TilbudJagt.dk – Find de bedste tilbud i Danmark",
    template: "%s | TilbudJagt.dk",
  },
  description:
    "Find, gem og del gode tilbud fra danske butikker. Sammenlign kampagner og opdag nye besparelser på TilbudJagt.dk.",
  applicationName: "TilbudJagt",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "TilbudJagt.dk",
    title: "TilbudJagt.dk – Find de bedste tilbud",
    description: "Opdag og del aktuelle tilbud fra danske butikker.",
    url: SITE,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "TilbudJagt.dk – Find gode tilbud i Danmark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TilbudJagt.dk – Find de bedste tilbud",
    description: "Opdag og del aktuelle tilbud fra danske butikker.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f8f5",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "TilbudJagt.dk",
      description:
        "Find, gem og del gode tilbud fra danske butikker. Sammenlign kampagner og opdag nye besparelser på TilbudJagt.dk.",
      inLanguage: "da-DK",
      publisher: { "@id": `${SITE}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE}/produkter?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "TilbudJagt.dk",
      url: `${SITE}/`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/icon.png`,
      },
      email: "support@tilbudjagt.dk",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
        <AppInstallBanner />
        <Analytics />
      </body>
    </html>
  );
}
