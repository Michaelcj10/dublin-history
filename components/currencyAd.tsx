// components/CurrencyAd.tsx

import React from "react";

interface CurrencyAdProps {
  year: number;
}

function getEra(
  year: number,
): "british" | "predecimal" | "decimal" | "euro_approach" {
  if (year < 1922) return "british";
  if (year < 1971) return "predecimal";
  if (year < 1999) return "decimal";
  return "euro_approach";
}

// ── Single coin — label BELOW the coin body, never overlapping ───────────────

function Coin({
  cx,
  cy,
  r,
  fill,
  stroke,
  denom,
  name,
  motif,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke: string;
  denom: string;
  name?: string;
  motif?: string;
}) {
  const motifChar: Record<string, string> = {
    crown: "♛",
    harp: "♜",
    bull: "☯",
    hen: "✦",
    horse: "✦",
    salmon: "~",
    woodcock: "✦",
    stag: "✦",
    hare: "✦",
    hound: "✦",
  };

  return (
    <g>
      {/* Drop shadow */}
      <ellipse
        cx={cx + 2.5}
        cy={cy + r + 2}
        rx={r * 0.85}
        ry={r * 0.18}
        fill="rgba(0,0,0,0.22)"
      />
      {/* Coin body */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.4}
      />
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r - 2.5}
        fill="none"
        stroke={stroke}
        strokeWidth={0.6}
        opacity={0.5}
      />
      {/* Inner ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r - 5}
        fill="none"
        stroke={stroke}
        strokeWidth={0.4}
        opacity={0.25}
      />
      {/* Motif — centred, generous size */}
      {motif && (
        <text
          x={cx}
          y={cy + r * 0.22}
          textAnchor="middle"
          fontSize={r * 0.72}
          fontFamily="Georgia,serif"
          fill={stroke}
          opacity={0.28}
        >
          {motifChar[motif] ?? "✦"}
        </text>
      )}
      {/* Denomination — centred in lower half of coin */}
      <text
        x={cx}
        y={cy + r * 0.55}
        textAnchor="middle"
        fontSize={r * 0.48}
        fontWeight="bold"
        fontFamily="Georgia,serif"
        fill={stroke}
        opacity={0.85}
      >
        {denom}
      </text>
      {/* Name label — BELOW the coin entirely */}
      {name && (
        <text
          x={cx}
          y={cy + r + 11}
          textAnchor="middle"
          fontSize={7}
          fontFamily="Georgia,serif"
          fill="#6a5030"
          fontStyle="italic"
        >
          {name}
        </text>
      )}
    </g>
  );
}

// ── Banknote ─────────────────────────────────────────────────────────────────

function Note({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  accent,
  denom,
  sublabel,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  accent: string;
  denom: string;
  sublabel?: string;
}) {
  return (
    <g>
      <rect
        x={x + 3}
        y={y + 4}
        width={w}
        height={h}
        rx={3}
        fill="rgba(0,0,0,0.18)"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.2}
      />
      <rect
        x={x + 4}
        y={y + 4}
        width={w - 8}
        height={h - 8}
        rx={2}
        fill="none"
        stroke={stroke}
        strokeWidth={0.5}
        opacity={0.4}
      />
      {/* Accent side bars */}
      <rect
        x={x}
        y={y}
        width={10}
        height={h}
        rx={3}
        fill={accent}
        opacity={0.55}
      />
      <rect
        x={x + w - 10}
        y={y}
        width={10}
        height={h}
        rx={3}
        fill={accent}
        opacity={0.55}
      />
      {/* Denom */}
      <text
        x={x + w / 2}
        y={y + h * 0.52}
        textAnchor="middle"
        fontSize={h * 0.35}
        fontWeight="bold"
        fontFamily="Georgia,serif"
        fill={stroke}
      >
        {denom}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h * 0.78}
          textAnchor="middle"
          fontSize={h * 0.2}
          fontFamily="Georgia,serif"
          fill={stroke}
          opacity={0.65}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

// ── Row helper — evenly spaces coins with name labels, returns total height ──

