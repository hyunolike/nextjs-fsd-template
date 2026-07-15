import { NextResponse } from "next/server";

import { fakeJwt, mockUsers } from "@/shared/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const payload = fakeJwt.verify(authHeader?.replace("Bearer ", ""));
  if (!payload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = mockUsers.find((candidate) => candidate.id === payload.sub);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ id: user.id, email: user.email, name: user.name });
}
