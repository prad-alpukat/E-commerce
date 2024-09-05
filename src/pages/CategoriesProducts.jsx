import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function CategoriesProducts() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("electronics");
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // akses addToCart dari useCart (api context)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    const cartItem = { ...product, quantity };
    addToCart(cartItem);
    alert(`${product.title} di tambahkan ke keranjang!`);
  };

  return (
    <div className="container p-4 ">
      <h1 className="text-3xl font-bold mb-4 text-white">
        Products by Category
      </h1>

      {/* Category Buttons */}
      <div className="mb-6 flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`p-4 border border-gray-300 rounded-lg shadow-sm 
            
              ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-transparent  backdrop-blur-sm text-white glass backdrop-brightness-50"
              } 
              transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white active:bg-blue-700 active:text-white`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border p-4 rounded shadow-md bg-gray-50"
          >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto py-4 aspect-square w-full object-contain"
            />
            {/* <h2 className="text-xl font-semibold mb-2">{product.title}</h2> */}
            {/* <p className="text-lg font-bold mb-2">{product.title}</p> */}
            <p className="text-lg font-bold mb-2">$ {product.price}</p>
            <p className="text-sm mb-2">{product.category}</p>
            <div className="flex items-center mb-2"></div>
            <div className="flex justify-between gap-4 ">
              <div className="grid grid-cols-2 gap-4 my-auto">
                <Link
                  to={`/products/${product.id}`}
                  className="border p-2 rounded bg-yellow-400 mt-2 w-full text-center"
                >
                  View
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-green-500 text-white p-2 rounded mt-2 w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
