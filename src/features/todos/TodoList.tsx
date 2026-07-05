import { TodoItem } from "./TodoItem";
import { getEmptyTodoMessage } from "./todoMessages";
import type { Todo, TodoFilter } from "./types";

type TodoListProps = {
  visibleTodos: Todo[];
  filter: TodoFilter;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

export function TodoList({
  visibleTodos,
  filter,
  onToggleTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (visibleTodos.length === 0) {
    return <p>{getEmptyTodoMessage(filter)}</p>;
  }

  console.log("Rendering TodoList with todos:", visibleTodos);

  return (
    <ul>
      {visibleTodos.map((todo) => (
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