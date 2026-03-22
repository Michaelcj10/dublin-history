// ── components/PeriodAd.tsx ───────────────────────────────────────────────────
// Displays a real scanned period advertisement image.
// Images live at: public/images/ads/{decade}-{n}.png
// e.g. public/images/ads/1920s-1.png, 1990s-3.png
// If no images exist for the decade, renders nothing.
// Index is randomised client-side to avoid hydration mismatch.

import { useEffect, useState } from "react";

interface Props {
  year: number;
  adImages: string[]; // filtered to this year's decade, passed from getStaticProps
}

export default function PeriodAd({ year, adImages }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!adImages.length) return;
    const pick = adImages[Math.floor(Math.random() * adImages.length)];
    setSrc(pick);
  }, [year, adImages]);

  if (!adImages.length || !src) return null;

  return (
    <div
      style={{
        border: "3px double #1a1208",
        background: "#e8dfc8",
        marginTop: 12,
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "#1a1208",
          color: "#f0e8d0",
          padding: "4px 8px",
          fontSize: 7,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "Georgia,serif",
        }}
      >
        Advertisement
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Period advertisement"
        style={{
          width: "100%",
          display: "block",
          filter: "sepia(0.2) contrast(1.05)",
        }}
      />
    </div>
  );
}
