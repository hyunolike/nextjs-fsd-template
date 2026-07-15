import { useEffect } from "react";

import { tokenStorage } from "@/shared/lib";

import { useSessionStore } from "./session-store";

/**
 * Resolves the initial auth status once on app boot: if an access token is
 * already in storage we optimistically mark the session authenticated (the
 * axios refresh interceptor will silently correct this on the first 401).
 */
export function useBootstrapSession() {
  const status = useSessionStore((state) => state.status);

  useEffect(() => {
    if (status !== "idle") return;
    const hasToken = Boolean(tokenStorage.get());
    useSessionStore.setState({
      status: hasToken ? "authenticated" : "unauthenticated",
    });
  }, [status]);
}
