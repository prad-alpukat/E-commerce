import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: "", price: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to create this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, create it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post("https://fakestoreapi.com/products", product);
          Swal.fire(
            "Created!",
            "Your product has been created.",
            "success"
          ).then(() => {
            navigate("/dashboard");
          });
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an error creating the product.",
            "error"
          );
          console.error("Error creating product:", error);
        }
      } else if (result.isDismissed) {
        Swal.fire("Cancelled", "Product creation has been cancelled.", "info");
      }
    });
  };

  return (
    <div className="min-h-screen my-20 ">
      <div className="p-6 max-w-lg mx-auto  rounded-lg shadow-lg bg-glass backdrop-blur-lg ">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Create Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-lg font-medium text-gray-700 mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={product.title}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="text-lg font-medium text-gray-700 mb-2"
            >
              Price:
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
