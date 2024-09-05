import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import CategoriesProducts from "./CategoriesProducts";
import HeroPages from "./HeroPages";
import FavoriteProduct from "../components/FavoriteProduct";

export default function Home() {
  return (
    <div className="bg-gradient-to-t from-[#20a8ac]  to-[#060606]">
      <Header />

      <HeroPages />
      <FavoriteProduct />

      <CategoriesProducts />
    </div>
  );
}
