import { ThemeToggle } from "./components/ThemeToggle";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import { ShoppingCartPage } from "./features/cart/ShoppingCartPage";
import { ThemeProvider } from "./contexts/theme/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <AuthProvider>
        <ShoppingCartPage />
      </AuthProvider>
    </ThemeProvider>
  );
}
