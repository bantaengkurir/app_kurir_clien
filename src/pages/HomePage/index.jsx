// // import { useState, useEffect } from 'react';
// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";
// // import Carousel from "../../components/Carousel";
// // import Feature from "../../components/Features";
// // import FruitShop from "../../components/Fruits-shop";
// // import Visitable from "../../components/Visitable-shop";
// // import Testimonial from "../../components/Testimonial";
// // import BestSeller from "../../components/BestSeller";
// // import "./style.css";

// // const Loading = () => (
// //   <div className="loader-container">
// //     <div className=""></div>
// //   </div>
// // );

// // const Index = () => {
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     // Simulasi pemanggilan API atau data fetching
// //     setTimeout(() => {
// //       setIsLoading(false);
// //     }, 2000); // Misalnya 2 detik
// //   }, []);

// //   if (isLoading) {
// //     return <Loading />;
// //   }

// //   return (
// //     <>
// //       <Navbar />
// //       <Carousel />
// //       <Feature />
// //       <FruitShop />
// //       <Visitable />
// //       <BestSeller />
// //       <Testimonial />
// //       <Footer />
// //     </>
// //   );
// // };

// // export default Index;

// import { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import useProductStore from '../../store/useProductStore';

// // Data dummy restoran
// const restaurantData = [
//   {
//     id: 1,
//     name: "Burger King",
//     category: "makanan",
//     type: "fastfood",
//     rating: 4.8,
//     deliveryTime: "25-30 min",
//     distance: 1.2, // dalam km
//     popular: true,
//     image: "https://source.unsplash.com/random/300x200/?burger"
//   },
//   {
//     id: 2,
//     name: "Starbucks",
//     category: "minuman",
//     type: "coffee",
//     rating: 4.7,
//     deliveryTime: "15-20 min",
//     distance: 0.8,
//     popular: true,
//     image: "https://source.unsplash.com/random/300x200/?coffee"
//   },
//   {
//     id: 3,
//     name: "Sushi Tei",
//     category: "makanan",
//     type: "japanese",
//     rating: 4.5,
//     deliveryTime: "35-40 min",
//     distance: 2.5,
//     popular: false,
//     image: "https://source.unsplash.com/random/300x200/?sushi"
//   },
//   {
//     id: 4,
//     name: "J.CO Donuts",
//     category: "makanan",
//     type: "dessert",
//     rating: 4.6,
//     deliveryTime: "20-25 min",
//     distance: 1.8,
//     popular: true,
//     image: "https://source.unsplash.com/random/300x200/?donut"
//   },
//   {
//     id: 5,
//     name: "Chatime",
//     category: "minuman",
//     type: "bubbletea",
//     rating: 4.3,
//     deliveryTime: "15-20 min",
//     distance: 1.1,
//     popular: false,
//     image: "https://source.unsplash.com/random/300x200/?bubbletea"
//   },
//   {
//     id: 6,
//     name: "KFC",
//     category: "makanan",
//     type: "fastfood",
//     rating: 4.4,
//     deliveryTime: "20-30 min",
//     distance: 1.5,
//     popular: true,
//     image: "https://source.unsplash.com/random/300x200/?friedchicken"
//   },
//   {
//     id: 7,
//     name: "Boba Time",
//     category: "minuman",
//     type: "bubbletea",
//     rating: 4.2,
//     deliveryTime: "10-15 min",
//     distance: 0.5,
//     popular: false,
//     image: "https://source.unsplash.com/random/300x200/?boba"
//   }
// ];

// const RestaurantApp = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const {fetchProducts, productItems, fetchProductDescs, productDesc} = useProductStore();

//   useEffect(()=> {
//     fetchProducts();
//     fetchProductDescs();
//   }, [fetchProducts, fetchProductDescs])

//   console.log('product items', productItems)
//   console.log('product Desc', productDesc)

//   // Simulasi mendapatkan lokasi user
//   useEffect(() => {
//     // Ini hanya simulasi, di production gunakan API geolocation
//     setTimeout(() => {
//       setUserLocation({
//         lat: -6.2088,
//         lng: 106.8456
//       });
//     }, 1000);
//   }, []);

//   // Pisahkan makanan dan minuman
//   const foodItems = restaurantData.filter(item => item.category === "makanan");
//   const drinkItems = restaurantData.filter(item => item.category === "minuman");

//   // Ambil 3 restoran terpopuler
//   const popularItems = [...restaurantData]
//     .sort((a, b) => b.popular - a.popular || b.rating - a.rating)
//     .slice(0, 3);

//   // Ambil 3 restoran terdekat
//   const nearestItems = [...restaurantData]
//     .sort((a, b) => a.distance - b.distance)
//     .slice(0, 3);

//   // Komponen card restoran
//   const RestaurantCard = ({ restaurant }) => (
//     <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
//       <div className="relative">
//         <img 
//           src={restaurant.image} 
//           alt={restaurant.name}
//           className="w-full h-48 object-cover"
//         />
//         {restaurant.popular && (
//           <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
//             Populer
//           </span>
//         )}
//       </div>
//       <div className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="font-bold text-lg">{restaurant.name}</h3>
//           <span className="flex items-center bg-green-50 px-2 py-1 rounded text-sm text-green-700">
//             ⭐ {restaurant.rating}
//           </span>
//         </div>
//         <div className="flex justify-between text-sm text-gray-500 mb-3">
//           <span>{restaurant.deliveryTime}</span>
//           <span>{restaurant.distance} km</span>
//         </div>
//         <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">
//           Pesan Sekarang
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-orange-500 text-white py-4 shadow-md">
//         <div className="container mx-auto px-4">
//           <h1 className="text-2xl font-bold">Food Delivery App</h1>
//         </div>
//       </header>

