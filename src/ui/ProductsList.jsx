// src/pages/ProductsList.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]); // Daftar produk
  const [loading, setLoading] = useState(true); // Status loading
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
  const [selectedCategory, setSelectedCategory] = useState(""); // State untuk kategori yang dipilih
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Mengambil kategori unik dari produk
  const categories = [...new Set(products.map((product) => product.category))];

  // Memfilter produk berdasarkan kata kunci pencarian dan kategori yang dipilih
  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearchTerm && matchesCategory;
  });

  if (loading) {
    return <p className="text-center py-6 text-white">Loading...</p>;
  }

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen">
      <Header />
      <div className="pt-28 ">
        <button
          onClick={handleBack}
          className="flex justify-center items-center mx-4 border p-3 rounded-full bg-gray-700 text-white mb-4  hover:bg-gray-600 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <span className="ml-2">Back</span>
        </button>
      </div>

      <div className="container mx-auto p-6 bg-gray-900 rounded-lg shadow-lg ">
        <h1 className="text-center text-4xl font-bold text-white mb-6">
          Find Your Desired Products
        </h1>
        <form className="mb-6">
          <div className="relative flex items-center bg-gray-800 rounded-lg overflow-hidden">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="w-full h-12 px-4 text-gray-200 bg-gray-800 outline-none placeholder-gray-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-4 text-gray-500 h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className={`py-2 px-4 rounded-full border transition-colors duration-300 ${
                selectedCategory === ""
                  ? "bg-gray-600 text-white"
                  : "bg-gray-800 text-gray-400"
              } hover:bg-gray-700`}
            >
              All Categories
            </button>
            {categories.map((category, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-4 rounded-full border transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-gray-600 text-white"
                    : "bg-gray-800 text-gray-400"
                } hover:bg-gray-700`}
              >
                {category}
              </button>
            ))}
          </div>
        </form>
      </div>

      <div className="container mx-auto p-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm mb-2">{product.category}</p>
                  <p className="text-lg font-bold mb-4">$ {product.price}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="block text-center bg-yellow-500 text-gray-900 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
                  >
                    View
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center">No products found</p>
          )}
        </ul>
      </div>
    </div>
  );
}
