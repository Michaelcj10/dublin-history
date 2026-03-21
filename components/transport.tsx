// TransportIllustration — period-accurate Dublin transport SVGs
// Covers 1910–2000 across 8 distinct transport eras

import React from "react";

interface Props {
  year: number;
  transport_snapshot?: string[];
}

// ── Era routing ───────────────────────────────────────────────────────────────
// Dublin transport history:
// Pre-1949 : DUTC trams + horse carts + bicycles + early cars
// 1949     : Last Dublin tram ran 9 July 1949
// 1950s–60s: CIÉ double-decker buses replaced trams
// 1984     : DART opened 23 July 1984
// 1990s    : DART + buses + surge in private cars

type TransportType =
  | "tram"
  | "horse-cart"
  | "bicycle"
  | "early-motor"
  | "cie-bus"
  | "double-decker"
  | "dart"
  | "nineties-car";

function getTransport(year: number): TransportType {
  if (year <= 1918) {
    const t: TransportType[] = ["tram", "horse-cart", "bicycle", "early-motor"];
    return t[year % t.length];
  }
  if (year <= 1948) {
    const t: TransportType[] = ["tram", "bicycle", "horse-cart", "tram"];
    return t[year % t.length];
  }
  if (year <= 1959) {
    // Trams gone — CIÉ buses take over
    const t: TransportType[] = [
      "cie-bus",
      "bicycle",
      "cie-bus",
      "double-decker",
    ];
    return t[year % t.length];
  }
  if (year <= 1983) {
    const t: TransportType[] = [
      "double-decker",
      "cie-bus",
      "double-decker",
      "bicycle",
    ];
    return t[year % t.length];
  }
  if (year <= 1989) {
    // DART opened 1984
    const t: TransportType[] = ["dart", "double-decker", "dart", "cie-bus"];
    return t[year % t.length];
  }
  // 1990s
  const t: TransportType[] = ["dart", "nineties-car", "double-decker", "dart"];
  return t[year % t.length];
}

function getLabel(type: TransportType, year: number): string {
  const labels: Record<TransportType, string> = {
    tram: "Dublin United Tramways Co. · Double-deck open-top tram",
    "horse-cart": "Horse-drawn delivery cart · Still common on Dublin streets",
    bicycle: "The bicycle · Affordable transport for working Dubliners",
    "early-motor": `Early motor car · A rare and remarkable sight, c.${year}`,
    "cie-bus": "CIÉ single-deck bus · Replaced trams after 1949",
    "double-decker":
      "CIÉ double-decker bus · The Leyland Titan on Dublin routes",
    dart: "DART · Dublin Area Rapid Transit, opened 23 July 1984",
    "nineties-car": "The private car · Dominant on Dublin roads by the 1990s",
  };
  return labels[type];
}

// ── Shared elements ───────────────────────────────────────────────────────────
function Cobbles() {
  return (
    <>
      {Array.from({ length: 20 }, (_, i) => (
        <ellipse
          key={i}
          cx={i * 14 + 7}
          cy="152"
          rx="6"
          ry="3"
          fill="#a09070"
          stroke="#8a7858"
          strokeWidth="0.5"
          opacity="0.7"
        />
      ))}
    </>
  );
}
function Tarmac() {
  return (
    <>
      <rect x="0" y="144" width="280" height="16" fill="#4a4a4a" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect
          key={i}
          x={i * 48 + 10}
          y="151"
          width="28"
          height="3"
          rx="1"
          fill="#f0e8a0"
          opacity="0.6"
        />
      ))}
    </>
  );
}

