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
};

export function getStoreSeoContent(slug: string): StoreSeoContent | undefined {
  return CONTENT[slug];
}
