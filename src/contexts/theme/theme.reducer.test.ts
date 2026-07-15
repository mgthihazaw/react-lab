import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { initialThemeState, themeReducer } from "./theme.reducer";

describe("themeReducer", () => {
  it("sets the theme", () => {
    const nextState = themeReducer(initialThemeState, {
      type: "themeSet",
      theme: "dark",
    });

    assert.deepEqual(nextState, {
      theme: "dark",
    });
  });

  it("toggles light theme to dark", () => {
    const nextState = themeReducer(
      {
        theme: "light",
      },
      {
        type: "themeToggled",
      },
    );

    assert.deepEqual(nextState, {
      theme: "dark",
    });
  });

  it("toggles dark theme to light", () => {
    const nextState = themeReducer(
      {
        theme: "dark",
      },
      {
        type: "themeToggled",
      },
    );

    assert.deepEqual(nextState, {
      theme: "light",
    });
  });
});
