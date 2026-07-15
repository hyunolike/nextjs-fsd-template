import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";
import { todoApi, type Todo } from "@/entities/todo";

/** Optimistic update: flips the checkbox instantly, rolls back on failure. */
export function useToggleTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: Todo) => todoApi.toggle(todo.id, !todo.isDone),
    onMutate: async (todo) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.todos });
      const previous = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todos);

      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todos, (todos) =>
        todos?.map((item) =>
          item.id === todo.id ? { ...item, isDone: !item.isDone } : item,
        ),
      );

      return { previous };
    },
    onError: (_error, _todo, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEYS.todos, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.todos });
    },
  });
}
