import React from "react";

interface DeathNoticesProps {
  year: number;
  notableDubliners: string[];
}

type NoticeType = "death" | "birth" | "notice";

const DEATH_WORDS = [
  "died",
  "executed",
  "execution",
  "killed",
  "death",
  "assassination",
  "shot",
  "martyr",
  "hanged",
  "fell",
];
const BIRTH_WORDS = ["born", "birth", "arrival", "delivered", "baptised"];

function classifyNotice(detail: string): NoticeType {
  const lower = detail.toLowerCase();
  if (DEATH_WORDS.some((w) => lower.includes(w))) return "death";
  if (BIRTH_WORDS.some((w) => lower.includes(w))) return "birth";
  return "notice";
}

function parseName(raw: string): { first: string; last: string; full: string } {
  const full = raw.trim();
  const parts = full.split(/\s+/);
  const last = parts[parts.length - 1] ?? full;
  const first = parts.slice(0, -1).join(" ") || full;
  return { first, last, full };
}

const ORDINALS = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "13th",
  "14th",
  "15th",
  "16th",
  "17th",
  "18th",
  "19th",
  "20th",
  "21st",
  "22nd",
  "23rd",
  "24th",
  "25th",
  "26th",
  "27th",
  "28th",
  "29th",
  "30th",
  "31st",
];
function dayOrd(year: number, offset: number): string {
  const day = ((year + offset * 7) % 28) + 1;
  return ORDINALS[day - 1];
}

function formatDeathNotice(
  name: { first: string; last: string; full: string },
  detail: string,
  year: number,
  i: number,
): string {
  const day = dayOrd(year, i);
  // Extract a role from the detail (first meaningful noun phrase before punctuation)
  const roleMatch = detail.match(/^[^,;\.\—]+(?:,\s*[^,;\.\—]+)?/);
  const role = roleMatch
    ? roleMatch[0].replace(/^(he|she|whose|who|a|an|the)\s+/i, "").trim()
    : detail.slice(0, 60);
  return `On the ${day} inst., most deeply regretted, ${name.full.toUpperCase()}, ${role}. May he rest in peace.`;
}

function formatBirthNotice(
  name: { first: string; last: string; full: string },
  detail: string,
  year: number,
  i: number,
): string {
  const day = dayOrd(year, i);
  return `On the ${day} inst., to the family of ${name.last.toUpperCase()}, a child — ${name.full} — whose ${detail.toLowerCase()}.`;
}

function formatGeneralNotice(
  name: { first: string; last: string; full: string },
  detail: string,
): string {
  return `${name.full.toUpperCase()}. — ${detail}`;
}

export default function DeathNotices({
  year,
  notableDubliners,
}: DeathNoticesProps) {
  if (!notableDubliners.length) return null;

  const notices = notableDubliners.map((entry, i) => {
    const sepIdx = entry.indexOf("—");
    const rawName =
      sepIdx !== -1
        ? entry.slice(0, sepIdx).trim()
        : entry.split(" ").slice(0, 2).join(" ");
    const detail = sepIdx !== -1 ? entry.slice(sepIdx + 1).trim() : entry;
    const type = classifyNotice(detail);
    const name = parseName(rawName);

    let text: string;
    if (type === "death") text = formatDeathNotice(name, detail, year, i);
    else if (type === "birth") text = formatBirthNotice(name, detail, year, i);
    else text = formatGeneralNotice(name, detail);

    return { type, name, text };
  });

  const deaths = notices.filter((n) => n.type === "death");
  const births = notices.filter((n) => n.type === "birth");
  const others = notices.filter((n) => n.type === "notice");

  return (
    <div style={{ marginBottom: 12 }}>
      {/* Section header */}
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
            fontFamily: "Georgia,serif",
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#1a1208",
          }}
        >
          Deaths &amp; Notices
        </span>
      </div>

      {/* Mourning-bordered box */}
      <div
        style={{
          border: "2px solid #1a1208",
          padding: "8px 10px",
          background: "#f5edd8",
        }}
      >
        {deaths.length > 0 && (
          <>
            <div
              style={{
                fontSize: 7,
                textTransform: "uppercase",
                letterSpacing: 3,
                fontFamily: "Georgia,serif",
                color: "#1a1208",
                borderBottom: "1px solid #1a1208",
                paddingBottom: 2,
                marginBottom: 6,
                textAlign: "center",
              }}
            >
              ✝ Deaths
            </div>
            {deaths.map((n, i) => (
              <div
                key={i}
                style={{
                  borderBottom:
                    i < deaths.length - 1 ? "1px solid #c0b090" : "none",
                  marginBottom: 7,
                  paddingBottom: 7,
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    fontFamily: "Georgia,serif",
                    color: "#1a1208",
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  {n.name.last}.
                </div>
                <p
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: 9,
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    color: "#2a1a08",
                    margin: 0,
                  }}
                >
                  {n.text}
                </p>
              </div>
            ))}
          </>
        )}

        {births.length > 0 && (
          <>
            <div
              style={{
                fontSize: 7,
                textTransform: "uppercase",
                letterSpacing: 3,
                fontFamily: "Georgia,serif",
                color: "#1a1208",
                borderBottom: "1px solid #1a1208",
                borderTop: deaths.length > 0 ? "1px solid #1a1208" : "none",
                paddingTop: deaths.length > 0 ? 6 : 0,
                paddingBottom: 2,
                marginBottom: 6,
                textAlign: "center",
              }}
            >
              ✦ Births
            </div>
            {births.map((n, i) => (
              <div
                key={i}
                style={{
                  borderBottom:
                    i < births.length - 1 ? "1px solid #c0b090" : "none",
                  marginBottom: 7,
                  paddingBottom: 7,
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    fontFamily: "Georgia,serif",
                    color: "#1a1208",
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  {n.name.last}.
                </div>
                <p
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: 9,
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    color: "#2a1a08",
                    margin: 0,
                  }}
                >
                  {n.text}
                </p>
              </div>
            ))}
          </>
        )}

        {others.length > 0 && (
          <>
            {(deaths.length > 0 || births.length > 0) && (
              <div
                style={{
                  fontSize: 7,
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  fontFamily: "Georgia,serif",
                  color: "#1a1208",
                  borderTop: "1px solid #1a1208",
                  borderBottom: "1px solid #1a1208",
                  paddingTop: 6,
                  paddingBottom: 2,
                  marginBottom: 6,
                  textAlign: "center",
                }}
              >
                ◆ Notices
              </div>
            )}
            {others.map((n, i) => (
              <div
                key={i}
                style={{
                  borderBottom:
                    i < others.length - 1 ? "1px solid #c0b090" : "none",
                  marginBottom: 7,
                  paddingBottom: 7,
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    fontFamily: "Georgia,serif",
                    color: "#1a1208",
                    fontWeight: 700,
                    marginBottom: 2,
                  }}
                >
                  {n.name.last}.
                </div>
                <p
                  style={{
                    fontFamily: "Georgia,serif",
                    fontSize: 9,
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    color: "#2a1a08",
                    margin: 0,
                  }}
                >
                  {n.text}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
