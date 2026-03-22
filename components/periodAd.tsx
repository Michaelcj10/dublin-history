import { Props } from "next/script";

export default function PeriodAd({ src }: Props) {
  if (!src) return null;

  return (
    <div
      style={{
        marginTop: 0,
        marginBottom: 12,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Period advertisement"
        style={{
          width: "100%",
          display: "block",
          filter: "sepia(0.35) contrast(1.08) brightness(0.86) saturate(0.6)",
        }}
      />
      {/* Grain + vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E"),
            radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)
          `,
          backgroundSize: "200px 200px, 100% 100%",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
