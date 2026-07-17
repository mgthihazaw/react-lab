import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { createProductSearchParams, parseProductFilters } from "./productFilters";
import type { ProductFilters } from "./products.types";

type UpdateFilterOptions = {
  replace?: boolean;
  resetPage?: boolean;
};

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => parseProductFilters(searchParams), [searchParams]);

  const updateFilters = useCallback(
    (updates: Partial<ProductFilters>, options?: UpdateFilterOptions) => {
      const nextFilters: ProductFilters = {
        ...filters,
        ...updates,
        page: options?.resetPage ? 1 : (updates.page ?? filters.page),
      };

      setSearchParams(createProductSearchParams(nextFilters), {
        replace: options?.replace ?? false,
      });
    },
    [filters, setSearchParams],
  );

  console.log(filters)
  return {
    filters,
    updateFilters,
  };
}
