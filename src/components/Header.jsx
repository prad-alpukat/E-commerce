import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="relative top-0  grid grid-cols-3 justify-between items-center py-5 bg-slate-800 px-10 text-white">
      <h1 className="text-3xl font-bold">Header</h1>

      <div className="flex justify-center gap-4 items-center text-xl">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>
      </div>

      <div className="flex justify-end gap-4 items-center text-xl">
        <Link to="/cart">
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
        </Link>
        <button>Logout</button>
      </div>
    </div>
  );
}
