import GAAScoreboard from "../components/GAAScoreboard";
import PoliticalBreakdown, {
  hasPoliticalData,
} from "../components/politicalbreakdown";
import TransportIllustration from "../components/transport";
import WeatherReport from "../components/WeatherReport";
import DeathNotices from "../components/DeathNotices";
import CurrencyAd from "../components/currencyAd";
import Masthead from "../components/Masthead";
import PeriodAd from "../components/periodAd";
import { getAdImages } from "../lib/getAdImages";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { useRouter } from "next/router";
import { useEffect, useCallback, useState, useRef } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Election {
  type: string;
  result_summary: string;
  winning_party?: string;
}
interface GAAFinal {
  championship: string;
  winner: string;
  runner_up: string;
  score?: string;
}
interface SportItem {
  category: string;
  detail: string;
}
interface PriceLadder {
  pint_of_guinness: string;
  loaf_of_bread: string;
  average_house_dublin: string;
  weekly_wage_labourer: string;
  twenty_cigarettes: string;
  pint_of_milk: string;
  note: string;
}
interface YearData {
  year: number;
  taoiseach?: string;
  timeline_summary: string;
  visual_scene: string;
  city_changes: string[];
  major_events: Array<
    string | { name: string; date?: string; impact?: string }
  >;
  population_estimate: string;
  transport_snapshot: string[];
  architecture_style: Array<string | { style: string; example?: string }>;
  major_industries: Array<string | { industry: string; significance?: string }>;
  key_locations: string[];
  timeline_tags: string[];
  elections: Election[];
  gaa_finals: GAAFinal[];
  sport?: SportItem[];
  price_of_a_pint?: string;
  price_ladder?: PriceLadder;
  cost_of_living?: string;
  notable_dubliners?: string[];
  notable_death?: string;
  notable_emigrant?: string;
  what_was_on?: string[];
  number_one_song?: string;
  weather_event?: string;
  irish_first?: string;
  quirky_story?: string;
  north_headline?: string;
  slang_or_phrase?: string;
  imageUrl?: string;
}

// ── Field helpers ─────────────────────────────────────────────────────────────

const ev = (e: YearData["major_events"][0]) =>
  typeof e === "string"
    ? e
    : [e.name, e.date && `(${e.date})`, e.impact].filter(Boolean).join(" — ");

const arch = (a: YearData["architecture_style"][0]) => {
  if (typeof a === "string") {
    const [s, ...r] = a.split(/[—:–]/);
    return { style: s.trim(), ex: r.join(" ").trim() };
  }
  return { style: a.style, ex: (a as any).example ?? "" };
};

const ind = (i: YearData["major_industries"][0]) => {
  if (typeof i === "string") {
    const [n, ...r] = i.split(/[—:–]/);
    return { name: n.trim(), detail: r.join(" ").trim() };
  }
  return { name: i.industry, detail: (i as any).significance ?? "" };
};

const loc = (l: string) => {
  const [p, ...r] = l.split(/[:—–]/);
  return { place: p.trim(), detail: r.join(" ").trim() };
};

function parsePintPrice(text: string): string {
  if (!text) return "—";
  const m = text.match(
    /(\d+[½¼¾]?d|\d+\/[–\-]|\d+\/\d*d?|\d+p|[£€]\d+[.,\d]*)/,
  );
  return m ? m[1] : "—";
}

function getEra(year: number): string {
  if (year <= 1921) return "Revolution";
  if (year <= 1923) return "Civil War";
  if (year <= 1931) return "Free State";
  if (year <= 1938) return "de Valera";
  if (year <= 1945) return "Emergency";
  if (year <= 1959) return "Post-War";
  if (year <= 1969) return "The Sixties";
  if (year <= 1979) return "The Seventies";
  if (year <= 1989) return "The Eighties";
  return "Celtic Tiger";
}

// ── Nav era theme (mirrors masthead palette) ──────────────────────────────────

function getNavEra(year: number) {
  if (year <= 1919)
    return {
      bg: "#080604",
      border: "3px double #b09040",
      accent: "#b09040",
      fg: "#f0dfc0",
      dim: "#6a5828",
      activeBg: "#b09040",
      activeFg: "#080604",
      decadeFg: "#c0a060",
    };
  if (year <= 1929)
    return {
      bg: "#0d2818",
      border: "2px solid #3a8030",
      accent: "#3a8030",
      fg: "#d8f0c8",
      dim: "#3a6030",
      activeBg: "#3a8030",
      activeFg: "#0d2818",
      decadeFg: "#7ac870",
    };
  if (year <= 1940)
    return {
      bg: "#0e0e0e",
      border: "1px solid #505050",
      accent: "#707070",
      fg: "#d8d8d4",
      dim: "#404040",
      activeBg: "#707070",
      activeFg: "#0e0e0e",
      decadeFg: "#a0a098",
    };
  if (year <= 1945)
    return {
      bg: "#1a1a18",
      border: "1px solid #504a40",
      accent: "#706a60",
      fg: "#c4c4c0",
      dim: "#403c38",
      activeBg: "#706a60",
      activeFg: "#1a1a18",
      decadeFg: "#908880",
    };
  if (year <= 1959)
    return {
      bg: "#0a1828",
      border: "2px solid #2a5888",
      accent: "#4870a8",
      fg: "#c8d8e8",
      dim: "#2a3848",
      activeBg: "#4870a8",
      activeFg: "#0a1828",
      decadeFg: "#7898c0",
    };
  if (year <= 1969)
    return {
      bg: "#f0efe8",
      border: "2px solid #0d0d0d",
      accent: "#2a7a2a",
      fg: "#0d0d0d",
      dim: "#888880",
      activeBg: "#0d0d0d",
      activeFg: "#f0efe8",
      decadeFg: "#2a7a2a",
    };
  if (year <= 1979)
    return {
      bg: "#f7f2e8",
      border: "3px solid #bb1a1a",
      accent: "#bb1a1a",
      fg: "#0a0a0a",
      dim: "#786858",
      activeBg: "#bb1a1a",
      activeFg: "#ffffff",
      decadeFg: "#5a4020",
    };
  if (year <= 1989)
    return {
      bg: "#f5f0e8",
      border: "1px solid #c0b8a8",
      accent: "#cc1a1a",
      fg: "#0a0a0a",
      dim: "#787060",
      activeBg: "#0a0a0a",
      activeFg: "#f5f0e8",
      decadeFg: "#cc1a1a",
    };
  return {
    bg: "#ffffff",
    border: "3px solid #cc1a1a",
    accent: "#cc1a1a",
    fg: "#000000",
    dim: "#888888",
    activeBg: "#cc1a1a",
    activeFg: "#ffffff",
    decadeFg: "#444444",
  };
}

// ── Shared primitives ─────────────────────────────────────────────────────────

