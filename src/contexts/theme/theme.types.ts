import type { ReactNode } from "react";

export type Theme = "light" | "dark";

export type ThemeState = {
  theme: Theme;
};

export type ThemeAction =
  | {
      type: "themeSet";
      theme: Theme;
    }
  | {
      type: "themeToggled";
    };

export type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type ThemeProviderProps = {
  children: ReactNode;
};
