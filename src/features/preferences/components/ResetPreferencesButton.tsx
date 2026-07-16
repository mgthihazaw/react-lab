import { usePreferencesStore } from "../preferences.store";

export function ResetPreferencesButton() {
  const resetPreferences = usePreferencesStore((state) => state.resetPreferences);

  return (
    <button className="preferences-reset" type="button" onClick={resetPreferences}>
      Reset preferences
    </button>
  );
}
