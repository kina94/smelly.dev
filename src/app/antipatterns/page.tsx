import { Antipattern } from "@/shared/types";
import { ArticlePreview } from "@/components/ArticlePreview";
import { AntiPatternPagination, AntiPatternSkeleton } from "@/components/Antipatterns";
import { getAntipatterns } from "@/lib/antipattern";

interface SearchParams {
  page?: string;
}

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
