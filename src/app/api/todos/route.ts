import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { mockTodos, requireAuth } from "@/shared/server";

export async function GET(request: Request) {
  if (!requireAuth(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(mockTodos);
}

export async function POST(request: Request) {
  if (!requireAuth(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { title } = (await request.json()) as { title?: string };
  if (!title?.trim()) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

  const todo = {
    id: randomUUID(),
    title: title.trim(),
    isDone: false,
    createdAt: new Date().toISOString(),
  };
  mockTodos.unshift(todo);

  return NextResponse.json(todo, { status: 201 });
}
