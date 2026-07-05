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

  // Derived State: visibleTodos is derived from todos and filter
  // Don't store derived state in React state. Instead, compute it on the fly during rendering.
  // const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const visibleTodos = getVisibleTodos(todos, filter);

  const hasTodos = todos.length > 0;
  const allTodosCompleted = hasTodos && todos.every((todo) => todo.completed);

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
  console.log("Rendering App with todos:", todos, "and filter:", filter);

  return (
    <main>
      <h1>Todo List</h1>
      {allTodosCompleted && <p>Nice work. All todos are completed.</p>}
      
      <Card title="Add Todo">
        <TodoForm onAddTodo={handleAddTodo} />
      </Card>

      <Card title="Todos">
        <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

        <TodoList
          visibleTodos={visibleTodos}
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
