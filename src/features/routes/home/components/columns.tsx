import React, { useTransition } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { useQueryStates, parseAsString } from "nuqs";

import { toggleTodoStatus } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SortButton } from "@/components/ui/sort-button";

export type TodoColumn = {
  id: number;
  done: boolean;
  title: string;
  priority: "low" | "medium" | "high";
};

type Props = {
  onEdit: (todo: TodoColumn) => void;
  onDelete: (todo: TodoColumn) => void;
};

function ColumnHeader({ label, sortKey }: { label: string; sortKey: string }): React.ReactNode {
  const [{ sort, order }, setSort] = useQueryStates(
    {
      sort: parseAsString.withDefault("id"),
      order: parseAsString.withDefault("asc"),
    },
    { shallow: false },
  );

  return (
    <SortButton
      label={label}
      columnKey={sortKey}
      currentSort={sort}
      currentOrder={order as "asc" | "desc"}
      onSort={(key, order) => {
        setSort({
          sort: key,
          order,
        });
      }}
    />
  );
}

function StatusCheckboxCell({ row }: { row: { original: TodoColumn } }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Checkbox
      checked={row.original.done}
      disabled={isPending}
      onCheckedChange={() => {
        startTransition(async () => {
          await toggleTodoStatus(row.original.id);
        });
      }}
    />
  );
}

export const createColumns = ({ onEdit, onDelete }: Props): ColumnDef<TodoColumn>[] => [
  {
    accessorKey: "id",
    header: () => {
      return <ColumnHeader label="ID" sortKey="id" />;
    },
  },
  {
    accessorKey: "done",
    header: () => {
      return <ColumnHeader label="ステータス" sortKey="done" />;
    },
    cell: (props) => {
      return <StatusCheckboxCell row={props.row} />;
    },
  },
  {
    accessorKey: "priority",
    header: () => {
      return <ColumnHeader label="プライオリティ" sortKey="priority" />;
    },
    cell: (props) => {
      switch (props.row.original.priority) {
        case "low":
          return <span>低</span>;
        case "medium":
          return <span>中</span>;
        case "high":
          return <span>高</span>;
      }
    },
  },
  {
    accessorKey: "title",
    header: () => {
      return <ColumnHeader label="タスク名" sortKey="title" />;
    },
  },
  {
    accessorKey: "actions",
    header: "アクション",
    cell: (props) => {
      return (
        <>
          <Button variant="ghost" onClick={() => onEdit(props.row.original)}>
            編集
          </Button>

          <Button variant="link" className="text-red-600" onClick={() => onDelete(props.row.original)}>
            削除
          </Button>
        </>
      );
    },
  },
];
