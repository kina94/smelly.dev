import { NextResponse } from "next/server";
import { adminDb } from "@/shared/config/firebase-admin";

export async function GET() {
  try {
    // Firebase에서 최신 안티패턴 조회
    const antipatternsRef = adminDb.collection("antipatterns");

    let snapshot;
    try {
      // createdAt 필드로 정렬 시도
      snapshot = await antipatternsRef.orderBy("createdAt", "desc").limit(10).get();
      console.log("createdAt 필드로 정렬 성공");
    } catch (sortError) {
      console.log("createdAt 필드 정렬 실패, 정렬 없이 조회:", sortError);
      // 정렬 실패 시 모든 문서 조회
      snapshot = await antipatternsRef.limit(10).get();
    }

    console.log("Firebase 조회 결과 - 문서 개수:", snapshot.docs.length);

    const antipatterns = snapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("문서 데이터:", { id: doc.id, ...data });
      return {
        id: doc.id,
        ...data,
      };
    });

    console.log("최종 반환할 안티패턴 개수:", antipatterns.length);

    return NextResponse.json({
      success: true,
      antipatterns,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "안티패턴 조회 중 오류가 발생했습니다." }, { status: 500 });
  }
}
