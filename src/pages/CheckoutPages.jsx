// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Define fixed shipping cost
  const shippingCost = 5.0; // Adjust as needed

  // Calculate sub-total
  const subTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate grand total
  const grandTotal = subTotal + shippingCost;

  const navigate = useNavigate();

  const handleCheckout = () => {
    Swal.fire({
      title: "Konfirmasi Checkout",
      text: "Apakah Anda yakin ingin melanjutkan ke pembayaran?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, lanjutkan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, proceed to send the WhatsApp message
        handlePesan();
      }
    });
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handlePesan = () => {
    // Redirect to WhatsApp with the formatted message
    window.location.href = `https://wa.me/+6282290525240?text=${encodeURIComponent(
      `Halo kak, nama saya ${name}. Saya ingin memesan ${cart
        .map((item) => item.title)
        .join(", ")} dengan total belanja $${grandTotal.toFixed(
        2
      )} dengan metode pembayaran ${paymentMethod} dan alamat ${address}`
    )}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-white shadow-md p-4">
        <button
          onClick={handleBack}
          className="text-blue-500 font-semibold flex items-center space-x-2"
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
          <span>Kembali</span>
        </button>
      </header>

      <main className="flex-grow p-6 md:p-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Pesanan
            </h2>
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-600">Keranjang anda kosong.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      $ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-gray-300 mt-4 pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Ringkasan Pesanan
              </h3>
              <p className="text-lg font-bold text-gray-800">
                Sub-Total: $ {subTotal.toFixed(2)}
              </p>
              <p className="text-lg font-bold text-gray-800">
                Pengiriman: $ {shippingCost.toFixed(2)}
              </p>
              <p className="text-xl font-bold text-gray-800">
                Total Harga: $ {grandTotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Informasi Pengiriman
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alamat Pengiriman
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metode Pembayaran
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="creditCard">Kartu Kredit</option>
                  <option value="paypal">PayPal</option>
                  <option value="bankTransfer">Transfer Bank</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Konfirmasi Pembayaran
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
