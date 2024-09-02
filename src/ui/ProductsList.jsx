import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [products]);

  if (products.length === 0) {
    return <h1>loading... </h1>;
  }

  return (
    <div>
      <Header />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4  ">
        {products.map((product) => (
          <div key={product.id} className="border p-4 items-center ">
            <img
              src={product.image}
              alt={product.title}
              width={200}
              className="mx-auto py-4"
            />
            <div className="flex flex-col justify-end items-start ">
              <h3>{product.title}</h3>
              <p>{product.category}</p>
              <p>$ {product.price}</p>
              <Link
                to={`/products/${product.id}`}
                className="border p-2 rounded bg-green-300 mt-2 w-full"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
