// Firebase 직접 접근 유틸리티
import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import { serializeFirebaseData } from "@/utils/firebase";

/**
 * 단일 안티패턴을 가져오는 함수
 * @param id - 안티패턴 ID
 * @returns 안티패턴 데이터
 */
export async function getAntipattern(id: string): Promise<Antipattern> {
  try {
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
      } as Antipattern;
    });

    // Firebase 데이터를 직렬화 가능한 형태로 변환
    return serializeFirebaseData(result);
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
      console.log("updatedAt 필드로 정렬하여 페이지네이션 적용 성공");
    } catch (sortError) {
      console.log("updatedAt 필드 정렬 실패, 정렬 없이 페이지네이션 적용:", sortError);
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
