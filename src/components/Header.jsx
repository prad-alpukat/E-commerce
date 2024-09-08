import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../contexts/CartContext"; // Import useCart

export default function Header() {
  const { cart } = useCart(); // Get cart data from context
  const location = useLocation();

  // Calculate total number of items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const totalItems = getTotalItems();
  const displayItems = totalItems > 99 ? "99+" : totalItems;

  const currentPage = location.pathname === "/home";
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#100F0F] text-white py-5 px-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <h1 className="text-3xl font-bold">Toko Online </h1>
        </Link>

        <nav
          className={` ${
            currentPage ? "text-yellow-400" : "text-white"
          } font-semibold items-center `}
        >
          <Link to="/home">Home</Link>
        </nav>

        <div className="flex items-center gap-4 relative text-xl">
          {/* icon for all product */}
          <Link to="/products">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M464 144c8.837 0 16 7.163 16 16v304c0 8.836-7.163 16-16 16H160c-8.837 0-16-7.164-16-16V160c0-8.837 7.163-16 16-16zm-52 68H212v200h200zm493.333 87.686c6.248 6.248 6.248 16.379 0 22.627l-181.02 181.02c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.379 0-22.627l181.02-181.02c6.248-6.248 16.378-6.248 22.627 0zm-84.853 11.313L713 203.52L605.52 311L713 418.48zM464 544c8.837 0 16 7.164 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.836 7.163-16 16-16zm-52 68H212v200h200zm452-68c8.837 0 16 7.164 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.836 7.163-16 16-16zm-52 68H612v200h200z"
              />
            </svg>
          </Link>
          {/* Cart Icon */}
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

          {/* User Icon */}
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
