import type { Metadata } from "next";
import { Tag } from "lucide-react";
import SiteNav from "@/components/site-nav";
import CookieSettingsLink from "@/components/cookie-settings-link";
import { getStoreCommission } from "@/lib/store-commissions";
import {
  STORES,
  getStoreCategoryLabel,
  isAffiliateLink,
  type Store,
} from "@/lib/stores";

export const metadata: Metadata = {
  title: "Partnere og linkstatus – alle butikker",
  description:
    "Samlet overblik over alle butikker på TilbudJagt.dk: godkendte partnere, provisionssatser og direkte links uden provision.",
  alternates: { canonical: "https://www.tilbudjagt.dk/partnere" },
};

function commissionText(store: Store) {
  const rate = getStoreCommission(store.slug);
  if (!isAffiliateLink(store)) return "0% – ingen provision";
  return rate > 0
    ? `${String(rate).replace(".", ",")}% af købet`
    : "Ikke verificeret";
}

function PartnerTable({
  stores,
  direct = false,
}: {
  stores: Store[];
  direct?: boolean;
}) {
  return (
    <div className="partner-status-table-wrap">
      <table className="partners-table">
        <caption>
          {direct
            ? `Direkte links uden provision (${stores.length})`
            : `Godkendte partnere (${stores.length})`}
        </caption>
        <thead>
          <tr>
            <th scope="col">Butik</th>
            <th scope="col">Kategori</th>
            <th scope="col">Provision</th>
            <th scope="col">Linktype</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.slug}>
              <td>
                <a href={`/butikker/${store.slug}`}>{store.name}</a>
              </td>
              <td>{getStoreCategoryLabel(store, "da")}</td>
              <td>{commissionText(store)}</td>
              <td>{direct ? "Direkte link" : "Partnerlink"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PartnersPage() {
  const partners = STORES.filter(isAffiliateLink).sort(
    (a, b) =>
      getStoreCommission(b.slug) - getStoreCommission(a.slug) ||
      a.name.localeCompare(b.name, "da"),
  );
  const direct = STORES.filter((store) => !isAffiliateLink(store)).sort((a, b) =>
    a.name.localeCompare(b.name, "da"),
  );

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
          <a href="/butikker" aria-current="page">
            Butikker
          </a>
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

      <section className="wrap partners-hero">
        <span className="eyebrow">GENNEMSIGTIGHED</span>
        <h1>Partnere og linkstatus</h1>
        <p className="lead">
          Her får du et samlet overblik over alle butikker på TilbudJagt.dk. Tabellen
          viser, om vi har en godkendt partneraftale, den senest kontrollerede
          provisionssats, og om linket er et partnerlink eller et direkte link uden
          provision.
        </p>
        <p className="partners-note">
          <strong>Vigtigt:</strong> En provision betyder ikke, at en butik er bedre end
          de øvrige. Satsen er den senest kontrollerede sats og kan ændre sig. Den
          endelige pris, levering og returvilkår findes altid hos butikken.
        </p>
      </section>

      <section className="wrap partners-section" aria-labelledby="partnere-heading">
        <h2 id="partnere-heading">Godkendte partnere</h2>
        <p>
          Butikker med en godkendt partneraftale. Nogle satser er ikke offentliggjort
          eller ikke verificeret endnu; det står som “Ikke verificeret”.
        </p>
        <PartnerTable stores={partners} />
      </section>

      <section className="wrap partners-section" aria-labelledby="direkte-heading">
        <h2 id="direkte-heading">Direkte links uden provision</h2>
        <p>
          Butikker uden en godkendt partneraftale. Linket går direkte til butikkens
          egen hjemmeside, og TilbudJagt modtager ingen provision.
        </p>
        <PartnerTable stores={direct} direct />
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark">
              <Tag size={20} />
            </span>
            <span>
              Tilbud<span className="brand-accent">Jagt</span>
              <small>.dk</small>
            </span>
          </a>
          <p>
            Vi viser kun priser og tilbud, når de kommer fra butikken selv. Kontroller
            altid pris og vilkår hos butikken.
          </p>
          <nav aria-label="Footer links">
            <a href="/butikker">Butikker</a> · <a href="/annoncering">Annoncering</a>{" "}
            · <a href="/about.html">Om os</a> · <a href="/privacy.html">Privatliv</a>{" "}
            · <CookieSettingsLink />
          </nav>
        </div>
      </footer>
    </main>
  );
}
