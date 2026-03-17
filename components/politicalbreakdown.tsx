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
      "No election was held in 1916. The Irish Parliamentary Party under John Redmond held the vast majority of Irish Westminster seats, but the Easter Rising and the subsequent executions began a profound shift in nationalist politics that would sweep the IPP from power within two years.",
    chamber: "Westminster Parliament (Irish seats)",
    electionYear: 1910,
    note: "Last contested in December 1910 — political landscape about to change utterly",
    parties: [
      {
        name: "Irish Parliamentary Party",
        short: "IPP",
        seats: 84,
        stance: "Home Rule within British Empire",
        leader: "John Redmond",
        colour: "#2E8B57",
      },
      {
        name: "Irish Unionist Alliance",
        short: "IUA",
        seats: 18,
        stance: "Union with Great Britain",
        leader: "Edward Carson",
        colour: "#1C3E6E",
      },
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 0,
        stance: "Irish Republic, abstentionism",
        leader: "Arthur Griffith",
        colour: "#F5A623",
      },
      {
        name: "Independent Nationalist",
        short: "IND",
        seats: 3,
        stance: "Various nationalist positions",
        leader: "Various",
        colour: "#8B7355",
      },
    ],
  },

  1917: {
    context:
      "A series of by-election victories in 1917 — Count Plunkett in North Roscommon (as an independent republican), Joe McGuinness in South Longford, Éamon de Valera in East Clare, and W.T. Cosgrave in Kilkenny City — signalled the collapse of the Irish Parliamentary Party. All four contests were won by republican candidates aligned with or later absorbed into Sinn Féin.",
    chamber: "Westminster By-elections 1917",
    note: "All four key by-elections won by republican/Sinn Féin-aligned candidates — decisive shift in nationalist opinion",
    parties: [
      {
        name: "Sinn Féin / Republican",
        short: "SF",
        seats: 4,
        votes: "4 of 4 contested",
        stance: "Irish Republic, complete independence",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Irish Parliamentary Party",
        short: "IPP",
        seats: 0,
        votes: "Lost all major by-elections",
        stance: "Home Rule, Imperial loyalty",
        leader: "John Redmond",
        colour: "#2E8B57",
      },
    ],
  },

  1918: {
    context:
      "The December 1918 general election was a political earthquake. Sinn Féin swept nationalist Ireland, winning 73 of Ireland's 105 Westminster seats. The Irish Parliamentary Party was reduced to 6 seats. Sinn Féin MPs abstained and instead formed the First Dáil in January 1919.",
    chamber: "Westminster Parliament — Irish Seats",
    electionYear: 1918,
    parties: [
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 73,
        votes: "46.9–47.7%",
        stance: "Irish Republic, abstentionism",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Irish Unionist Alliance",
        short: "IUA",
        seats: 26,
        votes: "25–26%",
        stance: "Union with Great Britain",
        leader: "Edward Carson",
        colour: "#1C3E6E",
      },
      {
        name: "Irish Parliamentary Party",
        short: "IPP",
        seats: 6,
        votes: "21–22%",
        stance: "Home Rule within Empire — decimated",
        leader: "John Dillon",
        colour: "#2E8B57",
      },
    ],
  },

  1919: {
    context:
      "The First Dáil met on January 21st 1919 at the Mansion House in Dublin. Of the 73 Sinn Féin MPs elected, 38 attended while 35 were imprisoned or on the run. The Dáil declared independence and adopted the Democratic Programme.",
    chamber: "First Dáil Éireann — January 1919",
    electionYear: 1918,
    note: "38 present, 35 absent (imprisoned or on the run)",
    parties: [
      {
        name: "Sinn Féin (present)",
        short: "SF",
        seats: 38,
        stance: "Irish Republic",
        leader: "Cathal Brugha (presiding)",
        colour: "#F5A623",
      },
      {
        name: "Sinn Féin (absent)",
        short: "SF*",
        seats: 35,
        stance: "Imprisoned or on the run",
        leader: "Éamon de Valera",
        colour: "#C87D1A",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 0,
        stance: "Abstained",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Unionist / IPP",
        short: "OPP",
        seats: 0,
        stance: "Did not recognise Dáil",
        leader: "—",
        colour: "#666666",
      },
    ],
  },

  1920: {
    context:
      "Local elections in January 1920 confirmed Sinn Féin dominance across much of Ireland, winning control of a majority of urban and county councils. Exact figures vary by source, but Sinn Féin clearly replaced the Irish Parliamentary Party as the dominant nationalist force.",
    chamber: "Local Elections — January 1920",
    electionYear: 1920,
    note: "Seat figures are approximate — Sinn Féin won a majority of councils",
    parties: [
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 72,
        votes: "Approx. urban councils",
        stance: "Irish Republic",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 15,
        stance: "Workers' movement",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Nationalist / IPP remnants",
        short: "NAT",
        seats: 19,
        stance: "Declining constitutional nationalism",
        leader: "Various",
        colour: "#2E8B57",
      },
      {
        name: "Unionist",
        short: "UNI",
        seats: 21,
        stance: "Union with Great Britain",
        leader: "Edward Carson",
        colour: "#1C3E6E",
      },
    ],
  },

  1921: {
    context:
      "Elections in May 1921 under the Government of Ireland Act produced separate parliaments. In Southern Ireland, Sinn Féin won 124 of 128 seats (largely unopposed) and treated this as the Second Dáil. In Northern Ireland, Unionists formed a government under James Craig.",
    chamber: "Second Dáil Éireann — May 1921",
    electionYear: 1921,
    note: "124 of 128 seats in Southern Ireland won by Sinn Féin (mostly unopposed)",
    parties: [
      {
        name: "Sinn Féin (Southern Ireland)",
        short: "SF",
        seats: 124,
        votes: "Unopposed in most constituencies",
        stance: "Irish Republic",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Unionist (Northern Ireland)",
        short: "UUP",
        seats: 40,
        votes: "Northern Ireland",
        stance: "Unionist حكومة",
        leader: "James Craig",
        colour: "#1C3E6E",
      },
      {
        name: "Nationalist (Northern Ireland)",
        short: "NAT",
        seats: 6,
        votes: "Northern Ireland",
        stance: "Anti-partition",
        leader: "Various",
        colour: "#2E8B57",
      },
    ],
  },

  1922: {
    context:
      "The June 1922 election, held under the Anglo-Irish Treaty settlement, confirmed a pro-Treaty majority. The Civil War followed shortly after between pro- and anti-Treaty forces.",
    chamber: "Third Dáil — General Election June 16, 1922",
    electionYear: 1922,
    parties: [
      {
        name: "Pro-Treaty Sinn Féin",
        short: "PRO",
        seats: 58,
        votes: "38.5%",
        stance: "Free State",
        leader: "Michael Collins / W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Anti-Treaty Sinn Féin",
        short: "REP",
        seats: 36,
        votes: "21.3%",
        stance: "Republican",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 17,
        votes: "21.4%",
        stance: "Labour",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Farmers' Party",
        short: "FAR",
        seats: 7,
        votes: "5.5%",
        stance: "Agrarian interests",
        leader: "Various",
        colour: "#8B6914",
      },
      {
        name: "Independents",
        short: "IND",
        seats: 10,
        votes: "13.3%",
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1923: {
    context:
      "The August 1923 election — the first after the Civil War — returned Cumann na nGaedheal as the governing party. Anti-Treaty Sinn Féin remained abstentionist.",
    chamber: "Fourth Dáil — General Election August 27, 1923",
    electionYear: 1923,
    parties: [
      {
        name: "Cumann na nGaedheal",
        short: "CnaG",
        seats: 63,
        votes: "39.0%",
        stance: "Free State government",
        leader: "W.T. Cosgrave",
        colour: "#2E8B57",
      },
      {
        name: "Sinn Féin (Anti-Treaty)",
        short: "SF",
        seats: 44,
        votes: "27.4%",
        stance: "Abstentionist",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 14,
        votes: "10.6%",
        stance: "Opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Farmers' Party",
        short: "FAR",
        seats: 15,
        votes: "12.1%",
        stance: "Agrarian",
        leader: "Various",
        colour: "#8B6914",
      },
      {
        name: "Independents",
        short: "IND",
        seats: 17,
        votes: "10.9%",
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1924: {
    context: "No election held. Composition unchanged from 1923.",
    chamber: "Fourth Dáil — No election 1924",
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
        name: "Sinn Féin",
        short: "SF",
        seats: 44,
        stance: "Abstentionist",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 14,
        stance: "Opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Farmers' Party",
        short: "FAR",
        seats: 15,
        stance: "Agrarian",
        leader: "Various",
        colour: "#8B6914",
      },
      {
        name: "Independents",
        short: "IND",
        seats: 17,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1925: {
    context: "No election held. Boundary Commission crisis dominated politics.",
    chamber: "Fourth Dáil — No election 1925",
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
        name: "Sinn Féin",
        short: "SF",
        seats: 44,
        stance: "Abstentionist",
        leader: "Éamon de Valera",
        colour: "#F5A623",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 14,
        stance: "Opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Farmers' Party",
        short: "FAR",
        seats: 15,
        stance: "Agrarian",
        leader: "Various",
        colour: "#8B6914",
      },
      {
        name: "Independents",
        short: "IND",
        seats: 17,
        stance: "Various",
        leader: "—",
        colour: "#888888",
      },
    ],
  },

  1926: {
    context:
      "Fianna Fáil was founded in May 1926 following a split from Sinn Féin led by Éamon de Valera. However, no change in Dáil seat composition occurred at this time, as abstentionist TDs did not take their seats.",
    chamber: "Fourth Dáil — Fianna Fáil founded 1926",
    note: "No immediate seat changes — party realignment occurred outside the Dáil",
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
        name: "Fianna Fáil",
        short: "FF",
        seats: 0,
        stance: "Founded 1926 — not yet in Dáil",
        leader: "Éamon de Valera",
        colour: "#006400",
      },
      {
        name: "Sinn Féin",
        short: "SF",
        seats: 44,
        stance: "Abstentionist (many members shifting to FF politically)",
        leader: "Mary MacSwiney",
        colour: "#F5A623",
      },
      {
        name: "Irish Labour Party",
        short: "LAB",
        seats: 14,
        stance: "Opposition",
        leader: "Thomas Johnson",
        colour: "#CC0000",
      },
      {
        name: "Farmers' Party",
        short: "FAR",
        seats: 15,
        stance: "Agrarian",
        leader: "Various",
        colour: "#8B6914",
      },
      {
        name: "Independents",
        short: "IND",
        seats: 17,
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

  // Build seat positions in arc
  const ROWS = 3;
  const seats = parties.flatMap((p) =>
    Array.from({ length: p.seats }, () => ({
      colour: p.colour,
      short: p.short,
    })),
  );

  // Arc parameters
  const cx = 160;
  const cy = 145;
  const gaps = 4; // px between rows

  const rows: (typeof seats)[] = [];
  let remaining = [...seats];
  for (let r = 0; r < ROWS; r++) {
    const radius = 80 + r * (18 + gaps);
    const arcLength = Math.PI * radius;
    const maxSeats = Math.floor(arcLength / 8);
    rows.push(
      remaining.splice(
        0,
        Math.min(maxSeats, Math.ceil(remaining.length / (ROWS - r))),
      ),
    );
  }

  const allDots: { x: number; y: number; colour: string }[] = [];

  rows.forEach((row, r) => {
    const radius = 80 + r * (18 + gaps);
    const n = row.length;
    if (n === 0) return;
    row.forEach((seat, i) => {
      const angle = Math.PI - (i / (n - 1 || 1)) * Math.PI;
      allDots.push({
        x: cx + radius * Math.cos(angle),
        y: cy - radius * Math.sin(angle),
        colour: seat.colour,
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
export default function PoliticalBreakdown({ year }: { year: number }) {
  const data = POLITICAL_DATA[year];
  if (!data) return null;

  const total = data.parties.reduce((s, p) => s + p.seats, 0);
  const sorted = [...data.parties].sort((a, b) => b.seats - a.seats);

  return (
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
  );
}
