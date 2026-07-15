import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/shared/config";

import { todoApi } from "./todo-api";

export function useTodosQuery(enabled = true) {
  return useQuery({
    queryKey: QUERY_KEYS.todos,
    queryFn: todoApi.list,
    enabled,
  });
}
