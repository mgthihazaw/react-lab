import { usePreferencesStore } from "../features/preferences/preferences.store";

export function Sidebar() {
  const sidebarOpen = usePreferencesStore((state) => state.sidebarOpen);

  if (!sidebarOpen) {
    return null;
  }

  return (
    <aside className="app-sidebar" aria-label="Workspace navigation">
      <div className="app-sidebar__brand">
        <span className="app-sidebar__logo">P</span>
        <div>
          <strong>Preferences Lab</strong>
          <span>Personal workspace</span>
        </div>
      </div>

      <nav className="app-sidebar__nav">
        <a href="#overview" className="is-active">
          Overview
        </a>
        <a href="#appearance">Appearance</a>
        <a href="#layout">Layout</a>
        <a href="#storage">Storage</a>
      </nav>
    </aside>
  );
}
