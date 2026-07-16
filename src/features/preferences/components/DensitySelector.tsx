import { usePreferencesStore } from "../preferences.store";
import type { Density } from "../preferences.type";

export function DensitySelector() {
  const density: Density = usePreferencesStore((state) => state.density);

  const setDensity = usePreferencesStore((state) => state.setDensity);

  return (
    <fieldset className="preference-fieldset">
      <legend>
        <span className="preference-control__title">Density</span>
        <span className="preference-control__description">
          Tune spacing for scanning or relaxed reading.
        </span>
      </legend>

      <div className="segmented-control">
        <label className="segmented-control__option" data-active={density === "comfortable"}>
          <input
            type="radio"
            name="density"
            value="comfortable"
            checked={density === "comfortable"}
            onChange={() => setDensity("comfortable")}
          />

          <span>Comfortable</span>
        </label>

        <label className="segmented-control__option" data-active={density === "compact"}>
          <input
            type="radio"
            name="density"
            value="compact"
            checked={density === "compact"}
            onChange={() => setDensity("compact")}
          />

          <span>Compact</span>
        </label>
      </div>
    </fieldset>
  );
}
