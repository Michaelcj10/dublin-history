// PoliticalBreakdown — newspaper-style political landscape for Dublin Chronicle
// Shows party strength, seat counts, and political context for 1916–1926
// Data is hardcoded per year — this decade is too important to rely on generated JSON

import React from "react";

interface Party {
  name: string;
  short: string;
  seats: number;
  votes?: string; // vote share if known
  stance: string; // one-line descriptor
  leader: string;
  colour: string; // for the visual bar
}

interface PoliticalYear {
  context: string; // 1-2 sentences on the political landscape
  chamber: string; // e.g. "Westminster Parliament" or "Dáil Éireann"
  electionYear?: number; // most recent election year this data comes from
  note?: string; // e.g. "No election held — showing Dáil composition"
  parties: Party[];
}
// ── Political data 1916–1926 ──────────────────────────────────────────────────
// Sources: Irish electoral history, Dáil records, electionsireland.org, oireachtas.ie

const POLITICAL_DATA: Record<number, PoliticalYear> = {
  1916: {
    context:
      "Ireland sends MPs to Westminster but Sinn Féin and the Irish Republican Brotherhood are growing in influence. The Easter Rising in April galvanises republican sentiment across the country.",
    chamber: "Westminster Parliament — Ireland under the Union",
    note: "Easter Rising — April 1916",
    parties: [
      {
        name: "Irish Parliamentary Party",
        short: "IPP",
        seats: 74,
        stance: "Home Rule constitutionalists",
        leader: "John Redmond",
        colour: "#007A33",
      },
      {
        name: "Unionists",
        short: "UNI",
        seats: 18,
        stance: "Union with Britain",
        leader: "Edward Carson",
        colour: "#003399",
      },
      {
        name: "Sinn Féin / Others",
        short: "SF",
        seats: 1,
        stance: "Abstentionist republican",
        leader: "Arthur Griffith",
        colour: "#169B62",
      },
    ],
  },

  1917: {
    context:
      "Sinn Féin wins a series of by-elections, signalling a shift away from the Irish Parliamentary Party. Republicans are radicalised by the executions of 1916 leaders and the threat of conscription.",
    chamber: "Westminster Parliament — Rise of Sinn Féin",
    parties: [
      {
        name: "Irish Parliamentary Party",
        short: "IPP",
        seats: 68,
        stance: "Constitutional Home Rule",
        leader: "John Redmond",
        colour: "#007A33",
      },
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 7,
        stance: "Abstentionist republican (growing)",
        leader: "Éamon de Valera",
        colour: "#169B62",
      },
      {
        name: "Unionists",
        short: "UNI",
        seats: 18,
        stance: "Union with Britain",
        leader: "Edward Carson",
        colour: "#003399",
      },
    ],
  },

  1918: {
    context:
      "The December 1918 general election is a seismic shift. Sinn Féin wins 73 seats but abstains from Westminster, instead convening the First Dáil in Dublin in January 1919. The IPP is virtually wiped out.",
    chamber: "Westminster Election — First Dáil convened Jan 1919",
    electionYear: 1918,
    note: "Sinn Féin abstains from Westminster; convenes Dáil Éireann",
    parties: [
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 73,
        votes: "46.9%",
        stance: "Abstentionist — seats Dáil Éireann",
        leader: "Éamon de Valera",
        colour: "#169B62",
      },
      {
        name: "Unionists",
        short: "UNI",
        seats: 26,
        votes: "25.4%",
        stance: "Union with Britain",
        leader: "Edward Carson",
        colour: "#003399",
      },
      {
        name: "Irish Parliamentary Party",
        short: "IPP",
        seats: 6,
        votes: "21.7%",
        stance: "Virtually eliminated",
        leader: "John Dillon",
        colour: "#007A33",
      },
    ],
  },

  1919: {
    context:
      "The Irish War of Independence begins. Dáil Éireann operates underground as a parallel government while the IRA wages a guerrilla campaign against Crown forces.",
    chamber: "First Dáil — Irish War of Independence",
    note: "Dáil meets in secret; British declare it illegal",
    parties: [
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 73,
        stance: "Government of the Irish Republic",
        leader: "Éamon de Valera",
        colour: "#169B62",
      },
      {
        name: "Unionists",
        short: "UNI",
        seats: 26,
        stance: "Pro-Union; opposing independence",
        leader: "Edward Carson",
        colour: "#003399",
      },
    ],
  },

  1920: {
    context:
      "The War of Independence intensifies. The Government of Ireland Act 1920 partitions Ireland. Northern Ireland is established in May 1921. Martial law and reprisals by Black and Tans cause widespread violence.",
    chamber: "First Dáil — War of Independence / Partition",
    note: "Government of Ireland Act — partition enacted",
    parties: [
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 73,
        stance: "Irish Republic government-in-exile",
        leader: "Éamon de Valera",
        colour: "#169B62",
      },
      {
        name: "Unionists (NI)",
        short: "UNI",
        seats: 40,
        stance: "Northern Ireland Parliament (new)",
        leader: "James Craig",
        colour: "#003399",
      },
    ],
  },

  1921: {
    context:
      "A truce ends the War of Independence in July. Anglo-Irish Treaty negotiations follow. In the May elections, Sinn Féin takes 124 of 128 seats in the Second Dáil. The Treaty is signed in December — splitting the movement.",
    chamber: "Second Dáil — Treaty negotiations",
    electionYear: 1921,
    note: "Anglo-Irish Treaty signed Dec 1921 — splits Sinn Féin",
    parties: [
      {
        name: "Sinn Féin (Pro-Treaty)",
        short: "PT",
        seats: 58,
        stance: "Accept Anglo-Irish Treaty",
        leader: "Michael Collins",
        colour: "#169B62",
      },
      {
        name: "Sinn Féin (Anti-Treaty)",
        short: "AT",
        seats: 36,
        stance: "Reject Treaty — full Republic",
        leader: "Éamon de Valera",
        colour: "#009900",
      },
      {
        name: "Unionists / Others",
        short: "OTH",
        seats: 30,
        stance: "Various / NI unionist bloc",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1922: {
    context:
      "The Irish Free State is established in December. The June election sees pro-Treaty candidates win a majority but anti-Treaty IRA seizes the Four Courts, triggering the Civil War in June 1922. Michael Collins is killed in August.",
    chamber: "Third Dáil — Irish Free State est. / Civil War",
    electionYear: 1922,
    note: "Civil War breaks out June 1922; Collins killed August",
    parties: [
      {
        name: "Pro-Treaty (Cumann na nGaedheal)",
        short: "ProT",
        seats: 58,
        votes: "38.5%",
        stance: "Free State Government",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Anti-Treaty (Republicans)",
        short: "AntiT",
        seats: 36,
        votes: "21.3%",
        stance: "Oppose Free State",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 17,
        votes: "21.4%",
        stance: "Constitutional opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Others / Farmers",
        short: "OTH",
        seats: 17,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1923: {
    context:
      "Civil War ends in May 1923. The August general election sees Cumann na nGaedheal returned to power. Anti-Treaty Sinn Féin wins 44 seats but abstains from the Dáil. William T. Cosgrave leads a cautious conservative government.",
    chamber: "Fourth Dáil — General Election August 1923",
    electionYear: 1923,
    note: "Civil War ends May 1923",
    parties: [
      {
        name: "Cumann na nGaedheal",
        short: "CnaG",
        seats: 63,
        votes: "39.0%",
        stance: "Government",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Sinn Féin (Anti-Treaty)",
        short: "SF",
        seats: 44,
        votes: "27.4%",
        stance: "Abstentionist republicans",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 14,
        votes: "10.6%",
        stance: "Largest opposition in Dáil",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Farmers / Others",
        short: "OTH",
        seats: 32,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1924: {
    context:
      "Cumann na nGaedheal governs under W.T. Cosgrave, consolidating the institutions of the Free State. The Army Mutiny crisis tests the government's authority. Anti-Treaty Sinn Féin remains in abstentionist opposition.",
    chamber: "Fourth Dáil — Cumann na nGaedheal Government",
    note: "Army Mutiny crisis 1924",
    parties: [
      {
        name: "Cumann na nGaedheal",
        short: "CnaG",
        seats: 63,
        stance: "Government",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Sinn Féin (Anti-Treaty)",
        short: "SF",
        seats: 44,
        stance: "Abstentionist",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 14,
        stance: "Constitutional opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 32,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1925: {
    context:
      "The Boundary Commission report is suppressed after it fails to redraw the border in nationalists' favour. Cosgrave's government focuses on economic stability and building state institutions.",
    chamber: "Fourth Dáil — Boundary Commission year",
    note: "Boundary Commission crisis; border unchanged",
    parties: [
      {
        name: "Cumann na nGaedheal",
        short: "CnaG",
        seats: 63,
        stance: "Government",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Sinn Féin (Anti-Treaty)",
        short: "SF",
        seats: 44,
        stance: "Abstentionist",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 14,
        stance: "Opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 32,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1926: {
    context:
      "De Valera splits from Sinn Féin and founds Fianna Fáil in March 1926, signalling the beginning of a constitutional republican movement that will eventually challenge for power.",
    chamber: "Fourth Dáil — Fianna Fáil founded",
    note: "Fianna Fáil founded March 1926 by de Valera",
    parties: [
      {
        name: "Cumann na nGaedheal",
        short: "CnaG",
        seats: 63,
        stance: "Government",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Fianna Fáil (new)",
        short: "FF",
        seats: 0,
        stance: "Founded March 1926 — not yet in Dáil",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 44,
        stance: "Abstentionist (shrinking)",
        leader: "Mary MacSwiney",
        colour: "#169B62",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 14,
        stance: "Opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 32,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1927: {
    context:
      "Two general elections were held in 1927. In June, Cumann na nGaedheal lost its majority, while Fianna Fáil entered the Dáil for the first time after abandoning abstentionism. A second election in September strengthened the government.",
    chamber: "Fifth Dáil — General Elections June & September 1927",
    electionYear: 1927,
    note: "Fianna Fáil enters Dáil; two elections in one year",
    parties: [
      {
        name: "Cumann na nGaedheal",
        short: "CnaG",
        seats: 62,
        stance: "Government",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 57,
        stance: "Republican constitutional politics",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 13,
        stance: "Labour",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Others / Independents",
        short: "OTH",
        seats: 21,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1932: {
    context:
      "The 1932 election marked a historic transfer of power. Fianna Fáil formed a government with Labour support, ending Cumann na nGaedheal's decade in office.",
    chamber: "Seventh Dáil — General Election February 1932",
    electionYear: 1932,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 72,
        votes: "44.5%",
        stance: "Republican government",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Cumann na nGaedheal",
        short: "CnaG",
        seats: 57,
        votes: "35.2%",
        stance: "Opposition",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 7,
        votes: "7.7%",
        stance: "Support FF",
        leader: "William Norton",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 17,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1933: {
    context:
      "Fianna Fáil consolidated power in 1933, winning a stronger mandate amid rising tensions with opposition Blueshirts and economic conflict with Britain.",
    chamber: "Eighth Dáil — General Election January 1933",
    electionYear: 1933,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 77,
        votes: "49.7%",
        stance: "Government",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 48,
        votes: "30.5%",
        stance: "Opposition (new party)",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 8,
        votes: "5.7%",
        stance: "Opposition",
        leader: "William Norton",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 19,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1937: {
    context:
      "Election held alongside adoption of Bunreacht na hÉireann. Fianna Fáil remained dominant but without an outright majority.",
    chamber: "Ninth Dáil — General Election July 1937",
    electionYear: 1937,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 69,
        votes: "45.2%",
        stance: "Government",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 48,
        votes: "28.7%",
        stance: "Opposition",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 13,
        votes: "10.3%",
        stance: "Opposition",
        leader: "William Norton",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 22,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1938: {
    context:
      "No election held. Fianna Fáil remained in power during the approach to WWII (The Emergency).",
    chamber: "Ninth Dáil — No election 1938",
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 69,
        stance: "Government",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 48,
        stance: "Opposition",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 13,
        stance: "Opposition",
        leader: "William Norton",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 22,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1948: {
    context:
      "The 1948 election ended 16 years of Fianna Fáil rule. A multi-party coalition led by Fine Gael formed the first Inter-Party Government.",
    chamber: "Thirteenth Dáil — General Election February 1948",
    electionYear: 1948,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 68,
        votes: "41.9%",
        stance: "Largest party, opposition",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 31,
        votes: "20.5%",
        stance: "Coalition government",
        leader: "John A. Costello",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 14,
        votes: "8.7%",
        stance: "Coalition",
        leader: "William Norton",
        colour: "#CC0000",
      },
      {
        name: "Clann na Poblachta",
        short: "CnaP",
        seats: 10,
        stance: "Republican reformist",
        leader: "Seán MacBride",
        colour: "#7B3F00",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 24,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1951: {
    context:
      "Collapse of the Inter-Party Government led to Fianna Fáil returning to power under de Valera.",
    chamber: "Fourteenth Dáil — General Election May 1951",
    electionYear: 1951,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 69,
        votes: "46.3%",
        stance: "Government",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 40,
        votes: "25.3%",
        stance: "Opposition",
        leader: "Richard Mulcahy",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 16,
        votes: "11.4%",
        stance: "Opposition",
        leader: "William Norton",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 22,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1969: {
    context:
      "Fianna Fáil retained power under Jack Lynch amid rising tensions in Northern Ireland at the beginning of the Troubles.",
    chamber: "Nineteenth Dáil — General Election June 1969",
    electionYear: 1969,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 75,
        votes: "45.7%",
        stance: "Government",
        leader: "Jack Lynch",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 50,
        votes: "34.1%",
        stance: "Opposition",
        leader: "Liam Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 18,
        votes: "9.5%",
        stance: "Opposition",
        leader: "Brendan Corish",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 1,
        stance: "Independent",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1973: {
    context:
      "Fine Gael and Labour formed the National Coalition, ending Fianna Fáil's long dominance.",
    chamber: "Twentieth Dáil — General Election February 1973",
    electionYear: 1973,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 69,
        votes: "46.2%",
        stance: "Opposition",
        leader: "Jack Lynch",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 54,
        votes: "35.1%",
        stance: "Government (coalition)",
        leader: "Liam Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 19,
        votes: "13.7%",
        stance: "Government (coalition)",
        leader: "Brendan Corish",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 4,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1977: {
    context:
      "Fianna Fáil won a landslide victory under Jack Lynch, one of the largest in Irish electoral history.",
    chamber: "Twenty-first Dáil — General Election June 1977",
    electionYear: 1977,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 84,
        votes: "50.6%",
        stance: "Government (landslide)",
        leader: "Jack Lynch",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 43,
        votes: "30.5%",
        stance: "Opposition",
        leader: "Garret FitzGerald",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 17,
        votes: "11.6%",
        stance: "Opposition",
        leader: "Frank Cluskey",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 4,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1981: {
    context:
      "A fragmented election amid economic crisis and the 1981 hunger strikes. Fine Gael and Labour formed a short-lived government.",
    chamber: "Twenty-second Dáil — General Election June 1981",
    electionYear: 1981,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 78,
        votes: "45.3%",
        stance: "Opposition",
        leader: "Charles Haughey",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 65,
        votes: "36.5%",
        stance: "Government (coalition)",
        leader: "Garret FitzGerald",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 15,
        votes: "9.9%",
        stance: "Government (coalition)",
        leader: "Frank Cluskey",
        colour: "#CC0000",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 8,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1987: {
    context:
      "Fianna Fáil returned to power under Charles Haughey, initially as a minority government.",
    chamber: "Twenty-fifth Dáil — General Election February 1987",
    electionYear: 1987,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 81,
        votes: "44.1%",
        stance: "Minority government",
        leader: "Charles Haughey",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 51,
        votes: "27.1%",
        stance: "Opposition",
        leader: "Alan Dukes",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 12,
        votes: "6.4%",
        stance: "Opposition",
        leader: "Dick Spring",
        colour: "#CC0000",
      },
      {
        name: "Progressive Democrats",
        short: "PD",
        seats: 14,
        votes: "11.9%",
        stance: "New liberal party",
        leader: "Desmond O'Malley",
        colour: "#00AEEF",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 8,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1997: {
    context:
      "Fianna Fáil formed a coalition government with the Progressive Democrats under Bertie Ahern.",
    chamber: "Twenty-eighth Dáil — General Election June 1997",
    electionYear: 1997,
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 77,
        votes: "39.3%",
        stance: "Government",
        leader: "Bertie Ahern",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 54,
        votes: "27.9%",
        stance: "Opposition",
        leader: "John Bruton",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 17,
        votes: "10.4%",
        stance: "Opposition",
        leader: "Ruairí Quinn",
        colour: "#CC0000",
      },
      {
        name: "Progressive Democrats",
        short: "PD",
        seats: 4,
        votes: "4.7%",
        stance: "Coalition partner",
        leader: "Mary Harney",
        colour: "#00AEEF",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 14,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  2000: {
    context:
      "No election held. The Fianna Fáil–Progressive Democrat coalition continued during the Celtic Tiger period of strong economic growth.",
    chamber: "Twenty-eighth Dáil — No election 2000",
    parties: [
      {
        name: "Fianna Fáil",
        short: "FF",
        seats: 77,
        stance: "Government",
        leader: "Bertie Ahern",
        colour: "#006400",
      },
      {
        name: "Fine Gael",
        short: "FG",
        seats: 54,
        stance: "Opposition",
        leader: "John Bruton",
        colour: "#2E8B57",
      },
      {
        name: "Labour",
        short: "LAB",
        seats: 17,
        stance: "Opposition",
        leader: "Ruairí Quinn",
        colour: "#CC0000",
      },
      {
        name: "Progressive Democrats",
        short: "PD",
        seats: 4,
        stance: "Coalition",
        leader: "Mary Harney",
        colour: "#00AEEF",
      },
      {
        name: "Others",
        short: "OTH",
        seats: 14,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },
};

// ── Parliament arc visualisation ──────────────────────────────────────────────
// Classic hemicycle — seats arranged in an arc from left to right
function Hemicycle({ parties }: { parties: Party[] }) {
  const total = parties.reduce((s, p) => s + p.seats, 0);
  if (total === 0) return null;

  // Normalize to a fixed dot total so all parties always appear proportionally,
  // regardless of how many actual seats there are (avoids overflow dropping parties).
  const TOTAL_DOTS = 90;
  const ROWS = 3;
  const dots = parties.flatMap((p) => {
    const count = Math.max(
      p.seats > 0 ? 1 : 0,
      Math.round((p.seats / total) * TOTAL_DOTS),
    );
    return Array.from({ length: count }, () => ({ colour: p.colour }));
  });

  // Arc parameters
  const cx = 160;
  const cy = 145;
  const ROW_SPACING = 18;
  const DOT_SPACING = 7; // px between dot centres — tighter to fit more

  const rows: (typeof dots)[] = [];
  let remaining = [...dots];
  for (let r = 0; r < ROWS; r++) {
    const radius = 80 + r * ROW_SPACING;
    const arcLength = Math.PI * radius;
    const maxDotsInRow = Math.floor(arcLength / DOT_SPACING);
    rows.push(
      remaining.splice(
        0,
        Math.min(maxDotsInRow, Math.ceil(remaining.length / (ROWS - r))),
      ),
    );
  }

  const allDots: { x: number; y: number; colour: string }[] = [];

  rows.forEach((row, r) => {
    const radius = 80 + r * ROW_SPACING;
    const n = row.length;
    if (n === 0) return;
    row.forEach((dot, i) => {
      const angle = Math.PI - (i / (n - 1 || 1)) * Math.PI;
      allDots.push({
        x: cx + radius * Math.cos(angle),
        y: cy - radius * Math.sin(angle),
        colour: dot.colour,
      });
    });
  });

  return (
    <svg viewBox="0 0 320 150" style={{ width: "100%", display: "block" }}>
      {/* base line */}
      <line
        x1={20}
        y1={145}
        x2={300}
        y2={145}
        stroke="#b0a080"
        strokeWidth={1}
      />
      {/* seats */}
      {allDots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={3.8}
          fill={d.colour}
          stroke="rgba(0,0,0,.3)"
          strokeWidth={0.5}
        />
      ))}
      {/* total label */}
      <text
        x={cx}
        y={138}
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize={9}
        fill="#7a6040"
        fontStyle="italic"
      >
        {total} seats total
      </text>
    </svg>
  );
}

// ── Bar row ───────────────────────────────────────────────────────────────────
function PartyRow({
  party,
  total,
  rank,
}: {
  party: Party;
  total: number;
  rank: number;
}) {
  const pct = total > 0 ? (party.seats / total) * 100 : 0;

  return (
    <div
      style={{
        marginBottom: 10,
        paddingBottom: 10,
        borderBottom: "1px dotted #c0b090",
      }}
    >
      {/* Top line: short name, full name, leader */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 3,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {/* colour swatch */}
          <div
            style={{
              width: 10,
              height: 10,
              background: party.colour,
              border: "1px solid rgba(0,0,0,.3)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontWeight: 700,
              fontSize: 12,
              color: "#1a1208",
            }}
          >
            {party.name}
          </div>
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            fontWeight: 700,
            color: "#1a1208",
            letterSpacing: -0.5,
          }}
        >
          {party.seats > 0 ? party.seats : "—"}
        </div>
      </div>

      {/* Bar */}
      {party.seats > 0 && (
        <div
          style={{
            height: 8,
            background: "#e0d8c0",
            border: "1px solid #c0b090",
            marginBottom: 4,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              background: party.colour,
              opacity: 0.85,
            }}
          />
          {/* hatching for #1 party */}
          {rank === 0 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${pct}%`,
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.2) 3px, rgba(255,255,255,.2) 4px)",
              }}
            />
          )}
        </div>
      )}

      {/* Details */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 9,
            color: "#5a4020",
            fontStyle: "italic",
          }}
        >
          {party.stance}
        </div>
        <div
          style={{ fontFamily: "Georgia,serif", fontSize: 9, color: "#7a6040" }}
        >
          {party.votes && `${party.votes} · `}Leader: {party.leader}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export function hasPoliticalData(year: number): boolean {
  return year in POLITICAL_DATA;
}

export default function PoliticalBreakdown({ year }: { year: number }) {
  const data = POLITICAL_DATA[year];
  if (!data) return null;

  const total = data.parties.reduce((s, p) => s + p.seats, 0);
  const sorted = [...data.parties].sort((a, b) => b.seats - a.seats);

  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "3px 0",
          borderTop: "2px solid #1a1208",
          borderBottom: "1px solid #1a1208",
          margin: "10px 0 8px",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia,'Times New Roman',serif",
            fontSize: 9,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            fontWeight: 700,
            color: "#1a1208",
          }}
        >
          The Political Landscape
        </span>
      </div>
      <div
        style={{
          background: "#f0e8d0",
          fontFamily: "Georgia,'Times New Roman',serif",
        }}
      >
        {/* Chamber label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: "#5a4020",
              fontStyle: "italic",
            }}
          >
            {data.chamber}
            {data.electionYear && ` · Election ${data.electionYear}`}
          </div>
          {total > 0 && (
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 8,
                color: "#7a6040",
                letterSpacing: 1,
              }}
            >
              {total} seats
            </div>
          )}
        </div>

        {/* Context */}
        <div
          style={{
            borderLeft: "3px solid #1a1208",
            paddingLeft: 10,
            marginBottom: 10,
          }}
        >
          <p
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 11,
              lineHeight: 1.75,
              color: "#2a1a08",
              fontStyle: "italic",
            }}
          >
            {data.context}
          </p>
        </div>

        {/* Note */}
        {data.note && (
          <div
            style={{
              background: "#e8dfc8",
              border: "1px solid #c0b090",
              padding: "4px 10px",
              marginBottom: 10,
              fontFamily: "Georgia,serif",
              fontSize: 9,
              fontStyle: "italic",
              color: "#5a4020",
              textAlign: "center",
              letterSpacing: 0.5,
            }}
          >
            {data.note}
          </div>
        )}

        {/* Hemicycle */}
        {total > 0 && (
          <div style={{ marginBottom: 10, padding: "6px 0" }}>
            <Hemicycle parties={data.parties} />
          </div>
        )}

        {/* Party bars */}
        <div>
          {sorted.map((party, i) => (
            <PartyRow
              key={party.short + i}
              party={party}
              total={total}
              rank={i}
            />
          ))}
        </div>

        {/* Majority line note */}
        {total > 0 && (
          <div
            style={{
              marginTop: 4,
              paddingTop: 6,
              borderTop: "1px solid #c0b090",
              fontFamily: "Georgia,serif",
              fontSize: 9,
              color: "#7a6040",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            Majority requires {Math.floor(total / 2) + 1} seats
          </div>
        )}
      </div>
    </>
  );
}
