import { AntiPatternPagination } from "@/components/Antipatterns";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getAntipatterns } from "@/lib/antipattern";
import { Antipattern } from "@/shared/types";

export default async function List({ page, tags }: { page: number; tags: string[] }) {
  const limit = 10;
  const { antipatterns, pagination } = await getAntipatterns(page, limit, tags);

  if (antipatterns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          {tags.length > 0 ? (
            <>
              <p className="text-lg font-medium mb-2">
                선택된 태그 &ldquo;{tags.join(", ")}&rdquo;에 해당하는 안티패턴이 없습니다.
              </p>
              <p className="text-sm">다른 태그를 선택하거나 모든 태그를 해제해보세요.</p>
            </>
          ) : (
            <p className="text-lg font-medium">안티패턴이 없습니다.</p>
          )}
        </div>
      </div>
    );
  }

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
