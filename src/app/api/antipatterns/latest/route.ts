import { NextResponse } from "next/server";
import { adminDb } from "@/shared/config/firebase-admin";

export async function GET() {
  try {
    const [doc] = await adminDb
      .collection("antipatterns")
      .orderBy("updatedAt", "desc")
      .limit(1)
      .get()
      .then((s) => s.docs);

    if (!doc) {
      return NextResponse.json({
        success: true,
        antipattern: null,
      });
    }

    const data = doc.data();

    // Firebase 데이터를 직렬화 가능한 형태로 변환
    const antipatternData = JSON.parse(
      JSON.stringify({
        ...data,
        id: doc.id,
      }),
    );

    return NextResponse.json({
      success: true,
      antipattern: antipatternData,
    });
  } catch (error) {
    console.error("Error:", error);

    // 인덱스 오류는 개발 단계에서 해결하도록 바로 throw
    if (error instanceof Error && error.message.includes("index-not-found")) {
      return NextResponse.json(
        { success: false, error: "인덱스가 설정되지 않았습니다. 개발자에게 문의하세요." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: false, error: "최신 안티패턴 조회 중 오류가 발생했습니다.", errorMessage: error },
      { status: 500 },
    );
  }
}
