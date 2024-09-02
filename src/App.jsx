import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import CartProducts from "./pages/CartProducts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartProducts />} />
      </Routes>
    </BrowserRouter>
  );
}
