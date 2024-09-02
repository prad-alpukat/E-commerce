import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header container grid grid-cols-3 justify-between">
      <h1>Header</h1>

      <div className="flex justify-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>
      </div>

      <div className="flex justify-end gap-4">
        <Link to="/cart">cart</Link>
        <button>Logout</button>
      </div>
    </div>
  );
}
