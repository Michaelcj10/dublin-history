// ── Dublin Chronicle prompt — 1916–1926 ──────────────────────────────────────
// One year per API call. Maximum detail. Every field fully populated.
// This decade spans the Easter Rising, War of Independence, and Civil War —
// the most consequential eleven years in modern Irish history.

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
  };
  return contexts[year] ?? `Year ${year} of the new Irish Free State.`;
}

function buildYearPrompt(year: number): string {
  const context = getYearContext(year);
  const isRising = year === 1916;
  const isWarOfInd = year >= 1919 && year <= 1921;
  const isCivilWar = year === 1922 || year === 1923;
  const isAftermath = year === 1917 || year === 1918;
  const isSettlement = year >= 1924;

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
- price_of_a_pint MUST be included — this is displayed prominently in the newspaper SVG.
- Output must be valid JSON only. No markdown, no code fences, no explanation.

---

OUTPUT FORMAT — return exactly this JSON structure:

{
  "place": "Dublin",
  "year": ${year},
  "tier": "chronicle",

  "timeline_summary": "3–4 sentences. Open with the single most important thing about Dublin in ${year}. Then cover the political situation, the economic conditions, and the mood of the city. Be specific — name events, name people, give dates. Minimum 80 words.",

  "visual_scene": "4–5 sentences. Stand the reader on a specific Dublin street on a specific day in ${year}. Name the street. Describe what they see, hear, smell. What are people wearing. What vehicles pass. What conversations are people having. What posters or notices are on the walls. What is the emotional atmosphere. Minimum 100 words.",

  "city_changes": [
    "Minimum 6 items. Each is 2–3 sentences describing a specific, concrete change to Dublin in ${year}. Infrastructure, demographics, economics, politics, public health, housing, commerce. Name streets, buildings, organisations, individuals. Each item minimum 40 words."
  ],

  "major_events": [
    "Minimum 8 items. Each is a detailed account of one major event. Format: '[Event name, specific date] — [2–3 sentences describing what happened, who was involved, what the consequences were for Dublin and Ireland]. Name real people. Give real dates. Minimum 50 words each."
  ],

  "population_estimate": "Specific figure for Dublin city with context. Include city boundary figure, greater Dublin area if relevant, and one sentence on what was driving population change in ${year}. Example: 'approx. 304,000 within the city boundary; c.400,000 including Rathmines, Pembroke, and Drumcondra townships — population growth stalled as emigration accelerated and housing conditions in the inner city remained dire.'",

  "transport_snapshot": [
    "Minimum 5 items. Each describes a specific transport mode or route in Dublin in ${year} — tram routes, rail lines, operators, fares, disruptions caused by conflict or politics, changes this year. 2 sentences each minimum."
  ],

  "architecture_style": [
    "Minimum 4 items. Each names a specific architectural style visible in Dublin in ${year} and gives a real named building or street as example. Note any buildings damaged, destroyed, or rebuilt this year — particularly relevant for 1916–1923."
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
    }
  ],

  "price_of_a_pint": "The exact or best-documented price of a pint of Guinness stout in a Dublin pub in ${year}. Give the price in pre-decimal format (shillings and pence, e.g. '3d' or '2½d'). Then 2 sentences of context — what this meant relative to a labourer's daily wage, whether prices had risen due to wartime or political conditions, which pubs were popular. Example: 'A pint of Guinness cost approximately 3d (three pence) in a Dublin city pub in ${year} — at a time when a general labourer earned around 4 shillings per day, a pint represented roughly one-sixteenth of a day\\'s wages. The price had risen slightly from pre-war levels due to increased barley and malt costs, though Guinness at St James\\'s Gate continued to dominate the Dublin market utterly.'",

  "cost_of_living": "3–4 sentences with specific documented or well-estimated prices. Include: weekly rent for a Dublin tenement room, cost of a loaf of bread, a labourer's weekly wage, one luxury item. Use pre-decimal currency. Minimum 60 words.",

  "notable_dubliners": [
    "Minimum 6 items. Real people who were in Dublin or significantly connected to the city in ${year}. Format: 'Full name — 2 sentences on what they did or what happened to them in ${year} specifically.' Include politicians, military figures, writers, artists, ordinary people caught in events."
  ],

  "what_was_on": [
    "Minimum 5 items. What Dubliners were reading, watching, attending, or talking about in ${year}. Include: a play at the Abbey Theatre or other venue, a newspaper story dominating conversation, a book published by an Irish author, a sporting event beyond GAA, a film if cinemas were operating. Format: 'Category: Title or Event — 1–2 sentences on its Dublin significance.'"
  ],

  "slang_or_phrase": "One authentic Dublin expression, political slogan, or street phrase current in ${year}. Put the phrase in quotes, give its meaning, and 2 sentences on how and where it was used. Example: '\\'Up the Republic\\' — the rallying cry heard on Dublin streets in the aftermath of the Rising, shouted at Volunteer meetings and whispered in tenement stairwells alike, carrying both defiance and grief in equal measure.'",

  "image_search": {
    "queries": [
      "Minimum 8 specific search queries to find real archival photographs from Wikimedia Commons, the National Library of Ireland, or the Irish Military Archives.",
      "Focus on: specific Dublin streets in ${year}, named individuals, specific events, named buildings.",
      "Examples for 1916: 'Dublin GPO ruins 1916 photograph', 'Sackville Street Dublin 1916 aftermath', 'Easter Rising prisoners 1916', 'Kilmainham Gaol 1916', 'Patrick Pearse 1916', 'Dublin 1916 British soldiers barricade'",
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
- Name the key figures on both sides: Collins, Mulcahy, O'Higgins for Free State; de Valera, Rory O'Connor, Liam Lynch for Republicans.
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

Return only the JSON object. No markdown. No explanation. No code fences.`;
}
