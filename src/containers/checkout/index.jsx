// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { useNavigate } from "react-router-dom";
// import useProductStore from "../../store/useProductStore";
// import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Index = () => {
//   // ... state lainnya
//     const [note, setNote] = useState("");
//   const [payment_method, setPayment_method] = useState(""); // Menyimpan metode pembayaran
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [address, setAddress] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [inputAddress, setInputAddress] = useState(""); // Tambah state untuk input alamat

//   // Fungsi untuk mencari alamat dari input teks
//   const handleAddressSearch = async () => {
//     if (!inputAddress.trim()) return;
    
//     const key = "AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA";
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inputAddress)}&key=${key}`
//       );
      
//       if (response.data.status === "OK") {
//         const location = response.data.results[0].geometry.location;
//         const lat = parseFloat(location.lat.toFixed(6));
//         const lng = parseFloat(location.lng.toFixed(6));
//         const formattedAddress = response.data.results[0].formatted_address;
        
//         setLatitude(lat);
//         setLongitude(lng);
//         setSelectedLocation({ lat, lng });
//         setAddress(formattedAddress);
//         setInputAddress(formattedAddress);
//       }
//     } catch (error) {
//       console.error("Error searching address:", error);
//       toast.error("Gagal menemukan alamat");
//     }
//   };

//   // Modifikasi fungsi fetchAddress untuk update input
//   const fetchAddress = async (lat, lng) => {
//     const key = "AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA";
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
//       );
      
//       if (response.data.status === "OK") {
//         const newAddress = response.data.results[0]?.formatted_address || "Alamat tidak ditemukan";
//         setAddress(newAddress);
//         setInputAddress(newAddress);
//       }
//     } catch (error) {
//       console.error("Error fetching address:", error);
//     }
//   };

//   // Modifikasi handleMapClick
//   const handleMapClick = async (e) => {
//     const lat = parseFloat(e.latLng.lat().toFixed(6));
//     const lng = parseFloat(e.latLng.lng().toFixed(6));
//     setLatitude(lat);
//     setLongitude(lng);
//     fetchAddress(lat, lng);
//     setSelectedLocation({ lat, lng });
//   };

//   const { cartItems, fetchCarts, createOrder, selectedCart, clearSelectedCart } = useProductStore();

//     useEffect(() => {
//       fetchCarts();
//       selectedCart
//     }, [fetchCarts, selectedCart]);
  
//     console.log("selectedCart", selectedCart)
  
//     const navigate = useNavigate();
  
//     const subtotal = selectedCart.reduce(
//       (acc, product) => acc + product.quantity * product.product.price,
//       0
//     );

//   const handleCreate = async (e) => {
//   e.preventDefault();
//   if (isSubmitting) return;
//   setIsSubmitting(true);

//   // Validasi data sebelum membuat pesanan
//   if (!payment_method) {
//       alert("Silakan pilih metode pembayaran!");
//       setIsSubmitting(false);
//       return;
//   }

//   if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
//       alert("Silakan pilih lokasi pengiriman!");
//       setIsSubmitting(false);
//       return;
//   }

//   const orderData = {
//       items: selectedCart.map(item => ({
//           product_id: item.product.id,
//           quantity: item.quantity,
//       })),
//       payment_method,
//       shipping_cost: {
//           latitude: parseFloat(selectedLocation.lat.toFixed(6)),
//           longitude: parseFloat(selectedLocation.lng.toFixed(6)),
//       },
//   };

//   console.log("Order Data:", orderData);

//   try {
//       // Validasi stok produk
//       for (let i = 0; i < selectedCart.length; i++) {
//           if (selectedCart[i].product.stock < selectedCart[i].quantity) {
//               alert(`Stok produk ${selectedCart[i].product.title} tidak mencukupi!`);
//               setIsSubmitting(false);
//               return;
//           }
//       }

//       await createOrder(orderData, setError); // Panggil createOrder
//       toast.success("Pesanan berhasil dibuat!"); // Notifikasi sukses
//       navigate("/payment");

//   } catch (error) {
//       console.error("Error sending data:", error);

//       // Penanganan error yang lebih baik
//       if (error.response) {
//           // Error dari server (4xx atau 5xx)
//           setError(error.response.data?.message || "Failed to create order.");
//       } else if (error.request) {
//           // Tidak ada respons dari server
//           setError("No response from server. Please check your connection.");
//       } else {
//           // Error lainnya (misalnya, error JavaScript)
//           setError("An unexpected error occurred. Please try again.");
//       }
//   } finally {
//       setIsSubmitting(false);
//   }
// };

// const handleClear = () => {
//   clearSelectedCart();
//   navigate("/cart")
// };

//   return (
//     <>
//     { selectedCart.length === 0 ? (
//       <div className="container py-5">
//         <div className="alert alert-danger" role="alert">
//           <h4 className="alert-heading">Keranjang Kosong!</h4> 
//           <p>Silakan kembali ke <a href="/cart">halaman toko</a> untuk menambahkan produk ke keranjang.</p> 
//       </div>
//       </div>
//     ):(
//       <>
//       <Navbar />
//       <div className="container-fluid py-5">
//         <div className="container py-5">
//           {error && <p className="text-danger">{error}</p>}
//           <div className="w-100 justify-content-center align-items-center">
//           <h1 className="mb-4 text-center fw-bold">Order Form</h1>
//           </div>
//           <form onSubmit={handleCreate}>
//             <div className="row g-5">
//               <div className="col-md-12 col-lg-6">                
//                 {/* Input Alamat yang Bisa Diedit */}
//                 <div className="mb-3">
//                   <label className="form-label">Cari Alamat:</label>
//                   <div className="input-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={inputAddress}
//                       onChange={(e) => setInputAddress(e.target.value)}
//                       placeholder="Masukkan alamat lengkap"
//                       onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={handleAddressSearch}
//                     >
//                       Cari
//                     </button>
//                   </div>
//                 </div>

//                 {/* Informasi Koordinat */}
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <label className="form-label">Latitude:</label>
//                     <input 
//                       type="text" 
//                       className="form-control"
//                       value={latitude || ""} 
//                       readOnly 
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <label className="form-label">Longitude:</label>
//                     <input 
//                       type="text" 
//                       className="form-control"
//                       value={longitude || ""} 
//                       readOnly 
//                     />
//                   </div>
//                 </div>

//                 <div>
//                    <label>Payment Method:</label>
//                    <div className="form-check">
//                      <input
//                       type="radio"
//                       id="COD"
//                       name="payment_method"
//                       value="COD"
//                       checked={payment_method === "COD"}
//                       onChange={(e) => setPayment_method(e.target.value)}
//                       className="form-check-input"
//                     />
//                     <label htmlFor="COD" className="form-check-label">
//                       Cash On Delivery (COD)
//                     </label>
//                   </div>
//                   <div className="form-check">
//                     <input
//                       type="radio"
//                       id="Transfer"
//                       name="payment_method"
//                       value="transfer"
//                       checked={payment_method === "transfer"}
//                       onChange={(e) => setPayment_method(e.target.value)}
//                       className="form-check-input"
//                     />
//                     <label htmlFor="Transfer" className="form-check-label">
//                       Transfer Bank
//                     </label>
//                   </div>
//                 </div>
                

//                 {/* Peta Interaktif */}
//                 <div className="mb-3">
//                   <label className="form-label">Pilih Lokasi di Peta:</label>
//                   <div style={{ border: "2px solid #0d6efd", borderRadius: "8px" }}>
//                     <LoadScript googleMapsApiKey="AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA">
//                       <GoogleMap
//                         mapContainerStyle={{ height: "400px", width: "100%" }}
//                         center={selectedLocation || { lat: -6.2088, lng: 106.8456 }}
//                         zoom={15}
//                         onClick={handleMapClick}
//                       >
//                         {selectedLocation && (
//                           <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
//                             <InfoWindow position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
//                               <div>
//                                 <h3>{address}</h3>
//                                 <small>Klik peta untuk memperbarui lokasi</small>
//                               </div>
//                             </InfoWindow>
//                           </Marker>
//                         )}
//                       </GoogleMap>
//                     </LoadScript>
//                   </div>
//                 </div>

//               </div>
//               {/* Metode Pembayaran */}
//               <div className="col-md-12 col-lg-6 col-xl-5">
//                 <div className="table-responsive">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">Products</th>
//                         <th scope="col">Name</th>
//                         <th scope="col">Price</th>
//                         <th scope="col">Quantity</th>
//                         <th scope="col">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedCart &&
//                         selectedCart.map((product) => (
//                           <tr key={product.product.id}>
//                             <th scope="row">
//                               <div className="d-flex align-items-center mt-2">
//                                 <img
//                                   src={product.product.image_url}
//                                   className="img-fluid rounded-circle"
//                                   style={{ width: 90, height: 90 }}
//                                   alt=""
//                                 />
//                               </div>
//                             </th>
//                             <td>{product.product.name}</td>
//                             <td>
//                               {new Intl.NumberFormat("id-ID", {
//                                 style: "currency",
//                                 currency: "IDR",
//                               }).format(product.product.price)}
//                             </td>
//                             <td>{product.quantity}</td>
//                             <td>
//                               {new Intl.NumberFormat("id-ID", {
//                                 style: "currency",
//                                 currency: "IDR",
//                               }).format(product.quantity * product.product.price)}
//                             </td>
//                           </tr>
//                         ))}
//                       <tr>
//                         <td colSpan="4">Subtotal:</td>
//                         <td>{subtotal}</td>
//                       </tr>
//                     </tbody>
//                   </table>

//                   {/* <div>
//                     <label>Note:</label>
//                     <textarea
//                       className="form-control"
//                       value={note}
//                       onChange={(e) => setNote(e.target.value)}
//                       rows="3"
//                     ></textarea>
//                   </div> */}
//                   <div className="d-flex justify-content-between gap-3 mt-4 w-50">
//                   <button 
//   type="button" 
//   className="btn btn-danger ms-2" 
//   style={{width: "95%"}}
//   onClick={handleClear}
// >
//   Cancel
// </button>
//                     <button type="submit" className="btn btn-primary" style={{width: "95%"}} disabled={isSubmitting}>
//                       {isSubmitting ? "Submitting..." : "Place Order"}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* ... Bagian kanan (keranjang belanja) tetap sama ... */}
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
//       </>
//     )
//   }
      
//     </>
//   );
// };

// export default Index;




import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client"; // Import socket.io-client
import useAuthStore from "../../store/useAuthStore";

const Index = () => {
  const [note, setNote] = useState("");
  const [payment_method, setPayment_method] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [inputAddress, setInputAddress] = useState("");

  const [courierLocation, setCourierLocation] = useState(null); // State untuk lokasi kurir
  const [socket, setSocket] = useState(null); // State untuk WebSocket

  const { cartItems, fetchCarts, createOrder, selectedCart, clearSelectedCart } = useProductStore();
  const {authUser} = useAuthStore();
  const navigate = useNavigate();

  console.log("authUser", authUser)

  // Fetch cart items saat komponen dimount
  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  // Hitung subtotal
  const subtotal = selectedCart.reduce(
    (acc, product) => acc + product.quantity * product.variant?.price,
    0
  );

  // Fungsi untuk mencari alamat dari input teks
  const handleAddressSearch = async () => {
    if (!inputAddress.trim()) return;

    const key = "AIzaSyAHrXsRceoW9TLDOuasfOds5-F7CF1tlqs";
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(inputAddress)}&key=${key}`
      );

      if (response.data.status === "OK") {
        const location = response.data.results[0].geometry.location;
        const lat = parseFloat(location.lat.toFixed(6));
        const lng = parseFloat(location.lng.toFixed(6));
        const formattedAddress = response.data.results[0].formatted_address;

        setLatitude(lat);
        setLongitude(lng);
        setSelectedLocation({ lat, lng });
        setAddress(formattedAddress);
        setInputAddress(formattedAddress);
      }
    } catch (error) {
      console.error("Error searching address:", error);
      toast.error("Gagal menemukan alamat");
    }
  };

  // Fungsi untuk mengambil alamat dari koordinat
  const fetchAddress = async (lat, lng) => {
    const key = "AIzaSyAHrXsRceoW9TLDOuasfOds5-F7CF1tlqs";
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
      );

      if (response.data.status === "OK") {
        const newAddress = response.data.results[0]?.formatted_address || "Alamat tidak ditemukan";
        setAddress(newAddress);
        setInputAddress(newAddress);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Fungsi untuk menangani klik pada peta
  const handleMapClick = async (e) => {
    const lat = parseFloat(e.latLng.lat().toFixed(6));
    const lng = parseFloat(e.latLng.lng().toFixed(6));
    setLatitude(lat);
    setLongitude(lng);
    fetchAddress(lat, lng);
    setSelectedLocation({ lat, lng });
  };

  // Fungsi untuk membuat pesanan
const handleCreate = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);

  // Validasi
  if (!payment_method) {
    toast.error("Pilih metode pembayaran!");
    setIsSubmitting(false);
    return;
  }

  if (!selectedLocation) {
    toast.error("Pilih lokasi pengiriman!");
    setIsSubmitting(false);
    return;
  }

  // Validasi stok
  for (const item of selectedCart) {
    if (item.variant.stock < item.quantity) {
      toast.error(`Stok ${item.variant.name} tidak mencukupi!`);
      setIsSubmitting(false);
      return;
    }
  }

  const orderData = {
    items: selectedCart.map(item => ({
      variant_id: item.variant.id,
      quantity: item.quantity
    })),
    payment_method,
    shipping_cost: {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  };

  try {
    const response = await createOrder(orderData);
    
    // Pastikan response valid
    if (!response?.data) {
      throw new Error("Invalid response from server");
    }

    const order = response.data;
    console.log("Order data for WebSocket:", order);

    // Setup WebSocket
    const newSocket = io("http://localhost:8081", {
      query: {
        userId: authUser.id,
        role: "customer",
        // orderId: order.order_id || order.id // Sesuaikan dengan field yang ada
      }
    });

    

    setSocket(newSocket);
    
    newSocket.on("locationUpdated", (data) => {
      setCourierLocation({ lat: data.latitude, lng: data.longitude });
    });

    navigate("/payment");
    window.location.reload();

  } catch (error) {
    console.error("Order error:", error);
    
    if (error.message === "Tidak ada courier yang tersedia") {
      toast.error("Kurir tidak tersedia");
    } else if (!error.response) {
      toast.error(error.message || "Terjadi kesalahan");
    }
    // Error dari server sudah di-toast oleh createOrder
  } finally {
    setIsSubmitting(false);
  }
};



  // Fungsi untuk membersihkan keranjang
  const handleClear = () => {
    clearSelectedCart();
    navigate("/cart");
  };

  return (
    <>
      {selectedCart.length === 0 ? (
        <>
        <Navbar />
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Keranjang Kosong!</h4>
            <p>
              Silakan ke <a href="/payment">halaman pembayaran</a> atau kembali ke <a href="/cart">halaman cart </a>untuk menambahkan produk ke keranjang.
            </p>
          </div>
        </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="container-fluid py-5">
            <div className="container py-5">
              {error && <p className="text-danger">{error}</p>}
              <div className="w-100 justify-content-center align-items-center">
                <h1 className="mb-4 text-center fw-bold">Order Form</h1>
              </div>
              <form onSubmit={handleCreate}>
                <div className="row g-5">
                  <div className="col-md-12 col-lg-6">
                    {/* Input Alamat yang Bisa Diedit */}
                    <div className="mb-3">
                      <label className="form-label">Cari Alamat:</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          value={inputAddress}
                          onChange={(e) => setInputAddress(e.target.value)}
                          placeholder="Masukkan alamat lengkap"
                          onKeyPress={(e) => e.key === "Enter" && handleAddressSearch()}
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddressSearch}
                        >
                          Cari
                        </button>
                      </div>
                    </div>

                    {/* Informasi Koordinat */}
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Latitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={latitude || ""}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Longitude:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={longitude || ""}
                          readOnly
                        />
                      </div>
                    </div>

                    {/* Metode Pembayaran */}
                    <div>
                      <label>Payment Method:</label>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="COD"
                          name="payment_method"
                          value="COD"
                          checked={payment_method === "COD"}
                          onChange={(e) => setPayment_method(e.target.value)}
                          className="form-check-input"
                        />
                        <label htmlFor="COD" className="form-check-label">
                          Cash On Delivery (COD)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          id="Transfer"
                          name="payment_method"
                          value="transfer"
                          checked={payment_method === "transfer"}
                          onChange={(e) => setPayment_method(e.target.value)}
                          className="form-check-input"
                        />
                        <label htmlFor="Transfer" className="form-check-label">
                          Transfer Bank
                        </label>
                      </div>
                    </div>

                    {/* Peta Interaktif */}
                    <div className="mb-3">
                      <label className="form-label">Pilih Lokasi di Peta:</label>
                      <div style={{ border: "2px solid #0d6efd", borderRadius: "8px" }}>
                        <LoadScript googleMapsApiKey="AIzaSyAHrXsRceoW9TLDOuasfOds5-F7CF1tlqs">
                          <GoogleMap
                            mapContainerStyle={{ height: "400px", width: "100%" }}
                            center={selectedLocation || { lat: -6.2088, lng: 106.8456 }}
                            zoom={15}
                            onClick={handleMapClick}
                          >
                            {selectedLocation && (
                              <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
                                <InfoWindow position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
                                  <div>
                                    <h3>{address}</h3>
                                    <small>Klik peta untuk memperbarui lokasi</small>
                                  </div>
                                </InfoWindow>
                              </Marker>
                            )}
                            {courierLocation && (
                              <Marker
                                position={{ lat: courierLocation.lat, lng: courierLocation.lng }}
                                icon={{
                                  url: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Ikon motor
                                  scaledSize: new window.google.maps.Size(32, 32),
                                }}
                              />
                            )}
                          </GoogleMap>
                        </LoadScript>
                      </div>
                    </div>
                  </div>

                  {/* Keranjang Belanja */}
                  <div className="col-md-12 col-lg-6 col-xl-5">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Products</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCart.map((product) => (
                            <tr key={product.variant?.id}>
                              <th scope="row">
                                <div className="d-flex align-items-center mt-2">
                                  <img
                                    src={product.variant?.img_url}
                                    className="img-fluid rounded-circle"
                                    style={{ width: 90, height: 90 }}
                                    alt=""
                                  />
                                </div>
                              </th>
                              <td>{product.variant.name}</td>
                              <td>
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(product.variant?.price)}
                              </td>
                              <td>{product.quantity}</td>
                              <td>
                                {new Intl.NumberFormat("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                }).format(product.quantity * product.variant?.price)}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan="4">Subtotal:</td>
                            <td>{subtotal}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="d-flex justify-content-between gap-3 mt-4 w-50">
                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          style={{ width: "95%" }}
                          onClick={handleClear}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ width: "95%" }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Place Order"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <footer className="bg-gray-800 text-white py-4 text-xs">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Food Delivery App. All rights reserved.</p>
        </div>
      </footer>
        </>
      )}
    </>
  );
};

export default Index;