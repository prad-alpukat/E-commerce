import React from "react";
import { useLocation } from "react-router-dom";
import Products from "./AllProducts";

export default function NotaPage() {
  const { state } = useLocation();
  const { cart, totalAmount, name, address, paymentMethod, title, products } =
    state || {};

  if (!cart || !totalAmount) {
    return <p>tidak ada nota yang tersedia.</p>;
  }

  const handlePrint = () => {
    window.location.href = `https://wa.me/+6282290525240?text=${`Halo kak, nama saya ${name} saya ingin memesan ${title}   dengan total belanja $ ${totalAmount} dengan metode pembayaran ${paymentMethod} dan alamat ${address}`}`;
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <button
        onClick={handleBack}
        className="my-5 border p-2 rounded bg-gray-300 mx-6 ms-20"
      >
        Back
      </button>
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Detail Pemesanan</h1>
        <div className="bg-white p-6 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Pesanan</h2>
          <div className="space-y-4">
            {cart.map((item) => (
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
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <h3 className="text-xl font-semibold">Total Belanja</h3>
            <p className="text-lg font-bold">$ {totalAmount.toFixed(2)}</p>
          </div>
          <div className="border-t mt-4 pt-4">
            <h3 className="text-xl font-semibold">Informasi Pemesanan</h3>
            <p>Nama: {name}</p>
            <p>Alamat: {address}</p>
            <p>Metode Pembayaran: {paymentMethod}</p>
          </div>
          <button
            onClick={handlePrint}
            className="my-5 border p-2 rounded bg-gray-300 w-1/4 "
          >
            Pesan Sekarang
          </button>
        </div>
      </div>
    </>
  );
}
