import PostCard from "@/widgets/PostCard";
import { PostCardSkeleton } from "@/widgets";
import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import { Suspense } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import ErrorComponent from "./error";

export async function getLatestAntipattern(): Promise<Antipattern | null> {
  try {
    const [doc] = await adminDb
      .collection("antipatterns")
      .orderBy("updatedAt", "desc")
      .limit(1)
      .get()
      .then((s) => s.docs);

    if (!doc) return null;

    const result = JSON.parse(JSON.stringify(doc.data()));

    return result;
  } catch (err: any) {
    // 인덱스 오류는 개발 단계에서 해결하도록 바로 throw
    if (err?.code === 9 /* FAILED_PRECONDITION */) {
      throw err;
    }
    console.error("getLatestAntipattern failed:", err);
    throw new Error("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
  }
}

// 데이터를 페칭하는 별도 컴포넌트
async function AntipatternContent() {
  const latestAntipattern = await getLatestAntipattern();

  if (!latestAntipattern) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">표시할 안티패턴이 없습니다.</p>
      </div>
    );
  }

  return <PostCard key={latestAntipattern.id} antipattern={latestAntipattern} />;
}

export default function Home() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-full mx-auto">
        <h1 className="text-left mb-12 text-hero">{`Today's Antipattern`}</h1>

        {/* 안티패턴 목록 */}
        <div className="h-[calc(100vh-280px)]">
          <Suspense fallback={<PostCardSkeleton />}>
            <AntipatternContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
