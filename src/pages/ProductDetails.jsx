import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../contexts/CartContext"; // Import useCart

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // akses addToCart dari useCart (api context)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setTotal(data.price);
      });
  }, [id]);

  useEffect(() => {
    if (product.price) {
      setTotal(product.price * quantity);
    }
  }, [quantity, product.price]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddToCart = () => {
    const cartItem = { ...product, quantity };
    addToCart(cartItem);
    alert(`${product.title} di tambahkan ke keranjang!`);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handleBack = () => {
    // Menggunakan navigate
    // navigate(-1); // Mengembalikan ke halaman sebelumnya
    window.history.back(); // Mengembalikan ke halaman sebelumnya
  };

  return (
    <div div className="mt-16 bg-slate-800 min-h-screen">
      <Header />
      <button
        onClick={handleBack}
        className=" mx-4 border p-2 rounded bg-gray-300 mb-4 mt-5"
      >
        Back
      </button>

      <div className="container p-4 grid md:grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="border-2 rounded p-4 bg-white">
          <img
            src={product.image}
            alt={product.title}
            className="mx-auto p-4 h-96 w-96 "
          />
        </div>
        <div className="p-4 flex flex-col justify-center text-white glass backdrop-brightness-50 backdrop-blur-sm rounded ">
          <h1 className="text-2xl font-bold py-3">{product.title}</h1>
          <p className="text-xl">{product.category}</p>
          <p className="text-xl font-bold py-2">$ {product.price}</p>

          <div className="py-4 flex items-center gap-4">
            {/* Quantity Controls */}
            <div className="py-4 flex items-center">
              <button
                onClick={handleDecrease}
                className="border p-2 rounded  mr-2"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-lg mx-2">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="border p-2 rounded  ml-2"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <div className="py-4">
              <p className="text-xl font-bold">
                Total Price: $ {total.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Buttons */}
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
