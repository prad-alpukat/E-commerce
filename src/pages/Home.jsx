import React from "react";
import Header from "../components/Header";
import CategoriesProducts from "./CategoriesProducts";
import HeroPages from "./HeroPages";
import FavoriteProduct from "../components/FavoriteProduct";

export default function Home() {
  return (
    <div className="bg-gradient-to-l from-[#1e8e92]  to-[#060606] ">
      <Header />

      <HeroPages />
      <div className="my-10">
        <FavoriteProduct />
      </div>

      <CategoriesProducts />
    </div>
  );
}
