// ── Dublin Chronicle prompt — 1916–2000 ──────────────────────────────────────
// One year per API call. Maximum detail. Every field fully populated.

export function buildBatchPrompt(startYear: number, endYear: number): string {
  return buildYearPrompt(startYear);
}

function getYearContext(year: number): string {
  const contexts: Record<number, string> = {
    1916: "Easter Rising. Easter Monday April 24th. The GPO seized. Six days of fighting. Fifteen executions at Kilmainham. The Republic proclaimed. Dublin in ruins. Public opinion transforms.",
    1917: "Aftermath of the Rising. Sinn Féin reorganises under de Valera. By-elections swing nationalist. Internees return from Frongoch radicalised. The Irish Volunteers rebuild. Ireland watches Russia revolution.",
    1918: "The Conscription Crisis unites all nationalist Ireland. Sinn Féin wins 73 seats in the December Westminster election. The First Dáil is about to meet. Spanish flu kills thousands across Dublin. WWI ends.",
    1919: "January 21st: First Dáil meets at the Mansion House. The War of Independence begins. The RIC is targeted. Collins builds his intelligence network. The Squad is formed. Dublin Castle on the defensive.",
    1920: "The War of Independence intensifies. Bloody Sunday November 21st — Collins's Squad kills 14 British intelligence officers; the Black and Tans kill 14 civilians at Croke Park. The burning of Cork. Martial law.",
    1921: "The War of Independence peaks then pauses. A Truce is agreed July 11th. Negotiations in London. Collins and Griffith sign the Anglo-Irish Treaty December 6th. The Dáil debates begin. Ireland holds its breath.",
    1922: "The Treaty splits Ireland. The Dáil ratifies it narrowly. The Four Courts occupied by anti-Treaty forces. June 28th: Free State shelling of the Four Courts begins the Civil War. Michael Collins killed August 22nd at Béal na Bláth. Griffith dies August 12th. Dublin in shock.",
    1923: "The Civil War ends May 24th with anti-Treaty forces dumping arms. The Free State consolidates. De Valera arrested. Thousands interned. The new state builds institutions from scratch. Grief, bitterness, exhaustion.",
    1924: "The Irish Free State finds its footing. Army mutiny crisis. The Garda Síochána replaces the RIC. The Boundary Commission stirs tension. Dublin slowly recovers. Unemployment high. Emigration resumes.",
    1925: "The Boundary Commission report is suppressed — the border stays as it is. Political disillusionment. The Free State joins the League of Nations. Cultural life begins to reassert itself. The Abbey Theatre flourishes.",
    1926: "De Valera founds Fianna Fáil. The political landscape shifts. The Gate Theatre opens. Seán O'Casey's plays cause controversy at the Abbey. The Irish economy remains weak. A new chapter begins.",
    1927: "The assassination of Kevin O'Higgins shocks the Free State. De Valera and Fianna Fáil enter the Dáil under the Electoral Amendment Act. Two general elections in one year. Emigration continues to bleed the country.",
    1928: "W.B. Yeats's The Tower published. The government's censorship apparatus tightens. The Shannon Scheme nears completion. The Boundary Commission fallout still raw. Dublin's housing crisis worsens.",
    1929: "The Shannon Scheme opens at Ardnacrusha. The Wall Street Crash in October reverberates in Ireland. The Censorship of Publications Act passed, banning dozens of books and authors.",
    1930: "The Great Depression's effects deepen. Unemployment rises sharply. The Irish Hospitals Sweepstakes launches. Conservative economic policies dominate.",
    1931: "The IRA declared illegal under Article 2A. Saor Éire alarms the establishment. The Church and State united in condemnation. Tension on the streets of Dublin.",
    1932: "Fianna Fáil wins the general election — de Valera becomes President of the Executive Council. The Economic War with Britain begins. The Eucharistic Congress brings over a million to Dublin.",
    1933: "Fianna Fáil wins another overall majority. The Blueshirt movement merges with Cumann na nGaedheal to form Fine Gael. Street confrontations in Dublin. The IRA legalised.",
    1934: "The Blueshirt movement collapses. De Valera dismantles Treaty provisions. The Economic War grinds on. Dublin's working class squeezed.",
    1935: "The Sale of Contraceptives Act passed. Catholic social teaching increasingly written into law. Dublin slum clearances begin on Henrietta Street and the Liberties.",
    1936: "The IRA banned again under de Valera. The Spanish Civil War begins — Irish volunteers head to both sides. De Valera uses the abdication crisis to remove the Crown from the Free State constitution via the External Relations Act. A new constitution is being drafted. The old order is ending.",
    1937: "De Valera's new Constitution enacted — Bunreacht na hÉireann replaces the Free State. Articles 2 and 3 claim jurisdiction over Northern Ireland. The Catholic Church's special position enshrined. A referendum passes narrowly. Ireland is renamed Éire. A general election held on the same day. The country remade on paper.",
    1938: "The Anglo-Irish Agreements end the Economic War. Britain hands back the Treaty Ports — Cobh, Berehaven, Lough Swilly. De Valera hailed as a diplomatic triumph. Douglas Hyde elected first President of Ireland. A general election returns Fianna Fáil. European war clouds gathering — Ireland's neutrality under quiet preparation.",
    1939: "The IRA's S-Plan bombing campaign in Britain embarrasses neutral Ireland. The Emergency Powers Act passed. De Valera declares neutrality as WWII begins September 3rd. The Irish Army mobilised. Rationing begins. Dublin goes dark — blackout curtains and turf shortages. The war is called 'The Emergency'.",
    1940: "The Emergency deepens. Rationing of tea, sugar, bread, fuel. The LDF (Local Defence Force) recruited. German and British agents operate in Ireland. De Valera walks the diplomatic tightrope. Coal replaced by turf. Dublin buses run on gas bags. A city sealed off from the world's catastrophe.",
    1941: "German bombs fall on the North Strand, Dublin, May 31st — 34 killed, 90 houses destroyed. Ireland sends fire brigades north to help Belfast after the Blitz. The Emergency bites harder — bread rationed, gas restricted, horses return to city streets. American pressure on Irish neutrality mounts.",
    1942: "The Emergency at its most austere. American troops arrive in Northern Ireland — pressure on Dublin intensifies. Wheat rationing means dark bread only. TB kills thousands in the tenements. Emigration to Britain for war work accelerates despite official disapproval. Dublin Opinion magazine captures the gallows humour.",
    1943: "A general election — Fianna Fáil loses its majority but retains power. De Valera's famous 'frugal comfort' speech describes an Ireland of cosy homesteads and comely maidens — later mocked. The war grinds on. Dublin's population swells with people avoiding conscription in Britain. Fuel crisis reaches its worst.",
    1944: "The American Note demands Ireland expel Axis diplomats — de Valera refuses publicly. Allied pressure peaks. D-Day June 6th — Dubliners follow the news on the BBC despite official neutrality. A snap general election returns Fianna Fáil with an overall majority. The war is turning.",
    1945: "Germany surrenders May 8th — VE Day celebrated quietly in Dublin while officially ignored. De Valera controversially visits the German legation to offer condolences on Hitler's death. Japan surrenders August. The Emergency formally ends. Rationing continues. The world has changed utterly; Ireland must now engage with it.",
    1946: "Post-war austerity continues. Bread rationing is introduced despite the war being over, due to global wheat shortages. Clann na Poblachta founded by Seán MacBride, drawing republican dissidents. The first stirrings of a political challenge to Fianna Fáil dominance.",
    1947: "The harshest winter of the century — the Great Freeze paralyses Ireland January–March. Snow blocks roads, cuts off villages, kills livestock. Dublin grinds to a halt. A fuel crisis on top of existing shortages. Clann na Poblachta wins two by-elections. De Valera calls a snap election.",
    1948: "The First Inter-Party Government formed — Fine Gael, Labour, Clann na Poblachta and others oust Fianna Fáil after 16 years. John A. Costello as Taoiseach. The Republic of Ireland Act passed. Dublin reacts with surprise and pride. The mother and child scheme quietly begins its controversial journey.",
    1949: "The Republic of Ireland Act comes into force April 18th — Easter Monday. Ireland formally leaves the Commonwealth. The Ireland Act in Britain guarantees Northern Ireland's position. NATO formed — Ireland refuses to join while partition lasts. The old wounds of the national question still raw beneath the new republic's surface.",
    1950: "Post-war austerity easing slightly. The Korean War begins — Ireland stays out. Archbishop McQuaid's influence over Dublin life at its peak. The Mother and Child Scheme controversy brewing. Emigration from Dublin and rural Ireland to Britain continues to hollow out the country.",
    1951: "Dr Noel Browne's Mother and Child Scheme collapses — the Catholic bishops object to state medical care bypassing Church structures. Browne resigns. The episode lays bare Church power over Irish politics. De Valera returns to power. Dublin's tenements still housing thousands in Victorian squalor.",
    1952: "De Valera's Fianna Fáil pursuing austere protectionist policies. Emigration at flood tide — net emigration over 40,000 per year. The GAA's ban on foreign games fiercely defended. Dublin's first television sets appearing in shop windows, receiving BBC signals from Wales.",
    1953: "Coronation of Queen Elizabeth II — Irish state officially indifferent, but thousands of Dubliners watch on neighbours' televisions. The IRA reorganising quietly. A new generation of Irish writers — Beckett, Behan, Kavanagh — making names abroad while often banned at home.",
    1954: "A Fine Gael-led coalition takes power. Dublin's first supermarket opens. Rock and roll audible on American Forces Network heard in Dublin homes. The IRA's border campaign being planned. Ireland's economy stagnant under protectionism. The young and educated leaving in their thousands.",
    1955: "Ireland admitted to the United Nations — a significant moment for a small neutral republic. The IRA border campaign imminent. The showband era beginning — the Clipper Carlton and Royal Showband touring Ireland. Brendan Behan's The Quare Fellow staged in London. BBC visible on Dublin aerials.",
    1956: "The IRA launches Operation Harvest — the Border Campaign begins December 12th. Dublin government cracks down. The Suez Crisis and Hungarian uprising dominate international news. Ronnie Delaney wins the 1500m gold at the Melbourne Olympics — Dublin goes wild with pride.",
    1957: "Fianna Fáil returns to power — de Valera Taoiseach for the last time. T.K. Whitaker appointed Secretary of the Department of Finance — the quiet architect of Irish economic transformation. The IRA Border Campaign drags on inconclusively. Ireland in economic crisis — the worst since the 1930s.",
    1958: "T.K. Whitaker's Programme for Economic Expansion published — a blueprint for opening Ireland to foreign investment, ending protectionism. De Valera elected President; Seán Lemass becomes Taoiseach. A pivot moment in Irish economic history. The old self-sufficiency model quietly abandoned.",
    1959: "Lemass as Taoiseach signals a new Ireland — outward-looking, growth-focused, pro-foreign investment. The IRA Border Campaign sputtering out. Aer Lingus expanding transatlantic routes. Television coming — RTÉ being planned. Dublin beginning a slow transformation from grey austerity city to something new.",
    1960: "The UN Mission to the Congo — Irish Army soldiers deployed as peacekeepers, nine killed at Niemba November 8th. The country in shock. Ireland's international profile rising. The decade of modernisation beginning. Dublin starting to feel the first tremors of change.",
    1961: "RTÉ Television launches New Year's Eve, December 31st — Ireland's first national broadcaster. The country gathers around rented sets. Seán Lemass pursuing the First Programme for Economic Expansion. Ireland applies to join the EEC. John F. Kennedy is US President — huge resonance in Dublin.",
    1962: "RTÉ's first full year transforms Irish cultural life. The Late Late Show launches — Gay Byrne's long reign begins. The Second Vatican Council opens in Rome. The Cuban Missile Crisis grips Dublin in October. New factories opening across the country with foreign investment.",
    1963: "President John F. Kennedy visits Ireland June 26–29 — Dublin's welcome is extraordinary. Assassinated in Dallas November 22nd — Ireland mourns as if one of its own. The Late Late Show already controversial. The decade accelerating.",
    1964: "The Beatles come to Dublin — screaming at the Adelphi Cinema. The showband era at its peak. Economic growth continuing. RTÉ cementing itself in Irish culture. Northern Ireland tensions simmering. Douglas Gageby pivots the Irish Times leftward and nationalist.",
    1965: "Lemass meets Northern Ireland Prime Minister Terence O'Neill at Stormont — a historic handshake, condemned by hardliners on both sides. Free secondary education proposed by Donogh O'Malley. Dublin expanding rapidly into new suburbs. The Swinging Sixties arriving, slightly delayed.",
    1966: "The 50th anniversary of the Easter Rising — massive commemorations in Dublin. De Valera, 83, salutes the march. The Nelson Pillar on O'Connell Street blown up by republicans March 8th. Jack Lynch becomes Taoiseach, replacing Lemass.",
    1967: "Donogh O'Malley's free secondary education scheme comes into effect — transforming access to education. The Troubles beginning to stir in Northern Ireland. Dublin's youth culture fully alive — the Zhivago Club, the Crystal Ballroom. The Civil Rights movement rising in the North.",
    1968: "Northern Ireland Civil Rights Association marching — Derry, October 5th, police baton the marchers on camera. The images shock Dublin. Tensions rising rapidly. Dublin's younger generation politically awakening. Students at UCD and TCD protesting. The island's equilibrium disturbing.",
    1969: "The Troubles explode in Northern Ireland. The August Pogrom in Belfast — Catholic families flee south to Dublin. The Irish Army sets up field hospitals near the border. Jack Lynch's emotional television address. The Arms Crisis seeds are sown. Dublin marches in solidarity. The island fractures.",
    1970: "The Arms Crisis — Ministers Charles Haughey and Neil Blaney sacked by Lynch, accused of illegally importing arms for Northern nationalists. Haughey tried and acquitted. The IRA splits into Official and Provisional wings. The SDLP formed. Dublin politics convulsed.",
    1971: "Internment without trial introduced in Northern Ireland August 9th — Dublin's reaction furious. Torture allegations. The Irish pound decimalised February 15th — new pence replace old shillings. The Provisional IRA's bombing campaign intensifying. Lynch under pressure from all sides.",
    1972: "Bloody Sunday January 30th — British paratroopers kill 14 civilians in Derry. Dublin erupts. The British Embassy on Merrion Square burned February 2nd by a vast angry crowd. Direct Rule imposed on Northern Ireland. The Offences Against the State Act passed in Dublin. The darkest year of the Troubles.",
    1973: "Ireland joins the EEC January 1st alongside Britain and Denmark — a transformative moment. The Sunningdale Agreement creates a power-sharing executive in the North. The Liam Cosgrave-led National Coalition takes power. The oil crisis hits hard. Dublin's first McDonald's opens.",
    1974: "The Ulster Workers' Council Strike brings down the Sunningdale power-sharing executive. The Dublin and Monaghan bombings May 17th — loyalist bombs kill 33 people in Dublin city centre and Monaghan, the deadliest day of the Troubles. Dublin in shock and grief. Hope for peace destroyed.",
    1975: "The IRA ceasefire and its collapse. The Troubles grinding on. Ireland's economy hit hard by the oil crisis and recession. The Equal Pay Act and the Employment Equality Act passed. Unemployment rising. RTÉ's Late Late Show still the national conversation.",
    1976: "The British Ambassador Christopher Ewart-Biggs assassinated in Dublin July 21st — an IRA landmine. A State of Emergency declared. President Ó Dálaigh resigns after being called a 'thundering disgrace' by a minister. Patrick Hillery becomes President. Ireland deepening security measures.",
    1977: "Fianna Fáil wins a landslide general election — Jack Lynch returns as Taoiseach with the largest majority in the state's history. The manifesto promises to abolish rates and car tax. The economy seemingly booming but borrowing heavily. Haughey returning to cabinet.",
    1978: "Ireland hosting the Eurovision Song Contest. The economy growing on borrowed money. Disco arriving in Dublin. The punk scene at the Baggot Inn and McGonagles. Bob Geldof and the Boomtown Rats. U2 forming in Mount Temple Comprehensive.",
    1979: "Pope John Paul II visits Ireland September 29th — over a million attend mass in Phoenix Park, the largest gathering in Irish history. Lord Mountbatten assassinated by the IRA at Mullaghmore. Jack Lynch resigns — Charles Haughey becomes Taoiseach. A dramatic hinge year.",
    1980: "Haughey's famous television address — 'We are living beyond our means.' The national debt soaring. The first hunger strike in the Maze Prison begins and ends inconclusively. The Stardust fire February 14th kills 48 young people in Artane, Dublin — the city's worst peacetime disaster.",
    1981: "Bobby Sands begins his hunger strike March 1st — elected MP for Fermanagh-South Tyrone while on hunger strike. Dies May 5th. Nine more hunger strikers die. Dublin demonstrations. A general election — Garret FitzGerald forms a Fine Gael/Labour coalition. The National Concert Hall opens.",
    1982: "A year of political chaos — two general elections. Charles Haughey returns to power in March, loses in November. Garret FitzGerald back as Taoiseach. The Falklands War divides Irish opinion. Unemployment reaches 13% and climbing. The 'GUBU' year — grotesque, unbelievable, bizarre, unprecedented.",
    1983: "The Eighth Amendment referendum — the constitutional ban on abortion passes 66.9% to 33.1%. Divisive and bitter. The New Ireland Forum begins. The Dunnes Stores strike over apartheid South Africa's goods begins, led by Mary Manning. Unemployment over 15%. Emigration of the educated young accelerating.",
    1984: "The New Ireland Forum Report published. Thatcher rejects all three options with brutal 'Out, out, out.' The Kerry Babies case shocks the country — Joanne Hayes, the tribunal, the cruelty of public Ireland. Unemployment still rising. U2's Unforgettable Fire released.",
    1985: "The Anglo-Irish Agreement signed November 15th by Thatcher and FitzGerald — gives the Irish government a consultative role in Northern Ireland. Unionist fury. Dublin cautiously optimistic. Live Aid July 13th — Bob Geldof organises the world. Ireland punching above its weight culturally.",
    1986: "The Divorce Referendum fails — 63.5% vote No. Unemployment over 17%. The emigration crisis acute — 30,000 leaving per year, mainly the young educated. Haughey returns to opposition leadership. Moving Statues appearing around the country. The country stuck.",
    1987: "Fianna Fáil returns to power — Haughey implements savage cuts despite election promises. The Tallaght Strategy: Fine Gael's Alan Dukes supports the cuts from opposition. The economy beginning painful adjustment. Emigration at its peak — 70,000 leave in 1987 alone.",
    1988: "Dublin's Millennium — the city celebrates 1,000 years since its Viking founding. The Liffey boardwalk opened. Anna Livia fountain installed — quickly nicknamed 'the floozie in the jacuzzi'. Economic green shoots appearing. Three IRA members shot by SAS in Gibraltar — the Milltown massacre follows.",
    1989: "Haughey's Fianna Fáil enters coalition for the first time — with the Progressive Democrats. A historic breach with republican tradition. The Berlin Wall falls November 9th — Dublin celebrates. The Irish economy quietly turning. The 1980s ending with cautious hope.",
    1990: "Mary Robinson elected President of Ireland — the first woman, a secular liberal lawyer. Ireland reaches the World Cup quarter-finals in Italia '90 — the country stops, pubs packed, Jack's Army beloved. Dublin transformed by the football summer. The decade beginning explosively.",
    1991: "The tribunals beginning to probe the past — the Beef Tribunal established, Charles Haughey's finances under scrutiny. The Gulf War — Ireland's neutrality tested. Robinson as President reshaping the office — a window that people should keep open. Haughey's long decline accelerating.",
    1992: "Haughey resigns — replaced by Albert Reynolds. The X Case convulses the nation — a 14-year-old rape victim prevented from travelling to Britain for an abortion. Massive street protests in Dublin. Three referendums on abortion held in November. Bishop Eamonn Casey affair breaks — child, money, hypocrisy.",
    1993: "The Downing Street Declaration December 15th — Major and Reynolds set out the framework for peace in Northern Ireland. The IRA bombing of Warrington in March kills two children — Dublin revulsion. Homosexuality decriminalised in Ireland. Dublin becoming cosmopolitan. The economic transformation accelerating.",
    1994: "The IRA ceasefire August 31st — unprecedented. Dublin erupts in guarded joy. The Loyalist ceasefire follows. Riverdance first performed at the Eurovision Song Contest interval — six minutes that change Irish cultural confidence globally. Albert Reynolds falls over the Brendan Smyth affair. Bertie Ahern begins his rise.",
    1995: "The Divorce Referendum passes — narrowly, 50.3% to 49.7%. Ireland finally allowing civil divorce. The peace process holding. The Celtic Tiger arriving — Dublin visible as a city transforming: cranes, development, new restaurants, new money. Seamus Heaney wins the Nobel Prize for Literature.",
    1996: "The IRA ceasefire breaks down February 9th — the Canary Wharf bomb in London. Journalist Veronica Guerin shot dead June 26th by drug gang associates — the murder shocks Ireland and leads to new anti-crime legislation. The Celtic Tiger roaring. Property prices beginning their inexorable rise.",
    1997: "The IRA ceasefire restored July 20th. Bertie Ahern's Fianna Fáil wins the general election — he becomes Taoiseach. Mary McAleese elected President. The Celtic Tiger fully arrived — unemployment below 8% and falling, immigration beginning where emigration once ruled.",
    1998: "The Good Friday Agreement signed April 10th — the culmination of years of diplomacy. Overwhelming support in referendums North and South. Bertie Ahern and Tony Blair. The Omagh bombing August 15th kills 29 — the last major atrocity of the Troubles. Dublin celebrates peace with wariness.",
    1999: "The Good Friday Agreement institutions begin — the Assembly, the North-South bodies. Ireland joins the single European currency — the euro replaces the punt. Celtic Tiger at its peak — Dublin unrecognisable from a decade ago: traffic gridlock, construction cranes, tech companies, restaurants. The Tribunals exposing systemic corruption.",
    2000: "The millennium arrives — Y2K feared, nothing falls. The Celtic Tiger roaring: GDP growth above 10%, unemployment at 4%, immigration now exceeding emigration for the first time in modern Irish history. Dublin's Docklands being rebuilt. House prices doubled in five years. A generation of young Irish people have never known austerity. The century closes on an Ireland utterly transformed.",
  };
  return contexts[year] ?? `Year ${year} of Ireland.`;
}

