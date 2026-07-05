import type { Todo, TodoFilter } from "./types";

export const getVisibleTodos = (todos: Todo[], filter: TodoFilter): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};
