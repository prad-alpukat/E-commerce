import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import CategoriesProducts from "./CategoriesProducts";
import HeroPages from "./HeroPages";

export default function Home() {
  return (
    <div>
      <Header />

      <HeroPages />

      <CategoriesProducts />
    </div>
  );
}
