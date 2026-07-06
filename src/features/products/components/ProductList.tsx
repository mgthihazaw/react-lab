import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="product-search__empty">No products found.</p>;
  }

  return (
    <div className="product-search__grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
