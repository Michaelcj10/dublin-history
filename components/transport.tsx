// TransportIllustration — period-accurate Dublin transport SVGs for 1916–1926
// All transport was pre-motor dominated:
// Dublin United Tramways Company trams were the backbone of public transport.
// Horse-drawn carts, bicycles, and early motor cars also visible.
// Rotates through 4 illustrations by year.

import React from "react";

interface Props {
  year: number;
  transport_snapshot?: string[];
}

type TransportType = "tram" | "horse-cart" | "bicycle" | "early-motor";

function getTransport(year: number): TransportType {
  const types: TransportType[] = [
    "tram",
    "horse-cart",
    "bicycle",
    "early-motor",
  ];
  return types[year % types.length];
}

// ── Dublin tram ───────────────────────────────────────────────────────────────
// Based on Dublin United Tramways Company double-deck open-top trams
function DublinTram() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      {/* track rails */}
      <line x1="0" y1="148" x2="280" y2="148" stroke="#888" strokeWidth="2.5" />
      <line x1="0" y1="154" x2="280" y2="154" stroke="#888" strokeWidth="2.5" />
      {/* rail ties */}
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

      {/* tram body — lower deck */}
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
      {/* lower deck windows */}
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
      {/* window frames cross-bar */}
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
      {/* lower deck door */}
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

      {/* tram body — upper deck (open top) */}
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
      {/* upper deck railing */}
      <rect x="24" y="52" width="222" height="5" rx="2" fill="#8a6a10" />
      {/* upper deck windows/open sides */}
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
      {/* upper deck passengers silhouettes */}
      {[44, 78, 118, 152, 186].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="62" rx="5" ry="5" fill="#3a2a18" />
          <rect x={x - 4} y="67" width="8" height="12" rx="2" fill="#2a1a10" />
        </g>
      ))}

      {/* roof / clerestory */}
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

      {/* destination board */}
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

      {/* trolley pole */}
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
      {/* overhead wire */}
      <line
        x1="0"
        y1="10"
        x2="280"
        y2="10"
        stroke="#5a5a5a"
        strokeWidth="1"
        strokeDasharray="4,2"
      />
      {/* trolley wheel */}
      <circle cx="135" cy="12" r="4" fill="#5a5a5a" />

      {/* undercarriage */}
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

      {/* wheels — large spoked */}
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
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={148}
                x2={cx + 11 * Math.cos(rad)}
                y2={148 + 11 * Math.sin(rad)}
                stroke="#5a4010"
                strokeWidth="1.2"
              />
            );
          })}
        </g>
      ))}

      {/* company crest on side */}
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

      {/* cobblestones suggestion */}
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

      {/* street lamp post */}
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

// ── Horse-drawn cart ──────────────────────────────────────────────────────────
function HorseCart() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      {/* ground / cobbles */}
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

      {/* cart body */}
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
      {/* cart side slats */}
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
      {/* cart floor reinforcement */}
      <rect x="130" y="130" width="120" height="6" rx="1" fill="#5a3010" />
      {/* cart contents — barrels */}
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

      {/* cart wheels */}
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
          <circle
            cx={cx}
            cy="142"
            r="17"
            fill="none"
            stroke="#5a3010"
            strokeWidth="1"
          />
          <circle cx={cx} cy="142" r="4" fill="#3a2010" />
          {[0, 30, 60, 90, 120, 150].map((a, j) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={j}
                x1={cx}
                y1={142}
                x2={cx + 16 * Math.cos(rad)}
                y2={142 + 16 * Math.sin(rad)}
                stroke="#3a2010"
                strokeWidth="1.5"
              />
            );
          })}
        </g>
      ))}

      {/* shafts */}
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

      {/* horse body */}
      <ellipse
        cx="55"
        cy="110"
        rx="40"
        ry="22"
        fill="#5a3a20"
        stroke="#3a2010"
        strokeWidth="1.5"
      />
      {/* horse head & neck */}
      <path
        d="M90,98 Q105,88 110,78 Q112,68 106,65 Q98,62 92,70 Q88,78 82,90 Z"
        fill="#5a3a20"
        stroke="#3a2010"
        strokeWidth="1"
      />
      {/* horse nose */}
      <ellipse cx="107" cy="72" rx="6" ry="5" fill="#4a2a18" />
      <circle cx="105" cy="70" r="1.5" fill="#2a1008" />
      {/* horse eye */}
      <circle cx="100" cy="68" r="2" fill="#2a1008" />
      <circle cx="99.5" cy="67.5" r="0.8" fill="#fff" />
      {/* horse mane */}
      <path
        d="M92,70 Q96,60 100,58 Q104,56 106,62"
        fill="#3a2010"
        stroke="none"
      />
      {/* horse ear */}
      <path
        d="M100,64 L103,56 L106,64"
        fill="#4a2a18"
        stroke="#3a2010"
        strokeWidth="0.8"
      />
      {/* horse legs */}
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
      {/* horse tail */}
      <path
        d="M18,108 Q8,118 10,130 Q14,135 18,128 Q16,120 22,112"
        fill="#3a2010"
        stroke="#2a1008"
        strokeWidth="1"
      />

      {/* reins */}
      <path
        d="M108,74 Q90,80 70,98 Q60,105 52,108"
        fill="none"
        stroke="#8a6a40"
        strokeWidth="1.5"
      />

      {/* driver on cart */}
      <ellipse cx="145" cy="76" rx="9" ry="9" fill="#c8a880" />
      <rect x="136" y="84" width="18" height="20" rx="3" fill="#2a1a10" />
      {/* driver hat */}
      <rect x="136" y="68" width="18" height="5" rx="2" fill="#1a1208" />
      <rect x="139" y="60" width="12" height="10" rx="2" fill="#1a1208" />
    </svg>
  );
}

