import React from "react";

void React;

const categories = [
  { label: "All categories", value: "all" },
  { label: "Books", value: "books" },
  { label: "Electronics", value: "electronics" },
  { label: "Office", value: "office" },
];

type CategoryFilterProps = {
  category: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryFilter({ category, onCategoryChange }: CategoryFilterProps) {
  return (
    <label className="products-filter-card">
      <span>Category</span>
      <select
        aria-label="Category"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </label>
  );
}
