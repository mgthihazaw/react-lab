import React from "react";
import type { Product } from "./products.types";

void React;

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  return (
    <ul className="products-grid" aria-label="Product results">
      {products.map((product) => (
        <li className="product-card" key={product.id}>
          <div className="product-card__topline">
            <span>{product.category}</span>
            <span>{product.id.replaceAll("-", " ")}</span>
          </div>
          <div>
            <h2>{product.name}</h2>
            <p className="product-card__description">
              Curated {product.category} item available through the mock product API.
            </p>
          </div>
          <div className="product-card__footer">
            <p className="product-card__price">${product.price.toFixed(2)}</p>
            <span>View</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
