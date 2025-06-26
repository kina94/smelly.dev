import { Article, ArticleSkeleton } from "@/components/Article";
import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import { Suspense } from "react";

export async function getLatestAntipattern(): Promise<Antipattern | null> {
  try {
    const [doc] = await adminDb
      .collection("antipatterns")
      .orderBy("updatedAt", "desc")
      .limit(1)
      .get()
      .then((s) => s.docs);

    if (!doc) return null;

    const data = doc.data();
    // Firebase 데이터를 직렬화 가능한 형태로 변환
    const result = JSON.parse(
      JSON.stringify({
        ...data,
        id: doc.id,
      }),
    );

    return result;
  } catch (err: unknown) {
    // 인덱스 오류는 개발 단계에서 해결하도록 바로 throw
    if (err instanceof Error && err.message.includes("index-not-found")) {
      throw err;
    }
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
    <div className="h-[calc(100vh-280px)]">
      <Suspense fallback={<ArticleSkeleton />}>
        <Article antipattern={latestAntipattern} />
      </Suspense>
    </div>
  );
}
