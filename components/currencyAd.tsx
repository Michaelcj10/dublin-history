// components/CurrencyAd.tsx
// Period newspaper-style advertisement showing coins/notes in circulation
// Automatically selects the correct currency era based on year

import React from "react";

interface CurrencyAdProps {
  year: number;
}

// ── Era detection ─────────────────────────────────────────────────────────────

function getEra(
  year: number,
): "british" | "predecimal" | "decimal" | "euro_approach" {
  if (year < 1922) return "british";
  if (year < 1971) return "predecimal";
  if (year < 1999) return "decimal";
  return "euro_approach";
}

// ── SVG coin components ───────────────────────────────────────────────────────

function Coin({
  cx,
  cy,
  r,
  fill,
  stroke,
  strokeWidth = 1.2,
  label,
  sublabel,
  textFill = "#1a0a00",
  motif,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke: string;
  strokeWidth?: number;
  label: string;
  sublabel?: string;
  textFill?: string;
  motif?:
    | "harp"
    | "crown"
    | "bull"
    | "salmon"
    | "woodcock"
    | "horse"
    | "hen"
    | "stag"
    | "hound"
    | "hare";
}) {
  const motifPaths: Record<string, React.ReactNode> = {
    harp: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.55}
        fill={textFill}
        opacity={0.35}
        fontFamily="Georgia,serif"
      >
        ♫
      </text>
    ),
    crown: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
        fontFamily="serif"
      >
        ♛
      </text>
    ),
    stag: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🦌
      </text>
    ),
    bull: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🐂
      </text>
    ),
    horse: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🐴
      </text>
    ),
    hen: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🐓
      </text>
    ),
    salmon: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🐟
      </text>
    ),
    woodcock: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🐦
      </text>
    ),
    hound: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🐕
      </text>
    ),
    hare: (
      <text
        x={cx}
        y={cy + r * 0.18}
        textAnchor="middle"
        fontSize={r * 0.5}
        fill={textFill}
        opacity={0.3}
      >
        🐰
      </text>
    ),
  };

  return (
    <g>
      {/* Shadow */}
      <ellipse
        cx={cx + 2}
        cy={cy + 3}
        rx={r}
        ry={r * 0.22}
        fill="rgba(0,0,0,0.25)"
      />
      {/* Body */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      {/* Inner ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.82}
        fill="none"
        stroke={stroke}
        strokeWidth={0.5}
        opacity={0.4}
      />
      {/* Motif */}
      {motif && motifPaths[motif]}
      {/* Denomination */}
      <text
        x={cx}
        y={cy + r * 0.65}
        textAnchor="middle"
        fontSize={r * 0.42}
        fontWeight="bold"
        fontFamily="Georgia,serif"
        fill={textFill}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={cx}
          y={cy + r * 0.88}
          textAnchor="middle"
          fontSize={r * 0.3}
          fontFamily="Georgia,serif"
          fill={textFill}
          opacity={0.65}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

function Note({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  label,
  sublabel,
  colour,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  label: string;
  sublabel?: string;
  colour: string;
}) {
  return (
    <g>
      <rect
        x={x + 3}
        y={y + 3}
        width={w}
        height={h}
        rx={2}
        fill="rgba(0,0,0,0.2)"
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={2}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      {/* Cross-hatch border decoration */}
      <rect
        x={x + 3}
        y={y + 3}
        width={w - 6}
        height={h - 6}
        rx={1}
        fill="none"
        stroke={stroke}
        strokeWidth={0.5}
        opacity={0.5}
      />
      {/* Colour band */}
      <rect
        x={x}
        y={y}
        width={8}
        height={h}
        rx={2}
        fill={colour}
        opacity={0.6}
      />
      <rect
        x={x + w - 8}
        y={y}
        width={8}
        height={h}
        rx={2}
        fill={colour}
        opacity={0.6}
      />
      {/* Label */}
      <text
        x={x + w / 2}
        y={y + h / 2 - 4}
        textAnchor="middle"
        fontSize={h * 0.28}
        fontWeight="bold"
        fontFamily="Georgia,serif"
        fill={stroke}
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 9}
          textAnchor="middle"
          fontSize={h * 0.16}
          fontFamily="Georgia,serif"
          fill={stroke}
          opacity={0.7}
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

// ── Era SVG layouts ───────────────────────────────────────────────────────────

// 1916–1921: British currency — silver & copper
function BritishCoins() {
  return (
    <svg viewBox="0 0 280 110" style={{ width: "100%", display: "block" }}>
      <Coin
        cx={28}
        cy={55}
        r={24}
        fill="#c8a860"
        stroke="#907030"
        label="½d"
        sublabel="Half-penny"
        motif="crown"
      />
      <Coin
        cx={80}
        cy={55}
        r={26}
        fill="#b87333"
        stroke="#8B5A2B"
        label="1d"
        sublabel="Penny"
        motif="crown"
      />
      <Coin
        cx={135}
        cy={55}
        r={22}
        fill="#b0b8c0"
        stroke="#6a7880"
        label="3d"
        sublabel="Threepence"
        motif="crown"
      />
      <Coin
        cx={183}
        cy={55}
        r={24}
        fill="#c0c8d0"
        stroke="#708090"
        label="6d"
        sublabel="Sixpence"
        motif="crown"
      />
      <Coin
        cx={234}
        cy={55}
        r={26}
        fill="#d0d8e0"
        stroke="#8090a0"
        label="1/-"
        sublabel="Shilling"
        motif="crown"
      />
      <text
        x={140}
        y={105}
        textAnchor="middle"
        fontSize={7}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        British coinage · Legal tender in Ireland
      </text>
    </svg>
  );
}

// 1922–1970: Irish Free State / Republic — the Barnacle-designed animal coins
function IrishPreDecimalCoins() {
  return (
    <svg viewBox="0 0 300 130" style={{ width: "100%", display: "block" }}>
      {/* Copper */}
      <Coin
        cx={28}
        cy={45}
        r={18}
        fill="#c07830"
        stroke="#8B5A2B"
        label="¼d"
        sublabel="Farthing"
        motif="woodcock"
        textFill="#1a0800"
      />
      <Coin
        cx={70}
        cy={45}
        r={22}
        fill="#b87333"
        stroke="#8B5A2B"
        label="1d"
        sublabel="Penny"
        motif="hen"
        textFill="#1a0800"
      />
      <Coin
        cx={116}
        cy={45}
        r={20}
        fill="#c07830"
        stroke="#8B5A2B"
        label="3d"
        sublabel="Thruppence"
        motif="hare"
        textFill="#1a0800"
      />
      {/* Silver */}
      <Coin
        cx={162}
        cy={45}
        r={22}
        fill="#c8cfd6"
        stroke="#708090"
        label="6d"
        sublabel="Sixpence"
        motif="salmon"
        textFill="#1a0800"
      />
      <Coin
        cx={210}
        cy={45}
        r={24}
        fill="#d0d8e0"
        stroke="#8090a0"
        label="1/-"
        sublabel="Shilling"
        motif="bull"
        textFill="#1a0800"
      />
      <Coin
        cx={260}
        cy={45}
        r={26}
        fill="#d8e0e8"
        stroke="#8090a0"
        label="2/-"
        sublabel="Florin"
        motif="salmon"
        textFill="#1a0800"
      />
      {/* Large silver */}
      <Coin
        cx={80}
        cy={100}
        r={28}
        fill="#dce4ec"
        stroke="#8090a0"
        label="2/6"
        sublabel="Half-Crown"
        motif="horse"
        textFill="#1a0800"
      />
      <Coin
        cx={168}
        cy={100}
        r={32}
        fill="#e0e8f0"
        stroke="#8898a8"
        label="10/-"
        sublabel="Ten Shilling"
        motif="harp"
        textFill="#1a0800"
      />
      <text
        x={150}
        y={126}
        textAnchor="middle"
        fontSize={7}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Saorstát Éireann · Percy Metcalfe & T.W. Goff designs · Est. 1928
      </text>
    </svg>
  );
}

// 1971–1998: Decimal Irish coinage
function IrishDecimalCoins() {
  return (
    <svg viewBox="0 0 300 130" style={{ width: "100%", display: "block" }}>
      <Coin
        cx={25}
        cy={42}
        r={16}
        fill="#b87333"
        stroke="#8B5A2B"
        label="½p"
        sublabel="Half-penny"
        motif="woodcock"
        textFill="#1a0800"
      />
      <Coin
        cx={62}
        cy={42}
        r={18}
        fill="#c07830"
        stroke="#8B5A2B"
        label="1p"
        sublabel="Penny"
        motif="hen"
        textFill="#1a0800"
      />
      <Coin
        cx={102}
        cy={42}
        r={20}
        fill="#b87333"
        stroke="#8B5A2B"
        label="2p"
        sublabel=""
        motif="woodcock"
        textFill="#1a0800"
      />
      <Coin
        cx={146}
        cy={42}
        r={20}
        fill="#c8cfd6"
        stroke="#708090"
        label="5p"
        sublabel=""
        motif="bull"
        textFill="#1a0800"
      />
      <Coin
        cx={190}
        cy={42}
        r={22}
        fill="#d0d8e0"
        stroke="#8090a0"
        label="10p"
        sublabel=""
        motif="salmon"
        textFill="#1a0800"
      />
      <Coin
        cx={238}
        cy={42}
        r={22}
        fill="#d8e0e8"
        stroke="#8898a8"
        label="20p"
        sublabel=""
        motif="horse"
        textFill="#1a0800"
      />
      {/* 50p heptagonal — approximate with larger circle */}
      <Coin
        cx={80}
        cy={100}
        r={26}
        fill="#dce4ec"
        stroke="#8898a8"
        label="50p"
        sublabel="Woodcock"
        motif="woodcock"
        textFill="#1a0800"
      />
      <Coin
        cx={168}
        cy={100}
        r={28}
        fill="#c8cfd6"
        stroke="#708090"
        label="£1"
        sublabel="Punt"
        motif="stag"
        textFill="#1a0800"
      />
      <text
        x={150}
        y={127}
        textAnchor="middle"
        fontSize={7}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Irish decimal coinage · Introduced 15 February 1971 · The punt
      </text>
    </svg>
  );
}

// 1999–2000: Last years of the punt, euro on the horizon
function EuroApproachCoins() {
  return (
    <svg viewBox="0 0 300 140" style={{ width: "100%", display: "block" }}>
      {/* Punt coins fading */}
      <g opacity={0.55}>
        <Coin
          cx={50}
          cy={45}
          r={22}
          fill="#c8cfd6"
          stroke="#708090"
          label="10p"
          sublabel="Punt"
          motif="salmon"
          textFill="#1a0800"
        />
        <Coin
          cx={108}
          cy={45}
          r={24}
          fill="#dce4ec"
          stroke="#8898a8"
          label="50p"
          sublabel="Punt"
          motif="woodcock"
          textFill="#1a0800"
        />
        <Coin
          cx={164}
          cy={45}
          r={26}
          fill="#c8cfd6"
          stroke="#708090"
          label="£1"
          sublabel="Punt"
          motif="stag"
          textFill="#1a0800"
        />
      </g>
      {/* Euro notes preview */}
      <Note
        x={10}
        y={80}
        w={70}
        h={36}
        fill="#d4e8d0"
        stroke="#3a6a30"
        label="€5"
        sublabel="Euro · 2002"
        colour="#4a8a40"
      />
      <Note
        x={90}
        y={80}
        w={75}
        h={36}
        fill="#d0dce8"
        stroke="#304a7a"
        label="€10"
        sublabel="Euro · 2002"
        colour="#3a5a9a"
      />
      <Note
        x={175}
        y={80}
        w={80}
        h={36}
        fill="#f0dcc0"
        stroke="#8a6020"
        label="€20"
        sublabel="Euro · 2002"
        colour="#c08030"
      />
      <text
        x={150}
        y={130}
        textAnchor="middle"
        fontSize={7.5}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        The punt · Ireland signs up to the euro · 1 January 1999
      </text>
      <text
        x={150}
        y={140}
        textAnchor="middle"
        fontSize={6.5}
        fill="#9a8060"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Euro notes &amp; coins enter circulation 1 January 2002
      </text>
    </svg>
  );
}

// ── Ad copy by era ────────────────────────────────────────────────────────────

function getAdCopy(year: number): {
  headline: string;
  body: string;
  footer: string;
} {
  if (year < 1922)
    return {
      headline: "THE COIN OF THE REALM",
      body: "The lawful currency of His Majesty's kingdom circulates throughout Dublin and all Ireland. Sterling — trusted since time immemorial.",
      footer: "Bank of Ireland · College Green · Dublin",
    };
  if (year < 1939)
    return {
      headline: "THE FREE STATE SHILLING",
      body: "Percy Metcalfe's celebrated designs bear the animals of Ireland — the bull, the horse, the salmon, the woodcock. A new currency for a new nation.",
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

// ── Main component ────────────────────────────────────────────────────────────

export default function CurrencyAd({ year }: CurrencyAdProps) {
  const era = getEra(year);
  const copy = getAdCopy(year);

  const bgColour =
    year < 1940
      ? "#f0e8d0"
      : year < 1960
        ? "#eee8d8"
        : year < 1980
          ? "#e8e0cc"
          : "#e4dcc8";
  const borderStyle =
    year < 1930
      ? "4px double #1a1208"
      : year < 1960
        ? "2px solid #3a2808"
        : "2px solid #4a3818";

  return (
    <div
      style={{
        border: borderStyle,
        background: bgColour,
        padding: "12px 10px 10px",
        textAlign: "center",
        marginTop: 14,
        position: "relative",
      }}
    >
      {/* Top rule */}
      <div
        style={{
          borderBottom: "1px solid #b0a080",
          marginBottom: 8,
          paddingBottom: 6,
        }}
      >
        <div
          style={{
            fontFamily: "Georgia,'Times New Roman',serif",
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

      {/* Headline */}
      <div
        style={{
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: 14,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: 2,
          color: "#1a1208",
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        {copy.headline}
      </div>

      {/* Coin / note SVG illustration */}
      <div style={{ margin: "6px 0 8px" }}>
        {era === "british" && <BritishCoins />}
        {era === "predecimal" && <IrishPreDecimalCoins />}
        {era === "decimal" && <IrishDecimalCoins />}
        {era === "euro_approach" && <EuroApproachCoins />}
      </div>

      {/* Divider */}
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
            letterSpacing: 1,
          }}
        >
          {era === "british" &&
            "Farthing · Halfpenny · Penny · Threepence · Sixpence · Shilling · Florin · Half-Crown"}
          {era === "predecimal" &&
            "Farthing · Penny · Threepence · Sixpence · Shilling · Florin · Half-Crown · Ten Shilling"}
          {era === "decimal" && "½p · 1p · 2p · 5p · 10p · 20p · 50p · £1 Punt"}
          {era === "euro_approach" &&
            "The punt at par with sterling 1928–1979 · Independent since · €1 = £Ir 0.787564"}
        </div>
      </div>

      {/* Body copy */}
      <p
        style={{
          fontFamily: "Georgia,serif",
          fontSize: 10,
          lineHeight: 1.7,
          color: "#2a1a08",
          textAlign: "center",
          margin: "8px 4px 6px",
          fontStyle: "italic",
        }}
      >
        {copy.body}
      </p>

      {/* Footer */}
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
