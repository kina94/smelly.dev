"use client";

import { useSearchParams } from "next/navigation";
import { getVisiblePages } from "@/utils/etc";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/Pagination";

interface AntipatternPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export default function AntipatternPagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: AntipatternPaginationProps) {
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href={hasPrevPage ? createPageURL(currentPage - 1) : "#"}
            className={!hasPrevPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* 첫 페이지와 ellipsis */}
        {visiblePages[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink href={createPageURL(1)}>1</PaginationLink>
            </PaginationItem>
            {visiblePages[0] > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* 페이지 번호들 */}
        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={createPageURL(page)} isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 마지막 페이지와 ellipsis */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href={createPageURL(totalPages)}>{totalPages}</PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext
            href={hasNextPage ? createPageURL(currentPage + 1) : "#"}
            className={!hasNextPage ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
