"use client";

import * as React from "react";

import { useForm } from "react-hook-form";

import { createTodo } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormValues {
  title: string;
  priority: "low" | "medium" | "high";
}

type Props = {
  onOpenChange: (open: boolean) => void;
};

export default function TodoRegisterForm({ onOpenChange }: Props) {
  const form = useForm<FormValues>({ defaultValues: { title: "", priority: "medium" } });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("priority", data.priority);

    const result = await createTodo(formData);

    if (result.success) {
      onOpenChange(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>タスク名</FormLabel>
              <FormControl>
                <Input type="text" placeholder="タスク名を入力" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>優先順位</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="優先順位" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">低</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="high">高</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="mt-4 flex justify-between">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button type="submit">作成</Button>
        </div>
      </form>
    </Form>
  );
}
