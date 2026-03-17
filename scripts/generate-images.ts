import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config({ path: path.join(process.cwd(), ".env") });

import OpenAI from "openai";
import fs from "fs";
import https from "https";
import http from "http";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const CONTENT_DIR = path.join(process.cwd(), "content", "dublin");
const IMAGE_DIR = path.join(process.cwd(), "public", "images", "dublin");
const PAUSE_MS = 1500;

// ── CLI ───────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const yearFlag = args.find((a) => a.startsWith("--year="));
const targetYear = yearFlag ? parseInt(yearFlag.split("=")[1]) : null;
const ALL_YEARS = Array.from({ length: 11 }, (_, i) => 1916 + i);

// ── Style ─────────────────────────────────────────────────────────────────────
// All years 1916–1926 get the same photographic era treatment.
// Early press photography: glass plate, orthochromatic film, high contrast,
// warm sepia tones, slightly soft focus on edges.
function eraStyle(): string {
  return "early 20th century Irish press photograph, glass plate negative, orthochromatic film, high contrast black and white with warm sepia tone, slightly soft focus edges, documentary newspaper photography, 1916–1926 era, authentic period grain";
}

// ── Year-specific scene ───────────────────────────────────────────────────────
// Each year gets a curated safe scene pulled from its historical context.
// Scenes are deliberately non-violent — architecture, streets, daily life —
// to avoid DALL-E content policy rejections while remaining historically grounded.
function buildScene(year: number, data: Record<string, unknown>): string {
  const scenes: Record<number, string> = {
    1916: "O'Connell Street Dublin, showing the façade of the General Post Office with its iconic Ionic columns and portico, a quiet Dublin street scene with horse-drawn carts and early motor cars, Georgian townhouses in background, overcast sky",
    1917: "Sackville Street Dublin 1917, rebuilding work visible on damaged buildings, pedestrians in Edwardian dress walking past Georgian facades, horse trams on the street, subdued atmosphere, early spring",
    1918: "Dublin city centre 1918, bustling street scene outside the GPO reconstruction site, men in flat caps and women in long dark coats, early motor buses alongside horse carts, Georgian architecture lining the street",
    1919: "Grafton Street Dublin 1919, elegant shopfronts, pedestrians in period dress, early motorcars parked alongside bicycles, St Stephen's Green visible in distance, Georgian terraces, overcast Dublin sky",
    1920: "Dublin Castle courtyard 1920, imposing stone architecture of the Upper Yard, the Record Tower visible, cobblestones wet with rain, ornate lamp posts, empty yard, grey Dublin sky overhead",
    1921: "The Mansion House Dublin 1921, Dawson Street, the ornate Victorian facade of the Mansion House with its decorative ironwork and rounded bay window, quiet tree-lined street, Georgian buildings opposite",
    1922: "The Four Courts Dublin 1922, James Gandon's magnificent neoclassical dome and riverside facade viewed from the quays, the River Liffey in foreground, overcast sky, early morning light on the stone",
    1923: "O'Connell Bridge Dublin 1923, wide shot across the Liffey, the bridge thronged with pedestrians and horse carts, Nelson's Pillar visible in the distance on Sackville Street, Georgian and Victorian buildings lining the quays",
    1924: "College Green Dublin 1924, the Bank of Ireland's curved colonnaded facade opposite Trinity College, motor cars and bicycles, pedestrians in dark coats, the statue of Henry Grattan visible",
    1925: "St Stephen's Green Dublin 1925, the park in summer, ornamental lake visible, Victorian iron railings along the perimeter, Edwardian and Georgian buildings surrounding the green, families walking in the park",
    1926: "Abbey Theatre Dublin 1926, Lower Abbey Street, the modest Victorian facade of the national theatre, period street lamps, a handful of pedestrians outside, Georgian buildings stretching down the street",
  };

  // Use year-specific scene if available, otherwise build from content data
  if (scenes[year]) return scenes[year];

  // Fallback: pull safest location from the JSON
  const locations = (data.key_locations as string[] | undefined) ?? [];
  const safe = locations.find((l) =>
    /street|bridge|college|green|square|quay|hall|castle|church|canal|gate/i.test(
      l,
    ),
  );
  if (safe) {
    const clean = safe.split(/[—–]/)[0].trim().slice(0, 150);
    return `${clean}, Dublin ${year}, quiet street scene, period architecture`;
  }

  return `Dublin city centre street scene ${year}, Georgian architecture, horse-drawn carts, pedestrians in Edwardian dress`;
}

// ── Prompt builder ────────────────────────────────────────────────────────────
function buildPrompt(year: number, data: Record<string, unknown>): string {
  const scene = buildScene(year, data);
  const style = eraStyle();

  return [
    `A historical documentary photograph of Dublin, Ireland, ${year}.`,
    `Scene: ${scene}.`,
    `Visual style: ${style}.`,
    `The image depicts peaceful urban architecture and ordinary Dublin street life.`,
    `No text, signs, words, letters, or numbers visible anywhere in the image.`,
    `No people in distress. No conflict, weapons, fire, or smoke.`,
    `No military uniforms or armed figures.`,
    `Calm, architectural, and documentary in character.`,
    `Square format 1:1. Authentic to early 20th century Dublin.`,
  ].join(" ");
}

