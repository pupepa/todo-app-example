"use client";

import * as React from "react";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryStates } from "nuqs";
import { parseAsInteger } from "nuqs";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
  displayPages?: number;
}

export default function Pagination({ totalPages, displayPages = 5 }: PaginationProps) {
  const [{ page }, setPage] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false,
    },
  );

  const getPageNumbers = () => {
    const half = Math.floor(displayPages / 2);
    let start = Math.max(page - half, 1);
    const end = Math.min(start + displayPages - 1, totalPages);

    if (end - start + 1 < displayPages) {
      start = Math.max(end - displayPages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Button variant="outline" size="icon" onClick={() => setPage({ page: 1 })} disabled={page === 1}>
        <ChevronFirst className="size-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => setPage({ page: page - 1 })} disabled={page === 1}>
        <ChevronLeft className="size-4" />
      </Button>

      {getPageNumbers().map((pageNum) => (
        <Button
          key={pageNum}
          variant={pageNum === page ? "default" : "outline"}
          onClick={() => pageNum !== page && setPage({ page: pageNum })}
          className="min-w-9"
        >
          {pageNum}
        </Button>
      ))}

      <Button variant="outline" size="icon" onClick={() => setPage({ page: page + 1 })} disabled={page === totalPages}>
        <ChevronRight className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setPage({ page: totalPages })}
        disabled={page === totalPages}
      >
        <ChevronLast className="size-4" />
      </Button>
    </div>
  );
}
