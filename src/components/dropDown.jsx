import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Settings, User, LogOut } from "lucide-react"; // Pastikan Anda mengimpor ikon dari library yang sesuai

const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    console.log("Logging out..."); // Ganti dengan fungsi logout Anda
  };

  const authUser = true; // Ganti dengan kondisi autentikasi Anda

  return (
    <div className="relative">
      {/* Tombol Titik Tiga */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="flex flex-col p-2">
            <Link
              to="/settings"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <User className="size-5" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors text-left"
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;