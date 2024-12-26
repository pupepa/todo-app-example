import * as React from "react";

import { useForm } from "react-hook-form";

import { TodoColumn } from "./columns";

import { updateTodo } from "@/actions/todo";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormValues {
  title: string;
  priority: "low" | "medium" | "high";
}

type Props = {
  todo: TodoColumn;
  onOpenChange: (open: boolean) => void;
};

export default function TodoEditForm({ todo, onOpenChange }: Props) {
  const form = useForm<FormValues>({
    defaultValues: {
      title: todo?.title || "",
      priority: todo?.priority || "low",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!todo) return;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("priority", data.priority);

    const result = await updateTodo(todo.id, formData);
    if (result.success) {
      onOpenChange(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>タイトル</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
          <Button type="submit">更新</Button>
        </div>
      </form>
    </Form>
  );
}