// ── Download ──────────────────────────────────────────────────────────────────
function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    function doGet(targetUrl: string, redirects = 0): void {
      if (redirects > 5) return reject(new Error("Too many redirects"));
      const get = targetUrl.startsWith("https") ? https.get : http.get;
      get(targetUrl, (res) => {
        if (
          res.statusCode &&
          [301, 302, 307, 308].includes(res.statusCode) &&
          res.headers.location
        ) {
          return doGet(res.headers.location, redirects + 1);
        }
        if (res.statusCode && res.statusCode >= 400) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
        file.on("error", (e) => {
          fs.unlink(dest, () => {});
          reject(e);
        });
      }).on("error", (e) => {
        fs.unlink(dest, () => {});
        reject(e);
      });
    }
    doGet(url);
  });
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Per-year ──────────────────────────────────────────────────────────────────
async function processYear(
  year: number,
  index: number,
  total: number,
  attempt = 1,
): Promise<"ok" | "skip" | "error"> {
  const jsonPath = path.join(CONTENT_DIR, `${year}.json`);
  if (!fs.existsSync(jsonPath)) {
    process.stdout.write(
      `  ⏭  [${index}/${total}] ${year}: no content JSON — run generate first\n`,
    );
    return "skip";
  }

  const imgPath = path.join(IMAGE_DIR, `${year}.png`);
  if (!targetYear && fs.existsSync(imgPath)) {
    process.stdout.write(`  ⏭  [${index}/${total}] ${year} (image exists)\n`);
    return "skip";
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as Record<
    string,
    unknown
  >;
  const prompt = buildPrompt(year, data);

  try {
    process.stdout.write(`  ⏳ [${index}/${total}] ${year}: generating...\n`);

    const result = await client.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const url = result.data?.[0]?.url;
    if (!url) throw new Error("No URL returned from DALL-E");

    await downloadFile(url, imgPath);

    // Write imageUrl back to JSON
    const updated = { ...data, imageUrl: `/images/dublin/${year}.png` };
    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), "utf-8");

    process.stdout.write(`  ✅ [${index}/${total}] ${year}: saved\n`);
    return "ok";
  } catch (err) {
    const msg = (err as Error).message ?? "";

    // Content policy rejection — retry with a fully generic architectural scene
    if (
      (msg.includes("content_policy") || msg.includes("safety")) &&
      attempt === 1
    ) {
      process.stdout.write(
        `  ⚠️  [${index}/${total}] ${year}: policy flag — retrying with generic scene...\n`,
      );
      const safeData = {
        ...data,
        key_locations: [
          "O'Connell Street, Dublin — wide Georgian thoroughfare with period architecture",
        ],
      };
      await sleep(2000);
      return processYear(year, index, total, 2);
    }

    process.stdout.write(
      `  ❌ [${index}/${total}] ${year}: ${msg.slice(0, 100)}\n`,
    );
    return "error";
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });

  const toProcess = targetYear
    ? [targetYear]
    : ALL_YEARS.filter((y) => {
        const hasJson = fs.existsSync(path.join(CONTENT_DIR, `${y}.json`));
        const hasImage = fs.existsSync(path.join(IMAGE_DIR, `${y}.png`));
        return hasJson && !hasImage;
      });

  if (toProcess.length === 0) {
    console.log(`\n🖼  All images already generated.`);
    console.log(`   Use --year=XXXX to regenerate a specific year.`);
    return;
  }

  // DALL-E 3 standard: $0.04/image
  const cost = (toProcess.length * 0.04).toFixed(2);

  console.log(`\n🖼  Dublin Chronicle — Image Generator (1916–1926)`);
  console.log(`   Years     : ${toProcess.join(", ")}`);
  console.log(`   Est. cost : ~$${cost} USD`);
  console.log(`   Style     : Edwardian/early Irish press photograph`);
  console.log(`   Output    : ${IMAGE_DIR}\n`);

  let ok = 0,
    skipped = 0,
    errors = 0;
  const errorYears: number[] = [];

  for (let i = 0; i < toProcess.length; i++) {
    const year = toProcess[i];
    const result = await processYear(year, i + 1, toProcess.length);

    if (result === "ok") ok++;
    if (result === "skip") skipped++;
    if (result === "error") {
      errors++;
      errorYears.push(year);
    }

    if (i < toProcess.length - 1) await sleep(PAUSE_MS);
  }

  console.log(`\n─────────────────────────────────────────────────────`);
  console.log(`✅ Generated : ${ok}`);
  console.log(`⏭  Skipped   : ${skipped}`);
  console.log(
    `❌ Errors     : ${errors}${errors > 0 ? "  →  years: " + errorYears.join(", ") : ""}`,
  );

  if (errorYears.length > 0) {
    console.log(`\nRetry:`);
    errorYears.forEach((y) =>
      console.log(`  npx tsx scripts/generate-images.ts --year=${y}`),
    );
  }

  console.log(`\nNext: npm run build`);
}

main().catch(console.error);
