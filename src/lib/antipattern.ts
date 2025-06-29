// Firebase 직접 접근 유틸리티
import { adminDb } from "@/shared/config/firebase-admin";
import { Antipattern } from "@/shared/types";
import { Query, DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";

/**
 * 프로덕션 환경인지 확인하는 유틸리티 함수
 */
const isProductionEnvironment = process.env.NODE_ENV === "production";

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
    const isProduction = isProductionEnvironment;

    if (isProduction) {
      // 조회수 업데이트는 백그라운드에서 처리
      antipatternRef
        .update({
          viewCount: (data?.viewCount || 0) + 1,
          lastViewed: new Date().toISOString(),
        })
        .catch(console.error);
    }

    return {
      ...data,
      id: doc.id,
      viewCount: isProduction ? (data?.viewCount || 0) + 1 : data?.viewCount || 0,
    } as Antipattern;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("안티패턴 조회 중 오류가 발생했습니다.");
  }
}

/**
 * 안티패턴 목록을 가져오는 함수 (커서 기반 페이지네이션)
 * @param limit - 페이지당 항목 수
 * @param cursor - 다음 페이지를 가져오기 위한 커서 (마지막 문서의 ID)
 * @param tags - 필터링할 태그 배열
 * @returns 안티패턴 목록과 페이지네이션 정보
 */
export async function getAntipatterns(limit: number = 10, cursor?: string, tags: string[] = []) {
  try {
    // 유효성 검사
    if (limit < 1 || limit > 100) {
      throw new Error("한 번에 가져올 개수는 1~100 사이여야 합니다.");
    }

    // Firebase에서 안티패턴 조회
    const antipatternsRef = adminDb.collection("antipatterns");

    // 태그 필터링이 있는 경우
    let query: Query<DocumentData> = antipatternsRef;
    if (tags.length > 0) {
      // 태그 배열에 포함된 문서들만 필터링
      query = query.where("tags", "array-contains-any", tags);
    }

    // updatedAt 기준 내림차순 정렬 (복합 색인 활용)
    query = query.orderBy("updatedAt", "desc");

    // 커서가 있는 경우 해당 문서부터 시작
    if (cursor) {
      try {
        const cursorDoc = await antipatternsRef.doc(cursor).get();
        if (cursorDoc.exists) {
          query = query.startAfter(cursorDoc);
        }
      } catch (error) {
        console.error("Cursor error:", error);
        // 커서가 유효하지 않은 경우 처음부터 시작
      }
    }

    // limit + 1개를 가져와서 다음 페이지가 있는지 확인
    const snapshot = await query.limit(limit + 1).get();
    const docs = snapshot.docs;

    // 다음 페이지 존재 여부 확인
    const hasNextPage = docs.length > limit;
    const antipatterns = docs.slice(0, limit).map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
      };
    }) as Antipattern[];

    // 다음 페이지 커서 생성 (마지막 문서의 ID)
    const nextCursor = hasNextPage ? antipatterns[antipatterns.length - 1]?.id : null;

    return {
      success: true,
      antipatterns: antipatterns,
      pagination: {
        hasNextPage,
        nextCursor,
        limit,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      antipatterns: [],
      pagination: {
        hasNextPage: false,
        nextCursor: null,
        limit: 10,
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
    const isProduction = isProductionEnvironment;

    if (isProduction) {
      // 조회수 업데이트는 백그라운드에서 처리
      const antipatternRef = adminDb.collection("antipatterns").doc(doc.id);
      antipatternRef
        .update({
          viewCount: (data?.viewCount || 0) + 1,
          lastViewed: new Date().toISOString(),
        })
        .catch(console.error);
    }

    return {
      ...data,
      id: doc.id,
      viewCount: isProduction ? (data?.viewCount || 0) + 1 : data?.viewCount || 0,
    } as Antipattern;
  } catch (error) {
    console.error("Error:", error);

    // 인덱스 오류는 개발 단계에서 해결하도록 바로 throw
    if (error instanceof Error && error.message.includes("index-not-found")) {
      throw new Error("인덱스가 설정되지 않았습니다. 개발자에게 문의하세요.");
    }

    throw new Error("최신 안티패턴 조회 중 오류가 발생했습니다.");
  }
}

/**
 * 모든 안티패턴에서 사용되는 태그 목록을 가져오는 함수
 * @returns 고유한 태그 배열
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const antipatternsRef = adminDb.collection("antipatterns");
    const snapshot = await antipatternsRef.get();

    const allTags = new Set<string>();

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => allTags.add(tag));
      }
    });

    const tags = Array.from(allTags).sort();

    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}
