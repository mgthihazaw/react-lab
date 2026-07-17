import React from "react";
import { productSortValues } from "./productFilters";
import type { ProductSort } from "./products.types";

void React;

const sortOptions: { label: string; value: ProductSort }[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
];

function isProductSort(value: string): value is ProductSort {
  return productSortValues.includes(value as ProductSort);
}

type ProductSortSelectProps = {
  sort: ProductSort;
  onSortChange: (sort: ProductSort) => void;
};

export function ProductSortSelect({ sort, onSortChange }: ProductSortSelectProps) {
  return (
    <label className="products-filter-card">
      <span>Sort</span>
      <select
        aria-label="Sort"
        value={sort}
        onChange={(event) => {
          const nextSort = event.target.value;

          if (!isProductSort(nextSort)) {
            return;
          }

          onSortChange(nextSort);
        }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
