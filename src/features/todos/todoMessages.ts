import type { TodoFilter } from "./types";

export function getEmptyTodoMessage(filter: TodoFilter) {
  if (filter === "active") {
    return "No active todos.";
  }

  if (filter === "completed") {
    return "No completed todos.";
  }

  return "No todos yet. Add your first todo.";
}