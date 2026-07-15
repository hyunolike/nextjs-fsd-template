import { fakeJwt } from "./fake-jwt";

export function requireAuth(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  const payload = fakeJwt.verify(authHeader?.replace("Bearer ", ""));
  return payload?.sub ?? null;
}
