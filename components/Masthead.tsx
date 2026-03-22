// Masthead — decade-responsive newspaper header for The Dublin Chronicle
// Every era has distinct background, typography, accent colour, borders and ornamentation.

import React, { CSSProperties } from "react";

interface Props {
  year: number;
}

interface DecadeStyle {
  bg: string;
  stripBg: string;
  titleFont: string;
  titleSize: string;
  titleWeight: number | string;
  titleColor: string;
  titleLetterSpacing: number;
  titlePaddingY: string;
  accentColor: string;
  ruleTop: string;
  ruleBottom: string;
  accentBar?: string;
  tagline: string;
  taglineFontSize: number;
  taglineLetterSpacing: number;
  taglineColor: string;
  stripColor: string;
  price: string;
  ornamentChar?: string;
}

function getDecadeStyle(year: number): DecadeStyle {
  // ── 1910s: Victorian broadsheet, GPO era ────────────────────────────────────
  if (year <= 1919)
    return {
      bg: "#080604",
      stripBg: "#040402",
      titleFont: "'UnifrakturMaguntia','Times New Roman',serif",
      titleSize: "clamp(42px,7vw,88px)",
      titleWeight: 400,
      titleColor: "#f0dfc0",
      titleLetterSpacing: 5,
      titlePaddingY: "10px",
      accentColor: "#b09040",
      ruleTop: "2px double #b09040",
      ruleBottom: "2px double #b09040",
      accentBar: "3px double #b09040",
      tagline:
        "For King & Country · The Newspaper of Record for the Irish Capital",
      taglineFontSize: 7,
      taglineLetterSpacing: 3,
      taglineColor: "#a09050",
      stripColor: "#a09050",
      price: "One Halfpenny",
      ornamentChar: "❧",
    };

  // ── 1920s: Free State, deep Irish green ─────────────────────────────────────
  if (year <= 1929)
    return {
      bg: "#0d2818",
      stripBg: "#0a2014",
      titleFont: "'UnifrakturMaguntia','Times New Roman',serif",
      titleSize: "clamp(40px,6.8vw,84px)",
      titleWeight: 400,
      titleColor: "#d8f0c8",
      titleLetterSpacing: 4,
      titlePaddingY: "12px",
      accentColor: "#3a8030",
      ruleTop: "1px solid #3a8030",
      ruleBottom: "2px solid #3a8030",
      tagline: "Faithful to the Free State · Covering Dublin Since 1859",
      taglineFontSize: 7,
      taglineLetterSpacing: 3,
      taglineColor: "#7ab880",
      stripColor: "#7ab880",
      price: "One Penny",
      ornamentChar: "✦",
    };

  // ── 1930s: Depression austerity, stark black, condensed ────────────────────
  if (year <= 1940)
    return {
      bg: "#0e0e0e",
      stripBg: "#0e0e0e",
      titleFont: "'IM Fell English',Georgia,serif",
      titleSize: "clamp(34px,5.4vw,70px)",
      titleWeight: 400,
      titleColor: "#d8d8d4",
      titleLetterSpacing: 1,
      titlePaddingY: "8px",
      accentColor: "#707070",
      ruleTop: "1px solid #505050",
      ruleBottom: "1px solid #505050",
      tagline: "Steady Through Lean Times · Dublin, Ireland",
      taglineFontSize: 6.5,
      taglineLetterSpacing: 2,
      taglineColor: "#787870",
      stripColor: "#787870",
      price: "One Penny",
    };

  // ── 1940s: Emergency, wartime newsprint, smaller/austere ───────────────────
  if (year <= 1945)
    return {
      bg: "#1a1a18",
      stripBg: "#141412",
      titleFont: "'UnifrakturMaguntia','Times New Roman',serif",
      titleSize: "clamp(30px,4.8vw,62px)",
      titleWeight: 400,
      titleColor: "#c4c4c0",
      titleLetterSpacing: 3,
      titlePaddingY: "7px",
      accentColor: "#706a60",
      ruleTop: "1px solid #504a40",
      ruleBottom: "1px solid #504a40",
      tagline: "Steadfast in the Emergency · Dublin, Éire",
      taglineFontSize: 6.5,
      taglineLetterSpacing: 2,
      taglineColor: "#8a8880",
      stripColor: "#8a8880",
      price: "One Penny",
    };

  // ── 1950s: Post-war navy, first hints of modernism, institutional ───────────
  if (year <= 1959)
    return {
      bg: "#0a1828",
      stripBg: "#08141e",
      titleFont: "'Playfair Display',Georgia,serif",
      titleSize: "clamp(38px,6vw,78px)",
      titleWeight: 900,
      titleColor: "#c8d8e8",
      titleLetterSpacing: 4,
      titlePaddingY: "13px",
      accentColor: "#4870a8",
      ruleTop: "2px solid #2a5888",
      ruleBottom: "2px solid #2a5888",
      tagline: "Building a New Ireland · Dublin, Ireland",
      taglineFontSize: 7.5,
      taglineLetterSpacing: 3,
      taglineColor: "#7898c0",
      stripColor: "#7898c0",
      price: "Twopence",
    };

  // ── 1960s: Modernising Ireland — warm off-white, black, single green rule ───
  // Think Irish Times c.1964 — clean, confident, institutional.
  // One thin green rule nods to RTÉ and the Lemass era optimism.
  // No ornament. Open tracking. The decade Ireland started looking outward.
  if (year <= 1969)
    return {
      bg: "#faf9f5",
      stripBg: "#f0efe8",
      titleFont: "'Libre Baskerville',Georgia,serif",
      titleSize: "clamp(36px,5.8vw,78px)",
      titleWeight: 700,
      titleColor: "#0d0d0d",
      titleLetterSpacing: 5,
      titlePaddingY: "14px",
      accentColor: "#2a7a2a",
      ruleTop: "1px solid #d0cfc8",
      ruleBottom: "2px solid #0d0d0d",
      accentBar: "2px solid #2a7a2a",
      tagline: "Dublin Forward · All the News Worth Knowing",
      taglineFontSize: 7.5,
      taglineLetterSpacing: 4,
      taglineColor: "#444444",
      stripColor: "#666666",
      price: "Threepence",
    };

  // ── 1970s: Troubles — warm newsprint, black, narrow red rule ───────────────
  // Think Irish Independent c.1974 — slightly yellowed stock, heavy black title.
  // One red rule at the top. Tagline tight and serious. No warmth.
  // The red is the bomb. The rest is just the paper trying to hold together.
  if (year <= 1979)
    return {
      bg: "#f7f2e8",
      stripBg: "#eee8d8",
      titleFont: "'Libre Baskerville',Georgia,serif",
      titleSize: "clamp(36px,5.8vw,76px)",
      titleWeight: 700,
      titleColor: "#0a0a0a",
      titleLetterSpacing: 2,
      titlePaddingY: "11px",
      accentColor: "#bb1a1a",
      ruleTop: "3px solid #bb1a1a",
      ruleBottom: "1px solid #c8bfa8",
      accentBar: "1px solid #c8bfa8",
      tagline: "Reporting Dublin Through Difficult Days",
      taglineFontSize: 7,
      taglineLetterSpacing: 2.5,
      taglineColor: "#3a3a3a",
      stripColor: "#5a5a5a",
      price: "5p",
    };

  // ── 1980s: Recession — off-white beige, black ink, thin red rule ───────────
  // Think Irish Independent c.1984 — clean but austere, slightly yellowed stock.
  // One thin red rule is the only colour. No ornament. No warmth.
  if (year <= 1989)
    return {
      bg: "#f5f0e8",
      stripBg: "#ede8de",
      titleFont: "'Playfair Display',Georgia,serif",
      titleSize: "clamp(36px,5.8vw,76px)",
      titleWeight: 900,
      titleColor: "#0a0a0a",
      titleLetterSpacing: 2,
      titlePaddingY: "11px",
      accentColor: "#cc1a1a",
      ruleTop: "1px solid #c0b8a8",
      ruleBottom: "2px solid #0a0a0a",
      accentBar: "2px solid #cc1a1a",
      tagline: "The Independent Voice of Dublin · Est. 1859",
      taglineFontSize: 7,
      taglineLetterSpacing: 2.5,
      taglineColor: "#3a3a3a",
      stripColor: "#5a5a5a",
      price: "20p",
    };

  // ── 1990s–2000: Celtic Tiger — pure white, black, single red hairline ───────
  // Irish Times c.1997. White stock, heavy black title, one red rule top.
  // Confident, clean, prosperous. No ornament, no warmth, just authority.
  return {
    bg: "#ffffff",
    stripBg: "#f4f4f4",
    titleFont: "'Playfair Display',Georgia,serif",
    titleSize: "clamp(40px,6.5vw,90px)",
    titleWeight: 900,
    titleColor: "#000000",
    titleLetterSpacing: 3,
    titlePaddingY: "14px",
    accentColor: "#cc1a1a",
    ruleTop: "3px solid #cc1a1a",
    ruleBottom: "1px solid #cccccc",
    tagline: "Dublin · Ireland · Europe · The World",
    taglineFontSize: 7.5,
    taglineLetterSpacing: 5,
    taglineColor: "#444444",
    stripColor: "#666666",
    price: year >= 1999 ? "£1.20" : year >= 1995 ? "£1.00" : "80p",
  };
}

