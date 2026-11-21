import type { Metadata } from "next";
import SiteNav from "@/components/site-nav";
import {
  ArrowRight,
  BarChart3,
  Mail,
  Megaphone,
  MousePointerClick,
  ShieldCheck,
  Store,
  Tag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Annoncering og sponsorsamarbejde",
  description:
    "Få synlighed hos TilbudJagts besøgende gennem tydeligt mærkede sponsorplaceringer, displayannoncer eller et performancebaseret samarbejde.",
  alternates: { canonical: "https://www.tilbudjagt.dk/annoncering" },
};

export default function AdvertisePage() {
  const contactHref =
    "mailto:support@tilbudjagt.dk?subject=Annoncering%20p%C3%A5%20TilbudJagt";

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
          <a href="/produkter">Produkter</a>
          <a href="/butikker">Butikker</a>
          <a href="/guides">Guides</a>
          <a href="/annoncering" aria-current="page">Annoncering</a>
        </SiteNav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">Bliv VIP</a>
        </div>
      </header>

      <section className="wrap advertise-hero">
        <span className="eyebrow"><Megaphone size={15} /> FOR BUTIKKER OG BRANDS</span>
        <h1>Synlighed hos forbrugere, der leder efter et godt tilbud.</h1>
        <p className="lead">
          TilbudJagt samler butikker, produkter og forbrugerGuides på ét sted. Vi tilbyder
          enkle og tydeligt mærkede samarbejder – uden popups, skjulte annoncer eller
          placeringer, der ligner vores eget indhold.
        </p>
        <div className="advertise-actions">
          <a className="partner-cta" href={contactHref}>
            Kontakt om annoncering <ArrowRight size={16} />
          </a>
          <a className="text-link" href="/contact.html">
            Se kontaktoplysninger
          </a>
        </div>
      </section>

      <section className="wrap advertise-grid" aria-label="Annonceformater">
        <article className="advertise-card">
          <span className="advertise-icon"><Store size={19} /></span>
          <h2>Sponsoreret butik</h2>
          <p>
            Få en tydelig plads i den relevante kategori eller blandt udvalgte butikker.
            Placeringen mærkes altid <strong>“Sponsoreret”</strong>, så besøgende kan se
            forskellen mellem betalt synlighed og vores øvrige butiksoversigt.
          </p>
          <ul>
            <li>Relevant kategori eller forsideplacering</li>
            <li>Fast periode efter aftale</li>
            <li>Ingen skjulte rangordninger</li>
          </ul>
        </article>

        <article className="advertise-card">
          <span className="advertise-icon"><BarChart3 size={19} /></span>
          <h2>Display og banner</h2>
          <p>
            Diskrete annoncefelter på udvalgte sider, hvor de ikke dækker indhold eller
            forveksles med navigation. Vi bruger kun annoncenetværk og samtykkeløsninger,
            der lever op til de gældende krav.
          </p>
          <ul>
            <li>Mærket “Annonce”</li>
            <li>Ingen popups eller overlay</li>
            <li>Aktiveres først efter godkendt samtykkeopsætning</li>
          </ul>
        </article>

        <article className="advertise-card">
          <span className="advertise-icon"><Mail size={19} /></span>
          <h2>Nyhedsbrev og performance</h2>
          <p>
            Vi kan også drøfte en relevant sponsorplads i vores e-mailliste eller et
            performancebaseret samarbejde via et godkendt affiliate-netværk. Indhold og
            vilkår aftales konkret, før noget publiceres.
          </p>
          <ul>
            <li>Kun relevante tilbud til modtagerne</li>
            <li>Affiliate/CPC efter aftale</li>
            <li>Ingen køb af personoplysninger</li>
          </ul>
        </article>
      </section>

      <section className="wrap advertise-note">
        <p>
          <strong>Klare regler for alle samarbejder:</strong> Betalte placeringer mærkes
          “Sponsoreret” eller “Reklame”. De blandes ikke med redaktionelle guides, og de
          ændrer ikke vores omtale af en butik. Vi tager ikke imod skjulte annoncer,
          vildledende knapper, popups eller annoncer, der ser ud som en del af vores menu.
          Alle priser og vilkår aftales skriftligt, og annoncøren er selv ansvarlig for
          indholdet i annoncen.
        </p>
        <p>
          <strong>Performance:</strong> Et affiliate- eller CPC-samarbejde giver først
          betaling ved en kvalificeret handling efter aftale – ikke ved blot at vise siden.
          Vi oplyser aktuelle trafiktal og muligheder i dialogen, så I kan vurdere
          samarbejdet på et realistisk grundlag.
        </p>
      </section>

      <section className="wrap section" aria-labelledby="advertise-why">
        <div className="section-title">
          <div>
            <span className="eyebrow muted">HVORFOR TILBUDJAGT</span>
            <h2 id="advertise-why">En enkel ramme for et seriøst samarbejde</h2>
          </div>
          <ShieldCheck size={25} />
        </div>
        <div className="feature-row">
          <div className="feature-card">
            <MousePointerClick />
            <div>
              <h3>Tydelig brugerrejse</h3>
              <p>Besøgende kan se, hvornår de forlader TilbudJagt, og hvornår et link er betalt.</p>
            </div>
          </div>
          <div className="feature-card">
            <ShieldCheck />
            <div>
              <h3>Ingen skjulte aftaler</h3>
              <p>Alle betalte placeringer er mærket, og vi lover ikke bestemte salgstal.</p>
            </div>
          </div>
          <div className="feature-card">
            <Mail />
            <div>
              <h3>Direkte kontakt</h3>
              <p>Skriv til support@tilbudjagt.dk, så vender vi tilbage med næste skridt.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>Annoncering og sponsorering mærkes altid tydeligt. Kontakt support@tilbudjagt.dk.</p>
          <nav aria-label="Footer links">
            <a href="/butikker">Butikker</a> · <a href="/annoncering">Annoncering</a> ·{" "}
            <a href="/privacy.html">Privatliv</a> · <a href="/cookies.html">Cookies</a> ·{" "}
            <a href="/contact.html">Kontakt</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
