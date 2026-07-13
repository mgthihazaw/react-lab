import type { CartState } from "./cart.reducer";

export function selectCartItemCount(
  state: CartState
): number {
  return state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function selectCartSubtotal(
  state: CartState
): number {
  return state.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
}

export function selectIsCartEmpty(
  state: CartState
): boolean {
  return state.items.length === 0;
}