// PeriodAd — year-by-year newspaper / magazine advertisement SVG
// Covers every year from 1916 to 2000 inclusive.
// Early years use cigarette ads; later years shift to other period-appropriate consumer ads.

import React from "react";

interface Props {
  year: number;
}

type HeroType =
  | "sailor"
  | "woodbine"
  | "goldflake"
  | "radio"
  | "teacup"
  | "soap"
  | "tv"
  | "jet"
  | "phone"
  | "cart";

type Brand = {
  name: string;
  sub: string;
  established: string;
  copy: string[];
  tagline: string;
  detail: string;
  hero: HeroType;
  palette?: {
    bg?: string;
    panel?: string;
    ink?: string;
    trim?: string;
    banner?: string;
    bannerText?: string;
  };
};

function pickByYear<T>(year: number, items: T[], startYear: number) {
  return items[(year - startYear) % items.length];
}

const ERA_CATALOGUES = {
  1916_1926: [
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
      hero: "sailor",
      palette: {
        bg: "#e8dfc8",
        panel: "#f5f0e4",
        ink: "#1a1208",
        trim: "#b0a060",
        banner: "#1a1208",
        bannerText: "#f0e8d0",
      },
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
      palette: {
        bg: "#e8dfc8",
        panel: "#f5f0e4",
        ink: "#1a1208",
        trim: "#b0a060",
        banner: "#1a1208",
        bannerText: "#f0e8d0",
      },
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
      palette: {
        bg: "#e8dfc8",
        panel: "#f5f0e4",
        ink: "#1a1208",
        trim: "#b0a060",
        banner: "#1a1208",
        bannerText: "#f0e8d0",
      },
    },
  ] satisfies Brand[],

  1927_1949: [
    {
      name: "Murphy's Wireless",
      sub: "Modern Home Radio Sets",
      established: "Fine Sets for Irish Homes",
      copy: [
        "Bring the world into your parlour",
        "News · Music · Variety every evening",
        "A handsome receiver for every household",
      ],
      tagline: "Hear More with Murphy's",
      detail: "Easy terms available",
      hero: "radio",
      palette: {
        bg: "#efe3c8",
        panel: "#faf3e4",
        ink: "#2b1c10",
        trim: "#a88448",
        banner: "#4b2f1f",
        bannerText: "#f6eddc",
      },
    },
    {
      name: "Lyons Tea",
      sub: "Pure Tea for Family Table",
      established: "Packed for Freshness",
      copy: [
        "A good cup for every Irish home",
        "Comforting, economical, dependable",
        "Serve it morning, noon and night",
      ],
      tagline: "The Taste That Welcomes",
      detail: "Half-pound and one-pound packets",
      hero: "teacup",
      palette: {
        bg: "#efe6ce",
        panel: "#fbf5e8",
        ink: "#2d2010",
        trim: "#ad9152",
        banner: "#6b4a24",
        bannerText: "#f8f1df",
      },
    },
    {
      name: "Sunlight Soap",
      sub: "For Kitchen, Laundry & Home",
      established: "Trusted in Every House",
      copy: [
        "Clean linen, bright kitchens, thrifty housekeeping",
        "Dependable quality for busy families",
        "A household necessity of proven worth",
      ],
      tagline: "Sunlight Makes the Home Shine",
      detail: "Buy by the bar or family carton",
      hero: "soap",
      palette: {
        bg: "#efe6cf",
        panel: "#f8f3e7",
        ink: "#2a1d12",
        trim: "#b59c66",
        banner: "#31513b",
        bannerText: "#f2ecd8",
      },
    },
  ] satisfies Brand[],

  1950_1969: [
    {
      name: "Bush Radio",
      sub: "Television & Wireless",
      established: "Designed for the Modern Sitting Room",
      copy: [
        "Clear pictures and dependable sound",
        "The new centre of family evenings",
        "Styled for comfort and distinction",
      ],
      tagline: "See the Future at Home",
      detail: "Table and cabinet models available",
      hero: "tv",
      palette: {
        bg: "#ddd4bc",
        panel: "#f3ecd9",
        ink: "#20170f",
        trim: "#8c6e4b",
        banner: "#3f3024",
        bannerText: "#f1e8d2",
      },
    },
    {
      name: "Aer Lingus",
      sub: "European Air Services",
      established: "From Dublin to Europe",
      copy: [
        "Swift, modern travel for business and leisure",
        "Fly in comfort to London and beyond",
        "Irish hospitality in the air",
      ],
      tagline: "Take Wings with Aer Lingus",
      detail: "Book through your travel agent",
      hero: "jet",
      palette: {
        bg: "#dfe6d8",
        panel: "#f6faf3",
        ink: "#173020",
        trim: "#6c8c77",
        banner: "#1f5a43",
        bannerText: "#eff8f3",
      },
    },
    {
      name: "Barrys Tea",
      sub: "A Better Cup Every Day",
      established: "Blended for Irish Taste",
      copy: [
        "Strong, bright and full of flavour",
        "The family tea for breakfast and supper",
        "A welcome at every table",
      ],
      tagline: "Put the Kettle On",
      detail: "Loose tea and tea bags",
      hero: "teacup",
      palette: {
        bg: "#efe3c8",
        panel: "#fbf4e7",
        ink: "#2c1d10",
        trim: "#b28f4b",
        banner: "#7a3b22",
        bannerText: "#fbf0e0",
      },
    },
  ] satisfies Brand[],

  1970_1989: [
    {
      name: "ESB Appliance Centre",
      sub: "Electrical Living for the Modern Home",
      established: "Cookers · Kettles · Heaters",
      copy: [
        "Practical comfort for busy households",
        "Smarter kitchens and easier evenings",
        "See the newest electric range today",
      ],
      tagline: "Modern Ireland Lives Electric",
      detail: "Ask about instalment purchase",
      hero: "tv",
      palette: {
        bg: "#e7e1d2",
        panel: "#faf7f0",
        ink: "#1f1f1f",
        trim: "#8f8a7b",
        banner: "#355070",
        bannerText: "#f4f8fc",
      },
    },
    {
      name: "Telecom Éireann",
      sub: "Telephone Service for Home & Business",
      established: "Keeping Ireland Connected",
      copy: [
        "Clearer calls across town and country",
        "Reliable service for family and trade",
        "Ask about new home installations",
      ],
      tagline: "Reach Out with Confidence",
      detail: "Directory and connection information available",
      hero: "phone",
      palette: {
        bg: "#dde6ea",
        panel: "#f7fbfc",
        ink: "#18313b",
        trim: "#6f93a1",
        banner: "#0f4c5c",
        bannerText: "#eef8fb",
      },
    },
    {
      name: "Superquinn",
      sub: "Fresh Food for Modern Families",
      established: "Service · Quality · Value",
      copy: [
        "Fresh produce, bakery and household goods",
        "Weekly shopping made easier",
        "A store for the changing Irish household",
      ],
      tagline: "Where Quality Comes First",
      detail: "Special offers each week",
      hero: "cart",
      palette: {
        bg: "#efe7dc",
        panel: "#fffaf4",
        ink: "#2f241c",
        trim: "#b49774",
        banner: "#8b2e1e",
        bannerText: "#fff4ef",
      },
    },
  ] satisfies Brand[],

  1990_2000: [
    {
      name: "eircell",
      sub: "Mobile Phone Service",
      established: "Talk More. Move Freely.",
      copy: [
        "Ireland is going mobile",
        "Clearer calls for work, home and travel",
        "Choose a handset and connect today",
      ],
      tagline: "The Mobile Age Has Arrived",
      detail: "Prepay and business plans available",
      hero: "phone",
      palette: {
        bg: "#e7edf3",
        panel: "#f9fbfd",
        ink: "#1f2d3a",
        trim: "#8aa3bb",
        banner: "#24557a",
        bannerText: "#eef6fc",
      },
    },
    {
      name: "Dunnes Stores",
      sub: "Value for Ireland",
      established: "Food · Fashion · Home",
      copy: [
        "One stop for the week's shopping",
        "Value and convenience for busy families",
        "From groceries to household essentials",
      ],
      tagline: "Better Value Every Day",
      detail: "Offers in store now",
      hero: "cart",
      palette: {
        bg: "#efe8e3",
        panel: "#fffaf8",
        ink: "#2d2320",
        trim: "#b7a39a",
        banner: "#b21f1f",
        bannerText: "#fff3f3",
      },
    },
    {
      name: "Gateway Internet",
      sub: "Home Internet for a New Century",
      established: "Email · Web · Connection",
      copy: [
        "The web comes home",
        "News, shopping and messages at your desk",
        "A new world through your telephone line",
      ],
      tagline: "Log On to Tomorrow",
      detail: "Connection packages now available",
      hero: "phone",
      palette: {
        bg: "#e4ebf2",
        panel: "#fbfdff",
        ink: "#203040",
        trim: "#8ba6c3",
        banner: "#3949ab",
        bannerText: "#f4f6ff",
      },
    },
  ] satisfies Brand[],
};

