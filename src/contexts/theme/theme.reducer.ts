import type { ThemeAction, ThemeState } from "./theme.types";

export const initialThemeState: ThemeState = {
  theme: "light",
};

export function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "themeSet":
      return {
        theme: action.theme,
      };

    case "themeToggled":
      return {
        theme: state.theme === "light" ? "dark" : "light",
      };

    default:
      return state;
  }
}
