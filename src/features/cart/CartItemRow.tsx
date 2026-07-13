import type { CartItem } from "./cart.types";

type CartItemRowProps = {
  item: CartItem;
  onIncrease: (itemId: string) => void;
  onDecrease: (itemId: string) => void;
  onRemove: (itemId: string) => void;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  return (
    <li className="cart-item">
      <div className="cart-item__info">
        <strong>{item.name}</strong>
        <span>{currencyFormatter.format(item.price)} each</span>
      </div>

      <div className="cart-item__controls" aria-label={`${item.name} quantity`}>
        <button
          type="button"
          aria-label={`Decrease ${item.name} quantity`}
          onClick={() => onDecrease(item.id)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          aria-label={`Increase ${item.name} quantity`}
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>
      </div>

      <strong className="cart-item__total">
        {currencyFormatter.format(item.price * item.quantity)}
      </strong>

      <button className="cart-item__remove" type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
}
