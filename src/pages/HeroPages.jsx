import React from "react";
import Partner from "../components/Partner";
export default function HeroPages() {
  return (
    <div className=" ">
      <div className=" container mx-auto p-6 pt-20 flex flex-col items-center justify-center mt-10 h-144  text-center  ">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-white">
          Selamat Datang di{" "}
          <span className="text-yellow-400">Toko Online Saya</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 text-white">
          Temukan berbagai macam produk favoritmu, Selamat Berbelanja!!!
        </p>
        <a
          href="#explore"
          className="bg-yellow-400 text-slate-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out"
        >
          Jelajahi sekarang
        </a>
      </div>

      <Partner />
    </div>
  );
}
