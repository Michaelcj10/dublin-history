// ── Sub-types ─────────────────────────────────────────────────────────────────

export interface DublinElection {
  type:
    | "General Election"
    | "Local Election"
    | "By-election"
    | "Referendum"
    | "European Election";
  result_summary: string;
  winning_party: string;
}

export interface DublinGAAFinal {
  championship: string;
  winner: string;
  runner_up: string;
  score?: string;
}

export interface DublinImageSearch {
  queries: string[];
}

// ── Mixed-format field types ───────────────────────────────────────────────────
// Older generated JSON uses object shapes; newer uses plain strings.
// The page handles both — types reflect that reality.

export interface MajorEventObject {
  name: string;
  date?: string;
  people_involved?: string[];
  impact?: string;
}
export type MajorEvent = string | MajorEventObject;

export interface ArchitectureObject {
  style: string;
  example?: string;
}
export type ArchitectureStyle = string | ArchitectureObject;

export interface IndustryObject {
  industry: string;
  significance?: string;
}
export type MajorIndustry = string | IndustryObject;

// ── Base fields (both tiers) ──────────────────────────────────────────────────
interface DublinYearBase {
  place: "Dublin";
  year: number;
  timeline_summary: string;
  visual_scene: string;
  city_changes: string[];
  major_events: MajorEvent[];
  population_estimate: string;
  transport_snapshot: string[];
  architecture_style: ArchitectureStyle[];
  major_industries: MajorIndustry[];
  key_locations: string[];
  timeline_tags: string[];
  elections: DublinElection[];
  gaa_finals: DublinGAAFinal[];
  image_search: DublinImageSearch;
  // Written by generate-images script
  imageUrl?: string;
  imageSource?: string;
  imageQuery?: string;
}

// ── Chronicle tier  1910–1949 ─────────────────────────────────────────────────
export interface DublinChronicleYear extends DublinYearBase {
  tier: "chronicle";
}

// ── Living Memory tier  1950–2025 ─────────────────────────────────────────────
export interface DublinLivingMemoryYear extends DublinYearBase {
  tier: "living_memory";
  price_of_a_pint: string;
  cost_of_living: string;
  notable_dubliners: string[];
  what_was_on: string[];
  slang_or_phrase: string;
}

// ── Union — use this everywhere ───────────────────────────────────────────────
export type DublinYearData = DublinChronicleYear | DublinLivingMemoryYear;

// ── Type guards ───────────────────────────────────────────────────────────────
export function isLivingMemory(
  year: DublinYearData,
): year is DublinLivingMemoryYear {
  return year.tier === "living_memory";
}

export function isChronicle(year: DublinYearData): year is DublinChronicleYear {
  return year.tier === "chronicle";
}

// ── Field normaliser helpers ──────────────────────────────────────────────────
// Use these in components to safely get a string from mixed-format fields.

export function normaliseMajorEvent(e: MajorEvent): string {
  if (typeof e === "string") return e;
  const parts = [e.name];
  if (e.date) parts.push(`(${e.date})`);
  if (e.impact) parts.push(`— ${e.impact}`);
  return parts.join(" ");
}

export function normaliseArchitecture(a: ArchitectureStyle): {
  style: string;
  example: string;
} {
  if (typeof a === "string") {
    const [style, ...rest] = a.split(/[—:–]/);
    return { style: style.trim(), example: rest.join(" ").trim() };
  }
  return { style: a.style, example: a.example ?? "" };
}

export function normaliseIndustry(ind: MajorIndustry): {
  name: string;
  detail: string;
} {
  if (typeof ind === "string") {
    const [name, ...rest] = ind.split(/[—:–]/);
    return { name: name.trim(), detail: rest.join(" ").trim() };
  }
  return { name: ind.industry, detail: ind.significance ?? "" };
}

// ── API response shape ────────────────────────────────────────────────────────
export interface DublinBatchResponse {
  place: "Dublin";
  years: DublinYearData[];
}
