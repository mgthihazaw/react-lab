import { useTheme } from "../contexts/theme/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button type="button" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch theme: {theme}
    </button>
  );
}
