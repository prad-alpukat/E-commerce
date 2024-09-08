import React from "react";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CartProducts() {
  const { cart, getCartTotal, removeFromCart } = useCart();
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleBack = () => {
    window.history.back();
  };

  const handleBuyNow = () => {
    navigate("/checkout"); // Arahkan ke halaman checkout
  };

  return (
    <div className="mt-16 bg-slate-800 min-h-screen">
      <Header />
      {/* tombol kembali */}
      <button
        onClick={handleBack}
        className="mx-4 border p-2 rounded bg-gray-300 mb-4 mt-5"
      >
        Back
      </button>

      <div className="p-4 container text-white">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="mb-4">
                  <div className="border p-4 rounded flex items-center  text-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 bg-white object-cover mr-4 px-4 py-10 rounded"
                    />
                    <div className="flex-1 glass backdrop-brightness-50 py-2 px-5 rounded">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p>Price: $ {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: $ {(item.price * item.quantity).toFixed(2)}</p>
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
              <h2 className="text-2xl font-bold">
                Total Price: $ {getCartTotal().toFixed(2)}
              </h2>
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
