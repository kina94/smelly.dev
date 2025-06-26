// Shared API utilities
import { Antipattern } from "@/shared/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

/**
 * 단일 안티패턴을 가져오는 함수
 * @param id - 안티패턴 ID
 * @returns 안티패턴 데이터
 */
export async function getAntipattern(id: string): Promise<Antipattern> {
  const response = await fetch(`${BASE_URL}/api/antipatterns/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("안티패턴을 가져오는데 실패했습니다.");
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "안티패턴을 가져오는데 실패했습니다.");
  }

  return data.antipattern;
}

/**
 * 안티패턴 목록을 가져오는 함수
 * @param page - 페이지 번호
 * @param limit - 페이지당 항목 수
 * @returns 안티패턴 목록과 페이지네이션 정보
 */
export async function getAntipatterns(page: number = 1, limit: number = 10) {
  try {
    const response = await fetch(`${BASE_URL}/api/antipatterns?page=${page}&limit=${limit}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch antipatterns");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching antipatterns:", error);
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
    const response = await fetch(`${BASE_URL}/api/antipatterns/latest`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("최신 안티패턴을 가져오는데 실패했습니다.");
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "최신 안티패턴을 가져오는데 실패했습니다.");
    }

    return data.antipattern;
  } catch (err: unknown) {
    console.error("getLatestAntipattern failed:", err as Error);
    throw new Error("데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
  }
}
