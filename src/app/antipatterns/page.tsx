import type { Metadata } from "next";
import { Suspense } from "react";
import ArticlePreviewSkeleton from "@/components/Antipatterns/Skeleton";
import { AntipatternList, TagFilter } from "@/components/Antipatterns";

interface SearchParams {
  cursor?: string;
  tags?: string;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const tags = searchParams.tags ? searchParams.tags.split(",").filter(Boolean) : [];

  if (tags.length > 0) {
    return {
      title: `${tags.join(", ")} 태그 안티패턴 목록`,
      description: `${tags.join(", ")} 태그와 관련된 프론트엔드 개발 안티패턴들을 모아놓은 목록입니다.`,
      keywords: ["안티패턴", "목록", "프론트엔드", "React", "Vue", "Angular", "JavaScript", "TypeScript", ...tags],
      openGraph: {
        title: `${tags.join(", ")} 태그 안티패턴 목록`,
        description: `${tags.join(", ")} 태그와 관련된 프론트엔드 개발 안티패턴들을 모아놓은 목록입니다.`,
        url: `https://smelly.dev/antipatterns?tags=${tags.join(",")}`,
      },
      twitter: {
        title: `${tags.join(", ")} 태그 안티패턴 목록`,
        description: `${tags.join(", ")} 태그와 관련된 프론트엔드 개발 안티패턴들을 모아놓은 목록입니다.`,
      },
    };
  }

  return {
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
}

export default async function AntipatternsPage({ searchParams }: { searchParams: SearchParams }) {
  const cursor = searchParams.cursor;
  const tags = searchParams.tags ? searchParams.tags.split(",").filter(Boolean) : [];

  return (
    <div>
      <TagFilter selectedTags={tags} />
      <Suspense key={`${cursor || "first"}-${tags.join(",")}`} fallback={<ArticlePreviewSkeleton />}>
        <AntipatternList cursor={cursor} tags={tags} />
      </Suspense>
    </div>
  );
}
