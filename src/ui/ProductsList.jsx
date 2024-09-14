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
    return <p className="hidden">Loading...</p>;
  }

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-tl from-[#1e8e92] to-[#060606] ">
      <Header />
      <button
        onClick={handleBack}
        className="flex items-center  mx-4 border p-2 rounded bg-gray-300 mb-4 mt-5 "
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
        <span>Back</span>
      </button>

      <div className=" flex justify-center items-center">
        <div className="container mx-auto bg-white shadow-lg rounded-lg p-6">
          <form>
            <h1 className="text-center font-bold text-gray-800 text-3xl mb-4">
              Temukan Produk Yang Anda Inginkan
            </h1>
            <p className="mx-auto font-normal text-sm my-6 max-w-lg"></p>
            <div className="flex items-center bg-white rounded-full overflow-hidden px-2 py-2 mb-4 border border-gray-300">
              <div className="grid place-items-center h-full w-12 text-gray-500 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search something.."
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                type="button"
                onClick={() => setSelectedCategory("")}
                className={`py-2 px-4 rounded-full border transition-colors duration-300 ease-in-out ${
                  selectedCategory === ""
                    ? "bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-600"
                } hover:bg-gray-200`}
              >
                All Categories
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`py-2 px-4 rounded-full border transition-colors duration-300 ease-in-out ${
                    selectedCategory === category
                      ? "bg-gray-300 text-gray-800"
                      : "bg-gray-100 text-gray-600"
                  } hover:bg-gray-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 items-center bg-white rounded relative shadow-lg"
            >
              <img
                src={product.image}
                alt={product.title}
                className="mx-auto py-4 aspect-square w-full object-contain hover:opacity-80 transition-opacity duration-300"
              />
              <div className="flex flex-col justify-end items-start">
                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                <p>{product.category}</p>
                <p>$ {product.price}</p>

                <Link
                  to={`/products/${product.id}`}
                  className="border p-2 rounded bg-yellow-400 mt-2 w-full text-center text-white hover:bg-yellow-500 transition-colors duration-300"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-800">No products found</p>
        )}
      </ul>
    </div>
  );
}
