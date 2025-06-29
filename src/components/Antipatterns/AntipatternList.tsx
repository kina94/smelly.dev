import { AntiPatternPagination } from "@/components/Antipatterns";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getAntipatterns } from "@/lib/antipattern";
import { Antipattern } from "@/shared/types";

export default async function List({ page }: { page: number }) {
  const limit = 10;
  const { antipatterns, pagination } = await getAntipatterns(page, limit);

  return (
    <>
      {antipatterns?.map((antipattern: Antipattern, index: number) => {
        const globalIndex = pagination.totalCount - (page - 1) * limit - index;
        return <ArticlePreview key={antipattern.id} antipattern={antipattern} index={globalIndex} />;
      })}
      <div className="pt-3">
        <AntiPatternPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
        />
      </div>
    </>
  );
}
