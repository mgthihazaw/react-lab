import { useState } from "react";
import { Card } from "./components/Card";
import { FilterTabs } from "./features/todos/FilterTabs";
import { TodoForm } from "./features/todos/TodoForm";
import { TodoList } from "./features/todos/TodoList";
import { TodoStats } from "./features/todos/TodoStats";
import { getVisibleTodos } from "./features/todos/todoFilters";
import type { Todo, TodoFilter } from "./features/todos/types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const visibleTodos = getVisibleTodos(todos, filter);

  function handleAddTodo(title: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  function handleToggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  }

  function handleDeleteTodo(id: string) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <main>
      <h1>Todo List</h1>

      <Card title="Add Todo">
        <TodoForm onAddTodo={handleAddTodo} />
      </Card>

      <Card title="Todos">
        <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

        <TodoList
          todos={visibleTodos}
          filter={filter}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </Card>

      <TodoStats todos={todos} />
    </main>
  );
}

export default App;