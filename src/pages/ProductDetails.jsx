// src/pages/ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../contexts/CartContext"; // Import useCart untuk mengakses fungsi addToCart
import Swal from "sweetalert2"; // Import SweetAlert2 untuk menampilkan notifikasi

export default function ProductDetails() {
  const { id } = useParams(); // Mengambil ID produk dari parameter URL
  const [product, setProduct] = useState({}); // State untuk menyimpan detail produk
  const [quantity, setQuantity] = useState(1); // State untuk kuantitas produk
  const [total, setTotal] = useState(0); // State untuk total harga
  const navigate = useNavigate(); // Hook untuk navigasi
  const { addToCart } = useCart(); // Mengakses fungsi addToCart dari CartContext

  // Mengambil data produk dari API berdasarkan ID produk
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data); // Menyimpan data produk dalam state
        setTotal(data.price); // Mengatur total harga awal
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // Menghitung total harga setiap kali kuantitas atau harga produk berubah
  useEffect(() => {
    if (product.price) {
      setTotal(product.price * quantity); // Mengatur total harga berdasarkan kuantitas dan harga produk
    }
  }, [quantity, product.price]);

  // Menambah kuantitas produk
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Mengurangi kuantitas produk, tidak boleh kurang dari 1
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Menambahkan produk ke keranjang dan menampilkan notifikasi
  const handleAddToCart = () => {
    const cartItem = { ...product, quantity }; // Membuat objek cartItem dengan kuantitas
    addToCart(cartItem); // Menambahkan produk ke keranjang
    Swal.fire({
      icon: "success",
      title: `${product.title}`,
      text: "Product successfully added to cart",
      confirmButtonText: "OK",
      backdrop: true,
      allowOutsideClick: true,
    }); // Menampilkan notifikasi SweetAlert2
    setQuantity(1); // Mengatur kuantitas kembali ke 1 setelah ditambahkan ke keranjang
  };

  // Menambahkan produk ke keranjang dan mengarahkan ke halaman checkout
  const handleBuyNow = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to buy now?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, buy now!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddToCart();

        navigate("/checkout"); // Mengarahkan ke halaman checkout
      }
    });
  };

  // Kembali ke halaman sebelumnya
  const handleBack = () => {
    window.history.back(); // Mengembalikan ke halaman sebelumnya menggunakan window.history
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header />
      <button
        onClick={handleBack}
        className="fixed mt-4 top-20 left-4 border p-3 rounded-full bg-gray-800 text-white flex items-center hover:bg-gray-700 transition-colors duration-300"
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

      <div className="flex-grow p-6 md:p-12 lg:p-16 mt-28">
        <div className="container mx-auto bg-gray-800 rounded-lg shadow-lg p-6 lg:flex lg:items-center lg:space-x-12">
          <div className="bg-gray-900 p-4 rounded-lg flex justify-center items-center overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="object-cover h-96 w-full lg:w-96 lg:h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="text-white mt-6 lg:mt-0 lg:flex-grow lg:flex lg:flex-col lg:justify-center">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-lg mb-4">{product.category}</p>
            <p className="text-xl font-bold mb-6">$ {product.price}</p>

            <div className="flex items-center mb-6">
              <button
                onClick={handleDecrease}
                className="bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="mx-4 text-xl">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-gray-700 text-white p-2 rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="mb-6">
              <p className="text-xl font-bold">
                Total Price: $ {total.toFixed(2)}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-yellow-500 text-gray-900 py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