const TRANSITION =
  "background 0.45s ease, color 0.45s ease, border-color 0.45s ease";

export default function Masthead({ year }: Props) {
  const s = getDecadeStyle(year);
  const vol = year - 1859;

  const stripStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 0",
    fontSize: 8,
    fontFamily: "Georgia,serif",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: s.stripColor,
    transition: TRANSITION,
  };

  return (
    <div
      style={{
        background: s.bg,
        color: s.titleColor,
        padding: "0 28px",
        transition: TRANSITION,
      }}
    >
      {/* ── Top info strip ─────────────────────────────────────────────────── */}
      <div
        style={{
          ...stripStyle,
          background: s.stripBg,
          borderBottom: s.ruleTop,
          margin: "0 -28px",
          padding: "5px 28px",
        }}
      >
        <span>Established 1859 · Vol. {vol}</span>
        <span style={{ letterSpacing: 2 }}>
          The Newspaper of Record for the Irish Capital
        </span>
        <span>{s.price}</span>
      </div>

      {/* ── Title block ────────────────────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: `${s.titlePaddingY} 0` }}>
        {/* Victorian double-rule ornament above title */}
        {year <= 1919 && (
          <div
            style={{
              borderTop: `3px double ${s.accentColor}`,
              borderBottom: `1px solid ${s.accentColor}`,
              height: 4,
              margin: "0 0 10px",
            }}
          />
        )}

        {/* 1970s hard red bar above title */}
        {year >= 1970 && year <= 1979 && (
          <div
            style={{ height: 4, background: s.accentColor, margin: "0 0 8px" }}
          />
        )}

        {/* Title */}
        <div
          style={{
            fontFamily: s.titleFont,
            fontSize: s.titleSize,
            fontWeight: s.titleWeight,
            lineHeight: 1,
            letterSpacing: s.titleLetterSpacing,
            color: s.titleColor,
            transition: "color 0.45s ease",
          }}
        >
          {s.ornamentChar && (
            <span
              style={{
                fontSize: "0.4em",
                verticalAlign: "middle",
                marginRight: "0.5em",
                opacity: 0.7,
                color: s.accentColor,
              }}
            >
              {s.ornamentChar}
            </span>
          )}
          The Dublin Chronicle
          {s.ornamentChar && (
            <span
              style={{
                fontSize: "0.4em",
                verticalAlign: "middle",
                marginLeft: "0.5em",
                opacity: 0.7,
                color: s.accentColor,
              }}
            >
              {s.ornamentChar}
            </span>
          )}
        </div>

        {/* Victorian double-rule ornament below title */}
        {year <= 1919 && (
          <div
            style={{
              borderTop: `1px solid ${s.accentColor}`,
              borderBottom: `3px double ${s.accentColor}`,
              height: 4,
              margin: "10px 0 0",
            }}
          />
        )}

        {/* Accent bar */}
        {s.accentBar && year > 1919 && (
          <div
            style={{
              borderTop: s.accentBar,
              margin: "8px auto 0",
              width: "60%",
            }}
          />
        )}

        {/* Tagline row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            justifyContent: "center",
            marginTop: 7,
            fontSize: s.taglineFontSize,
            letterSpacing: s.taglineLetterSpacing,
            textTransform: "uppercase",
            fontFamily: "Georgia,serif",
            color: s.taglineColor,
            opacity: 0.9,
            transition: "color 0.45s ease",
          }}
        >
          <div
            style={{ flex: 1, height: 1, background: `${s.accentColor}66` }}
          />
          {s.tagline}
          <div
            style={{ flex: 1, height: 1, background: `${s.accentColor}66` }}
          />
        </div>
      </div>

      {/* ── Bottom info strip ──────────────────────────────────────────────── */}
      <div style={{ ...stripStyle, borderTop: s.ruleBottom }}>
        <span style={{ fontStyle: "italic" }}>Dublin · Ireland</span>
        <span
          style={{
            letterSpacing: 3,
            fontWeight: 700,
            fontSize: 11,
            color: s.titleColor,
          }}
        >
          The Year of Our Lord {year} · Final Edition
        </span>
        <span style={{ fontStyle: "italic" }}>{s.price}</span>
      </div>
    </div>
  );
}
