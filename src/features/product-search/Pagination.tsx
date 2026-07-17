import React from "react";

void React;

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < pageCount;

  return (
    <nav className="products-pagination" aria-label="Product pagination">
      <button type="button" disabled={!canGoPrevious} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>

      <span>
        Page {page} of {pageCount}
      </span>

      <button type="button" disabled={!canGoNext} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}
