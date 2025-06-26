import Article from "@/widgets/Article";
import ArticleSkeleton from "@/widgets/ArticleSkeleton";
import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import { Suspense } from "react";
import ErrorMessage from "@/shared/ui/ErrorMessage";
import { Title } from "@/shared/ui";

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
async function AntipatternContent() {
  try {
    const latestAntipattern = await getLatestAntipattern();

    if (!latestAntipattern) {
      return <p className="text-gray-500 text-center">표시할 안티패턴이 없습니다.</p>;
    }

    return <Article antipattern={latestAntipattern} />;
  } catch (e) {
    // Server Component에서 에러 메시지만 전달
    const errorMessage = e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";
    return <ErrorMessage message={errorMessage} />;
  }
}

export default function Home() {
  return (
    <div>
      <Title title={`Today's Antipattern`} />
      {/* 안티패턴 목록 */}
      <div className="h-[calc(100vh-280px)]">
        <Suspense fallback={<ArticleSkeleton />}>
          <AntipatternContent />
        </Suspense>
      </div>
    </div>
  );
}
