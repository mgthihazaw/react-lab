import type { Product } from "../products/types/product";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products: Product[];
  getQuantityInCart: (productId: string) => number;
  onAddToCart: (product: Product) => void;
};

export function ProductList({ products, getQuantityInCart, onAddToCart }: ProductListProps) {
  return (
    <section className="product-list" aria-labelledby="products-title">
      <div className="section-heading">
        <p>Digital products</p>
        <h2 id="products-title">Choose your toolkit</h2>
      </div>

      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={getQuantityInCart(product.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