// ── 1: Dublin tram (DUTC) ─────────────────────────────────────────────────────
function DublinTram() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      <line x1="0" y1="148" x2="280" y2="148" stroke="#888" strokeWidth="2.5" />
      <line x1="0" y1="154" x2="280" y2="154" stroke="#888" strokeWidth="2.5" />
      {Array.from({ length: 14 }, (_, i) => (
        <rect
          key={i}
          x={i * 20 + 2}
          y="146"
          width="10"
          height="10"
          fill="#7a6a50"
          rx="1"
        />
      ))}
      <rect
        x="20"
        y="88"
        width="230"
        height="52"
        rx="4"
        fill="#c8a030"
        stroke="#8a6a10"
        strokeWidth="1.5"
      />
      {[36, 70, 104, 138, 172, 206].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="96"
          width="24"
          height="28"
          rx="2"
          fill="#d4e8f0"
          stroke="#8a6a10"
          strokeWidth="1"
          opacity="0.9"
        />
      ))}
      {[36, 70, 104, 138, 172, 206].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="110"
          x2={x + 24}
          y2="110"
          stroke="#8a6a10"
          strokeWidth="0.8"
        />
      ))}
      <rect
        x="228"
        y="98"
        width="18"
        height="42"
        rx="2"
        fill="#b89020"
        stroke="#8a6a10"
        strokeWidth="1"
      />
      <circle cx="234" cy="120" r="2" fill="#8a6a10" />
      <rect
        x="24"
        y="52"
        width="222"
        height="40"
        rx="3"
        fill="#d4aa38"
        stroke="#8a6a10"
        strokeWidth="1.5"
      />
      <rect x="24" y="52" width="222" height="5" rx="2" fill="#8a6a10" />
      {[36, 70, 104, 138, 172, 206].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="58"
          width="24"
          height="26"
          rx="2"
          fill={i % 2 === 0 ? "#d4e8f0" : "#e8f4fa"}
          stroke="#8a6a10"
          strokeWidth="1"
          opacity="0.85"
        />
      ))}
      {[44, 78, 118, 152, 186].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="62" rx="5" ry="5" fill="#3a2a18" />
          <rect x={x - 4} y="67" width="8" height="12" rx="2" fill="#2a1a10" />
        </g>
      ))}
      <rect
        x="28"
        y="46"
        width="214"
        height="8"
        rx="3"
        fill="#c89820"
        stroke="#8a6a10"
        strokeWidth="1"
      />
      <rect
        x="60"
        y="36"
        width="150"
        height="14"
        rx="2"
        fill="#1a1208"
        stroke="#8a6a10"
        strokeWidth="1"
      />
      <text
        x="135"
        y="47"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="8"
        fill="#f0e8d0"
        letterSpacing="2"
      >
        NELSON'S PILLAR · RATHMINES
      </text>
      <line
        x1="135"
        y1="46"
        x2="135"
        y2="12"
        stroke="#5a5a5a"
        strokeWidth="2.5"
      />
      <line
        x1="100"
        y1="12"
        x2="175"
        y2="12"
        stroke="#3a3a3a"
        strokeWidth="2"
      />
      <line
        x1="0"
        y1="10"
        x2="280"
        y2="10"
        stroke="#5a5a5a"
        strokeWidth="1"
        strokeDasharray="4,2"
      />
      <circle cx="135" cy="12" r="4" fill="#5a5a5a" />
      <rect
        x="22"
        y="136"
        width="226"
        height="12"
        rx="2"
        fill="#5a4010"
        stroke="#3a2808"
        strokeWidth="1"
      />
      {[52, 96, 174, 218].map((cx, i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy="148"
            r="14"
            fill="#2a1a08"
            stroke="#5a4010"
            strokeWidth="2"
          />
          <circle
            cx={cx}
            cy="148"
            r="8"
            fill="#3a2a10"
            stroke="#5a4010"
            strokeWidth="1"
          />
          <circle cx={cx} cy="148" r="3" fill="#5a4010" />
          {[0, 45, 90, 135].map((a, j) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={148}
                x2={cx + 11 * Math.cos(r)}
                y2={148 + 11 * Math.sin(r)}
                stroke="#5a4010"
                strokeWidth="1.2"
              />
            );
          })}
        </g>
      ))}
      <rect
        x="100"
        y="100"
        width="70"
        height="22"
        rx="2"
        fill="#b89020"
        stroke="#8a6a10"
        strokeWidth="0.8"
      />
      <text
        x="135"
        y="110"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="6"
        fill="#1a1208"
        fontWeight="bold"
        letterSpacing="1"
      >
        D.U.T.C.
      </text>
      <text
        x="135"
        y="118"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="5"
        fill="#1a1208"
        fontStyle="italic"
      >
        Dublin United Tramways
      </text>
      {Array.from({ length: 20 }, (_, i) => (
        <ellipse
          key={i}
          cx={i * 14 + 7}
          cy="158"
          rx="6"
          ry="3"
          fill="#a09070"
          stroke="#8a7858"
          strokeWidth="0.5"
          opacity="0.6"
        />
      ))}
      <rect x="260" y="32" width="4" height="116" fill="#5a5040" />
      <path
        d="M264,32 Q272,28 276,34"
        fill="none"
        stroke="#5a5040"
        strokeWidth="3"
      />
      <ellipse cx="276" cy="36" rx="5" ry="4" fill="#f0e8a0" opacity="0.8" />
    </svg>
  );
}

