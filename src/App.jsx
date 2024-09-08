import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/AllProducts";
import ProductDetails from "./pages/ProductDetails";
import CartProducts from "./pages/CartProducts";
import CategoriesProducts from "./pages/CategoriesProducts";
import CheckoutPages from "./pages/CheckoutPages";
import NotaPage from "./pages/NotaPages";
import LoginPages from "./pages/LoginPages";
import UserPages from "./pages/UserPages";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPages";
import FavoriteProduct from "./components/FavoriteProduct";
import DashboardProducts from "./dasboardadmin/DasboardProducts";
import EditProduct from "./dasboardadmin/EditProduct";
import CreateProduct from "./dasboardadmin/CreateProduct";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/favorites" element={<FavoriteProduct />} />
        <Route path="/cart" element={<CartProducts />} />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/user" element={<UserPages />} />
        <Route path="/categories/:category" element={<CategoriesProducts />} />
        <Route path="/checkout" element={<CheckoutPages />} />
        <Route path="/nota" element={<NotaPage />} />
        <Route path="/dashboard" element={<DashboardProducts />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
