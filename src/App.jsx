import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import CartProducts from "./pages/CartProducts";
import CategoriesProducts from "./pages/CategoriesProducts";
import CheckoutPages from "./pages/CheckoutPages";
import LoginPages from "./pages/LoginPages";
import Footer from "./components/Footer";
import DashboardProducts from "./dasboardadmin/DasboardProducts";
import EditProduct from "./dasboardadmin/EditProduct";
import CreateProduct from "./dasboardadmin/CreateProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartProducts />} />
        <Route path="/categories/:category" element={<CategoriesProducts />} />
        <Route path="/checkout" element={<CheckoutPages />} />
        <Route path="/dashboard" element={<DashboardProducts />} />
        <Route path="/dashboard/login" element={<LoginPages />} />
        <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
        <Route path="/dashboard/products/create" element={<CreateProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
