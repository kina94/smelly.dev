import { AntiPatternPagination } from "@/components/Antipatterns";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getAntipatterns } from "@/lib/antipattern";
import { Antipattern } from "@/shared/types";

export default async function List({ cursor, tags }: { cursor?: string; tags: string[] }) {
  const limit = 10;
  const result = await getAntipatterns(limit, cursor, tags);

  return (
    <>
      {result.antipatterns?.map((antipattern: Antipattern, index: number) => {
        const descendingIndex = result.antipatterns.length - index;
        return <ArticlePreview key={antipattern.id} antipattern={antipattern} index={descendingIndex} />;
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
