"use client";

import * as React from "react";
import { useState } from "react";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { createColumns } from "./columns";
import { EditTodoDialog } from "./todo-edit-dialog";

import type { TodoColumn } from "./columns";

import { deleteTodo } from "@/actions/todo";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function DataTable({ data }: { data: TodoColumn[] }) {
  const [editingTodo, setEditingTodo] = useState<TodoColumn | null>(null);

  const columns = createColumns({
    onEdit: (todo) => setEditingTodo(todo),
    onDelete: async (todo) => {
      await deleteTodo(todo.id);
    },
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editingTodo && (
        <EditTodoDialog
          todo={editingTodo}
          open={!!editingTodo}
          onOpenChange={(open) => {
            if (!open) setEditingTodo(null);
          }}
        />
      )}
    </div>
  );
}
