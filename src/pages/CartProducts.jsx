import React from "react";
import { useCart } from "../contexts/CartContext";
import Header from "../components/Header";

export default function CartProducts() {
  const { cart, getCartTotal, removeFromCart } = useCart();

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <Header />
      {/* tombol kembali */}
      <button
        onClick={handleBack}
        className=" mx-4 border p-2 rounded bg-gray-300 mb-4"
      >
        Back
      </button>

      <div className="p-4 container">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="mb-4">
                  <div className="border p-4 rounded">
                    <img src={item.image} alt={item.title} className="w-24" />
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p>Price: $ {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: $ {(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="border p-2 rounded bg-red-300 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">
                Total Price: $ {getCartTotal().toFixed(2)}
              </h2>
              <button
                onClick={() => alert("Proceeding to Checkout")}
                className="border p-2 rounded bg-green-300 mt-4"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
