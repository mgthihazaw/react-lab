import type { Product, ProductFilters, ProductPage, ProductSort } from "./products.types";

const products: Product[] = [
  { id: "book-react", name: "React Handbook", category: "books", price: 29 },
  { id: "book-typescript", name: "TypeScript Patterns", category: "books", price: 34 },
  { id: "book-css", name: "Practical CSS Layouts", category: "books", price: 24 },
  { id: "book-node", name: "Node API Design", category: "books", price: 39 },
  { id: "book-testing", name: "Frontend Testing Guide", category: "books", price: 31 },
  { id: "book-state", name: "State Management Notes", category: "books", price: 22 },
  { id: "electronics-keyboard", name: "Mechanical Keyboard", category: "electronics", price: 89 },
  { id: "electronics-monitor", name: "USB-C Monitor", category: "electronics", price: 299 },
  { id: "electronics-mouse", name: "Wireless Mouse", category: "electronics", price: 45 },
  { id: "electronics-dock", name: "Laptop Dock", category: "electronics", price: 129 },
  {
    id: "electronics-headphones",
    name: "Noise Canceling Headphones",
    category: "electronics",
    price: 159,
  },
  { id: "electronics-tablet", name: "Drawing Tablet", category: "electronics", price: 210 },
  { id: "office-chair", name: "Ergonomic Chair", category: "office", price: 249 },
  { id: "office-desk", name: "Standing Desk", category: "office", price: 399 },
  { id: "office-lamp", name: "Desk Lamp", category: "office", price: 42 },
  { id: "office-notebook", name: "Project Notebook", category: "office", price: 12 },
  { id: "office-whiteboard", name: "Magnetic Whiteboard", category: "office", price: 74 },
  { id: "office-organizer", name: "Cable Organizer", category: "office", price: 16 },
];

const pageSize = 6;

function delay(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function sortProducts(productsToSort: Product[], sort: ProductSort): Product[] {
  const nextProducts = [...productsToSort];

  if (sort === "price-asc") {
    return nextProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    return nextProducts.sort((a, b) => b.price - a.price);
  }

  return nextProducts;
}

export async function fetchProducts(filters: ProductFilters): Promise<ProductPage> {
  await delay(120);

  const query = filters.query.toLowerCase();
  const filtered = products
    .filter((product) => product.name.toLowerCase().includes(query))
    .filter((product) =>
      filters.category === "all" ? true : product.category === filters.category,
    );

  const sorted = sortProducts(filtered, filters.sort);
  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const start = (filters.page - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    page: filters.page,
    pageCount,
    totalCount: sorted.length,
  };
}
