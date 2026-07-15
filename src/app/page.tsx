import Link from "next/link";

import { Button, Card } from "@/shared/ui";

/**
 * A React Server Component by default — no "use client" needed here.
 * Interactive areas (the login form, the todo board) opt into the client
 * boundary themselves, at the feature/widget level, which keeps this page
 * shipping zero extra client JS of its own.
 */
export default function HomePage() {
  return (
    <Card className="w-full max-w-xl text-center">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Next.js FSD Template
      </h1>
      <p className="mt-2 text-sm text-neutral-500">
        Next.js App Router + Feature-Sliced Design, wired up with TanStack
        Query, Zustand, React Hook Form + Zod, and an axios client with
        automatic token refresh.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link href="/todos">Try the demo</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </Card>
  );
}
