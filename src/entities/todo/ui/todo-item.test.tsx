import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TodoItem } from "./todo-item";

const todo = {
  id: "todo-1",
  title: "Write tests",
  isDone: false,
  createdAt: new Date().toISOString(),
};

describe("TodoItem", () => {
  it("calls onToggle when the checkbox is clicked", async () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={todo} onToggle={onToggle} onDelete={vi.fn()} />);

    await userEvent.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledWith(todo);
  });

  it("calls onDelete when the delete button is clicked", async () => {
    const onDelete = vi.fn();
    render(<TodoItem todo={todo} onToggle={vi.fn()} onDelete={onDelete} />);

    await userEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith(todo);
  });
});
