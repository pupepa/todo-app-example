"use client";

import * as React from "react";

import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

type SortButtonProps = {
  label: string;
  columnKey: string;
  currentSort: string;
  currentOrder: "asc" | "desc";
  onSort: (key: string, order: "asc" | "desc") => void;
};

export function SortButton({ label, columnKey, currentSort, currentOrder, onSort }: SortButtonProps) {
  const isSorted = currentSort === columnKey;

  return (
    <Button
      className="p-0"
      variant="ghost"
      onClick={() => {
        onSort(columnKey, isSorted && currentOrder === "asc" ? "desc" : "asc");
      }}
    >
      {label}
      {isSorted ? (
        currentOrder === "asc" ? (
          <ArrowUp className="size-4" />
        ) : (
          <ArrowDown className="size-4" />
        )
      ) : (
        <ArrowUpDown className="size-4" />
      )}
    </Button>
  );
}
