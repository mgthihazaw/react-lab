import type { Todo } from "./types";

type TodoStatsProps = {
  todos: Todo[];
};

export function TodoStats({ todos }: TodoStatsProps) {
  // Derived State: totalCount, completedCount, and activeCount are derived from todos
  // State should store facts. Derived values should be calculated.
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;
console.log("Rendering TodoStats with todos:", todos);
  return (
    <section>
      <p>Total: {totalCount}</p>
      <p>Active: {activeCount}</p>
      <p>Completed: {completedCount}</p>
    </section>
  );
}