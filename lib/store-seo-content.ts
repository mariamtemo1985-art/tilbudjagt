export type StoreSeoContent = {
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
  faq: { question: string; answer: string }[];
  related: { label: string; href: string }[];
};

const CONTENT: Record<string, StoreSeoContent> = {
  power: {
    title: "POWER tilbud, butik og kategorier 2026 | TilbudJagt.dk",
    description:
      "Se POWER butiksinfo, kategorier og hvordan du finder aktuelle tilbud på TV, hvidevarer og elektronik. Tjek altid prisen hos POWER.",
    intro:
      "POWER er en dansk elektronikkæde med både fysiske butikker og webshop. Sortimentet spænder fra TV og hvidevarer til computere, mobiltelefoner og forbrugerelektronik. På denne side samler vi den praktiske butiksinfo, så du hurtigere kan vurdere, om POWER er det rigtige sted at købe.",
    sections: [
      {
        heading: "Hvad finder du hos POWER?",
        body:
          "POWER henvender sig til kunder, der vil købe elektronik i forskellige prisklasser. Udvalget afhænger af butik og lager, og nogle varer kan kun købes online eller i en bestemt fysisk butik.",
        bullets: [
          "TV, lyd og billede",
          "Hvidevarer til køkken og vaskerum",
          "Computere, tablets og mobiltelefoner",
          "Tilbehør, kabler og gaming",
        ],
      },
      {
        heading: "Sådan vurderer du et POWER-tilbud",
        body:
          "Sammenlign den samlede pris, garantien og leveringsvilkårene, før du køber. En lav pris er ikke altid den bedste handel, hvis montering, fragt eller retur bliver dyrere. Kontroller også, at varen er på lager i den ønskede farve eller størrelse.",
      },
      {
        heading: "Hvorfor viser vi ikke priser fra POWER?",
        body:
          "TilbudJagt viser først priser og konkrete tilbud, når de kommer fra et godkendt partnerfeed. Vi har ikke en offentlig, aktiv partneraftale med POWER, og derfor skal du altid tjekke den aktuelle pris direkte hos POWER. Vi opdaterer siden, hvis der kommer et godkendt feed.",
      },
    ],
    faq: [
      {
        question: "Har POWER et officielt affiliate-program?",
        answer:
          "Vi har ikke fundet et offentligt, aktivt affiliate-program for power.dk, som en dansk indholdsside kan tilmelde sig. Derfor bruger vi et almindeligt link uden provision, indtil en godkendt aftale foreligger.",
      },
      {
        question: "Kan jeg finde POWER-tilbud på TilbudJagt?",
        answer:
          "Vi viser kun konkrete tilbud, når de kommer fra et godkendt feed. Indtil da kan du bruge siden til at finde butikken og kontrollere udvalget direkte på power.dk.",
      },
      {
        question: "Hvordan sammenligner jeg POWER med andre butikker?",
        answer:
          "Sammenlign samme modelnummer, garanti, levering og samlet pris. Se også vores sider om Proshop og Gucca, hvis du vil sammenligne flere elektronikbutikker.",
      },
    ],
    related: [
      { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
      { label: "Høretelefoner og headsets", href: "/tilbud/hoereboen" },
      { label: "Proshop", href: "/butikker/proshop" },
      { label: "Gucca.dk", href: "/butikker/gucca" },
    ],
  },
  loevbjerg: {
    title: "Løvbjerg tilbud og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se Løvbjergs butiksinfo, kategorier og hvordan du finder de aktuelle tilbudsaviser. Sammenlign dagligvarer og spar hos TilbudJagt.dk.",
    intro:
      "Løvbjerg er en dansk supermarkedskæde med lokale butikker og et sortiment af dagligvarer og friske varer. Mange kunder leder efter ugens tilbudsavis, og på denne side samler vi den information, der gør det lettere at bruge butikken.",
    sections: [
      {
        heading: "Dagligvarer og friske varer",
        body:
          "Sortimentet dækker typisk hverdagens indkøb, frugt og grønt, brød, mejeri og andre fødevarer. Det konkrete udvalg kan variere mellem butikker og uger, så tjek altid den lokale butiks oplysninger.",
      },
      {
        heading: "Sådan finder du Løvbjergs tilbud",
        body:
          "Løvbjerg offentliggør løbende tilbudsaviser og kampagner. Sammenlign priserne med dine sædvanlige indkøb, og vær opmærksom på, at en tilbudspris kan være begrænset til en bestemt periode eller butik.",
        bullets: [
          "Se butikkens aktuelle tilbudsavis",
          "Kontroller gyldighedsperiode og lokale forskelle",
          "Sammenlign enhedsprisen, ikke kun den samlede pris",
        ],
      },
      {
        heading: "Derfor er Løvbjerg i butiksoversigten",
        body:
          "Vi viser butikken som et almindeligt link uden provision, fordi vi ikke har en godkendt partneraftale. Det betyder, at du kan bruge siden som et opslagsværk, men at vi ikke kan vise et bekræftet partnerfeed med priser.",
      },
    ],
    faq: [
      {
        question: "Hvor finder jeg Løvbjergs tilbudsavis?",
        answer:
          "Den aktuelle tilbudsavis findes normalt via Løvbjergs egen hjemmeside eller i butikken. Tjek gyldighedsperioden, før du tager afsted.",
      },
      {
        question: "Har TilbudJagt et partnerfeed fra Løvbjerg?",
        answer:
          "Nej. Vi har ikke en godkendt partneraftale med Løvbjerg, så siden er et almindeligt butiksopslag uden provision.",
      },
      {
        question: "Kan jeg sammenligne Løvbjerg med andre supermarkeder?",
        answer:
          "Ja. Se vores sider om Netto og andre dagligvarebutikker for at sammenligne butikstyper, udvalg og tilbudsformer.",
      },
    ],
    related: [
      { label: "Netto", href: "/butikker/netto" },
      { label: "JYSK", href: "/butikker/jysk" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  matas: {
    title: "Matas tilbud og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se Matas butiksinfo, kategorier og hvordan du finder aktuelle tilbud på hudpleje, kosmetik og parfume. Spar hos TilbudJagt.dk.",
    intro:
      "Matas er en dansk skønhedskæde med kosmetik, hudpleje, parfume, hårpleje og helseprodukter. Butikkerne findes i hele Danmark, og sortimentet omfatter både kendte mærker og Matas' egne serier.",
    sections: [
      {
        heading: "Hudpleje, kosmetik og parfume",
        body:
          "Matas dækker både daglig hudpleje og mere specialiserede produkter. Hvis du leder efter et bestemt mærke, kan du med fordel tjekke butikkens egen side for lager og udvalg, før du tager afsted.",
        bullets: [
          "Ansigts- og kropspleje",
          "Makeup og negle",
          "Parfume og dufte",
          "Hårpleje og helseprodukter",
        ],
      },
      {
        heading: "Sådan vurderer du et Matas-tilbud",
        body:
          "Sammenlign prisen pr. milliliter eller styk, især ved flerpakker og gaveæsker. Kontroller også udløbsdato, hudtype og om produktet er det samme som i din sædvanlige rutine.",
      },
      {
        heading: "Hvorfor viser vi ikke priser fra Matas?",
        body:
          "Vi viser kun konkrete priser, når de kommer fra et godkendt partnerfeed. Matas er i vores oversigt et almindeligt butikslink uden provision, så du skal altid kontrollere den aktuelle pris direkte hos Matas.",
      },
    ],
    faq: [
      {
        question: "Har Matas et affiliate-program?",
        answer:
          "Vi har ikke en godkendt partneraftale med Matas i vores nuværende oversigt. Derfor vises butikken som et direkte link uden provision.",
      },
      {
        question: "Kan jeg købe Matas-produkter via TilbudJagt?",
        answer:
          "Nej, du kan bruge linket til at åbne Matas' egen side. Selve købet og betalingen foregår hos Matas.",
      },
      {
        question: "Hvor ofte kommer der nye tilbud?",
        answer:
          "Det fastsætter Matas. Tjek butikkens egen side eller nyhedsbrev for de nyeste kampagner.",
      },
    ],
    related: [
      { label: "Sephora", href: "/butikker/sephora" },
      { label: "Boozt", href: "/butikker/boozt" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  sephora: {
    title: "Sephora tilbud og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se Sephora butiksinfo, kategorier og hvordan du finder aktuelle tilbud på makeup, hudpleje og parfume. Spar hos TilbudJagt.dk.",
    intro:
      "Sephora er en international skønhedskæde med makeup, hudpleje, parfume og hårpleje fra mange forskellige brands. I Danmark findes både fysiske butikker og en online shop, og udvalget kan variere mellem kanalerne.",
    sections: [
      {
        heading: "Et bredt skønhedsudvalg",
        body:
          "Sephora henvender sig både til dig, der leder efter et bestemt brand, og til dig, der vil sammenligne flere produkter inden for samme kategori. Sortimentet kan ændre sig med sæsonen.",
        bullets: [
          "Makeup og farveprodukter",
          "Hudpleje og rens",
          "Parfume og dufte",
          "Hårpleje og værktøj",
        ],
      },
      {
        heading: "Sådan finder du et godt Sephora-køb",
        body:
          "Tjek størrelse, holdbarhed og om produktet findes i en rejseversion eller gavepakke. Sammenlign prisen pr. milliliter, og læs ingredienslisten, hvis du har følsom hud.",
      },
      {
        heading: "Butiksinfo uden partnerpriser",
        body:
          "Vi har ikke en godkendt partneraftale med Sephora og viser derfor ikke et partnerfeed med priser. Siden er et almindeligt butiksopslag, og du skal altid kontrollere sortiment og pris hos Sephora.",
      },
    ],
    faq: [
      {
        question: "Har Sephora et affiliate-program i Danmark?",
        answer:
          "Vi har ikke en godkendt aftale i vores nuværende oversigt. Derfor er linket et almindeligt butikslink uden provision.",
      },
      {
        question: "Kan jeg sammenligne Sephora og Matas?",
        answer:
          "Ja. Se vores Matas-side og sammenlign kategorier, mærker og priser på de produkter, du overvejer.",
      },
      {
        question: "Er alle Sephora-produkter på lager?",
        answer:
          "Lagerstatus kan variere mellem butik og webshop. Tjek den konkrete vare på Sephoras egen side.",
      },
    ],
    related: [
      { label: "Matas", href: "/butikker/matas" },
      { label: "Boozt", href: "/butikker/boozt" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  boligcenter: {
    title: "Boligcenter.dk tilbud og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se Boligcenter.dk butiksinfo, kategorier og hvordan du finder aktuelle tilbud på møbler, bolig og have. Spar hos TilbudJagt.dk.",
    intro:
      "Boligcenter.dk samler møbler, belysning, haveartikler, værktøj og udstyr til hjem, have og fritid. Siden henvender sig til dig, der vil finde flere boligprodukter samlet ét sted.",
    sections: [
      {
        heading: "Møbler, bolig og have",
        body:
          "Udvalget spænder over både større møbler og mindre boligartikler. Kontroller mål, materiale og leveringsvilkår, især hvis du køber møbler, der skal samles eller leveres.",
        bullets: [
          "Møbler og opbevaring",
          "Belysning og interiør",
          "Haveartikler og udemøbler",
          "Værktøj og fritidsudstyr",
        ],
      },
      {
        heading: "Sådan vurderer du et boligkøb",
        body:
          "Sammenlign målene med dit rum, og tjek om fragt, montering og retur er inkluderet. En lav varepris kan blive dyrere, hvis leveringen eller returneringen koster ekstra.",
      },
      {
        heading: "Butiksinfo uden partnerpriser",
        body:
          "Vi har ikke en godkendt partneraftale med Boligcenter.dk og viser derfor ikke et partnerfeed med priser. Brug siden som et butiksopslag og kontroller altid aktuelle oplysninger hos Boligcenter.dk.",
      },
    ],
    faq: [
      {
        question: "Har Boligcenter.dk et affiliate-program?",
        answer:
          "Vi har ikke en godkendt aftale i vores nuværende oversigt. Derfor vises butikken som et direkte link uden provision.",
      },
      {
        question: "Kan jeg købe møbler via TilbudJagt?",
        answer:
          "Nej. Linket fører til Boligcenter.dk, hvor selve købet foregår.",
      },
      {
        question: "Hvordan sammenligner jeg boligprodukter?",
        answer:
          "Sammenlign mål, materiale, fragt og samlet pris. Se også vores JYSK-side, hvis du vil sammenligne flere boligbutikker.",
      },
    ],
    related: [
      { label: "JYSK", href: "/butikker/jysk" },
      { label: "Luftrensere", href: "/tilbud/luftrensere" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  proshop: {
    title: "Proshop tilbud og rabatkoder 2026 | TilbudJagt.dk",
    description:
      "Find Proshop tilbud på computere, TV, mobil og elektronik. Sammenlign aktuelle priser og se butiksinfo hos TilbudJagt.dk.",
    intro:
      "Proshop er en dansk onlinebutik med computere, elektronik, hvidevarer og tilbehør. På denne side kan du sammenligne et udvalg af Proshops produkter og finde vej til butikkens aktuelle priser.",
    sections: [
      {
        heading: "Elektronik og computerudstyr",
        body:
          "Proshop dækker både hardware og tilbehør. Udvalget på TilbudJagt kommer fra et godkendt partnerfeed, men det er stadig butikkens egen side, der har den endelige pris og lagerstatus.",
        bullets: [
          "Computere og komponenter",
          "TV og lyd",
          "Mobil og tablets",
          "Printere og kontorudstyr",
        ],
      },
      {
        heading: "Sådan sammenligner du Proshop-priser",
        body:
          "Kontroller modelnummer, garanti og levering, før du køber. Sammenlign også med andre butikker, hvis du leder efter en bestemt vare, da priser og lager kan ændre sig hurtigt.",
      },
      {
        heading: "Partnerlink og gennemsigtighed",
        body:
          "Proshop er en godkendt partner. Når du klikker på et produktlink, kan TilbudJagt modtage en provision, hvis du gennemfører et køb. Prisen for dig ændres ikke, og vi viser kun produkter fra det godkendte feed.",
      },
    ],
    faq: [
      {
        question: "Er Proshop en godkendt partner?",
        answer:
          "Ja. Proshop er en godkendt partner, og produktlinkene er affiliate-links. Det fremgår også af siden, at TilbudJagt kan modtage provision.",
      },
      {
        question: "Hvor opdaterede er Proshop-priserne?",
        answer:
          "Priserne kommer fra et partnerfeed og kan ændre sig. Kontroller altid den endelige pris og lagerstatus på Proshops produktside.",
      },
      {
        question: "Kan jeg købe direkte på TilbudJagt?",
        answer:
          "Nej. TilbudJagt viser produkter og priser, men købet gennemføres hos Proshop.",
      },
    ],
    related: [
      { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
      { label: "Blæk og printertilbehør", href: "/tilbud/printere-og-blaek" },
      { label: "Høretelefoner", href: "/tilbud/hoereboen" },
      { label: "Spil og gaming", href: "/tilbud/spil-og-gaming" },
    ],
  },
  boozt: {
    title: "Boozt tilbud og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se Boozt butiksinfo, kategorier og hvordan du finder aktuelle tilbud på mode, sko og accessories. Spar hos TilbudJagt.dk.",
    intro:
      "Boozt er en nordisk onlinebutik med mode, skønhed og accessories fra forskellige brands. Sortimentet henvender sig til både mænd, kvinder og børn, og udvalget kan variere mellem markederne.",
    sections: [
      {
        heading: "Mode og accessories",
        body:
          "Boozt samler tøj, sko og accessories fra flere prisniveauer. Kontroller størrelsesguide, materiale og returvilkår, før du bestiller, især hvis du køber tøj, der skal passe præcist.",
        bullets: [
          "Tøj til hverdag og fest",
          "Sko og sneakers",
          "Tasker og accessories",
          "Skønhedsprodukter",
        ],
      },
      {
        heading: "Sådan vurderer du et Boozt-tilbud",
        body:
          "Sammenlign den samlede pris inklusive fragt og eventuel retur. Se også på størrelser og farver, da et godt tilbud kun er godt, hvis varen passer.",
      },
      {
        heading: "Butiksinfo uden partnerpriser",
        body:
          "Vi har ikke en godkendt partneraftale med Boozt i vores nuværende oversigt og viser derfor ikke et partnerfeed med priser. Siden er et almindeligt butiksopslag.",
      },
    ],
    faq: [
      {
        question: "Har Boozt et affiliate-program?",
        answer:
          "Vi har ikke en godkendt aftale i vores nuværende oversigt. Derfor er linket et almindeligt butikslink uden provision.",
      },
      {
        question: "Kan jeg returnere en vare til Boozt?",
        answer:
          "Det afhænger af Boozts returvilkår og marked. Læs betingelserne på Boozts egen side, før du køber.",
      },
      {
        question: "Hvordan finder jeg min størrelse?",
        answer:
          "Brug Boozts størrelsesguide på produktsiden og sammenlign med dine egne mål. Størrelser kan variere mellem brands.",
      },
    ],
    related: [
      { label: "Matas", href: "/butikker/matas" },
      { label: "Sephora", href: "/butikker/sephora" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  gucca: {
    title: "Gucca.dk tilbud og rabatkoder 2026 | TilbudJagt.dk",
    description:
      "Find Gucca.dk tilbud på film, spil, elektronik, bøger og gaver. Sammenlign aktuelle priser og se butiksinfo hos TilbudJagt.dk.",
    intro:
      "Gucca.dk er et dansk online stormagasin med et bredt sortiment af film, spil, elektronik, bøger og gaver. På denne side kan du sammenligne et udvalg af produkter fra det godkendte partnerfeed.",
    sections: [
      {
        heading: "Et bredt stormagasinsortiment",
        body:
          "Gucca henvender sig til dig, der vil finde flere produkttyper samlet. Udvalget kan være meget bredt, så brug søgningen og kategorierne for at finde den relevante vare.",
        bullets: [
          "Film og serier",
          "Spil og gaming",
          "Elektronik og tilbehør",
          "Bøger og gaver",
        ],
      },
      {
        heading: "Sådan sammenligner du Gucca-priser",
        body:
          "Kontroller udgave, platform og sprog, især ved film og spil. Sammenlign den samlede pris inklusive fragt og leveringstid, før du bestiller.",
      },
      {
        heading: "Partnerlink og gennemsigtighed",
        body:
          "Gucca.dk er en godkendt partner. Når du klikker på et produktlink, kan TilbudJagt modtage en provision, hvis du gennemfører et køb. Prisen for dig ændres ikke.",
      },
    ],
    faq: [
      {
        question: "Er Gucca.dk en godkendt partner?",
        answer:
          "Ja. Gucca.dk er en godkendt partner, og produktlinkene er affiliate-links. Det fremgår af siden, at TilbudJagt kan modtage provision.",
      },
      {
        question: "Hvor opdaterede er Gucca-priserne?",
        answer:
          "Priserne kommer fra et partnerfeed og kan ændre sig. Kontroller altid den endelige pris og lagerstatus på Guccas produktside.",
      },
      {
        question: "Kan jeg købe film og spil direkte på TilbudJagt?",
        answer:
          "Nej. TilbudJagt viser produkter og priser, men købet gennemføres hos Gucca.dk.",
      },
    ],
    related: [
      { label: "Spil og gaming", href: "/tilbud/spil-og-gaming" },
      { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
      { label: "Proshop", href: "/butikker/proshop" },
      { label: "Alle produkter", href: "/produkter" },
    ],
  },
  jysk: {
    title: "JYSK tilbud og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se JYSK butiksinfo, kategorier og hvordan du finder aktuelle tilbud på møbler, sengelinned og boligartikler. Spar hos TilbudJagt.dk.",
    intro:
      "JYSK er en international boligkæde med møbler, sengelinned, tekstiler og udstyr til hjem og have. Butikkerne findes både fysisk og online, og sortimentet er kendetegnet ved boligartikler i forskellige prisklasser.",
    sections: [
      {
        heading: "Møbler og boligartikler",
        body:
          "JYSK dækker blandt andet soveværelse, stue, badeværelse og have. Mål og materiale er vigtige, især når du køber møbler eller tekstiler, der skal passe til et bestemt rum.",
        bullets: [
          "Møbler og opbevaring",
          "Sengelinned og tekstiler",
          "Badeværelse og køkken",
          "Møbler og udstyr til haven",
        ],
      },
      {
        heading: "Sådan vurderer du et JYSK-tilbud",
        body:
          "Sammenlign mål, materiale og samlet pris inklusive levering. Kontroller også, om varen kan returneres i en fysisk butik, hvis du køber online.",
      },
      {
        heading: "Butiksinfo uden partnerpriser",
        body:
          "Vi har ikke en godkendt partneraftale med JYSK og viser derfor ikke et partnerfeed med priser. Siden er et almindeligt butiksopslag, og du skal altid kontrollere aktuelle oplysninger hos JYSK.",
      },
    ],
    faq: [
      {
        question: "Har JYSK et affiliate-program?",
        answer:
          "Vi har ikke en godkendt aftale i vores nuværende oversigt. Derfor vises butikken som et direkte link uden provision.",
      },
      {
        question: "Kan jeg købe JYSK-møbler via TilbudJagt?",
        answer:
          "Nej. Linket fører til JYSK, hvor selve købet foregår.",
      },
      {
        question: "Hvordan finder jeg målene på et møbel?",
        answer:
          "Se målene på JYSKs produktside, og sammenlign dem med dit rum, før du bestiller.",
      },
    ],
    related: [
      { label: "Boligcenter.dk", href: "/butikker/boligcenter" },
      { label: "Luftrensere", href: "/tilbud/luftrensere" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  netto: {
    title: "Netto tilbud og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se Netto butiksinfo, kategorier og hvordan du finder de aktuelle ugentlige tilbud. Sammenlign dagligvarer og spar hos TilbudJagt.dk.",
    intro:
      "Netto er en dansk discountkæde med mange lokale butikker. Sortimentet dækker dagligvarer, friske varer, brød og basisvarer til hverdagen, og butikkerne har løbende ugentlige tilbud.",
    sections: [
      {
        heading: "Dagligvarer til hverdagen",
        body:
          "Netto er især kendt for et enkelt sortiment og skiftende tilbud. Udvalget kan variere mellem butikker, og nogle varer er kun tilgængelige i en begrænset periode.",
        bullets: [
          "Frugt og grønt",
          "Brød og mejeri",
          "Kolonial og frosne varer",
          "Rengøring og husholdning",
        ],
      },
      {
        heading: "Sådan finder du Nettos ugentlige tilbud",
        body:
          "Netto offentliggør ugentlige tilbud og tilbudsaviser. Sammenlign enhedsprisen og tjek gyldighedsperioden, før du planlægger dit indkøb.",
        bullets: [
          "Se den aktuelle tilbudsavis",
          "Kontroller gyldighed og lokale forskelle",
          "Sammenlign med dine sædvanlige indkøb",
        ],
      },
      {
        heading: "Butiksinfo uden partnerpriser",
        body:
          "Vi har ikke en godkendt partneraftale med Netto og viser derfor ikke et partnerfeed med priser. Siden er et almindeligt butiksopslag.",
      },
    ],
    faq: [
      {
        question: "Hvor finder jeg Nettos tilbudsavis?",
        answer:
          "Den aktuelle tilbudsavis findes normalt via Nettos egen side eller i butikken. Tjek gyldighedsperioden, før du tager afsted.",
      },
      {
        question: "Har TilbudJagt et partnerfeed fra Netto?",
        answer:
          "Nej. Vi har ikke en godkendt partneraftale med Netto, så siden er et almindeligt butiksopslag uden provision.",
      },
      {
        question: "Kan jeg sammenligne Netto med andre supermarkeder?",
        answer:
          "Ja. Se vores side om Løvbjerg og andre dagligvarebutikker for at sammenligne butikstyper og tilbudsformer.",
      },
    ],
    related: [
      { label: "Løvbjerg", href: "/butikker/loevbjerg" },
      { label: "JYSK", href: "/butikker/jysk" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  "global-urban-jewelry": {
    title: "Global Urban Jewelry smykker og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se butiksinfo om Global Urban Jewelry, vandfaste smykker i guld- og sølvlook, materialer og hvordan du vælger ringe, øreringe og halskæder.",
    intro:
      "Global Urban Jewelry er en dansk smykkebrand med vandfaste smykker i guld- og sølvlook. Sortimentet omfatter ringe, øreringe, halskæder og armbånd i flere kollektioner. På denne side samler vi den praktiske butiksinfo, så du lettere kan vurdere, om et smykke passer til din stil og dit brug.",
    sections: [
      {
        heading: "Hvad finder du hos Global Urban Jewelry?",
        body:
          "Butikken henvender sig til kunder, der ønsker smykker til hverdagen og til særlige anledninger. Udvalget kan variere mellem kollektionerne, så tjek altid den aktuelle vare og størrelse hos butikken.",
        bullets: [
          "Ringe i forskellige størrelser og designs",
          "Øreringe, herunder modeller til både hverdag og fest",
          "Halskæder og vedhæng",
          "Armbånd og andre accessories",
        ],
      },
      {
        heading: "Sådan vælger du et smykke, der holder",
        body:
          "Vælg størrelse og materiale efter dit daglige brug. Vandfaste smykker er beregnet til mere aktiv brug end almindelige smykker, men de skal stadig passes efter butikkens plejeanvisning. Undgå unødvendig kontakt med parfume, creme og stærke rengøringsmidler, og tør smykket efter bad, hvis butikken anbefaler det.",
      },
      {
        heading: "Sådan bruger du siden, før du køber",
        body:
          "Vi viser butiksinfo og et link videre til Global Urban Jewelry. Pris, lager, levering og retur bestemmes af butikken og kan ændre sig. Kontroller derfor altid den aktuelle pris og de gældende vilkår direkte hos butikken, før du gennemfører et køb.",
      },
    ],
    faq: [
      {
        question: "Er Global Urban Jewelrys smykker vandfaste?",
        answer:
          "Butikken beskriver sine smykker som vandfaste. Det betyder dog ikke, at alle materialer tåler alle former for vand og kemikalier. Følg butikkens plejeanvisning, og kontakt butikken, hvis du er i tvivl om et bestemt materiale.",
      },
      {
        question: "Kan jeg købe ringe og halskæder hos Global Urban Jewelry?",
        answer:
          "Ja. Sortimentet omfatter blandt andet ringe, øreringe, halskæder og armbånd. Se den aktuelle kollektion og størrelsesguide hos butikken, da udvalget kan ændre sig.",
      },
      {
        question: "Får TilbudJagt provision, når jeg klikker videre?",
        answer:
          "Nogle links på TilbudJagt er kommercielle partnerlinks. Hvis du klikker videre og køber hos butikken, kan vi modtage en provision uden ekstra omkostning for dig. Prisen hos butikken ændres ikke.",
      },
    ],
    related: [
      { label: "Trendysun", href: "/butikker/trendysun" },
      { label: "House Lab", href: "/butikker/house-lab" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  cleanstream: {
    title: "Cleanstream kalkopløser og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se butiksinfo om Cleanstream, en elektronisk kalkopløser til enfamiliehuse, og læs hvad du bør undersøge før køb og installation.",
    intro:
      "Cleanstream er en dansk butik med en elektronisk kalkopløser til enfamiliehuse. Ifølge butikken kan enheden monteres uden VVS-hjælp og skal give mindre kalk, lettere rengøring og mindre slid på husholdningsapparater. Her samler vi den praktiske information, du bør kende, før du vurderer produktet.",
    sections: [
      {
        heading: "Hvad er en elektronisk kalkopløser?",
        body:
          "En kalkopløser er et hjælpemiddel til boliger med hårdt vand. Cleanstream beskriver sin løsning som en elektronisk enhed til enfamiliehuse. Effekten afhænger af vandkvalitet, installation og brug, så sammenlign altid oplysningerne fra butikken med din egen boligs forhold.",
      },
      {
        heading: "Sådan vurderer du løsningen før køb",
        body:
          "Undersøg, om enheden passer til din boligs vandinstallation, og læs monterings- og vedligeholdelsesvejledningen. Spørg butikken, hvis du er i tvivl om garantien, returneringsretten eller hvordan enheden fungerer sammen med eksisterende hårde hvidevarer. En lavere pris er ikke det eneste kriterium, hvis installation eller service bliver besværlig.",
        bullets: [
          "Kontroller boligens vandtype og installation",
          "Læs butikkens monterings- og plejevejledning",
          "Sammenlign garanti, returret og samlet pris",
          "Spørg butikken, hvis du er i tvivl om effekten",
        ],
      },
      {
        heading: "Sådan bruger du TilbudJagt-siden",
        body:
          "Vi formidler butiksinfo og et link videre til Cleanstream. Vi opfinder ikke priser eller effektmål, og konkrete påstande om besparelser skal altid dokumenteres af butikken selv. Kontroller derfor produktets aktuelle beskrivelse, pris og vilkår direkte hos Cleanstream.",
      },
    ],
    faq: [
      {
        question: "Kræver Cleanstream professionel installation?",
        answer:
          "Cleanstream beskriver sin kalkopløser som en enhed, der kan monteres uden VVS-hjælp. Følg butikkens installationsvejledning, og kontakt butikken, hvis din bolig har en usædvanlig vandinstallation.",
      },
      {
        question: "Kan Cleanstream fjerne kalk i hele boligen?",
        answer:
          "Det afhænger af produktets funktion og boligens forhold. Læs butikkens konkrete beskrivelse, og spørg butikken, hvis du har brug for at vide, hvordan enheden passer til dit vand og dine hvidevarer.",
      },
      {
        question: "Hvor køber jeg Cleanstream?",
        answer:
          "Du kan bruge linket på denne side til at gå videre til Cleanstreams butik. Pris, lager og levering vises og opdateres af butikken selv.",
      },
    ],
    related: [
      { label: "CopenhagenPure", href: "/butikker/copenhagenpure" },
      { label: "House Lab", href: "/butikker/house-lab" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  "house-lab": {
    title: "House Lab møbler og boligtilbehør 2026 | TilbudJagt.dk",
    description:
      "Se butiksinfo om House Lab, møbler, belysning, tekstiler og boligtilbehør med personligt design, og læs hvad du bør overveje før køb.",
    intro:
      "House Lab er en dansk boligbutik med møbler, belysning, tekstiler og boligtilbehør. Sortimentet er kendetegnet ved design, der skal give hjemmet et personligt præg. På denne side samler vi den praktiske butiksinfo, så du lettere kan vurdere, om en vare passer til din bolig og dine behov.",
    sections: [
      {
        heading: "Hvad finder du hos House Lab?",
        body:
          "Butikken henvender sig til kunder, der vil indrette hjemmet med både funktionelle og dekorative elementer. Det konkrete udvalg kan ændre sig, så tjek altid mål, materiale, farve og lagerstatus hos butikken.",
        bullets: [
          "Møbler til stue, spisestue og soveværelse",
          "Belysning og lamper",
          "Tekstiler som plaider, puder og tæpper",
          "Dekoration og praktisk boligtilbehør",
        ],
      },
      {
        heading: "Sådan planlægger du et køb",
        body:
          "Mål området, før du vælger møbler eller belysning. Kontroller målene på varen, om den skal samles, og hvordan den leveres. Sammenlign den samlede pris inklusive fragt med andre boligbutikker, og læs butikkens retur- og garantivilkår, før du bestiller.",
      },
      {
        heading: "Sådan bruger du siden",
        body:
          "TilbudJagt viser butiksinfo og et link videre til House Lab. Vi viser ikke aktuelle priser fra butikken, medmindre de kommer fra et godkendt partnerfeed. Kontroller derfor altid den aktuelle pris og lagerstatus direkte hos House Lab.",
      },
    ],
    faq: [
      {
        question: "Hvilke typer produkter sælger House Lab?",
        answer:
          "House Lab sælger møbler, belysning, tekstiler og boligtilbehør. Se butikkens aktuelle kategorier for at finde det nyeste udvalg.",
      },
      {
        question: "Kan jeg se priser på House Lab via TilbudJagt?",
        answer:
          "Vi viser kun priser, når de kommer fra et godkendt partnerfeed. Ellers skal du kontrollere den aktuelle pris direkte på House Labs side.",
      },
      {
        question: "Hvad skal jeg tjekke før jeg køber møbler?",
        answer:
          "Mål, materiale, samlingskrav, levering, garanti og returret er vigtige at kontrollere. Læs også butikkens beskrivelse af varen, så du ikke sammenligner forskellige størrelser eller kvaliteter.",
      },
    ],
    related: [
      { label: "JYSK", href: "/butikker/jysk" },
      { label: "Boligcenter", href: "/butikker/boligcenter" },
      { label: "CopenhagenPure", href: "/butikker/copenhagenpure" },
      { label: "Alle butikker", href: "/butikker" },
    ],
  },
  ampmshop: {
    title: "AMPMshop.dk pulver og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se butiksinfo om AMPMshop.dk, et plantebaseret all-in-one pulver med ærte- og risprotein, vitaminer, mineraler og greens til hverdagen.",
    intro:
      "AMPMshop.dk er en dansk butik med et plantebaseret all-in-one pulver. Ifølge butikken indeholder produktet ærte- og risprotein, vitaminer, mineraler og greens til hverdagen. Her samler vi den praktiske information, du bør kende, før du vurderer, om produktet passer til dine behov.",
    sections: [
      {
        heading: "Hvad er et all-in-one pulver?",
        body:
          "Et all-in-one pulver er et pulver, der blandes med vand eller en anden drik. AMPMshop beskriver sit produkt som plantebaseret og med flere ingredienser i samme produkt. Læs ingredienslisten og næringsindholdet på butikkens side, så du ved præcis, hvad du får.",
      },
      {
        heading: "Sådan sammenligner du pulveret med andre produkter",
        body:
          "Sammenlign indhold pr. portion, proteinmængde, vitaminer og mineraler samt antal portioner pr. pakke. Kontroller også, om produktet indeholder allergener, og om det passer til din kost. En højere pris er ikke automatisk ensbetydende med et bedre produkt.",
        bullets: [
          "Læs ingrediens- og næringsdeklarationen",
          "Sammenlign indhold pr. portion og pris pr. portion",
          "Kontroller allergener og eventuelle sødestoffer",
          "Læs butikkens leverings- og returvilkår",
        ],
      },
      {
        heading: "Vigtig information om kosttilskud",
        body:
          "Et pulver er ikke en erstatning for en varieret kost. Har du særlige ernæringsbehov, er gravid, ammer eller tager medicin, bør du tale med en sundhedsfaglig person, før du begynder på et nyt kosttilskud. TilbudJagt yder ikke personlig ernæringsrådgivning.",
      },
    ],
    faq: [
      {
        question: "Hvilke ingredienser indeholder AMPMshop-pulveret?",
        answer:
          "Butikken beskriver produktet som et plantebaseret all-in-one pulver med ærte- og risprotein, vitaminer, mineraler og greens. Læs den aktuelle ingrediensliste hos butikken, da opskriften kan ændre sig.",
      },
      {
        question: "Kan jeg bruge pulveret som erstatning for et måltid?",
        answer:
          "Det afhænger af produktets sammensætning og dit behov. Læs butikkens anbefalinger, og søg sundhedsfaglig rådgivning, hvis du vil erstatte hele måltider.",
      },
      {
        question: "Hvor køber jeg AMPMshop.dk?",
        answer:
          "Brug linket på denne side for at gå videre til butikken. Pris, lager og levering vises af AMPMshop.dk selv.",
      },
    ],
    related: [
      { label: "Matas", href: "/butikker/matas" },
      { label: "Sephora", href: "/butikker/sephora" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  trendysun: {
    title: "Trendysun solbriller og butiksinfo 2026 | TilbudJagt.dk",
    description:
      "Se butiksinfo om Trendysun, klassiske solbriller i metal og acetat samt smartsolbriller med Bluetooth og højtaler, og læs hvad du bør overveje.",
    intro:
      "Trendysun er en dansk butik med solbriller i metal og acetat samt smartsolbriller med Bluetooth og højtaler. Sortimentet kombinerer klassiske designs med mere teknologiske modeller. Her samler vi den praktiske butiksinfo, så du lettere kan vælge den type solbriller, der passer til dit brug.",
    sections: [
      {
        heading: "Hvad finder du hos Trendysun?",
        body:
          "Butikken henvender sig til kunder, der både vil beskytte øjnene og have et stilrent accessory. Udvalget kan variere, så tjek altid model, farve, størrelse og linsetype hos butikken.",
        bullets: [
          "Klassiske solbriller i metal",
          "Solbriller i acetat",
          "Smartsolbriller med Bluetooth og højtaler",
          "Forskellige stel- og linseformer",
        ],
      },
      {
        heading: "Sådan vælger du solbriller",
        body:
          "Kontroller, at brillen sidder godt og ikke trykker på næse eller tindinger. Læs om linsernes UV-beskyttelse, og vælg en model, der passer til dit ansigt og din brug. Til sport og aktiv ferie kan et mere stabilt stel være vigtigere end et meget let design.",
      },
      {
        heading: "Sådan vurderer du smartsolbriller",
        body:
          "Smartsolbriller med Bluetooth og højtaler kan være praktiske til musik og opkald, men batteritid, pasform og lydkvalitet varierer. Læs butikkens produktbeskrivelse og betjeningsvejledning, og overvej, om du har brug for funktionerne i hverdagen.",
      },
    ],
    faq: [
      {
        question: "Sælger Trendysun både klassiske og smarte solbriller?",
        answer:
          "Ja. Butikken beskriver et sortiment med klassiske solbriller i metal og acetat samt smartsolbriller med Bluetooth og højtaler. Se det aktuelle udvalg hos butikken.",
      },
      {
        question: "Hvordan vælger jeg den rigtige størrelse?",
        answer:
          "Sammenlign målene på stellet med dine nuværende solbriller, og læs butikkens størrelsesinformation. Pasform er individuelt, så kontakt butikken, hvis du er i tvivl.",
      },
      {
        question: "Kan jeg se priser på Trendysun her?",
        answer:
          "Vi viser kun priser, når de kommer fra et godkendt partnerfeed. Ellers skal du kontrollere den aktuelle pris og lagerstatus direkte hos Trendysun.",
      },
    ],
    related: [
      { label: "Global Urban Jewelry", href: "/butikker/global-urban-jewelry" },
      { label: "House Lab", href: "/butikker/house-lab" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
  copenhagenpure: {
    title: "CopenhagenPure luftrensere og filtre 2026 | TilbudJagt.dk",
    description:
      "Se butiksinfo om CopenhagenPure, luftrensere og HEPA-filtre til hjemmet, og læs hvad du bør overveje om størrelse, støj og filterdrift.",
    intro:
      "CopenhagenPure er en dansk butik med luftrensere og HEPA-filtre til hjemmet. Produkterne henvender sig til kunder, der vil forbedre indeluften og reducere støv og partikler i boligen. Her samler vi den praktiske butiksinfo, du bør kende, før du vælger en luftrenser.",
    sections: [
      {
        heading: "Hvad finder du hos CopenhagenPure?",
        body:
          "Butikken sælger luftrensere i forskellige størrelser og HEPA-filtre til hjemmet. Det konkrete udvalg kan ændre sig, så tjek altid, hvilket rum og hvilken størrelse produktet er beregnet til.",
        bullets: [
          "Luftrensere til forskellige rumstørrelser",
          "HEPA-filtre og reservedele",
          "Produkter til hjemmet og daglig brug",
          "Information om filter og vedligeholdelse",
        ],
      },
      {
        heading: "Sådan vælger du en luftrenser",
        body:
          "Vælg en model, der passer til rummets størrelse og den luftmængde, du vil rense. Sammenlign støjniveau, energiforbrug, filtertype og prisen på nye filtre. Et billigt produkt kan blive dyrere over tid, hvis filtrene skal skiftes ofte.",
        bullets: [
          "Kontroller anbefalet rumstørrelse",
          "Sammenlign støjniveau og energiforbrug",
          "Undersøg filterpris og skiftinterval",
          "Læs garanti og returvilkår",
        ],
      },
      {
        heading: "Sådan bruger du siden",
        body:
          "TilbudJagt viser butiksinfo og et link videre til CopenhagenPure. Vi lover ikke en bestemt luftkvalitet eller sundhedseffekt. Kontroller produktets dokumentation, pris og leveringsvilkår direkte hos butikken.",
      },
    ],
    faq: [
      {
        question: "Hvilke produkter sælger CopenhagenPure?",
        answer:
          "CopenhagenPure sælger luftrensere og HEPA-filtre til hjemmet. Se butikkens aktuelle kategorier for at finde modeller og reservedele.",
      },
      {
        question: "Hvor ofte skal et HEPA-filter skiftes?",
        answer:
          "Det afhænger af filtertype, brug og luftforhold. Følg butikkens og producentens anbefaling, og kontroller filterets tilstand regelmæssigt.",
      },
      {
        question: "Kan en luftrenser erstatte ventilation?",
        answer:
          "En luftrenser er ikke det samme som ventilation. Den kan hjælpe med at filtrere partikler i indeluften, men boligen skal stadig ventileres efter gældende anbefalinger.",
      },
    ],
    related: [
      { label: "Cleanstream", href: "/butikker/cleanstream" },
      { label: "House Lab", href: "/butikker/house-lab" },
      { label: "Alle butikker", href: "/butikker" },
      { label: "Guides", href: "/guides" },
    ],
  },
};

export function getStoreSeoContent(slug: string): StoreSeoContent | undefined {
  return CONTENT[slug];
}
