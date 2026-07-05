import type { Todo } from "./types";

type TodoStatsProps = {
  todos: Todo[];
};

export function TodoStats({ todos }: TodoStatsProps) {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <section>
      <p>Total: {totalCount}</p>
      <p>Active: {activeCount}</p>
      <p>Completed: {completedCount}</p>
    </section>
  );
}