// ── 2: Horse cart ─────────────────────────────────────────────────────────────
function HorseCart() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      <Cobbles />
      <rect
        x="130"
        y="80"
        width="120"
        height="56"
        rx="3"
        fill="#8B5A2B"
        stroke="#5a3010"
        strokeWidth="2"
      />
      {[140, 160, 180, 200, 220, 240].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1="80"
          x2={x}
          y2="136"
          stroke="#5a3010"
          strokeWidth="1.2"
        />
      ))}
      <rect x="130" y="130" width="120" height="6" rx="1" fill="#5a3010" />
      <ellipse
        cx="165"
        cy="108"
        rx="18"
        ry="22"
        fill="#7a4a20"
        stroke="#5a3010"
        strokeWidth="1.5"
      />
      <ellipse cx="165" cy="90" rx="18" ry="6" fill="#8a5a28" />
      {[95, 105, 115, 125].map((y, i) => (
        <line
          key={i}
          x1="147"
          y1={y}
          x2="183"
          y2={y}
          stroke="#5a3010"
          strokeWidth="1"
        />
      ))}
      <ellipse
        cx="215"
        cy="108"
        rx="15"
        ry="18"
        fill="#7a4a20"
        stroke="#5a3010"
        strokeWidth="1.5"
      />
      <ellipse cx="215" cy="93" rx="15" ry="5" fill="#8a5a28" />
      {[155, 225].map((cx, i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy="142"
            r="20"
            fill="none"
            stroke="#3a2010"
            strokeWidth="3"
          />
          <circle cx={cx} cy="142" r="4" fill="#3a2010" />
          {[0, 30, 60, 90, 120, 150].map((a, j) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={142}
                x2={cx + 16 * Math.cos(r)}
                y2={142 + 16 * Math.sin(r)}
                stroke="#3a2010"
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      ))}
      <line
        x1="130"
        y1="118"
        x2="68"
        y2="118"
        stroke="#5a3010"
        strokeWidth="3"
      />
      <line
        x1="130"
        y1="108"
        x2="68"
        y2="108"
        stroke="#5a3010"
        strokeWidth="3"
      />
      <ellipse
        cx="55"
        cy="110"
        rx="40"
        ry="22"
        fill="#5a3a20"
        stroke="#3a2010"
        strokeWidth="1.5"
      />
      <path
        d="M90,98 Q105,88 110,78 Q112,68 106,65 Q98,62 92,70 Q88,78 82,90 Z"
        fill="#5a3a20"
        stroke="#3a2010"
        strokeWidth="1"
      />
      <ellipse cx="107" cy="72" rx="6" ry="5" fill="#4a2a18" />
      <circle cx="100" cy="68" r="2" fill="#2a1008" />
      <circle cx="99.5" cy="67.5" r="0.8" fill="#fff" />
      {[30, 42, 54, 68].map((x, i) => (
        <g key={i}>
          <rect
            x={x}
            y="128"
            width="8"
            height="26"
            rx="3"
            fill="#4a2a18"
            stroke="#3a2010"
            strokeWidth="1"
          />
          <ellipse cx={x + 4} cy="154" rx="5" ry="3" fill="#3a2010" />
        </g>
      ))}
      <path
        d="M108,74 Q90,80 70,98 Q60,105 52,108"
        fill="none"
        stroke="#8a6a40"
        strokeWidth="1.5"
      />
      <ellipse cx="145" cy="76" rx="9" ry="9" fill="#c8a880" />
      <rect x="136" y="84" width="18" height="20" rx="3" fill="#2a1a10" />
      <rect x="136" y="68" width="18" height="5" rx="2" fill="#1a1208" />
      <rect x="139" y="60" width="12" height="10" rx="2" fill="#1a1208" />
    </svg>
  );
}

