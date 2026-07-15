import { NextResponse } from "next/server";

import { mockTodos, requireAuth } from "@/shared/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  if (!requireAuth(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { isDone } = (await request.json()) as { isDone?: boolean };

  const todo = mockTodos.find((item) => item.id === id);
  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  todo.isDone = Boolean(isDone);
  return NextResponse.json(todo);
}

export async function DELETE(request: Request, { params }: RouteParams) {
  if (!requireAuth(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const index = mockTodos.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  mockTodos.splice(index, 1);
  return new NextResponse(null, { status: 204 });
}
