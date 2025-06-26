import { NextResponse } from "next/server";
import { adminDb } from "@/shared/config/firebase-admin";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID가 필요합니다." }, { status: 400 });
    }

    const antipattern = await adminDb.collection("antipatterns").doc(id).get();

    if (!antipattern.exists) {
      return NextResponse.json({ success: false, error: "해당 안티패턴을 찾을 수 없습니다." }, { status: 404 });
    }

    const data = antipattern.data();

    // Firebase 데이터를 직렬화 가능한 형태로 변환
    const antipatternData = JSON.parse(
      JSON.stringify({
        ...data,
        id: antipattern.id,
      }),
    );

    return NextResponse.json({
      success: true,
      antipattern: antipatternData,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "안티패턴 조회 중 오류가 발생했습니다.", errorMessage: error },
      { status: 500 },
    );
  }
}
