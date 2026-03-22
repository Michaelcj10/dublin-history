import fs from "fs";
import path from "path";

function yearToDecade(year: number): string {
  if (year < 1920) return "1910s";
  if (year < 1930) return "1920s";
  if (year < 1940) return "1930s";
  if (year < 1950) return "1940s";
  if (year < 1960) return "1950s";
  if (year < 1970) return "1960s";
  if (year < 1980) return "1970s";
  if (year < 1990) return "1980s";
  return "1990s";
}

export function getAdImages(year: number): string[] {
  const decade = yearToDecade(year);
  const dir = path.join(process.cwd(), "public", "images", "dublin", "ads");

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);
  return files
    .filter((f) => f.startsWith(`${decade}-`) && f.endsWith(".png"))
    .map((f) => `/images/dublin/ads/${f}`)
    .sort(); // deterministic order; client picks randomly
}
