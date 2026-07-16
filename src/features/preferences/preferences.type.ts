export type Theme = "light" | "dark" | "system";

export type Density = "comfortable" | "compact";

export type PreferencesState = {
  theme: Theme;
  density: Density;
  sidebarOpen: boolean;
};

export type PreferencesActions = {
  setTheme: (theme: Theme) => void;
  setDensity: (density: Density) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  resetPreferences: () => void;
};

export type PreferencesStore =
  PreferencesState &
  PreferencesActions;
