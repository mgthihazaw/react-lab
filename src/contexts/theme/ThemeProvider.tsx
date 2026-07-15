import { useReducer } from "react";
import { ThemeContext } from "./theme.context";
import { initialThemeState, themeReducer } from "./theme.reducer";
import type { Theme, ThemeProviderProps } from "./theme.types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);

  function setTheme(theme: Theme) {
    dispatch({
      type: "themeSet",
      theme,
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
