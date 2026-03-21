// GAAScoreboard — period newspaper-style scoreboard for GAA All-Ireland Finals
// Parses "X-XX to X-XX" score format into goals + points
// Displays as a classic manual scoreboard with goals/points breakdown

import React from "react";

interface Final {
  championship: string;
  winner: string;
  runner_up: string;
  score?: string;
}

interface Props {
  finals: Final[];
  year: number;
}

// ── Score parser ──────────────────────────────────────────────────────────────
// Handles formats: "1-5 to 0-4", "2-7 to 1-3", "0-5 to 0-4"
interface ParsedScore {
  goals: number;
  points: number;
  total: number;
}

function parseScore(score: string): [ParsedScore, ParsedScore] | null {
  const m = score.match(/(\d+)-(\d+)\s+to\s+(\d+)-(\d+)/i);
  if (!m) return null;
  const w: ParsedScore = {
    goals: parseInt(m[1]),
    points: parseInt(m[2]),
    total: parseInt(m[1]) * 3 + parseInt(m[2]),
  };
  const l: ParsedScore = {
    goals: parseInt(m[3]),
    points: parseInt(m[4]),
    total: parseInt(m[3]) * 3 + parseInt(m[4]),
  };
  return [w, l];
}

function sportLabel(championship: string): string {
  if (/football/i.test(championship)) return "Football";
  if (/hurling/i.test(championship)) return "Hurling";
  if (/camogie/i.test(championship)) return "Camogie";
  return championship
    .replace("All-Ireland Senior ", "")
    .replace(" Championship Final", "");
}

