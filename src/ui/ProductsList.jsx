import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="hidden">Loading...</p>;
  }

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="pt-20 bg-slate-800 min-h-screen">
      <Header />
      <button
        onClick={handleBack}
        className="mx-4 border p-2 rounded bg-gray-300 mb-4 mt-5"
      >
        Back
      </button>

      <div class="  flex justify-center items-center">
        <div class="container mx-auto glass backdrop-brightness-50 rounded-lg p-14">
          <form>
            <h1 class="text-center font-bold text-white text-4xl">
              Temukan Produk Yang Anda Inginkan
            </h1>
            <p class="mx-auto font-normal text-sm my-6 max-w-lg"></p>
            <div class="sm:flex items-center bg-white rounded-full overflow-hidden px-2 py-2 justify-between">
              <div class="grid place-items-center h-full w-12 text-gray-300 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search something.."
              />
            </div>
          </form>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 items-center bg-white rounded relative"
            >
              <img
                src={product.image}
                alt={product.title}
                className="mx-auto py-4 aspect-square w-full object-contain"
              />
              <div className="flex flex-col justify-end items-start">
                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                <p>{product.category}</p>
                <p>$ {product.price}</p>

                <Link
                  to={`/products/${product.id}`}
                  className="border p-2 rounded bg-yellow-400 mt-2 w-full"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No products found</p>
        )}
      </ul>
    </div>
  );
}
