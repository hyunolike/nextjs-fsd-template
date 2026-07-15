import { NextResponse } from "next/server";

import { fakeJwt } from "@/shared/server";

const REFRESH_COOKIE = "refresh-token";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const refreshToken = cookieHeader
    .split("; ")
    .find((entry) => entry.startsWith(`${REFRESH_COOKIE}=`))
    ?.split("=")[1];

  const payload = fakeJwt.verify(refreshToken);
  if (!payload) {
    return NextResponse.json(
      { message: "Refresh token expired" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    accessToken: fakeJwt.issueAccessToken(payload.sub),
  });
}
