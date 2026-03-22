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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 200 200"
    >
      <defs>
        <linearGradient id="busBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e7e2d8" />
          <stop offset="1" stop-color="#c9c2b6" />
        </linearGradient>
        <linearGradient id="busLower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2b3238" />
          <stop offset="1" stop-color="#0f1418" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#6f8799" />
          <stop offset="1" stop-color="#1b2a35" />
        </linearGradient>
      </defs>

      <g transform="translate(6 10)">
        <ellipse cx="96" cy="170" rx="70" ry="10" fill="#000" opacity=".12" />

        <polygon
          points="25,70 110,45 110,155 25,165"
          fill="url(#busBody)"
          stroke="#1a2a36"
          stroke-width="2.2"
        />
        <rect
          x="110"
          y="45"
          width="65"
          height="110"
          rx="10"
          fill="url(#busBody)"
          stroke="#1a2a36"
          stroke-width="2.2"
        />

        <polygon points="25,115 110,100 110,155 25,165" fill="url(#busLower)" />
        <rect x="110" y="100" width="65" height="55" fill="url(#busLower)" />

        <g fill="url(#glass)" stroke="#1b2a35" stroke-width="1.6">
          <polygon points="32,78 50,73 50,92 32,96" />
          <polygon points="54,72 72,66 72,86 54,90" />
          <polygon points="76,65 94,59 94,80 76,85" />
        </g>

        <g fill="url(#glass)" stroke="#1b2a35" stroke-width="1.6">
          <polygon points="32,110 50,108 50,130 32,132" />
          <polygon points="54,106 72,102 72,126 54,128" />
          <polygon points="76,101 94,98 94,122 76,124" />
        </g>

        <g fill="url(#glass)" stroke="#1b2a35" stroke-width="2">
          <rect x="118" y="52" width="25" height="22" rx="3" />
          <rect x="145" y="52" width="25" height="22" rx="3" />
          <rect x="118" y="78" width="52" height="30" rx="3" />
        </g>

        <rect
          x="118"
          y="72"
          width="52"
          height="18"
          rx="3"
          fill="#204a87"
          stroke="#1a2a36"
          stroke-width="1.5"
        />
        <text x="122" y="79" font-size="5" fill="#ffd84d" font-family="Arial">
          EVENING
        </text>
        <text x="122" y="85" font-size="5" fill="#ffffff" font-family="Arial">
          HERALD
        </text>
        <text x="122" y="90" font-size="4.5" fill="#ffd84d" font-family="Arial">
          DONNYBROOK
        </text>

        <rect x="118" y="110" width="52" height="45" fill="#0e1317" />

        <g stroke="#1c2730" stroke-width="1.5">
          <circle cx="130" cy="120" r="5.5" fill="#f5e6a8" />
          <circle cx="155" cy="120" r="5.5" fill="#f5e6a8" />
          <circle cx="130" cy="135" r="4.5" fill="#d9dee3" />
          <circle cx="155" cy="135" r="4.5" fill="#d9dee3" />
        </g>

        <rect
          x="130"
          y="140"
          width="25"
          height="8"
          rx="2"
          fill="#000"
          stroke="#d9dfe3"
          stroke-width="1"
        />
        <text x="134" y="146" font-size="5" fill="#fff" font-family="Arial">
          ZH
        </text>

        <g>
          <circle cx="60" cy="168" r="13" fill="#1a1f24" />
          <circle cx="135" cy="168" r="13" fill="#1a1f24" />
          <circle cx="60" cy="168" r="6" fill="#9aa3ab" />
          <circle cx="135" cy="168" r="6" fill="#9aa3ab" />
        </g>

        <g fill="none" stroke="#2d3c47" stroke-width="1.8">
          <path d="M45 150 C50 140, 55 138, 60 138 C65 138, 70 140, 75 150" />
          <path d="M120 150 C125 140, 130 138, 135 138 C140 138, 145 140, 150 150" />
        </g>

        <g opacity=".18" stroke="#ffffff" stroke-width="2">
          <line x1="35" y1="80" x2="45" y2="75" />
          <line x1="60" y1="72" x2="70" y2="67" />
          <line x1="80" y1="66" x2="90" y2="61" />
          <line x1="120" y1="56" x2="140" y2="70" />
        </g>

        <path
          d="M25 70 110 45 175 45 175 155 25 165Z"
          fill="none"
          stroke="#0f202c"
          stroke-width="2.3"
        />
        <line
          x1="110"
          y1="45"
          x2="110"
          y2="155"
          stroke="#31414c"
          stroke-width="2"
        />
      </g>
    </svg>
  );
}

