import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./auth.css";
import "./submit.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tilbudjagt.dk"),
  title: {
    default: "TilbudJagt.dk – Find de bedste tilbud i Danmark",
    template: "%s | TilbudJagt.dk",
  },
  description:
    "Find, gem og del gode tilbud fra danske butikker. Sammenlign kampagner og opdag nye besparelser på TilbudJagt.dk.",
  applicationName: "TilbudJagt",
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName: "TilbudJagt.dk",
    title: "TilbudJagt.dk – Find de bedste tilbud",
    description: "Opdag og del aktuelle tilbud fra danske butikker.",
    url: "https://tilbudjagt.dk",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f8f5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
