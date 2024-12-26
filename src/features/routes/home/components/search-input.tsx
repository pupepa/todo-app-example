"use client";

import { useEffect, useState } from "react";
import React from "react";

import { useQueryStates } from "nuqs";
import { parseAsString } from "nuqs";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchInput() {
  const [{ search }, setSearch] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    },
  );

  const [value, setValue] = useState(search);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (debouncedValue !== search) {
      setSearch({ search: debouncedValue });
    }
  }, [debouncedValue, setSearch, search]);

  return (
    <Input
      placeholder="タスク名で検索..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full"
    />
  );
}
