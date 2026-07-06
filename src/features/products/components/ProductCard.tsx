import type { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      <div className="product-card__meta">
        <span>{product.category}</span>
        <strong>${product.price}</strong>
      </div>
    </article>
  );
}
