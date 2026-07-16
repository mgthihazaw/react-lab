import type { ChangeEvent } from "react";
import { usePreferencesStore } from "../preferences.store";
import type { Theme } from "../preferences.type";

export function ThemeSelector() {
  const theme = usePreferencesStore((state) => state.theme);

  const setTheme = usePreferencesStore((state) => state.setTheme);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setTheme(event.target.value as Theme);
  }

  return (
    <label className="preference-control">
      <span className="preference-control__text">
        <span className="preference-control__title">Theme</span>
        <span className="preference-control__description">
          Choose the color mode for this workspace.
        </span>
      </span>

      <select className="preference-select" value={theme} onChange={handleChange}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  );
}
