import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Write something first").max(200),
});

export type CreateTodoValues = z.infer<typeof createTodoSchema>;
