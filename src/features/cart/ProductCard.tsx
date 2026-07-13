import type { Product } from "../products/types/product";

type ProductCardProps = {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product) => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductCard({ product, quantityInCart, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__media" aria-hidden="true">
        {product.name.slice(0, 2).toUpperCase()}
      </div>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span>{product.category}</span>
          {quantityInCart > 0 && <strong>{quantityInCart} in cart</strong>}
        </div>

        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>

      <div className="product-card__footer">
        <strong>{currencyFormatter.format(product.price)}</strong>
        <button type="button" onClick={() => onAddToCart(product)}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
