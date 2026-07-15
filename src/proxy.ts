import { NextResponse, type NextRequest } from "next/server";

const REFRESH_COOKIE = "refresh-token";
const PROTECTED_PATHS = ["/todos"];

export function proxy(request: NextRequest) {
  const isProtected = PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  if (isProtected && !request.cookies.has(REFRESH_COOKIE)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todos/:path*"],
};
