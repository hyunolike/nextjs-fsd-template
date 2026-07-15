import type { ReactNode } from "react";

import { QueryProvider } from "./query-provider";
import { SessionBootstrap } from "./session-bootstrap";

/**
 * Every provider the app needs, composed in one place. Route segments under
 * `src/app` should stay thin and never register providers directly.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <SessionBootstrap>{children}</SessionBootstrap>
    </QueryProvider>
  );
}
