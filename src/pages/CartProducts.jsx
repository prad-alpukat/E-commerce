// src/pages/CartProducts.jsx
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

  // Define fixed shipping cost
  const shippingCost = 5.0; // You can adjust this as needed

  // Calculate sub-total
  const subTotal = getCartTotal();

  // Calculate grand total
  const grandTotal = subTotal + shippingCost;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Header /> {/* Komponen Header ditampilkan di bagian atas */}
      {/* Tombol untuk kembali ke halaman sebelumnya */}
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
        <h1 className="text-3xl font-bold text-white mb-6">
          Keranjang Belanja Anda
        </h1>

        {/* Jika keranjang kosong, tampilkan pesan kosong */}
        {cart.length === 0 ? (
          <p className="text-white">Keranjang Anda kosong.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tabel Produk untuk Layar Lebar */}
            <div className="w-full lg:w-2/3 overflow-x-auto bg-gray-800 rounded-lg shadow-lg hidden lg:block">
              <table className="min-w-full bg-gray-700 text-white">
                <thead>
                  <tr className="text-left border-b border-gray-600">
                    <th className="px-4 py-3">Gambar</th>
                    <th className="px-4 py-3">Judul</th>
                    <th className="px-4 py-3">Harga</th>
                    <th className="px-4 py-3">Kuantitas</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b border-gray-600">
                      <td className="px-4 py-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 bg-white object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-4">{item.title}</td>
                      <td className="px-4 py-4">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-4">{item.quantity}</td>
                      <td className="px-4 py-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-yellow-500 text-gray-900 p-2 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="32"
                              d="m112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                            />
                            <path
                              fill="currentColor"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeMiterlimit="10"
                              strokeWidth="32"
                              d="M80 112h352"
                            />
                            <path
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="32"
                              d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40m-64 64v224m-72-224l8 224m136-224l-8 224"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tampilan Mobile */}
            <div className="w-full lg:hidden">
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="mb-4 bg-gray-800 rounded-lg shadow-lg"
                  >
                    <div className="flex items-center p-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 bg-white object-cover rounded"
                      />
                      <div className="ml-4 text-white flex-1">
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p>Price: $ {item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>
                          Total: $ {(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-yellow-500 text-gray-900 mt-2 py-1 px-4 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ringkasan Pembelian */}
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 mt-4 lg:mt-0 lg:w-1/3">
              <h2 className="text-xl font-bold mb-4">Ringkasan Pembelian</h2>
              <p className="mb-2 border-b pb-2 border-gray-600">
                Sub-Total: ${subTotal.toFixed(2)}
              </p>
              <p className="mb-2 border-b pb-2 border-gray-600">
                Pengiriman: ${shippingCost.toFixed(2)}
              </p>
              <h2 className="text-2xl font-bold mb-4">
                Total Harga: ${grandTotal.toFixed(2)}
              </h2>
              <button
                onClick={handleBuyNow}
                className="bg-yellow-500 text-gray-900 py-2 px-4 rounded-full hover:bg-yellow-400 transition-colors duration-300 w-full"
              >
                Lanjutkan ke Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
