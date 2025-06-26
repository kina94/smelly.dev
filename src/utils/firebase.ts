/**
 * Firebase 데이터를 직렬화 가능한 형태로 변환합니다.
 * Next.js Server Component에서 Client Component로 전달할 때 사용합니다.
 * @param data - 직렬화할 데이터
 * @returns 직렬화된 데이터
 */
export function serializeFirebaseData<T>(data: T): T {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Firebase 데이터 직렬화 중 오류:", error);
    throw new Error("데이터 직렬화에 실패했습니다.");
  }
}
