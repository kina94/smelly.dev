import { AntiPatternPagination } from "@/components/Antipatterns";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getAntipatterns } from "@/lib/antipattern";
import { Antipattern } from "@/shared/types";

export default async function List({ cursor, tags }: { cursor?: string; tags: string[] }) {
  const limit = 10;
  const result = await getAntipatterns(limit, cursor, tags);

  return (
    <>
      {!cursor && (
        <div className="pt-4 bg-muted rounded-lg">
          <p className="text-muted-foreground dark:text-[#EEEEEE] text-captionMedium">
            총 <span className="font-semibold text-foreground dark:text-[#EEEEEE]">{result.pagination.totalCount}</span>
            개의 안티패턴이 검색되었습니다.
          </p>
        </div>
      )}

      {result.antipatterns?.map((antipattern: Antipattern) => {
        return <ArticlePreview key={antipattern.id} antipattern={antipattern} />;
      })}
      <div className="pt-3">
        <AntiPatternPagination
          hasNextPage={result.pagination.hasNextPage}
          nextCursor={result.pagination.nextCursor || null}
          currentCursor={cursor}
        />
      </div>
    </>
  );
}
