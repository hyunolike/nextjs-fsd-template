import { NextResponse } from "next/server";

const REFRESH_COOKIE = "refresh-token";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}
