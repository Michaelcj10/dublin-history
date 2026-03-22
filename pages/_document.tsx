import { Html, Head, Main, NextScript } from "next/document";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IM+Fell+English:ital@0;1&display=swap";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Full font stylesheet */}
        <link rel="stylesheet" href={FONTS_URL} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
