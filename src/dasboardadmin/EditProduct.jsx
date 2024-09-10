import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ title: "", price: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`https://fakestoreapi.com/products/${id}`, product);
          Swal.fire("Saved!", "", "success").then(() => {
            navigate("/dashboard");
          });
        } catch (error) {
          console.error("Error updating product:", error);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="min-h-screen my-20 ">
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Product</h1>
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
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
