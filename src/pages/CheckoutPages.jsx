import React, { useState } from "react";
import { useCart } from "../contexts/CartContext"; // Import context untuk akses cart

export default function CheckoutPage() {
  const { cart } = useCart(); // Ambil data keranjang dari context
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  // Hitung total harga keranjang
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout completed!");
    // Implementasi checkout logic di sini
  };

  const handleBack = () => {
    window.history.back();
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
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
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
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
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
                Address
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
                Payment Method
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
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Complete Purchase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
