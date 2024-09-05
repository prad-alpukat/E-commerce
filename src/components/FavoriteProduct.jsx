// src/components/FavoriteProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FavoriteProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API menggunakan metode axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products?limit=4"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    // Memanggil fungsi fetchProducts saat komponen di-mount
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className=" h-144 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Produk Favorit
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto py-4 aspect-square w-full object-contain"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-lg font-bold mb-4">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
