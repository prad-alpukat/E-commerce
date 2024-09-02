import React from "react";

export default function HeroPages() {
  return (
    <div className="relative bg-gray-800 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://source.unsplash.com/random/1600x900)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative container mx-auto p-6 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Selamat Datang di{" "}
          <span className="text-yellow-500">Toko Online Saya</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Temukan berbagai macam produk favoritmu, Selamat Berbelanja!!!
        </p>
        <a
          href="#explore"
          className="bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300 ease-in-out"
        >
          Jelajahi sekarang
        </a>
      </div>
    </div>
  );
}
