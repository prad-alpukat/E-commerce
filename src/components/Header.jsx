import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Import useCart

import LogoutButton from "./LogoutButton";

export default function Header() {
  const { cart } = useCart(); // Get cart data from context

  // Calculate total number of items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const totalItems = getTotalItems();
  const displayItems = totalItems > 99 ? "99+" : totalItems;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-800 text-white py-5 px-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Header</h1>

        <nav className="hidden md:flex gap-4 items-center text-xl">
          <Link to="/">Home</Link>
          <Link to="/products">All Products</Link>
        </nav>

        <div className="flex items-center gap-4 relative text-xl">
          <Link to="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z"
              />
            </svg>
            {totalItems > 0 && (
              <div className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {displayItems}
              </div>
            )}
          </Link>
          <Link to="/user">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path
                  fill="currentColor"
                  d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2"
                  opacity="0.16"
                />
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="3"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </g>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
