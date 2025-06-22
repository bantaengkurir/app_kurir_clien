// import { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import useProductStore from '../../store/useProductStore';
// import Navbar from '../../components/Navbar';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// };

// const RestaurantApp = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const { fetchProducts, productItems, fetchProductDescs, productDesc } = useProductStore();
//   const [processedData, setProcessedData] = useState({
//     popularProducts: [],    // Hanya dari productDesc
//     nearestProducts: [],   // Dari productItems
//     foodProducts: [],      // Dari productItems
//     drinkProducts: []      // Dari productItems
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchProducts();    // Untuk produk terdekat dan kategori
//       await fetchProductDescs(); // Hanya untuk produk populer
      
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           });
//         },
//         () => {
//           setUserLocation({ lat: -6.2088, lng: 106.8456 });
//         }
//       );
//     };
//     fetchData();
//   }, [fetchProducts, fetchProductDescs]);

//   useEffect(() => {
//     // if (productItems.length === 0 || !userLocation) return;

//     // // 1. Proses produk populer HANYA dari productDesc
//     // const popularProducts = [...productDesc]
//     //   .sort((a, b) => b.total_sold - a.total_sold);

//     if (productItems.length === 0 || !userLocation) return;

//   // 1. Proses produk populer HANYA dari productDesc (max 10 item)
//   const popularProducts = [...productDesc]
//     .sort((a, b) => b.total_sold - a.total_sold)
//     .slice(0, 10); // <-- Tambahkan ini untuk batasi 10 produk

//     // 2. Proses produk terdekat dari productItems
//     const nearestProducts = productItems.map(product => ({
//       ...product,
//       distance: calculateDistance(
//         userLocation.lat,
//         userLocation.lng,
//         parseFloat(product.seller.latitude),
//         parseFloat(product.seller.longitude)
//       )
//     })).sort((a, b) => a.distance - b.distance);

//     // 3. Proses kategori makanan/minuman dari productItems
//     const foodProducts = productItems.filter(p => 
//       p.category.toLowerCase() === 'makanan'
//     );
//     const drinkProducts = productItems.filter(p => 
//       p.category.toLowerCase() === 'minuman'
//     );

//     setProcessedData({
//       popularProducts,
//       nearestProducts,
//       foodProducts,
//       drinkProducts
//     });
//   }, [productItems, productDesc, userLocation]);




//   const ProductCard = ({ product }) => {
//     const calculateDeliveryTime = (distance) => {
//       const baseTime = 0;
//       const timePerKm = 5;
//       const minTime = Math.round(baseTime + timePerKm * distance);
//       return `${minTime}-${minTime + 5} min`;
//     };

//     console.log('ini product', productItems)
//     console.log('ini productDesc', productDesc)

//     // Fungsi untuk mendapatkan rating yang benar
//   const getProductRating = () => {
//     // Coba dapatkan rating dari product langsung
//     if (typeof product?.rating === 'number') {
//       return product.rating.toFixed(1);
//     }
//     // Coba dapatkan dari productDesc jika ada
//     const descProduct = productDesc.find(p => p.id === product.id);
//     if (descProduct && typeof descProduct.rating === 'number') {
//       return descProduct.rating.toFixed(1);
//     }
//     return '0.0'; // Fallback
//   };

//     return (
//       <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
        
//         <div className="relative">
//           <button onClick={() => navigate(`/product-detail/${product.id}/detail`)} className="w-full h-48">
//           <img 
//             src={product.image_url}
//             alt={product.name}
//             className="w-full h-48 object-cover"
//           />
//           </button>
//           {/* Label populer hanya muncul di produk populer */}
//           {processedData.popularProducts.some(p => p.id === product.id) && (
//             <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//               Populer
//             </span>
//           )}
//         </div>
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-2">{product.name}</h3>
//           <p className="text-gray-600 mb-2">Rp{product.price.toLocaleString()}</p>
//           <div className="flex justify-between items-center mb-3">
//             <span className="text-sm text-gray-500">{product.seller.name}</span>
//             <span className="flex items-center bg-green-50 px-2 py-1 rounded text-sm text-green-700">
//   ⭐ {getProductRating()}
// </span>
//           </div>
//           {/* Hanya tampilkan jarak untuk produk terdekat */}
//           {product.distance && (
//             <div className="flex justify-between text-sm text-gray-500">
//               <span>{calculateDeliveryTime(product.distance)}</span>
//               <span>{product.distance.toFixed(1)} km</span>
//             </div>
//           )}
//             <span className="text-sm text-gray-500">{product.total_sold || 0} terjual</span>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//              {/* Header */}
//        {/* <header className="bg-orange-500 text-white py-4 shadow-md">
//          <div className="container mx-auto px-4">
//            <h1 className="text-2xl font-bold">Food Delivery App</h1>
//          </div>
//        </header> */}

