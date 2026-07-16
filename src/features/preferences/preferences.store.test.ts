import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";

class MemoryStorage {
  private values = new Map<string, string>();

  get length() {
    return this.values.size;
  }

  clear() {
    this.values.clear();
  }

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  key(index: number) {
    return Array.from(this.values.keys())[index] ?? null;
  }

  removeItem(key: string) {
    this.values.delete(key);
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }
}

Object.defineProperty(globalThis, "localStorage", {
  value: new MemoryStorage(),
  configurable: true,
});

Object.defineProperty(globalThis, "window", {
  value: globalThis,
  configurable: true,
});

const { initialPreferences, usePreferencesStore } = await import("./preferences.store");

describe("usePreferencesStore", () => {
  beforeEach(() => {
    localStorage.clear();

    usePreferencesStore.setState({
      ...initialPreferences,
    });
  });

  it("changes the theme", () => {
    usePreferencesStore.getState().setTheme("dark");

    assert.equal(usePreferencesStore.getState().theme, "dark");
  });

  it("changes the density", () => {
    usePreferencesStore.getState().setDensity("compact");

    assert.equal(usePreferencesStore.getState().density, "compact");
  });

  it("toggles the sidebar", () => {
    assert.equal(usePreferencesStore.getState().sidebarOpen, true);

    usePreferencesStore.getState().toggleSidebar();

    assert.equal(usePreferencesStore.getState().sidebarOpen, false);
  });

  it("sets sidebar visibility", () => {
    usePreferencesStore.getState().setSidebarOpen(false);

    assert.equal(usePreferencesStore.getState().sidebarOpen, false);
  });

  it("resets all preferences", () => {
    usePreferencesStore.setState({
      theme: "dark",
      density: "compact",
      sidebarOpen: false,
    });

    usePreferencesStore.getState().resetPreferences();

    assert.deepEqual(
      {
        theme: usePreferencesStore.getState().theme,
        density: usePreferencesStore.getState().density,
        sidebarOpen: usePreferencesStore.getState().sidebarOpen,
      },
      initialPreferences,
    );
  });

  it("persists UI preferences", () => {
    usePreferencesStore.getState().setTheme("dark");

    const persisted = localStorage.getItem("ui-preferences");

    assert.notEqual(persisted, null);
    assert.match(persisted ?? "", /"theme":"dark"/);
    assert.doesNotMatch(
      persisted ?? "",
      /setTheme|setDensity|toggleSidebar|setSidebarOpen|resetPreferences/,
    );
  });
});
