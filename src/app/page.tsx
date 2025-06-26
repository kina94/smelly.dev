import { Article, ArticleSkeleton } from "@/components/Article";
import { ErrorMessage } from "@/widgets";
import { getLatestAntipattern } from "@/lib/antipattern";
import { Suspense } from "react";

export default async function Home() {
  const latestAntipattern = await getLatestAntipattern();

  if (!latestAntipattern) {
    return <ErrorMessage message="표시할 안티패턴이 없습니다." />;
  }

  return (
    <>
      <Suspense fallback={<ArticleSkeleton />}>
        <Article antipattern={latestAntipattern} />
      </Suspense>
    </>
  );
}
