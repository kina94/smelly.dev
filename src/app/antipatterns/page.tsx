import { Antipattern } from "@/shared/types";
import { ArticlePreview } from "@/components/ArticlePreview";
import { AntiPatternPagination } from "@/components/Antipatterns";
import { getAntipatterns } from "@/lib/antipattern";
import type { Metadata } from "next";

interface SearchParams {
  page?: string;
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
  const limit = 10;

  const { antipatterns, pagination } = await getAntipatterns(page, limit);

  return (
    <div>
      {antipatterns?.map((antipattern: Antipattern, index: number) => {
        const globalIndex = pagination.totalCount - (page - 1) * limit - index;
        return <ArticlePreview key={antipattern.id} antipattern={antipattern} index={globalIndex} />;
      })}
      <div className="pt-10">
        <AntiPatternPagination
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          hasNextPage={pagination?.hasNextPage || false}
          hasPrevPage={pagination?.hasPrevPage || false}
        />
      </div>
    </div>
  );
}
