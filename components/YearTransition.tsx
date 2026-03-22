import { useEffect, useRef, useState } from "react";

// ── Era colour map ─────────────────────────────────────────────────────────
interface EraPalette {
  bg: string;
  fg: string;
  accent: string;
  label: string;
  font: "serif" | "mono";
}

function getPalette(year: number): EraPalette {
  if (year <= 1920)
    return {
      bg: "#f5edd8",
      fg: "#1a0e00",
      accent: "#8a6030",
      label: "The Edwardian Age",
      font: "serif",
    };
  if (year <= 1929)
    return {
      bg: "#0e0c04",
      fg: "#d4aa20",
      accent: "#b08000",
      label: "The Art Deco Years",
      font: "serif",
    };
  if (year <= 1940)
    return {
      bg: "#f5f1e8",
      fg: "#1a1208",
      accent: "#5a4020",
      label: "The Depression Era",
      font: "serif",
    };
  if (year <= 1945)
    return {
      bg: "#d4cdb0",
      fg: "#1a1208",
      accent: "#8a1a1a",
      label: "The Emergency",
      font: "serif",
    };
  if (year <= 1959)
    return {
      bg: "#f0e8d0",
      fg: "#111",
      accent: "#1a4a8a",
      label: "The Post-War Years",
      font: "serif",
    };
  if (year <= 1969)
    return {
      bg: "#fff",
      fg: "#111",
      accent: "#e91e8c",
      label: "The Swinging Sixties",
      font: "serif",
    };
  if (year <= 1979)
    return {
      bg: "#100804",
      fg: "#e8c870",
      accent: "#d4a020",
      label: "The Seventies",
      font: "serif",
    };
  if (year <= 1989)
    return {
      bg: "#050510",
      fg: "#e0e0ff",
      accent: "#00ffff",
      label: "The Eighties",
      font: "mono",
    };
  if (year <= 1999)
    return {
      bg: "#000080",
      fg: "#ffff00",
      accent: "#ff00ff",
      label: "The Nineties",
      font: "mono",
    };
  return {
    bg: "#c0d4f0",
    fg: "#222",
    accent: "#1850a8",
    label: "The New Millennium",
    font: "serif",
  };
}

// Each digit rendered as a scrollable drum
function DigitDrum({
  digit,
  delay,
  accentColor,
  fgColor,
  fontFamily,
}: {
  digit: number;
  delay: number;
  accentColor: string;
  fgColor: string;
  fontFamily: string;
}) {
  const DIGIT_HEIGHT = 96; // px per digit slot (controls font size proportionally)
  const [offset, setOffset] = useState(0); // starts at 0 (digit 0)

  useEffect(() => {
    // Reset to 0 first (instant), then animate to target digit
    setOffset(0);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOffset(digit * DIGIT_HEIGHT);
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [digit]);

  return (
    <div
      style={{
        width: 72,
        height: DIGIT_HEIGHT,
        overflow: "hidden",
        position: "relative",
        borderBottom: `3px solid ${accentColor}`,
        borderTop: `3px solid ${accentColor}`,
        margin: "0 4px",
      }}
    >
      {/* Top/bottom fade masks */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom, transparent 30%, transparent 70%)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Digit strip */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transform: `translateY(-${offset}px)`,
          transition:
            offset === 0
              ? "none"
              : `transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
          willChange: "transform",
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            style={{
              height: DIGIT_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1,
              fontFamily,
              color: fgColor,
              userSelect: "none",
            }}
          >
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main overlay component ─────────────────────────────────────────────────
interface YearTransitionProps {
  year: number | null;
  visible: boolean;
}

export default function YearTransition({ year, visible }: YearTransitionProps) {
  const palette = year ? getPalette(year) : getPalette(1950);
  const fontFamily =
    palette.font === "mono"
      ? "'Courier New', monospace"
      : "'Playfair Display', Georgia, serif";

  // Parse year into 4 individual digits
  const digits = year
    ? [
        Math.floor(year / 1000),
        Math.floor((year % 1000) / 100),
        Math.floor((year % 100) / 10),
        year % 10,
      ]
    : [1, 9, 5, 0];

  // Fade overlay in/out
  const [opacity, setOpacity] = useState(0);
  const [display, setDisplay] = useState<"block" | "none">("none");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) {
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      setDisplay("block");
      // Small defer so display: block paints before opacity transition
      const raf = requestAnimationFrame(() => setOpacity(1));
      return () => cancelAnimationFrame(raf);
    } else {
      setOpacity(0);
      hideTimer.current = setTimeout(() => setDisplay("none"), 300);
      return () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
      };
    }
  }, [visible]);

  return (
    <div
      aria-live="polite"
      aria-label={year ? `Travelling to ${year}` : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: display === "none" ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transition: "opacity 150ms ease",
        background: palette.bg,
        color: palette.fg,
      }}
    >
      {/* Decorative top rule */}
      <div
        style={{
          width: 320,
          height: 2,
          background: `linear-gradient(to right, transparent, ${palette.accent}, transparent)`,
          marginBottom: 28,
        }}
      />

      {/* "TRAVELLING TO" label */}
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          opacity: 0.65,
          fontFamily,
          marginBottom: 20,
        }}
      >
        Travelling to
      </div>

      {/* Digit drums row */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {digits.map((d, i) => (
          <DigitDrum
            key={i}
            digit={d}
            delay={i * 55}
            accentColor={palette.accent}
            fgColor={palette.fg}
            fontFamily={fontFamily}
          />
        ))}
      </div>

      {/* Era label */}
      <div
        style={{
          marginTop: 28,
          fontSize: 12,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: 0.65,
          fontFamily,
        }}
      >
        {palette.label}
      </div>

      {/* Decorative bottom rule */}
      <div
        style={{
          width: 320,
          height: 2,
          background: `linear-gradient(to right, transparent, ${palette.accent}, transparent)`,
          marginTop: 28,
        }}
      />

      {/* Paper noise texture overlay (subtle) */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.04,
          pointerEvents: "none",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="ytnoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#ytnoise)" />
      </svg>
    </div>
  );
}
