// CigaretteAd — period newspaper advertisement SVG
// Rotates between 3 authentic Irish/British cigarette brands of the 1916–1926 era:
// Player's Navy Cut, Woodbines, Gold Flake
// All were genuinely popular in Dublin during this period

import React from "react";

interface Props {
  year: number;
}

// Pick brand by year so it changes as you navigate
function getBrand(year: number) {
  const brands = [
    {
      name: "Player's Navy Cut",
      sub: "Cigarettes & Tobacco",
      established: "Est. Nottingham, 1877",
      copy: [
        "The Gentleman's Choice",
        "Rich in flavour · Mild in strength",
        "Sold throughout Ireland & the Empire",
      ],
      tagline: "It's the Tobacco that Counts",
      detail: "10 for 3d · 20 for 6d",
      // Hero: sailor inside lifebuoy — simplified SVG
      hero: "sailor",
    },
    {
      name: "Woodbine",
      sub: "Wild Woodbine Cigarettes",
      established: "W.D. & H.O. Wills · Bristol",
      copy: [
        "The Workman's Friend",
        "A penny for five — value unmatched",
        "The most popular cigarette in Ireland",
      ],
      tagline: "Smoke Woodbines — and be content",
      detail: "5 for 1d · 10 for 2d",
      hero: "woodbine",
    },
    {
      name: "Gold Flake",
      sub: "Honey Dew Cigarettes",
      established: "W.D. & H.O. Wills · Est. 1878",
      copy: [
        "Fragrant · Mild · Satisfying",
        "The cigarette of quality and refinement",
        "Favoured by officers and gentlemen",
      ],
      tagline: "Gold Flake — Always the Best",
      detail: "10 for 4d · 20 for 7d",
      hero: "goldflake",
    },
  ];
  return brands[year % brands.length];
}

// ── Hero illustrations ────────────────────────────────────────────────────────

function SailorHero() {
  return (
    <g>
      {/* Lifebuoy ring */}
      <circle
        cx="70"
        cy="52"
        r="34"
        fill="none"
        stroke="#1a1208"
        strokeWidth="8"
      />
      <circle
        cx="70"
        cy="52"
        r="34"
        fill="none"
        stroke="#f0e8d0"
        strokeWidth="5"
      />
      {/* Rope cross bands on lifebuoy */}
      <path
        d="M70,18 Q88,35 104,52 Q88,69 70,86 Q52,69 36,52 Q52,35 70,18Z"
        fill="none"
        stroke="#1a1208"
        strokeWidth="2.5"
        strokeDasharray="8,12"
      />
      {/* Sailor face */}
      <ellipse cx="70" cy="52" rx="18" ry="20" fill="#d4b896" />
      {/* Sailor hat */}
      <rect x="52" y="32" width="36" height="8" rx="4" fill="#1a1208" />
      <rect x="56" y="28" width="28" height="6" rx="2" fill="#1a1208" />
      <rect x="60" y="25" width="20" height="5" rx="2" fill="#f0e8d0" />
      {/* Eyes */}
      <circle cx="63" cy="50" r="2.5" fill="#1a1208" />
      <circle cx="77" cy="50" r="2.5" fill="#1a1208" />
      {/* Nose */}
      <path
        d="M70,52 L67,58 L73,58"
        fill="none"
        stroke="#a08060"
        strokeWidth="1"
      />
      {/* Smile */}
      <path
        d="M63,62 Q70,67 77,62"
        fill="none"
        stroke="#1a1208"
        strokeWidth="1.5"
      />
      {/* Collar */}
      <path d="M52,70 Q70,78 88,70 L88,85 Q70,90 52,85Z" fill="#1a1208" />
      <path
        d="M55,70 L70,82 L85,70"
        fill="none"
        stroke="#f0e8d0"
        strokeWidth="1.5"
      />
    </g>
  );
}

function WoodbineHero() {
  return (
    <g>
      {/* Woodbine flower */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 70 + 22 * Math.cos(rad);
        const cy = 52 + 22 * Math.sin(rad);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="10"
            ry="16"
            fill={i % 2 === 0 ? "#c8a840" : "#e0c060"}
            stroke="#a08020"
            strokeWidth="0.8"
            transform={`rotate(${angle},${cx},${cy})`}
          />
        );
      })}
      {/* Centre */}
      <circle
        cx="70"
        cy="52"
        r="14"
        fill="#d4a020"
        stroke="#a08010"
        strokeWidth="1.5"
      />
      <circle
        cx="70"
        cy="52"
        r="9"
        fill="#f0c030"
        stroke="#c09020"
        strokeWidth="1"
      />
      {/* Cigarette */}
      <rect x="88" y="46" width="34" height="8" rx="2" fill="#f5f0e8" />
      <rect x="88" y="46" width="8" height="8" rx="1" fill="#c8a040" />
      {/* Smoke wisps */}
      <path
        d="M122,46 Q125,38 122,30"
        fill="none"
        stroke="#b0a898"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M118,44 Q123,36 119,28"
        fill="none"
        stroke="#b0a898"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  );
}

