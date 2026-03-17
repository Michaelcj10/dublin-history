import GAAScoreboard from "../components/GAAScoreboard";
import PoliticalBreakdown from "../components/politicalbreakdown";
import CigaretteAd from "../components/cigad";
import TransportIllustration from "../components/transport";
import WeatherReport from "../components/WeatherReport";
import DublinMap from "../components/DublinMap";
import DeathNotices from "../components/DeathNotices";
import Head from "next/head";
import fs from "fs";
import path from "path";
import { useRouter } from "next/router";
import { useEffect, useCallback, useRef } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

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
interface YearData {
  year: number;
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
  price_of_a_pint?: string;
  cost_of_living?: string;
  notable_dubliners?: string[];
  what_was_on?: string[];
  slang_or_phrase?: string;
  imageUrl?: string;
}

const ev = (e: YearData["major_events"][0]) =>
  typeof e === "string"
    ? e
    : [e.name, e.date && `(${e.date})`, e.impact].filter(Boolean).join(" — ");
const arch = (a: YearData["architecture_style"][0]) => {
  if (typeof a === "string") {
    const [s, ...r] = a.split(/[—:–]/);
    return { style: s.trim(), ex: r.join(" ").trim() };
  }
  return {
    style: a.style,
    ex: (a as { style: string; example?: string }).example ?? "",
  };
};
const ind = (i: YearData["major_industries"][0]) => {
  if (typeof i === "string") {
    const [n, ...r] = i.split(/[—:–]/);
    return { name: n.trim(), detail: r.join(" ").trim() };
  }
  return {
    name: i.industry,
    detail:
      (i as { industry: string; significance?: string }).significance ?? "",
  };
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
        <path
          d="M20,142 L14,58 Q12,42 20,36"
          fill="none"
          stroke="rgba(255,255,255,.32)"
          strokeWidth={1}
        />
        <path
          d="M70,142 L76,58 Q78,42 70,36"
          fill="none"
          stroke="rgba(255,255,255,.07)"
          strokeWidth={1}
        />
        {[24, 38, 55, 67].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={95 + i * 13}
            r={0.9}
            fill="rgba(160,100,30,.35)"
          />
        ))}
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
        <path
          d="M20,142 Q45,148 70,142 L70,145 Q45,152 20,145 Z"
          fill="rgba(255,255,255,.06)"
        />
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

