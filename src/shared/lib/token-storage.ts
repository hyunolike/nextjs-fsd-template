import { ACCESS_TOKEN_STORAGE_KEY } from "@/shared/config";

/**
 * Single source of truth for the access token on the client.
 * Kept in `shared` (not `entities/session`) so the low-level HTTP client
 * can read/write it without an upward FSD dependency.
 */
export const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  },
  set(token: string) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  },
  clear() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  },
};
