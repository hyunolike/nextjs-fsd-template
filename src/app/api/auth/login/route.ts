import { NextResponse } from "next/server";

import { fakeJwt, mockUsers } from "@/shared/server";

const REFRESH_COOKIE = "refresh-token";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const user = mockUsers.find((candidate) => candidate.email === email);
  if (!user || user.password !== password) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const accessToken = fakeJwt.issueAccessToken(user.id);
  const refreshToken = fakeJwt.issueRefreshToken(user.id);

  const response = NextResponse.json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });

  response.cookies.set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
