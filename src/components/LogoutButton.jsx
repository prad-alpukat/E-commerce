import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userToken"); // Menghapus token pengguna dari localStorage setelah logout
        navigate("/login"); // Arahkan ke halaman login setelah logout
      }
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
    >
      <FaSignOutAlt className="mr-2" /> Logout
    </button>
  );
}
