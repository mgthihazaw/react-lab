import { create } from "zustand";
import { type PreferencesStore, type PreferencesState, type Theme, type Density } from "./preferences.type";
import { persist } from "zustand/middleware";

export const initialPreferences: PreferencesState = {
  theme: "system",
  density: "comfortable",
  sidebarOpen: true,
};

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      ...initialPreferences,

      setTheme: (theme: Theme) =>
        set({
          theme,
        }),

      setDensity: (density: Density) => {
        set({
          density,
        });
      },

      toggleSidebar: () => {
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        }));
      },

      setSidebarOpen: (sidebarOpen: boolean) => {
        set({
          sidebarOpen,
        });
      },

      resetPreferences: () => {
        set(initialPreferences);
      },
      
    }),
    {
      name: "ui-preferences",

      partialize: (state) => ({
        theme: state.theme,
        density: state.density,
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);
