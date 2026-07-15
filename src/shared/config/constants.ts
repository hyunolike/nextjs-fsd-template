export const ACCESS_TOKEN_STORAGE_KEY = "ff-template.access-token";

export const QUERY_KEYS = {
  session: ["session"] as const,
  todos: ["todos"] as const,
  todo: (id: string) => ["todos", id] as const,
};
