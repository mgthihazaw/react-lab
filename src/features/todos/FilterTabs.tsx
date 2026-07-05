import { Button } from "../../components/Button";
import type { TodoFilter } from "./types";

type FilterTabsProps = {
  currentFilter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
};

const filters: { label: string; value: TodoFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
  console.log("Rendering FilterTabs with currentFilter:", currentFilter);

  return (
    <div>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          disabled={currentFilter === filter.value}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}