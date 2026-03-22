// ── components/PeriodAd.tsx (replace entire file) ────────────────────────────
import { useEffect, useState } from "react";

interface Props {
  year: number;
  adImages: string[];
}

export default function PeriodAd({ year, adImages }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!adImages.length) return;
    setSrc(adImages[Math.floor(Math.random() * adImages.length)]);
  }, [year, adImages]);

  if (!adImages.length || !src) return null;

  return (
    <div
      style={{
        marginTop: 0,
        marginBottom: 12,
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Period advertisement"
        style={{
          width: "100%",
          display: "block",
          filter: "sepia(0.15) contrast(1.04)",
        }}
      />
    </div>
  );
}
