import { cn } from "@/shared/lib";

import type { User } from "../model/types";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserAvatar({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white",
        className,
      )}
      title={user.name}
    >
      {initialsOf(user.name)}
    </div>
  );
}