// ── 6: CIÉ double-decker (1960s–80s Leyland) ────────────────────────────────
function DoubleDecker() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 200 200"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0" stop-color="#7da846" />
          <stop offset="1" stop-color="#587f2f" />
        </linearGradient>
        <linearGradient id="front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#86b34c" />
          <stop offset="1" stop-color="#648f36" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3a5870" />
          <stop offset="1" stop-color="#182734" />
        </linearGradient>
        <linearGradient id="glass2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#5d7c93" />
          <stop offset="1" stop-color="#1b2a38" />
        </linearGradient>
        <linearGradient id="shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#24323d" />
          <stop offset="1" stop-color="#0e151b" />
        </linearGradient>
      </defs>

      <g transform="translate(4 8)">
        <ellipse cx="106" cy="171" rx="68" ry="9" fill="#000" opacity=".14" />

        <polygon
          points="26,58 104,36 104,150 26,164"
          fill="url(#body)"
          stroke="#142432"
          stroke-width="2"
        />

        <path
          d="M104 36h61c8 0 14 6 14 14v92c0 8-6 14-14 14h-61z"
          fill="url(#front)"
          stroke="#142432"
          stroke-width="2"
        />

        <path
          d="M108 31h54c7 0 12 3 16 9l-6 4c-2-3-5-4-10-4h-54z"
          fill="#8db95b"
          opacity=".9"
        />

        <g fill="url(#glass)" stroke="#10202d" stroke-width="1.8">
          <polygon points="34,66 52,61 52,85 34,89" rx="2" />
          <polygon points="56,60 75,55 75,81 56,85" />
          <polygon points="80,53 98,48 98,76 80,80" />
        </g>

        <g fill="url(#glass2)" stroke="#10202d" stroke-width="1.8">
          <polygon points="34,101 52,98 52,123 34,126" />
          <polygon points="56,97 75,93 75,120 56,123" />
          <polygon points="80,91 98,87 98,116 80,119" />
        </g>

        <g opacity=".22" stroke="#dceaf5" stroke-width="2">
          <line x1="38" y1="68" x2="48" y2="62" />
          <line x1="60" y1="63" x2="71" y2="57" />
          <line x1="84" y1="56" x2="95" y2="49" />
          <line x1="38" y1="103" x2="49" y2="99" />
          <line x1="60" y1="99" x2="72" y2="94" />
          <line x1="84" y1="93" x2="96" y2="88" />
        </g>

        <polygon
          points="57,84 87,77 87,129 57,134"
          fill="#7a4b3f"
          opacity=".65"
          stroke="#9fb35d"
          stroke-width="1"
        />
        <line
          x1="28"
          y1="129"
          x2="104"
          y2="119"
          stroke="#f06f3b"
          stroke-width="2"
        />

        <rect
          x="114"
          y="63"
          width="58"
          height="22"
          rx="4"
          fill="#11181e"
          stroke="#2a3740"
          stroke-width="1.5"
        />
        <text
          x="120"
          y="73"
          font-size="5.4"
          fill="#eef6ff"
          font-family="Arial, Helvetica, sans-serif"
        >
          Spiddal Park
        </text>
        <text
          x="150"
          y="81"
          font-size="13"
          fill="#eef6ff"
          font-weight="700"
          font-family="Arial, Helvetica, sans-serif"
        >
          79
        </text>

        <g fill="url(#glass)" stroke="#10202d" stroke-width="2">
          <rect x="112" y="39" width="31" height="22" rx="3" />
          <rect x="143" y="39" width="33" height="22" rx="3" />
        </g>
        <g opacity=".22" stroke="#dceaf5" stroke-width="2">
          <line x1="116" y1="42" x2="139" y2="58" />
          <line x1="147" y1="41" x2="171" y2="57" />
        </g>

        <rect
          x="112"
          y="88"
          width="64"
          height="28"
          rx="3"
          fill="url(#glass2)"
          stroke="#10202d"
          stroke-width="2"
        />
        <g opacity=".2" stroke="#dceaf5" stroke-width="2">
          <line x1="116" y1="91" x2="172" y2="110" />
          <line x1="122" y1="90" x2="122" y2="114" />
          <line x1="149" y1="90" x2="149" y2="114" />
        </g>

        <g stroke="#1c242b" stroke-width="2.2" stroke-linecap="round">
          <line x1="126" y1="114" x2="136" y2="101" />
          <line x1="159" y1="114" x2="149" y2="101" />
        </g>
        <g
          stroke="#1c242b"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M103 83c-5 2-8 5-10 10" />
          <path d="M93 93v15" />
          <rect x="88" y="93" width="6" height="14" rx="2" fill="#1f2d39" />
          <path d="M179 86c4 2 7 5 9 9" />
          <path d="M188 95v16" />
          <rect x="187" y="96" width="6" height="14" rx="2" fill="#1f2d39" />
        </g>

        <line
          x1="105"
          y1="128"
          x2="177"
          y2="128"
          stroke="#f06f3b"
          stroke-width="2"
        />
        <rect
          x="117"
          y="107"
          width="8"
          height="8"
          rx="1.5"
          fill="#f19627"
          stroke="#553100"
          stroke-width="1"
        />
        <rect
          x="167"
          y="107"
          width="8"
          height="8"
          rx="1.5"
          fill="#f19627"
          stroke="#553100"
          stroke-width="1"
        />
        <g stroke="#f06f3b" stroke-width="1.4" fill="none" opacity=".95">
          <path d="M125 129c2-3 5-5 8-5 3 0 6 2 7 5m-14 0h14m-10 0v5m6-5v5" />
          <path d="M149 129c2-3 5-5 8-5 3 0 6 2 7 5m-14 0h14m-10 0v5m6-5v5" />
        </g>
        <rect x="136" y="127" width="12" height="8" rx="2" fill="#172026" />
        <rect
          x="132"
          y="139"
          width="28"
          height="11"
          rx="2"
          fill="#10161b"
          stroke="#d7dbe0"
          stroke-width="1"
        />
        <text
          x="136"
          y="147"
          font-size="7"
          fill="#f2f4f6"
          font-family="Arial, Helvetica, sans-serif"
        >
          839
        </text>

        <g stroke="#23313b" stroke-width="1.5">
          <circle cx="119" cy="131" r="6.6" fill="#ffd973" />
          <circle cx="119" cy="146" r="5.4" fill="#dfe7ee" />
          <circle cx="165" cy="131" r="6.6" fill="#dfe7ee" />
          <circle cx="170" cy="146" r="5.8" fill="#ffd973" />
          <circle cx="165" cy="146" r="5.4" fill="#dfe7ee" />
        </g>

        <path d="M105 150h74v9c0 3-2 5-5 5h-64c-3 0-5-2-5-5z" fill="#10161b" />

        <g stroke="#85a35b" stroke-width="1" opacity=".65">
          <line x1="52" y1="60" x2="52" y2="124" />
          <line x1="75" y1="54" x2="75" y2="120" />
          <line x1="98" y1="48" x2="98" y2="117" />
          <line x1="26" y1="92" x2="104" y2="82" />
          <line x1="26" y1="138" x2="104" y2="128" />
        </g>

        <polygon points="26,150 104,139 104,150 26,164" fill="#405527" />

        <g>
          <ellipse cx="58" cy="166" rx="12" ry="12.5" fill="#1a1f24" />
          <ellipse cx="142" cy="166" rx="13" ry="13.5" fill="#1a1f24" />
          <ellipse cx="58" cy="166" rx="5.2" ry="5.2" fill="#5d646b" />
          <ellipse cx="142" cy="166" rx="5.2" ry="5.2" fill="#5d646b" />
        </g>

        <path
          d="M44 154c3-6 8-9 14-9 6 0 11 3 14 9"
          fill="none"
          stroke="#33481f"
          stroke-width="2"
        />
        <path
          d="M127 153c3-6 9-10 15-10 7 0 13 4 16 10"
          fill="none"
          stroke="#33481f"
          stroke-width="2"
        />

        <path
          d="M26 58 104 36h61c8 0 14 6 14 14v92c0 8-6 14-14 14L26 164Z"
          fill="none"
          stroke="#0f1e2b"
          stroke-width="2.2"
          stroke-linejoin="round"
        />

        <line
          x1="104"
          y1="36"
          x2="104"
          y2="150"
          stroke="#31481f"
          stroke-width="2"
        />

        <g fill="#fff" opacity=".22">
          <rect x="114" y="66" width="22" height="1.5" />
          <rect x="114" y="91" width="26" height="1.5" />
          <rect x="35" y="104" width="8" height="1.5" />
        </g>
      </g>
    </svg>
  );
}

