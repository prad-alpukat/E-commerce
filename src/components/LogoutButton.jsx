import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login"); // Arahkan ke halaman login setelah logout
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
