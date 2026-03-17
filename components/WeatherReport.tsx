import React from "react";

interface WeatherReportProps {
  year: number;
  weather?: string;
}

const READINGS = [
  {
    label: "STORMY",
    needle: 28.3,
    desc: "Unsettled and stormy conditions prevail across the city. Barometric pressure has fallen sharply overnight. Citizens are advised to secure their vessels and remain indoors where practicable.",
  },
  {
    label: "CHANGE",
    needle: 29.4,
    desc: "Changeable weather persists over Dublin Bay. The glass stands at Change, with variable winds from the south-west. Rain is expected before evening.",
  },
  {
    label: "FAIR",
    needle: 30.1,
    desc: "Fair conditions are recorded across the county. A moderate breeze from the north-east keeps temperatures seasonable. Clear skies expected to continue.",
  },
  {
    label: "VERY DRY",
    needle: 30.8,
    desc: "Remarkably dry conditions for the season. The barometer stands high and steady. Light winds from the east. Agricultural districts report this the driest spell in several years.",
  },
];

// Map pressure (28–31) to SVG angle. Scale: 28 = -65°, 31 = +65°
function pressureToAngle(p: number): number {
  return -65 + ((p - 28) / 3) * 130;
}

// Brass barometer SVG
function BarometerSVG({ pressure }: { pressure: number }) {
  const angleDeg = pressureToAngle(pressure);
  const angleRad = (angleDeg * Math.PI) / 180;
  // Needle tip (length 52 from centre at 100,115)
  const nx = 100 + 52 * Math.sin(angleRad);
  const ny = 115 - 52 * Math.cos(angleRad);
  // Needle tail
  const tx = 100 - 12 * Math.sin(angleRad);
  const ty = 115 + 12 * Math.cos(angleRad);

  // Scale tick positions — 28 to 31 in 0.5 steps at radius 68 from (100,115)
  const ticks = [];
  for (let v = 28; v <= 31; v += 0.5) {
    const a = (pressureToAngle(v) * Math.PI) / 180;
    const isMajor = Number.isInteger(v);
    const r1 = isMajor ? 62 : 65;
    const r2 = 72;
    ticks.push({
      x1: 100 + r1 * Math.sin(a),
      y1: 115 - r1 * Math.cos(a),
      x2: 100 + r2 * Math.sin(a),
      y2: 115 - r2 * Math.cos(a),
      label: isMajor ? String(v) : null,
      lx: 100 + 78 * Math.sin(a),
      ly: 115 - 78 * Math.cos(a),
      major: isMajor,
    });
  }

  // Zone labels at mid-positions
  const zoneLabels = [
    { v: 28.5, text: "STORMY" },
    { v: 29.25, text: "RAIN" },
    { v: 29.75, text: "CHANGE" },
    { v: 30.35, text: "FAIR" },
    { v: 30.85, text: "VERY DRY" },
  ];

  return (
    <svg
      viewBox="0 0 200 190"
      width="100%"
      style={{ maxWidth: 200, display: "block", margin: "0 auto" }}
    >
      {/* Outer brass ring */}
      <circle
        cx="100"
        cy="115"
        r="90"
        fill="#c8a040"
        stroke="#8a6010"
        strokeWidth="3"
      />
      <circle
        cx="100"
        cy="115"
        r="85"
        fill="#f5edd8"
        stroke="#8a6010"
        strokeWidth="1"
      />

      {/* Zone arcs — coloured bands */}
      {/* Stormy zone 28–29 */}
      <path
        d={arcPath(100, 115, 60, pressureToAngle(28), pressureToAngle(29))}
        fill="none"
        stroke="rgba(100,20,20,0.18)"
        strokeWidth="8"
        strokeLinecap="butt"
      />
      {/* Fair zone 30–31 */}
      <path
        d={arcPath(100, 115, 60, pressureToAngle(30), pressureToAngle(31))}
        fill="none"
        stroke="rgba(20,80,20,0.15)"
        strokeWidth="8"
        strokeLinecap="butt"
      />

      {/* Scale ticks */}
      {ticks.map((t, i) => (
        <g key={i}>
          <line
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#5a3808"
            strokeWidth={t.major ? 1.8 : 0.9}
          />
          {t.label && (
            <text
              x={t.lx}
              y={t.ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7"
              fontFamily="Georgia,serif"
              fill="#3a2808"
            >
              {t.label}
            </text>
          )}
        </g>
      ))}

      {/* Zone labels */}
      {zoneLabels.map((z, i) => {
        const a = (pressureToAngle(z.v) * Math.PI) / 180;
        const r = 48;
        return (
          <text
            key={i}
            x={100 + r * Math.sin(a)}
            y={115 - r * Math.cos(a)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="4.5"
            fontFamily="Georgia,serif"
            fill="#6a3808"
            transform={`rotate(${pressureToAngle(z.v)}, ${100 + r * Math.sin(a)}, ${115 - r * Math.cos(a)})`}
          >
            {z.text}
          </text>
        );
      })}

      {/* Mercury column — decorative vertical tube at bottom */}
      <rect
        x="92"
        y="140"
        width="16"
        height="25"
        rx="8"
        fill="#d0c098"
        stroke="#8a6010"
        strokeWidth="1"
      />
      <rect x="95" y="142" width="10" height="20" rx="5" fill="#c8b060" />
      <rect
        x="97"
        y="144"
        width="6"
        height={Math.min(16, 5 + (pressure - 28) * 5)}
        rx="3"
        fill="#e0b840"
      />

      {/* Needle */}
      <line
        x1={tx}
        y1={ty}
        x2={nx}
        y2={ny}
        stroke="#8a1a1a"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Pivot */}
      <circle
        cx="100"
        cy="115"
        r="5"
        fill="#c8a040"
        stroke="#5a3808"
        strokeWidth="1.5"
      />
      <circle cx="100" cy="115" r="2" fill="#8a1a1a" />

      {/* Centre label */}
      <text
        x="100"
        y="128"
        textAnchor="middle"
        fontSize="6"
        fontFamily="Georgia,serif"
        fill="#5a3808"
        fontStyle="italic"
      >
        inches Hg
      </text>
    </svg>
  );
}

// Draw an SVG arc path at radius r from cx,cy, from startDeg to endDeg
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const s = ((startDeg - 0.5) * Math.PI) / 180;
  const e = ((endDeg + 0.5) * Math.PI) / 180;
  const x1 = cx + r * Math.sin(s);
  const y1 = cy - r * Math.cos(s);
  const x2 = cx + r * Math.sin(e);
  const y2 = cy - r * Math.cos(e);
  const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

export default function WeatherReport({ year, weather }: WeatherReportProps) {
  const idx = year % 4;
  const reading = READINGS[idx];
  const reportText = weather || reading.desc;

  return (
    <div style={{ marginBottom: 14 }}>
      {/* Section header in newspaper style */}
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
            fontFamily: "Georgia,serif",
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#1a1208",
          }}
        >
          Weather &amp; Barometer
        </span>
      </div>

      {/* Barometer card */}
      <div
        style={{
          background: "#f5edd8",
          border: "2px solid #8a6010",
          padding: "10px 8px 6px",
          textAlign: "center",
        }}
      >
        <BarometerSVG pressure={reading.needle} />

        {/* Reading label */}
        <div
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5a3808",
            marginTop: 4,
            borderTop: "1px solid #c8a040",
            paddingTop: 5,
          }}
        >
          {reading.label}
        </div>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 9,
            color: "#7a5820",
            letterSpacing: 1,
            marginBottom: 6,
          }}
        >
          {reading.needle}&Prime; Hg
        </div>

        {/* Weather prose */}
        <p
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 9.5,
            lineHeight: 1.75,
            fontStyle: "italic",
            color: "#3a2808",
            textAlign: "justify",
            borderTop: "1px dotted #c0a060",
            paddingTop: 6,
            margin: 0,
          }}
        >
          {reportText}
        </p>

        {/* Caption */}
        <p
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 7.5,
            color: "#7a5820",
            marginTop: 5,
            fontStyle: "italic",
            borderTop: "1px solid #c8a040",
            paddingTop: 4,
          }}
        >
          Recorded at the Meteorological Office, Merrion Square
        </p>
      </div>

      <div style={{ borderTop: "1px solid #b0a080", marginTop: 10 }} />
    </div>
  );
}
