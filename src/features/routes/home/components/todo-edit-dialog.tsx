"use client";

import * as React from "react";

import TodoEditForm from "./todo-edit-form";

import type { TodoColumn } from "./columns";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  todo: TodoColumn;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditTodoDialog({ todo, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Todoを編集</DialogTitle>
        </DialogHeader>
        <TodoEditForm todo={todo} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
}