function PreDecimalCoins({ text }: { text: string }) {
  const m = text.match(/(\d+)\/(\d+)/);
  const d = text.match(/^(\d+)d/);
  const sh = m ? parseInt(m[1]) : 0;
  const pe = m ? parseInt(m[2]) : d ? parseInt(d[1]) : 4;
  function C({
    cx,
    cy,
    r,
    fill,
    stroke,
    label,
    sub,
  }: {
    cx: number;
    cy: number;
    r: number;
    fill: string;
    stroke: string;
    label: string;
    sub?: string;
  }) {
    return (
      <g>
        <ellipse
          cx={cx + 1.5}
          cy={cy + 1.5}
          rx={r}
          ry={r * 0.28}
          fill="rgba(0,0,0,.4)"
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={fill}
          stroke={stroke}
          strokeWidth={1}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r * 0.76}
          fill="none"
          stroke={stroke}
          strokeWidth={0.5}
          opacity={0.4}
        />
        <text
          x={cx}
          y={cy + 1}
          textAnchor="middle"
          fontSize={r * 0.65}
          fill={stroke}
          fontFamily="Georgia,serif"
          fontStyle="italic"
        >
          ♦
        </text>
        <text
          x={cx}
          y={cy + r * 0.58}
          textAnchor="middle"
          fontSize={r * 0.48}
          fill={stroke}
          fontWeight="bold"
          fontFamily="Georgia,serif"
        >
          {label}
        </text>
        {sub && (
          <text
            x={cx}
            y={cy + r * 0.82}
            textAnchor="middle"
            fontSize={r * 0.34}
            fill={stroke}
            opacity={0.65}
            fontFamily="Georgia,serif"
          >
            {sub}
          </text>
        )}
      </g>
    );
  }
  return (
    <svg
      viewBox="0 0 240 75"
      style={{ width: "100%", maxWidth: 240, display: "block" }}
    >
      {sh >= 2 && (
        <C
          cx={32}
          cy={36}
          r={29}
          fill="#b0b8c2"
          stroke="#607080"
          label="2/-"
          sub="Florin"
        />
      )}
      {sh === 1 && (
        <C
          cx={32}
          cy={36}
          r={25}
          fill="#c0c8d2"
          stroke="#7080a0"
          label="1/-"
          sub="Shilling"
        />
      )}
      {pe >= 6 && (
        <C
          cx={92}
          cy={36}
          r={21}
          fill="#c8d0d8"
          stroke="#8898a8"
          label="6d"
          sub="Sixpence"
        />
      )}
      {pe >= 4 && pe < 6 && (
        <C cx={92} cy={36} r={18} fill="#c8a860" stroke="#907030" label="4d" />
      )}
      {pe >= 3 && pe < 4 && (
        <C
          cx={92}
          cy={36}
          r={17}
          fill="#b87333"
          stroke="#8B5A2B"
          label="3d"
          sub="Thrup'ny"
        />
      )}
      {pe >= 2 && (
        <C cx={144} cy={38} r={15} fill="#b87333" stroke="#8B5A2B" label="2d" />
      )}
      {pe >= 1 && (
        <C
          cx={180}
          cy={38}
          r={14}
          fill="#b87333"
          stroke="#8B5A2B"
          label="1d"
          sub="Penny"
        />
      )}
      {pe >= 5 && sh === 0 && (
        <C cx={33} cy={36} r={20} fill="#c8a860" stroke="#906820" label="5d" />
      )}
      <text
        x={120}
        y={68}
        textAnchor="middle"
        fontSize={7}
        fill="#7a6040"
        fontFamily="Georgia,serif"
        fontStyle="italic"
      >
        Pre-decimal Irish coinage · {sh > 0 ? `${sh}s` : ""}
        {pe > 0 ? ` ${pe}d` : ""}
      </text>
    </svg>
  );
}

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
  </div>
);
const BodyText = ({
  children,
  size = 12,
}: {
  children: React.ReactNode;
  size?: number;
}) => (
  <p
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
    // Fade in, hold briefly, then fade out slowly
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
    /* audio blocked — silent fail */
  }
}

