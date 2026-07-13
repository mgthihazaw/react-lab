import type { CartItem } from "./cart.types";
import { CartItemRow } from "./CartItemRow";

type CartProps = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onClear: () => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function Cart({
  items,
  itemCount,
  subtotal,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: CartProps) {
  const isEmpty = items.length === 0;

  return (
    <aside className="cart-panel" aria-labelledby="cart-title">
      <div className="section-heading">
        <p>{itemCount} items</p>
        <h2 id="cart-title">Shopping cart</h2>
      </div>

      {isEmpty ? (
        <div className="cart-empty">
          <strong>Your cart is empty</strong>
          <span>Add a product to start your order.</span>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </ul>

          <div className="cart-summary">
            <div>
              <span>Subtotal</span>
              <strong>{currencyFormatter.format(subtotal)}</strong>
            </div>
            <div>
              <span>Estimated tax</span>
              <strong>{currencyFormatter.format(subtotal * 0.08)}</strong>
            </div>
            <div className="cart-summary__total">
              <span>Total</span>
              <strong>{currencyFormatter.format(subtotal * 1.08)}</strong>
            </div>
          </div>

          <div className="cart-actions">
            <button className="cart-actions__clear" type="button" onClick={onClear}>
              Clear cart
            </button>
            <button className="cart-actions__checkout" type="button">
              Checkout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
