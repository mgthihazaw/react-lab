import { useReducer } from "react";
import { products } from "../products/data/products";
import type { Product } from "../products/types/product";
import { Cart } from "./Cart";
import { cartReducer, initialCartState } from "./cart.reducer";
import { selectCartItemCount, selectCartSubtotal } from "./cart.selectors";
import type { Product as CartProduct } from "./cart.types";
import { ProductList } from "./ProductList";
import "./ShoppingCartPage.css";
import { useTheme } from "../../contexts/context";

function toCartProduct(product: Product): CartProduct {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
  };
}

export function ShoppingCartPage() {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const itemCount = selectCartItemCount(cartState);
  const subtotal = selectCartSubtotal(cartState);
  const {theme } = useTheme();
  console.log(theme)

  function getQuantityInCart(productId: string) {
    return cartState.items.find((item) => item.id === productId)?.quantity ?? 0;
  }

  function addToCart(product: Product) {
    dispatch({
      type: "itemAdded",
      product: toCartProduct(product),
    });
  }

  return (
    <main className="shopping-page">
      <header className="shopping-hero">
        <div>
          <p>React shop</p>
          <h1>Build your frontend learning bundle</h1>
        </div>
        <div className="shopping-hero__stat">
          <span>Cart total</span>
          <strong>{itemCount}</strong>
        </div>
      </header>

      <div className="shopping-layout">
        <ProductList
          products={products}
          getQuantityInCart={getQuantityInCart}
          onAddToCart={addToCart}
        />

        <Cart
          items={cartState.items}
          itemCount={itemCount}
          subtotal={subtotal}
          onIncrease={(itemId) =>
            dispatch({
              type: "quantityIncreased",
              itemId,
            })
          }
          onDecrease={(itemId) =>
            dispatch({
              type: "quantityDecreased",
              itemId,
            })
          }
          onRemove={(itemId) =>
            dispatch({
              type: "itemRemoved",
              itemId,
            })
          }
          onClear={() =>
            dispatch({
              type: "cartCleared",
            })
          }
        />
      </div>
    </main>
  );
}
