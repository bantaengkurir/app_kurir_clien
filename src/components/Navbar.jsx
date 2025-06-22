
import { Link } from "react-router-dom";
import  useAuthStore  from "../store/useAuthStore";
import { BaggageClaim, FolderClock, Home, LogOut, MessageCircle, MessageCircleMore, MessageSquare, Rat, RatIcon, RatioIcon, Settings, ShoppingCart, Sparkles, User, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useProductStore from "../store/useProductStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { isConnected } = useProductStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef(null);  const buttonRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Jika klik di luar dropdown DAN di luar tombol toggle
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Tambahkan event listener ketika komponen mount
    document.addEventListener("mousedown", handleClickOutside);
    
    // Bersihkan ketika komponen unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
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
                <MessageSquare className="w-5 h-5 text-orange-700" />
              </div>
              <h1 className="text-lg font-bold text-orange-700">Bantaeng Puding</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
      {/* Tombol Chat */}
      <Link
        to="/home"
        style={{ textDecoration: "none" }}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 text-orange-700 rounded-md transition-colors text-decoration-non"
      >
        <MessageCircleMore className="w-5 h-5" />
        <span className="hidden sm:inline">Chat</span>
      </Link>

      {/* Tombol Keranjang */}
      <Link
        to="/cart"
        style={{ textDecoration: "none" }}
        className="flex items-center gap-2 p-2 hover:bg-gray-100 text-orange-700 rounded-md transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        <span className="hidden sm:inline ">Keranjang</span>
      </Link>

      {/* Tombol Titik Tiga dan Menu Dropdown */}
      <div className="relative">
       <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
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
         <div 
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
            <div className="flex flex-col p-2">
              

              {authUser && (
                <>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors"
                  >
                    <Home className="size-5 hover:text-white" />
                    <span className="hover:text-white">Home</span>
                  </Link>
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors"
                  >
                    <User className="size-5 hover:text-white" />
                    <span className="hover:text-white">Profile</span>
                  </Link>
                  <Link
                    to="/checkout"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors"
                  >
                    <BaggageClaim className="size-5 hover:text-white" />
                    <span className="hover:text-white">Checkout</span>
                  </Link>
                  <Link
                    to="/payment"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors"
                  >
                    <Wallet className="size-5 hover:text-white" />
                    <span className="hover:text-white">Payment</span>
                  </Link>
                  <Link
                    to="/orderhistories"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors"
                  >
                    <FolderClock className="size-5 hover:text-white" />
                    <span className="hover:text-white">Order History</span>
                  </Link>
                  <Link
                    to="/ratinglist"
                    style={{ textDecoration: "none", color: "black" }}
                    className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors"
                  >
                    <Sparkles className="size-5  hover:text-white" />
                    <span className="hover:text-white">Ratings</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors text-left"
                  >
                    <LogOut className="size-5 hover:text-white" />
                    <span className="hover:text-white">Logout</span>
                  </button>
                </>
              )}
              <Link
                to="/settings"
                    style={{ textDecoration: "none", color: "black" }}
                className="flex items-center gap-2 p-2 hover:bg-orange-400 text hover:text-white rounded-md transition-colors"
              >
                <Settings className="w-4 h-4 hover:text-white" />
                <span className="hover:text-white">Settings</span>
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
