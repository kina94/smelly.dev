import { MetadataRoute } from "next";
import { getAntipatterns } from "@/lib/antipattern";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://smelly.dev";

  // 정적 페이지들
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/antipatterns`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
  ];

  try {
    // 모든 안티패턴 가져오기 (페이지네이션 없이)
    const { antipatterns } = await getAntipatterns(1, 1000); // 충분히 큰 수로 설정

    const antipatternPages =
      antipatterns?.map((antipattern) => ({
        url: `${baseUrl}/antipatterns/${antipattern.id}`,
        lastModified: antipattern.updatedAt || new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })) || [];

    return [...staticPages, ...antipatternPages];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticPages;
  }
}
