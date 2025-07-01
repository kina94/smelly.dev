import { getAntipatterns } from "@/lib/antipattern";

export async function GET() {
  const baseUrl = "https://smelly-dev.vercel.app";

  const staticUrls = [`${baseUrl}/`, `${baseUrl}/antipatterns`];

  const result = await getAntipatterns(100, "1", []); // 첫 번째 페이지부터 가져오기

  const dynamicUrls =
    result.antipatterns?.map((item) => {
      return {
        url: `${baseUrl}/antipatterns/${item.id}`,
        lastmod: item.updatedAt,
      };
    }) || [];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls
      .map(
        (url) => `
      <url>
        <loc>${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${url.endsWith("/") ? "1.0" : "0.9"}</priority>
      </url>`,
      )
      .join("")}
    ${dynamicUrls
      .map(
        (item) => `
      <url>
        <loc>${item.url}</loc>
        <lastmod>${item.lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`,
      )
      .join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
