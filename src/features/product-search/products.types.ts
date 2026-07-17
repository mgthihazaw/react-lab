export type ProductSort = "relevance" | "price-asc" | "price-desc";

export type ProductFilters = {
  query: string;
  category: string;
  sort: ProductSort;
  page: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export type ProductPage = {
  items: Product[];
  page: number;
  pageCount: number;
  totalCount: number;
};
