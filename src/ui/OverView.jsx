import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OverView() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className=" py-10 ">
      <h1 className="text-4xl font-bold mb-6 text-white ms-6">Overview</h1>
      <div className="flex overflow-x-auto space-x-2 scrollbar-hide p-4 glass backdrop-brightness-50">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center w-64 flex-shrink-0 "
          >
            <img
              src={product.image}
              alt={product.title}
              className="mx-auto py-4 aspect-square w-full object-contain hover:scale-110 transition duration-300"
            />
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
