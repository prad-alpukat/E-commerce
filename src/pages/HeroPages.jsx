import React from "react";
import Partner from "../components/Partner";
import Aos from "aos";
import { Link } from "react-router-dom";
export default function HeroPages() {
  Aos.init();
  return (
    <div
      className=" "
      data-aos="fade-in"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      <div className=" container mx-auto  flex flex-col items-center justify-center  h-144  text-center  ">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white">
          Welcome to <span className="text-yellow-400">My Online Store</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-white">
          Discover a variety of your favorite products, Happy Shopping!!!
        </p>
        <Link
          to={"/products"}
          href="#explore"
          className="bg-yellow-400 text-slate-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out flex items-center justify-center gap-2"
        >
          Explore Now{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 4 0v1h-4Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2Z"
            />
          </svg>
        </Link>
      </div>
      <div className="mb-8">
        <Partner />
      </div>
    </div>
  );
}
