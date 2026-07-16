import type {
  PreferencesStore,
  Theme,
  Density,
} from "./preferences.type";

export const selectTheme = (
  state: PreferencesStore
): Theme => state.theme;

export const selectDensity = (
  state: PreferencesStore
): Density => state.density;

export const selectSidebarOpen = (
  state: PreferencesStore
): boolean => state.sidebarOpen;

export const selectSetTheme = (
  state: PreferencesStore
) => state.setTheme;

export const selectSetDensity = (
  state: PreferencesStore
) => state.setDensity;

export const selectToggleSidebar = (
  state: PreferencesStore
) => state.toggleSidebar;