// ── 7: DART train (1984+) ─────────────────────────────────────────────────────
function DARTTrain() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 200 200"
    >
      <defs>
        <linearGradient id="dartBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#7cab2e" />
          <stop offset="1" stop-color="#4e8e22" />
        </linearGradient>
        <linearGradient id="dartFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#8ab641" />
          <stop offset="1" stop-color="#5f9827" />
        </linearGradient>
        <linearGradient id="dartGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#4f6f86" />
          <stop offset="1" stop-color="#182635" />
        </linearGradient>
        <linearGradient id="dartGlass2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#6888a1" />
          <stop offset="1" stop-color="#203140" />
        </linearGradient>
      </defs>

      <g transform="translate(6 18)">
        <ellipse cx="96" cy="152" rx="82" ry="10" fill="#000" opacity=".12" />

        <g opacity=".95">
          <path d="M10 150 L164 150 L182 156 L30 156 Z" fill="#0d1f31" />
          <path d="M18 145 L171 145 L188 150 L35 150 Z" fill="#c08a47" />
          <path d="M0 156 L25 156 L42 163 L17 163 Z" fill="#0d1f31" />
          <path d="M26 156 L180 156 L194 163 L39 163 Z" fill="#c08a47" />
          <g stroke="#d7d1c8" stroke-width="3" opacity=".8">
            <line x1="16" y1="150" x2="32" y2="157" />
            <line x1="36" y1="150" x2="52" y2="157" />
            <line x1="56" y1="150" x2="72" y2="157" />
            <line x1="76" y1="150" x2="92" y2="157" />
            <line x1="96" y1="150" x2="112" y2="157" />
            <line x1="116" y1="150" x2="132" y2="157" />
            <line x1="136" y1="150" x2="152" y2="157" />
            <line x1="156" y1="150" x2="172" y2="157" />
          </g>
        </g>

        <polygon
          points="16,88 103,53 103,133 16,133"
          fill="url(#dartBody)"
          stroke="#102437"
          stroke-width="2.2"
          stroke-linejoin="round"
        />
        <polygon
          points="16,88 103,53 151,56 68,93"
          fill="#5d9329"
          stroke="#102437"
          stroke-width="2.2"
          stroke-linejoin="round"
        />

        <path
          d="M103 53 L151 56 C163 57 172 64 172 75 L172 126 C172 135 166 142 157 142 L103 133 Z"
          fill="url(#dartFront)"
          stroke="#102437"
          stroke-width="2.2"
          stroke-linejoin="round"
        />

        <path d="M26 99 L92 74 L92 88 L26 112 Z" fill="#e6db3b" />
        <path d="M103 88 L172 88 L172 106 L103 106 Z" fill="#e6db3b" />

        <g fill="url(#dartGlass)" stroke="#102437" stroke-width="1.8">
          <polygon points="24,92 37,87 37,105 24,109" />
          <polygon points="41,85 57,79 57,99 41,104" />
          <polygon points="61,77 79,70 79,91 61,97" />
          <polygon points="83,68 97,62 97,84 83,89" />
        </g>

        <g opacity=".22" stroke="#e7f3ff" stroke-width="1.8">
          <line x1="27" y1="94" x2="35" y2="89" />
          <line x1="44" y1="87" x2="54" y2="81" />
          <line x1="65" y1="79" x2="76" y2="73" />
          <line x1="86" y1="71" x2="95" y2="66" />
        </g>

        <g>
          <polygon
            points="60,97 76,91 76,128 60,128"
            fill="#3f7c25"
            stroke="#102437"
            stroke-width="1.6"
          />
          <line
            x1="68"
            y1="94"
            x2="68"
            y2="128"
            stroke="#8dae60"
            stroke-width="1.2"
          />
        </g>

        <g stroke="#7ca451" stroke-width="1" opacity=".7">
          <line x1="16" y1="117" x2="103" y2="117" />
          <line x1="37" y1="87" x2="37" y2="132" />
          <line x1="57" y1="79" x2="57" y2="132" />
          <line x1="79" y1="70" x2="79" y2="132" />
          <line x1="97" y1="62" x2="97" y2="133" />
        </g>

        <g
          stroke="#122334"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        >
          <line x1="96" y1="50" x2="112" y2="30" />
          <line x1="112" y1="30" x2="130" y2="34" />
          <line x1="108" y1="42" x2="128" y2="33" />
          <line x1="128" y1="33" x2="142" y2="36" />
          <line x1="140" y1="36" x2="162" y2="30" />
        </g>
        <line
          x1="136"
          y1="30"
          x2="188"
          y2="30"
          stroke="#31414f"
          stroke-width="1.6"
          opacity=".7"
        />

        <rect
          x="121"
          y="60"
          width="39"
          height="16"
          rx="3"
          fill="#eef5fb"
          stroke="#102437"
          stroke-width="1.6"
        />
        <text
          x="127"
          y="67"
          font-size="4.6"
          fill="#1b2630"
          font-family="Arial, Helvetica, sans-serif"
        >
          Howth
        </text>
        <text
          x="126"
          y="73"
          font-size="4.6"
          fill="#1b2630"
          font-family="Arial, Helvetica, sans-serif"
        >
          Binn Éadair
        </text>

        <g fill="url(#dartGlass2)" stroke="#102437" stroke-width="2">
          <rect x="113" y="79" width="20" height="30" rx="3" />
          <rect x="134" y="79" width="17" height="30" rx="3" />
          <rect x="152" y="79" width="14" height="30" rx="3" />
        </g>

        <g opacity=".2" stroke="#e6f2ff" stroke-width="2">
          <line x1="116" y1="82" x2="129" y2="104" />
          <line x1="138" y1="82" x2="148" y2="103" />
          <line x1="154" y1="83" x2="163" y2="103" />
        </g>

        <g stroke="#1d2b36" stroke-width="2" stroke-linecap="round">
          <line x1="122" y1="109" x2="121" y2="83" />
          <line x1="148" y1="109" x2="147" y2="83" />
          <line x1="160" y1="108" x2="162" y2="87" />
        </g>

        <g transform="translate(131 120)">
          <text
            x="0"
            y="0"
            font-size="6.5"
            fill="#112130"
            font-style="italic"
            font-weight="700"
            font-family="Arial, Helvetica, sans-serif"
          >
            DART
          </text>
          <line
            x1="2"
            y1="4"
            x2="22"
            y2="4"
            stroke="#f49a1d"
            stroke-width="1.8"
          />
          <line
            x1="3"
            y1="7"
            x2="20"
            y2="7"
            stroke="#1f6d38"
            stroke-width="1.8"
          />
        </g>

        <text
          x="148"
          y="97"
          font-size="5.5"
          fill="#112130"
          font-family="Arial, Helvetica, sans-serif"
        >
          8123
        </text>

        <g stroke="#25333d" stroke-width="1.5">
          <rect x="114" y="116" width="9" height="10" rx="1.5" fill="#fff3bf" />
          <rect x="160" y="116" width="9" height="10" rx="1.5" fill="#fff3bf" />
        </g>

        <rect x="103" y="132" width="69" height="8" fill="#e14520" />
        <g stroke="#992313" stroke-width="1.2" opacity=".55">
          <line x1="108" y1="136" x2="166" y2="136" />
          <line x1="108" y1="139" x2="162" y2="139" />
        </g>

        <g fill="#111920" stroke="#293741" stroke-width="1.2">
          <rect x="112" y="140" width="46" height="8" rx="1.5" />
          <rect x="97" y="139" width="7" height="10" rx="1" />
          <circle cx="160" cy="145" r="3.8" fill="#2d3944" />
        </g>

        <g>
          <g transform="translate(55 136)">
            <rect x="-18" y="-1" width="34" height="8" rx="2" fill="#2a3742" />
            <circle cx="-10" cy="10" r="9" fill="#1a2127" />
            <circle cx="10" cy="10" r="9" fill="#1a2127" />
            <circle cx="-10" cy="10" r="3.8" fill="#5c656d" />
            <circle cx="10" cy="10" r="3.8" fill="#5c656d" />
          </g>
          <g transform="translate(115 138)">
            <rect x="-19" y="-2" width="38" height="8" rx="2" fill="#2a3742" />
            <circle cx="-10" cy="10" r="9.5" fill="#1a2127" />
            <circle cx="11" cy="10" r="9.5" fill="#1a2127" />
            <circle cx="-10" cy="10" r="4" fill="#5c656d" />
            <circle cx="11" cy="10" r="4" fill="#5c656d" />
          </g>
        </g>

        <g fill="#5d6771" opacity=".7">
          <rect x="27" y="130" width="12" height="5" rx="1" />
          <rect x="44" y="130" width="10" height="5" rx="1" />
          <rect x="80" y="130" width="13" height="5" rx="1" />
        </g>

        <g fill="#fff" opacity=".16">
          <path d="M26 92 L90 67 L90 71 L26 96 Z" />
          <path d="M107 57 L147 59 C154 60 160 63 164 68 L164 70 C158 66 153 64 146 63 L107 61 Z" />
        </g>

        <path
          d="M16 88 L103 53 L151 56 C163 57 172 64 172 75 L172 126 C172 135 166 142 157 142 L103 133 L16 133 Z"
          fill="none"
          stroke="#0b2238"
          stroke-width="2.3"
          stroke-linejoin="round"
        />

        <line
          x1="103"
          y1="53"
          x2="103"
          y2="133"
          stroke="#395123"
          stroke-width="2"
        />
      </g>
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
