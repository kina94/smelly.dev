import { AntiPatternPagination } from "@/components/Antipatterns";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getAntipatterns } from "@/lib/antipattern";
import { Antipattern } from "@/shared/types";

export default async function List({ cursor, tags }: { cursor?: string; tags: string[] }) {
  const limit = 10;
  const { antipatterns, pagination } = await getAntipatterns(limit, cursor, tags);

  return (
    <>
      {antipatterns?.map((antipattern: Antipattern, index: number) => {
        return <ArticlePreview key={antipattern.id} antipattern={antipattern} index={index + 1} />;
      })}
      <div className="pt-3">
        <AntiPatternPagination
          hasNextPage={pagination.hasNextPage}
          nextCursor={pagination.nextCursor || null}
          currentCursor={cursor}
        />
      </div>
    </>
  );
}
