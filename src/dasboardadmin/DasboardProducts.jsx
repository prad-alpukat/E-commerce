import React, { useState, useEffect } from "react";
import axios from "axios";

// Komponen untuk Daftar Produk
function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.title}</td>
              <td className="py-2 px-4 border-b">${product.price}</td>
              <td className="py-2 px-4 border-b">{product.rating.count}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Komponen untuk Formulir Tambah/Edit Produk
function ProductForm({ onSubmit, product = {}, onCancel }) {
  const [name, setName] = useState(product.title || "");
  const [price, setPrice] = useState(product.price || "");
  const [stock, setStock] = useState(product.rating?.count || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: product.id, title: name, price, rating: { count: stock } });
  };

  return (
    <div className="p-5 bg-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {product.id ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            {product.id ? "Update Product" : "Add Product"}
          </button>
          {product.id && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Komponen Utama Dashboard Products
export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Ambil data produk dari Fakestoreapi saat komponen dimuat
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddProduct = (product) => {
    axios
      .post("https://fakestoreapi.com/products", product)
      .then((response) => {
        setProducts([...products, response.data]);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleUpdateProduct = (product) => {
    axios
      .put(`https://fakestoreapi.com/products/${product.id}`, product)
      .then((response) => {
        setProducts(
          products.map((p) => (p.id === product.id ? response.data : p))
        );
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Products</h1>
      <div className="mb-6 flex gap-6">
        <ProductList
          products={products}
          onEdit={handleEditClick}
          onDelete={handleDeleteProduct}
        />
        <ProductForm
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          product={editingProduct}
          onCancel={handleCancelEdit}
        />
      </div>
    </div>
  );
}
