import { Article, ArticleSkeleton } from "@/components/Article";
import { Antipattern } from "@/shared/types";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import { Suspense } from "react";

export async function getLatestAntipattern(): Promise<Antipattern | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/antipatterns/latest`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("최신 안티패턴을 가져오는데 실패했습니다.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "최신 안티패턴을 가져오는데 실패했습니다.");
    }

    return data.antipattern;
  } catch (err: unknown) {
    console.error("getLatestAntipattern failed:", err as Error);
    throw new Error("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
  }
}

export default async function Home() {
  const latestAntipattern = await getLatestAntipattern();

  if (!latestAntipattern) {
    return <ErrorMessage message="표시할 안티패턴이 없습니다." />;
  }

  return (
    <div className="h-[calc(100vh-330px)]">
      <Suspense fallback={<ArticleSkeleton />}>
        <Article antipattern={latestAntipattern} />
      </Suspense>
    </div>
  );
}
