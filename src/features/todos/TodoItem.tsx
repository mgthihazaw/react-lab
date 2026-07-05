import { Button } from "../../components/Button";
import type { Todo } from "./types";

type TodoItemProps = {
  todo: Todo;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
};

export function TodoItem({ todo, onToggleTodo, onDeleteTodo }: TodoItemProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
        />

        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.title}
        </span>
      </label>

      <Button onClick={() => onDeleteTodo(todo.id)}>Delete</Button>
    </li>
  );
}