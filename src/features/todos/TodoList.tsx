import { TodoItem } from "./TodoItem";
import type { Todo, TodoFilter } from "./types";

type TodoListProps = {
  todos: Todo[];
  filter: TodoFilter;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

function getEmptyMessage(filter: TodoFilter) {
  if (filter === "active") {
    return "No active todos.";
  }

  if (filter === "completed") {
    return "No completed todos.";
  }

  return "No todos yet. Add your first todo.";
}

export function TodoList({
  todos,
  filter,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return <p>{getEmptyMessage(filter)}</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}