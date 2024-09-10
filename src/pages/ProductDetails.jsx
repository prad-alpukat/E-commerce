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
    // Menggunakan navigate
    // navigate(-1); // Mengembalikan ke halaman sebelumnya menggunakan hook useNavigate
    window.history.back(); // Mengembalikan ke halaman sebelumnya menggunakan window.history
  };

  return (
    <div className="mt-16 bg-slate-800 min-h-screen">
      <Header />
      {/* Tombol untuk kembali ke halaman sebelumnya */}
      <button
        onClick={handleBack}
        className="mx-4 border p-2 rounded bg-gray-300 mb-4 mt-5"
      >
        Back
      </button>

      <div className="container p-4 grid md:grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Bagian untuk menampilkan gambar produk */}
        <div className="border-2 rounded p-4 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto p-4 h-96 w-96"
          />
        </div>
        {/* Bagian untuk menampilkan detail produk dan kontrol kuantitas */}
        <div className="p-4 flex flex-col justify-center text-white glass backdrop-brightness-50 backdrop-blur-sm rounded">
          <h1 className="text-2xl font-bold py-3">{product.title}</h1>
          <p className="text-xl">{product.category}</p>
          <p className="text-xl font-bold py-2">$ {product.price}</p>

          <div className="py-4 flex items-center gap-4">
            {/* Kontrol kuantitas */}
            <div className="py-4 flex items-center">
              <button
                onClick={handleDecrease}
                className="border p-2 rounded mr-2"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-lg mx-2">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="border p-2 rounded ml-2"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Menampilkan total harga */}
            <div className="py-4">
              <p className="text-xl font-bold">
                Total Price: $ {total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Tombol untuk menambahkan ke keranjang dan membeli sekarang */}
          <div className="py-4 text-black">
            <button
              onClick={handleAddToCart}
              className="border p-2 rounded bg-yellow-400 mr-2"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="border p-2 rounded bg-yellow-400 ml-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
