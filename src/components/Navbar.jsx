
import { Link } from "react-router-dom";
import  useAuthStore  from "../store/useAuthStore";
import { BaggageClaim, FolderClock, LogOut, MessageCircle, MessageCircleMore, MessageSquare, Rat, RatIcon, RatioIcon, Settings, ShoppingCart, Sparkles, User, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import useProductStore from "../store/useProductStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { isConnected } = useProductStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };


    // Optional: Tampilkan status koneksi
    useEffect(() => {
      console.log("Connection status:", isConnected ? "Connected" : "Disconnected");
    }, [isConnected]);

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
        
          <div className="flex items-center gap-8">
              {/* Optional: Tampilkan indikator status koneksi */}
      <div className="connection-status">
        {isConnected ? "🟢" : "🔴"}
      </div>
            <Link to="/home"
        style={{ textDecoration: "none" }}
             className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">BangKurir</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
      {/* Tombol Chat */}
      <Link
        to="/home"
        style={{ textDecoration: "none" }}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors text-decoration-non"
      >
        <MessageCircleMore className="w-5 h-5" />
        <span className="hidden sm:inline">Chat</span>
      </Link>

      {/* Tombol Keranjang */}
      <Link
        to="/cart"
        style={{ textDecoration: "none" }}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="hidden sm:inline ">Keranjang</span>
      </Link>

      {/* Tombol Titik Tiga dan Menu Dropdown */}
      <div className="relative">
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
              

              {authUser && (
                <>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <User className="size-5" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/checkout"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <BaggageClaim className="size-5" />
                    <span>Checkout</span>
                  </Link>
                  <Link
                    to="/payment"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Wallet className="size-5" />
                    <span>Payment</span>
                  </Link>
                  <Link
                    to="/orderhistories"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <FolderClock className="size-5" />
                    <span>Order History</span>
                  </Link>
                  <Link
                    to="/ratinglist"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Sparkles className="size-5" />
                    <span>Ratings</span>
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
              <Link
                to="/settings"
                    style={{ textDecoration: "none", color: "black" }}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