// ── 3: Bicycle ────────────────────────────────────────────────────────────────
function Bicycle() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      <Cobbles />
      <circle
        cx="90"
        cy="118"
        r="42"
        fill="none"
        stroke="#1a1208"
        strokeWidth="3"
      />
      <circle cx="90" cy="118" r="6" fill="#1a1208" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={90}
            y1={118}
            x2={90 + 37 * Math.cos(a)}
            y2={118 + 37 * Math.sin(a)}
            stroke="#1a1208"
            strokeWidth="1"
          />
        );
      })}
      <circle
        cx="210"
        cy="118"
        r="42"
        fill="none"
        stroke="#1a1208"
        strokeWidth="3"
      />
      <circle cx="210" cy="118" r="6" fill="#1a1208" />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={210}
            y1={118}
            x2={210 + 37 * Math.cos(a)}
            y2={118 + 37 * Math.sin(a)}
            stroke="#1a1208"
            strokeWidth="1"
          />
        );
      })}
      <line
        x1="130"
        y1="118"
        x2="148"
        y2="68"
        stroke="#1a1208"
        strokeWidth="4"
      />
      <line
        x1="148"
        y1="68"
        x2="185"
        y2="72"
        stroke="#1a1208"
        strokeWidth="4"
      />
      <line
        x1="185"
        y1="72"
        x2="130"
        y2="118"
        stroke="#1a1208"
        strokeWidth="4"
      />
      <line
        x1="130"
        y1="118"
        x2="90"
        y2="118"
        stroke="#1a1208"
        strokeWidth="4"
      />
      <line
        x1="148"
        y1="68"
        x2="90"
        y2="118"
        stroke="#1a1208"
        strokeWidth="3"
      />
      <line
        x1="185"
        y1="72"
        x2="210"
        y2="118"
        stroke="#1a1208"
        strokeWidth="4"
      />
      <circle
        cx="130"
        cy="118"
        r="8"
        fill="#2a1a08"
        stroke="#1a1208"
        strokeWidth="2"
      />
      <line
        x1="130"
        y1="118"
        x2="120"
        y2="132"
        stroke="#3a2a10"
        strokeWidth="3"
      />
      <line
        x1="130"
        y1="118"
        x2="140"
        y2="104"
        stroke="#3a2a10"
        strokeWidth="3"
      />
      <rect x="114" y="131" width="14" height="5" rx="1" fill="#3a2a10" />
      <rect x="134" y="100" width="14" height="5" rx="1" fill="#3a2a10" />
      <path
        d="M138,63 Q148,58 158,62"
        fill="none"
        stroke="#3a2a10"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="148"
        y1="62"
        x2="148"
        y2="70"
        stroke="#3a2a10"
        strokeWidth="3"
      />
      <line
        x1="185"
        y1="72"
        x2="190"
        y2="54"
        stroke="#1a1208"
        strokeWidth="3"
      />
      <line
        x1="183"
        y1="50"
        x2="198"
        y2="50"
        stroke="#1a1208"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="168" cy="52" rx="10" ry="10" fill="#c8a880" />
      <rect x="158" y="43" width="20" height="5" rx="2" fill="#1a1208" />
      <rect x="162" y="35" width="12" height="10" rx="2" fill="#1a1208" />
      <path d="M158,62 Q160,78 148,68 Q152,58 162,62Z" fill="#2a1a10" />
      <line
        x1="162"
        y1="65"
        x2="188"
        y2="54"
        stroke="#2a1a10"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="155"
        y1="72"
        x2="140"
        y2="104"
        stroke="#2a1a10"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="155"
        y1="72"
        x2="120"
        y2="130"
        stroke="#2a1a10"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── 4: Early motor car ────────────────────────────────────────────────────────