function CoinRow({
  coins,
  y,
  viewW,
}: {
  coins: {
    denom: string;
    name?: string;
    r: number;
    fill: string;
    stroke: string;
    motif?: string;
  }[];
  y: number;
  viewW: number;
}) {
  const n = coins.length;
  const spacing = viewW / n;
  return (
    <>
      {coins.map((c, i) => (
        <Coin
          key={i}
          cx={spacing * i + spacing / 2}
          cy={y}
          r={c.r}
          fill={c.fill}
          stroke={c.stroke}
          denom={c.denom}
          name={c.name}
          motif={c.motif}
        />
      ))}
    </>
  );
}

// ── Era illustrations ─────────────────────────────────────────────────────────

const COPPER = { fill: "#c07830", stroke: "#7a4010" };
const SILVER = { fill: "#cdd5dd", stroke: "#6a7888" };
const GOLD = { fill: "#d4aa50", stroke: "#907020" };

// 1916–1921: British coinage
function BritishCoins() {
  // Two rows: small coins top, large coins bottom
  // viewBox tall enough: 200px
  return (
    <svg viewBox="0 0 280 185" style={{ width: "100%", display: "block" }}>
      <CoinRow
        viewW={280}
        y={38}
        coins={[
          { denom: "½d", name: "Halfpenny", r: 22, ...COPPER, motif: "crown" },
          { denom: "1d", name: "Penny", r: 26, ...COPPER, motif: "crown" },
          { denom: "3d", name: "Threepence", r: 20, ...SILVER, motif: "crown" },
          { denom: "6d", name: "Sixpence", r: 22, ...SILVER, motif: "crown" },
        ]}
      />
      <CoinRow
        viewW={280}
        y={128}
        coins={[
          { denom: "1/-", name: "Shilling", r: 25, ...SILVER, motif: "crown" },
          { denom: "2/-", name: "Florin", r: 27, ...SILVER, motif: "crown" },
          {
            denom: "2/6",
            name: "Half Crown",
            r: 28,
            ...SILVER,
            motif: "crown",
          },
        ]}
      />
      <text
        x={140}
        y={178}
        textAnchor="middle"
        fontSize={7.5}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        British sterling · Legal tender in Ireland · His Majesty's coinage
      </text>
    </svg>
  );
}

// 1922–1970: Irish Free State animal coins
function IrishPreDecimalCoins() {
  return (
    <svg viewBox="0 0 300 210" style={{ width: "100%", display: "block" }}>
      {/* Row 1: copper */}
      <CoinRow
        viewW={300}
        y={38}
        coins={[
          {
            denom: "¼d",
            name: "Farthing",
            r: 18,
            ...COPPER,
            motif: "woodcock",
          },
          { denom: "1d", name: "Penny", r: 22, ...COPPER, motif: "hen" },
          { denom: "3d", name: "Threepence", r: 20, ...COPPER, motif: "hare" },
          { denom: "6d", name: "Sixpence", r: 21, ...SILVER, motif: "salmon" },
        ]}
      />
      {/* Row 2: silver */}
      <CoinRow
        viewW={300}
        y={125}
        coins={[
          { denom: "1/-", name: "Shilling", r: 24, ...SILVER, motif: "bull" },
          { denom: "2/-", name: "Florin", r: 26, ...SILVER, motif: "salmon" },
          {
            denom: "2/6",
            name: "Half Crown",
            r: 28,
            ...SILVER,
            motif: "horse",
          },
          {
            denom: "10/-",
            name: "Ten Shilling",
            r: 26,
            ...GOLD,
            motif: "harp",
          },
        ]}
      />
      <text
        x={150}
        y={200}
        textAnchor="middle"
        fontSize={7.5}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Saorstát Éireann · Percy Metcalfe designs · Currency Commission 1928
      </text>
    </svg>
  );
}

