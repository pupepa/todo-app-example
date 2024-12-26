import React from "react";

import type { Todo } from "@prisma/client";
import type { SearchParams } from "nuqs/server";

import { Label } from "@/components/ui/label";
import Pagination from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/features/common/components/footer";
import { TodoColumn } from "@/features/routes/home/components/columns";
import { DataTable } from "@/features/routes/home/components/data-table";
import { PerPageSelect } from "@/features/routes/home/components/per-page-select";
import SearchInput from "@/features/routes/home/components/search-input";
import TodoRegisterDialog from "@/features/routes/home/components/todo-register-dialog";
import { searchParamsCache } from "@/features/routes/home/search-params";
import prisma from "@/lib/prisma";

//const ITEMS_PER_PAGE = 10;
const PER_PAGE_OPTIONS = [5, 10, 20, 50] as const;

async function getTodos({
  search,
  sort,
  order,
  skip,
  take,
}: {
  search: string;
  sort: string;
  order: "asc" | "desc";
  skip?: number;
  take?: number;
}): Promise<Todo[]> {
  return await prisma.todo.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      [sort]: order,
    },
    skip,
    take,
  });
}

async function getTodosCount({ search }: { search: string }): Promise<number> {
  return await prisma.todo.count({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
}

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const sort = searchParamsCache.parse(await searchParams).sort ?? "id";
  const order = (searchParamsCache.parse(await searchParams).order ?? "asc") as "asc" | "desc";
  const search = searchParamsCache.parse(await searchParams).search ?? "";
  const page = searchParamsCache.parse(await searchParams).page ?? 1;
  const perPage = searchParamsCache.parse(await searchParams).perPage ?? 10;

  const totalTodos = await getTodosCount({ search });
  const totalPages = Math.ceil(totalTodos / perPage);

  const todos = await getTodos({ search, sort, order, skip: (page - 1) * perPage, take: perPage });
  const data: TodoColumn[] = todos.map((todo) => {
    const priority = todo.priority === "LOW" ? "low" : todo.priority === "MEDIUM" ? "medium" : "high";

    return {
      id: todo.id,
      done: todo.done,
      title: todo.title,
      priority,
    };
  });

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <TodoRegisterDialog />

        <SearchInput />

        <div className="container mx-auto">
          <div className="mx-4 mb-2 flex items-center gap-4">
            <Label className="ml-auto">{`${perPage * (page - 1) + 1} - ${Math.min(perPage * page, totalTodos)} / ${totalTodos}`}</Label>

            <div className="flex items-center gap-2">
              <PerPageSelect />
            </div>
          </div>
          <DataTable data={data} />

          <section className="py-4">
            <Pagination totalPages={totalPages} displayPages={5} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