function EarlyMotorCar() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      <Cobbles />
      <rect
        x="30"
        y="118"
        width="220"
        height="10"
        rx="2"
        fill="#2a1a08"
        stroke="#1a0e04"
        strokeWidth="1.5"
      />
      <rect
        x="50"
        y="82"
        width="170"
        height="42"
        rx="4"
        fill="#8B3010"
        stroke="#5a1e08"
        strokeWidth="2"
      />
      <path
        d="M50,90 Q40,86 28,90 L24,100 Q22,108 28,110 L50,110 Z"
        fill="#7a2808"
        stroke="#5a1e08"
        strokeWidth="1.5"
      />
      {[92, 97, 102, 107].map((y, i) => (
        <line
          key={i}
          x1="28"
          y1={y}
          x2="48"
          y2={y}
          stroke="#5a1e08"
          strokeWidth="1"
        />
      ))}
      <rect
        x="18"
        y="88"
        width="12"
        height="22"
        rx="2"
        fill="#3a3030"
        stroke="#2a2020"
        strokeWidth="1"
      />
      <circle
        cx="22"
        cy="86"
        r="7"
        fill="#d4c878"
        stroke="#8a8050"
        strokeWidth="1.5"
      />
      <circle cx="22" cy="86" r="4" fill="#f0e8a0" opacity="0.9" />
      <rect
        x="155"
        y="72"
        width="36"
        height="26"
        rx="2"
        fill="#c8e0e8"
        stroke="#5a1e08"
        strokeWidth="1.5"
        opacity="0.85"
      />
      <path
        d="M155,72 Q175,58 215,66 L215,82 Q175,72 155,82 Z"
        fill="#1a1208"
        stroke="#0a0804"
        strokeWidth="1"
      />
      <rect
        x="72"
        y="88"
        width="36"
        height="32"
        rx="2"
        fill="#7a2808"
        stroke="#5a1e08"
        strokeWidth="1"
      />
      <rect
        x="76"
        y="90"
        width="28"
        height="18"
        rx="2"
        fill="#c8e0e8"
        stroke="#5a1e08"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <rect
        x="112"
        y="88"
        width="38"
        height="32"
        rx="2"
        fill="#7a2808"
        stroke="#5a1e08"
        strokeWidth="1"
      />
      <rect
        x="116"
        y="90"
        width="30"
        height="18"
        rx="2"
        fill="#c8e0e8"
        stroke="#5a1e08"
        strokeWidth="0.8"
        opacity="0.8"
      />
      <ellipse cx="175" cy="75" rx="9" ry="9" fill="#c8a880" />
      <rect x="166" y="67" width="18" height="5" rx="2" fill="#1a1208" />
      <rect x="169" y="60" width="12" height="9" rx="2" fill="#1a1208" />
      {[68, 200].map((cx, i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy="130"
            r="24"
            fill="#1a1208"
            stroke="#3a2010"
            strokeWidth="2.5"
          />
          <circle cx={cx} cy="130" r="5" fill="#3a2010" />
          {Array.from({ length: 12 }, (_, j) => {
            const a = (j * 30 * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={130}
                x2={cx + 17 * Math.cos(a)}
                y2={130 + 17 * Math.sin(a)}
                stroke="#3a2010"
                strokeWidth="1.2"
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}

// ── 5: CIÉ single-deck bus (1950s) ───────────────────────────────────────────
function CIEBus() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      <Tarmac />
      {/* body */}
      <rect
        x="15"
        y="72"
        width="248"
        height="68"
        rx="6"
        fill="#2a5c2a"
        stroke="#1a3a1a"
        strokeWidth="2"
      />
      {/* cream band */}
      <rect
        x="15"
        y="88"
        width="248"
        height="18"
        fill="#f0e8d0"
        stroke="none"
      />
      {/* route number box */}
      <rect x="18" y="74" width="36" height="20" rx="3" fill="#1a1208" />
      <text
        x="36"
        y="88"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="12"
        fill="#f0e8d0"
        fontWeight="bold"
      >
        8
      </text>
      {/* destination */}
      <rect x="58" y="74" width="160" height="18" rx="2" fill="#1a1208" />
      <text
        x="138"
        y="86"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="8"
        fill="#f0e8d0"
        letterSpacing="1.5"
      >
        NELSON PILLAR via RATHMINES
      </text>
      {/* windows */}
      {[28, 72, 116, 160, 204].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="110"
          width="36"
          height="22"
          rx="3"
          fill="#c8dce8"
          stroke="#1a3a1a"
          strokeWidth="1"
          opacity="0.85"
        />
      ))}
      {/* door */}
      <rect
        x="232"
        y="100"
        width="28"
        height="40"
        rx="2"
        fill="#1e4a1e"
        stroke="#1a3a1a"
        strokeWidth="1"
      />
      <line
        x1="246"
        y1="100"
        x2="246"
        y2="140"
        stroke="#1a3a1a"
        strokeWidth="1"
      />
      <circle cx="237" cy="120" r="2.5" fill="#c8a040" />
      {/* CIÉ logo area */}
      <rect x="108" y="92" width="62" height="14" rx="2" fill="#2a5c2a" />
      <text
        x="139"
        y="102"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="9"
        fill="#f0e8d0"
        fontWeight="bold"
        letterSpacing="2"
      >
        CIÉ
      </text>
      {/* underside */}
      <rect x="15" y="136" width="248" height="8" rx="2" fill="#1a3a1a" />
      {/* wheels */}
      {[55, 210].map((cx, i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy="146"
            r="16"
            fill="#222"
            stroke="#444"
            strokeWidth="2"
          />
          <circle
            cx={cx}
            cy="146"
            r="9"
            fill="#333"
            stroke="#555"
            strokeWidth="1"
          />
          <circle cx={cx} cy="146" r="4" fill="#555" />
          {[0, 60, 120].map((a, j) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={146}
                x2={cx + 8 * Math.cos(r)}
                y2={146 + 8 * Math.sin(r)}
                stroke="#555"
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      ))}
      {/* exhaust */}
      <path
        d="M260,138 Q268,134 272,128"
        fill="none"
        stroke="#888"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={272 + i * 4}
          cy={128 - i * 5}
          r={2 + i}
          fill="#aaa"
          opacity={0.4 - i * 0.1}
        />
      ))}
    </svg>
  );
}

// ── 6: CIÉ double-decker (1960s–80s Leyland) ────────────────────────────────
function DoubleDecker() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      <Tarmac />
      {/* lower body */}
      <rect
        x="12"
        y="90"
        width="252"
        height="52"
        rx="4"
        fill="#cc2200"
        stroke="#881100"
        strokeWidth="2"
      />
      {/* upper body */}
      <rect
        x="16"
        y="42"
        width="244"
        height="52"
        rx="4"
        fill="#cc2200"
        stroke="#881100"
        strokeWidth="1.5"
      />
      {/* cream band lower */}
      <rect x="12" y="106" width="252" height="12" fill="#f0e8d0" />
      {/* upper windows */}
      {[26, 68, 110, 152, 194, 228].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="50"
          width="32"
          height="28"
          rx="2"
          fill="#c8dce8"
          stroke="#881100"
          strokeWidth="1"
          opacity="0.9"
        />
      ))}
      {/* lower windows */}
      {[26, 68, 110, 152, 194].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="94"
          width="32"
          height="22"
          rx="2"
          fill="#c8dce8"
          stroke="#881100"
          strokeWidth="1"
          opacity="0.9"
        />
      ))}
      {/* destination upper */}
      <rect x="18" y="44" width="200" height="14" rx="2" fill="#1a1208" />
      <text
        x="118"
        y="54"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="8"
        fill="#f0e8d0"
        letterSpacing="1"
      >
        AN LÁR · CITY CENTRE
      </text>
      {/* route box */}
      <rect x="222" y="44" width="32" height="22" rx="2" fill="#f0e8d0" />
      <text
        x="238"
        y="58"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="13"
        fill="#cc2200"
        fontWeight="bold"
      >
        16
      </text>
      {/* door */}
      <rect
        x="232"
        y="94"
        width="30"
        height="48"
        rx="2"
        fill="#aa1a00"
        stroke="#881100"
        strokeWidth="1"
      />
      <line
        x1="247"
        y1="94"
        x2="247"
        y2="142"
        stroke="#881100"
        strokeWidth="1"
      />
      {/* undercarriage */}
      <rect x="12" y="138" width="252" height="8" rx="2" fill="#881100" />
      {/* wheels */}
      {[50, 205].map((cx, i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy="147"
            r="17"
            fill="#1a1a1a"
            stroke="#333"
            strokeWidth="2.5"
          />
          <circle
            cx={cx}
            cy="147"
            r="9"
            fill="#2a2a2a"
            stroke="#444"
            strokeWidth="1"
          />
          <circle cx={cx} cy="147" r="4" fill="#444" />
          {[0, 45, 90, 135].map((a, j) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={147}
                x2={cx + 8 * Math.cos(r)}
                y2={147 + 8 * Math.sin(r)}
                stroke="#444"
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      ))}
      {/* passengers upper deck silhouettes */}
      {[38, 80, 122, 164].map((x, i) => (
        <ellipse
          key={i}
          cx={x + 6}
          cy="56"
          rx="5"
          ry="5"
          fill="#881100"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

// ── 7: DART train (1984+) ─────────────────────────────────────────────────────
function DARTTrain() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      {/* platform */}
      <rect x="0" y="128" width="280" height="32" fill="#c8bca8" />
      <rect x="0" y="124" width="280" height="6" fill="#a09888" />
      {/* rails */}
      <line x1="0" y1="132" x2="280" y2="132" stroke="#666" strokeWidth="2.5" />
      <line x1="0" y1="140" x2="280" y2="140" stroke="#666" strokeWidth="2.5" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={i}
          x={i * 28 + 4}
          y="130"
          width="10"
          height="12"
          fill="#8a7a60"
          rx="1"
        />
      ))}
      {/* DART body — two carriages */}
      {/* Carriage 1 */}
      <rect
        x="8"
        y="64"
        width="124"
        height="62"
        rx="5"
        fill="#006a4e"
        stroke="#004a34"
        strokeWidth="2"
      />
      <rect x="8" y="64" width="124" height="16" rx="5" fill="#f0e8d0" />
      <rect x="8" y="74" width="124" height="6" fill="#f0e8d0" />
      {/* windows car 1 */}
      {[18, 52, 86, 116].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="84"
          width="26"
          height="28"
          rx="2"
          fill="#c8dce8"
          stroke="#004a34"
          strokeWidth="1"
          opacity="0.9"
        />
      ))}
      {/* DART logo car 1 */}
      <text
        x="70"
        y="76"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="9"
        fill="#006a4e"
        fontWeight="bold"
        letterSpacing="2"
      >
        DART
      </text>
      {/* door car 1 */}
      <rect x="126" y="80" width="8" height="46" fill="#004a34" />
      {/* Carriage 2 */}
      <rect
        x="140"
        y="64"
        width="130"
        height="62"
        rx="5"
        fill="#006a4e"
        stroke="#004a34"
        strokeWidth="2"
      />
      <rect x="140" y="64" width="130" height="16" rx="5" fill="#f0e8d0" />
      <rect x="140" y="74" width="130" height="6" fill="#f0e8d0" />
      {[150, 184, 218, 248].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="84"
          width="26"
          height="28"
          rx="2"
          fill="#c8dce8"
          stroke="#004a34"
          strokeWidth="1"
          opacity="0.9"
        />
      ))}
      <text
        x="202"
        y="76"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="9"
        fill="#006a4e"
        fontWeight="bold"
        letterSpacing="2"
      >
        DART
      </text>
      {/* destination board */}
      <rect x="148" y="66" width="90" height="12" rx="2" fill="#1a1208" />
      <text
        x="193"
        y="75"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="7"
        fill="#f0e8d0"
        letterSpacing="1"
      >
        BRAY · HOWTH
      </text>
      {/* bogies */}
      {[35, 100, 168, 232].map((cx, i) => (
        <g key={i}>
          <rect x={cx - 18} y="124" width="36" height="8" rx="2" fill="#333" />
          <circle
            cx={cx - 10}
            cy="132"
            r="6"
            fill="#222"
            stroke="#444"
            strokeWidth="1.5"
          />
          <circle
            cx={cx + 10}
            cy="132"
            r="6"
            fill="#222"
            stroke="#444"
            strokeWidth="1.5"
          />
        </g>
      ))}
      {/* pantograph */}
      <line x1="70" y1="64" x2="70" y2="42" stroke="#555" strokeWidth="1.5" />
      <line x1="55" y1="42" x2="85" y2="42" stroke="#444" strokeWidth="2" />
      <line
        x1="0"
        y1="38"
        x2="280"
        y2="38"
        stroke="#666"
        strokeWidth="1"
        strokeDasharray="4,3"
      />
      {/* platform sign */}
      <rect
        x="240"
        y="90"
        width="36"
        height="24"
        rx="3"
        fill="#006a4e"
        stroke="#004a34"
        strokeWidth="1"
      />
      <text
        x="258"
        y="100"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="6"
        fill="#f0e8d0"
      >
        DART
      </text>
      <text
        x="258"
        y="109"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="5"
        fill="#f0e8d0"
      >
        Platform
      </text>
    </svg>
  );
}

