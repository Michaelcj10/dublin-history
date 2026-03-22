interface Props {
  src: string | null;
}

export default function PeriodAd({ src }: Props) {
  if (!src) return null;

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