const HRule = ({ thick }: { thick?: boolean }) => (
  <div
    style={{ borderTop: thick ? "4px double #1a1208" : "1px solid #b0a080" }}
  />
);
const ColRule = () => (
  <div
    style={{
      width: 1,
      background: "#b0a080",
      alignSelf: "stretch",
      minHeight: 20,
    }}
  />
);
const SecHead = ({ children }: { children: string }) => (
  <h2
    className="sec-head" // MOBILE
    style={{
      textAlign: "center",
      padding: "3px 0",
      borderTop: "2px solid #1a1208",
      borderBottom: "1px solid #1a1208",
      margin: "10px 0 8px",
    }}
  >
    <span
      className="sec-head-text" // MOBILE
      style={{
        fontFamily: "Georgia,'Times New Roman',serif",
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 3,
        color: "#1a1208",
      }}
    >
      {children}
    </span>
  </h2>
);
const BodyText = ({
  children,
  size = 12,
}: {
  children: React.ReactNode;
  size?: number;
}) => (
  <p
    className="body-text" // MOBILE
    style={{
      fontFamily: "Georgia,'Times New Roman',serif",
      fontSize: size,
      lineHeight: 1.85,
      color: "#1a1208",
      textAlign: "justify",
      marginBottom: 7,
    }}
  >
    {children}
  </p>
);
const SmallCap = ({ children }: { children: string }) => (
  <span
    style={{
      fontFamily: "Georgia,serif",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontWeight: 700,
      color: "#1a1208",
    }}
  >
    {children}
  </span>
);

// ── Guinness pint SVG ─────────────────────────────────────────────────────────

function GuinnessPint({ price }: { price: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg
        viewBox="0 0 90 160"
        width={90}
        height={160}
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="g-body" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0e0804" />
            <stop offset="45%" stopColor="#1e1208" />
            <stop offset="100%" stopColor="#080402" />
          </linearGradient>
          <linearGradient id="g-cream" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#f8f3ee" />
            <stop offset="100%" stopColor="#e0dbd4" />
          </linearGradient>
          <linearGradient id="g-shine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,.22)" />
            <stop offset="50%" stopColor="rgba(255,255,255,.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.07)" />
          </linearGradient>
        </defs>
        <path
          d="M20,142 L14,58 Q12,42 20,36 L70,36 Q78,42 76,58 L70,142 Z"
          fill="url(#g-body)"
          stroke="rgba(255,255,255,.18)"
          strokeWidth={0.8}
        />
        <path
          d="M14,58 Q12,42 20,36 L70,36 Q78,42 76,58 Q68,50 56,53 Q45,56 34,53 Q22,50 14,58 Z"
          fill="url(#g-cream)"
        />
        {[22, 33, 45, 56, 66].map((x, i) => (
          <ellipse
            key={i}
            cx={x}
            cy={45 + (i % 2) * 2}
            rx={3.5 + (i % 3)}
            ry={2}
            fill="rgba(255,255,255,.55)"
          />
        ))}
        <path
          d="M20,142 L14,58 Q12,44 20,38 L26,38 L29,58 L29,142 Z"
          fill="url(#g-shine)"
        />
        <text
          x="45"
          y="102"
          textAnchor="middle"
          fontSize="9"
          fontFamily="Georgia,serif"
          fill="rgba(255,255,255,.08)"
          fontStyle="italic"
        >
          Guinness
        </text>
        <ellipse cx="45" cy="145" rx="25" ry="3.5" fill="rgba(0,0,0,.4)" />
      </svg>
      <div
        style={{
          border: "2px solid #1a1208",
          background: "#f0e8d0",
          padding: "5px 14px",
          textAlign: "center",
          minWidth: 80,
        }}
      >
        <div
          style={{
            fontSize: 8,
            fontFamily: "Georgia,serif",
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#5a4020",
            marginBottom: 2,
          }}
        >
          Price
        </div>
        <div
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: 24,
            fontWeight: 900,
            color: "#1a1208",
            lineHeight: 1,
          }}
        >
          {price}
        </div>
      </div>
    </div>
  );
}

// ── Price Ladder ──────────────────────────────────────────────────────────────

function PriceLadderPanel({ ladder }: { ladder: PriceLadder }) {
  const rows = [
    { label: "Pint of Guinness", value: ladder.pint_of_guinness, icon: "🍺" },
    { label: "Loaf of Bread", value: ladder.loaf_of_bread, icon: "🍞" },
    { label: "Pint of Milk", value: ladder.pint_of_milk, icon: "🥛" },
    { label: "20 Cigarettes", value: ladder.twenty_cigarettes, icon: "🚬" },
    { label: "Weekly Wage", value: ladder.weekly_wage_labourer, icon: "💷" },
    { label: "Average House", value: ladder.average_house_dublin, icon: "🏠" },
  ];
  return (
    <div style={{ paddingTop: 6 }}>
      {rows.map(({ label, value, icon }, i) => (
        <div
          key={i}
          className="price-row" // MOBILE
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "5px 0",
            borderBottom: "1px dotted #c0b090",
          }}
        >
          <span
            className="price-row-label" // MOBILE
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 10.5,
              color: "#3a2810",
            }}
          >
            <span style={{ marginRight: 5 }}>{icon}</span>
            {label}
          </span>
          <span
            className="price-row-value" // MOBILE
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontWeight: 700,
              fontSize: 13,
              color: "#1a1208",
            }}
          >
            {value || "—"}
          </span>
        </div>
      ))}
      {ladder.note && (
        <p
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 10,
            fontStyle: "italic",
            color: "#5a4020",
            lineHeight: 1.65,
            marginTop: 8,
          }}
        >
          {ladder.note}
        </p>
      )}
    </div>
  );
}

// ── Sport panel ───────────────────────────────────────────────────────────────

