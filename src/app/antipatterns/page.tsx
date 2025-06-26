import { Antipattern } from "@/shared/types";
import { ArticlePreview } from "@/components/ArticlePreview";
import { AntiPatternPagination } from "@/components/Antipatterns";

interface SearchParams {
  page?: string;
  limit?: string;
}

async function getAntipatterns(page: number = 1, limit: number = 10) {
  console.log("call");
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/antipatterns?page=${page}&limit=${limit}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch antipatterns");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching antipatterns:", error);
    return {
      success: false,
      antipatterns: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
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
