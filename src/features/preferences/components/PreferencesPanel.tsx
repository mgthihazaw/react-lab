import { DensitySelector } from "./DensitySelector";
import { ResetPreferencesButton } from "./ResetPreferencesButton";
import { SidebarToggle } from "./SidebarToggle";
import { ThemeSelector } from "./ThemeSelector";

export function PreferencesPanel() {
  return (
    <section id="preferences-panel" className="preferences-panel" aria-label="Preferences">
      <div className="preferences-panel__header">
        <div>
          <p className="preferences-panel__eyebrow">Workspace</p>
          <h2>Preferences</h2>
        </div>
        <span className="preferences-panel__status">Saved locally</span>
      </div>

      <div className="preferences-panel__content">
        <ThemeSelector />
        <DensitySelector />
        <SidebarToggle />
      </div>

      <div className="preferences-panel__footer">
        <ResetPreferencesButton />
      </div>
    </section>
  );
}
