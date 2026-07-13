import type { CartItem, Product } from "./cart.types";

export type CartState = {
  items: CartItem[];
};

export const initialCartState: CartState = {
  items: [],
};

export type CartAction =
  | {
      type: "itemAdded";
      product: Product;
    }
  | {
      type: "itemRemoved";
      itemId: string;
    }
  | {
      type: "quantityIncreased";
      itemId: string;
    }
  | {
      type: "quantityDecreased";
      itemId: string;
    }
  | {
      type: "cartCleared";
    };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "itemAdded": {
      const existedItem = state.items.find((item) => item.id === action.product.id);
      if (!existedItem) {
        return {
          items: [
            ...state.items,
            {
              ...action.product,
              quantity: 1,
            },
          ],
        };
      }

      return {
        items: [
          ...state.items.map((item) =>
            item.id === action.product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        ],
      };
    }

    case "itemRemoved": {
      return {
        items: [...state.items.filter((item) => item.id !== action.itemId)],
      };
    }

    case "quantityIncreased": {
      return {
        items: [
          ...state.items.map((item) =>
            item.id === action.itemId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        ],
      };
    }

    case "quantityDecreased": {
      const existingItem = state.items.find((item) => item.id === action.itemId);

      if (!existingItem) {
        return state;
      }

      if (existingItem.quantity === 1) {
        return {
          items: [...state.items.filter((item) => item.id !== action.itemId)],
        };
      }

      return {
        items: [
          ...state.items.map((item) =>
            item.id === action.itemId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          ),
        ],
      };
    }

    case "cartCleared":
      return initialCartState;

    default: {
      return state;
    }
  }
}
