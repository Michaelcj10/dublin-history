import { useRouter } from "next/router";
import Head from "next/head";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Edition Not Found — The Dublin Chronicle</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Playfair+Display:wght@400;700;900&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#1a1208;color:#f0e8d0;font-family:'IM Fell English','Times New Roman',Georgia,serif;min-height:100vh;display:flex;align-items:center;justify-content:center}
        `}</style>
      </Head>

      <div
        style={{
          textAlign: "center",
          padding: "60px 40px",
          maxWidth: 560,
        }}
      >
        {/* Masthead rule */}
        <div style={{ borderTop: "4px double #b0a080", marginBottom: 24 }} />

        <p
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 10,
            letterSpacing: 4,
            color: "#8a7050",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          The Dublin Chronicle
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display',serif",
            fontWeight: 900,
            fontSize: 72,
            lineHeight: 1,
            color: "#b0a080",
            marginBottom: 6,
          }}
        >
          404
        </h1>

        <p
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 20,
            fontStyle: "italic",
            color: "#c0b090",
            marginBottom: 20,
          }}
        >
          This Edition Could Not Be Found
        </p>

        <div style={{ borderBottom: "2px solid #3a2810", marginBottom: 20 }} />

        <p
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 12,
            lineHeight: 1.8,
            color: "#8a7050",
            marginBottom: 24,
          }}
        >
          The Chronicle covers Dublin from 1916 to 1926 only. The edition you
          seek lies outside our archive, or never existed.
        </p>

        {/* Year buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 6,
            marginBottom: 28,
          }}
        >
          {Array.from({ length: 11 }, (_, i) => 1916 + i).map((y) => (
            <button
              key={y}
              onClick={() => router.push(`/${y}`)}
              style={{
                background: "none",
                border: "1px solid #3a2810",
                color: "#8a7050",
                width: 48,
                height: 30,
                cursor: "pointer",
                fontFamily: "Georgia,serif",
                fontSize: 11,
                transition: "all .15s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = "#b0a080";
                (e.target as HTMLButtonElement).style.color = "#1a1208";
                (e.target as HTMLButtonElement).style.borderColor = "#b0a080";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = "none";
                (e.target as HTMLButtonElement).style.color = "#8a7050";
                (e.target as HTMLButtonElement).style.borderColor = "#3a2810";
              }}
            >
              {y}
            </button>
          ))}
        </div>

        <div style={{ borderTop: "4px double #b0a080" }} />
      </div>
    </>
  );
}
