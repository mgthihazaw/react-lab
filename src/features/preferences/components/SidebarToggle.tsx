import { usePreferencesStore } from "../preferences.store";

export function SidebarToggle() {
  const sidebarOpen = usePreferencesStore((state) => state.sidebarOpen);

  const toggleSidebar = usePreferencesStore((state) => state.toggleSidebar);

  return (
    <div className="preference-control">
      <span className="preference-control__text">
        <span className="preference-control__title">Sidebar</span>
        <span className="preference-control__description">
          Keep navigation visible in the app shell.
        </span>
      </span>

      <button
        className="switch"
        type="button"
        role="switch"
        aria-checked={sidebarOpen}
        onClick={toggleSidebar}
      >
        <span className="switch__thumb" />
        <span className="switch__label">{sidebarOpen ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
