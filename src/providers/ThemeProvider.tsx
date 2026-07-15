import { useState, type ReactNode } from "react";
import { ThemeContext, type Theme, type ThemeContextValue } from "../contexts/context";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  const value: ThemeContextValue = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
