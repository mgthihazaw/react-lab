import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryFilter } from "./CategoryFilter";
import { Pagination } from "./Pagination";
import { ProductList } from "./ProductList";
import { ProductSearchForm } from "./ProductSearchForm";
import { ProductSortSelect } from "./ProductSortSelect";
import { fetchProducts } from "./products.api";
import type { ProductFilters, ProductSort } from "./products.types";
import { useProductFilters } from "./useProductFilters";

void React;

export function ProductsPage() {
  const { filters, updateFilters } = useProductFilters();

  function handlePageChange(page: number) {
    updateFilters({
      page,
    });
  }

  function handleSearch(query: string) {
    updateFilters(
      {
        query,
      },
      {
        resetPage: true,
      },
    );
  }

  function handleCategoryChange(category: string) {
    updateFilters(
      {
        category,
      },
      {
        resetPage: true,
      },
    );
  }

  function handleSortChange(sort: ProductSort) {
    updateFilters(
      {
        sort,
      },
      {
        resetPage: true,
      },
    );
  }

  return (
    <main className="products-page">
      <header className="products-page__header">
        <div>
          <p>URL state + TanStack Query</p>
          <h1>Product Search</h1>
        </div>
        <div className="products-page__metrics" aria-label="Current filter summary">
          <span>{filters.category === "all" ? "All categories" : filters.category}</span>
          <span>{filters.sort}</span>
          <span>Page {filters.page}</span>
        </div>
      </header>

      <section className="products-toolbar" aria-label="Product filters">
        <ProductSearchForm query={filters.query} onSearch={handleSearch} />
        <CategoryFilter category={filters.category} onCategoryChange={handleCategoryChange} />
        <ProductSortSelect sort={filters.sort} onSortChange={handleSortChange} />
      </section>

      <p className="products-page__summary">
        URL owns query, category, sort, and page. TanStack Query owns results, loading, and errors.
      </p>

      <ProductResults filters={filters} onPageChange={handlePageChange} />
    </main>
  );
}

type ProductResultsProps = {
  filters: ProductFilters;
  onPageChange: (page: number) => void;
};

function ProductResults({ filters, onPageChange }: ProductResultsProps) {
  const productsQuery = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });

  if (productsQuery.isPending) {
    return <ProductsSkeleton />;
  }

  if (productsQuery.isError) {
    return (
      <ErrorMessage message="Unable to load products" onRetry={() => productsQuery.refetch()} />
    );
  }

  if (productsQuery.data.items.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <>
      <p className="products-page__result-count">
        {productsQuery.data.totalCount} product(s) found
      </p>

      <ProductList products={productsQuery.data.items} />

      <Pagination
        page={filters.page}
        pageCount={productsQuery.data.pageCount}
        onPageChange={onPageChange}
      />
    </>
  );
}

function ProductsSkeleton() {
  return (
    <div className="products-skeleton" role="status">
      <span />
      <span />
      <span />
    </div>
  );
}

type ErrorMessageProps = {
  message: string;
  onRetry: () => void;
};

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="products-state products-state--error" role="alert">
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

function EmptyProducts() {
  return (
    <div className="products-state">
      <strong>No matching products</strong>
      <p>No products match these filters.</p>
    </div>
  );
}
