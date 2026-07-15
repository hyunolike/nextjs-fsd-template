"use client";

import { Card, Spinner } from "@/shared/ui";
import { TodoItem, useTodosQuery } from "@/entities/todo";
import { CreateTodoForm } from "@/features/todos/create";
import { useDeleteTodoMutation } from "@/features/todos/delete";
import { useToggleTodoMutation } from "@/features/todos/toggle";

/**
 * Composes one entity (todo) with three features (create/toggle/delete).
 * This is the layer where cross-feature composition is meant to happen —
 * features never import each other directly.
 */
export function TodoBoard() {
  const todosQuery = useTodosQuery();
  const toggleTodoMutation = useToggleTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  return (
    <Card className="w-full max-w-lg">
      <h1 className="mb-4 text-lg font-semibold text-neutral-900">Todos</h1>

      <CreateTodoForm />

      <div className="mt-4">
        {todosQuery.isPending && (
          <div className="flex justify-center py-8 text-neutral-400">
            <Spinner />
          </div>
        )}

        {todosQuery.isError && (
          <p className="py-4 text-sm text-red-600">Couldn&apos;t load todos.</p>
        )}

        {todosQuery.data && todosQuery.data.length === 0 && (
          <p className="py-4 text-sm text-neutral-500">
            No todos yet — add your first one above.
          </p>
        )}

        {todosQuery.data && todosQuery.data.length > 0 && (
          <ul>
            {todosQuery.data.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(item) => toggleTodoMutation.mutate(item)}
                onDelete={(item) => deleteTodoMutation.mutate(item)}
              />
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