function buildYearPrompt(year: number): string {
  const context = getYearContext(year);
  const isRising = year === 1916;
  const isWarOfInd = year >= 1919 && year <= 1921;
  const isCivilWar = year === 1922 || year === 1923;
  const isAftermath = year === 1917 || year === 1918;
  const isSettlement = year >= 1924 && year <= 1926;
  const isInterWar = year >= 1927 && year <= 1939;
  const isEmergency = year >= 1939 && year <= 1945;
  const isPostWar = year >= 1946 && year <= 1959;
  const isSixties = year >= 1960 && year <= 1969;
  const isSeventies = year >= 1970 && year <= 1979;
  const isEighties = year >= 1980 && year <= 1989;
  const isNineties = year >= 1990 && year <= 2000;
  const isTroubles = year >= 1969 && year <= 1998;
  const isDecimalCurrency = year >= 1971;
  const currencyNote = isDecimalCurrency
    ? "Use decimal currency (pence/pounds sterling, e.g. '18p', '£1.20')."
    : "Use pre-decimal currency (shillings and pence, e.g. '3d', '2s 6d').";
  const hasRTE = year >= 1962;
  const hasLeagueOfIreland = year >= 1921;

  return `You are generating an exhaustively detailed historical record for a newspaper-style website called The Dublin Chronicle. The audience is the general public — Irish people, history enthusiasts, students. Every field must be rich, specific, and gripping. This is living history.

Generate the record for the year ${year}.

CONTEXT FOR THIS YEAR:
${context}

CRITICAL RULES:
- All facts must be historically accurate. Real names, real dates, real places, real outcomes.
- This is Dublin-focused but covers all of Ireland when events directly affect the capital.
- Write in the voice of a serious historical record — vivid, authoritative, specific.
- Never use vague generalities. Every sentence should contain a concrete fact.
- Minimum word counts are hard floors, not targets — write more if the year warrants it.
- price_of_a_pint MUST be included — this is displayed prominently in the newspaper layout.
- ${currencyNote}
- Output must be valid JSON only. No markdown, no code fences, no explanation.

---

OUTPUT FORMAT — return exactly this JSON structure:

{
  "place": "Dublin",
  "year": ${year},
  "tier": "chronicle",

  "taoiseach": "Full name of the Taoiseach (or President of the Executive Council for Free State era) in office for the majority of ${year}. One sentence on where they stood politically this year. For 1916–1922, name the relevant British Chief Secretary or Lord Lieutenant instead.",

  "timeline_summary": "3–4 sentences. Open with the single most important thing about Dublin in ${year}. Then cover the political situation, the economic conditions, and the mood of the city. Be specific — name events, name people, give dates. Minimum 80 words.",

  "visual_scene": "4–5 sentences. Stand the reader on a specific Dublin street on a specific day in ${year}. Name the street. Describe what they see, hear, smell. What are people wearing. What vehicles pass. What conversations are people having. What posters or notices are on the walls. What is the emotional atmosphere. Minimum 100 words.",

  "city_changes": [
    "Minimum 6 items. Each is 2–3 sentences describing a specific, concrete change to Dublin in ${year}. Infrastructure, demographics, economics, politics, public health, housing, commerce. Name streets, buildings, organisations, individuals. Each item minimum 40 words."
  ],

  "major_events": [
    "Minimum 8 items. Each is a detailed account of one major event. Format: '[Event name, specific date] — [2–3 sentences describing what happened, who was involved, what the consequences were for Dublin and Ireland]. Name real people. Give real dates. Minimum 50 words each."
  ],

  "population_estimate": "Specific figure for Dublin city with context. Include city boundary figure, greater Dublin area if relevant, and one sentence on what was driving population change in ${year}.",

  "transport_snapshot": [
    "Minimum 5 items. Each describes a specific transport mode or route in Dublin in ${year} — tram routes, rail lines, buses, operators, fares, disruptions, new services. 2 sentences each minimum."
  ],

  "architecture_style": [
    "Minimum 4 items. Each names a specific architectural style visible in Dublin in ${year} and gives a real named building or street as example. Note any buildings damaged, destroyed, demolished, or newly constructed this year."
  ],

  "major_industries": [
    "Minimum 5 items. Each names a specific industry or employer in Dublin in ${year} and gives 2 sentences on its significance — workforce size, conditions, impact of political events, exports, strikes."
  ],

  "key_locations": [
    "Minimum 8 items. Each is a specific Dublin place that mattered in ${year}. Format: 'Place name — 2–3 sentences on why it was significant specifically in ${year}, what happened there, who went there.' Mix streets, pubs, offices, institutions, landmarks."
  ],

  "timeline_tags": [
    "8–12 short tags. Mix political, social, cultural. Examples: easter_rising, executions, martial_law, war_of_independence, civil_war, treaty, partition, reconstruction, emigration, tenement_crisis, labour, cultural_revival"
  ],

  "elections": [
    {
      "type": "General Election or By-election or Referendum",
      "result_summary": "2–3 sentences on the result and its specific impact on Dublin and Ireland.",
      "winning_party": "party name"
    }
  ],

  "gaa_finals": [
    {
      "championship": "All-Ireland Senior Football Championship Final",
      "winner": "county",
      "runner_up": "county",
      "score": "exact score if known, e.g. 1-5 to 0-4"
    },
    {
      "championship": "All-Ireland Senior Hurling Championship Final",
      "winner": "county",
      "runner_up": "county",
      "score": "exact score if known"
    }
  ],

  "sport": [
    ${
      hasLeagueOfIreland
        ? `{
      "category": "League of Ireland",
      "detail": "League of Ireland champions for the ${year} season. Full club name, brief note on the title win or any notable cup result. 2 sentences."
    },`
        : ""
    }
    {
      "category": "Horse Racing",
      "detail": "The standout Irish racing story of ${year}. Name the horse, jockey, trainer, race, and venue. Include the Cheltenham Festival or Irish Grand National if notable Irish involvement. 2–3 sentences."
    },
    {
      "category": "Boxing or Athletics or Other",
      "detail": "One significant Irish sporting achievement outside GAA and racing in ${year}. Name the athlete, competition, and result. 2 sentences."
    },
    {
      "category": "Soccer",
      "detail": "The most significant soccer story involving Ireland or Dublin clubs in ${year}. Name players, results, or events. 2 sentences."
    }
  ],

  "price_of_a_pint": "The exact or best-documented price of a pint of Guinness stout in a Dublin pub in ${year}. ${currencyNote} Then 2 sentences of context — what this meant relative to a labourer's daily wage, whether prices had risen due to wartime or political conditions, which pubs were popular.",

  "price_ladder": {
    "pint_of_guinness": "price string only, e.g. '3d' or '18p'",
    "loaf_of_bread": "price string only",
    "average_house_dublin": "price string only, or 'n/a' if data unreliable for this year",
    "weekly_wage_labourer": "price string only",
    "twenty_cigarettes": "price string only",
    "pint_of_milk": "price string only",
    "note": "One sentence on the most striking price movement or economic pressure of ${year}."
  },

  "cost_of_living": "3–4 sentences with specific documented or well-estimated prices. Include: weekly rent for a Dublin tenement room or typical working-class dwelling, cost of a loaf of bread, a labourer's weekly wage, one luxury item. ${currencyNote} Minimum 60 words.",

  "notable_dubliners": [
    "Minimum 6 items. Real people who were in Dublin or significantly connected to the city in ${year}. Format: 'Full name — 2 sentences on what they did or what happened to them in ${year} specifically.' Include politicians, military figures, writers, artists, ordinary people caught in events."
  ],

  "notable_death": "One significant Irish or Dublin-connected death in ${year}. Full name, date, cause of death or circumstances, and 2 sentences on their legacy and what Dublin made of the loss.",

  "notable_emigrant": "One notable Irish person who emigrated or spent significant time abroad in ${year}, or whose departure was felt in Dublin. Full name, destination, reason for leaving, and 1–2 sentences on what their departure represented about Ireland at that moment.",

  "what_was_on": [
    "Minimum 6 items. What Dubliners were reading, watching, attending, or talking about in ${year}. Include: a play at the Abbey Theatre or Gate Theatre, a book published by an Irish author, a film showing in Dublin cinemas, a newspaper story dominating conversation, a music act or song popular in the city${hasRTE ? ", an RTÉ television or radio moment" : ""}. Format: 'Category: Title or Event — 1–2 sentences on its Dublin significance.'"
  ],

  "number_one_song": "The most popular song in Ireland or Britain in ${year} — name the song, artist, and give 1 sentence on whether it was heard in Dublin pubs, dance halls, or on radio. From the 1960s onwards include the Irish charts if they differ from British charts.",

  "weather_event": "The most notable weather event affecting Dublin or Ireland in ${year}. Name the month, describe the conditions, and give 1–2 sentences on the impact on the city. If no remarkable event occurred, note the general character of the year's seasons.",

  "irish_first": "One significant Irish 'first' in ${year} — the first time something happened in Ireland or Dublin specifically. Could be technological, political, social, cultural, or sporting. Name it precisely and explain why it mattered. 2–3 sentences.",

  "quirky_story": "One odd, funny, or purely human-interest story from Dublin in ${year} that captured the public imagination. 2–3 sentences. This is the water cooler moment — the thing everyone was talking about that wasn't politics or war.",

  ${isTroubles ? `"north_headline": "The most significant event or development related to the Troubles or Northern Ireland in ${year} and its impact on Dublin — politics, security, public mood, cross-border incidents. 2–3 sentences with real names and dates.",` : ""}

  "slang_or_phrase": "One authentic Dublin expression, political slogan, or street phrase current in ${year}. Put the phrase in quotes, give its meaning, and 2 sentences on how and where it was used.",

  "image_search": {
    "queries": [
      "Minimum 8 specific search queries to find real archival photographs from Wikimedia Commons, the National Library of Ireland, or the Irish Military Archives.",
      "Focus on: specific Dublin streets in ${year}, named individuals, specific events, named buildings.",
      "Make all 8 queries specific to ${year} and its events — not generic."
    ]
  }
}

${
  isRising
    ? `
SPECIAL INSTRUCTIONS FOR 1916:
This is the most important year. The Easter Rising must be covered in exhaustive detail.
- major_events must include: the proclamation reading, the GPO seizure, the fighting at Mount Street Bridge, the Helga shelling Liberty Hall, the surrender, and each significant execution separately.
- key_locations must include the GPO, Kilmainham Gaol, Liberty Hall, Mount Street Bridge, the Four Courts, Jacob's Factory, Boland's Mills, and the Stonebreakers' Yard.
- visual_scene should place the reader on Sackville Street on Easter Monday morning.
- city_changes must address the physical destruction of central Dublin in detail.
- notable_death: Prioritise the executed leaders — discuss the collective impact of the executions.
`
    : ""
}
${
  isWarOfInd
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (WAR OF INDEPENDENCE):
- major_events must cover specific ambushes, assassinations, and reprisals with dates and names.
- Key figures: Michael Collins, Richard Mulcahy, Éamon de Valera, Dublin Castle, the Black and Tans, the Auxiliaries.
- Include the impact on ordinary Dublin life — curfews, checkpoints, raids on homes.
- key_locations must include Collins's safe houses, Dublin Castle, Vaughan's Hotel, Kirwan's pub network.
`
    : ""
}
${
  isCivilWar
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (CIVIL WAR):
- Cover both sides — Free State and anti-Treaty (Irregular/Republican) forces.
- Name the key figures: Collins, Mulcahy, O'Higgins for Free State; de Valera, Rory O'Connor, Liam Lynch for Republicans.
- The destruction of the Four Courts must be covered in detail for 1922.
- Collins's death at Béal na Bláth August 22nd 1922 must be a major event.
- Cover the human cost — executions, imprisonments, the bitterness left behind.
`
    : ""
}
${
  isAftermath
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (AFTERMATH OF THE RISING):
- Cover the transformation of public opinion following the executions.
- The return of internees from Frongoch is crucial — name key figures.
- Sinn Féin's reorganisation and the by-election victories.
- The daily life of Dublin under increased British military presence.
`
    : ""
}
${
  isSettlement
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (FREE STATE ERA):
- The new Irish Free State institutions — Dáil, Seanad, Garda, Army — and their Dublin presence.
- The political tension between pro- and anti-Treaty sides.
- Economic conditions and emigration.
- Cultural life reasserting itself — the Abbey, writers, artists.
`
    : ""
}
${
  isInterWar
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (INTER-WAR FREE STATE):
- The political landscape: Fianna Fáil vs Cumann na nGaedheal/Fine Gael; the IRA; Blueshirts if 1933–1934.
- The Economic War with Britain (1932 onwards) and its effect on Dublin trade, prices, emigration.
- The Catholic Church's growing influence on legislation and daily life.
- Cultural life: Abbey Theatre, Gate Theatre, censorship controversies, writers forced abroad.
- The international backdrop: Wall Street Crash effects, rise of European fascism, the Spanish Civil War (1936).
- Dublin's physical transformation: slum clearances, corporation housing estates, electrification.
`
    : ""
}
${
  isEmergency
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (THE EMERGENCY / WWII):
- Ireland's official neutrality — 'The Emergency' — must be reflected throughout.
- Rationing, fuel shortages, turf cutting, blackouts, and their effect on Dublin daily life.
- The IRA and German espionage plots (relevant 1939–1941).
- Emigration to Britain for war work — the drain on Dublin's workforce.
- De Valera's neutrality policy: international pressure, the American note (1944), his condolence call on Hitler's death (1945).
- The contrast between official neutrality and the reality of Dubliners following the war closely on the BBC.
`
    : ""
}
${
  isPostWar
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (POST-WAR / REPUBLIC ERA):
- Ireland declared a Republic in 1949 — note this transition and its Dublin significance.
- The Mother and Child Scheme controversy (1951) if relevant.
- Mass emigration — hundreds of thousands leaving Ireland for Britain and America.
- Economic stagnation under protectionist policies; the Whitaker Report (1958) signals change.
- Cultural censorship at its peak; major writers banned at home, celebrated abroad.
- The beginnings of television culture (BBC visible in Dublin from early 1950s; RTÉ planning underway by decade's end).
`
    : ""
}
${
  isSixties
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (THE SIXTIES):
- The Lemass era and economic modernisation — foreign investment, new industries in Dublin.
- RTÉ television launched January 1962 — its growing influence on Dublin life throughout the decade.
- The Second Vatican Council (1962–1965) and its impact on Irish Catholicism.
- The emergence of youth culture, showbands, Carnaby Street fashions reaching Dublin.
- The beginning of the Troubles in Northern Ireland (1969) and Dublin's reaction.
- Key figures: Seán Lemass, Jack Lynch, Donogh O'Malley (free education 1967).
`
    : ""
}
${
  isSeventies
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (THE SEVENTIES):
- The Troubles at their most intense — Dublin bombings (1972, 1974), Arms Crisis fallout, border security.
- Ireland joins the EEC in 1973 — the transformation this brings to Dublin's economy and identity.
- The oil crisis, inflation, industrial unrest, unemployment.
- The rise of Dublin's heroin epidemic in the late 1970s.
- Cultural touchstones: the showband era fading, rock music emerging, the arrival of fast food chains.
- Key political figures: Jack Lynch, Liam Cosgrave, Charles Haughey (arms trial and comeback).
`
    : ""
}
${
  isEighties
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (THE EIGHTIES):
- The devastating recession — unemployment, emigration crisis, brain drain.
- Charles Haughey's political dominance and controversies.
- The hunger strikes (1981) and their impact on Dublin streets and politics.
- The constitutional referendums: abortion (1983), divorce (1986).
- The heroin epidemic devastating inner-city Dublin communities.
- Cultural bright spots: U2 rising, the Commitments generation, the National Concert Hall opens (1981).
- The AIDS crisis emerging by mid-decade.
`
    : ""
}
${
  isNineties
    ? `
SPECIAL INSTRUCTIONS FOR ${year} (THE NINETIES / CELTIC TIGER):
- The transformation of Dublin's economy — from emigration to immigration, from recession to boom.
- The Peace Process in Northern Ireland — the IRA ceasefire (1994), the Good Friday Agreement (1998).
- Charlie Haughey's fall; Bertie Ahern's rise.
- The cultural explosion: Riverdance (1994), the Irish film industry, the pub culture boom.
- Dublin's physical transformation — the Docklands, Temple Bar, the DART expansion.
- The tribunals exposing corruption: Beef Tribunal, Flood Tribunal.
- The fall of the Church — clerical abuse scandals emerging.
- If year is 1994+, cover the Celtic Tiger property and lifestyle boom in detail.
`
    : ""
}

Return only the JSON object. No markdown. No explanation. No code fences.`;
}
