import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";

import type { Todo } from "../model/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  disabled?: boolean;
}

/** Presentational only — no data fetching. All actions are delegated up to features. */
export function TodoItem({
  todo,
  onToggle,
  onDelete,
  disabled,
}: TodoItemProps) {
  return (
    <li className="flex items-center justify-between gap-3 border-b border-neutral-100 py-3 last:border-none">
      <label className="flex flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={todo.isDone}
          disabled={disabled}
          onChange={() => onToggle(todo)}
          className="size-4 rounded border-neutral-300"
        />
        <span
          className={cn(
            "text-sm text-neutral-900",
            todo.isDone && "text-neutral-400 line-through",
          )}
        >
          {todo.title}
        </span>
      </label>
      <Button
        variant="ghost"
        size="sm"
        disabled={disabled}
        onClick={() => onDelete(todo)}
      >
        Delete
      </Button>
    </li>
  );
}
