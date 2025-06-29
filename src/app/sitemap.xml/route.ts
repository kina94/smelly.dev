
import { getAntipatterns } from "@/lib/antipattern";

export async function GET() {
  const baseUrl = "https://smelly-dev.vercel.app";

  const staticUrls = [
    `${baseUrl}/`,
    `${baseUrl}/antipatterns`,
  ];

  const result = await getAntipatterns(100, '1', []) // 비동기 호출 가능

  const dynamicUrls = result.antipatterns?.map((item) => {
    return `${baseUrl}/antipatterns/${item.id}`;
  }) || [];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticUrls, ...dynamicUrls].map((url) => `
      <url>
        <loc>${url}</loc>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`).join("")}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}