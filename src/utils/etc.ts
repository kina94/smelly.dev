import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(LocalizedFormat);

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

export function formatDate(date: string): string {
  if (!date) return "";
  return dayjs(date).tz("Asia/Seoul").format("LL");
}
