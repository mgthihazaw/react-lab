import { ThemeToggle } from "./consumers/ThemeToggle";
import { ShoppingCartPage } from "./features/cart/ShoppingCartPage";
import { ThemeProvider } from "./providers/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <ShoppingCartPage />
    </ThemeProvider>
  );
}
