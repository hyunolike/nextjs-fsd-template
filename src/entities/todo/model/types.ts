import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  isDone: z.boolean(),
  createdAt: z.string(),
});

export type Todo = z.infer<typeof todoSchema>;
