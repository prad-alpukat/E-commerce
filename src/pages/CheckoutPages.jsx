import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
        // Jika pengguna mengkonfirmasi, navigasi ke halaman struk nota
        handlePesan();
      }
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  // Fungsi untuk menangani aksi klik pada tombol "Pesan Sekarang"
  const handlePesan = () => {
    // Redirect ke WhatsApp dengan format pesan yang telah ditentukan
    window.location.href = `https://wa.me/+6282290525240?text=${`Halo kak, nama saya ${name} saya ingin memesan ${cart[0]["title"]}  dengan total belanja $ ${totalAmount} dengan metode pembayaran ${paymentMethod} dan alamat ${address}`}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <button
        onClick={handleBack}
        className="my-5 border p-2 rounded bg-gray-300 "
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Pesanan</h2>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <p>Keranjang anda kosong.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-lg font-bold">
                    $ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="border-t mt-4 pt-4">
            <h3 className="text-xl font-semibold">Total Amount</h3>
            <p className="text-lg font-bold">$ {totalAmount.toFixed(2)}</p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-white p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Informasi Pengiriman</h2>
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
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
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
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metode Pembayaran
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>
            <button
              type="submit"
              onSubmit={handlePesan}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Pembayaran Berhasil
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
