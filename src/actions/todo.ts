"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import prisma from "@/lib/prisma";

export async function createTodo(formData: FormData) {
  const title = formData.get("title");

  try {
    const priority = z
      .union([z.literal("LOW"), z.literal("MEDIUM"), z.literal("HIGH")])
      .parse(String(formData.get("priority")).toUpperCase());

    // データベース処理を直接実行
    await prisma.todo.create({
      data: {
        title: String(title),
        priority,
      },
    });

    // パスを再検証してUIを更新
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    console.log(message);
    return { success: false, error: message };
  }
}

export async function updateTodo(id: number, formData: FormData) {
  const title = formData.get("title");

  try {
    const priority = z
      .union([z.literal("LOW"), z.literal("MEDIUM"), z.literal("HIGH")])
      .parse(String(formData.get("priority")).toUpperCase());

    // データベース処理を直接実行
    await prisma.todo.update({
      where: { id },
      data: {
        title: String(title),
        priority,
      },
    });

    // パスを再検証してUIを更新
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return { success: false, error: message };
  }
}

export async function toggleTodoStatus(id: number) {
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) {
      return { success: false, error: "Todo not found" };
    }

    await prisma.todo.update({
      where: { id },
      data: {
        done: !todo.done,
      },
    });

    // パスを再検証してUIを更新
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return { success: false, error: message };
  }
}

export async function deleteTodo(id: number) {
  try {
    console.log("deleteTodo", id);

    await prisma.todo.delete({ where: { id } });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    return { success: false, error: message };
  }
}