//       {/* Hero Carousel */}
//       <section className="relative h-64 md:h-96">
//         <Swiper
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

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Section Terdekat */}
//         <section className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Terdekat dengan Anda</h2>
//             {userLocation && (
//               <span className="text-sm text-gray-500">
//                 📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
//               </span>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {nearestItems.map(restaurant => (
//               <RestaurantCard key={`nearest-${restaurant.id}`} restaurant={restaurant} />
//             ))}
//           </div>
//         </section>

//         {/* Section Populer */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-6">Paling Populer</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {popularItems.map(restaurant => (
//               <RestaurantCard key={`popular-${restaurant.id}`} restaurant={restaurant} />
//             ))}
//           </div>
//         </section>

//         {/* Section Makanan */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-6">Menu Makanan</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {foodItems.map(restaurant => (
//               <RestaurantCard key={`food-${restaurant.id}`} restaurant={restaurant} />
//             ))}
//           </div>
//         </section>

//         {/* Section Minuman */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-6">Menu Minuman</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {drinkItems.map(restaurant => (
//               <RestaurantCard key={`drink-${restaurant.id}`} restaurant={restaurant} />
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-4 text-center">
//           <p>© 2023 Food Delivery App. All rights reserved.</p>
//         </div>
//       </footer>
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
    popularProducts: [],    // Hanya dari productDesc
    nearestProducts: [],   // Dari productItems
    foodProducts: [],      // Dari productItems
    drinkProducts: []      // Dari productItems
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();    // Untuk produk terdekat dan kategori
      await fetchProductDescs(); // Hanya untuk produk populer
      
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

    // 1. Proses produk populer HANYA dari productDesc
    const popularProducts = [...productDesc]
      .sort((a, b) => b.total_sold - a.total_sold);

    // 2. Proses produk terdekat dari productItems
    const nearestProducts = productItems.map(product => ({
      ...product,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        parseFloat(product.seller.latitude),
        parseFloat(product.seller.longitude)
      )
    })).sort((a, b) => a.distance - b.distance);

    // 3. Proses kategori makanan/minuman dari productItems
    const foodProducts = productItems.filter(p => 
      p.category.toLowerCase() === 'makanan'
    );
    const drinkProducts = productItems.filter(p => 
      p.category.toLowerCase() === 'minuman'
    );

    setProcessedData({
      popularProducts,
      nearestProducts,
      foodProducts,
      drinkProducts
    });
  }, [productItems, productDesc, userLocation]);

  const ProductCard = ({ product }) => {
    const calculateDeliveryTime = (distance) => {
      const baseTime = 0;
      const timePerKm = 5;
      const minTime = Math.round(baseTime + timePerKm * distance);
      return `${minTime}-${minTime + 5} min`;
    };

    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
        
        <div className="relative">
          <img 
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          {/* Label populer hanya muncul di produk populer */}
          {processedData.popularProducts.some(p => p.id === product.id) && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Populer
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">Rp{product.price.toLocaleString()}</p>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-500">{product.seller.name}</span>
            <span className="flex items-center bg-green-50 px-2 py-1 rounded text-sm text-green-700">
              ⭐ {product.rating?.toFixed(1) || '0.0'}
            </span>
          </div>
          {/* Hanya tampilkan jarak untuk produk terdekat */}
          {product.distance && (
            <div className="flex justify-between text-sm text-gray-500">
              <span>{calculateDeliveryTime(product.distance)}</span>
              <span>{product.distance.toFixed(1)} km</span>
            </div>
          )}
          <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">
            Pesan Sekarang
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
             {/* Header */}
       {/* <header className="bg-orange-500 text-white py-4 shadow-md">
         <div className="container mx-auto px-4">
           <h1 className="text-2xl font-bold">Food Delivery App</h1>
         </div>
       </header> */}

       {/* Hero Carousel */}
       <section className="relative h-64 md:h-96 mt-16">
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
                src="https://source.unsplash.com/random/1600x900/?food" 
                alt="Food" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Makanan Enak, Pengantaran Cepat</h2>
                  <p className="text-lg md:text-xl">Pesan sekarang dan dapatkan diskon khusus</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full">
              <img 
                src="https://source.unsplash.com/random/1600x900/?drink" 
                alt="Drink" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Minuman Segar Kapan Saja</h2>
                  <p className="text-lg md:text-xl">Tersedia berbagai pilihan minuman kekinian</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      
      <main className="container mx-auto px-4 py-8">
        {/* Section Produk Populer (hanya dari productDesc) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Paling Populer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedData.popularProducts.map(product => (
              <ProductCard key={`popular-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section Terdekat (hanya dari productItems) */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Terdekat dengan Anda</h2>
            {userLocation && (
              <span className="text-sm text-gray-500">
                📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedData.nearestProducts.map(product => (
              <ProductCard key={`nearest-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section Makanan (hanya dari productItems) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Menu Makanan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedData.foodProducts.map(product => (
              <ProductCard key={`food-${product.id}`} product={product} />
            ))}
          </div>
        </section>

        {/* Section Minuman (hanya dari productItems) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Menu Minuman</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedData.drinkProducts.map(product => (
              <ProductCard key={`drink-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      </main>
             {/* Footer */}
       <footer className="bg-gray-800 text-white py-8">
         <div className="container mx-auto px-4 text-center">
           <p>© 2023 Food Delivery App. All rights reserved.</p>
         </div>
       </footer>
    </div>
  );
};

export default RestaurantApp;