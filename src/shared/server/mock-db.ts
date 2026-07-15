/**
 * In-memory mock database for the template's demo API routes.
 * Resets on every server restart — replace with a real database/ORM.
 */
export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface MockTodo {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "user-1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
  },
];

export const mockTodos: MockTodo[] = [
  {
    id: "todo-1",
    title: "Read the FSD architecture docs",
    isDone: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "todo-2",
    title: "Wire up a new feature slice",
    isDone: false,
    createdAt: new Date().toISOString(),
  },
];
