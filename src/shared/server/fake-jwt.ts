import { createHmac, timingSafeEqual } from "node:crypto";

import { env } from "@/shared/config";

/**
 * Minimal HMAC-signed token for the template's mock backend only.
 * It exists purely to make the axios refresh-token flow in
 * `shared/api/http-client.ts` observable end to end. Swap this whole file
 * out for real session/JWT issuance (e.g. your auth provider) in production.
 */
const DEV_SECRET = env.MOCK_AUTH_SECRET;

interface TokenPayload {
  sub: string;
  exp: number;
}

function sign(payload: TokenPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", DEV_SECRET)
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
}

function verify(token: string | undefined | null): TokenPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = createHmac("sha256", DEV_SECRET)
    .update(body)
    .digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const payload = JSON.parse(
    Buffer.from(body, "base64url").toString(),
  ) as TokenPayload;
  if (payload.exp < Date.now()) return null;

  return payload;
}

export const fakeJwt = {
  issueAccessToken(userId: string) {
    return sign({ sub: userId, exp: Date.now() + 45 * 1000 });
  },
  issueRefreshToken(userId: string) {
    return sign({ sub: userId, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  },
  verify,
};
