import { PRODUCTS, type Product } from "@/lib/products";

export type DealCategory = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  lead: string;
  intro: string[];
  tips: { title: string; body: string }[];
  faq: { question: string; answer: string }[];
  productCategories: string[];
  excludePattern?: RegExp;
  related: { label: string; href: string }[];
};

export const DEAL_CATEGORIES: DealCategory[] = [
  {
    slug: "mobiltelefoner",
    h1: "Mobiltelefoner",
    title: "Mobiltelefoner – aktuelle priser | TilbudJagt.dk",
    description:
      "Sammenlign mobiltelefoner fra godkendte partnerbutikker. Se aktuelle priser på Samsung, OnePlus, realme og andre modeller hos TilbudJagt.dk.",
    lead:
      "Sammenlign aktuelle priser på mobiltelefoner fra godkendte partnerbutikker. Vi viser kun varer, hvor vi har en aftale og et fungerende link til butikken.",
    intro: [
      "Mobiltelefoner udvikler sig hurtigt, og priserne kan variere meget mellem butikker, modeller og lagerstatus. På denne side samler vi de mobiltelefoner, som vi har produktdata på fra vores godkendte partnere, så du kan sammenligne udgangspunktet uden at åbne flere butikker på én gang.",
      "I det aktuelle datasæt findes blandt andet modeller fra Samsung, OnePlus og realme. Udvalget afhænger af butikkernes lager og opdateres sammen med vores produktfeed. Prisen, farven og lagerstatus skal altid bekræftes på butikkens egen produktside, før du køber.",
    ],
    tips: [
      {
        title: "Sammenlign mere end prisen",
        body:
          "Se på lagerstatus, garanti, leveringstid og om der følger oplader eller cover med. En lidt højere pris kan være den bedre handel, hvis butikken har bedre vilkår.",
      },
      {
        title: "Tjek modelnummeret",
        body:
          "Samme telefon kan findes i flere versioner med forskellig lagerplads, RAM og farve. Kontroller modelnummeret, så du sammenligner den samme vare.",
      },
      {
        title: "Køb ikke på en falsk førpris",
        body:
          "En høj førpris er ikke i sig selv et bevis på en god besparelse. Sammenlign med flere butikker og vurder, om prisen er rimelig for modellen.",
      },
    ],
    faq: [
      {
        question: "Er priserne på siden opdaterede?",
        answer:
          "Vi henter produkter fra godkendte partnerfeeds, men priser og lager kan ændre sig mellem opdateringer. Tjek altid den endelige pris på butikkens produktside.",
      },
      {
        question: "Kan jeg købe telefonen direkte på TilbudJagt.dk?",
        answer:
          "Nej. TilbudJagt.dk er et pris- og butiksoverblik. Når du klikker på et produkt, åbner du butikkens side, hvor selve købet foregår.",
      },
      {
        question: "Hvorfor vises ikke alle mobiltelefoner?",
        answer:
          "Vi viser kun produkter fra butikker, hvor vi har en godkendt partneraftale og et fungerende produktlink. Det betyder, at udvalget er mindre end i en almindelig søgemaskine, men til gengæld er kilden tydelig.",
      },
    ],
    productCategories: ["Mobil"],
    related: [
      { label: "Høretelefoner og headsets", href: "/tilbud/hoereboen" },
      { label: "Spil og gaming", href: "/tilbud/spil-og-gaming" },
      { label: "Proshop", href: "/butikker/proshop" },
      { label: "POWER", href: "/butikker/power" },
      { label: "Alle produkter", href: "/produkter" },
    ],
  },
  {
    slug: "printere-og-blaek",
    h1: "Blæk, toner og printertilbehør",
    title: "Blæk, toner og printertilbehør – priser | TilbudJagt.dk",
    description:
      "Find blækpatroner, toner, etiketter og printertilbehør fra godkendte partnerbutikker. Sammenlign aktuelle priser hos TilbudJagt.dk.",
    lead:
      "Find blækpatroner, toner, etiketter og printertilbehør fra godkendte partnerbutikker. Se aktuelle priser og sammenlign, før du bestiller.",
    intro: [
      "Printertilbehør er ofte dyrt i forhold til selve printeren, og det kan være svært at gennemskue, om en kompatibel patron passer til din model. På denne side samler vi blæk, toner, etiketter og andet printertilbehør fra vores godkendte partnere, så du kan se priserne samlet.",
      "Vores nuværende feed indeholder især printertilbehør fra Din printer, men udvalget kan ændre sig. Vi viser ikke en patron som et godt tilbud, medmindre den kommer fra et godkendt feed; du skal stadig kontrollere modelnummer og sideantal på butikkens produktside.",
    ],
    tips: [
      {
        title: "Find det rigtige modelnummer",
        body:
          "Søg på printerens modelnummer, ikke kun på mærket. Mange patroner ligner hinanden, men passer kun til bestemte printere.",
      },
      {
        title: "Sammenlign sidepris",
        body:
          "En patron med højere pris kan give flere sider og dermed en lavere pris pr. side. Se på sideantal og om det er original eller kompatibel.",
      },
      {
        title: "Tjek etiketter og papir",
        body:
          "Hvis du bruger printeren til etiketter, skal du kontrollere arkstørrelse, antal pr. ark og om materialet passer til din printer.",
      },
    ],
    faq: [
      {
        question: "Hvordan finder jeg den rigtige blækpatron?",
        answer:
          "Find printerens præcise modelnummer og sammenlign det med patronens beskrivelse. Ved tvivl skal du kontrollere listen på butikkens produktside, før du køber.",
      },
      {
        question: "Hvad betyder en kompatibel patron?",
        answer:
          "En kompatibel patron er produceret af en anden leverandør end printerproducenten. Den kan være billigere, men kvalitet, garanti og sideantal kan variere, så læs beskrivelsen grundigt.",
      },
      {
        question: "Er priserne opdaterede?",
        answer:
          "Priserne kommer fra partnerfeeds og kan ændre sig. Kontroller altid den endelige pris og lagerstatus på butikkens side.",
      },
    ],
    productCategories: ["Printer & blæk"],
    related: [
      { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
      { label: "Luftrensere", href: "/tilbud/luftrensere" },
      { label: "Proshop", href: "/butikker/proshop" },
      { label: "Din printer", href: "/butikker/din-printer" },
      { label: "Alle produkter", href: "/produkter" },
    ],
  },
  {
    slug: "luftrensere",
    h1: "Luftrensere og HEPA-filtre",
    title: "Luftrensere og HEPA-filtre – priser | TilbudJagt.dk",
    description:
      "Sammenlign luftrensere og HEPA-filtre fra godkendte partnerbutikker. Se aktuelle priser og find den rette løsning til hjemmet hos TilbudJagt.dk.",
    lead:
      "Sammenlign luftrensere og HEPA-filtre fra godkendte partnerbutikker. Se aktuelle priser og vurder, hvilken løsning der passer til dit hjem.",
    intro: [
      "En luftrenser kan være relevant, hvis du vil reducere støv, pollen eller andre partikler indendørs. Men pris, filtertype, støjniveau og rumstørrelse betyder mere end et flot design, og derfor bør du sammenligne flere modeller.",
      "På denne side samler vi luftrensere og filtre fra vores godkendte partnere. Udvalget er begrænset til de butikker, vi har en aftale med, og priserne skal altid bekræftes på butikkens produktside.",
    ],
    tips: [
      {
        title: "Vælg efter rumstørrelse",
        body:
          "Tjek den anbefalede rumstørrelse og luftmængde. En lille model kan være utilstrækkelig i et stort rum, selv om den er billigere.",
      },
      {
        title: "Regn filterprisen med",
        body:
          "HEPA-filtre skal skiftes med mellemrum. Se prisen på både maskinen og de filtre, du forventer at bruge over tid.",
      },
      {
        title: "Vurder støj og placering",
        body:
          "Hvis luftrenseren skal stå i soveværelset eller stuen, er støjniveauet vigtigt. Læs butikkens oplysninger om lydniveau og størrelse.",
      },
    ],
    faq: [
      {
        question: "Hvad er et HEPA-filter?",
        answer:
          "HEPA står for High Efficiency Particulate Air og bruges om filtre, der kan tilbageholde meget små partikler. Den præcise ydeevne afhænger af filterets specifikationer og maskinen.",
      },
      {
        question: "Hvor ofte skal filteret skiftes?",
        answer:
          "Det afhænger af filtertype, brug og luftkvalitet. Følg producentens anbefaling og butikkens produktinformation; nogle filtre kan støvsuges, andre skal udskiftes.",
      },
      {
        question: "Kan jeg købe filteret samme sted?",
        answer:
          "Ikke nødvendigvis. Kontroller, om filteret er kompatibelt med din model, og om butikken har det på lager.",
      },
    ],
    productCategories: ["Luftrensere, HEPA Max & Aromadiffuser"],
    related: [
      { label: "Høretelefoner og headsets", href: "/tilbud/hoereboen" },
      { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
      { label: "ByMøller", href: "/butikker/bymoller" },
      { label: "Proshop", href: "/butikker/proshop" },
      { label: "Alle produkter", href: "/produkter" },
    ],
  },
  {
    slug: "hoereboen",
    h1: "Høretelefoner og headsets",
    title: "Høretelefoner og headsets – priser | TilbudJagt.dk",
    description:
      "Find trådløse høretelefoner, earbuds og gaming-headsets fra godkendte partnerbutikker. Sammenlign aktuelle priser hos TilbudJagt.dk.",
    lead:
      "Find trådløse høretelefoner, earbuds og gaming-headsets fra godkendte partnerbutikker. Sammenlign priser og find den model, der passer til din brug.",
    intro: [
      "Høretelefoner bruges i dag til musik, podcasts, møder og gaming, og kravene er forskellige. Nogle har brug for aktiv støjreduktion, andre prioriterer batteritid, pasform eller en lav forsinkelse til spil.",
      "På denne side samler vi høretelefoner og headsets fra vores godkendte partnere. Vi har filtreret simple tilbehørsdele som ørepuder og etuier fra, så du i højere grad ser de faktiske produkter.",
    ],
    tips: [
      {
        title: "Vælg efter brug",
        body:
          "Til pendling er støjreduktion og pasform vigtig; til gaming er lav forsinkelse og mikrofon vigtigere; til sport er lette earbuds ofte bedre.",
      },
      {
        title: "Tjek kompatibilitet",
        body:
          "Kontroller Bluetooth-version, understøttede kodeks og om produktet passer til din telefon, computer eller konsol.",
      },
      {
        title: "Sammenlign batteritid",
        body:
          "Batteritiden opgives ofte både for selve enheden og med opladningsetuiet. Se på den samlede brugstid og opladningstiden.",
      },
    ],
    faq: [
      {
        question: "Hvad betyder ANC?",
        answer:
          "ANC står for Active Noise Cancellation, altså aktiv støjreduktion. Teknologien kan dæmpe vedvarende lyde som motorstøj, men oplevelsen varierer mellem modeller.",
      },
      {
        question: "Kan jeg bruge høretelefonerne til gaming?",
        answer:
          "Det afhænger af model og tilslutning. Til gaming bør du kontrollere forsinkelse, mikrofon og om headsettet kan tilsluttes din konsol eller computer.",
      },
      {
        question: "Hvorfor varierer priserne så meget?",
        answer:
          "Prisen afhænger af mærke, funktioner, alder og butikkens lager. Sammenlign den konkrete model og ikke kun produkttypen.",
      },
    ],
    productCategories: [
      "Hovedtelefonerheadset2",
      "Over Ear Headphones",
      "In Ear Headphones",
      "Headset & Høretelefoner",
    ],
    excludePattern: /tips|ørepude|orepude|etui|cover|kabel|adapter/i,
    related: [
      { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
      { label: "Spil og gaming", href: "/tilbud/spil-og-gaming" },
      { label: "Soundliving", href: "/butikker/soundliving" },
      { label: "Proshop", href: "/butikker/proshop" },
      { label: "Alle produkter", href: "/produkter" },
    ],
  },
  {
    slug: "spil-og-gaming",
    h1: "Spil og gaming",
    title: "Spil og gaming – aktuelle priser | TilbudJagt.dk",
    description:
      "Find spil til PlayStation, Nintendo Switch, Xbox og PC fra godkendte partnerbutikker. Se aktuelle priser og sammenlign hos TilbudJagt.dk.",
    lead:
      "Find spil til PlayStation, Nintendo Switch, Xbox og PC fra godkendte partnerbutikker. Se aktuelle priser og sammenlign, før du køber.",
    intro: [
      "Spil findes både som fysiske udgaver, downloadkoder og abonnementer, og prisen kan variere meget gennem året. På denne side samler vi spil fra vores godkendte partnere, så du kan sammenligne udvalget samlet.",
      "Kontroller altid platform, sprog, region og aldersgrænse på butikkens produktside. Et spil, der passer til PlayStation 5, passer ikke nødvendigvis til Nintendo Switch eller Xbox, og en downloadkode kan være bundet til en bestemt butik.",
    ],
    tips: [
      {
        title: "Tjek platformen",
        body:
          "Spil er ofte udgivet til flere konsoller, men ikke alle. Kontroller platformen på produktet, før du køber.",
      },
      {
        title: "Se på sprog og region",
        body:
          "En billig udgave kan være på et andet sprog eller beregnet til en anden region. Læs produktbeskrivelsen, hvis dansk eller nordisk udgave er vigtig for dig.",
      },
      {
        title: "Sammenlign fysisk og digitalt",
        body:
          "Et fysisk spil kan sælges videre, mens en downloadkode ofte er billigere og leveres med det samme. Vælg efter dine behov.",
      },
    ],
    faq: [
      {
        question: "Er spillene på dansk?",
        answer:
          "Det afhænger af udgivelsen. Nogle spil har dansk tekst eller tale, andre kun engelsk. Kontroller sprogoplysningerne på butikkens produktside.",
      },
      {
        question: "Kan jeg spille spillet på alle konsoller?",
        answer:
          "Nej. Hvert produkt er beregnet til en bestemt platform eller generation. Kontroller platformen, før du lægger i kurven.",
      },
      {
        question: "Er priserne opdaterede?",
        answer:
          "Vi henter priser fra godkendte partnerfeeds, men de kan ændre sig. Tjek altid den endelige pris og leveringstid hos butikken.",
      },
    ],
    productCategories: ["Spil"],
    related: [
      { label: "Høretelefoner og headsets", href: "/tilbud/hoereboen" },
      { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
      { label: "Proshop", href: "/butikker/proshop" },
      { label: "Gucca.dk", href: "/butikker/gucca" },
      { label: "Alle produkter", href: "/produkter" },
    ],
  },
];

export function getDealCategory(slug: string): DealCategory | undefined {
  return DEAL_CATEGORIES.find((category) => category.slug === slug);
}

function matchingProducts(category: DealCategory): Product[] {
  return PRODUCTS.filter(
    (product) =>
      category.productCategories.includes(product.category) &&
      !(category.excludePattern?.test(product.name) ?? false) &&
      Boolean(product.image && product.url && product.price > 0),
  );
}

export function getCategoryTotal(category: DealCategory): number {
  return matchingProducts(category).length;
}

export function getCategoryProducts(category: DealCategory, limit = 24): Product[] {
  return matchingProducts(category)
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
}