function SportPanel({ sport }: { sport: SportItem[] }) {
  return (
    <div className="sport-grid" style={{ paddingTop: 6, columns: 2, gap: 18 }}>
      {" "}
      {/* MOBILE */}
      {sport.map((s, i) => (
        <div
          key={i}
          style={{
            breakInside: "avoid",
            marginBottom: 10,
            paddingBottom: 10,
            borderBottom: "1px dotted #c0b090",
          }}
        >
          <div
            style={{
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: 2,
              fontFamily: "Georgia,serif",
              color: "#5a4020",
              fontWeight: 700,
              marginBottom: 2,
            }}
          >
            {s.category}
          </div>
          <p
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 11,
              lineHeight: 1.7,
              color: "#2a1a08",
            }}
          >
            {s.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Callout box ───────────────────────────────────────────────────────────────

function CalloutBox({
  label,
  body,
  accent = "#1a1208",
}: {
  label: string;
  body: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${accent}`,
        paddingLeft: 10,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 8,
          textTransform: "uppercase",
          letterSpacing: 2,
          fontFamily: "Georgia,serif",
          color: "#5a4020",
          fontWeight: 700,
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      <p
        style={{
          fontFamily: "Georgia,serif",
          fontSize: 11,
          lineHeight: 1.75,
          color: "#2a1a08",
          textAlign: "justify",
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ── Audio ─────────────────────────────────────────────────────────────────────

function playRustle() {
  try {
    const ctx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const duration = 0.55;
    const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bpf = ctx.createBiquadFilter();
    bpf.type = "bandpass";
    bpf.frequency.value = 600;
    bpf.Q.value = 0.5;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.045, ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
    src.connect(bpf);
    bpf.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + duration);
  } catch (_) {
    /* silent fail */
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function YearPage({
  content,
  adImages,
}: {
  content: YearData;
  adImages: string[];
}) {
  const router = useRouter();
  const { year } = content;

  const ALL_YEARS = Array.from({ length: 85 }, (_, i) => 1916 + i);
  const HALF = 7;
  const winStart = Math.max(1916, Math.min(year - HALF, 2000 - HALF * 2));
  const visibleYears = ALL_YEARS.slice(winStart - 1916, winStart - 1916 + 15);

  const go = useCallback(
    (y: number) => {
      if (y < 1916 || y > 2000) return;
      playRustle();
      router.push(`/${y}`);
    },
    [router],
  );

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(year - 1);
      if (e.key === "ArrowRight") go(year + 1);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [year, go]);

  const [typedHeadline, setTypedHeadline] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // ── Swipe-to-navigate on the year track ──────────────────────────────────
  const trackRef = useRef<HTMLDivElement>(null);
  const swipeRef = useRef<{
    startX: number;
    startYear: number;
    target: number;
    didSwipe: boolean;
  } | null>(null);
  const isSwiping = useRef(false); // stays true until after synthetic click fires
  const [swipeYear, setSwipeYear] = useState<number | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onStart = (e: TouchEvent) => {
      isSwiping.current = false;
      swipeRef.current = {
        startX: e.touches[0].clientX,
        startYear: year,
        target: year,
        didSwipe: false,
      };
      setSwipeYear(null);
    };
    const onMove = (e: TouchEvent) => {
      if (!swipeRef.current) return;
      const delta = e.touches[0].clientX - swipeRef.current.startX;
      // Once movement exceeds 6px it's a drag, not a tap
      if (Math.abs(delta) > 6) {
        swipeRef.current.didSwipe = true;
        isSwiping.current = true;
        e.preventDefault(); // block scroll while dragging the track
      }
      const yearDelta = -Math.round(delta / 38);
      const target = Math.max(
        1916,
        Math.min(2000, swipeRef.current.startYear + yearDelta),
      );
      swipeRef.current.target = target;
      setSwipeYear(target !== swipeRef.current.startYear ? target : null);
    };
    const onEnd = () => {
      if (!swipeRef.current) return;
      const t = swipeRef.current.target;
      const didSwipe = swipeRef.current.didSwipe;
      swipeRef.current = null;
      setSwipeYear(null);
      if (didSwipe) {
        if (t !== year) go(t);
        // Reset AFTER the browser's synthetic click fires (~50ms)
        setTimeout(() => {
          isSwiping.current = false;
        }, 80);
      } else {
        isSwiping.current = false;
      }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [year, go]);

  const nav = getNavEra(year);

  const price = content.price_of_a_pint ?? "";
  const pintDisp =
    content.price_ladder?.pint_of_guinness ?? parsePintPrice(price);
  const popNum =
    content.population_estimate.match(/\b\d{3,}(?:,\d{3})+\b/)?.[0] ?? "";
  const [headlineEvent, ...otherEvents] = content.major_events;
  const headlineText = ev(headlineEvent);
  const [rawHeadlineTitle, ...headlineBody] = headlineText.split(" — ");
  const headlineTitle = rawHeadlineTitle
    ?.replace(/\s*\([^)]*\)/g, "")
    .replace(/,\s+[A-Z][a-z]+\.?\s+\d+.*$/, "")
    .trim();

  const fullHeadline = headlineTitle?.trim() || `Dublin in ${year}`;
  const headlinePrefix = fullHeadline.slice(0, -5);
  const headlineSuffix = fullHeadline.slice(-5);

  useEffect(() => {
    setTypedHeadline("");
    setCursorVisible(true);
    let i = 0;
    const ticker = setInterval(() => {
      i++;
      setTypedHeadline(headlineSuffix.slice(0, i));
      if (i >= headlineSuffix.length) {
        clearInterval(ticker);
        let blinks = 0;
        const blinker = setInterval(() => {
          setCursorVisible((v) => !v);
          if (++blinks >= 6) {
            clearInterval(blinker);
            setCursorVisible(false);
          }
        }, 300);
      }
    }, 120);
    return () => clearInterval(ticker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dublinchronicle.ie";

  // ── SEO helpers ────────────────────────────────────────────────
  const seoTitle = `Dublin in ${year} — ${fullHeadline} | The Dublin Chronicle`;
  const humanTags = content.timeline_tags
    .slice(0, 2)
    .map((t) => t.replace(/_/g, " "))
    .join(", ");
  const firstSentence =
    content.timeline_summary.split(/\.\s+/)[0]?.trim() ?? "";
  const rawDesc = `${firstSentence}. ${humanTags}${
    content.price_of_a_pint ? `. Pint: ${content.price_of_a_pint}` : ""
  }.`;
  const seoDesc =
    rawDesc.length <= 155
      ? rawDesc
      : rawDesc.slice(0, 152).replace(/\s+\S+$/, "") + "…";
  const ogImage = `${BASE_URL}/images/dublin/${year}.png`;
  const canonicalUrl = `${BASE_URL}/${year}`;
  const prevYear = year > 1916 ? year - 1 : null;
  const nextYear = year < 2000 ? year + 1 : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fullHeadline,
    datePublished: `${year}-01-01`,
    description: content.timeline_summary,
    keywords: content.timeline_tags.map((t) => t.replace(/_/g, " ")).join(", "),
    about: { "@type": "Place", name: "Dublin, Ireland" },
    temporalCoverage: `${year}/${year}`,
    publisher: {
      "@type": "Organization",
      name: "The Dublin Chronicle",
      url: BASE_URL,
    },
  };

  // ── Nearby decade-boundary years for internal links ─────────────────────
  const decadeLinks = [1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000]
    .filter((d) => d !== year)
    .sort((a, b) => Math.abs(a - year) - Math.abs(b - year))
    .slice(0, 4);

  const paperBg =
    year <= 1919
      ? "#f0e4c4"
      : year <= 1929
        ? "#f0e8d0"
        : year <= 1940
          ? "#f5f3ee"
          : year <= 1945
            ? "#ddd8c0"
            : year <= 1959
              ? "#ece8dc"
              : year <= 1969
                ? "#fafaf8"
                : year <= 1979
                  ? "#f0ede4"
                  : year <= 1989
                    ? "#f2efea"
                    : "#ffffff";

  const stats = [
    { label: "City Population", value: popNum, sub: "city boundary" },
    { label: "Price of a Pint", value: pintDisp, sub: "Guinness stout" },
    {
      label: "Taoiseach",
      value: content.taoiseach?.split(" ").slice(0, 2).join(" ") ?? "—",
      sub: "in office",
    },
    {
      label: "Era",
      value: getEra(year),
      sub: content.timeline_tags[0]?.replace(/_/g, " ") ?? "",
    },
    {
      label: "Since the Rising",
      value: year === 1916 ? "The Rising" : `${year - 1916} yrs`,
      sub: "Easter 1916",
    },
  ];

  return (
    <>
      <Head>
        {/* ── Core ────────────────────────────────────────────────────── */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        {prevYear && <link rel="prev" href={`${BASE_URL}/${prevYear}`} />}
        {nextYear && <link rel="next" href={`${BASE_URL}/${nextYear}`} />}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* ── Open Graph ──────────────────────────────────────────── */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:image" content={ogImage} />
        {/* ── Twitter Card ───────────────────────────────────────── */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDesc} />
        <meta name="twitter:image" content={ogImage} />
        {/* ── JSON-LD ─────────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* ── Styles ─────────────────────────────────────────────── */}
        <style>{`
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#e8dfc8}
          ::selection{background:#1a1208;color:#f0e8d0}
          .stats-banner{display:grid;grid-template-columns:repeat(5,1fr);background:#e8dfc8;border-bottom:3px double #1a1208}
          .stats-banner .stat{padding:10px 12px;text-align:center;border-right:1px solid #b0a080}
          .stats-banner .stat:last-child{border-right:none}
          @media(max-width:640px){
            /* MOBILE — body text */
            .body-text{font-size:16px !important;line-height:1.75 !important;}
            /* MOBILE — paper grid padding */
            .paper-grid>*{padding-left:12px !important;padding-right:12px !important;}
            /* MOBILE — stats banner: stacked flex list, label left / value right */
            .stats-banner{display:flex !important;flex-direction:column !important;}
            .stats-banner .stat{display:flex !important;justify-content:space-between !important;align-items:center !important;text-align:left !important;padding:10px 16px !important;border-right:none !important;border-bottom:1px solid #b0a080 !important;}
            .stats-banner .stat:last-child{border-bottom:none !important;}
            .stat-label{font-size:13px !important;margin-bottom:0 !important;flex-shrink:0;margin-right:12px;}
            .stat-value{font-size:26px !important;font-weight:700 !important;line-height:1 !important;}
            .stat-sub{display:none !important;}
            /* MOBILE — splash headline bigger */
            .splash-headline{font-size:clamp(26px,8vw,42px) !important;}
            .splash-sub{font-size:15px !important;}
            /* MOBILE — section headers more breathing room */
            .sec-head{margin:20px 0 14px !important;padding:6px 0 !important;}
            .sec-head-text{font-size:12px !important;}
            /* MOBILE — two-column sub-grids collapse to single column */
            .two-col-grid{columns:1 !important;}
            .sport-grid{columns:1 !important;}
            /* MOBILE — price ladder rows larger text */
            .price-row{padding:10px 0 !important;}
            .price-row-label{font-size:15px !important;}
            .price-row-value{font-size:20px !important;font-weight:700 !important;}
            /* MOBILE — masthead: hide top info strip and tagline */
            .masthead-info-strip{display:none !important;}
            .masthead-tagline{display:none !important;}
            /* MOBILE — nav: touch-action + larger hit targets */
            nav{touch-action:none;}
            .nav-arrow-btn{width:44px !important;height:44px !important;font-size:18px !important;}
            .nav-year-btn{width:40px !important;height:34px !important;font-size:10px !important;}
          }
          .paper-grid{display:grid;grid-template-columns:220px 10px 1fr 10px 230px}
          @media(max-width:1100px){.paper-grid{grid-template-columns:1fr}}
          @media(max-width:1100px){.paper-grid>*:nth-child(2),.paper-grid>*:nth-child(4){display:none}}
          .paper-texture::before{content:'';position:fixed;inset:0;z-index:997;pointer-events:none;opacity:0.045;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");background-repeat:repeat;background-size:200px 200px}
          .paper-texture::after{content:'';position:fixed;inset:0;z-index:996;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(26,18,8,0.18) 100%)}
          .north-box{border:2px solid #8b0000;background:#fdf5f5;padding:12px;margin:10px 0}
          @media print{nav{display:none!important}body{background:#fff!important}.paper-grid{grid-template-columns:1fr 2fr 1fr!important}*{color:#000!important}img{filter:none!important}}
        `}</style>

        {year >= 1916 && year <= 1919 && (
          <style>{`body{background:#f0e4c4}.paper-texture{background:#f0e4c4 !important}.paper-texture::before{opacity:0.06}.paper-texture::after{background:radial-gradient(ellipse at center,transparent 50%,rgba(26,18,8,0.25) 100%) !important}.stats-banner{background:#ede4c8 !important;border-bottom:4px double #1a1208 !important}.stats-banner .stat{border-right-color:#8a7040 !important}`}</style>
        )}
        {year >= 1920 && year <= 1929 && (
          <style>{`body{background:#f0e8d0}.paper-texture{background:#f0e8d0 !important}.paper-texture::before{opacity:0.035}.stats-banner{background:#ece4c8 !important}.stats-banner .stat{border-right-color:#b0a080 !important}`}</style>
        )}
        {year >= 1930 && year <= 1940 && (
          <style>{`body{background:#f2f0ea}.paper-texture{background:#f5f3ee !important}.paper-texture::before{opacity:0.025}.paper-texture::after{background:radial-gradient(ellipse at center,transparent 60%,rgba(26,18,8,0.06) 100%) !important}.stats-banner{background:#f5f3ee !important;border-bottom:2px solid #c8bfa0 !important}.stats-banner .stat{border-right-color:#c8bfa0 !important}`}</style>
        )}
        {year >= 1941 && year <= 1945 && (
          <style>{`body{background:#ddd8c0}.paper-texture{background:#ddd8c0 !important}.paper-texture::before{opacity:0.055}.paper-texture::after{background:radial-gradient(ellipse at center,transparent 50%,rgba(26,18,8,0.22) 100%) !important}.stats-banner{background:#d0c8a8 !important;border-bottom:4px double #1a1208 !important}.stats-banner .stat{border-right-color:#a09070 !important}`}</style>
        )}
        {year >= 1946 && year <= 1959 && (
          <style>{`body{background:#ece8dc}.paper-texture{background:#ece8dc !important}.paper-texture::before{opacity:0.03}.stats-banner{background:#e4e0d4 !important;border-bottom:2px solid #888 !important}.stats-banner .stat{border-right-color:#b0a890 !important}`}</style>
        )}
        {year >= 1960 && year <= 1969 && (
          <style>{`body{background:#fafaf8}.paper-texture{background:#fafaf8 !important}.paper-texture::before{opacity:0.015}.paper-texture::after{display:none !important}.stats-banner{background:#f0f0ee !important;border-bottom:2px solid #888 !important}.stats-banner .stat{border-right-color:#d0d0d0 !important}`}</style>
        )}
        {year >= 1970 && year <= 1979 && (
          <style>{`body{background:#f0ede4}.paper-texture{background:#f0ede4 !important}.paper-texture::before{opacity:0.03}.stats-banner{background:#e8e4d8 !important;border-bottom:3px solid #1a1208 !important}.stats-banner .stat{border-right-color:#c0b090 !important}.north-box{border:2px solid #8b0000;background:#fdf5f5}`}</style>
        )}
        {year >= 1980 && year <= 1989 && (
          <style>{`body{background:#f2efea}.paper-texture{background:#f2efea !important}.paper-texture::before{opacity:0.02}.paper-texture::after{display:none !important}.stats-banner{background:#ece8e0 !important;border-bottom:1px solid #aaa !important}.stats-banner .stat{border-right-color:#c8c0b0 !important}`}</style>
        )}
        {year >= 1990 && year <= 2000 && (
          <style>{`body{background:#ffffff}.paper-texture{background:#ffffff !important}.paper-texture::before{opacity:0.01}.paper-texture::after{display:none !important}.stats-banner{background:#f8f8f8 !important;border-bottom:2px solid #1a1208 !important}.stats-banner .stat{border-right-color:#e0e0e0 !important}`}</style>
        )}
      </Head>

      <div
        className="paper-texture"
        style={{
          background: paperBg,
          color: "#1a1208",
          fontFamily: "'Lora','Times New Roman',Georgia,serif",
          minHeight: "100vh",
          paddingBottom: 90,
        }}
      >
        {/* ══ MASTHEAD ══════════════════════════════════════════════════════════ */}
        <Masthead year={year} />

        {/* ══ STATS BANNER ══════════════════════════════════════════════════════ */}
        <div className="stats-banner">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div
                className="stat-label" // MOBILE
                style={{
                  fontSize: 8,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontFamily: "Georgia,serif",
                  color: "#5a4020",
                  marginBottom: 3,
                }}
              >
                {s.label}
              </div>
              <div
                className="stat-value" // MOBILE
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(14px,2vw,22px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: "#1a1208",
                }}
              >
                {s.value}
              </div>
              <div
                className="stat-sub" // MOBILE
                style={{
                  fontSize: 8,
                  fontStyle: "italic",
                  fontFamily: "Georgia,serif",
                  color: "#7a6040",
                  marginTop: 2,
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ══ SPLASH HEAD ═══════════════════════════════════════════════════════ */}
        <div
          style={{
            padding: "10px 28px 8px",
            borderBottom: "4px double #1a1208",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 6 }}>
            <div
              style={{
                fontSize: 8,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "Georgia,serif",
                color: "#5a4020",
                marginBottom: 6,
              }}
            >
              {content.timeline_tags
                .slice(0, 6)
                .map((t) => t.replace(/_/g, " "))
                .join("  ·  ")}
            </div>
            <h1
              className="splash-headline" // MOBILE
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(22px,4.5vw,54px)",
                fontWeight: 900,
                lineHeight: 1.05,
                textTransform: "uppercase",
                letterSpacing: 1,
                maxWidth: 900,
                margin: "0 auto 8px",
              }}
            >
              {headlinePrefix}
              {typedHeadline}
              <span
                style={{
                  opacity: cursorVisible ? 1 : 0,
                  borderRight: "3px solid currentColor",
                  marginLeft: 2,
                }}
              />
            </h1>
            {headlineBody.length > 0 && (
              <p
                className="splash-sub" // MOBILE
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: 13,
                  fontStyle: "italic",
                  color: "#4a3418",
                  maxWidth: 720,
                  margin: "0 auto",
                }}
              >
                {headlineBody.join(" — ").trim()}
              </p>
            )}
          </div>
        </div>

        {/* ══ 3-COLUMN BODY ═════════════════════════════════════════════════════ */}
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 20px",
            borderLeft: "1px solid #b0a080",
            borderRight: "1px solid #b0a080",
          }}
        >
          <div className="paper-grid">
            {/* ── LEFT COLUMN ───────────────────────────────────────────────── */}
            <div style={{ padding: "12px 14px 12px 0" }}>
              <SecHead>A Year in Dublin</SecHead>
              {content.timeline_summary
                .split(". ")
                .filter(Boolean)
                .map((s, i) => (
                  <BodyText key={i} size={12}>
                    {s.trim()}
                    {s.endsWith(".") ? "" : "."}
                  </BodyText>
                ))}

              <HRule />
              <SecHead>Our Correspondent Reports</SecHead>
              <div
                style={{
                  borderLeft: "3px solid #1a1208",
                  paddingLeft: 10,
                  marginBottom: 10,
                }}
              >
                <p
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: 12,
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    color: "#2a1a08",
                    textAlign: "justify",
                  }}
                >
                  {content.visual_scene}
                </p>
              </div>

              {content.irish_first && (
                <>
                  <HRule />
                  <SecHead>An Irish First</SecHead>
                  <CalloutBox
                    label="First in Ireland"
                    body={content.irish_first}
                    accent="#2a5a2a"
                  />
                </>
              )}

              <HRule />
              <SecHead>Notable Addresses</SecHead>
              <div style={{ paddingTop: 6 }}>
                {content.key_locations.slice(0, 7).map((l, i) => {
                  const { place, detail } = loc(l);
                  return (
                    <div
                      key={i}
                      style={{
                        marginBottom: 8,
                        paddingBottom: 8,
                        borderBottom: i < 6 ? "1px dotted #c0b090" : "none",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 700,
                          fontSize: 11,
                          color: "#1a1208",
                          marginBottom: 2,
                        }}
                      >
                        {place}
                      </div>
                      {detail && (
                        <p
                          style={{
                            fontFamily: "Georgia,serif",
                            fontSize: 10,
                            lineHeight: 1.7,
                            color: "#3a2810",
                          }}
                        >
                          {detail}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <HRule />
              <SecHead>Building &amp; Architecture</SecHead>
              <div style={{ paddingTop: 6 }}>
                {content.architecture_style.map((a, i) => {
                  const { style, ex } = arch(a);
                  return (
                    <div
                      key={i}
                      style={{
                        marginBottom: 8,
                        paddingBottom: 8,
                        borderBottom:
                          i < content.architecture_style.length - 1
                            ? "1px dotted #c0b090"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      >
                        {style}
                      </div>
                      {ex && (
                        <p
                          style={{
                            fontFamily: "Georgia,serif",
                            fontSize: 10,
                            lineHeight: 1.65,
                            fontStyle: "italic",
                            color: "#5a4020",
                          }}
                        >
                          {ex}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {content.notable_death && (
                <>
                  <HRule />
                  <SecHead>Obituary</SecHead>
                  <div
                    style={{
                      borderLeft: "3px solid #4a3418",
                      paddingLeft: 10,
                      marginBottom: 10,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Georgia,serif",
                        fontSize: 11,
                        lineHeight: 1.8,
                        fontStyle: "italic",
                        color: "#2a1a08",
                      }}
                    >
                      {content.notable_death}
                    </p>
                  </div>
                </>
              )}

              <DeathNotices
                year={year}
                notableDubliners={content.notable_dubliners ?? []}
              />
            </div>

            <ColRule />

            {/* ── CENTRE COLUMN ─────────────────────────────────────────────── */}
            <div style={{ padding: "12px 20px" }}>
              {content.north_headline && (
                <>
                  <div className="north-box">
                    <div
                      style={{
                        fontSize: 8,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontFamily: "Georgia,serif",
                        color: "#8b0000",
                        fontWeight: 700,
                        marginBottom: 4,
                      }}
                    >
                      The North · Dispatches from the Border
                    </div>
                    <p
                      style={{
                        fontFamily: "Georgia,serif",
                        fontSize: 11.5,
                        lineHeight: 1.8,
                        color: "#1a1208",
                        textAlign: "justify",
                      }}
                    >
                      {content.north_headline}
                    </p>
                  </div>
                  <HRule />
                </>
              )}

              <SecHead>Affairs of the Nation &amp; the City</SecHead>
              <div
                className="two-col-grid"
                style={{ paddingTop: 6, columns: 2, gap: 18 }}
              >
                {" "}
                {/* MOBILE */}
                {otherEvents.map((e, i) => {
                  const text = ev(e);
                  const [title, ...body] = text.split(" — ");
                  return (
                    <div
                      key={i}
                      style={{
                        breakInside: "avoid",
                        marginBottom: 12,
                        paddingBottom: 12,
                        borderBottom: "1px dotted #c0b090",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 700,
                          fontSize: 12,
                          lineHeight: 1.3,
                          color: "#1a1208",
                          marginBottom: 3,
                        }}
                      >
                        {title?.trim()}
                      </h3>
                      {body.length > 0 && (
                        <p
                          style={{
                            fontFamily: "Georgia,serif",
                            fontSize: 11,
                            lineHeight: 1.75,
                            color: "#2a1a08",
                            textAlign: "justify",
                          }}
                        >
                          {body.join(" — ").trim()}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <HRule thick />

              <SecHead>Gaelic Games · All-Ireland Finals</SecHead>
              {content.gaa_finals.length > 0 ? (
                <div style={{ padding: "8px 0" }}>
                  <GAAScoreboard finals={content.gaa_finals} year={year} />
                </div>
              ) : (
                <div
                  style={{
                    border: "1px solid #b0a080",
                    padding: "12px 14px",
                    background: "#e8dfc8",
                    marginBottom: 12,
                    fontFamily: "Georgia,serif",
                    fontStyle: "italic",
                    fontSize: 11,
                    color: "#5a4020",
                    lineHeight: 1.7,
                  }}
                >
                  No All-Ireland Final was contested in {year}. The championship
                  was suspended owing to the disruptions of that year.
                </div>
              )}

              {content.sport && content.sport.length > 0 && (
                <>
                  <HRule />
                  <SecHead>Sport &amp; Pastimes</SecHead>
                  <SportPanel sport={content.sport} />
                </>
              )}

              {hasPoliticalData(year) && (
                <>
                  <HRule />
                  <div style={{ padding: "8px 0" }}>
                    <PoliticalBreakdown year={year} />
                  </div>
                </>
              )}

              {content.elections.length > 0 && (
                <>
                  <HRule />
                  <SecHead>Elections &amp; the Ballot</SecHead>
                  {content.elections.map((el, i) => (
                    <div
                      key={i}
                      style={{
                        marginBottom: 10,
                        paddingBottom: 10,
                        borderBottom: "1px dotted #c0b090",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: 4,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display',serif",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          {el.type.split(",")[0].trim()}
                        </span>
                        {el.winning_party && (
                          <span
                            style={{
                              fontFamily: "Georgia,serif",
                              fontSize: 9,
                              fontStyle: "italic",
                              border: "1px solid #b0a080",
                              padding: "1px 7px",
                            }}
                          >
                            {el.winning_party}
                          </span>
                        )}
                      </div>
                      <BodyText size={12}>{el.result_summary}</BodyText>
                    </div>
                  ))}
                </>
              )}

              <HRule />
              <SecHead>City Dispatches</SecHead>
              <div
                className="two-col-grid"
                style={{ paddingTop: 6, columns: 2, gap: 18 }}
              >
                {" "}
                {/* MOBILE */}
                {content.city_changes.map((c, i) => {
                  const text = typeof c === "string" ? c : JSON.stringify(c);
                  const [first, ...rest] = text.split(". ");
                  return (
                    <div
                      key={i}
                      style={{
                        breakInside: "avoid",
                        marginBottom: 12,
                        paddingBottom: 12,
                        borderBottom: "1px dotted #c0b090",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Georgia,serif",
                          fontSize: 11.5,
                          lineHeight: 1.8,
                          textAlign: "justify",
                          color: "#1a1208",
                        }}
                      >
                        <SmallCap>{first?.trim().slice(0, 30)}</SmallCap>
                        {first && first.length > 30
                          ? first.slice(30) + ". "
                          : ". "}
                        {rest.join(". ").trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
              <HRule thick />

              {content.quirky_story && (
                <>
                  <SecHead>The Talk of the Town</SecHead>
                  <div
                    style={{
                      border: "1px solid #b0a080",
                      background: "#e8dfc8",
                      padding: "12px 14px",
                      marginBottom: 12,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Georgia,serif",
                        fontSize: 11.5,
                        lineHeight: 1.8,
                        color: "#1a1208",
                        fontStyle: "italic",
                        textAlign: "justify",
                      }}
                    >
                      {content.quirky_story}
                    </p>
                  </div>
                  <HRule />
                </>
              )}

              {content.what_was_on && content.what_was_on.length > 0 && (
                <>
                  <SecHead>Arts, Theatre &amp; Culture</SecHead>
                  <div
                    className="two-col-grid"
                    style={{ paddingTop: 6, columns: 2, gap: 18 }}
                  >
                    {" "}
                    {/* MOBILE */}
                    {content.what_was_on.map((item, i) => {
                      const ci = item.indexOf(":");
                      const cat = ci !== -1 ? item.slice(0, ci) : item;
                      const body = ci !== -1 ? item.slice(ci + 1) : "";
                      return (
                        <div
                          key={i}
                          style={{
                            breakInside: "avoid",
                            marginBottom: 10,
                            paddingBottom: 10,
                            borderBottom: "1px dotted #c0b090",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 8,
                              textTransform: "uppercase",
                              letterSpacing: 2,
                              fontFamily: "Georgia,serif",
                              color: "#5a4020",
                              fontWeight: 700,
                              marginBottom: 2,
                            }}
                          >
                            {cat.trim()}
                          </div>
                          <p
                            style={{
                              fontFamily: "Georgia,serif",
                              fontSize: 11,
                              lineHeight: 1.7,
                              color: "#2a1a08",
                            }}
                          >
                            {body.trim()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <HRule />
                </>
              )}

              {content.cost_of_living && (
                <>
                  <SecHead>Prices &amp; the Cost of Living</SecHead>
                  <div
                    style={{
                      borderLeft: "3px solid #1a1208",
                      paddingLeft: 12,
                      margin: "8px 0",
                    }}
                  >
                    <BodyText size={12}>{content.cost_of_living}</BodyText>
                  </div>
                  <HRule />
                </>
              )}

              <SecHead>Commerce &amp; Industry</SecHead>
              <div style={{ paddingTop: 6 }}>
                {content.major_industries.map((industry, i) => {
                  const { name, detail } = ind(industry);
                  return (
                    <div
                      key={i}
                      style={{
                        marginBottom: 9,
                        paddingBottom: 9,
                        borderBottom: "1px dotted #c0b090",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontWeight: 700,
                          fontSize: 12,
                          marginBottom: 2,
                        }}
                      >
                        {name}
                      </div>
                      {detail && (
                        <p
                          style={{
                            fontFamily: "Georgia,serif",
                            fontSize: 10.5,
                            lineHeight: 1.7,
                            color: "#3a2810",
                          }}
                        >
                          {detail}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <HRule />

              <CurrencyAd year={year} />
              <HRule />
            </div>

            <ColRule />

            {/* ── RIGHT COLUMN ──────────────────────────────────────────────── */}
            <div style={{ padding: "12px 0 12px 14px" }}>
              <PeriodAd year={year} adImages={adImages} />

              <SecHead>The Price of a Pint</SecHead>
              <div
                style={{
                  padding: "10px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <GuinnessPint price={pintDisp} />
                <p
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: 10.5,
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    color: "#3a2810",
                    textAlign: "justify",
                    borderTop: "1px dotted #c0b090",
                    paddingTop: 8,
                    marginTop: 2,
                  }}
                >
                  {price || "Price not recorded for this year."}
                </p>
              </div>

              {content.price_ladder && (
                <>
                  <HRule />
                  <SecHead>The Price of Things</SecHead>
                  <PriceLadderPanel ladder={content.price_ladder} />
                </>
              )}
              <HRule />

              {content.number_one_song && (
                <>
                  <SecHead>On the Wireless</SecHead>
                  <div style={{ padding: "8px 0 10px", textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 8,
                        textTransform: "uppercase",
                        letterSpacing: 2,
                        fontFamily: "Georgia,serif",
                        color: "#5a4020",
                        marginBottom: 4,
                      }}
                    >
                      No. 1 Song of the Year
                    </div>
                    <p
                      style={{
                        fontFamily: "Georgia,serif",
                        fontSize: 11,
                        lineHeight: 1.75,
                        fontStyle: "italic",
                        color: "#1a1208",
                      }}
                    >
                      {content.number_one_song}
                    </p>
                  </div>
                  <HRule />
                </>
              )}

              {content.notable_emigrant && (
                <>
                  <SecHead>The Emigrant Ship</SecHead>
                  <CalloutBox
                    label="Departure of note"
                    body={content.notable_emigrant}
                    accent="#5a7a9a"
                  />
                  <HRule />
                </>
              )}

              {content.notable_dubliners &&
                content.notable_dubliners.length > 0 && (
                  <>
                    <SecHead>Notable Persons</SecHead>
                    <div style={{ paddingTop: 6 }}>
                      {content.notable_dubliners.map((p, i) => {
                        const [name, ...rest] = p.split("—");
                        return (
                          <div
                            key={i}
                            style={{
                              marginBottom: 10,
                              paddingBottom: 10,
                              borderBottom:
                                i < content.notable_dubliners!.length - 1
                                  ? "1px dotted #c0b090"
                                  : "none",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "'Playfair Display',serif",
                                fontWeight: 700,
                                fontSize: 12,
                                color: "#1a1208",
                                marginBottom: 2,
                              }}
                            >
                              {name.trim()}
                            </div>
                            <p
                              style={{
                                fontFamily: "Georgia,serif",
                                fontSize: 10.5,
                                lineHeight: 1.7,
                                color: "#3a2810",
                              }}
                            >
                              {rest.join("—").trim()}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <HRule />
                  </>
                )}

              <SecHead>Transport &amp; Movement</SecHead>
              <TransportIllustration
                year={year}
                transport_snapshot={content.transport_snapshot}
              />
              <div style={{ paddingTop: 6 }}>
                {content.transport_snapshot.map((t, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "Georgia,serif",
                      fontSize: 11,
                      lineHeight: 1.8,
                      color: "#2a1a08",
                      marginBottom: 8,
                      paddingBottom: 8,
                      borderBottom: "1px dotted #c0b090",
                      textAlign: "justify",
                    }}
                  >
                    {typeof t === "string" ? t : JSON.stringify(t)}
                  </p>
                ))}
              </div>
              <HRule />

              <div
                style={{
                  border: "3px double #1a1208",
                  padding: "14px 10px",
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 10,
                  background: "#e8dfc8",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 15,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  Arthur Guinness
                  <br />
                  <span style={{ fontSize: 10, letterSpacing: 1 }}>
                    &amp; Son, Ltd.
                  </span>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #1a1208",
                    borderBottom: "1px solid #1a1208",
                    padding: "3px",
                    margin: "5px 0",
                    fontSize: 8,
                    fontFamily: "Georgia,serif",
                    fontStyle: "italic",
                  }}
                >
                  St. James&apos;s Gate, Dublin · Est. 1759
                </div>
                <p
                  style={{
                    fontSize: 10,
                    fontFamily: "Georgia,serif",
                    lineHeight: 1.7,
                    margin: "6px 0",
                    color: "#2a1a08",
                  }}
                >
                  Brewed to the highest standard for over one hundred and fifty
                  years. The nation&apos;s finest stout, available at all
                  licensed premises throughout the city and county.
                </p>
                <div
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 12,
                    fontWeight: 700,
                    fontStyle: "italic",
                    marginTop: 8,
                    borderTop: "1px dotted #b0a080",
                    paddingTop: 6,
                  }}
                >
                  ❝ My Goodness, My Guinness ❞
                </div>
              </div>
              <HRule />

              {content.weather_event && (
                <>
                  <SecHead>Weather &amp; the Elements</SecHead>
                  <div style={{ marginBottom: 10 }}>
                    <p
                      style={{
                        fontFamily: "Georgia,serif",
                        fontSize: 11,
                        lineHeight: 1.75,
                        color: "#2a1a08",
                        fontStyle: "italic",
                      }}
                    >
                      {content.weather_event}
                    </p>
                  </div>
                  <HRule />
                </>
              )}

              <WeatherReport year={year} weather={(content as any).weather} />

              {content.slang_or_phrase && (
                <>
                  <SecHead>The Vernacular</SecHead>
                  <div style={{ padding: "10px 0 8px", textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',Georgia,serif",
                        fontSize: 52,
                        lineHeight: 0.6,
                        color: "#b0a080",
                        marginBottom: 4,
                        userSelect: "none",
                      }}
                    >
                      &#8220;
                    </div>
                    <p
                      style={{
                        fontFamily: "'Lora',Georgia,serif",
                        fontSize: 13,
                        lineHeight: 1.75,
                        fontStyle: "italic",
                        color: "#1a1208",
                        textAlign: "center",
                        padding: "0 8px",
                        borderLeft: "2px solid #b0a080",
                        borderRight: "2px solid #b0a080",
                        margin: "0 4px",
                      }}
                    >
                      {content.slang_or_phrase}
                    </p>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',Georgia,serif",
                        fontSize: 52,
                        lineHeight: 0.5,
                        color: "#b0a080",
                        marginTop: 6,
                        userSelect: "none",
                      }}
                    >
                      &#8221;
                    </div>
                  </div>
                  <HRule />
                </>
              )}
            </div>
          </div>
        </div>

        {/* ══ SEE ALSO — internal links for crawlers ═══════════════════════════ */}
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "10px 20px 16px",
            fontFamily: "Georgia,'Times New Roman',serif",
            fontSize: 10,
            color: "#7a6040",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px 18px",
            alignItems: "center",
            borderTop: "1px solid #c0b090",
          }}
        >
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: 2,
              fontSize: 8,
              fontWeight: 700,
            }}
          >
            See also:
          </span>
          {prevYear && (
            <a
              href={`/${prevYear}`}
              style={{ color: "#5a4020", textDecoration: "underline" }}
            >
              ← Dublin in {prevYear}
            </a>
          )}
          {nextYear && (
            <a
              href={`/${nextYear}`}
              style={{ color: "#5a4020", textDecoration: "underline" }}
            >
              Dublin in {nextYear} →
            </a>
          )}
          {decadeLinks.map((d) => (
            <a
              key={d}
              href={`/${d}`}
              style={{ color: "#7a6040", textDecoration: "underline" }}
            >
              {d}s
            </a>
          ))}
        </div>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 20px" }}>
          <HRule thick />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "5px 0",
              fontSize: 8,
              fontFamily: "Georgia,serif",
              color: "#7a6040",
              fontStyle: "italic",
            }}
          >
            <span>The Dublin Chronicle · Printed and Published in Dublin</span>
            <span>All Rights Reserved · {year}</span>
          </div>
        </div>
      </div>

      {/* ══ NAV BAR ══════════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: nav.bg,
          borderTop: nav.border,
          display: "flex",
          justifyContent: "center",
          padding: "7px 16px",
          transition: "background 0.45s ease, border-color 0.45s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            maxWidth: 680,
            width: "100%",
          }}
        >
          {/* Prev button */}
          <button
            onClick={() => go(year - 1)}
            disabled={year <= 1916}
            className="nav-arrow-btn"
            style={{
              background: "none",
              border: `1px solid ${nav.accent}`,
              color: year <= 1916 ? nav.dim : nav.fg,
              width: 28,
              height: 28,
              cursor: year <= 1916 ? "not-allowed" : "pointer",
              fontFamily: "Georgia,serif",
              fontSize: 14,
              flexShrink: 0,
              transition: "border-color 0.45s, color 0.45s",
            }}
          >
            ←
          </button>

          {/* Year + era label — shows swipe preview when swiping */}
          <div style={{ textAlign: "center", minWidth: 60, flexShrink: 0 }}>
            <div
              style={{
                fontFamily: "'Playfair Display','Times New Roman',serif",
                fontSize: 24,
                fontWeight: 700,
                color: swipeYear !== null ? nav.accent : nav.fg,
                lineHeight: 1,
                transition: "color 0.15s",
              }}
            >
              {swipeYear ?? year}
            </div>
            <div
              style={{
                fontSize: 6.5,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontFamily: "Georgia,serif",
                color: nav.accent,
                transition: "color 0.45s",
              }}
            >
              {getEra(swipeYear ?? year)}
            </div>
          </div>

          {/* Year track — swipeable */}
          <div
            ref={trackRef}
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              touchAction: "none",
              userSelect: "none",
            }}
          >
            {/* left fade */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 28,
                background: `linear-gradient(to right, ${nav.bg} 40%, transparent)`,
                zIndex: 2,
                pointerEvents: "none",
                transition: "background 0.45s",
              }}
            />
            <div
              style={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                width: "100%",
              }}
            >
              {visibleYears.map((y) => {
                const isActive = y === (swipeYear ?? year);
                const isDecadeStart = y === 1916 || y % 10 === 0;
                return (
                  <button
                    key={y}
                    onClick={() => {
                      if (isSwiping.current) return; // swipe in progress — ignore tap
                      go(y);
                    }}
                    className="nav-year-btn"
                    style={{
                      flexShrink: 0,
                      background: isActive ? nav.activeBg : "transparent",
                      border: isActive
                        ? `1px solid ${nav.activeBg}`
                        : isDecadeStart
                          ? `1px solid ${nav.accent}66`
                          : `1px solid ${nav.dim}66`,
                      color: isActive
                        ? nav.activeFg
                        : isDecadeStart
                          ? nav.decadeFg
                          : nav.dim,
                      width: 36,
                      height: 26,
                      cursor: "pointer",
                      fontFamily: "Georgia,serif",
                      fontSize: isDecadeStart ? 9 : 8,
                      fontWeight: isActive || isDecadeStart ? 700 : 400,
                      transition:
                        "background 0.15s, color 0.15s, border-color 0.45s",
                    }}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
            {/* right fade */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 28,
                background: `linear-gradient(to left, ${nav.bg} 40%, transparent)`,
                zIndex: 2,
                pointerEvents: "none",
                transition: "background 0.45s",
              }}
            />
          </div>

          {/* Next button */}
          <button
            onClick={() => go(year + 1)}
            disabled={year >= 2000}
            className="nav-arrow-btn"
            style={{
              background: "none",
              border: `1px solid ${nav.accent}`,
              color: year >= 2000 ? nav.dim : nav.fg,
              width: 28,
              height: 28,
              cursor: year >= 2000 ? "not-allowed" : "pointer",
              fontFamily: "Georgia,serif",
              fontSize: 14,
              flexShrink: 0,
              transition: "border-color 0.45s, color 0.45s",
            }}
          >
            →
          </button>
        </div>
      </nav>
    </>
  );
}

// ── Static generation ─────────────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "content", "dublin");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const years = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""))
    .filter((y) => parseInt(y) >= 1916 && parseInt(y) <= 2000);
  return {
    paths: years.map((year) => ({ params: { year } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const year = params?.year as string;
  const filePath = path.join(
    process.cwd(),
    "content",
    "dublin",
    `${year}.json`,
  );
  if (!fs.existsSync(filePath)) return { notFound: true };
  const content: YearData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const adImages = getAdImages(parseInt(year));
  return { props: { content, adImages } };
};
