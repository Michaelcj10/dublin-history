import { GetServerSideProps } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dublinchronicle.ie";

const ALL_YEARS = Array.from({ length: 85 }, (_, i) => 1916 + i);
const TODAY = new Date().toISOString().split("T")[0];

function buildSitemap(): string {
  const urls: string[] = [
    // Homepage
    `  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>`,
    // Year pages
    ...ALL_YEARS.map(
      (year) => `  <url>
    <loc>${BASE_URL}/${year}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
}

export default function SitemapXml() {
  // Render nothing — response is written in getServerSideProps
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate",
  );
  res.write(buildSitemap());
  res.end();
  return { props: {} };
};
