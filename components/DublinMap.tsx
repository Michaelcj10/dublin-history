import React, { useState } from "react";

interface DublinMapProps {
  year: number;
  keyLocations: string[];
}

const LOCATION_COORDS: Record<string, { x: number; y: number }> = {
  GPO: { x: 140, y: 95 },
  "General Post Office": { x: 140, y: 95 },
  "Four Courts": { x: 80, y: 100 },
  Kilmainham: { x: 30, y: 115 },
  "Kilmainham Gaol": { x: 30, y: 115 },
  "Dublin Castle": { x: 110, y: 125 },
  "Trinity College": { x: 145, y: 130 },
  "Liberty Hall": { x: 160, y: 105 },
  "St Stephen's Green": { x: 135, y: 150 },
  "Boland's Mills": { x: 195, y: 130 },
  "Jacob's Factory": { x: 105, y: 140 },
  "Mansion House": { x: 140, y: 145 },
  "Croke Park": { x: 165, y: 60 },
  "Mountjoy Prison": { x: 125, y: 60 },
  "Abbey Theatre": { x: 155, y: 100 },
  "Stonebreakers' Yard": { x: 30, y: 115 },
  "Mount Street Bridge": { x: 175, y: 125 },
};

function matchLocation(name: string): { x: number; y: number } | null {
  // Direct match
  if (LOCATION_COORDS[name]) return LOCATION_COORDS[name];
  // Partial match
  const lower = name.toLowerCase();
  for (const [key, coords] of Object.entries(LOCATION_COORDS)) {
    if (
      lower.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lower.split(" ")[0].toLowerCase())
    ) {
      return coords;
    }
  }
  return null;
}