// ── Bicycle ───────────────────────────────────────────────────────────────────
function Bicycle() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      {/* cobblestones */}
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

      {/* rear wheel */}
      <circle
        cx="90"
        cy="118"
        r="42"
        fill="none"
        stroke="#1a1208"
        strokeWidth="3"
      />
      <circle
        cx="90"
        cy="118"
        r="38"
        fill="none"
        stroke="#2a1a08"
        strokeWidth="1"
      />
      <circle cx="90" cy="118" r="6" fill="#1a1208" />
      {/* rear spokes */}
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

      {/* front wheel */}
      <circle
        cx="210"
        cy="118"
        r="42"
        fill="none"
        stroke="#1a1208"
        strokeWidth="3"
      />
      <circle
        cx="210"
        cy="118"
        r="38"
        fill="none"
        stroke="#2a1a08"
        strokeWidth="1"
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

      {/* frame — diamond */}
      {/* seat tube */}
      <line
        x1="130"
        y1="118"
        x2="148"
        y2="68"
        stroke="#1a1208"
        strokeWidth="4"
      />
      {/* top tube */}
      <line
        x1="148"
        y1="68"
        x2="185"
        y2="72"
        stroke="#1a1208"
        strokeWidth="4"
      />
      {/* down tube */}
      <line
        x1="185"
        y1="72"
        x2="130"
        y2="118"
        stroke="#1a1208"
        strokeWidth="4"
      />
      {/* chain stay */}
      <line
        x1="130"
        y1="118"
        x2="90"
        y2="118"
        stroke="#1a1208"
        strokeWidth="4"
      />
      {/* seat stay */}
      <line
        x1="148"
        y1="68"
        x2="90"
        y2="118"
        stroke="#1a1208"
        strokeWidth="3"
      />
      {/* fork */}
      <line
        x1="185"
        y1="72"
        x2="210"
        y2="118"
        stroke="#1a1208"
        strokeWidth="4"
      />

      {/* bottom bracket */}
      <circle
        cx="130"
        cy="118"
        r="8"
        fill="#2a1a08"
        stroke="#1a1208"
        strokeWidth="2"
      />

      {/* cranks */}
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
      {/* pedals */}
      <rect x="114" y="131" width="14" height="5" rx="1" fill="#3a2a10" />
      <rect x="134" y="100" width="14" height="5" rx="1" fill="#3a2a10" />

      {/* chain */}
      <ellipse
        cx="115"
        cy="118"
        rx="25"
        ry="6"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="2"
        strokeDasharray="3,2"
      />

      {/* seat */}
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

      {/* handlebars */}
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

      {/* rider */}
      {/* body */}
      <ellipse cx="168" cy="52" rx="10" ry="10" fill="#c8a880" />
      {/* hat */}
      <rect x="158" y="43" width="20" height="5" rx="2" fill="#1a1208" />
      <rect x="162" y="35" width="12" height="10" rx="2" fill="#1a1208" />
      {/* torso */}
      <path d="M158,62 Q160,78 148,68 Q152,58 162,62Z" fill="#2a1a10" />
      {/* arm to handlebar */}
      <line
        x1="162"
        y1="65"
        x2="188"
        y2="54"
        stroke="#2a1a10"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* leg */}
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

      {/* caption area */}
      <text
        x="140"
        y="158"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="8"
        fill="#7a6040"
        fontStyle="italic"
      >
        The working Dubliner's transport of choice
      </text>
    </svg>
  );
}

