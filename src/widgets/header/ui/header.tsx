"use client";

import Link from "next/link";

import { Button, Spinner } from "@/shared/ui";
import { useSessionStore } from "@/entities/session";
import { useCurrentUserQuery, UserAvatar } from "@/entities/user";
import { useLogoutMutation } from "@/features/auth/logout";

export function Header() {
  const status = useSessionStore((state) => state.status);
  const logoutMutation = useLogoutMutation();
  const currentUserQuery = useCurrentUserQuery(status === "authenticated");

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight text-neutral-900"
      >
        FSD Template
      </Link>

      <div className="flex items-center gap-3">
        {status === "idle" && <Spinner className="text-neutral-400" />}

        {status === "unauthenticated" && (
          <Button asChild size="sm" variant="outline">
            <Link href="/login">Sign in</Link>
          </Button>
        )}

        {status === "authenticated" && (
          <>
            {currentUserQuery.data && (
              <UserAvatar user={currentUserQuery.data} />
            )}
            <Button
              size="sm"
              variant="ghost"
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
            >
              Sign out
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