//        {/* Hero Carousel */}
//        <section className="relative h-64 md:h-96 mt-16">
//          <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={0}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 5000 }}
//           className="h-full"
//         >
//           <SwiperSlide>
//             <div className="relative h-full">
//               <img 
//                 src="https://source.unsplash.com/random/1600x900/?food" 
//                 alt="Food" 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-center text-white px-4">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4">Makanan Enak, Pengantaran Cepat</h2>
//                   <p className="text-lg md:text-xl">Pesan sekarang dan dapatkan diskon khusus</p>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="relative h-full">
//               <img 
//                 src="https://source.unsplash.com/random/1600x900/?drink" 
//                 alt="Drink" 
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                 <div className="text-center text-white px-4">
//                   <h2 className="text-3xl md:text-4xl font-bold mb-4">Minuman Segar Kapan Saja</h2>
//                   <p className="text-lg md:text-xl">Tersedia berbagai pilihan minuman kekinian</p>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         </Swiper>
//       </section>
      
//       <main className="container mx-auto px-4 py-8">
//         {/* Section Produk Populer */}
// <section className="mb-12">
//   <h2 className="text-2xl font-bold mb-6">Paling Populer</h2>
  
//   {processedData.popularProducts.length > 0 ? (
//     <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//       {processedData.popularProducts.map(product => (
//         <ProductCard key={`popular-${product.id}`} product={product} />
//       ))}
//     </div>
//   ) : (
//     <p className="text-gray-500 text-center py-8">Memuat produk populer...</p>
//   )}
// </section>

