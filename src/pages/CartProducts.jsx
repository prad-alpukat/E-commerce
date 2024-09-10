import React from "react";
import { useCart } from "../contexts/CartContext"; // Import hook untuk mengakses context cart
import Header from "../components/Header"; // Import komponen Header
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi ke halaman lain
import Swal from "sweetalert2"; // Import SweetAlert2 untuk menampilkan notifikasi
export default function CartProducts() {
  // Ambil data dan fungsi dari context cart
  const { cart, getCartTotal, removeFromCart } = useCart();
  // Inisialisasi useNavigate untuk navigasi halaman
  const navigate = useNavigate();

  // Fungsi untuk kembali ke halaman sebelumnya
  const handleBack = () => {
    window.history.back(); // Menggunakan history API untuk navigasi ke halaman sebelumnya
  };

  // Fungsi untuk menavigasi ke halaman checkout
  const handleBuyNow = () => {
    // Tampilkan SweetAlert konfirmasi
    Swal.fire({
      title: "Lanjutkan ke Checkout?",
      text: "Anda akan diarahkan ke halaman checkout. Apakah Anda yakin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengkonfirmasi, navigasi ke halaman checkout
        navigate("/checkout");
      }
    });
  };

  return (
    <div className="mt-16 bg-slate-800 min-h-screen">
      <Header /> {/* Komponen Header ditampilkan di bagian atas */}
      {/* Tombol untuk kembali ke halaman sebelumnya */}
      <button
        onClick={handleBack}
        className="mx-4 border p-2 rounded bg-gray-300 mb-4 mt-5"
      >
        Back
      </button>
      <div className="p-4 container text-white">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {/* Jika keranjang kosong, tampilkan pesan kosong */}
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {/* Loop untuk menampilkan setiap item dalam keranjang */}
              {cart.map((item) => (
                <li key={item.id} className="mb-4">
                  <div className="border p-4 rounded flex items-center text-white">
                    {/* Gambar produk */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 bg-white object-cover mr-4 px-4 py-10 rounded"
                    />
                    {/* Detail produk dan tombol hapus */}
                    <div className="flex-1 glass backdrop-brightness-50 py-2 px-5 rounded">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p>Price: $ {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: $ {(item.price * item.quantity).toFixed(2)}</p>
                      {/* Tombol untuk menghapus item dari keranjang */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="border p-2 rounded bg-yellow-400 mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              {/* Tampilkan total harga dari semua item */}
              <h2 className="text-2xl font-bold">
                Total Price: $ {getCartTotal().toFixed(2)}
              </h2>
              {/* Tombol untuk melanjutkan ke halaman checkout */}
              <button
                onClick={handleBuyNow}
                className="border p-2 rounded bg-yellow-400 text-black mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
