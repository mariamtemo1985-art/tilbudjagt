export type GuideLink = { label: string; href: string };
export type GuideFaq = { question: string; answer: string };
export type GuideSection = {
  heading: string;
  paragraphs: string[];
  links?: GuideLink[];
};

export type Guide = {
  slug: string;
  kicker: string;
  title: string;
  description: string;
  lead: string;
  updated: string;
  /** ISO-dato (YYYY-MM-DD). Artiklen vises først fra denne dato. */
  publishAt?: string;
  sections: GuideSection[];
  faq?: GuideFaq[];
  /** Slugs for relevant stores shown at the end of the guide. */
  relatedStores?: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "gennemskue-et-godt-tilbud",
    kicker: "Forbrug",
    title: "Sådan gennemskuer du et godt tilbud",
    description:
      "Fire enkle spørgsmål hjælper dig med at vurdere, om et nedsat prisskilt er en reel besparelse, eller om du betaler for meget.",
    lead:
      "Et nedsat prisskilt er ikke automatisk en besparelse. Med fire spørgsmål kan du hurtigt afgøre, om tilbuddet er reelt.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "1. Hvad har varen kostet tidligere?",
        paragraphs: [
          "Butikker viser ofte en førpris, men den er kun nyttig, hvis den faktisk har været brugt. Tænk over, om du selv har set varen til en lignende pris inden for de seneste uger. Hvis prisen er sat ned fra et niveau, der aldrig rigtigt har været gældende, er besparelsen mindre, end skiltet antyder.",
          "Skriv gerne prisen ned, når du ser en vare, du overvejer at købe senere. Det giver dig et personligt referencepunkt, som er mere retvisende end et kortvarigt kampagneskilt.",
        ],
      },
      {
        heading: "2. Hvad er enhedsprisen?",
        paragraphs: [
          "Pakker med forskellige størrelser kan se ens ud på hylden, men prisen pr. kilo, liter eller styk kan variere meget. Enhedsprisen er den mest retfærdige måde at sammenligne to produkter på, især i dagligvarebutikker.",
          "Vær også opmærksom på mængderabat, der lokker dig til at købe mere, end du kan nå at bruge. En stor pakke er kun en besparelse, hvis indholdet bliver brugt.",
        ],
      },
      {
        heading: "3. Er der betingelser?",
        paragraphs: [
          "Nogle tilbud kræver medlemskab, app, kupon eller køb af et bestemt antal varer. Læs de små linjer, før du tager stilling til prisen. Det er også værd at tjekke, om varen er på lager i den butik, du regner med at besøge.",
          "Online tilbud kan have begrænset lagerbeholdning og ændrede leveringsvilkår. Kontrollér derfor altid den endelige pris ved betaling, inklusive fragt og eventuelle gebyrer.",
        ],
      },
      {
        heading: "4. Har du faktisk brug for varen?",
        paragraphs: [
          "Det mest effektive filter er dit eget behov. Et tilbud, du ikke havde brug for, er aldrig en besparelse – uanset hvor stort et procenterne ser ud. Overvej, hvor ofte du vil bruge varen, og om den erstatter noget, du allerede har.",
          "Hvis du er i tvivl, så vent en dag. Mange impulskøb føles mindre oplagte, når den første begejstring har lagt sig.",
        ],
      },
    ],
  },
  {
    slug: "sammenlign-dagligvarepriser",
    kicker: "Dagligvarer",
    title: "Sådan sammenligner du dagligvarepriser uden at blive snydt",
    description:
      "Lær at sammenligne kilopriser, spotte mængderabat og planlægge ugens indkøb, så tilbudsaviserne bliver en reel besparelse.",
    lead:
      "Dagligvarer fylder mest i de fleste husholdningers budget. Med en fast metode kan du bruge tilbudsaviserne uden at købe for meget.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "Start med en madplan",
        paragraphs: [
          "Kig i køleskab og fryser, før du åbner tilbudsaviserne. Byg ugens måltider op omkring det, du allerede har, og brug tilbuddene til at fylde hullerne ud. På den måde undgår du at købe varer, der ender med at blive smidt ud.",
          "En enkel madplan behøver ikke være detaljeret. Det er nok at beslutte, hvilke dage der skal være varme retter, og hvad der skal bruges til frokost og mellemmåltider.",
        ],
      },
      {
        heading: "Sammenlign kilopriser, ikke pakningspriser",
        paragraphs: [
          "Butikkernes hylder viser ofte prisen pr. kilo eller liter i lille skrift. Brug den, når du sammenligner mærker og størrelser. To pakker kan koste næsten det samme, men indeholde meget forskellige mængder.",
          "Ved frugt og grønt kan udbyttet variere. En billig pose gulerødder med dårlig kvalitet kan ende med at være dyrere end en lidt dyrere pose, hvor mere af indholdet kan bruges.",
        ],
      },
      {
        heading: "Pas på mængderabat",
        paragraphs: [
          "3-for-2 og lignende tilbud er kun gode, hvis varen har lang holdbarhed eller kan fryses. Tjek holdbarhedsdatoen, før du tager den store pakke med. Konserves, tørvarer og frysevarer er ofte sikre køb, mens friske mejeriprodukter kræver mere planlægning.",
        ],
      },
      {
        heading: "Handl med en liste",
        paragraphs: [
          "En fast indkøbsliste mindsker impulskøb markant. Skriv listen ud fra madplanen, og hold dig til den. Hvis du handler ind efter arbejde, når du er sulten, er risikoen for ekstra køb størst.",
          "Det kan også betale sig at vælge én butik til de faste basisvarer og kun tage de ekstra ture til andre butikker, når besparelsen tydeligt opvejer transporttiden.",
        ],
      },
    ],
  },
  {
    slug: "elektroniktilbud-tjekliste",
    kicker: "Elektronik",
    title: "Elektroniktilbud: tjek modelnummer, garanti og fragt",
    description:
      "Elektronik har store prisforskelle og hyppige kampagner. En kort tjekliste hjælper dig med at undgå at købe en ældre model til ny pris.",
    lead:
      "Elektronik er et af de områder, hvor tilbud oftest ser bedre ud, end de er. Tjek modelnummer, garanti og samlet pris, før du køber.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "Find det præcise modelnummer",
        paragraphs: [
          "Producenternes navne er ofte ens på tværs af årgange. Skriv modelnummeret ned fra produktets side og søg på det, før du sammenligner priser. Så undgår du at sammenligne en ny model med en ældre udgave, der blot hedder næsten det samme.",
          "Modelnummeret står typisk på emballagen, i produktbeskrivelsen eller på et typeskilt bag på apparatet.",
        ],
      },
      {
        heading: "Sammenlign den samlede pris",
        paragraphs: [
          "Levering, installation og eventuelle gebyrer kan ændre regnestykket. Skriv den samlede pris ned for hver forhandler, inklusive fragt, før du beslutter dig. En billigere vare kan blive dyrere, hvis leveringen koster ekstra.",
          "Ved større hvidevarer bør du også tjekke, om den gamle maskine skal afhentes, og om det koster ekstra.",
        ],
      },
      {
        heading: "Kontrollér garanti og reklamationsret",
        paragraphs: [
          "Når du køber hos en dansk forhandler, gælder dansk reklamationsret. Ved køb fra udenlandske webshops kan reglerne være anderledes, og returprocessen kan være dyrere. Læs vilkårene, før du betaler.",
          "Gem ordrebekræftelse og kvittering, så du kan dokumentere købet, hvis der opstår en fejl.",
        ],
      },
      {
        heading: "Se på drift og energiforbrug",
        paragraphs: [
          "For hvidevarer kan energimærket have større betydning for økonomien end en rabat på få hundrede kroner. Sammenlign årligt energiforbrug, og overvej, hvor længe du regner med at beholde apparatet.",
          "Støjniveau er også værd at tjekke, især hvis maskinen skal stå tæt på køkken eller stue.",
        ],
      },
    ],
  },
  {
    slug: "affiliate-links-forklaret",
    kicker: "Om TilbudJagt",
    title: "Affiliate-links forklaret: sådan tjener TilbudJagt penge",
    description:
      "Hvad er et affiliate-link, hvordan fungerer det, og hvad betyder det for din pris? Få en enkel forklaring på, hvordan TilbudJagt finansieres.",
    lead:
      "Nogle af linkene på TilbudJagt er affiliate-links. Her forklarer vi, hvad det betyder – og hvorfor din pris ikke ændrer sig.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "Hvad er et affiliate-link?",
        paragraphs: [
          "Et affiliate-link er et link til en butik, som indeholder en sporingskode. Hvis du klikker på linket og køber en vare, kan butikken registrere, at købet kom fra TilbudJagt. Butikken betaler så en lille provision til os.",
          "Provisionen betales af butikken og lægges ikke oveni den pris, du ser hos butikken. Du betaler det samme, som hvis du var gået direkte til butikkens hjemmeside.",
        ],
      },
      {
        heading: "Hvorfor mærker vi linkene?",
        paragraphs: [
          "Danske regler kræver, at reklame og kommercielle links tydeligt fremgår. Derfor mærker vi affiliate-links med «Reklamelink» eller en tilsvarende forklaring, så du altid ved, at vi kan modtage provision.",
          "Links uden provision er mærket som «Direkte link». De fører til butikkens egen hjemmeside uden sporingskode og uden betaling til os.",
        ],
      },
      {
        heading: "Påvirker det vores anbefalinger?",
        paragraphs: [
          "Vi bestræber os på at vise butikker og tilbud, uanset om der er en partneraftale. En butik kan være med i vores oversigt som direkte link, selv om vi ikke har en aftale med den.",
          "Hvis vi en dag viser betalte placeringer eller sponsorerede kampagner, vil de blive markeret særskilt. Vores mål er, at du kan se forskel på redaktionelt indhold og betalt indhold.",
        ],
      },
      {
        heading: "Hvordan kan du støtte os?",
        paragraphs: [
          "Den nemmeste måde at støtte TilbudJagt på er at bruge vores links, når du alligevel skal handle. Det koster ikke ekstra, og det hjælper os med at holde siden gratis.",
          "Hvis du opdager et link, der ikke fungerer, eller en pris der er forkert, så skriv til os. Det hjælper både dig og andre brugere.",
        ],
      },
    ],
  },
  {
    slug: "tilbudsaviser-uden-overforbrug",
    kicker: "Hverdagen",
    title: "Brug tilbudsaviser uden at købe for meget",
    description:
      "Tilbudsaviser kan spare dig penge, men de kan også lokke dig til overforbrug. Fem vaner holder indkøbene på sporet.",
    lead:
      "Tilbudsaviser er lavet for at få dig til at købe mere. Med fem enkle vaner kan du få besparelserne uden at fylde skabet med ting, du ikke bruger.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "Læs avisen med en liste i hånden",
        paragraphs: [
          "Tag udgangspunkt i det, du faktisk mangler. Skriv listen ned, før du åbner tilbudsaviserne, og brug kun tilbuddene til at supplere. Så bliver avisen et værktøj i stedet for en indkøbsseddel.",
        ],
      },
      {
        heading: "Sæt et loft for tilbudskøb",
        paragraphs: [
          "Beslut på forhånd, hvor mange ekstra varer du må købe ud over listen. Et fast loft gør det lettere at sige nej til det tredje eller fjerde gode tilbud, som du ikke havde planlagt.",
        ],
      },
      {
        heading: "Tjek holdbarhed og opbevaring",
        paragraphs: [
          "Et godt tilbud er kun godt, hvis varen kan bruges inden for holdbarheden. Tjek datoen, og overvej, om du har plads i fryser eller skab. Store mængder af friske varer ender ofte med at blive smidt ud.",
        ],
      },
      {
        heading: "Sammenlign med din egen erfaring",
        paragraphs: [
          "Du kender dine egne indkøbsvaner bedre end nogen app. Hvis du ved, at en bestemt vare sjældent bliver spist, så spring tilbuddet over – uanset hvor stor rabatten ser ud.",
        ],
      },
      {
        heading: "Brug tilbud som inspiration, ikke som krav",
        paragraphs: [
          "Det er helt i orden at gå glip af et tilbud. Der kommer nye næste uge. At købe noget, du ikke havde brug for, er dyrere end at vente på det næste reelle behov.",
        ],
      },
    ],
  },
  {
    slug: "fortrydelsesret-og-retur",
    kicker: "Forbrug",
    title: "Fortrydelsesret og retur: sådan gør du i Danmark",
    description:
      "Hvornår har du 14 dages fortrydelsesret, hvad er undtaget, og hvem betaler returfragten? En kort guide til returreglerne ved onlinekøb.",
    lead:
      "Når du handler online, har du som udgangspunkt 14 dages fortrydelsesret. Men der er undtagelser, og det er værd at kende dem, før du klikker køb.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "14 dage fra modtagelsen",
        paragraphs: [
          "Ved fjernsalg – for eksempel netbutikker – har du normalt 14 dage til at fortryde købet. Fristen regnes fra den dag, du modtager varen. Du skal give butikken besked inden for fristen og sende varen retur inden for yderligere 14 dage.",
          "Du må gerne prøve varen, som du ville gøre i en fysisk butik. Men den skal returneres i væsentligt samme stand og mængde, som da du modtog den.",
        ],
      },
      {
        heading: "Det er undtaget",
        paragraphs: [
          "Nogle varer kan ikke fortrydes. Det gælder blandt andet varer, der er fremstillet efter dine ønsker, letfordærvelige varer, og forseglede varer, hvor forseglingen er brudt af hygiejniske årsager – for eksempel visse kosmetikprodukter og undertøj.",
          "Digitale produkter kan også være undtaget, hvis du har accepteret at få leveret dem med det samme og har oplyst det til butikken. Læs altid butikkens returvilkår, før du køber.",
        ],
      },
      {
        heading: "Hvem betaler returfragten?",
        paragraphs: [
          "Det er butikken, der skal oplyse, om du selv skal betale for at sende varen retur. Mange butikker oplyser det i deres handelsbetingelser. Hvis det ikke er oplyst, skal butikken betale returfragten.",
          "Ved retur skal du normalt få købsprisen og den oprindelige leveringspris tilbage, når butikken har modtaget varen. Nogle butikker trækker returomkostninger fra, hvis det er aftalt.",
        ],
      },
      {
        heading: "Reklamationsret er noget andet",
        paragraphs: [
          "Reklamationsretten gælder, når varen er defekt eller mangelfuld. I Danmark er den som udgangspunkt 2 år for nye varer. Den gælder også, selv om fortrydelsesfristen er udløbet.",
          "Gem ordrebekræftelse og kvittering. Kontakt butikken så hurtigt som muligt, hvis varen ikke fungerer, som den skal.",
        ],
      },
    ],
  },
  {
    slug: "spot-falske-anmeldelser",
    kicker: "Tryghed",
    title: "Sådan spotter du falske anmeldelser",
    description:
      "Mange stjerner betyder ikke altid et godt køb. Se på mønstre, datoer og formuleringer, før du lader anmeldelser afgøre dit køb.",
    lead:
      "Anmeldelser kan være en god hjælp, men de kan også være købt eller skrevet af butikken selv. Her er nogle tegn, du kan kigge efter.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "Se på fordelingen, ikke gennemsnittet",
        paragraphs: [
          "En vare med mange 5-stjernede anmeldelser og næsten ingen 2- eller 3-stjernede kan være et tegn på, at anmeldelserne er styret. Reelle produkter har ofte en mere blandet fordeling, fordi forskellige købere har forskellige behov.",
          "Læs de kritiske anmeldelser først. De fortæller ofte mere om svaghederne end de positive.",
        ],
      },
      {
        heading: "Tjek datoer og mønstre",
        paragraphs: [
          "Mange anmeldelser med samme dato eller inden for få dage kan være et tegn på en kampagne. Se også, om de samme formuleringer går igen, eller om anmeldelserne alle bruger samme længde og struktur.",
          "Det er ikke i sig selv bevis på snyd, men det er værd at være opmærksom.",
        ],
      },
      {
        heading: "Søg efter konkrete detaljer",
        paragraphs: [
          "Troværdige anmeldelser nævner ofte konkrete detaljer: hvordan varen blev brugt, hvad der fungerede, og hvad der ikke gjorde. Anmeldelser, der kun roser i generelle vendinger, giver mindre værdi.",
          "Se også efter billeder eller opdateringer, hvor køberen fortæller om brugen over tid.",
        ],
      },
      {
        heading: "Brug flere kilder",
        paragraphs: [
          "Sammenlign anmeldelser fra flere sider, og se om butikken svarer på kritik. En butik, der håndterer klager åbent, er ofte mere troværdig end en, hvor alle anmeldelser er perfekte.",
          "Hvis noget virker for godt til at være sandt, så vent og undersøg nærmere, før du køber.",
        ],
      },
    ],
  },
  {
    slug: "black-friday-tjekliste",
    kicker: "Sæson",
    title: "Black Friday-tjekliste: køb rigtigt tilbud",
    description:
      "Black Friday er fyldt med rabatter, men ikke alle er reelle. Brug tjeklisten, så du ikke køber til falsk førpris.",
    lead:
      "Black Friday lokker med store procenter, men rabatten er kun god, hvis du kender prisen i forvejen. Her er en kort tjekliste.",
    updated: "19. november 2026",
    sections: [
      {
        heading: "Lav en ønskeliste i god tid",
        paragraphs: [
          "Beslut før kampagnen, hvad du faktisk mangler. Skriv modeller og cirkapriser ned, så du kan sammenligne med tilbuddet. Uden en liste er det svært at vurdere, om rabatten er reel.",
        ],
      },
      {
        heading: "Tjek førprisen",
        paragraphs: [
          "Se på den pris, varen normalt koster – ikke kun den pris, butikken kalder førpris. Hvis du har set varen billigere for nylig, er rabatten mindre, end den ser ud.",
        ],
      },
      {
        heading: "Sammenlign den samlede pris",
        paragraphs: [
          "Husk fragt, levering og eventuelle medlemskrav. En rabat på 200 kroner kan forsvinde, hvis leveringen koster ekstra.",
        ],
      },
      {
        heading: "Vent på det rigtige tilbud",
        paragraphs: [
          "Der kommer flere kampagner i løbet af året. Hvis tilbuddet ikke er klart bedre end det, du normalt ser, så vent. Det er bedre at købe det rigtige produkt til en god pris end at købe et produkt, du ikke har brug for.",
        ],
      },
    ],
  },
  {
    slug: "netto-tilbudsavis",
    kicker: "Dagligvarer",
    title: "Netto tilbudsavis: Se ugens tilbud og katalog",
    description:
      "Sådan finder du Nettos nyeste tilbudsavis, forstår gyldighedsperioden og bruger ugens tilbud uden at købe mere, end du har brug for.",
    lead:
      "Nettos tilbudsavis skifter typisk hver uge. Her er, hvordan du finder den nyeste avis, læser vilkårene og bruger tilbuddene i din madplan.",
    updated: "24. november 2026",
    publishAt: "2026-11-24",
    sections: [
      {
        heading: "Hvor finder du den nyeste tilbudsavis?",
        paragraphs: [
          "Den nyeste avis ligger normalt på Nettos egen hjemmeside og i Nettos app. Du kan også tage et fysisk eksemplar i butikken. Avisen gælder som regel en uge ad gangen, men datoerne kan variere i forbindelse med helligdage og kampagner.",
          "Tjek altid gyldighedsperioden øverst i avisen, før du planlægger dit indkøb. Et tilbud, der er udløbet, kan stadig hænge i butikken, men prisen ved kassen er den gældende.",
        ],
      },
      {
        heading: "Sådan læser du ugens tilbud",
        paragraphs: [
          "Se på førprisen, enhedsprisen og eventuelle betingelser. En vare kan være sat ned fra en pris, der kun har været gældende i kort tid, og en stor pakke er ikke altid billigere pr. kilo end en mindre.",
          "Nogle tilbud kræver app, medlemskab eller køb af flere varer. Læs de små linjer, og tjek lagerstatus, hvis du kører efter en bestemt vare.",
        ],
      },
      {
        heading: "Brug avisen som grundlag for madplanen",
        paragraphs: [
          "Vælg tre eller fire måltider ud fra de varer, du faktisk spiser, og skriv en kort indkøbsliste. På den måde undgår du at købe tilbudsvarer, der ender i skabet.",
          "Sammenlign gerne med de andre butikkers aviser, hvis du alligevel skal handle ind flere steder. Den største besparelse kommer ofte fra at planlægge ugens måltider frem for at købe enkelte nedsatte varer.",
        ],
      },
    ],
  },
  {
    slug: "foetex-tilbudsavis",
    kicker: "Dagligvarer",
    title: "Føtex tilbudsavis: Ugens tilbud og katalog",
    description:
      "Find Føtex' tilbudsavis, se hvornår den skifter, og lær at vurdere ugens tilbud på dagligvarer og nonfood, før du handler.",
    lead:
      "Føtex' tilbudsavis kombinerer dagligvarer og nonfood. Her er en enkel måde at finde den nyeste avis og bruge den uden at miste overblikket.",
    updated: "1. december 2026",
    publishAt: "2026-12-01",
    sections: [
      {
        heading: "Find den gældende avis",
        paragraphs: [
          "Du finder Føtex' tilbudsavis på føtex.dk og i Føtex-appen. Avisen opdateres normalt hver uge, men kampagner kan have forskellige start- og slutdatoer. Kontrollér derfor altid datoen på det enkelte tilbud.",
          "Hvis du handler online, kan priser og lagerbeholdning variere fra din lokale butik. Tjek den endelige pris i kurven, før du betaler.",
        ],
      },
      {
        heading: "Dagligvarer og nonfood i samme avis",
        paragraphs: [
          "Føtex' avis blander ofte madvarer med køkkenudstyr, boligting og tøj. Det kan friste til at købe mere, end du havde planlagt. Skriv ned, hvad du reelt mangler, inden du åbner avisen.",
          "For dagligvarer er enhedsprisen det mest retvisende sammenligningsgrundlag. For nonfood bør du også se på garanti, returvilkår og om varen fås billigere hos en anden forhandler.",
        ],
      },
      {
        heading: "Planlæg efter tilbuddene",
        paragraphs: [
          "Brug avisen til at vælge ugens aftensmåltider og til at fylde fryseren med holdbare varer, hvis prisen er god. Undgå at hamstre letfordærvelige varer, som du ikke kan nå at spise.",
          "Hvis et tilbud ikke er klart bedre end den pris, du normalt ser, så vent. Der kommer nye tilbud næste uge.",
        ],
      },
    ],
  },
  {
    slug: "rema-1000-tilbudsavis",
    kicker: "Dagligvarer",
    title: "REMA 1000 tilbudsavis: Ugens tilbud og spotvarer",
    description:
      "Sådan finder du REMA 1000s tilbudsavis, forstår forskellen på ugens tilbud og spotvarer og handler ind efter en plan.",
    lead:
      "REMA 1000 har både faste ugentlige tilbud og spotvarer med begrænset lager. Her er, hvordan du holder styr på begge dele.",
    updated: "8. december 2026",
    publishAt: "2026-12-08",
    sections: [
      {
        heading: "Ugens tilbud og spotvarer",
        paragraphs: [
          "REMA 1000s tilbudsavis findes på rema1000.dk og i appen. 'Ugens tilbud' gælder typisk en uge, mens spotvarer kan være tilgængelige i kortere tid eller så længe lager haves.",
          "Spotvarer er ofte indkøbt i begrænsede mængder. Hvis du kører efter en bestemt vare, så tjek lagerstatus eller kontakt din lokale butik, før du tager afsted.",
        ],
      },
      {
        heading: "Vurder tilbuddet før du køber",
        paragraphs: [
          "Sammenlign førpris, enhedspris og mængde. Et spotkøb kan være en god pris, men kun hvis du faktisk bruger varen. Se også på holdbarhed og opbevaringsplads.",
          "Nogle varer sælges i store pakker, som kræver plads i fryseren eller skabet. Regn ud, hvor meget du realistisk får brugt, før du køber ind til flere måneder.",
        ],
      },
      {
        heading: "Brug tilbuddene i en fast madplan",
        paragraphs: [
          "Start med de måltider, du allerede ved, du skal lave, og find derefter de tilbud, der passer. På den måde bliver tilbudsavisen et værktøj frem for en liste over ting, du ikke mangler.",
          "Hvis du handler ind i flere butikker, så saml indkøbet, så du ikke bruger tid og benzin på at jage en lille besparelse.",
        ],
      },
    ],
  },
  {
    slug: "lidl-tilbudsavis",
    kicker: "Dagligvarer",
    title: "Lidl tilbudsavis: Ugens tilbud og weekendtilbud",
    description:
      "Find Lidls tilbudsavis, se forskellen på ugens tilbud og weekendtilbud, og brug avisen til at planlægge et billigere indkøb.",
    lead:
      "Lidl har ugentlige tilbud og særlige weekendtilbud. Her er, hvordan du finder den nyeste avis og vurderer tilbuddene, før du handler.",
    updated: "15. december 2026",
    publishAt: "2026-12-15",
    sections: [
      {
        heading: "Hvor er den nyeste avis?",
        paragraphs: [
          "Lidls tilbudsavis ligger på lidl.dk og i Lidl Plus-appen. Avisen opdateres løbende, og weekendtilbud kan have en kortere gyldighedsperiode end de almindelige ugentlige tilbud.",
          "Tjek datoerne på det enkelte tilbud, især i ferieperioder og omkring helligdage, hvor butikkernes åbningstider kan ændre sig.",
        ],
      },
      {
        heading: "Sammenlign med dine normale indkøb",
        paragraphs: [
          "Lav en liste over de varer, du køber hver uge, og sammenlign priserne med de butikker, du normalt bruger. En lav pris på en enkelt vare er ikke en besparelse, hvis resten af indkøbet bliver dyrere.",
          "Se på enhedsprisen og på, om varen er et alternativ til noget, du allerede har. Undgå at købe store mængder af varer, du sjældent spiser.",
        ],
      },
      {
        heading: "Brug weekendtilbud med omtanke",
        paragraphs: [
          "Weekendtilbud er ofte tidsbegrænsede og kan skabe travlhed i butikken. Planlæg dit besøg uden for de travleste timer, og tag kun de varer med, du havde skrevet på listen.",
          "Hvis du ikke kan nå tilbuddet, så lad det gå. Der kommer nye tilbud, og et impulskøb er sjældent en god forretning.",
        ],
      },
    ],
  },
  {
    slug: "julebudget-og-julemad",
    kicker: "Jul",
    title: "Julebudget og julemad: sådan handler du uden overforbrug",
    description:
      "Lav en juleplan, sammenlign enhedspriser og undgå impulskøb, så både julemaden og gaverne holder budgettet.",
    lead:
      "Julen er højsæson for tilbud, men også for impulskøb. En enkel plan gør det lettere at købe det, du faktisk skal bruge.",
    updated: "19. november 2026",
    publishAt: "2026-11-19",
    sections: [
      {
        heading: "Start med julemenuen, ikke tilbudsavisen",
        paragraphs: [
          "Beslut først, hvilke retter du vil lave, hvor mange gæster der kommer, og hvor meget du realistisk skal bruge. Skriv en indkøbsliste, og tjek hvad du allerede har i skab, køleskab og fryser. Først derefter giver det mening at se på tilbudsaviserne.",
          "På den måde undgår du at købe ekstra varer, bare fordi de er sat ned. Et godt tilbud på en vare, du ikke skal bruge, er stadig en udgift.",
        ],
      },
      {
        heading: "Sammenlign enhedspris og holdbarhed",
        paragraphs: [
          "Sammenlign prisen pr. kilo, liter eller styk i stedet for kun at se på pakkens pris. Store pakker kan være billigere pr. enhed, men kun hvis du får brugt indholdet, før det bliver dårligt.",
          "Tjek holdbarhedsdatoer og opbevaringsplads, især på ferskvarer og frysevarer. Hvis fryseren er fuld, er en ekstra stor pakke ikke en besparelse.",
        ],
      },
      {
        heading: "Sæt et julebudget og hold en kort pause",
        paragraphs: [
          "Del budgettet op i julemad, gaver og andre udgifter, så du kan se, hvor pengene går. Tag listen med i butikken, og undgå at handle, når du er sulten eller har travlt.",
          "For ting, der ikke er strengt nødvendige, kan en pause på et døgn hjælpe. Tidsbegrænsede tilbud skaber ofte et pres, men de fleste beslutninger bliver bedre, når den første begejstring har lagt sig.",
        ],
      },
    ],
  },
  {
    slug: "black-friday-2026-danmark",
    kicker: "Black Friday",
    title: "Black Friday 2026 i Danmark: find de reelle tilbud",
    description:
      "En praktisk tjekliste til Black Friday 2026 i Danmark: planlæg købene, sammenlign priser og undgå falske førpriser.",
    lead:
      "Black Friday er tæt på. Brug en kort plan, så du kan se forskel på et reelt tilbud og et skilt, der bare skaber travlhed.",
    updated: "25. november 2026",
    publishAt: "2026-11-20",
    sections: [
      {
        heading: "1. Skriv listen, før du åbner tilbudsaviserne",
        paragraphs: [
          "Start med at beslutte, hvad du faktisk mangler. Skriv en liste opdelt i nødvendige køb, ønsker og ting, du godt kan vente med. På den måde bliver det lettere at ignorere et godt tilbud på en vare, som du ikke havde brug for.",
          "Tjek også, hvad du allerede har derhjemme. Det gælder især husholdningsartikler, elektroniktilbehør og julegaver, hvor et ekstra køb hurtigt bliver en udgift i stedet for en besparelse.",
        ],
      },
      {
        heading: "2. Sammenlign førpris og enhedspris",
        paragraphs: [
          "Et nedsat prisskilt er kun nyttigt, hvis du kan sammenligne det med en pris, der faktisk har været gældende. Se efter varens normale pris, og tjek om rabatten gælder hele sortimentet eller kun udvalgte modeller.",
          "Sammenlign også enhedsprisen pr. kilo, liter eller styk. En stor pakke kan se billig ud, men være dyrere pr. enhed end en mindre pakke – eller blive for stor til dit forbrug.",
        ],
      },
      {
        heading: "3. Tjek lager, levering og retur",
        paragraphs: [
          "Før du køber, så tjek om varen er på lager, hvor lang leveringstiden er, og hvordan retur- og fortrydelsesreglerne virker. Det er særligt vigtigt ved elektronik, møbler og gaver, hvor en forkert model kan være besværlig at returnere.",
          "Hvis tilbuddet kræver et medlemskab, en app eller et særligt betalingskort, så læs betingelserne først. Et krav om ekstra tilmelding kan gøre besparelsen mindre, end den ser ud.",
        ],
      },
      {
        heading: "4. Brug TilbudJagt som et roligt overblik",
        paragraphs: [
          "På TilbudJagt kan du finde butikker og produkter samlet ét sted. Vi viser kun priser, når de kommer fra butikken selv, og vi markerer tydeligt, når et link er et reklamelink eller et direkte link til butikken.",
          "Brug overblikket til at sammenligne i dit eget tempo. Hvis et tilbud skaber tidspres, så tag en kort pause og tjek prisen igen, før du beslutter dig.",
        ],
      },
      {
        heading: "5. Hvornår er Black Friday og Cyber Monday i 2026?",
        paragraphs: [
          "Black Friday falder fredag den 27. november 2026, og Cyber Monday følger mandag den 30. november. Mange danske butikker starter kampagnerne flere dage før og fortsætter weekenden over, så det er værd at følge med i god tid.",
          "Det betyder ikke, at det bedste tilbud altid kommer først. Nogle butikker gemmer de største nedsættelser til selve fredagen, mens andre kører samme pris hele ugen. Sammenlign derfor over flere dage i stedet for at slå til med det samme.",
        ],
      },
      {
        heading: "6. Brug officielle rabatkoder og gem kvitteringen",
        paragraphs: [
          "Brug kun rabatkoder, der kommer fra butikken selv eller en officiel partner. På TilbudJagt samler vi officielle koder og aktuelle produkttilbud fra vores partnerbutikker på siden Rabatkoder. Kopier koden, og indtast den hos butikken, før du betaler.",
          "Efter købet bør du gemme ordrebekræftelse og kvittering, indtil varen er modtaget og testet. Så står du bedst, hvis du skal returnere eller gøre brug af garantien – også hvis du skifter mening efter Cyber Monday.",
        ],
      },
    ],
  },
{
    "slug": "indret-hjemmet-uden-overforbrug",
    "kicker": "Bolig",
    "title": "Indret hjemmet uden overforbrug: mål, materialer og samlet pris",
    "description": "Sådan vælger du møbler, tekstiler og belysning, der passer til hjemmet – og undgår at betale for meget for levering, montering og retur.",
    "lead": "Et flot hjem handler mere om mål, materialer og brug end om at købe flest ting. Her er en enkel tjekliste, før du bestiller møbler og interiør online.",
    "updated": "25. november 2026",
    "publishAt": "2026-11-25",
    "sections": [
      {
        "heading": "1. Mål rummet, før du forelsker dig i et møbel",
        "paragraphs": [
          "Mål gulvplads, vægge, døråbninger, trapper og elevator, før du bestiller. Marker møblets fodaftryk med malertape på gulvet, så du kan se, om der stadig er plads til at gå rundt og åbne skabe og døre.",
          "Tjek også højden på sofabord, spisebord og stole, hvis de skal bruges sammen. Et møbel, der passer på billedet, kan føles for stort eller for lavt, når det står i rummet."
        ]
      },
      {
        "heading": "2. Se på materialer og vedligehold",
        "paragraphs": [
          "Forskellen mellem massivt træ, finér og laminat er ikke kun prisen. Spørg, hvordan overfladen skal rengøres, og om der kan skaffes reservedele, hvis noget går i stykker. Til familiehjem er det ofte værd at vælge materialer, der kan tåle daglig brug.",
          "For tekstiler bør du tjekke vaskemærkning, slidstyrke og om farven kan smitte af. Et billigt tæppe eller en pude, der mister formen efter få vaske, er sjældent en god besparelse."
        ]
      },
      {
        "heading": "3. Brug lys og tekstiler til at samle rummet",
        "paragraphs": [
          "Kombinér gerne loftlys, gulvlampe og en mindre bordlampe, så rummet kan skifte mellem arbejdslys og hyggeligt lys. Tjek om lamperne kan dæmpes, og om pærerne har den farvetone, du ønsker.",
          "Gardiner, tæpper og puder kan ændre oplevelsen af et rum uden at du skal købe nye møbler. Mål vinduet, før du bestiller gardiner, og vælg tekstiler, der kan vaskes eller rengøres efter behov."
        ]
      },
      {
        "heading": "4. Luft og indeklima: tjek driftsomkostningerne",
        "paragraphs": [
          "Luft ud flere gange om dagen, og hold støv nede med regelmæssig rengøring. Hvis du overvejer en luftrenser, så se på rumstørrelse, filtertype, lydniveau og prisen på nye filtre – ikke kun på købsprisen.",
          "Ingen luftrenser erstatter udluftning og rengøring. Læs producentens officielle specifikationer, og kontroller retur- og garantivilkår, før du køber."
        ]
      },
      {
        "heading": "5. Regn den samlede pris – ikke kun møblet",
        "paragraphs": [
          "Læg levering, montering, afhentning af gammelt møbel og eventuel returfragt oveni prisen. Tjek også lagerstatus og leveringstid, så du ikke står uden møbel til en bestemt dato.",
          "Brug kun officielle rabatkoder, og sammenlign den endelige pris i kurven. Gem ordrebekræftelse og kvittering, indtil varen er modtaget og kontrolleret."
        ]
      }
    ],
    "relatedStores": [
      "house-lab",
      "copenhagenpure",
      "kispus",
      "hamam",
      "jotex"
    ],

  },
  {
    "slug": "proteinpulver-og-greens-guide",
    "kicker": "مكملات غذائية",
    "title": "Proteinpulver og greens: sådan vælger du uden at betale for meget",
    "description": "Lær at læse næringsdeklarationen, sammenligne pris pr. portion og vurdere ingredienser, før du køber proteinpulver eller greens.",
    "lead": "Proteinpulver og greens fås i mange blandinger og priser. Fokusér på indhold, portioner og dit faktiske forbrug – ikke på fronten af posen.",
    "updated": "25. november 2026",
    "publishAt": "2026-11-25",
    "sections": [
      {
        "heading": "1. Start med dit formål",
        "paragraphs": [
          "Beslut, om produktet skal bruges som et lille supplement i hverdagen, efter træning eller som en del af et større måltid. Dit behov bør styre valget mere end markedsføringen på posen.",
          "Hvis du har en sygdom, er gravid eller ammer, eller tager medicin, så spørg din læge eller en diætist, før du begynder på et nyt tilskud."
        ]
      },
      {
        "heading": "2. Læs næringsdeklarationen",
        "paragraphs": [
          "Sammenlign proteinindholdet pr. 100 gram og pr. portion – ikke kun tallet på forsiden. Se også på portionsstørrelse, sukker, fibre, vitaminer og mineraler, så du ved, hvad du faktisk får pr. servering.",
          "Et produkt med højt proteinindhold kan stadig indeholde mange kalorier eller tilsat sukker. Læs hele varedeklarationen, før du sammenligner to poser."
        ]
      },
      {
        "heading": "3. Sammenlign pris pr. portion",
        "paragraphs": [
          "Divider prisen med antallet af portioner i posen, og læg eventuel fragt til. En stor pose er ikke nødvendigvis billigst pr. portion, hvis den indeholder en lille scoop eller kræver mange gram pr. servering.",
          "Hvis du prøver et nyt mærke eller en ny smag, så start med en mindre pose. Det er bedre at teste, om du kan lide produktet, end at købe et stort lager, du ikke får brugt."
        ]
      },
      {
        "heading": "4. Tjek ingredienser, allergener og opbevaring",
        "paragraphs": [
          "Se på proteinkilden – for eksempel ærteprotein, risprotein eller valle – og på sødestoffer, aromaer og andre ingredienser. Tjek allergener, hvis du er følsom over for mælk, soja eller andre stoffer.",
          "Opbevar posen tørt og lukket, og følg holdbarhedsdatoen. Start med én portion og justér efter behov, i stedet for at erstatte hele måltider uden en plan."
        ]
      }
    ],
    "relatedStores": [
      "ampmshop",
      "core-nutrition",
      "healthwell",
      "bodylab"
    ],

  },
  {
    "slug": "koekken-og-husholdning-spar-penge",
    "kicker": "Køkken",
    "title": "Køkken og husholdning: sådan sparer du penge i hverdagen",
    "description": "Færre gadgets, bedre materialer og styr på filtre og rengøring kan gøre køkkenet både billigere og lettere at holde.",
    "lead": "Det er ikke antallet af køkkenting, der gør hverdagen nemmere. Her er, hvordan du vælger redskaber og husholdningsprodukter, der holder.",
    "updated": "25. november 2026",
    "publishAt": "2026-11-25",
    "sections": [
      {
        "heading": "1. Køb efter det, du bruger hver uge",
        "paragraphs": [
          "Skriv en liste over de redskaber, du faktisk bruger hver uge. Køb kun nye ting, hvis de løser en opgave, du allerede har – ikke fordi de ser smarte ud i en video.",
          "Lån eller prøv et redskab, før du køber et dyrt specialprodukt. Mange køkkengadgets bruges kun få gange og optager plads i skabet."
        ]
      },
      {
        "heading": "2. Vælg materialer, der kan holde",
        "paragraphs": [
          "Rustfrit stål, træ og visse plasttyper kan holde i mange år, hvis de vedligeholdes rigtigt. Tjek, om redskabet tåler opvaskemaskine, og om der findes reservedele eller nye pakninger.",
          "Undgå at bruge skarpe redskaber på belagte overflader, og følg producentens rengøringsråd. En slidt nonstick-pande er ikke nødvendigvis en besparelse, hvis den skal skiftes hurtigt."
        ]
      },
      {
        "heading": "3. Hold styr på vand, kalk og filtre",
        "paragraphs": [
          "Kontroller, hvor ofte filtre og kalkfjerner skal vedligeholdes, og hvad reservedelene koster. Den samlede udgift over et år kan være vigtigere end købsprisen.",
          "Afkalk kaffemaskine, kedel og andre apparater efter producentens anvisning. Hvis du installerer et filter, så følg manualen og skift filteret til tiden."
        ]
      },
      {
        "heading": "4. Rengør med færre produkter – og regn den samlede pris",
        "paragraphs": [
          "Ofte er mikrofiberklude, sæbe og et par rengøringsmidler nok til hverdagen. Læs doseringen, og undgå at blande rengøringskemikalier, som ikke er beregnet til det.",
          "Læg fragt, ekstra filtre og tilbehør oveni prisen, før du sammenligner. Brug officielle rabatkoder, og gem kvitteringen, så du kan reklamere, hvis varen ikke holder."
        ]
      }
    ],
    "relatedStores": [
      "kitchen-gadget",
      "kirlund",
      "cleanstream",
      "nordic-water",
    "brusefilteret",
    "aeloa"
  ],

  },
  {
    slug: "saadan-bruger-du-en-rabatkode",
    kicker: "Rabatkoder",
    title: "Sådan bruger du en rabatkode: tjek listen før du betaler",
    description:
      "Find officielle rabatkoder, læs betingelserne og undgå at betale for en kode, der ikke virker. En praktisk tjekliste til danske webshops.",
    lead:
      "En rabatkode kan spare dig penge, men kun hvis den er officiel, stadig gyldig og passer til din kurv. Her er rækkefølgen, vi selv bruger.",
    updated: "28. november 2026",
    publishAt: "2026-11-28",
    sections: [
      {
        heading: "1. Start med butikkens egne kanaler",
        paragraphs: [
          "Den mest pålidelige rabatkode findes normalt på butikkens egen hjemmeside, i dens nyhedsbrev eller i dens app. Mange butikker giver også en velkomstrabat, når du tilmelder dig nyhedsbrevet. Det er sjældent nødvendigt at betale for en kode, og du bør være varsom med sider, der kræver betaling eller mange personlige oplysninger, før du kan se koden.",
          "På TilbudJagt samler vi officielle koder fra vores partnerbutikker på siden Rabatkoder. Hvis der ikke er en aktiv kode til den butik, du leder efter, så brug butikkens egne tilbud og sammenlign den samlede pris i stedet for at jagte en kode, der måske er udløbet.",
        ],
        links: [
          { label: "Se alle rabatkoder", href: "/rabatkoder" },
          { label: "POWER", href: "/butikker/power" },
          { label: "Elgiganten", href: "/butikker/elgiganten" },
        ],
      },
      {
        heading: "2. Læs betingelserne, før du kopierer koden",
        paragraphs: [
          "En rabatkode er ikke et frit gavekort. De fleste koder har et minimumskøb, gælder kun for bestemte varegrupper, kræver en ny kundekonto eller kan ikke kombineres med andre tilbud. Nogle koder virker kun én gang pr. kunde, og andre udløber på en bestemt dato.",
          "Regn værdien igennem, hvis koden kræver et medlemskab eller et større køb, end du havde planlagt. En rabat på 100 kroner er ikke en besparelse, hvis du køber varer for 400 kroner, som du ellers ikke havde brugt.",
        ],
      },
      {
        heading: "3. Indtast koden i kurven – før du betaler",
        paragraphs: [
          "Læg varen i kurven, find feltet med rabatkode eller gavekort, og indsæt koden uden ekstra mellemrum. Tryk på knappen, der aktiverer koden, og kontrollér, at rabatten faktisk fremgår som en særskilt linje i ordreoversigten.",
          "Hvis rabatten ikke vises, så gå et skridt tilbage og prøv igen, før du betaler. Tag et skærmbillede af kurven og af ordrebekræftelsen, hvis rabatten er vigtig for din beslutning.",
        ],
      },
      {
        heading: "4. Hvis koden ikke virker",
        paragraphs: [
          "Kontrollér først, om koden er udløbet, om du har nået minimumskøbet, og om varen er omfattet af tilbuddet. Prøv også at indtaste koden i et almindeligt browservindue uden andre udvidelser, hvis feltet ikke reagerer.",
          "Hvis koden stadig ikke virker, så kontakt butikkens kundeservice, før du opretter en ny ordre. Undgå at gennemføre købet to gange, fordi det kan give ekstra arbejde med betaling og returnering.",
        ],
      },
      {
        heading: "5. Gem dokumentationen",
        paragraphs: [
          "Gem ordrebekræftelse, kvittering og et skærmbillede af rabatten, indtil varen er modtaget og kontrolleret. Det gør det lettere at dokumentere, hvad du faktisk betalte, hvis du senere skal returnere varen eller reklamere over en fejl.",
          "Ved retur beregnes tilbagebetalingen normalt ud fra det beløb, du betalte efter rabat. Derfor er det en god vane at gemme både førprisen og den endelige pris.",
        ],
      },
      {
        heading: "6. Brug koden som en del af en større beslutning",
        paragraphs: [
          "En rabatkode er kun én del af regnestykket. Sammenlign den samlede pris inklusive fragt, levering og eventuelle gebyrer, og overvej, om varen faktisk løser et behov, du har. En kode, der får dig til at købe noget unødvendigt, er dyrere end ingen rabat.",
          "Hvis du er i tvivl, så vent et døgn. Mange koder gælder i flere dage, og en kort pause gør det lettere at skelne et reelt behov fra et impulskøb.",
        ],
      },
    ],
    faq: [
      {
        question: "Kan jeg bruge flere rabatkoder på samme ordre?",
        answer:
          "Det afhænger af butikkens betingelser. Mange butikker tillader kun én rabatkode pr. ordre, og nogle koder kan ikke kombineres med udsalg eller medlemspriser. Læs vilkårene, før du betaler.",
      },
      {
        question: "Koster det noget at bruge en rabatkode?",
        answer:
          "Nej. En officiel rabatkode bør være gratis at bruge. Vær varsom med sider, der kræver betaling, abonnement eller følsomme oplysninger, før de viser en kode.",
      },
      {
        question: "Hvorfor virker min rabatkode ikke?",
        answer:
          "Koden kan være udløbet, kræve et minimumskøb, gælde en bestemt varegruppe eller allerede være brugt på din konto. Kontrollér betingelserne og kontakt butikken, hvis du er i tvivl.",
      },
      {
        question: "Får jeg hele beløbet tilbage, hvis jeg returnerer en vare købt med rabat?",
        answer:
          "Du får som udgangspunkt det beløb tilbage, du faktisk betalte efter rabat. Gem ordrebekræftelse og kvittering, så du kan dokumentere den endelige pris.",
      },
    ],
    relatedStores: ["elgiganten", "power", "jysk", "matas", "proshop"],
  },
  {
    slug: "power-tilbud-og-rabatkode",
    kicker: "Elektronik",
    title: "POWER tilbud og rabatkode: find en reel besparelse",
    description:
      "Sådan finder du POWERs aktuelle tilbud, vurderer rabatkoder og sammenligner den samlede pris på elektronik, før du køber.",
    lead:
      "POWER kører ofte kampagner, men et stort prisskilt er ikke det samme som en god pris. Her er en enkel metode til at tjekke tilbud og rabatkoder.",
    updated: "28. november 2026",
    publishAt: "2026-11-28",
    sections: [
      {
        heading: "Hvor finder du POWERs aktuelle tilbud?",
        paragraphs: [
          "Start på power.dk, i POWERs app og i butikkernes egne kampagnekanaler. Her fremgår gyldighedsperioden, lagerstatus og eventuelle betingelser. Vores butiksside samler et overblik og fører dig videre til butikken, så du kan tjekke den nyeste pris.",
          "Priser og lagerbeholdning kan ændre sig i løbet af dagen. Kontrollér derfor altid den endelige pris i kurven, før du betaler – især ved populære varer og i udsalgperioder.",
        ],
        links: [
          { label: "Se POWER-siden", href: "/butikker/power" },
          { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
          { label: "Printere og blæk", href: "/tilbud/printere-og-blaek" },
        ],
      },
      {
        heading: "Rabatkoder: brug kun dem, der kommer fra POWER selv",
        paragraphs: [
          "Der findes ikke altid en offentlig rabatkode til POWER. Når der er en kampagnekode, kommer den normalt fra POWERs egen hjemmeside, nyhedsbrev, app eller en officiel partner. En kode, der ligger på en tilfældig kuponside, kan være udløbet eller have betingelser, som ikke fremgår tydeligt.",
          "Betal aldrig for en rabatkode. Læs også, om koden gælder hele sortimentet eller kun udvalgte varer, og om den kan bruges sammen med et allerede nedsat produkt.",
        ],
      },
      {
        heading: "Sammenlign modelnummer og samlet pris",
        paragraphs: [
          "Elektronikprodukter kan hedde næsten det samme på tværs af årgange. Skriv det præcise modelnummer ned, og sammenlign den samme model hos flere forhandlere. En ældre model til en ny pris er ikke et godt tilbud.",
          "Læg levering, installation, ophugning af den gamle vare, tilbehør og eventuel forsikring oveni prisen. Hvis butikken tilbyder prismatch eller prisgaranti, så læs betingelserne, før du regner med den.",
        ],
      },
      {
        heading: "Black Friday og andre udsalg",
        paragraphs: [
          "Ved store udsalg er det især vigtigt at kende den normale pris i forvejen. Skriv prisen ned, når du ser en vare, du overvejer at købe senere, så du kan vurdere, om rabatten er reel.",
          "Tjek lagerstatus, leveringstid og returvilkår, før du slår til. Et tidsbegrænset tilbud er ikke en god handel, hvis varen ikke passer til dit behov, eller hvis den først leveres efter lang tid.",
        ],
      },
      {
        heading: "Returnering, garanti og reklamation",
        paragraphs: [
          "Når du handler online hos en dansk forhandler, har du som udgangspunkt 14 dages fortrydelsesret. Der kan være undtagelser for visse varer, så læs butikkens returvilkår, før du køber.",
          "Gem ordrebekræftelse og kvittering. Hvis varen er defekt, gælder reklamationsretten efter de danske regler – også efter at fortrydelsesfristen er udløbet.",
        ],
      },
    ],
    faq: [
      {
        question: "Har POWER altid en rabatkode?",
        answer:
          "Nej. POWER kører kampagner og tilbud, men der er ikke nødvendigvis en offentlig rabatkode hele tiden. Brug butikkens egne kanaler og sammenlign den samlede pris i stedet for at forvente en fast kode.",
      },
      {
        question: "Kan jeg bruge en rabatkode på et produkt, der allerede er nedsat?",
        answer:
          "Det afhænger af kampagnens betingelser. Nogle koder kan ikke kombineres med andre tilbud. Læs vilkårene, eller spørg butikkens kundeservice, før du betaler.",
      },
      {
        question: "Er POWER altid den billigste butik?",
        answer:
          "Det kan du ikke regne med. Prisen afhænger af model, tidspunkt og lager. Sammenlign det samme modelnummer og den samlede pris inklusive levering og eventuelle gebyrer.",
      },
      {
        question: "Hvordan vurderer jeg, om et POWER-tilbud er reelt?",
        answer:
          "Sammenlign med den pris, du selv har set tidligere, tjek modelnummeret, og regn levering og eventuelle ekstraomkostninger med. Et stort prisskilt er ikke i sig selv dokumentation for en reel besparelse.",
      },
    ],
    relatedStores: ["power", "elgiganten", "proshop", "komplett", "holdit"],
  },
  {
    slug: "elgiganten-rabatkode-og-tilbud",
    kicker: "Elektronik",
    title: "Elgiganten rabatkode og tilbud: tjek prisen før du køber",
    description:
      "Find Elgigantens officielle tilbud, forstå rabatkoder og sammenlign elektronikpriser uden at gå glip af levering, garanti og returvilkår.",
    lead:
      "Elgiganten er en af Danmarks største elektronikkæder, og tilbuddene skifter ofte. Her er, hvordan du tjekker et tilbud og en rabatkode uden at betale for meget.",
    updated: "28. november 2026",
    publishAt: "2026-11-28",
    sections: [
      {
        heading: "Find de officielle tilbud",
        paragraphs: [
          "De aktuelle tilbud findes på elgiganten.dk, i Elgigantens app og i butikkernes kampagnekanaler. Vores butiksside giver dig et samlet overblik og et direkte link til butikken, hvor du kan se den nyeste pris og lagerstatus.",
          "Kampagner kan have forskellige slutdatoer, og nogle varer sælges kun i begrænsede mængder. Tjek derfor datoen på det enkelte tilbud, før du tager afsted.",
        ],
        links: [
          { label: "Se Elgiganten-siden", href: "/butikker/elgiganten" },
          { label: "Mobiltelefoner", href: "/tilbud/mobiltelefoner" },
          { label: "Printere og blæk", href: "/tilbud/printere-og-blaek" },
        ],
      },
      {
        heading: "Rabatkoder og medlemsfordele",
        paragraphs: [
          "Elgiganten har ikke nødvendigvis en offentlig rabatkode til alle køb. Når der findes en kode eller en medlemsfordel, kommer den fra butikkens egne kanaler. Læs betingelserne for minimumskøb, varegrupper og gyldighed, før du regner med rabatten.",
          "Brug ikke en kode, som du har fået fra en ukendt side, uden at kontrollere den hos butikken. Betal heller ikke for en kode – en ægte rabatkode bør være gratis at bruge.",
        ],
      },
      {
        heading: "Sammenlign modelnummer og samlet pris",
        paragraphs: [
          "To produkter kan se ens ud, men have forskellige modelnumre, årgange og garantier. Skriv modelnummeret ned, og sammenlign den samme model hos andre forhandlere. Ellers risikerer du at sammenligne en ny model med en ældre udgave.",
          "Læg levering, installation, bortskaffelse af den gamle vare og tilbehør oveni prisen. Hvis butikken tilbyder prismatch, så læs de præcise betingelser, før du antager, at prisen automatisk matcher en anden butik.",
        ],
      },
      {
        heading: "Outlet og åbne kasser",
        paragraphs: [
          "Outletvarer og åbne kasser kan give en lavere pris, men tjek hvad der mangler af tilbehør, om varen har kosmetiske skader, og hvilken garanti der følger med. Læs også returvilkårene, før du køber.",
          "En åben kasse er ikke nødvendigvis et dårligt køb, men den skal sammenlignes med prisen på en ny vare med fuld garanti og tilbehør.",
        ],
      },
      {
        heading: "Black Friday og retur",
        paragraphs: [
          "Ved Black Friday og andre udsalg er det ekstra vigtigt at have en liste og et prismind. Tjek lager, leveringstid og returfrister, før du køber. Et stort prisskilt er ikke en garanti for, at prisen er den laveste i året.",
          "Gem ordrebekræftelse og kvittering. Ved onlinekøb gælder som udgangspunkt 14 dages fortrydelsesret, og reklamationsretten gælder, hvis varen er defekt.",
        ],
      },
    ],
    faq: [
      {
        question: "Har Elgiganten altid en rabatkode?",
        answer:
          "Nej. Elgiganten kører løbende kampagner, men der er ikke nødvendigvis en offentlig rabatkode hele tiden. Brug butikkens egne kanaler, og sammenlign den samlede pris.",
      },
      {
        question: "Kan jeg kombinere en rabatkode med et andet tilbud?",
        answer:
          "Det afhænger af betingelserne. Mange kampagner tillader ikke, at koden kombineres med udsalg eller andre rabatter. Læs vilkårene, før du betaler.",
      },
      {
        question: "Hvad betyder prismatch, og kan jeg regne med det?",
        answer:
          "Prismatch er en frivillig ordning, som butikken selv fastsætter reglerne for. Læs betingelserne, og sammenlign det samme modelnummer. Hvis ordningen ikke gælder, er den samlede pris stadig det vigtigste sammenligningsgrundlag.",
      },
      {
        question: "Er outletvarer dækket af garanti?",
        answer:
          "Det afhænger af varen og butikkens vilkår. Tjek, om der følger fuld garanti, om tilbehør mangler, og hvordan returretten fungerer, før du køber.",
      },
    ],
    relatedStores: ["elgiganten", "power", "proshop", "komplett", "holdit"],
  },
  {
    slug: "saadan-tjekker-vi-tilbud",
    kicker: "Om TilbudJagt",
    title: "Sådan tjekker vi tilbud og butikker",
    description:
      "Vores metode: hvordan vi vælger butikker, verificerer priser, mærker reklamelinks og retter fejl. Åbenhed om, hvad vi kan – og ikke kan – garantere.",
    lead:
      "Tillid kræver åbenhed. Her forklarer vi, hvordan TilbudJagt samler butikker og tilbud, hvordan vi tjener penge, og hvordan du kan få en fejl rettet.",
    updated: "28. november 2026",
    publishAt: "2026-11-28",
    sections: [
      {
        heading: "Hvem står bag TilbudJagt?",
        paragraphs: [
          "TilbudJagt.dk er en uafhængig dansk tilbuds- og butiksoversigt. Vi samler butikker, produktfeeds, rabatkoder og redaktionelle guides for at gøre det lettere at sammenligne et tilbud, før du køber.",
          "Vi er ikke en butik og sælger ikke varerne selv. Hvis du har spørgsmål om en ordre, en levering eller en returnering, skal du kontakte den butik, du har handlet hos.",
        ],
        links: [
          { label: "Om TilbudJagt", href: "/about.html" },
          { label: "Kontakt os", href: "/contact.html" },
        ],
      },
      {
        heading: "Hvordan vælger vi butikker?",
        paragraphs: [
          "Vi viser et bredt udvalg af danske butikker fordelt på dagligvarer, elektronik, hjem, mode, skønhed, sport og personlig pleje. Nogle butikker er godkendte partnere med et affiliate-link, mens andre vises som direkte links uden provision.",
          "En partneraftale er ikke en betingelse for at blive vist i oversigten. Vi bestræber os på at gøre forskellen tydelig, så du kan se, hvornår et link er et reklamelink, og hvornår det er et almindeligt link til butikken.",
        ],
      },
      {
        heading: "Hvordan verificerer vi priser og tilbud?",
        paragraphs: [
          "Mange priser kommer fra butikkernes egne produktfeeds, som kan opdateres med mellemrum. På butikssiderne angiver vi, hvornår indholdet sidst er kontrolleret, når en sådan dato er tilgængelig.",
          "Vi kan ikke garantere, at en pris er gældende i det øjeblik, du besøger butikken. Lager, kampagner og leveringsvilkår kan ændre sig. Den pris, der vises i butikkens kurv, er den gældende pris.",
        ],
      },
      {
        heading: "Sådan mærker vi reklame",
        paragraphs: [
          "Nogle links er affiliate-links. Hvis du klikker på et sådant link og køber en vare, kan vi modtage en provision fra butikken. Provisionen lægges ikke oveni den pris, du betaler.",
          "Vi mærker kommercielle links med «Reklamelink» eller en tilsvarende forklaring, og de tekniske links er markeret med rel-attributter som sponsored og nofollow. Du kan læse mere i guiden Affiliate-links forklaret.",
        ],
        links: [
          { label: "Affiliate-links forklaret", href: "/guides/affiliate-links-forklaret" },
          { label: "Se rabatkoder", href: "/rabatkoder" },
        ],
      },
      {
        heading: "Sådan retter vi fejl",
        paragraphs: [
          "Hvis du finder en pris, der er forkert, et link der ikke virker, eller et tilbud der er udløbet, så skriv til os med sidens adresse og gerne et skærmbillede. Vi prioriterer fejl, der kan føre til et forkert køb.",
          "Vi retter indholdet, når vi kan bekræfte fejlen, og vi fjerner eller opdaterer tilbud, der ikke længere er gyldige. Vi kan ikke garantere en bestemt responstid, men vi læser alle henvendelser.",
        ],
        links: [{ label: "Kontakt os", href: "/contact.html" }],
      },
      {
        heading: "Hvad vi ikke gør",
        paragraphs: [
          "Vi opfinder ikke rabatkoder, vi skriver ikke falske anmeldelser, og vi lover ikke en bestemt besparelse. Guiderne er generel forbrugerinformation, ikke personlig rådgivning.",
          "Hvis en butik eller et tilbud ikke lever op til vores forventninger, kan vi fjerne det fra oversigten. Men vi kan ikke garantere, at alle butikker altid har de laveste priser, eller at alle tilbud er tilgængelige i hele landet.",
        ],
      },
    ],
    faq: [
      {
        question: "Tjener TilbudJagt penge på mine køb?",
        answer:
          "Nogle gange. Hvis du køber via et affiliate-link, kan vi modtage en provision fra butikken. Det koster ikke ekstra for dig, og det påvirker ikke den pris, du betaler.",
      },
      {
        question: "Er alle butikker på TilbudJagt partnere?",
        answer:
          "Nej. Oversigten indeholder både godkendte partnere med affiliate-links og butikker, der vises som direkte links uden provision. Vi markerer forskellen, så du kan se, hvornår et link er kommercielt.",
      },
      {
        question: "Kan jeg regne med, at prisen på siden er den nyeste?",
        answer:
          "Priser kan ændre sig, og vi kan ikke garantere, at de er opdateret i det øjeblik, du læser dem. Kontrollér altid den endelige pris i butikkens kurv, før du betaler.",
      },
      {
        question: "Hvordan får jeg rettet en fejl på siden?",
        answer:
          "Send os en besked via kontaktformularen med sidens adresse og gerne et skærmbillede. Beskriv kort, hvad der er forkert, så vi kan undersøge det.",
      },
    ],
    relatedStores: ["proshop", "power", "matas", "jysk"],
  },

];

export function isGuidePublished(guide: Guide, now = new Date()): boolean {
  if (!guide.publishAt) return true;
  return new Date(`${guide.publishAt}T00:00:00+01:00`).getTime() <= now.getTime();
}

export function getPublishedGuides(now = new Date()): Guide[] {
  return GUIDES.filter((guide) => isGuidePublished(guide, now));
}

export function getGuide(slug: string, now = new Date()): Guide | undefined {
  const guide = GUIDES.find((item) => item.slug === slug);
  return guide && isGuidePublished(guide, now) ? guide : undefined;
}
