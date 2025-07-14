import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext.jsx";
import "./styles/index.css";
import App from "./App.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx";
import { BrandsProvider } from "./contexts/BrandsContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BrandsProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </BrandsProvider>
    </BrowserRouter>
  </StrictMode>
);
