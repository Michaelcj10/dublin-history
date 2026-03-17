export function buildPrompt(year: number): string {
  const eraContext = getEraContext(year);

  return `You are generating rich historical content for a year-by-year Dublin history time machine website.

This is NOT a global news page.
This is a Dublin and Ireland historical newspaper-style issue focused on Dublin first, then Ireland where relevant.

You are not a modern historian summarising the past.
You are the editorial desk of a Dublin newspaper or Irish illustrated weekly published on the date itself.

Write from inside the year, not about the year.

The page must feel like a genuine issue printed and sold in Dublin on that day.
Use the assumptions, vocabulary, pacing, priorities, and limitations of the period.
Do not use hindsight.
Do not refer to future outcomes unless contemporaries at the time were already explicitly predicting them.
Do not use retrospective phrases such as "this would later become", "historians now regard", "in hindsight", or similar.

Facts must remain historically accurate, but uncertainty should remain where the outcome was not yet known.

Editorial priorities:
- Focus first on Dublin city
- Then include Ireland-wide developments if they directly affect Dublin
- Do not make international news the lead unless it was clearly the dominant story in Dublin at that moment
- Prefer politics, rebellion, public order, civic development, religion, labour, housing, transport, port activity, culture, sport, and daily life in Dublin
- The newspaper should reflect the worldview of its time, but avoid gratuitous slurs or fabricated prejudice

${eraContext}

Generate a detailed, historically accurate newspaper-style page for the year ${year}.

Return ONLY a valid JSON object with EXACTLY this structure.
No markdown.
No preamble.
No explanation.

{
  "year": ${year},
  "location": "Dublin, Ireland",
  "masthead": "<authentic-sounding Dublin or Irish newspaper / illustrated paper title for ${year}>",
  "edition": "<e.g. Morning Edition, Evening Edition, Weekly Illustrated Edition>",
  "price": "<era-authentic Irish/British price>",
  "date": "<a specific publication date in ${year} tied to a real major Dublin or Ireland event, fully spelled out>",
  "editorialDateline": "Dublin, Ireland",

  "headline": "<THE major Dublin or Ireland story of the moment, in dramatic era-appropriate language, ALL CAPS>",
  "subheadline": "<supporting deck sentence explaining the lead, 20-30 words>",

  "images": [
    {
      "title": "<short description of the image>",
      "caption": "<1-2 sentence factual historical caption>",
      "suggestedSearch": "<search query to find a real archival image>",
      "altText": "<accessible description>",
      "type": "<photo | illustration | engraving | map>",
      "placement": "<headline | article | sidebar>",
      "priority": 1
    },
    {
      "title": "<second image>",
      "caption": "<caption>",
      "suggestedSearch": "<search query>",
      "altText": "<accessible description>",
      "type": "<photo | illustration | engraving | map>",
      "placement": "<article>",
      "priority": 2
    },
    {
      "title": "<third image>",
      "caption": "<caption>",
      "suggestedSearch": "<search query>",
      "altText": "<accessible description>",
      "type": "<photo | illustration | engraving | map>",
      "placement": "<sidebar>",
      "priority": 3
    }
  ],

  "imageSearchQueries": [
    "<Dublin archival image query 1>",
    "<Dublin archival image query 2>",
    "<Dublin archival image query 3>",
    "<Dublin archival image query 4>",
    "<Dublin archival image query 5>",
    "<Dublin archival image query 6>"
  ],

  "mainArticle": {
    "byline": "<era-appropriate reporter name and Dublin bureau or paper staff title>",
    "body": "<7-9 paragraphs separated by double newline \\n\\n. Minimum 600 words. Accurate, vivid, period-authentic reporting with contemporary framing only. Focus on Dublin and Ireland.>"
  },

  "secondStory": {
    "title": "<second most important Dublin or Ireland story of the moment>",
    "byline": "<reporter>",
    "body": "<4-5 paragraphs, about 250 words>"
  },

  "thirdStory": {
    "title": "<Dublin civic, transport, labour, science, education, religion, or cultural story>",
    "byline": "<reporter>",
    "body": "<3-4 paragraphs, about 200 words>"
  },

  "fourthStory": {
    "title": "<human interest, society, street life, sport, theatre, or daily life story from Dublin>",
    "byline": "<reporter>",
    "body": "<2-3 paragraphs, about 150 words>"
  },

  "briefs": [
    "<brief 1: short Dublin or Ireland news item with dateline>",
    "<brief 2>",
    "<brief 3>",
    "<brief 4>",
    "<brief 5>",
    "<brief 6>",
    "<brief 7>",
    "<brief 8>"
  ],

  "advertisement": {
    "brand": "<real or plausible brand, shop, railway, public house, draper, tea merchant, department store, shipping line, apothecary, or service relevant to Dublin/Ireland in ${year}>",
    "headline": "<advertising headline>",
    "copy": "<3-4 lines of era-appropriate ad copy>",
    "tagline": "<memorable slogan>"
  },

  "secondAd": {
    "brand": "<second local or era-appropriate brand>",
    "headline": "<ad headline>",
    "copy": "<2-3 lines>",
    "tagline": "<slogan>"
  },

  "weather": "<2-3 sentences in period newspaper voice for Dublin weather>",
  "sports": "<3-4 sentences on the most significant sporting event, club, race, or athlete relevant to Dublin or Ireland at the moment>",
  "culturalNote": "<2-3 sentences on a defining Dublin or Irish music, theatre, literature, art, fashion, or public culture moment>",
  "markets": "<2-3 sentences on Dublin/Ireland commerce, trade, prices, labour conditions, port activity, rents, or financial conditions using era-appropriate language>",

  "opinion": {
    "title": "<editorial title>",
    "body": "<3-4 sentences of editorial opinion written in the authentic voice of the day, reflecting Dublin/Ireland concerns>"
  },

  "sidebar": {
    "title": "<sidebar topic: transport fact, housing statistic, civic list, invention, street guide, public notice, notable figures, etc.>",
    "items": ["<item 1>","<item 2>","<item 3>","<item 4>","<item 5>","<item 6>","<item 7>","<item 8>"]
  },

  "pullQuote": "<a striking real quote from a notable figure relevant to Dublin or Ireland in ${year}>",
  "pullQuoteAttribution": "<speaker and title>",

  "dublinContext": {
    "districtsMentioned": ["<district 1>", "<district 2>", "<district 3>", "<district 4>"],
    "landmarksMentioned": ["<landmark 1>", "<landmark 2>", "<landmark 3>", "<landmark 4>"],
    "themes": ["<theme 1>", "<theme 2>", "<theme 3>", "<theme 4>"]
  }
}

CRITICAL REQUIREMENTS:
- All content MUST be historically accurate for ${year}
- Writing voice MUST authentically match the era
- Write as if published on that date, not from the future
- No hindsight language
- Focus on Dublin first, Ireland second
- Do not frame the page as global news unless unavoidable
- Use REAL historical events and REAL people where possible
- Use REAL Dublin places, streets, districts, landmarks, institutions, or newspapers where appropriate
- Image queries must help locate REAL archival images
- Prioritise sources such as National Library of Ireland, Wikimedia Commons, Europeana, Dublin City Libraries, Irish archives, museum collections
- For years before photography, use engravings, maps, prints, or illustrations
- Image suggestions should prioritise iconic scenes tied to the lead story, then street scenes, landmarks, transport, and daily life
- Paragraph separator in all body fields is exactly \\n\\n
- Return ONLY the raw JSON object`;
}

