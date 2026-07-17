import { Navigate, Route, Routes } from "react-router-dom";
import { ProductsPage } from "./features/product-search/ProductsPage";
import "./features/product-search/products-page.css";

export default function App() {
  return (
    <Routes>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  );
}
