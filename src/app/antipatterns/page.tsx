import { Antipattern } from "@/shared/types";
import { ArticlePreview } from "@/components/ArticlePreview";
import { AntiPatternPagination } from "@/components/Antipatterns";
import { getAntipatterns } from "@/shared/api";

interface SearchParams {
  page?: string;
  limit?: string;
}

export default async function AntipatternsPage({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");

  const { antipatterns, pagination } = await getAntipatterns(page, limit);

  return (
    <div className="h-[calc(100vh-380px)]">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <AntiPatternPagination
          currentPage={pagination?.currentPage || 1}
          totalPages={pagination?.totalPages || 1}
          hasNextPage={pagination?.hasNextPage || false}
          hasPrevPage={pagination?.hasPrevPage || false}
        />
      </div>
      <div className="h-full overflow-y-auto overflow-x-hidden flex flex-col gap-12">
        {antipatterns?.map((antipattern: Antipattern, index: number) => (
          <ArticlePreview key={antipattern.id} antipattern={antipattern} index={index} />
        ))}
      </div>
    </div>
  );
}