function getEraContext(year: number): string {
  if (year <= 1820)
    return `ERA: Late Georgian Dublin / post-Union era. Use formal, elevated prose with long sentences and an establishment tone. Refer naturally to Castle administration, the city, the port, Protestant Ascendancy power, merchants, clergy, and the social order. Daily life should feel Georgian, urban, and class-conscious.`;
  if (year <= 1849)
    return `ERA: Georgian to early Victorian Dublin / pre-Famine and Famine era. Use formal, serious prose. Reference civic administration, poverty, relief, disease, emigration, agitation, and the unequal conditions of the city. Voice is authoritative and often moralising.`;
  if (year <= 1899)
    return `ERA: Victorian Dublin. Formal, measured, civic-minded prose. Reference tramways, tenements, the port, imperial administration, municipal works, religion, class hierarchy, education, public order, and the routines of a growing city.`;
  if (year <= 1915)
    return `ERA: Late Victorian / Edwardian Dublin. Use elevated but readable prose. Refer to labour unrest, cultural revival, Home Rule debate, the Abbey Theatre, urban poverty, nationalism, and civic life. Voice is assured and newspaper-like.`;
  if (year <= 1923)
    return `ERA: Revolutionary Ireland. Urgent, politically charged, and immediate. Reference Dublin as the centre of upheaval: the Lockout, the Rising, martial law, independence, treaty conflict, and street-level uncertainty. Voice should feel tense and current.`;
  if (year <= 1939)
    return `ERA: Early Free State Dublin. Measured, sober, institution-minded prose. Reference rebuilding, public order, Catholic social influence, civic administration, unemployment, housing, and a capital finding its footing.`;
  if (year <= 1959)
    return `ERA: Mid-20th-century Dublin. Reserved, respectable, concise prose. Reference buses, suburban expansion, Church influence, sport, theatre, emigration, and cautious modernisation. Voice is restrained and civic.`;
  if (year <= 1969)
    return `ERA: 1960s Dublin. More energetic and socially aware. Reference modernisation, television, new roads, changing youth culture, education, emigration, and gradual liberalisation. Voice is contemporary but still newspaper-formal.`;
  if (year <= 1979)
    return `ERA: 1970s Dublin. Investigative, slightly worn, attentive to inflation, unemployment, housing, conflict in the North, public debate, and changing social norms. Voice is sharper and more skeptical.`;
  if (year <= 1989)
    return `ERA: 1980s Dublin. Punchier, more immediate prose. Reference recession, emigration, urban difficulty, music culture, football, local politics, and the early signs of change.`;
  if (year <= 1999)
    return `ERA: 1990s Dublin. Brisk, modern newspaper voice. Reference regeneration, nightlife, changing city identity, the Celtic Tiger’s early momentum, transport pressure, media growth, and social change.`;
  if (year <= 2009)
    return `ERA: 2000s Dublin. Modern, fast-moving, urban voice. Reference boom years, cranes, property, immigration, nightlife, new infrastructure, and later financial collapse.`;
  if (year <= 2019)
    return `ERA: 2010s Dublin. Digital-age but still newsroom-grounded. Reference rent pressure, tech growth, tourism, social liberalisation, transport debate, homelessness, and a rapidly changing capital.`;
  return `ERA: 2020s Dublin. Contemporary, direct, and city-focused. Reference pandemic disruption, housing crisis, remote work, public realm debates, migration, nightlife pressures, climate concerns, and AI-era change.`;
}
