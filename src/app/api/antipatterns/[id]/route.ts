import { NextResponse } from "next/server";
import { adminDb } from "@/shared/config/firebase-admin";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID가 필요합니다." }, { status: 400 });
    }

    const antipatternRef = adminDb.collection("antipatterns").doc(id);

    // 트랜잭션을 사용하여 조회수를 안전하게 증가시키고 데이터를 가져옴
    const result = await adminDb.runTransaction(async (transaction) => {
      const doc = await transaction.get(antipatternRef);

      if (!doc.exists) {
        throw new Error("해당 안티패턴을 찾을 수 없습니다.");
      }

      const data = doc.data();
      const currentViewCount = data?.viewCount || 0;
      const newViewCount = currentViewCount + 1;

      // 조회수 증가
      transaction.update(antipatternRef, {
        viewCount: newViewCount,
        lastViewed: new Date(),
      });

      return {
        ...data,
        id: doc.id,
        viewCount: newViewCount,
      };
    });

    // Firebase 데이터를 직렬화 가능한 형태로 변환
    const antipatternData = JSON.parse(JSON.stringify(result));

    return NextResponse.json({
      success: true,
      antipattern: antipatternData,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "안티패턴 조회 중 오류가 발생했습니다.",
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
