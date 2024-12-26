"use client";

import * as React from "react";

import { useQueryStates } from "nuqs";
import { parseAsInteger } from "nuqs";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PER_PAGE_OPTIONS = [10, 20, 50];

export function PerPageSelect() {
  const [{ perPage }, setPerPage] = useQueryStates(
    {
      perPage: parseAsInteger.withDefault(10),
      page: parseAsInteger.withDefault(1),
    },
    {
      shallow: false,
    },
  );

  return (
    <div className="flex items-center gap-2">
      <span>表示件数</span>
      <Select
        value={perPage.toString()}
        onValueChange={(value) => {
          setPerPage({
            perPage: parseInt(value),
            page: 1, // ページ数を変更したら1ページ目に戻る
          });
        }}
      >
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PER_PAGE_OPTIONS.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}件
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
