import { httpClient } from "@/shared/api";

import type { Todo } from "../model/types";

export const todoApi = {
  async list(): Promise<Todo[]> {
    const { data } = await httpClient.get<Todo[]>("/todos");
    return data;
  },
  async create(title: string): Promise<Todo> {
    const { data } = await httpClient.post<Todo>("/todos", { title });
    return data;
  },
  async toggle(id: string, isDone: boolean): Promise<Todo> {
    const { data } = await httpClient.patch<Todo>(`/todos/${id}`, { isDone });
    return data;
  },
  async remove(id: string): Promise<void> {
    await httpClient.delete(`/todos/${id}`);
  },
};
