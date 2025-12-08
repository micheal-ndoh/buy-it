"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  sortQuery?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  searchQuery,
  sortQuery,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    // Preserve search and sort queries
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    if (sortQuery && sortQuery !== "newest") {
      params.set("sort", sortQuery);
    }

    return `/products?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-12 flex justify-center">
      <nav aria-label="Pagination" className="flex items-center gap-2">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-border-light dark:hover:bg-border-dark transition-colors"
            aria-label="Previous page"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-secondary dark:text-text-dark-secondary cursor-not-allowed">
            <span className="material-symbols-outlined">chevron_left</span>
          </span>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`dots-${index}`}
                className="inline-flex items-center justify-center size-10 text-text-light-primary dark:text-text-dark-primary"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={createPageUrl(pageNum)}
              className={`inline-flex items-center justify-center size-10 rounded-lg font-medium transition-colors ${
                isCurrentPage
                  ? "text-white bg-primary"
                  : "text-text-light-primary dark:text-text-dark-primary hover:bg-border-light dark:hover:bg-border-dark"
              }`}
              aria-label={`Page ${pageNum}`}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {pageNum}
            </Link>
          );
        })}

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-border-light dark:hover:bg-border-dark transition-colors"
            aria-label="Next page"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
        ) : (
          <span className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-secondary dark:text-text-dark-secondary cursor-not-allowed">
            <span className="material-symbols-outlined">chevron_right</span>
          </span>
        )}
      </nav>
    </div>
  );
}
