import { create } from "zustand";

import { tokenStorage } from "@/shared/lib";

export type SessionStatus = "idle" | "authenticated" | "unauthenticated";

interface SessionState {
  status: SessionStatus;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

/**
 * Tracks *whether* the visitor is authenticated. It intentionally does not
 * hold the `User` object — that belongs to `entities/user`, fetched with
 * TanStack Query and enabled only once `status === "authenticated"`.
 * Keeping these concerns apart avoids entities coupling to one another.
 */
export const useSessionStore = create<SessionState>((set) => ({
  status: "idle",
  signIn: (accessToken) => {
    tokenStorage.set(accessToken);
    set({ status: "authenticated" });
  },
  signOut: () => {
    tokenStorage.clear();
    set({ status: "unauthenticated" });
  },
}));