function GoldFlakeHero() {
  return (
    <g>
      {/* Gold flake decorative shield */}
      <path
        d="M70,20 L100,30 L100,60 Q100,80 70,88 Q40,80 40,60 L40,30 Z"
        fill="#c8a020"
        stroke="#8a6800"
        strokeWidth="1.5"
      />
      <path
        d="M70,26 L95,34 L95,60 Q95,77 70,84 Q45,77 45,60 L45,34 Z"
        fill="#e0b828"
        stroke="#a07810"
        strokeWidth="1"
      />
      {/* GF initials */}
      <text
        x="70"
        y="52"
        textAnchor="middle"
        fontFamily="Georgia,serif"
        fontSize="18"
        fontWeight="bold"
        fill="#1a1208"
        letterSpacing="2"
      >
        GF
      </text>
      {/* Crown above */}
      <path
        d="M55,22 L58,14 L63,18 L70,12 L77,18 L82,14 L85,22 Z"
        fill="#d4a820"
        stroke="#8a6800"
        strokeWidth="1"
      />
      {/* Stars in shield corners */}
      <text x="55" y="40" textAnchor="middle" fontSize="8" fill="#1a1208">
        ★
      </text>
      <text x="85" y="40" textAnchor="middle" fontSize="8" fill="#1a1208">
        ★
      </text>
      <text x="55" y="72" textAnchor="middle" fontSize="8" fill="#1a1208">
        ★
      </text>
      <text x="85" y="72" textAnchor="middle" fontSize="8" fill="#1a1208">
        ★
      </text>
    </g>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CigaretteAd({ year }: Props) {
  const brand = getBrand(year);

  return (
    <div
      style={{
        border: "3px double #1a1208",
        background: "#e8dfc8",
        padding: "0",
        textAlign: "center",
        marginTop: 12,
        overflow: "hidden",
        fontFamily: "Georgia,'Times New Roman',serif",
      }}
    >
      {/* Top band */}
      <div
        style={{
          background: "#1a1208",
          color: "#f0e8d0",
          padding: "4px 8px",
          fontSize: 7,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        Advertisement
      </div>

      {/* Hero illustration */}
      <svg
        viewBox="0 0 140 105"
        style={{ width: "100%", display: "block", background: "#f5f0e4" }}
      >
        {/* Decorative border */}
        <rect
          x="2"
          y="2"
          width="136"
          height="101"
          rx="3"
          fill="none"
          stroke="#b0a060"
          strokeWidth="1"
          strokeDasharray="4,3"
        />

        {brand.hero === "sailor" && <SailorHero />}
        {brand.hero === "woodbine" && <WoodbineHero />}
        {brand.hero === "goldflake" && <GoldFlakeHero />}

        {/* Brand name banner across bottom of illustration */}
        <rect x="0" y="88" width="140" height="17" fill="#1a1208" />
        <text
          x="70"
          y="100"
          textAnchor="middle"
          fontFamily="Georgia,serif"
          fontSize="10"
          fontWeight="bold"
          fill="#f0e8d0"
          letterSpacing="2"
        >
          {brand.name.toUpperCase()}
        </text>
      </svg>

      {/* Body copy */}
      <div style={{ padding: "10px 12px 4px" }}>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#1a1208",
            marginBottom: 4,
          }}
        >
          {brand.sub}
        </div>

        <div
          style={{
            borderTop: "1px solid #b0a060",
            borderBottom: "1px solid #b0a060",
            padding: "5px 0",
            margin: "5px 0",
          }}
        >
          {brand.copy.map((line, i) => (
            <p
              key={i}
              style={{
                fontFamily: "Georgia,serif",
                fontSize: 10,
                lineHeight: 1.6,
                color: "#2a1a08",
                fontStyle: i > 0 ? "italic" : "normal",
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* Price */}
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 11,
            fontWeight: 700,
            color: "#1a1208",
            margin: "5px 0 3px",
          }}
        >
          {brand.detail}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 11,
            fontStyle: "italic",
            fontWeight: 700,
            color: "#1a1208",
            borderTop: "1px dotted #b0a060",
            paddingTop: 6,
            marginTop: 4,
          }}
        >
          ❝ {brand.tagline} ❞
        </div>

        {/* Established line */}
        <div
          style={{
            fontSize: 7,
            color: "#7a6040",
            marginTop: 5,
            letterSpacing: 1,
            fontFamily: "Georgia,serif",
            borderTop: "1px solid #b0a060",
            paddingTop: 4,
            marginBottom: 2,
          }}
        >
          {brand.established}
        </div>
      </div>
    </div>
  );
}
