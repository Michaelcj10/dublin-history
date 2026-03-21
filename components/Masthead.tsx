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
  ruleTop: string; // border shorthand for top-strip bottom edge
  ruleBottom: string; // border shorthand for bottom-strip top edge
  accentBar?: string; // optional extra accent bar below title block
  tagline: string;
  taglineFontSize: number;
  taglineLetterSpacing: number;
  taglineColor: string;
  stripColor: string;
  price: string;
  ornamentChar?: string; // optional unicode ornament around title
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

  // ── 1920s: Free State, deep Irish green, Art Nouveau ───────────────────────
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

  // ── 1960s: Modernising Ireland, dark charcoal, RTÉ-era green ───────────────
  if (year <= 1969)
    return {
      bg: "#222222",
      stripBg: "#1a1a1a",
      titleFont: "'Libre Baskerville',Georgia,serif",
      titleSize: "clamp(36px,5.8vw,76px)",
      titleWeight: 700,
      titleColor: "#ddf4d8",
      titleLetterSpacing: 6,
      titlePaddingY: "16px",
      accentColor: "#50a050",
      ruleTop: "2px solid #408840",
      ruleBottom: "2px solid #408840",
      accentBar: "4px solid #50a050",
      tagline: "Dublin Forward · All the News Worth Knowing",
      taglineFontSize: 8,
      taglineLetterSpacing: 4,
      taglineColor: "#70c070",
      stripColor: "#70c070",
      price: "Threepence",
    };

  // ── 1970s: Troubles, near-black, hard red accent, urgent ───────────────────
  if (year <= 1979)
    return {
      bg: "#0c0804",
      stripBg: "#100a06",
      titleFont: "'Libre Baskerville',Georgia,serif",
      titleSize: "clamp(36px,5.8vw,74px)",
      titleWeight: 700,
      titleColor: "#e8dcc0",
      titleLetterSpacing: 2,
      titlePaddingY: "11px",
      accentColor: "#cc2020",
      ruleTop: "3px solid #cc2020",
      ruleBottom: "3px solid #cc2020",
      accentBar: "3px solid #cc2020",
      tagline: "Reporting Dublin Through Difficult Days",
      taglineFontSize: 7,
      taglineLetterSpacing: 2,
      taglineColor: "#c09870",
      stripColor: "#c09870",
      price: "5p",
    };

  // ── 1980s: Recession + punk, dark purple-tinted, expressive ────────────────
  if (year <= 1989)
    return {
      bg: "#18141e",
      stripBg: "#100c16",
      titleFont: "'Playfair Display',Georgia,serif",
      titleSize: "clamp(38px,6.2vw,82px)",
      titleWeight: 900,
      titleColor: "#e8e0f4",
      titleLetterSpacing: 3,
      titlePaddingY: "13px",
      accentColor: "#9060cc",
      ruleTop: "2px solid #7040aa",
      ruleBottom: "2px solid #7040aa",
      tagline: "The Independent Voice of Dublin",
      taglineFontSize: 8,
      taglineLetterSpacing: 3,
      taglineColor: "#b090e0",
      stripColor: "#b090e0",
      price: "20p",
      ornamentChar: "◆",
    };

  // ── 1990s–2000: Celtic Tiger, clean sans-serif modernism ───────────────────
  return {
    bg: "#0f0f12",
    stripBg: "#08080a",
    titleFont: "'Arial Black','Impact','Helvetica Neue',sans-serif",
    titleSize: "clamp(38px,6vw,80px)",
    titleWeight: 900,
    titleColor: "#ffffff",
    titleLetterSpacing: -1,
    titlePaddingY: "14px",
    accentColor: "#00b4d8",
    ruleTop: "3px solid #00b4d8",
    ruleBottom: "1px solid #1a1a24",
    accentBar: "4px solid #00b4d8",
    tagline: "DUBLIN · IRELAND · THE WORLD",
    taglineFontSize: 7,
    taglineLetterSpacing: 6,
    taglineColor: "#00b4d8",
    stripColor: "#606070",
    price: "£1.00",
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
      <div
        style={{
          textAlign: "center",
          padding: `${s.titlePaddingY} 0 ${s.titlePaddingY}`,
        }}
      >
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
            style={{
              height: 4,
              background: s.accentColor,
              margin: "0 0 8px",
            }}
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

        {/* Accent bar below title (1960s green / 1970s red / 1990s gold) */}
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
      <div
        style={{
          ...stripStyle,
          borderTop: s.ruleBottom,
        }}
      >
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
