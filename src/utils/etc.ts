import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

// Firebase Timestamp 타입 정의
interface FirebaseTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 문자열의 이스케이프된 개행 문자(\n)를 실제 개행 문자로 변환합니다.
 * @param text - 변환할 문자열
 * @returns 변환된 문자열
 */
export function unescapeNewlines(text: string | null | undefined): string {
  if (!text) return "";
  return text.replace(/\\n/g, "\n");
}

/**
 * Firebase Timestamp 또는 Date 객체를 Date 객체로 변환합니다.
 * @param timestamp - Firebase Timestamp 객체 또는 Date 객체
 * @returns Date 객체
 */
export function toDate(timestamp: FirebaseTimestamp | Date | null | undefined): Date {
  if (!timestamp) {
    return new Date();
  }

  // Firebase Timestamp인지 확인
  if (typeof timestamp === "object" && "_seconds" in timestamp) {
    return new Date(timestamp._seconds * 1000);
  }

  // Date 객체인 경우 그대로 반환
  return timestamp as Date;
}

/**
 * 마크다운 코드 블록의 백틱(```)과 언어명을 제거합니다.
 * @param code - 마크다운 코드 블록 문자열
 * @returns 정리된 코드 문자열
 */
export function stripMarkdownCodeBlock(code: string | null | undefined): string {
  if (!code) return "";

  // 앞뒤 공백 제거
  const trimmed = code.trim();

  // ```로 시작하고, ```로 끝나면
  if (trimmed.startsWith("```") && trimmed.endsWith("```")) {
    // 첫 줄(언어명) 제거, 마지막 줄(닫는 백틱) 제거
    const lines = trimmed.split("\n");
    // 첫 줄: ```javascript 또는 ```ts 등
    // 마지막 줄: ```
    // 중간 줄만 합치기
    return lines.slice(1, -1).join("\n");
  }
  return code;
}

/**
 * 난이도별 뱃지 색상 매핑 함수
 * @param difficulty - 난이도 문자열
 * @returns 뱃지 variant 문자열
 */
export function getDifficultyVariant(difficulty: string): "yellow" | "green" | "pink" {
  switch (difficulty) {
    case "초급":
      return "yellow";
    case "중급":
      return "green";
    case "고급":
      return "pink";
    default:
      return "yellow";
  }
}

/**
 * 페이지네이션에서 표시할 페이지 번호들을 계산합니다.
 * @param currentPage - 현재 페이지
 * @param totalPages - 전체 페이지 수
 * @param maxVisible - 최대 표시할 페이지 수
 * @returns 표시할 페이지 번호 배열
 */
export function getVisiblePages(currentPage: number, totalPages: number, maxVisible: number = 10): number[] {
  const pages = [];

  if (totalPages <= maxVisible) {
    // 전체 페이지가 maxVisible개 이하면 모두 표시
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 현재 페이지를 중심으로 maxVisible개 표시
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
}

export function formatDate(date: FirebaseTimestamp | Date | null | undefined): string {
  if (!date) return "";
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(LocalizedFormat);

  return dayjs.utc(toDate(date)).tz("Asia/Seoul").format("LL");
}
