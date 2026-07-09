import { useLocalStorage } from "../hook/useLocalStorage";

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage(
    'theme',
    'light'
  );

  return (
    <button
      onClick={() =>
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
      }
    >
      Theme: {theme}
    </button>
  );
}