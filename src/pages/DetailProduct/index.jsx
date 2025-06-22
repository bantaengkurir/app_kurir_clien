import React, { useEffect, useState } from "react";
import logo from "../../assets/image/avatar.jpg";
import useProductStore from "../../store/useProductStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BaggageClaim,
  CarTaxiFrontIcon,
  FolderClock,
  LogOut,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";

function DetailProduct() {
  const { id } = useParams();
  const { fetchProductById, productbyId, toggleCartSelection } = useProductStore();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, authUser } = useAuthStore();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addCartItem } = useProductStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  console.log("select variant", selectedVariant);

  // Mengumpulkan semua review dari semua variant
  const allReviews = productbyId?.variant?.flatMap((v) => v.review) || [];

  // Fungsi untuk render rating bintang
  const renderStars = (rating) => {
    const filledStars = rating || 0;
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-${index < filledStars ? "yellow" : "gray"}-500`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

   const handleAddToCart = async () => {
    if (!selectedVariant) {
      alert('Silakan pilih variant terlebih dahulu');
      return;
    }

    try {
      await addCartItem({
        id: selectedVariant.id,
        ...selectedVariant
      });
      setIsCartModalOpen(false);
      setSelectedVariant(null);
      toast.success('Berhasil menambahkan ke keranjang');
      navigate("/cart");
      window.location.reload();
    } catch (error) {
      console.error('Gagal menambahkan ke keranjang:', error);
    }
  };

      const handleBuyNow = async (variant) => {
    try {
      await toggleCartSelection(variant);
      toast.success('Produk berhasil ditambahkan ke keranjang!');
      navigate('/checkout');
    } catch (error) {
      console.error('Error toggling cart selection:', error);
      toast.error('Gagal menambahkan produk ke keranjang. Silakan coba lagi.');
      // Handle error, e.g., show a notification or alert
      
    }
  }

  console.log("ini product by id", productbyId);

  const calculateAverageRating = () => {
    if (!productbyId?.variant) return 0;

    let totalRating = 0;
    let reviewCount = 0;

    // Loop melalui semua variant dan reviewnya
    productbyId.variant.forEach((variant) => {
      variant.review?.forEach((review) => {
        if (review.rating !== null && review.rating > 0) {
          totalRating += review.rating;
          reviewCount++;
        }
      });
    });

    return reviewCount > 0 ? totalRating / reviewCount : 0;
  };

  // Fungsi untuk menghitung jumlah review yang valid
  const countValidReviews = () => {
    if (!productbyId?.variant) return 0;

    let count = 0;
    productbyId.variant.forEach((variant) => {
      count +=
        variant.review?.filter(
          (review) => review.rating !== null && review.rating > 0
        ).length || 0;
    });

    return count;
  };

  const averageRating = calculateAverageRating();
  const validReviewCount = countValidReviews();

  return (
    <div className="max-w-screen-md mx-auto px-4 font-sans">
      {/* Gambar Utama */}
      <div className="relative w-full mb-4">
        <img
          src={productbyId?.image_url} // Ganti dengan gambar produk
          alt="Produk"
          className="w-100 rounded-xl"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => navigate("/cart")}
            className="bg-white p-2 rounded-full shadow text-gray-600"
          >
            🛒
          </button>
          {/* Dropdown Menu Button */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="bg-white p-2 rounded-full shadow text-gray-600"
            >
              ⋯
            </button>

            {/* Dropdown Menu */}
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

      {/* Scrollable Variant */}
      <div className="mb-4">
  <div className="flex gap-3 pb-2 overflow-x-auto scrollbar-hide">
    {productbyId?.variant.map((variant, index) => (
      <div
        key={index}
        className="flex-shrink-0 w-20 h-20 rounded-lg border-2 border-gray-200 overflow-hidden hover:border-primary transition-all"
      >
        <img 
          src={variant.img_url} 
          className="w-full h-full object-cover"
          alt={`Variant ${variant.name || index}`}
        />
      </div>
    ))}
  </div>
</div>

      {/* Harga */}
      <div className="mb-1 flex items-center gap-2">
        <span className="text-2xl font-bold text-red-600">
          Rp. {productbyId?.price}
        </span>
        <span className="text-sm text-gray-400 line-through">Rp99.000</span>
      </div>
      {/* <div className="text-sm text-green-600 mb-2">Diskon 65% • Belanja min. Rp50.000 diskon Rp500</div> */}

      {/* Info Terjual */}
      <div className="text-sm text-gray-600 mb-2">
        {productbyId?.total_sold} terjual
      </div>

      {/* Judul Produk */}
      <h1 className="text-lg font-semibold mb-4">{productbyId?.name}</h1>
      {/* Deskripsi Produk */}
      <p className="text-sm text-gray-700 mb-4">{productbyId?.description}</p>

      {/* Rating Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1 text-sm">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="font-bold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-500">({validReviewCount} Ulasan)</span>
        </div>
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="text-blue-600 text-sm"
        >
          {showAllReviews ? "Tutup" : "Lihat Semua"}
        </button>
      </div>
      {/* All Reviews Section */}
      {showAllReviews && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Semua Ulasan</h2>

          {allReviews.length === 0 ? (
            <p className="text-gray-500">Belum ada ulasan untuk produk ini</p>
          ) : (
            allReviews
              .filter((review) => review.rating !== null && review.rating !== 0)
              .map((review) => (
                <div
                  key={review.id}
                  className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={logo}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-bold">
                      {review.user?.name || "Anonymous"}
                    </div>
                    {renderStars(review.rating)}
                    {review.comment && (
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    )}
                    <div className="text-sm text-gray-500 mt-2">
                      {new Date(review.rating_time).toLocaleDateString(
                        "id-ID",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* Tombol Sticky */}
      <div className="d-flex justify-between gap-4 bottom-0 left-0 right-0 bg-white border-t p-4 z-10 md:static md:border-0 md:p-0">
        <button
          onClick={() => setIsCartModalOpen(true)}
          className="w-full bg-orange-500 hover:bg-orange-700 transition text-white py-3 rounded-xl font-bold text-lg shadow"
        >
          <ShoppingCart className="inline mr-2" />
        </button>
      </div>
      {/* Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Pilih Variant</h3>
              <button
                onClick={() => {
                  setIsCartModalOpen(false);
                  setSelectedVariant(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Section Variant */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-700">Variant</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productbyId?.variant.map((variant) => (
                    <div
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative flex flex-col items-center p-2 rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${
                        selectedVariant?.id === variant.id ? 'ring-2 ring-orange-500' : ''
                      }`}
                    >
                      {selectedVariant?.id === variant.id && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      <img
                        src={variant.img_url}
                        className="w-full h-auto rounded-md mb-2 object-cover aspect-square"
                        alt={`Variant ${variant.name}`}
                      />
                      <p className="text-sm text-center font-medium">{variant.name}</p>
                      <p className="text-xs text-gray-500">Rp {variant.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex gap-2 bg-gray-50">
              <button
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  selectedVariant
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleAddToCart}
                disabled={!selectedVariant}
              >
                Masukkan ke Keranjang
              </button>
              {/* <button className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  selectedVariant
                    ? 'bg-blue-600 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleBuyNow(selectedVariant)}
                disabled={!selectedVariant}>
                Beli Sekarang
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailProduct;
