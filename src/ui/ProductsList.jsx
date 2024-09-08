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
    <div className="mt-16 bg-slate-800">
      <Header />
      <button
        onClick={handleBack}
        className="mx-4 border p-2 rounded bg-gray-300 mb-4 mt-5"
      >
        Back
      </button>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search products... (eg. Shirt)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
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
          <p>No products found</p>
        )}
      </ul>
    </div>
  );
}