// ── Early motor car ───────────────────────────────────────────────────────────
// Based on a 1915–1920s open-top touring car
function EarlyMotorCar() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: "100%", display: "block" }}>
      {/* cobblestones */}
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

      {/* chassis / running board */}
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
      <rect x="20" y="122" width="240" height="6" rx="2" fill="#3a2010" />

      {/* body */}
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

      {/* hood / bonnet */}
      <path
        d="M50,90 Q40,86 28,90 L24,100 Q22,108 28,110 L50,110 Z"
        fill="#7a2808"
        stroke="#5a1e08"
        strokeWidth="1.5"
      />
      {/* bonnet louvres */}
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
      {/* radiator grille */}
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
      {[92, 96, 100, 104, 108].map((y, i) => (
        <line
          key={i}
          x1="18"
          y1={y}
          x2="30"
          y2={y}
          stroke="#5a5050"
          strokeWidth="0.8"
        />
      ))}
      {/* headlamp */}
      <circle
        cx="22"
        cy="86"
        r="7"
        fill="#d4c878"
        stroke="#8a8050"
        strokeWidth="1.5"
      />
      <circle cx="22" cy="86" r="4" fill="#f0e8a0" opacity="0.9" />

      {/* windscreen */}
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
      <line
        x1="173"
        y1="72"
        x2="173"
        y2="98"
        stroke="#5a1e08"
        strokeWidth="1"
      />

      {/* hood frame / canopy */}
      <path
        d="M155,72 Q175,58 215,66 L215,82 Q175,72 155,82 Z"
        fill="#1a1208"
        stroke="#0a0804"
        strokeWidth="1"
      />

      {/* doors and windows */}
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
      <circle cx="106" cy="106" r="2" fill="#c8a040" />

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
      <circle cx="148" cy="106" r="2" fill="#c8a040" />

      {/* driver */}
      <ellipse cx="175" cy="75" rx="9" ry="9" fill="#c8a880" />
      {/* driving cap */}
      <rect x="166" y="67" width="18" height="5" rx="2" fill="#1a1208" />
      <rect x="169" y="60" width="12" height="9" rx="2" fill="#1a1208" />
      {/* goggles */}
      <rect
        x="168"
        y="71"
        width="14"
        height="6"
        rx="3"
        fill="none"
        stroke="#3a3030"
        strokeWidth="1.5"
      />
      <rect
        x="170"
        y="72"
        width="4"
        height="4"
        rx="1"
        fill="#c8d8e0"
        opacity="0.7"
      />
      <rect
        x="177"
        y="72"
        width="4"
        height="4"
        rx="1"
        fill="#c8d8e0"
        opacity="0.7"
      />
      {/* driver torso */}
      <rect x="166" y="84" width="18" height="14" rx="2" fill="#2a1a10" />
      {/* steering wheel */}
      <circle
        cx="162"
        cy="92"
        r="10"
        fill="none"
        stroke="#3a2010"
        strokeWidth="2.5"
      />
      <circle cx="162" cy="92" r="3" fill="#3a2010" />
      <line
        x1="162"
        y1="82"
        x2="162"
        y2="102"
        stroke="#3a2010"
        strokeWidth="1.5"
      />
      <line
        x1="152"
        y1="92"
        x2="172"
        y2="92"
        stroke="#3a2010"
        strokeWidth="1.5"
      />

      {/* passenger */}
      <ellipse cx="118" cy="78" rx="8" ry="8" fill="#c8a880" />
      <rect x="110" y="75" width="16" height="5" rx="2" fill="#5a3020" />

      {/* wheels — with spokes */}
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
          <circle
            cx={cx}
            cy="130"
            r="18"
            fill="none"
            stroke="#3a2010"
            strokeWidth="1"
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
          {/* tyre tread marks */}
          <circle
            cx={cx}
            cy="130"
            r="23"
            fill="none"
            stroke="#2a2020"
            strokeWidth="2"
            strokeDasharray="5,3"
          />
        </g>
      ))}

      {/* exhaust pipe */}
      <path
        d="M248,114 Q256,112 262,108 Q266,105 264,102"
        fill="none"
        stroke="#3a3030"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* exhaust smoke */}
      <circle cx="264" cy="100" r="3" fill="#c0b8a8" opacity="0.5" />
      <circle cx="268" cy="96" r="4" fill="#c0b8a8" opacity="0.35" />
      <circle cx="272" cy="91" r="5" fill="#c0b8a8" opacity="0.2" />

      {/* number plate */}
      <rect
        x="18"
        y="112"
        width="24"
        height="8"
        rx="1"
        fill="#f0e8d0"
        stroke="#3a3030"
        strokeWidth="1"
      />
      <text
        x="30"
        y="119"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="5"
        fill="#1a1208"
      >
        IM 412
      </text>

      <text
        x="140"
        y="158"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="8"
        fill="#7a6040"
        fontStyle="italic"
      >
        Early motor car — a rare sight on Dublin streets
      </text>
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TransportIllustration({
  year,
  transport_snapshot,
}: Props) {
  const type = getTransport(year);

  const labels: Record<TransportType, string> = {
    tram: "Dublin United Tramways Co. · Double-deck open-top tram",
    "horse-cart": "Horse-drawn delivery cart · Still common on Dublin streets",
    bicycle: "The bicycle · Affordable transport for working Dubliners",
    "early-motor": "Early motor car · A rare and remarkable sight, c." + year,
  };

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
        {labels[type]}
      </p>
    </div>
  );
}
