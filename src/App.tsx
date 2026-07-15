import { ThemeToggle } from "./consumers/ThemeToggle";
import { ShoppingCartPage } from "./features/cart/ShoppingCartPage";
import { AuthProvider } from "./providers/AuthProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

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
