import { Antipattern } from "@/shared/types";
import { ArticlePreview } from "@/components/ArticlePreview";
import { AntiPatternPagination } from "@/components/Antipatterns";
import { getAntipatterns } from "@/lib/antipattern";

interface SearchParams {
  page?: string;
  limit?: string;
}

export default async function AntipatternsPage({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "10");

  const { antipatterns, pagination } = await getAntipatterns(page, limit);

  return (
    <div>
      {antipatterns?.map((antipattern: Antipattern, index: number) => (
        <ArticlePreview key={antipattern.id} antipattern={antipattern} index={antipatterns.length - index} />
      ))}
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