export default function DublinMap({ year, keyLocations }: DublinMapProps) {
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);
  const [selected, setSelected] = useState<{
    label: string;
    detail: string;
  } | null>(null);

  // Resolve matched locations (keep full original text for the info panel)
  const matched: Array<{
    label: string;
    fullText: string;
    x: number;
    y: number;
  }> = [];
  const seen = new Set<string>();
  for (const loc of keyLocations) {
    const name = loc.split(/[—:–]/)[0].trim();
    const coords = matchLocation(name);
    const key = `${coords?.x}-${coords?.y}`;
    if (coords && !seen.has(key)) {
      seen.add(key);
      matched.push({ label: name, fullText: loc, x: coords.x, y: coords.y });
    }
  }

  function handleDotClick(label: string, fullText: string) {
    setSelected((prev) =>
      prev?.label === label ? null : { label, detail: fullText },
    );
  }

  return (
    <div style={{ marginBottom: 10 }}>
      {/* Section header */}
      <div
        style={{
          textAlign: "center",
          padding: "3px 0",
          borderTop: "2px solid #1a1208",
          borderBottom: "1px solid #1a1208",
          margin: "10px 0 6px",
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
          Central Dublin
        </span>
      </div>

      <div
        style={{
          position: "relative",
          background: "#f5eed8",
          border: "3px double #8a6010",
        }}
      >
        <svg
          viewBox="0 0 230 200"
          width="100%"
          style={{ display: "block", fontFamily: "Georgia,serif" }}
          onMouseLeave={() => setTooltip(null)}
        >
          {/* Map paper background */}
          <rect x="0" y="0" width="230" height="200" fill="#f5eed8" />

          {/* Double-rule outer frame */}
          <rect
            x="3"
            y="3"
            width="224"
            height="194"
            fill="none"
            stroke="#8a6010"
            strokeWidth="2"
          />
          <rect
            x="6"
            y="6"
            width="218"
            height="188"
            fill="none"
            stroke="#8a6010"
            strokeWidth="0.6"
          />

          {/* === Street grid (approximate) === */}

          {/* North Quays (Bachelors Walk / Eden Quay) */}
          <path
            d="M 20,108 Q 80,106 120,107 Q 160,107 210,105"
            fill="none"
            stroke="#b0a060"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* South Quays (Burgh / Aston) */}
          <path
            d="M 20,114 Q 80,114 120,113 Q 160,113 210,112"
            fill="none"
            stroke="#b0a060"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* River Liffey — gentle curve east-west */}
          <path
            d="M 18,111 Q 60,109 100,110 Q 140,111 175,110 Q 195,110 212,109"
            fill="none"
            stroke="#8ab0c8"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* River fill */}
          <path
            d="M 18,108 Q 60,106 100,107 Q 140,108 175,107 Q 195,107 212,106 L 212,113 Q 195,113 175,113 Q 140,114 100,113 Q 60,113 18,114 Z"
            fill="rgba(138,176,200,0.35)"
            stroke="none"
          />
          <text
            x="60"
            y="112"
            fontSize="5"
            fill="#5080a0"
            fontStyle="italic"
            fontFamily="Georgia,serif"
          >
            River Liffey
          </text>

          {/* O'Connell Street / Sackville Street — wide boulevard north */}
          <path
            d="M 140,50 L 140,107"
            fill="none"
            stroke="#c8b890"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 136,50 L 136,107"
            fill="none"
            stroke="#c8b890"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text
            x="143"
            y="80"
            fontSize="5.5"
            fill="#5a3808"
            fontFamily="Georgia,serif"
            transform="rotate(-90 143 80)"
          >
            Sackville St
          </text>

          {/* Grafton Street — south of Liffey */}
          <path
            d="M 138,113 L 138,168"
            fill="none"
            stroke="#c8b890"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="141"
            y="145"
            fontSize="5"
            fill="#5a3808"
            fontFamily="Georgia,serif"
            transform="rotate(-90 141 145)"
          >
            Grafton St
          </text>

          {/* Dame Street — east-west south of Liffey */}
          <path
            d="M 100,125 Q 120,124 145,125 Q 160,125 185,126"
            fill="none"
            stroke="#c8b890"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <text
            x="115"
            y="122"
            fontSize="4.5"
            fill="#7a5820"
            fontFamily="Georgia,serif"
          >
            Dame St
          </text>

          {/* College Green */}
          <ellipse
            cx="150"
            cy="128"
            rx="8"
            ry="5"
            fill="#b8d0a0"
            stroke="#6a8840"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <text
            x="150"
            y="128.5"
            textAnchor="middle"
            fontSize="4"
            fill="#3a5820"
            fontFamily="Georgia,serif"
          >
            College Green
          </text>

          {/* Trinity College — block */}
          <rect
            x="155"
            y="122"
            width="22"
            height="18"
            rx="1"
            fill="#e8e0c0"
            stroke="#8a7040"
            strokeWidth="1"
          />
          <text
            x="166"
            y="132"
            textAnchor="middle"
            fontSize="4.5"
            fill="#3a2808"
            fontFamily="Georgia,serif"
          >
            Trinity
          </text>

          {/* St Stephen's Green */}
          <rect
            x="122"
            y="143"
            width="20"
            height="16"
            rx="2"
            fill="#b8d8a0"
            stroke="#6a8840"
            strokeWidth="1"
          />
          <text
            x="132"
            y="152"
            textAnchor="middle"
            fontSize="4"
            fill="#3a5820"
            fontFamily="Georgia,serif"
          >
            St. Stephen&apos;s
          </text>
          <text
            x="132"
            y="157"
            textAnchor="middle"
            fontSize="4"
            fill="#3a5820"
            fontFamily="Georgia,serif"
          >
            Green
          </text>

          {/* Dublin Castle */}
          <rect
            x="101"
            y="118"
            width="14"
            height="12"
            rx="1"
            fill="#d8c898"
            stroke="#8a7040"
            strokeWidth="1"
          />
          {/* Castle battlements suggestion */}
          {[0, 3, 6, 9, 12].map((dx) => (
            <rect
              key={dx}
              x={101 + dx}
              y={116}
              width="2"
              height="2.5"
              fill="#8a7040"
            />
          ))}
          <text
            x="108"
            y="126"
            textAnchor="middle"
            fontSize="4"
            fill="#3a2808"
            fontFamily="Georgia,serif"
          >
            Castle
          </text>

          {/* Capel Street bridge area */}
          <rect
            x="98"
            y="105"
            width="8"
            height="8"
            rx="0"
            fill="#d8c898"
            stroke="#8a7040"
            strokeWidth="0.6"
          />

          {/* Parnell Square north */}
          <rect
            x="128"
            y="50"
            width="18"
            height="14"
            rx="1"
            fill="#b8d8a0"
            stroke="#6a8840"
            strokeWidth="0.8"
            opacity="0.7"
          />
          <text
            x="137"
            y="59"
            textAnchor="middle"
            fontSize="4"
            fill="#3a5820"
            fontFamily="Georgia,serif"
          >
            Parnell Sq
          </text>

          {/* Great Britain St / Parnell St east-west */}
          <path
            d="M 80,70 Q 120,68 160,68 Q 185,68 210,70"
            fill="none"
            stroke="#c8b890"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* North Circular Road suggestion */}
          <path
            d="M 30,55 Q 80,40 140,38 Q 185,38 210,60"
            fill="none"
            stroke="#b8a870"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="3,2"
          />

          {/* === Compass Rose (top-right) === */}
          <g transform="translate(198,22)">
            <circle
              cx="0"
              cy="0"
              r="12"
              fill="#f5edd8"
              stroke="#8a6010"
              strokeWidth="0.8"
            />
            <polygon points="0,-11 2,-3 0,-5 -2,-3" fill="#5a3808" />
            <polygon points="0,11 2,3 0,5 -2,3" fill="#a09070" />
            <polygon points="-11,0 -3,2 -5,0 -3,-2" fill="#a09070" />
            <polygon points="11,0 3,2 5,0 3,-2" fill="#a09070" />
            <text
              x="0"
              y="-13"
              textAnchor="middle"
              fontSize="6"
              fill="#3a2808"
              fontWeight="bold"
              fontFamily="Georgia,serif"
            >
              N
            </text>
          </g>

          {/* === Highlighted key locations === */}
          {matched.map((loc, i) => (
            <g
              key={i}
              style={{ cursor: "pointer" }}
              onClick={() => handleDotClick(loc.label, loc.fullText)}
              onMouseEnter={() =>
                setTooltip({ x: loc.x, y: loc.y, label: loc.label })
              }
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Outer ring */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r="5.5"
                fill="rgba(138,26,26,0.18)"
              />
              {/* Main dot */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r="3.5"
                fill={selected?.label === loc.label ? "#d44020" : "#8a1a1a"}
                stroke="#f5edd8"
                strokeWidth="1"
              />
              {/* Label — offset to avoid overlaps */}
              <text
                x={loc.x + 6}
                y={loc.y + 2}
                fontSize="5.5"
                fill="#1a0e00"
                fontFamily="Georgia,serif"
                style={{ pointerEvents: "none" }}
              >
                {loc.label.split(" ").slice(0, 2).join(" ")}
              </text>
            </g>
          ))}

          {/* Tooltip */}
          {tooltip && (
            <g>
              <rect
                x={Math.min(tooltip.x + 6, 165)}
                y={tooltip.y - 18}
                width={Math.min(tooltip.label.length * 4.2, 80)}
                height="14"
                rx="2"
                fill="#1a0e00"
                opacity="0.85"
              />
              <text
                x={Math.min(tooltip.x + 9, 168)}
                y={tooltip.y - 7.5}
                fontSize="6.5"
                fill="#f5edd8"
                fontFamily="Georgia,serif"
                style={{ pointerEvents: "none" }}
              >
                {tooltip.label}
              </text>
            </g>
          )}
        </svg>

        {/* Caption */}
        <p
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 7.5,
            fontStyle: "italic",
            color: "#7a5820",
            textAlign: "center",
            borderTop: "1px solid #c8a040",
            padding: "4px 6px",
            margin: 0,
            background: "#f5edd8",
          }}
        >
          {selected
            ? `${selected.label} — click pin again to close`
            : `Central Dublin — select a location, ${year}`}
        </p>
      </div>

      {/* Location detail panel */}
      {selected && (
        <div
          style={{
            background: "#faf6ea",
            border: "1px solid #b0a060",
            borderTop: "2px solid #8a1a1a",
            padding: "10px 14px",
            marginTop: 4,
            fontFamily: "Georgia,serif",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "#1a0e00",
              marginBottom: 4,
            }}
          >
            {selected.label}
          </div>
          <div
            style={{
              fontSize: 11,
              lineHeight: 1.5,
              color: "#2a1a08",
              fontStyle: "italic",
            }}
          >
            {selected.detail.includes("—") || selected.detail.includes("–")
              ? selected.detail.replace(/^[^—–]+[—–]\s*/, "")
              : selected.detail}
          </div>
        </div>
      )}

      <div style={{ borderTop: "1px solid #b0a080", marginTop: 10 }} />
    </div>
  );
}
