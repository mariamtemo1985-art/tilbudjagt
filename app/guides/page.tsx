import type { Metadata } from "next";
import { ArrowRight, BookOpen, ShieldCheck, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Guides – sådan vurderer du et tilbud",
  description:
    "Tre praktiske guides fra TilbudJagt: gennemskue falske tilbud, vurdere elektroniktilbud og planlægge ugens indkøb uden at betale for meget.",
  alternates: { canonical: "https://tilbudjagt.dk/guides" },
};

const GUIDES = [
  {
    id: "gennemskue-tilbud",
    kicker: "Forbrug",
    title: "Sådan gennemskuer du et godt tilbud",
    lead:
      "Et nedsat prisskilt er ikke automatisk en besparelse. Fire spørgsmål afslører, om tilbuddet er reelt.",
    points: [
      "Sammenlign med den pris, du selv har set inden for de sidste 30 dage – ikke kun med butikkens \"førpris\".",
      "Se på enhedsprisen (kr. pr. kg, liter eller stk.), når pakkerne har forskellig størrelse.",
      "Tjek om varen er på lager i din butik, og om tilbuddet kræver medlemskab eller kupon.",
      "Læs vilkårene for returnering og garanti, især ved onlinekøb.",
    ],
    tip:
      "Butikker må ikke vildlede med fiktive førpriser. Hvis \"førprisen\" aldrig har været brugt, er det et advarselstegn.",
  },
  {
    id: "elektronik",
    kicker: "Elektronik",
    title: "Elektronik: hvornår er tilbuddet reelt?",
    lead:
      "Elektronik har store prisforskelle og hyppige kampagner. Sådan undgår du at købe en ældre model til ny pris.",
    points: [
      "Skriv modelnummeret ned og søg på det – samme navn kan dække flere årgange.",
      "Sammenlign prisen hos mindst to forhandlere, og husk levering og fragt.",
      "Kig efter energi- og støjmærkning på hvidevarer; det påvirker driftsomkostningerne.",
      "Tjek om der følger dansk garanti og reklamationsret med, når du køber hos en udenlandsk butik.",
    ],
    tip:
      "Black Friday-priser er ofte lavest på ældre modeller. Er en ny model lige lanceret, er rabatten sjældent stor.",
  },
  {
    id: "dagligvarer",
    kicker: "Dagligvarer",
    title: "Planlæg ugens indkøb uden at betale for meget",
    lead:
      "Dagligvarer udgør den største del af de fleste husholdningers tilbudsjagt. Planlægning slår impulskøb.",
    points: [
      "Lav en madplan ud fra det, du allerede har i køleskabet.",
      "Køb kun tilbudsvarer, hvis du ved, at de bliver brugt inden for holdbarheden.",
      "Sammenlign kiloprisen på frugt, kød og ost – pakningsstørrelsen snyder ofte.",
      "Handl ind én gang om ugen med en fast liste i stedet for flere små ture.",
    ],
    tip:
      "Tilbud på færdigretter og snacks er sjældent en besparelse i længden. Basismadvarer giver mest for pengene.",
  },
];

export default function GuidesPage() {
  return (
    <main>
      <header className="header wrap">
        <a className="brand" href="/">
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <nav className="nav nav-open" aria-label="Hovedmenu">
          <a href="/butikker">Butikker</a>
          <a href="/guides">Guides</a>
          <a href="/contact.html">Kontakt</a>
        </nav>
        <div className="header-actions">
          <a className="vip-btn" href="/#vip">Bliv VIP</a>
        </div>
      </header>

      <section className="wrap guides-hero">
        <span className="eyebrow muted"><BookOpen size={14} /> GUIDES</span>
        <h1>Bliv klogere på tilbud</h1>
        <p>
          Vi viser først priser, når de kommer fra butikken selv. Indtil da kan du
          bruge vores guides til at vurdere, om et tilbud er værd at tage.
        </p>
      </section>

      <section className="wrap guides-list">
        {GUIDES.map((guide) => (
          <article className="guide-card" id={guide.id} key={guide.id}>
            <span className="eyebrow">{guide.kicker}</span>
            <h2>{guide.title}</h2>
            <p className="guide-lead">{guide.lead}</p>
            <ul>
              {guide.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <p className="guide-tip"><ShieldCheck size={15} /> {guide.tip}</p>
          </article>
        ))}
      </section>

      <section className="wrap guides-cta">
        <div>
          <h2>Find butikkerne bag tilbuddene</h2>
          <p>Søg på navn eller kategori og se, hvilke butikker der er godkendte partnere.</p>
        </div>
        <a className="partner-cta" href="/butikker">Se butikker <ArrowRight size={16} /></a>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark"><Tag size={20} /></span>
            <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
          </a>
          <p>Guiderne er generel forbrugerinformation, ikke personlig rådgivning.</p>
          <nav aria-label="Footer links">
            <a href="/butikker">Butikker</a> · <a href="/about.html">Om os</a> ·{" "}
            <a href="/contact.html">Kontakt</a> · <a href="/privacy.html">Privatlivspolitik</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
