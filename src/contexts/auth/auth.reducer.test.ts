import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { authReducer, initialAuthState } from "./auth.reducer";
import type { AuthState, User } from "./auth.types";

const user: User = {
  id: "user-1",
  name: "Ada Lovelace",
  email: "ada@example.com",
};

describe("authReducer", () => {
  it("sets loading session state", () => {
    const state: AuthState = {
      user,
      status: "authenticated",
    };

    const nextState = authReducer(state, {
      type: "sessionLoading",
    });

    assert.deepEqual(nextState, initialAuthState);
  });

  it("authenticates a user", () => {
    const nextState = authReducer(initialAuthState, {
      type: "sessionAuthenticated",
      user,
    });

    assert.deepEqual(nextState, {
      user,
      status: "authenticated",
    });
  });

  it("sets anonymous session state", () => {
    const state: AuthState = {
      user,
      status: "authenticated",
    };

    const nextState = authReducer(state, {
      type: "sessionAnonymous",
    });

    assert.deepEqual(nextState, {
      user: null,
      status: "anonymous",
    });
  });

  it("logs out the current user", () => {
    const state: AuthState = {
      user,
      status: "authenticated",
    };

    const nextState = authReducer(state, {
      type: "loggedOut",
    });

    assert.deepEqual(nextState, {
      user: null,
      status: "anonymous",
    });
  });
});
