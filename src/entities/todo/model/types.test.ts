import { describe, expect, it } from "vitest";

import { todoSchema } from "./types";

describe("todoSchema", () => {
  it("accepts a well-formed todo", () => {
    const result = todoSchema.safeParse({
      id: "todo-1",
      title: "Write tests",
      isDone: false,
      createdAt: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
  });

  it("rejects a todo missing required fields", () => {
    const result = todoSchema.safeParse({ id: "todo-1", title: "Write tests" });
    expect(result.success).toBe(false);
  });
});
