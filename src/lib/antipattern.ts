// Firebase 직접 접근 유틸리티
import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import { serializeFirebaseData } from "@/utils/firebase";

/**
 * 단일 안티패턴을 가져오는 함수 (성능 최적화)
 * @param id - 안티패턴 ID
 * @returns 안티패턴 데이터
 */
export async function getAntipattern(id: string): Promise<Antipattern> {
  try {
    const antipatternRef = adminDb.collection("antipatterns").doc(id);
    const doc = await antipatternRef.get();

    if (!doc.exists) {
      throw new Error("해당 안티패턴을 찾을 수 없습니다.");
    }

    const data = doc.data();

    // 조회수 업데이트는 백그라운드에서 처리 (성능 향상)
    antipatternRef
      .update({
        viewCount: (data?.viewCount || 0) + 1,
        lastViewed: new Date(),
      })
      .catch(console.error); // 에러가 발생해도 메인 로직에 영향 없음

    // Firebase 데이터를 직렬화 가능한 형태로 변환
    return serializeFirebaseData({
      ...data,
      id: doc.id,
      viewCount: (data?.viewCount || 0) + 1, // 클라이언트에는 즉시 반영
    } as Antipattern);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("안티패턴 조회 중 오류가 발생했습니다.");
  }
}

/**
 * 안티패턴 목록을 가져오는 함수
 * @param page - 페이지 번호
 * @param limit - 페이지당 항목 수
 * @returns 안티패턴 목록과 페이지네이션 정보
 */
export async function getAntipatterns(page: number = 1, limit: number = 10) {
  try {
    // 유효성 검사
    if (page < 1) {
      throw new Error("페이지 번호는 1 이상이어야 합니다.");
    }

    if (limit < 1 || limit > 100) {
      throw new Error("한 번에 가져올 개수는 1~100 사이여야 합니다.");
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
    } catch {
      // 정렬 실패 시 모든 문서 조회 후 클라이언트에서 정렬
      snapshot = await antipatternsRef.offset(offset).limit(limit).get();
    }

    const antipatterns = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
      };
    });

    // Firebase 데이터를 직렬화 가능한 형태로 변환
    const serializedAntipatterns = serializeFirebaseData(antipatterns) as Antipattern[];

    return {
      success: true,
      antipatterns: serializedAntipatterns,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      antipatterns: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

/**
 * 최신 안티패턴을 가져오는 함수
 * @returns 최신 안티패턴 데이터
 */
export async function getLatestAntipattern(): Promise<Antipattern | null> {
  try {
    const [doc] = await adminDb
      .collection("antipatterns")
      .orderBy("updatedAt", "desc")
      .limit(1)
      .get()
      .then((s) => s.docs);

    if (!doc) {
      return null;
    }

    const data = doc.data();

    // Firebase 데이터를 직렬화 가능한 형태로 변환
    return serializeFirebaseData({
      ...data,
      id: doc.id,
    } as Antipattern);
  } catch (error) {
    console.error("Error:", error);

    // 인덱스 오류는 개발 단계에서 해결하도록 바로 throw
    if (error instanceof Error && error.message.includes("index-not-found")) {
      throw new Error("인덱스가 설정되지 않았습니다. 개발자에게 문의하세요.");
    }

    throw new Error("최신 안티패턴 조회 중 오류가 발생했습니다.");
  }
}