export default function YearPage({ content }: { content: YearData }) {
  const router = useRouter();
  const { year } = content;
  const overlayRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (y: number) => {
      if (y < 1916 || y > 1926) return;
      playRustle();
      const el = overlayRef.current;
      if (!el) {
        router.push(`/${y}`);
        return;
      }
      el.classList.add("sweeping");
      setTimeout(() => {
        router.push(`/${y}`);
        setTimeout(() => {
          el.classList.remove("sweeping");
          el.classList.add("retreating");
          setTimeout(() => el.classList.remove("retreating"), 200);
        }, 60);
      }, 180);
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

  const price = content.price_of_a_pint ?? "";
  const pintDisp = parsePintPrice(price);
  const popNum = content.population_estimate.match(/[\d,]+/)?.[0] ?? "";
  const [headlineEvent, ...otherEvents] = content.major_events;
  const headlineText = ev(headlineEvent);
  const [rawHeadlineTitle, ...headlineBody] = headlineText.split(" — ");
  const headlineTitle = rawHeadlineTitle
    ?.replace(/\s*\([^)]*\)/g, "")
    .replace(/,\s+[A-Z][a-z]+\.?\s+\d+.*$/, "")
    .trim();

  const stats = [
    { label: "City Population", value: popNum, sub: "city boundary" },
    { label: "Price of a Pint", value: pintDisp, sub: "Guinness stout" },
    {
      label: "Year of the State",
      value: year >= 1922 ? `Yr ${year - 1921}` : "—",
      sub: "Irish Free State",
    },
    {
      label: "Years Since Rising",
      value: year === 1916 ? "The Rising" : String(year - 1916),
      sub: "Easter 1916",
    },
    {
      label: "Era",
      value:
        year <= 1920 ? "Conflict" : year <= 1923 ? "Civil War" : "Recovery",
      sub: content.timeline_tags[0]?.replace(/_/g, " ") ?? "",
    },
  ];

  return (
    <>
      <Head>
        <title>{`The Dublin Chronicle · ${year}`}</title>
        <meta name="description" content={content.timeline_summary} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#e8dfc8}
          ::selection{background:#1a1208;color:#f0e8d0}

          /* ── Hero image ───────────────────────────────────────────── */
          .hero-img-wrap{width:100%;margin-bottom:12px}
          .hero-img-wrap img{width:100%;height:280px;object-fit:cover;display:block;filter:sepia(.8) contrast(1.12) brightness(.9);border:1px solid #b0a080}
          .hero-img-placeholder{width:100%;height:280px;background:#e0d8c0;border:1px solid #b0a080;display:flex;flex-direction:column;align-items:center;justify-content:center;margin-bottom:12px;gap:8px}
          @media(max-width:640px){
            .hero-img-wrap img{height:220px}
            .hero-img-placeholder{height:180px}
          }
          .stats-banner{display:grid;grid-template-columns:repeat(5,1fr);background:#e8dfc8;border-bottom:3px double #1a1208}
          .stats-banner .stat{padding:10px 12px;text-align:center;border-right:1px solid #b0a080}
          .stats-banner .stat:last-child{border-right:none}
          /* On mobile: 2 columns with the last item full-width */
          @media(max-width:640px){
            .stats-banner{grid-template-columns:1fr 1fr}
            .stats-banner .stat{border-right:none;border-bottom:1px solid #b0a080}
            .stats-banner .stat:nth-child(odd){border-right:1px solid #b0a080}
            .stats-banner .stat:last-child{grid-column:1/-1;border-right:none}
          }

          /* ── Paper grid ───────────────────────────────────────────── */
          .paper-grid{display:grid;grid-template-columns:220px 10px 1fr 10px 230px}
          @media(max-width:1100px){.paper-grid{grid-template-columns:1fr}}
          @media(max-width:1100px){.paper-grid>*:nth-child(2),.paper-grid>*:nth-child(4){display:none}}

          /* Page-turn overlay */
          .page-turn-overlay{position:fixed;inset:0;z-index:998;pointer-events:none;background:#f0e4c0;clip-path:inset(0 100% 0 0);transition:clip-path 0.18s ease-in}
          .page-turn-overlay.sweeping{clip-path:inset(0 0% 0 0)}
          .page-turn-overlay.retreating{clip-path:inset(0 0 0 100%);transition:clip-path 0.18s ease-out}

          /* Paper texture & vignette */
          .paper-texture::before{content:'';position:fixed;inset:0;z-index:997;pointer-events:none;opacity:0.045;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");background-repeat:repeat;background-size:200px 200px}
          .paper-texture::after{content:'';position:fixed;inset:0;z-index:996;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(26,18,8,0.18) 100%)}

          @media print{
            nav{display:none!important}
            body{background:#fff!important}
            .paper-grid{grid-template-columns:1fr 2fr 1fr!important}
            *{color:#000!important;box-shadow:none!important}
            img{filter:none!important}
          }
        `}</style>
      </Head>

      <div ref={overlayRef} className="page-turn-overlay" />

      <div
        className="paper-texture"
        style={{
          background: "#f0e8d0",
          color: "#1a1208",
          fontFamily: "'Lora','Times New Roman',Georgia,serif",
          minHeight: "100vh",
          paddingBottom: 90,
        }}
      >
        {/* ══ MASTHEAD ════════════════════════════════════════════════ */}
        <div
          style={{ background: "#1a1208", color: "#f0e8d0", padding: "0 28px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(240,232,208,.2)",
              padding: "5px 0",
              fontSize: 8,
              fontFamily: "Georgia,serif",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <span>Established 1859 · Vol. {year - 1859}</span>
            <span>The Newspaper of Record for the Irish Capital</span>
            <span>Price: One Penny</span>
          </div>
          <div style={{ textAlign: "center", padding: "14px 0 6px" }}>
            <div
              style={{
                fontFamily: "'UnifrakturMaguntia','Times New Roman',serif",
                fontSize: "clamp(40px,7vw,84px)",
                lineHeight: 1,
                letterSpacing: 3,
              }}
            >
              The Dublin Chronicle
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                justifyContent: "center",
                marginTop: 6,
                fontSize: 8,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontFamily: "Georgia,serif",
                opacity: 0.6,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(240,232,208,.25)",
                }}
              />
              All the News Fit to Print · Dublin, Ireland
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "rgba(240,232,208,.25)",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(240,232,208,.2)",
              padding: "5px 0",
              fontSize: 9,
              fontFamily: "Georgia,serif",
            }}
          >
            <span style={{ fontStyle: "italic" }}>Dublin · Ireland</span>
            <span style={{ letterSpacing: 3, fontWeight: 700, fontSize: 11 }}>
              The Year of Our Lord {year} · Final Edition
            </span>
            <span style={{ fontStyle: "italic" }}>One Penny</span>
          </div>
        </div>

        {/* ══ STATS BANNER — responsive grid ═══════════════════════════ */}
        <div className="stats-banner">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div
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
                style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: "clamp(18px,2.5vw,28px)",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#1a1208",
                }}
              >
                {s.value}
              </div>
              <div
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

        {/* ══ SPLASH HEAD ═════════════════════════════════════════════ */}
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
              {headlineTitle?.trim() || `Dublin in ${year}`}
            </h1>
            {headlineBody.length > 0 && (
              <p
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

        {/* ══ HERO IMAGE — full width, outside columns ════════════ */}
        {content.imageUrl ? (
          <div
            style={{
              maxWidth: 1240,
              margin: "0 auto",
              padding: "0 20px",
              borderLeft: "1px solid #b0a080",
              borderRight: "1px solid #b0a080",
            }}
          >
            <img
              src={content.imageUrl}
              alt={`Dublin ${year}`}
              style={{
                width: "100%",
                height: "clamp(180px, 35vw, 320px)",
                objectFit: "cover",
                display: "block",
                filter: "sepia(.8) contrast(1.12) brightness(.9)",
                border: "1px solid #b0a080",
              }}
            />
            <p
              style={{
                fontSize: 8,
                fontStyle: "italic",
                fontFamily: "Georgia,serif",
                color: "#7a6040",
                padding: "3px 2px",
                borderBottom: "1px solid #b0a080",
              }}
            >
              A scene from Dublin, {year}. Photographed for The Dublin
              Chronicle.
            </p>
          </div>
        ) : null}

        {/* ══ 3-COLUMN BODY ═══════════════════════════════════════════ */}
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
            {/* ── LEFT ─────────────────────────────────────────────── */}
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
              <div style={{ padding: "8px 0" }}>
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
              </div>
              <HRule />
              <SecHead>Notable Addresses</SecHead>
              <div id="key-locations" style={{ paddingTop: 6 }}>
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
              <DeathNotices
                year={year}
                notableDubliners={content.notable_dubliners ?? []}
              />
            </div>

            <ColRule />

            {/* ── CENTRE ───────────────────────────────────────────── */}
            <div style={{ padding: "12px 20px" }}>
              <SecHead>Affairs of the Nation &amp; the City</SecHead>
              <div style={{ paddingTop: 6, columns: 2, gap: 18 }}>
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
                      <h4
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
                      </h4>
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
              <HRule />

              <SecHead>The Political Landscape</SecHead>
              <div style={{ padding: "8px 0" }}>
                <PoliticalBreakdown year={year} />
              </div>
              <HRule />

              {content.elections.length > 0 && (
                <>
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
                  <HRule />
                </>
              )}

              <SecHead>City Dispatches</SecHead>
              <div style={{ paddingTop: 6, columns: 2, gap: 18 }}>
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

              {content.what_was_on && content.what_was_on.length > 0 && (
                <>
                  <SecHead>Arts, Theatre &amp; Culture</SecHead>
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      margin: "8px 0 12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ flex: "0 0 50%" }}>
                      <img
                        src={`/images/dublin/${year}-culture.png`}
                        alt={`Dublin arts & culture ${year}`}
                        onError={(e) => {
                          (
                            e.target as HTMLImageElement
                          ).parentElement!.style.display = "none";
                        }}
                        style={{
                          width: "100%",
                          border: "1px solid #b0a080",
                          display: "block",
                          filter: "sepia(.6) contrast(1.1) brightness(.92)",
                        }}
                      />
                      <p
                        style={{
                          fontSize: 8,
                          fontStyle: "italic",
                          fontFamily: "Georgia,serif",
                          color: "#7a6040",
                          padding: "3px 2px",
                          borderBottom: "1px solid #b0a080",
                        }}
                      >
                        Arts &amp; culture in Dublin, {year}.
                      </p>
                    </div>
                    {content.what_was_on[0] &&
                      (() => {
                        const ci = content.what_was_on[0].indexOf(":");
                        const cat =
                          ci !== -1
                            ? content.what_was_on[0].slice(0, ci)
                            : content.what_was_on[0];
                        const body =
                          ci !== -1 ? content.what_was_on[0].slice(ci + 1) : "";
                        return (
                          <div
                            style={{
                              flex: 1,
                              borderLeft: "1px solid #b0a080",
                              paddingLeft: 14,
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
                                marginBottom: 4,
                              }}
                            >
                              {cat.trim()}
                            </div>
                            <p
                              style={{
                                fontFamily: "Georgia,serif",
                                fontSize: 11,
                                lineHeight: 1.75,
                                color: "#2a1a08",
                              }}
                            >
                              {body.trim()}
                            </p>
                          </div>
                        );
                      })()}
                  </div>
                  <div style={{ paddingTop: 6, columns: 2, gap: 18 }}>
                    {content.what_was_on.slice(1).map((item, i) => {
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

              <DublinMap year={year} keyLocations={content.key_locations} />
            </div>

            <ColRule />

            {/* ── RIGHT ────────────────────────────────────────────── */}
            <div style={{ padding: "12px 0 12px 14px" }}>
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
                <div style={{ width: "100%" }}>
                  <PreDecimalCoins text={pintDisp || "4d"} />
                </div>
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
              <HRule />

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
                {content.transport_snapshot.map((t, i) => {
                  const text = typeof t === "string" ? t : JSON.stringify(t);
                  return (
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
                      {text}
                    </p>
                  );
                })}
              </div>
              <HRule />

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

              {content.slang_or_phrase && (
                <>
                  <SecHead>The Vernacular</SecHead>
                  <div
                    style={{
                      padding: "10px 0 8px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
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

              <div
                style={{
                  border: "3px double #1a1208",
                  padding: "14px 10px",
                  textAlign: "center",
                  marginTop: 10,
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
                  ❝ My Goodness,
                  <br />
                  My Guinness ❞
                </div>
              </div>

              <WeatherReport year={year} weather={(content as any).weather} />
              <CigaretteAd year={year} />
            </div>
          </div>
        </div>

        {/* ══ FOOTER ══════════════════════════════════════════════════ */}
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

      {/* ══ NAV BAR ═════════════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#1a1208",
          borderTop: "3px double #b0a080",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          padding: "9px 20px",
        }}
      >
        <button
          onClick={() => go(year - 1)}
          disabled={year <= 1916}
          style={{
            background: "none",
            border: "1px solid #b0a080",
            color: year <= 1916 ? "#3a3028" : "#f0e8d0",
            width: 30,
            height: 30,
            cursor: year <= 1916 ? "not-allowed" : "pointer",
            fontFamily: "Georgia,serif",
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          ←
        </button>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Playfair Display','Times New Roman',serif",
              fontSize: 26,
              fontWeight: 700,
              color: "#f0e8d0",
              lineHeight: 1,
            }}
          >
            {year}
          </div>
          <div
            style={{
              fontSize: 7,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "Georgia,serif",
              color: "#7a6040",
            }}
          >
            1916 – 1926
          </div>
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          {Array.from({ length: 11 }, (_, i) => 1916 + i).map((y) => (
            <button
              key={y}
              onClick={() => go(y)}
              style={{
                background: y === year ? "#b0a080" : "none",
                border: `1px solid ${y === year ? "#b0a080" : "#2a2018"}`,
                color: y === year ? "#1a1208" : "#7a6040",
                width: 38,
                height: 26,
                cursor: "pointer",
                fontFamily: "Georgia,serif",
                fontSize: 10,
                fontWeight: y === year ? 700 : 400,
              }}
            >
              {y}
            </button>
          ))}
        </div>
        <button
          onClick={() => go(year + 1)}
          disabled={year >= 1926}
          style={{
            background: "none",
            border: "1px solid #b0a080",
            color: year >= 1926 ? "#3a3028" : "#f0e8d0",
            width: 30,
            height: 30,
            cursor: year >= 1926 ? "not-allowed" : "pointer",
            fontFamily: "Georgia,serif",
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          →
        </button>
      </nav>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), "content", "dublin");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const years = files
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""))
    .filter((y) => parseInt(y) >= 1916 && parseInt(y) <= 1926);
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
  return { props: { content } };
};
