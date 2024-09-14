// src/pages/DashboardProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavbarDashboard from "./NavbarDashboard";

const DashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken"); // Mengambil token dari localStorage

  useEffect(() => {
    // Fungsi untuk memeriksa autentikasi dan mengambil produk
    const fetchDashboard = async () => {
      if (token) {
        try {
          // Mengambil produk hanya jika token tersedia
          const response = await axios.get("https://fakestoreapi.com/products");
          setProducts(response.data);
        } catch (error) {
          console.error("Terjadi kesalahan saat mengambil produk:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Arahkan ke halaman login jika token tidak ditemukan
        navigate("/login");
      }
    };

    fetchDashboard();
  }, [token, navigate]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus produk:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto mt-10">
      <div className="mb-10">
        <NavbarDashboard />
      </div>
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
        Daftar Produk
      </h1>
      <Link
        to="products/create"
        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7h2v4h-2v-4zm0-6h2v2h-2V5z" />
        </svg>
        Buat Produk Baru
      </Link>

      <div className="mt-8 overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition duration-300"
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {product.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <Link
                    to={`products/edit/${product.id}`}
                    className="text-blue-500 hover:text-blue-700 transition duration-300 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardProducts;
