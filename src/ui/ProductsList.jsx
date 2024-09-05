import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Import ikon favorit

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  // Fungsi untuk menambah atau menghapus dari favorit
  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId];

      // Jika produk di-favorit-kan, arahkan ke halaman favorit
      if (!prevFavorites.includes(productId)) {
        navigate("");
      }

      return newFavorites;
    });
  };

  // Cek apakah produk sudah ada di favorit
  const isFavorite = (productId) => favorites.includes(productId);

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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
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
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2"
                aria-label={
                  isFavorite(product.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                {isFavorite(product.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-500" />
                )}
              </button>
              <Link
                to={`/products/${product.id}`}
                className="border p-2 rounded bg-yellow-400 mt-2 w-full"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