// 1971–1998: Decimal punt
function IrishDecimalCoins() {
  return (
    <svg viewBox="0 0 300 210" style={{ width: "100%", display: "block" }}>
      {/* Row 1: bronze */}
      <CoinRow
        viewW={300}
        y={38}
        coins={[
          {
            denom: "½p",
            name: "Half Penny",
            r: 16,
            ...COPPER,
            motif: "woodcock",
          },
          { denom: "1p", name: "Penny", r: 19, ...COPPER, motif: "hen" },
          {
            denom: "2p",
            name: "Two Pence",
            r: 21,
            ...COPPER,
            motif: "woodcock",
          },
          { denom: "5p", name: "Five Pence", r: 20, ...SILVER, motif: "bull" },
        ]}
      />
      {/* Row 2: larger */}
      <CoinRow
        viewW={300}
        y={130}
        coins={[
          {
            denom: "10p",
            name: "Ten Pence",
            r: 23,
            ...SILVER,
            motif: "salmon",
          },
          {
            denom: "20p",
            name: "Twenty Pence",
            r: 24,
            ...SILVER,
            motif: "horse",
          },
          {
            denom: "50p",
            name: "Fifty Pence",
            r: 26,
            ...SILVER,
            motif: "woodcock",
          },
          { denom: "£1", name: "One Punt", r: 27, ...GOLD, motif: "stag" },
        ]}
      />
      <text
        x={150}
        y={202}
        textAnchor="middle"
        fontSize={7.5}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Irish decimal coinage · Introduced 15 February 1971 · The punt
      </text>
    </svg>
  );
}

// 1999–2000: Punt fading, euro arriving
function EuroApproachCoins() {
  return (
    <svg viewBox="0 0 300 210" style={{ width: "100%", display: "block" }}>
      {/* Fading punt coins */}
      <text
        x={150}
        y={16}
        textAnchor="middle"
        fontSize={8}
        fill="#9a8060"
        fontFamily="Georgia,serif"
        fontStyle="italic"
        fontWeight="bold"
      >
        The Punt — passing into history
      </text>
      <g opacity={0.45}>
        <CoinRow
          viewW={300}
          y={52}
          coins={[
            { denom: "10p", name: "", r: 22, ...SILVER, motif: "salmon" },
            { denom: "50p", name: "", r: 25, ...SILVER, motif: "woodcock" },
            { denom: "£1", name: "", r: 27, ...GOLD, motif: "stag" },
          ]}
        />
      </g>
      {/* Euro notes */}
      <text
        x={150}
        y={102}
        textAnchor="middle"
        fontSize={8}
        fill="#3a5a3a"
        fontFamily="Georgia,serif"
        fontStyle="italic"
        fontWeight="bold"
      >
        The Euro — arriving 2002
      </text>
      <Note
        x={8}
        y={112}
        w={82}
        h={48}
        fill="#ddeedd"
        stroke="#2a5a28"
        accent="#3a8a38"
        denom="€5"
        sublabel="2002"
      />
      <Note
        x={100}
        y={112}
        w={88}
        h={48}
        fill="#d8e4f4"
        stroke="#28407a"
        accent="#3858aa"
        denom="€10"
        sublabel="2002"
      />
      <Note
        x={200}
        y={112}
        w={92}
        h={48}
        fill="#f4e8d0"
        stroke="#7a5010"
        accent="#c07820"
        denom="€20"
        sublabel="2002"
      />
      <text
        x={150}
        y={178}
        textAnchor="middle"
        fontSize={7.5}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Fixed rate: €1 = IR£0.787564 · 1 January 1999
      </text>
      <text
        x={150}
        y={190}
        textAnchor="middle"
        fontSize={7}
        fill="#9a8060"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Punt notes &amp; coins remain legal tender until 9 February 2002
      </text>
    </svg>
  );
}

// ── Ad copy ───────────────────────────────────────────────────────────────────

