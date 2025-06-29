import type { Metadata } from "next";
import { Suspense } from "react";
import ArticlePreviewSkeleton from "@/components/Antipatterns/Skeleton";
import { AntipatternList, TagFilter } from "@/components/Antipatterns";
import { getAllTags } from "@/lib/antipattern";

interface SearchParams {
  page?: string;
  tags?: string;
}

export const metadata: Metadata = {
  title: "안티패턴 목록",
  description: "프론트엔드 개발에서 자주 발생하는 안티패턴들을 모아놓은 목록입니다.",
  keywords: ["안티패턴", "목록", "프론트엔드", "React", "Vue", "Angular", "JavaScript", "TypeScript"],
  openGraph: {
    title: "안티패턴 목록",
    description: "프론트엔드 개발에서 자주 발생하는 안티패턴들을 모아놓은 목록입니다.",
    url: "https://smelly.dev/antipatterns",
  },
  twitter: {
    title: "안티패턴 목록",
    description: "프론트엔드 개발에서 자주 발생하는 안티패턴들을 모아놓은 목록입니다.",
  },
};

export default async function AntipatternsPage({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page || "1");
  const tags = searchParams.tags ? searchParams.tags.split(",").filter(Boolean) : [];

  // 사용 가능한 모든 태그 가져오기
  const availableTags = await getAllTags();

  return (
    <div>
      <TagFilter availableTags={availableTags} selectedTags={tags} />
      <Suspense key={`${page}-${tags.join(",")}`} fallback={<ArticlePreviewSkeleton />}>
        <AntipatternList page={page} tags={tags} />
      </Suspense>
    </div>
  );
}