//         {/* Section Terdekat (hanya dari productItems) */}
//         <section className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Terdekat dengan Anda</h2>
//             {userLocation && (
//               <span className="text-sm text-gray-500">
//                 📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
//               </span>
//             )}
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {processedData.nearestProducts.map(product => (
//               <ProductCard key={`nearest-${product.id}`} product={product} />
//             ))}
//           </div>
//         </section>

//         {/* Section Makanan (hanya dari productItems) */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-6">Menu Makanan</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             {processedData.foodProducts.map(product => (
//               <ProductCard key={`food-${product.id}`} product={product} />
//             ))}
//           </div>
//         </section>

//         {/* Section Minuman (hanya dari productItems) */}
//         <section className="mb-12">
//           {
//             processedData.drinkProducts.length === 0 ? (
//               <></>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-bold mb-6">Menu Minuman</h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                   {processedData.drinkProducts.map(product => (
//                     <ProductCard key={`drink-${product.id}`} product={product} />
//                   ))}
//                 </div>
//               </>
//             )
//           }
          
//         </section>
//       </main>
//              {/* Footer */}
//        <footer className="bg-gray-800 text-white py-8">
//          <div className="container mx-auto px-4 text-center">
//            <p>© 2023 Food Delivery App. All rights reserved.</p>
//          </div>
//        </footer>
//     </div>
//   );
// };

// export default RestaurantApp;


import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useProductStore from '../../store/useProductStore';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaFire, FaMapMarkerAlt, FaUtensils, FaMugHot, FaList, FaStar, FaShoppingBag, FaSearch, FaTimes } from 'react-icons/fa';
import LogoMakanan from '../../assets/image/dissert.jpg'

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};




const RestaurantApp = () => {
  const [userLocation, setUserLocation] = useState(null);
  const { fetchProducts, productItems, fetchProductDescs, productDesc } = useProductStore();
  const [processedData, setProcessedData] = useState({
    popularProducts: [],
    nearestProducts: [],
    foodProducts: [],
    drinkProducts: []
  });
  const [activeSection, setActiveSection] = useState('all');
  const [filters, setFilters] = useState({
    popular: 'popularity',
    nearest: 'distance',
    food: 'default',
    drink: 'default'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fungsi baru untuk menangani pencarian
  const handleSearch = (e) => {
  e.preventDefault();
  if (searchTerm.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);    
    window.reload.location();
    setSearchTerm('');
    setShowSearchBar(false);
  }
};

  // Efek untuk menampilkan saran pencarian
  useEffect(() => {
    if (searchTerm.length > 1) {
      // Simulasi saran pencarian berdasarkan produk yang ada
      const searchResults = productItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(searchResults);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, productItems]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      await fetchProductDescs();

      // Simpan produk ke localStorage untuk diakses di halaman pencarian
    localStorage.setItem('products', JSON.stringify(productItems));
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setUserLocation({ lat: -6.2088, lng: 106.8456 });
        }
      );
    };
    fetchData();
  }, [fetchProducts, fetchProductDescs]);

  useEffect(() => {
    if (productItems.length === 0 || !userLocation) return;

    const popularProducts = [...productDesc]
      .sort((a, b) => b.total_sold - a.total_sold)
      .slice(0, 10);

    const nearestProducts = productItems.map(product => {
      const desc = productDesc.find(p => p.id === product.id);
      return {
        ...product,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          parseFloat(product.seller.latitude),
          parseFloat(product.seller.longitude)
        ),
        rating: desc ? desc.rating : 0,
        total_sold: desc ? desc.total_sold : 0
      };
    }).sort((a, b) => a.distance - b.distance);

    const foodProducts = productItems
      .filter(p => p.category.toLowerCase() === 'makanan')
      .map(product => {
        const desc = productDesc.find(p => p.id === product.id);
        return {
          ...product,
          rating: desc ? desc.rating : 0,
          total_sold: desc ? desc.total_sold : 0
        };
      });

    const drinkProducts = productItems
      .filter(p => p.category.toLowerCase() === 'minuman')
      .map(product => {
        const desc = productDesc.find(p => p.id === product.id);
        return {
          ...product,
          rating: desc ? desc.rating : 0,
          total_sold: desc ? desc.total_sold : 0
        };
      });

    setProcessedData({
      popularProducts,
      nearestProducts,
      foodProducts,
      drinkProducts
    });
  }, [productItems, productDesc, userLocation]);

  const handleFilterChange = (section, value) => {
    setFilters(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const sortProducts = (products, filterType) => {
    const productsCopy = [...products];
    
    switch (filterType) {
      case 'price_low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price_high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'rating':
        return productsCopy.sort((a, b) => b.rating - a.rating);
      case 'popularity':
        return productsCopy.sort((a, b) => b.total_sold - a.total_sold);
      case 'distance':
        return productsCopy.sort((a, b) => a.distance - b.distance);
      default:
        return productsCopy;
    }
  };

  const ProductCard = ({ product }) => {
    const calculateDeliveryTime = (distance) => {
      const baseTime = 0;
      const timePerKm = 5;
      const minTime = Math.round(baseTime + timePerKm * distance);
      return `${minTime}-${minTime + 5} min`;
    };

    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col border border-gray-100">
        <div className="relative pt-[100%]">
          <button 
            onClick={() => {navigate(`/product-detail/${product.id}/detail`), window.location.reload()}} 
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={product.image_url || 'https://via.placeholder.com/300'}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300';
              }}
            />
          </button>
          {processedData.popularProducts.some(p => p.id === product.id) && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
              POP
            </span>
          )}
        </div>
        <div className="p-2 flex-grow flex flex-col">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10 leading-tight">{product.name}</h3>
          <p className="text-gray-800 font-bold text-sm mb-1">Rp{product.price.toLocaleString()}</p>
          
          <div className="flex items-center mb-1">
            <span className="flex items-center text-yellow-500 mr-1">
              <FaStar className="text-xs" />
            </span>
            <span className="text-xs font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="mx-1 text-gray-300">•</span>
            <span className="text-xs text-gray-500">{product.total_sold || 0} terjual</span>
          </div>
          
          <div className="text-xs text-gray-500 mb-2 truncate">{product.seller.name}</div>
          
          {product.distance && (
            <div className="mt-auto flex justify-between text-xs">
              <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                {calculateDeliveryTime(product.distance)}
              </span>
              <span className="text-gray-500">{product.distance.toFixed(1)} km</span>
            </div>
          )}
          
          <button 
            onClick={() => navigate(`/product-detail/${product.id}/detail`)}
            className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1.5 rounded-full flex items-center justify-center transition-colors"
          >
            <FaShoppingBag className="mr-1 text-[10px]" />
            <span>Pesan</span>
          </button>
        </div>
      </div>
    );
  };

  const shouldShowSection = (section) => {
    return activeSection === 'all' || activeSection === section;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
            {/* Search Bar Modern */}
      <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 py-4 px-4 shadow-md mt-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-xl font-bold">Food Delivery App</h1>
              <p className="text-sm opacity-90">Pesan makanan favoritmu sekarang!</p>
            </div>

            {/* Desktop Search Bar */}
            {/* <div className="hidden md:block relative flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute left-5 top-5 text-gray-400">
                  <FaSearch />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari makanan, minuman, atau restoran..."
                  className="w-full pl-10 pr-24 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-800"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-4 rounded-full transition-colors"
                >
                  Cari
                </button>
                
                {suggestions.length > 0 && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl overflow-hidden">
                                            {suggestions.map(item => (
                <div 
                  key={`suggestion-mobile-${item.id}`}
                  className="p-3 hover:bg-orange-50 cursor-pointer flex items-center border-b border-gray-100 last:border-0"
                  onClick={() => {
                    navigate(`/product-detail/${item.id}/detail`);
                    setSearchTerm('');
                    setShowSearchBar(false);
                  }}
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/300'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </div>
                </div>
              ))}
                  </div>
                )}
              </form>
            </div> */}

            <div className="hidden md:block relative flex-1 max-w-2xl mx-4">
  <form onSubmit={handleSearch} className="relative">
  <div className="absolute left-5 top-5 text-gray-400">
    <FaSearch />
  </div>
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Cari makanan, minuman, atau restoran..."
    className="w-full pl-10 pr-24 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-800"
  />
  
  {/* Tombol remove value (X) - hanya muncul ketika searchTerm tidak kosong */}
  {searchTerm && (
    <button
      type="button"
      onClick={() => setSearchTerm('')}
      className="absolute right-24 top-3 text-gray-400 hover:text-gray-600 transition-colors"
    >
      <FaTimes />
    </button>
  )}
  
  {/* Tombol Cari */}
  <button
    type="submit"
    className="absolute right-2 top-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-4 rounded-full transition-colors"
  >
    Cari
  </button>
  
  {/* Suggestions dropdown */}
  {suggestions.length > 0 && (
    <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-xl overflow-hidden">
      {suggestions.map(item => (
        <div 
          key={`suggestion-${item.id}`}
          className="p-3 hover:bg-orange-50 cursor-pointer flex items-center border-b border-gray-100 last:border-0"
          onClick={() => {
            navigate(`/product-detail/${item.id}/detail`);
            setSearchTerm('');
            setShowSearchBar(false);
          }}
        >
          <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
            <img 
              src={item.image_url || 'https://via.placeholder.com/300'} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-sm">{item.name}</div>
            <div className="text-xs text-gray-500">{item.category}</div>
          </div>
        </div>
      ))}
    </div>
  )}
</form>
</div>
            
            {/* Mobile Search Button */}
            <button 
              className="md:hidden bg-white text-orange-500 px-4 py-2 rounded-full font-medium flex items-center shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setShowSearchBar(true)}
            >
              <FaSearch className="mr-2" />
              <span>Cari</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearchBar && (
        <div className="fixed top-0 left-0 right-0 bg-white z-50 p-3 shadow-lg md:hidden">
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="flex-1 flex">
              <div className="absolute left-7 top-7 text-gray-400">
                <FaSearch />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari makanan, minuman..."
                className="flex-1 pl-10 pr-20 py-1 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
                autoFocus
              />
              {searchTerm && (
                <button
      type="button"
      onClick={() => setSearchTerm('')}
      className="absolute right-28 me-2 top-4 text-gray-400 hover:text-gray-600 transition-colors size-3"
    >
      <FaTimes />
    </button>
  )}
              
              <button
                type="submit"
                className="absolute right-10 top-3 bg-orange-500 hover:bg-orange-600 text-white font-medium py-1.5 px-4 rounded-full transition-colors"
              >
                Cari
              </button>
            </form>
            <button 
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                setShowSearchBar(false);
                setSearchTerm('');
                setSuggestions([]);
              }}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          
          {/* Mobile Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map(item => (
                <div 
                  key={`suggestion-mobile-${item.id}`}
                  className="p-3 hover:bg-orange-50 cursor-pointer flex items-center border-b border-gray-100 last:border-0"
                  onClick={() => {
                    navigate(`/product-detail/${item.id}/detail`);
                    setSearchTerm('');
                    setShowSearchBar(false);
                  }}
                >
                  <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/300'} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <section className="relative h-full md:h-80">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-full"
        >
          <SwiperSlide>
            <div className="relative h-full">
              <img 
                src={LogoMakanan}
                alt="Food" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">Makanan Enak, Pengantaran Cepat</h2>
                  <p className="text-sm md:text-base max-w-md mx-auto">
                    Pesan sekarang dan dapatkan diskon khusus
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full">
              <img 
                src={LogoMakanan}
                alt="Drink" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">Minuman Segar Kapan Saja</h2>
                  <p className="text-sm md:text-base max-w-md mx-auto">
                    Tersedia berbagai pilihan minuman kekinian
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>


      {/* Search Bar untuk Mobile */}
      {/* {showSearchBar && (
        <div className="bg-white py-3 px-4 shadow-md md:hidden">
          <div className="relative">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari makanan, minuman..."
                className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 rounded-r-full"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      )} */}
   
      
      <main className="container mx-auto px-3 py-4">
        {/* Filter Buttons */}
        <div className='flex justify-between items-center mb-4 overflow-x-auto pb-3 scrollbar-hide'>
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveSection('all')}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === 'all' 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              <FaList className="mr-1 text-xs" /> Semua
            </button>
            
            <button 
              onClick={() => setActiveSection('popular')}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === 'popular' 
                  ? 'bg-red-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              <FaFire className="mr-1 text-xs" /> Populer
            </button>
            
            <button 
              onClick={() => setActiveSection('nearest')}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === 'nearest' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              <FaMapMarkerAlt className="mr-1 text-xs" /> Terdekat
            </button>
            
            <button 
              onClick={() => setActiveSection('food')}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === 'food' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              <FaUtensils className="mr-1 text-xs" /> Makanan
            </button>
            
            <button 
              onClick={() => setActiveSection('drink')}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                activeSection === 'drink' 
                  ? 'bg-purple-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              <FaMugHot className="mr-1 text-xs" /> Minuman
            </button>
          </div>
        </div>

        {/* Section Produk Populer */}
        {shouldShowSection('popular') && (
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3 px-1">
              <h2 className="text-base font-bold flex items-center">
                <FaFire className="text-red-500 mr-2 text-xs" /> Paling Populer
              </h2>
              <div className="relative">
                <select 
                  value={filters.popular} 
                  onChange={(e) => handleFilterChange('popular', e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg py-1 px-2 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="popularity">Paling Laris</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="price_low">Harga Terendah</option>
                  <option value="price_high">Harga Tertinggi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            {processedData.popularProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-3">
                {sortProducts(processedData.popularProducts, filters.popular).map(product => (
                  <ProductCard key={`popular-${product.id}`} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4 text-center">
                <p className="text-gray-500 text-sm">Memuat produk populer...</p>
              </div>
            )}
          </section>
        )}

        {/* Section Terdekat */}
        {shouldShowSection('nearest') && (
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3 px-1">
              <div className="flex items-center">
                <h2 className="text-base font-bold flex items-center mr-2">
                  <FaMapMarkerAlt className="text-blue-500 mr-2 text-xs" /> Terdekat
                </h2>
              </div>
              <div className="relative">
                <select 
                  value={filters.nearest} 
                  onChange={(e) => handleFilterChange('nearest', e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg py-1 px-2 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="distance">Jarak Terdekat</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="popularity">Paling Laris</option>
                  <option value="price_low">Harga Terendah</option>
                  <option value="price_high">Harga Tertinggi</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-3">
              {sortProducts(processedData.nearestProducts, filters.nearest).map(product => (
                <ProductCard key={`nearest-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section Makanan */}
        {shouldShowSection('food') && (
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3 px-1">
              <h2 className="text-base font-bold flex items-center">
                <FaUtensils className="text-green-500 mr-2 text-xs" /> Makanan
              </h2>
              <div className="relative">
                <select 
                  value={filters.food} 
                  onChange={(e) => handleFilterChange('food', e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg py-1 px-2 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="price_low">Harga Terendah</option>
                  <option value="price_high">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="popularity">Paling Laris</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-3">
              {sortProducts(processedData.foodProducts, filters.food).map(product => (
                <ProductCard key={`food-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section Minuman */}
        {shouldShowSection('drink') && processedData.drinkProducts.length > 0 && (
          <section className="mb-6">
            <div className="flex justify-between items-center mb-3 px-1">
              <h2 className="text-base font-bold flex items-center">
                <FaMugHot className="text-purple-500 mr-2 text-xs" /> Minuman
              </h2>
              <div className="relative">
                <select 
                  value={filters.drink} 
                  onChange={(e) => handleFilterChange('drink', e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg py-1 px-2 text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="price_low">Harga Terendah</option>
                  <option value="price_high">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="popularity">Paling Laris</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                  <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-3">
              {sortProducts(processedData.drinkProducts, filters.drink).map(product => (
                <ProductCard key={`drink-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-4 text-xs">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Food Delivery App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantApp;