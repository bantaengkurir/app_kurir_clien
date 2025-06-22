import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import useAuthStore from "../../store/useAuthStore";
import { FaMotorcycle, FaBolt, FaMapMarkerAlt, FaWallet, FaGoogle, FaFacebookF } from "react-icons/fa";
import LogoDissert from "../../assets/image/dissert.jpg"; // Pastikan path ini sesuai dengan struktur folder Anda

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useProductStore((state) => state.login);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const token = await login({ email, password }, navigate, setError);
    if (token) {
      setToken(token);
      localStorage.setItem('token', token);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background dengan overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: {LogoDissert} }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-300/80 to-purple-700/80"></div>
      </div>
      
      {/* Konten utama */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-8 z-10">
        {/* Form login */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-10">
            {/* Logo section */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">PC</span>
              </div>
              <h1 className="text-purple-700 font-bold text-2xl tracking-wide">Pudding & Cake</h1>
            </div>
            
            <h2 className="text-center text-green-500 text-2xl font-semibold mb-6">Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-5">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Login
              </button>
              
              <div className="text-center pt-2">
                <Link 
                  to="/register" 
                  className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
                >
                  Belum punya akun? Daftar
                </Link>
              </div>
              
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <FaGoogle className="text-red-500" />
                  Login with Google
                </button>
                
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <FaFacebookF />
                  Login with Facebook
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Bagian kurir (hidden on mobile) */}
        <div className="hidden lg:block w-1/2 max-w-md">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 sm:p-10 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaMotorcycle className="text-white text-4xl" />
            </div>
            
            <h3 className="text-purple-700 font-bold text-xl mb-6">
              TERHUBUNG LANGSUNG DENGAN KURIR
            </h3>
            
            <div className="flex justify-around my-8">
              <div className="flex flex-col items-center">
                <FaBolt className="text-purple-400 text-3xl mb-2" />
                <span className="font-semibold text-purple-700">CEPAT</span>
              </div>
              
              <div className="flex flex-col items-center">
                <FaMapMarkerAlt className="text-purple-400 text-3xl mb-2" />
                <span className="font-semibold text-purple-700">TEPAT</span>
              </div>
              
              <div className="flex flex-col items-center">
                <FaWallet className="text-purple-400 text-3xl mb-2" />
                <span className="font-semibold text-purple-700">HEMAT</span>
              </div>
            </div>
            
            <p className="text-gray-600 italic mt-6">
              Pesan kue dan pudding favoritmu, kami yang antar sampai depan pintu!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;