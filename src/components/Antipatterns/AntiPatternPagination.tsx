"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";

interface AntipatternPaginationProps {
  hasNextPage: boolean;
  nextCursor: string | null;
  currentCursor?: string;
}

export default function AntipatternPagination({ hasNextPage, nextCursor, currentCursor }: AntipatternPaginationProps) {
  const searchParams = useSearchParams();

  const createPageURL = (cursor?: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (cursor) {
      params.set("cursor", cursor);
    } else {
      params.delete("cursor");
    }

    // 페이지 번호 제거
    params.delete("page");

    return `?${params.toString()}`;
  };

  // 이전 페이지로 돌아가기 (브라우저 히스토리 사용)
  const handlePrevious = () => {
    window.history.back();
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
            className={!currentCursor ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext
            href={hasNextPage && nextCursor ? createPageURL(nextCursor) : "#"}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
