import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cartReducer, initialCartState, type CartState } from "./cart.reducer";
import type { Product } from "./cart.types";

const reactHandbook: Product = {
  id: "react-handbook",
  name: "React Handbook",
  price: 29,
};

const typescriptCourse: Product = {
  id: "typescript-course",
  name: "TypeScript Pro Course",
  price: 99,
};

describe("cartReducer", () => {
  it("adds a new product to an empty cart", () => {
    const nextState = cartReducer(initialCartState, {
      type: "itemAdded",
      product: reactHandbook,
    });

    assert.deepEqual(nextState.items, [
      {
        ...reactHandbook,
        quantity: 1,
      },
    ]);
  });

  it("increases quantity when adding a product that is already in the cart", () => {
    const state: CartState = {
      items: [
        {
          ...reactHandbook,
          quantity: 1,
        },
      ],
    };

    const nextState = cartReducer(state, {
      type: "itemAdded",
      product: reactHandbook,
    });

    assert.deepEqual(nextState.items, [
      {
        ...reactHandbook,
        quantity: 2,
      },
    ]);
  });

  it("removes an item by id", () => {
    const state: CartState = {
      items: [
        {
          ...reactHandbook,
          quantity: 1,
        },
        {
          ...typescriptCourse,
          quantity: 1,
        },
      ],
    };

    const nextState = cartReducer(state, {
      type: "itemRemoved",
      itemId: reactHandbook.id,
    });

    assert.deepEqual(nextState.items, [
      {
        ...typescriptCourse,
        quantity: 1,
      },
    ]);
  });

  it("increases an item quantity", () => {
    const state: CartState = {
      items: [
        {
          ...reactHandbook,
          quantity: 2,
        },
      ],
    };

    const nextState = cartReducer(state, {
      type: "quantityIncreased",
      itemId: reactHandbook.id,
    });

    assert.deepEqual(nextState.items[0], {
      ...reactHandbook,
      quantity: 3,
    });
  });

  it("decreases an item quantity when quantity is greater than one", () => {
    const state: CartState = {
      items: [
        {
          ...reactHandbook,
          quantity: 2,
        },
      ],
    };

    const nextState = cartReducer(state, {
      type: "quantityDecreased",
      itemId: reactHandbook.id,
    });

    assert.deepEqual(nextState.items[0], {
      ...reactHandbook,
      quantity: 1,
    });
  });

  it("removes an item when decreasing quantity from one", () => {
    const state: CartState = {
      items: [
        {
          ...reactHandbook,
          quantity: 1,
        },
      ],
    };

    const nextState = cartReducer(state, {
      type: "quantityDecreased",
      itemId: reactHandbook.id,
    });

    assert.deepEqual(nextState.items, []);
  });

  it("keeps state unchanged when decreasing a missing item", () => {
    const state: CartState = {
      items: [
        {
          ...reactHandbook,
          quantity: 1,
        },
      ],
    };

    const nextState = cartReducer(state, {
      type: "quantityDecreased",
      itemId: "missing-item",
    });

    assert.equal(nextState, state);
  });

  it("clears the cart", () => {
    const state: CartState = {
      items: [
        {
          ...reactHandbook,
          quantity: 2,
        },
      ],
    };

    const nextState = cartReducer(state, {
      type: "cartCleared",
    });

    assert.deepEqual(nextState, initialCartState);
  });
});
