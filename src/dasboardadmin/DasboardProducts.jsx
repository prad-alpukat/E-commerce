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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <NavbarDashboard />
      </div>
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
        Daftar Produk
      </h1>
      <Link
        to="products/create"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Buat Produk Baru
      </Link>

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
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
                className="hover:bg-gray-100 transition duration-300"
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
