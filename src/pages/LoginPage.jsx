import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, ChevronRight, Cake } from "lucide-react";
import { FaMotorcycle, FaBolt, FaMapMarkerAlt, FaMoneyBillWave, FaGoogle, FaFacebook } from "react-icons/fa";
import"./login.css"

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn, authUser } = useAuthStore();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(authUser){
      navigate('/')
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error sebelum mencoba login
    
    try {
      const user = await login(formData);
      if (user) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Login page error:', error);
      // Set pesan error berdasarkan respon
      setError(error.response.data.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
      {/* Left Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-200 to-orange-400"></div>
        <div className="absolute top-20 -left-20 w-40 h-40 rounded-full bg-orange-100/50 blur-xl"></div>
        <div className="absolute bottom-10 -right-10 w-32 h-32 rounded-full bg-orange-100/30 blur-xl"></div>

        <div className="w-full max-w-md space-y-8 z-10">
          {/* Logo and Welcome */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="flex flex-col items-center gap-3 group">
              <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-all duration-300 shadow-lg hover:shadow-orange-200/50">
                <Cake className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-3xl font-bold mt-4 text-gray-800">Welcome to <span className="text-orange-400">Pudding & Cake</span></h1>
              <p className="text-gray-500">Sign in to your delicious journey</p>
            </div>
          </div>
          {/* Tampilkan pesan error jika ada */}
        {error && (
          <div className="animate-fade-in bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:border-orange-200"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200 hover:border-orange-200"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-orange-500 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-orange-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-orange-500" />
                  )}
                </button>
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-xs text-orange-500 hover:text-orange-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Social Login */}
            <div className="flex flex-col space-y-3 pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                >
                  <FaGoogle className="text-red-500" />
                  Google
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                >
                  <FaFacebook className="text-blue-600" />
                  Facebook
                </button>
              </div>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center pt-4 animate-fade-in">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link 
                to="/signup" 
                className="font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Delivery Hero Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-orange-300 to-orange-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-300/20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-600/30 to-transparent z-0"></div>
        
        {/* Floating cakes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/5 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg animate-float-medium"></div>
        <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg animate-float-fast"></div>

        {/* Content */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 z-10 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg backdrop-blur-sm border border-white/20">
              <FaMotorcycle className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mt-6">Express Delivery</h2>
            <p className="text-orange-100 mt-2">Direct connection with our professional couriers</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20">
                <FaBolt className="text-white text-xl" />
              </div>
              <span className="font-semibold text-white text-sm">FAST</span>
              <span className="text-orange-100 text-xs">Under 30 mins</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <span className="font-semibold text-white text-sm">PRECISE</span>
              <span className="text-orange-100 text-xs">Accurate delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20">
                <FaMoneyBillWave className="text-white text-xl" />
              </div>
              <span className="font-semibold text-white text-sm">ECONOMICAL</span>
              <span className="text-orange-100 text-xs">Best prices</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-orange-100 italic">
              "Your favorite desserts delivered while they're still fresh!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;