// ── Score digit ───────────────────────────────────────────────────────────────
function ScoreDigit({
  value,
  size = 42,
  modern = false,
}: {
  value: string;
  size?: number;
  modern?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size * 0.72,
        height: size * 1.1,
        background: modern ? "#f0ede4" : "#2a1e0a",
        border: modern ? "1px solid #b8b0a0" : "1px solid #6a5030",
        margin: "0 1px",
        boxShadow: modern
          ? "inset 0 1px 2px rgba(0,0,0,.08)"
          : "inset 0 2px 4px rgba(0,0,0,.6), inset 0 -1px 2px rgba(255,255,255,.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 1,
          background: modern ? "rgba(0,0,0,.1)" : "rgba(0,0,0,.6)",
          zIndex: 2,
        }}
      />
      <span
        style={{
          fontFamily: "'Libre Baskerville','Playfair Display', Georgia, serif",
          fontSize: size,
          fontWeight: 700,
          color: modern ? "#1a1208" : "#fff8e8",
          lineHeight: 1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

function ScoreDisplay({
  parsed,
  size = 42,
  modern = false,
}: {
  parsed: ParsedScore;
  size?: number;
  modern?: boolean;
}) {
  const g = String(parsed.goals);
  const p = String(parsed.points).padStart(2, "0");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      <ScoreDigit value={g} size={size} modern={modern} />
      <div
        style={{
          fontFamily: "'Libre Baskerville','Playfair Display',Georgia,serif",
          fontSize: size * 0.6,
          fontWeight: 700,
          color: modern ? "#5a4020" : "#d0b870",
          padding: "0 1px",
          lineHeight: 1,
        }}
      >
        -
      </div>
      <ScoreDigit value={p[0]} size={size} modern={modern} />
      <ScoreDigit value={p[1]} size={size} modern={modern} />
    </div>
  );
}

// ── Single scoreboard ─────────────────────────────────────────────────────────
function Scoreboard({ final, year }: { final: Final; year: number }) {
  const parsed = final.score ? parseScore(final.score) : null;
  const wScore = parsed?.[0] ?? null;
  const lScore = parsed?.[1] ?? null;
  const sport = sportLabel(final.championship);
  const modern = year >= 1930 && year <= 1940;

  return (
    <div
      style={{
        background: modern ? "#f5f3ee" : "#181008",
        border: modern ? "1px solid #b8b0a0" : "3px solid #6a5030",
        boxShadow: modern ? "none" : "4px 4px 0 #0a0604",
        marginBottom: 14,
        fontFamily: "Georgia,'Times New Roman',serif",
      }}
    >
      {/* Header board */}
      <div
        style={{
          background: modern ? "#1a1208" : "#251a08",
          borderBottom: modern ? "1px solid #3a2e1a" : "2px solid #6a5030",
          padding: "7px 14px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: modern ? 2 : 3,
            color: modern ? "#f0e8d0" : "#d0b870",
            fontFamily: modern
              ? "'Libre Baskerville',Georgia,serif"
              : "Georgia,serif",
          }}
        >
          All-Ireland Final · {sport}
        </div>
        <div
          style={{
            fontSize: 9,
            color: modern ? "#c8b890" : "#a08850",
            fontFamily: "monospace",
            letterSpacing: 1,
          }}
        >
          Croke Park · {year}
        </div>
      </div>

      {/* Scoreboard body */}
      <div style={{ padding: "12px 14px" }}>
        {/* Winner row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 4,
          }}
        >
          {/* Team name */}
          <div style={{ flex: 1, paddingRight: 10 }}>
            <div
              style={{
                fontFamily: modern
                  ? "'Libre Baskerville',Georgia,serif"
                  : "'Playfair Display',Georgia,serif",
                fontSize: "clamp(15px,2.2vw,21px)",
                fontWeight: 700,
                color: modern ? "#1a1208" : "#fff8e8",
                lineHeight: 1.1,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {final.winner}
            </div>
            <div
              style={{
                fontSize: 9,
                color: modern ? "#5a4020" : "#d0b870",
                marginTop: 3,
                fontFamily: "Georgia,serif",
                letterSpacing: 2,
              }}
            >
              WINNERS
            </div>
          </div>

          {/* Score display */}
          {wScore ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <ScoreDisplay parsed={wScore} size={38} modern={modern} />
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  fontSize: 9,
                  color: modern ? "#5a4020" : "#c0a060",
                  fontFamily: "monospace",
                }}
              >
                <span>
                  {wScore.goals}G&nbsp;×&nbsp;3&nbsp;=&nbsp;{wScore.goals * 3}
                </span>
                <span style={{ color: modern ? "#8a7850" : "#7a6040" }}>+</span>
                <span>{wScore.points}P</span>
                <span style={{ color: modern ? "#8a7850" : "#7a6040" }}>=</span>
                <span
                  style={{
                    color: modern ? "#3a2810" : "#d0b870",
                    fontWeight: 700,
                  }}
                >
                  {wScore.total} pts
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                color: modern ? "#5a4020" : "#d0b870",
              }}
            >
              —
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: modern ? "#c8bfa0" : "#6a5030",
            margin: "10px 0",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              background: modern ? "#f5f3ee" : "#181008",
              padding: "0 12px",
              fontFamily: "Georgia,serif",
              fontSize: 10,
              color: modern ? "#8a7850" : "#a08850",
              letterSpacing: 3,
            }}
          >
            VS
          </div>
        </div>

        {/* Runner-up row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1, paddingRight: 10 }}>
            <div
              style={{
                fontFamily: modern
                  ? "'Libre Baskerville',Georgia,serif"
                  : "'Playfair Display',Georgia,serif",
                fontSize: "clamp(15px,2.2vw,21px)",
                fontWeight: 700,
                color: modern ? "#3a2e1a" : "#c0a870",
                lineHeight: 1.1,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {final.runner_up}
            </div>
            <div
              style={{
                fontSize: 9,
                color: modern ? "#8a7850" : "#907040",
                marginTop: 3,
                fontFamily: "Georgia,serif",
                letterSpacing: 2,
              }}
            >
              RUNNERS-UP
            </div>
          </div>

          {lScore ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 4,
              }}
            >
              <ScoreDisplay parsed={lScore} size={38} modern={modern} />
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  fontSize: 9,
                  color: modern ? "#8a7850" : "#907040",
                  fontFamily: "monospace",
                }}
              >
                <span>
                  {lScore.goals}G&nbsp;×&nbsp;3&nbsp;=&nbsp;{lScore.goals * 3}
                </span>
                <span style={{ color: modern ? "#a09060" : "#5a4020" }}>+</span>
                <span>{lScore.points}P</span>
                <span style={{ color: modern ? "#a09060" : "#5a4020" }}>=</span>
                <span
                  style={{
                    color: modern ? "#5a4828" : "#a08850",
                    fontWeight: 700,
                  }}
                >
                  {lScore.total} pts
                </span>
              </div>
            </div>
          ) : (
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 22,
                color: modern ? "#8a7850" : "#907040",
              }}
            >
              —
            </div>
          )}
        </div>

        {/* Margin of victory */}
        {wScore && lScore && (
          <div
            style={{
              marginTop: 12,
              paddingTop: 10,
              borderTop: modern ? "1px solid #c8bfa0" : "1px solid #4a3820",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: modern ? "#8a7850" : "#907040",
                fontFamily: "monospace",
                letterSpacing: 2,
              }}
            >
              MARGIN OF VICTORY
            </div>
            <div
              style={{
                fontFamily: modern
                  ? "'Libre Baskerville',serif"
                  : "'Playfair Display',serif",
                fontWeight: 700,
                fontSize: 15,
                color: modern ? "#3a2810" : "#d0b870",
              }}
            >
              {wScore.total - lScore.total}{" "}
              {wScore.total - lScore.total === 1 ? "point" : "points"}
            </div>
          </div>
        )}
      </div>

      {/* Footer — scoring guide */}
      <div
        style={{
          background: modern ? "#ece9e0" : "#0e0a04",
          borderTop: modern ? "1px solid #c8bfa0" : "1px solid #4a3820",
          padding: "6px 14px",
          display: "flex",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {[{ label: "Goal (G) = 3 pts" }, { label: "Point (P) = 1 pt" }].map(
          (r, i) => (
            <div
              key={i}
              style={{
                fontSize: 9,
                fontFamily: "monospace",
                color: modern ? "#7a6840" : "#907040",
                letterSpacing: 1,
              }}
            >
              {r.label}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function GAAScoreboard({ finals, year }: Props) {
  if (!finals || finals.length === 0) return null;

  return (
    <div>
      {finals.map((final, i) => (
        <Scoreboard key={i} final={final} year={year} />
      ))}
    </div>
  );
}
