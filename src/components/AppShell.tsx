import { usePreferencesStore } from "../features/preferences/preferences.store";
import { Sidebar } from "./Sidebar";
import { PreferencesMenu } from "./PreferencesMenu";
import "../features/preferences/preferences.css";

export function AppShell() {
  const theme = usePreferencesStore((state) => state.theme);
  const density = usePreferencesStore((state) => state.density);
  const sidebarOpen = usePreferencesStore((state) => state.sidebarOpen);

  return (
    <div
      className="preferences-app"
      data-theme={theme}
      data-density={density}
      data-sidebar-open={sidebarOpen}
    >
      <Sidebar />

      <div className="preferences-app__main">
        <header className="preferences-header">
          <div>
            <p className="preferences-header__eyebrow">UI settings</p>
            <h1>Workspace Preferences</h1>
          </div>

          <PreferencesMenu />
        </header>

        <main className="preferences-content">
          <section className="preferences-hero" id="overview">
            <div>
              <span className="preferences-hero__badge">Live preview</span>
              <h2>Shape the interface around how you work.</h2>
              <p>
                Theme, density, and navigation choices update immediately and persist in local
                storage.
              </p>
            </div>
          </section>

          <section className="preview-grid" aria-label="Preference preview">
            <article className="preview-card" id="appearance">
              <span className="preview-card__icon">Aa</span>
              <h3>Appearance</h3>
              <p>
                The app shell reads your selected theme and adjusts the surface, text, and control
                colors.
              </p>
            </article>

            <article className="preview-card" id="layout">
              <span className="preview-card__icon">[]</span>
              <h3>Layout</h3>
              <p>
                Sidebar visibility changes the page structure without losing your active workspace.
              </p>
            </article>

            <article className="preview-card" id="storage">
              <span className="preview-card__icon">DB</span>
              <h3>Storage</h3>
              <p>Zustand persist keeps your selected preferences available after refreshes.</p>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
