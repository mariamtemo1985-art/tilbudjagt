export type GuideSection = { heading: string; paragraphs: string[] };

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