// ── 8: 1990s car (Ford Sierra / Opel Vectra era) ──────────────────────────────
function NinetiesCar() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      <Tarmac />
      {/* body lower */}
      <rect
        x="20"
        y="100"
        width="240"
        height="38"
        rx="6"
        fill="#2a4a8a"
        stroke="#1a2a5a"
        strokeWidth="2"
      />
      {/* body upper / cabin */}
      <path
        d="M55,100 Q70,68 100,62 L200,62 Q228,68 236,100 Z"
        fill="#2a4a8a"
        stroke="#1a2a5a"
        strokeWidth="1.5"
      />
      {/* windscreen */}
      <path
        d="M100,64 Q115,70 140,72 L185,72 Q210,70 222,82 L216,100 L76,100 Z"
        fill="#c8dce8"
        stroke="#1a2a5a"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* rear window */}
      <path
        d="M200,64 Q215,68 224,80 L220,100 L185,100 L185,72 Z"
        fill="#c8dce8"
        opacity="0.7"
      />
      {/* side windows */}
      <rect
        x="78"
        y="76"
        width="58"
        height="22"
        rx="2"
        fill="#c8dce8"
        stroke="#1a2a5a"
        strokeWidth="0.8"
        opacity="0.8"
      />
      {/* door lines */}
      <line
        x1="138"
        y1="72"
        x2="138"
        y2="138"
        stroke="#1a2a5a"
        strokeWidth="1.5"
      />
      <line
        x1="195"
        y1="80"
        x2="195"
        y2="138"
        stroke="#1a2a5a"
        strokeWidth="1.5"
      />
      {/* door handles */}
      <rect x="115" y="112" width="14" height="4" rx="2" fill="#c8c8c8" />
      <rect x="164" y="112" width="14" height="4" rx="2" fill="#c8c8c8" />
      {/* headlights */}
      <rect
        x="22"
        y="108"
        width="22"
        height="14"
        rx="3"
        fill="#f0f0a0"
        stroke="#c8c820"
        strokeWidth="1"
        opacity="0.9"
      />
      <rect
        x="26"
        y="110"
        width="14"
        height="10"
        rx="2"
        fill="#fffff0"
        opacity="0.8"
      />
      {/* tail lights */}
      <rect
        x="238"
        y="108"
        width="18"
        height="14"
        rx="3"
        fill="#cc2020"
        stroke="#881010"
        strokeWidth="1"
      />
      <rect
        x="242"
        y="110"
        width="10"
        height="10"
        rx="2"
        fill="#ff4040"
        opacity="0.7"
      />
      {/* number plate */}
      <rect
        x="96"
        y="130"
        width="50"
        height="12"
        rx="1"
        fill="#f0e8d0"
        stroke="#444"
        strokeWidth="1"
      />
      <text
        x="121"
        y="140"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="7"
        fill="#1a1208"
        fontWeight="bold"
      >
        96 D 4821
      </text>
      {/* wheels */}
      {[72, 200].map((cx, i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy="142"
            r="18"
            fill="#1a1a1a"
            stroke="#333"
            strokeWidth="2.5"
          />
          <circle
            cx={cx}
            cy="142"
            r="11"
            fill="#2a2a2a"
            stroke="#555"
            strokeWidth="1"
          />
          <circle cx={cx} cy="142" r="5" fill="#666" />
          {[0, 72, 144, 216, 288].map((a, j) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={142}
                x2={cx + 9 * Math.cos(r)}
                y2={142 + 9 * Math.sin(r)}
                stroke="#555"
                strokeWidth="1.5"
              />
            );
          })}
          <circle
            cx={cx}
            cy="142"
            r="17"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="2"
            strokeDasharray="6,3"
          />
        </g>
      ))}
      {/* wing mirrors */}
      <rect
        x="60"
        y="90"
        width="10"
        height="5"
        rx="1"
        fill="#1a2a5a"
        stroke="#0a1a3a"
        strokeWidth="0.8"
      />
      <rect
        x="212"
        y="90"
        width="10"
        height="5"
        rx="1"
        fill="#1a2a5a"
        stroke="#0a1a3a"
        strokeWidth="0.8"
      />
      {/* aerial */}
      <line
        x1="185"
        y1="62"
        x2="190"
        y2="38"
        stroke="#888"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function TransportIllustration({
  year,
  transport_snapshot,
}: Props) {
  const type = getTransport(year);
  const label = getLabel(type, year);

  return (
    <div
      style={{
        border: "1px solid #b0a080",
        background: "#f5f0e4",
        padding: "10px 10px 6px",
        marginBottom: 10,
      }}
    >
      {type === "tram" && <DublinTram />}
      {type === "horse-cart" && <HorseCart />}
      {type === "bicycle" && <Bicycle />}
      {type === "early-motor" && <EarlyMotorCar />}
      {type === "cie-bus" && <CIEBus />}
      {type === "double-decker" && <DoubleDecker />}
      {type === "dart" && <DARTTrain />}
      {type === "nineties-car" && <NinetiesCar />}
      <p
        style={{
          fontFamily: "Georgia,serif",
          fontSize: 8,
          fontStyle: "italic",
          color: "#7a6040",
          textAlign: "center",
          paddingTop: 4,
          borderTop: "1px solid #c0b090",
          marginTop: 4,
        }}
      >
        {label}
      </p>
    </div>
  );
}
