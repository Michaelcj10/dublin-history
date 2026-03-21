import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

import OpenAI from "openai";
import fs from "fs";
import { buildPrompt } from "../lib/prompt";
import type { DublinYearData, DublinBatchResponse } from "../lib/dublin-types";
import { buildBatchPrompt } from "./generate-dublin";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const CONTENT_DIR = path.join(process.cwd(), "content", "dublin");

// ── Year range ────────────────────────────────────────────────────────────────
// 1916–2000 = 85 years.
const FIRST_YEAR = 1916;
const LAST_YEAR = 2000;
const ALL_YEARS = Array.from(
  { length: LAST_YEAR - FIRST_YEAR + 1 },
  (_, i) => FIRST_YEAR + i,
);

// ── Batch config ─────────────────────────────────────────────────────────────
// One year per call, 8000 tokens — maximum detail for every year.
function batchConfig(): { batchSize: number; maxTokens: number } {
  return { batchSize: 1, maxTokens: 8000 };
}

const RETRY_LIMIT = 3;
const PAUSE_BETWEEN_BATCHES_MS = 1500;

// ── CLI ───────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const yearFlag = args.find((a) => a.startsWith("--year="));
const rangeFlag = args.find((a) => a.startsWith("--range="));

let yearsToProcess: number[];
if (yearFlag) {
  const y = parseInt(yearFlag.split("=")[1]);
  yearsToProcess = [y];
} else if (rangeFlag) {
  const [s, e] = rangeFlag.split("=")[1].split("-").map(Number);
  yearsToProcess = Array.from({ length: e - s + 1 }, (_, i) => s + i);
} else {
  yearsToProcess = ALL_YEARS;
}

// ── JSON sanitiser ────────────────────────────────────────────────────────────
function sanitizeJson(raw: string): string {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON object found in response");
  return match[0].replace(/"(?:[^"\\]|\\.)*"/g, (m) =>
    m
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "")
      .replace(/\r\n/g, "\\n")
      .replace(/\r/g, "\\n")
      .replace(/\n/g, "\\n")
      .replace(/\t/g, "\\t"),
  );
}

// ── Core: generate a batch of years in one API call ───────────────────────────
async function generateBatch(
  startYear: number,
  endYear: number,
  maxTokens: number,
  attempt = 1,
): Promise<DublinYearData[]> {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: maxTokens,
      messages: [
        { role: "user", content: buildBatchPrompt(startYear, endYear) },
      ],
    });

    const raw = response.choices[0].message.content ?? "";
    const finishReason = response.choices[0].finish_reason;

    if (finishReason === "length") {
      console.warn(
        `  ⚠️  ${startYear}–${endYear} hit token limit (finish_reason: length). ` +
          `Output may be incomplete — consider reducing batch size for this range.`,
      );
    }

    const sanitized = sanitizeJson(raw);
    const parsed = JSON.parse(sanitized) as
      | DublinBatchResponse
      | DublinYearData;

    // Support both batch format {years:[...]} and single-year object directly
    const items: DublinYearData[] =
      "years" in parsed && Array.isArray(parsed.years)
        ? parsed.years
        : [parsed as DublinYearData];

    return items.map((y) => ({
      ...y,
      place: "Dublin" as const,
      year: y.year,
    }));
  } catch (err) {
    if (attempt <= RETRY_LIMIT) {
      const wait = 3000 * attempt;
      console.warn(
        `  [RETRY ${attempt}/${RETRY_LIMIT}] ${startYear}–${endYear} — waiting ${wait / 1000}s...`,
      );
      await sleep(wait);
      return generateBatch(startYear, endYear, maxTokens, attempt + 1);
    }
    throw err;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });

  // Filter out already-generated years (unless targeting a specific year/range)
  const isSingleTarget = !!(yearFlag || rangeFlag);
  const yearsNeeded = isSingleTarget
    ? yearsToProcess
    : yearsToProcess.filter(
        (y) => !fs.existsSync(path.join(CONTENT_DIR, `${y}.json`)),
      );

  if (yearsNeeded.length === 0) {
    console.log(`\n🏙  Dublin Timeline — all years already generated.`);
    console.log(
      `   Use --year=XXXX or --range=XXXX-XXXX to regenerate specific years.`,
    );
    return;
  }

  // Build batches — group consecutive years that share the same tier config
  // This means the tier boundary (1949→1950) always falls between batches.
  const batches: Array<{ years: number[]; maxTokens: number }> = [];
  let i = 0;
  while (i < yearsNeeded.length) {
    const startYear = yearsNeeded[i];
    const { batchSize, maxTokens } = batchConfig();
    const chunk = yearsNeeded.slice(i, i + batchSize);
    batches.push({ years: chunk, maxTokens });
    i += chunk.length;
  }

  const estMins = Math.ceil(
    (batches.length * (PAUSE_BETWEEN_BATCHES_MS + 8000)) / 60000,
  );

  console.log(`\n🏙  Dublin Timeline — Content Generator`);
  console.log(`   Range          : ${FIRST_YEAR}–${LAST_YEAR}`);
  console.log(`   Years needed   : ${yearsNeeded.length}`);
  console.log(`   Batches        : ${batches.length}`);
  console.log(`   Estimated time : ~${estMins} minutes\n`);

  let generated = 0;
  let errors = 0;
  const errorRanges: string[] = [];

  for (let b = 0; b < batches.length; b++) {
    const { years, maxTokens } = batches[b];
    const startYear = years[0];
    const endYear = years[years.length - 1];
    const tier = startYear >= 1950 ? "living_memory" : "chronicle";
    const label =
      startYear === endYear ? `${startYear}` : `${startYear}–${endYear}`;

    process.stdout.write(
      `Batch ${b + 1}/${batches.length} [${tier}] ${label}... `,
    );

    try {
      const records = await generateBatch(startYear, endYear, maxTokens);

      for (const record of records) {
        const file = path.join(CONTENT_DIR, `${record.year}.json`);
        fs.writeFileSync(file, JSON.stringify(record, null, 2), "utf-8");
        generated++;
      }

      process.stdout.write(`✅ ${records.length} year(s) saved\n`);
    } catch (err) {
      process.stdout.write(`❌ ${(err as Error).message.slice(0, 100)}\n`);
      errors++;
      errorRanges.push(label);
    }

    if (b < batches.length - 1) {
      await sleep(PAUSE_BETWEEN_BATCHES_MS);
    }
  }

  console.log(`\n─────────────────────────────────────────────────────`);
  console.log(`✅ Generated : ${generated}`);
  console.log(
    `❌ Errors    : ${errors}${errors > 0 ? "  →  " + errorRanges.join(", ") : ""}`,
  );

  if (errorRanges.length > 0) {
    console.log(`\nRetry failed ranges:`);
    errorRanges.forEach((r) => {
      const [s, e] = r.split("–");
      const flag = e ? `--range=${s}-${e}` : `--year=${s}`;
      console.log(`  npx tsx scripts/generate.ts ${flag}`);
    });
  }

  console.log(`\nNext step: npm run build`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