function buildYearAds(): Record<number, Brand> {
  const result: Record<number, Brand> = {};

  for (let y = 1916; y <= 1926; y++) {
    result[y] = pickByYear(y, ERA_CATALOGUES[1916_1926], 1916);
  }
  for (let y = 1927; y <= 1949; y++) {
    result[y] = pickByYear(y, ERA_CATALOGUES[1927_1949], 1927);
  }
  for (let y = 1950; y <= 1969; y++) {
    result[y] = pickByYear(y, ERA_CATALOGUES[1950_1969], 1950);
  }
  for (let y = 1970; y <= 1989; y++) {
    result[y] = pickByYear(y, ERA_CATALOGUES[1970_1989], 1970);
  }
  for (let y = 1990; y <= 2000; y++) {
    result[y] = pickByYear(y, ERA_CATALOGUES[1990_2000], 1990);
  }

  return result;
}

export const YEAR_ADS: Record<number, Brand> = buildYearAds();

function getBrand(year: number): Brand {
  if (year < 1916) return YEAR_ADS[1916];
  if (year > 2000) return YEAR_ADS[2000];
  return YEAR_ADS[year];
}

// ── Hero illustrations ────────────────────────────────────────────────────────

function SailorHero() {
  return (
    <g>
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
      <path
        d="M70,18 Q88,35 104,52 Q88,69 70,86 Q52,69 36,52 Q52,35 70,18Z"
        fill="none"
        stroke="#1a1208"
        strokeWidth="2.5"
        strokeDasharray="8,12"
      />
      <ellipse cx="70" cy="52" rx="18" ry="20" fill="#d4b896" />
      <rect x="52" y="32" width="36" height="8" rx="4" fill="#1a1208" />
      <rect x="56" y="28" width="28" height="6" rx="2" fill="#1a1208" />
      <rect x="60" y="25" width="20" height="5" rx="2" fill="#f0e8d0" />
      <circle cx="63" cy="50" r="2.5" fill="#1a1208" />
      <circle cx="77" cy="50" r="2.5" fill="#1a1208" />
      <path
        d="M70,52 L67,58 L73,58"
        fill="none"
        stroke="#a08060"
        strokeWidth="1"
      />
      <path
        d="M63,62 Q70,67 77,62"
        fill="none"
        stroke="#1a1208"
        strokeWidth="1.5"
      />
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
      <rect x="88" y="46" width="34" height="8" rx="2" fill="#f5f0e8" />
      <rect x="88" y="46" width="8" height="8" rx="1" fill="#c8a040" />
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
      <path
        d="M55,22 L58,14 L63,18 L70,12 L77,18 L82,14 L85,22 Z"
        fill="#d4a820"
        stroke="#8a6800"
        strokeWidth="1"
      />
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

function RadioHero() {
  return (
    <g>
      <rect
        x="30"
        y="28"
        width="80"
        height="48"
        rx="5"
        fill="#7b5738"
        stroke="#4d311d"
        strokeWidth="2"
      />
      <rect
        x="38"
        y="36"
        width="34"
        height="24"
        rx="2"
        fill="#cfb98f"
        stroke="#71553a"
        strokeWidth="1.2"
      />
      <line x1="43" y1="40" x2="67" y2="40" stroke="#71553a" strokeWidth="1" />
      <line x1="43" y1="45" x2="67" y2="45" stroke="#71553a" strokeWidth="1" />
      <line x1="43" y1="50" x2="67" y2="50" stroke="#71553a" strokeWidth="1" />
      <line x1="43" y1="55" x2="67" y2="55" stroke="#71553a" strokeWidth="1" />
      <circle
        cx="88"
        cy="48"
        r="8"
        fill="#d8c298"
        stroke="#62452b"
        strokeWidth="1.2"
      />
      <circle
        cx="102"
        cy="48"
        r="5"
        fill="#d8c298"
        stroke="#62452b"
        strokeWidth="1.2"
      />
      <line x1="55" y1="28" x2="48" y2="14" stroke="#4d311d" strokeWidth="2" />
      <line x1="55" y1="28" x2="62" y2="14" stroke="#4d311d" strokeWidth="2" />
    </g>
  );
}

function TeaCupHero() {
  return (
    <g>
      <ellipse cx="70" cy="78" rx="34" ry="6" fill="#cab99e" opacity="0.5" />
      <rect
        x="42"
        y="40"
        width="44"
        height="24"
        rx="4"
        fill="#f6f2ea"
        stroke="#92734a"
        strokeWidth="2"
      />
      <path
        d="M86,46 Q100,46 100,55 Q100,64 86,62"
        fill="none"
        stroke="#92734a"
        strokeWidth="3"
      />
      <rect x="40" y="64" width="50" height="4" rx="2" fill="#92734a" />
      <path
        d="M52,38 Q48,28 54,20"
        fill="none"
        stroke="#b8b0a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M66,38 Q62,26 68,18"
        fill="none"
        stroke="#b8b0a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M80,38 Q76,28 82,20"
        fill="none"
        stroke="#b8b0a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="46" y="44" width="36" height="14" rx="2" fill="#8b4f2b" />
    </g>
  );
}

function SoapHero() {
  return (
    <g>
      <rect
        x="36"
        y="36"
        width="68"
        height="34"
        rx="5"
        fill="#efe0a8"
        stroke="#8a7040"
        strokeWidth="2"
      />
      <rect
        x="42"
        y="42"
        width="56"
        height="22"
        rx="3"
        fill="#f8efc8"
        stroke="#a08858"
        strokeWidth="1"
      />
      <text
        x="70"
        y="56"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="#6b5631"
      >
        SOAP
      </text>
      <circle cx="46" cy="30" r="6" fill="#ffffff" opacity="0.8" />
      <circle cx="56" cy="24" r="4" fill="#ffffff" opacity="0.65" />
      <circle cx="64" cy="30" r="5" fill="#ffffff" opacity="0.7" />
    </g>
  );
}

function TvHero() {
  return (
    <g>
      <rect
        x="34"
        y="22"
        width="72"
        height="52"
        rx="4"
        fill="#6d4b32"
        stroke="#392314"
        strokeWidth="2"
      />
      <rect
        x="42"
        y="30"
        width="56"
        height="34"
        rx="2"
        fill="#d8d4c8"
        stroke="#56402c"
        strokeWidth="1.2"
      />
      <path
        d="M50,58 L60,48 L70,54 L84,40 L92,45"
        fill="none"
        stroke="#56402c"
        strokeWidth="2"
      />
      <line x1="52" y1="22" x2="45" y2="10" stroke="#392314" strokeWidth="2" />
      <line x1="88" y1="22" x2="95" y2="10" stroke="#392314" strokeWidth="2" />
      <rect x="46" y="76" width="48" height="4" rx="2" fill="#392314" />
    </g>
  );
}

function JetHero() {
  return (
    <g>
      <path
        d="M25,58 L78,58 L106,46 L113,49 L95,58 L113,67 L106,70 L78,62 L25,62 Z"
        fill="#d7e4ea"
        stroke="#4f6c77"
        strokeWidth="2"
      />
      <path
        d="M52,58 L62,36 L72,36 L68,58 Z"
        fill="#b9d2dc"
        stroke="#4f6c77"
        strokeWidth="1.5"
      />
      <path
        d="M52,62 L64,78 L73,78 L68,62 Z"
        fill="#b9d2dc"
        stroke="#4f6c77"
        strokeWidth="1.5"
      />
      <circle cx="40" cy="60" r="2" fill="#4f6c77" />
      <circle cx="48" cy="60" r="2" fill="#4f6c77" />
      <circle cx="56" cy="60" r="2" fill="#4f6c77" />
    </g>
  );
}

function PhoneHero() {
  return (
    <g>
      <rect
        x="48"
        y="24"
        width="44"
        height="58"
        rx="7"
        fill="#394b5b"
        stroke="#19222b"
        strokeWidth="2"
      />
      <rect
        x="54"
        y="31"
        width="32"
        height="22"
        rx="3"
        fill="#d9e7ef"
        stroke="#7a91a4"
        strokeWidth="1"
      />
      <circle
        cx="70"
        cy="69"
        r="6"
        fill="#d5dde5"
        stroke="#6f8090"
        strokeWidth="1.5"
      />
      <circle cx="70" cy="69" r="2" fill="#72808d" />
      <rect x="58" y="57" width="24" height="4" rx="2" fill="#7a8c98" />
      <path
        d="M92,42 Q106,36 108,24"
        fill="none"
        stroke="#8db1c7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M94,50 Q112,50 118,38"
        fill="none"
        stroke="#8db1c7"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

function CartHero() {
  return (
    <g>
      <path
        d="M38,34 L50,34 L56,58 L96,58 L104,42 L60,42"
        fill="none"
        stroke="#5c4b3d"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="62" cy="70" r="6" fill="#7e6a57" />
      <circle cx="92" cy="70" r="6" fill="#7e6a57" />
      <rect x="62" y="30" width="10" height="10" fill="#d96c5f" />
      <rect x="74" y="26" width="12" height="14" fill="#8bbf6a" />
      <rect x="88" y="32" width="10" height="8" fill="#d5b05e" />
    </g>
  );
}

function Hero({ type }: { type: HeroType }) {
  switch (type) {
    case "sailor":
      return <SailorHero />;
    case "woodbine":
      return <WoodbineHero />;
    case "goldflake":
      return <GoldFlakeHero />;
    case "radio":
      return <RadioHero />;
    case "teacup":
      return <TeaCupHero />;
    case "soap":
      return <SoapHero />;
    case "tv":
      return <TvHero />;
    case "jet":
      return <JetHero />;
    case "phone":
      return <PhoneHero />;
    case "cart":
      return <CartHero />;
    default:
      return null;
  }
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PeriodAd({ year }: Props) {
  const brand = getBrand(year);

  const palette = {
    bg: brand.palette?.bg ?? "#e8dfc8",
    panel: brand.palette?.panel ?? "#f5f0e4",
    ink: brand.palette?.ink ?? "#1a1208",
    trim: brand.palette?.trim ?? "#b0a060",
    banner: brand.palette?.banner ?? "#1a1208",
    bannerText: brand.palette?.bannerText ?? "#f0e8d0",
  };

  return (
    <div
      style={{
        border: `3px double ${palette.ink}`,
        background: palette.bg,
        padding: 0,
        textAlign: "center",
        marginTop: 12,
        overflow: "hidden",
        fontFamily: "Georgia,'Times New Roman',serif",
      }}
    >
      <div
        style={{
          background: palette.banner,
          color: palette.bannerText,
          padding: "4px 8px",
          fontSize: 7,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        Advertisement
      </div>

      <svg
        viewBox="0 0 140 105"
        style={{ width: "100%", display: "block", background: palette.panel }}
      >
        <rect
          x="2"
          y="2"
          width="136"
          height="101"
          rx="3"
          fill="none"
          stroke={palette.trim}
          strokeWidth="1"
          strokeDasharray="4,3"
        />

        <Hero type={brand.hero} />

        <rect x="0" y="88" width="140" height="17" fill={palette.banner} />
        <text
          x="70"
          y="100"
          textAnchor="middle"
          fontFamily="Georgia,serif"
          fontSize="10"
          fontWeight="bold"
          fill={palette.bannerText}
          letterSpacing="1.2"
        >
          {brand.name.toUpperCase()}
        </text>
      </svg>

      <div style={{ padding: "10px 12px 4px" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: palette.ink,
            marginBottom: 4,
          }}
        >
          {brand.sub}
        </div>

        <div
          style={{
            borderTop: `1px solid ${palette.trim}`,
            borderBottom: `1px solid ${palette.trim}`,
            padding: "5px 0",
            margin: "5px 0",
          }}
        >
          {brand.copy.map((line, i) => (
            <p
              key={i}
              style={{
                fontSize: 10,
                lineHeight: 1.6,
                color: palette.ink,
                fontStyle: i > 0 ? "italic" : "normal",
                margin: 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: palette.ink,
            margin: "5px 0 3px",
          }}
        >
          {brand.detail}
        </div>

        <div
          style={{
            fontSize: 11,
            fontStyle: "italic",
            fontWeight: 700,
            color: palette.ink,
            borderTop: `1px dotted ${palette.trim}`,
            paddingTop: 6,
            marginTop: 4,
          }}
        >
          ❝ {brand.tagline} ❞
        </div>

        <div
          style={{
            fontSize: 7,
            color: "#7a6040",
            marginTop: 5,
            letterSpacing: 1,
            borderTop: `1px solid ${palette.trim}`,
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
