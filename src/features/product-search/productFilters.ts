import type { ProductFilters, ProductSort } from "./products.types";

export const productSortValues = ["relevance", "price-asc", "price-desc"] as const;

export const defaultProductFilters: ProductFilters = {
  query: "",
  category: "all",
  sort: "relevance",
  page: 1,
};

export function parsePositiveInteger(value: string | null, fallback: number): number {
  if (value === null) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export function parseProductSort(value: string | null): ProductSort {
  if (productSortValues.includes(value as ProductSort)) {
    return value as ProductSort;
  }

  return defaultProductFilters.sort;
}

export function parseProductFilters(searchParams: URLSearchParams): ProductFilters {
  return {
    query: searchParams.get("query")?.trim() ?? defaultProductFilters.query,
    category: searchParams.get("category")?.trim() || defaultProductFilters.category,
    sort: parseProductSort(searchParams.get("sort")),
    page: parsePositiveInteger(searchParams.get("page"), defaultProductFilters.page),
  };
}

export function createProductSearchParams(filters: ProductFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.query) {
    params.set("query", filters.query);
  }

  if (filters.category !== defaultProductFilters.category) {
    params.set("category", filters.category);
  }

  if (filters.sort !== defaultProductFilters.sort) {
    params.set("sort", filters.sort);
  }

  if (filters.page !== defaultProductFilters.page) {
    params.set("page", String(filters.page));
  }

  return params;
}
