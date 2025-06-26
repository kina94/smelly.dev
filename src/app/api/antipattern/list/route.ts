import { NextResponse } from "next/server";
import { adminDb } from "@/shared/config/firebase-admin";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // 유효성 검사
    if (page < 1) {
      return NextResponse.json({ success: false, error: "페이지 번호는 1 이상이어야 합니다." }, { status: 400 });
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { success: false, error: "한 번에 가져올 개수는 1~100 사이여야 합니다." },
        { status: 400 },
      );
    }

    // Firebase에서 안티패턴 조회
    const antipatternsRef = adminDb.collection("antipatterns");

    // 전체 문서 수 조회
    const totalSnapshot = await antipatternsRef.get();
    const totalCount = totalSnapshot.size;

    // 페이지네이션 계산
    const offset = (page - 1) * limit;
    const totalPages = Math.ceil(totalCount / limit);

    let snapshot;
    try {
      // updatedAt 필드로 정렬하여 페이지네이션 적용
      snapshot = await antipatternsRef.orderBy("updatedAt", "desc").offset(offset).limit(limit).get();
      console.log("updatedAt 필드로 정렬하여 페이지네이션 적용 성공");
    } catch (sortError) {
      console.log("updatedAt 필드 정렬 실패, 정렬 없이 페이지네이션 적용:", sortError);
      // 정렬 실패 시 모든 문서 조회 후 클라이언트에서 정렬
      snapshot = await antipatternsRef.offset(offset).limit(limit).get();
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
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "안티패턴 조회 중 오류가 발생했습니다.", errorMessage: error },
      { status: 500 },
    );
  }
}
