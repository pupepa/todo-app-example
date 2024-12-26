"use client";

import * as React from "react";
import { useState } from "react";

import TodoRegisterForm from "./todo-register-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function TodoRegisterDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>新規作成</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規作成</DialogTitle>
          <DialogDescription>Todoを新規作成します。</DialogDescription>
        </DialogHeader>
        <TodoRegisterForm onOpenChange={(open) => setOpen(open)} />
      </DialogContent>
    </Dialog>
  );
}