function getAdCopy(year: number) {
  if (year < 1922)
    return {
      headline: "THE COIN OF THE REALM",
      body: "The lawful currency of His Majesty's kingdom circulates throughout Dublin and all Ireland. Sterling — trusted since time immemorial.",
      footer: "Bank of Ireland · College Green · Dublin",
    };
  if (year < 1939)
    return {
      headline: "THE FREE STATE SHILLING",
      body: "Percy Metcalfe's celebrated animal designs bear the creatures of Ireland — the bull, the horse, the salmon, the woodcock. A new currency for a new nation.",
      footer: "Currency Commission of Ireland · Est. 1927",
    };
  if (year < 1950)
    return {
      headline: "THE IRISH POUND",
      body: "Sound money in uncertain times. The Irish pound — at par with sterling — is the bedrock of commerce throughout Éire. Spend wisely.",
      footer: "Central Bank of Ireland · Dame Street · Dublin",
    };
  if (year < 1971)
    return {
      headline: "YOUR HONEST SHILLING",
      body: "Twelve pence to the shilling. Twenty shillings to the pound. The coinage of Ireland, trusted in every shop, public house, and market from Rathmines to the Liberties.",
      footer: "Central Bank of Ireland · Dublin · Since 1943",
    };
  if (year < 1985)
    return {
      headline: "THE NEW DECIMAL PUNT",
      body: "One hundred new pence to the pound. Since February 1971, Ireland's decimal currency has brought clarity to commerce. The punt — solid as the nation.",
      footer: "Central Bank of Ireland · Dame Street · Dublin",
    };
  if (year < 1999)
    return {
      headline: "THE PUNT — IRELAND'S OWN",
      body: "From the 10p salmon to the 50p woodcock and the £1 stag, Irish coinage tells the story of a nation. The punt — independent since 1979.",
      footer: "Central Bank of Ireland · Dublin",
    };
  return {
    headline: "FAREWELL TO THE PUNT",
    body: "After 77 years, Ireland's pound gives way to the euro. From 1 January 1999, the punt is fixed at €1.269738. The old coins will soon be memories.",
    footer: "Central Bank of Ireland · European Central Bank · 1999",
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CurrencyAd({ year }: CurrencyAdProps) {
  const era = getEra(year);
  const copy = getAdCopy(year);

  const bg =
    year < 1940
      ? "#f0e8d0"
      : year < 1960
        ? "#eee8d8"
        : year < 1980
          ? "#e8e0cc"
          : "#e4dcc8";
  const border =
    year < 1930
      ? "4px double #1a1208"
      : year < 1960
        ? "2px solid #3a2808"
        : "2px solid #4a3818";

  return (
    <div
      style={{
        border,
        background: bg,
        padding: "12px 10px 10px",
        textAlign: "center",
        marginTop: 14,
      }}
    >
      <div
        style={{
          borderBottom: "1px solid #b0a080",
          marginBottom: 8,
          paddingBottom: 5,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 8,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#5a4020",
          }}
        >
          Monetary Affairs · {year}
        </div>
      </div>

      <div
        style={{
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: 13,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: 2,
          color: "#1a1208",
          lineHeight: 1.2,
          marginBottom: 8,
        }}
      >
        {copy.headline}
      </div>

      {/* SVG panel — no overflow clipping needed */}
      <div style={{ margin: "4px 0 6px", lineHeight: 0 }}>
        {era === "british" && <BritishCoins />}
        {era === "predecimal" && <IrishPreDecimalCoins />}
        {era === "decimal" && <IrishDecimalCoins />}
        {era === "euro_approach" && <EuroApproachCoins />}
      </div>

      <div
        style={{
          borderTop: "1px solid #b0a080",
          borderBottom: "1px solid #b0a080",
          padding: "4px 0",
          margin: "6px 0",
        }}
      >
        <div
          style={{
            fontSize: 7,
            fontFamily: "Georgia,serif",
            fontStyle: "italic",
            color: "#7a6040",
            letterSpacing: 0.8,
          }}
        >
          {era === "british" &&
            "Farthing · Halfpenny · Penny · Threepence · Sixpence · Shilling · Florin · Half-Crown"}
          {era === "predecimal" &&
            "Farthing · Penny · Threepence · Sixpence · Shilling · Florin · Half-Crown · Ten Shilling"}
          {era === "decimal" && "½p · 1p · 2p · 5p · 10p · 20p · 50p · £1 Punt"}
          {era === "euro_approach" &&
            "The punt at par with sterling 1928–1979 · Independent 1979–1999 · €1 = £Ir 0.787564"}
        </div>
      </div>

      <p
        style={{
          fontFamily: "Georgia,serif",
          fontSize: 10,
          lineHeight: 1.7,
          color: "#2a1a08",
          margin: "6px 4px 6px",
          fontStyle: "italic",
        }}
      >
        {copy.body}
      </p>

      <div
        style={{
          borderTop: "1px solid #b0a080",
          paddingTop: 5,
          marginTop: 4,
          fontFamily: "Georgia,serif",
          fontSize: 7.5,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          color: "#5a4020",
        }}
      >
        {copy.footer}
      </div>
    </div>
  );
}
