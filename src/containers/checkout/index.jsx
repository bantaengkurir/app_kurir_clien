// // import React, { useEffect, useState } from "react";
// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";
// // import { useNavigate } from "react-router-dom";
// // import useProductStore from "../../store/useProductStore";
// // import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
// // import axios from "axios";


// // const Index = () => {
// //   const [note, setNote] = useState("");
// //   const [payment_method, setPayment_method] = useState("");
// //   const [error, setError] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);


// //   const [latitude, setLatitude] = useState(null);
// //   const [longitude, setLongitude] = useState(null);
// //   const [address, setAddress] = useState("");
// //   const [selectedLocation, setSelectedLocation] = useState(null);

// //   useEffect(() => {
// //     // Mendapatkan lokasi pengguna saat pertama kali membuka peta
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const lat = position.coords.latitude;
// //           const lng = position.coords.longitude;
// //           setLatitude(lat);
// //           setLongitude(lng);
// //           setSelectedLocation({ lat, lng });
// //           fetchAddress(lat, lng); // Mengambil alamat berdasarkan koordinat pengguna
// //         },
// //         () => {
// //           console.error("Error: Tidak dapat mengambil lokasi pengguna.");
// //         }
// //       );
// //     } else {
// //       console.error("Geolocation not supported by this browser.");
// //     }
// //   }, []);

// //   const fetchAddress = async (lat, lng) => {
// //     const key = "AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA";
// //     const response = await axios.get(
// //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
// //     );
// //     if (response.data.status !== "OK") {
// //       console.error("Error: ", response.data.error_message);
// //       setAddress("Error fetching address");
// //       return;
// //     }

// //     const newAddress = response.data.results[0]?.formatted_address || "Alamat tidak ditemukan";
// //     setAddress(newAddress);
// //   };

// //   const handleMapClick = async (e) => {
// //     const lat = e.latLng.lat();
// //     const lng = e.latLng.lng();
// //     setLatitude(lat);
// //     setLongitude(lng);

// //     // Call Geocoding API to get the address from the coordinates
// //     fetchAddress(lat, lng);
// //     setSelectedLocation({ lat, lng });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (!selectedLocation) {
// //       alert("Pilih lokasi terlebih dahulu");
// //       return;
// //     }

// //     const orderData = {
// //       items: [{ product_id: 1, quantity: 2 }],
// //       payment_method: "credit_card",
// //       shipping_cost: {
// //         latitude: selectedLocation.lat,
// //         longitude: selectedLocation.lng,
// //       },
// //     };

// //     console.log("Order data:", orderData);
// //   };

// //   const { cartItems, fetchCarts, createOrder } = useProductStore();

// //   useEffect(() => {
// //     fetchCarts();
// //   }, [fetchCarts]);

// //   const navigate = useNavigate();

// //   const [shippingOptions, setShippingOptions] = useState({
// //     freeShipping: false,
// //     flatRate: false,
// //     localPickup: false,
// //   });

// //   const handleShippingChange = (e) => {
// //     const { name, checked } = e.target;
// //     setShippingOptions((prev) => ({
// //       ...prev,
// //       [name]: checked,
// //     }));
// //   };

// //   const handlePaymentChange = (e) => {
// //     setPayment_method(e.target.value);
// //   };

// //   const flatRate = 15000;
// //   const localPickup = 25000;
// //   const freeShipping = 0;

// //   const subtotal = cartItems.reduce(
// //     (acc, product) => acc + product.quantity * product.product.price,
// //     0
// //   );
// //   const totalShippingCost =
// //     (shippingOptions.freeShipping ? freeShipping : 0) +
// //     (shippingOptions.flatRate ? flatRate : 0) +
// //     (shippingOptions.localPickup ? localPickup : 0);
// //   const totalShipping = subtotal + totalShippingCost;

// //   // console.log("total keseluruhan", totalShipping)
// //   const handleCreate = async (e) => {
// //     e.preventDefault();

// //     if (isSubmitting) return;
// //     setIsSubmitting(true);

// //     const orderData = {
// //       items: cartItems,
// //       total: totalShipping,
// //       payment_method: payment_method,
// //       shipping: {
// //         company_name,
// //         address,
// //         city,
// //         postcode,
// //         mobile,
// //         img_payment,
// //         note,
// //         payment_method,
// //         total: totalShipping,
// //       },
// //     };

// //     try {
// //       for (let i = 0; i < cartItems.length; i++) {
// //         if (cartItems[i].product.stock < cartItems[i].quantity) {
// //           alert(`Stok produk ${cartItems[i].product.title} tidak mencukupi!`);
// //           return; // Hentikan proses jika stok tidak mencukupi
// //         }
// //       }
// //       await createOrder(orderData, navigate, setError);
// //       // console.log("Order and shipping created successfully: ", { orderData });

// //       navigate("/shop");
// //     } catch (error) {
// //       console.error("Error sending data:", error);
// //       setError("Failed to create order");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

  

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="container-fluid py-5">
// //         <div className="container py-5">
// //           {error && <p className="text-danger">{error}</p>}
// //           <h1 className="mb-4">Billing details</h1>
// //           <form onSubmit={handleCreate}>
// //             <div className="row g-5">
// //               <div className="col-md-12 col-lg-6">
// //               <div>
// //       <h1>Order Form</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Latitude: </label>
// //           <input type="text" value={latitude || ""} readOnly />
// //         </div>

// //         <div>
// //           <label>Longitude: </label>
// //           <input type="text" value={longitude || ""} readOnly />
// //         </div>

// //         <div>
// //           <label>Address: </label>
// //           <input type="text" value={address} readOnly />
// //         </div>

// //         <button type="submit">Submit Order</button>
// //       </form>

// //       <LoadScript googleMapsApiKey="AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA">
// //         <GoogleMap
// //           mapContainerStyle={{ height: "400px", width: "100%" }}
// //           center={selectedLocation || { lat: -6.2088, lng: 106.8456 }} // Pusatkan peta ke lokasi pengguna jika ada
// //           zoom={12}
// //           onClick={handleMapClick}
// //         >
// //           {selectedLocation && (
// //             <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
// //               <InfoWindow position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
// //                 <div>
// //                   <h3>{selectedLocation.address}</h3>
// //                 </div>
// //               </InfoWindow>
// //             </Marker>
// //           )}
// //         </GoogleMap>
// //       </LoadScript>
// //     </div>
// //                 </div>
// //               <div className="col-md-12 col-lg-6 col-xl-5">
// //                 <div className="table-responsive">
// //                   <table className="table">
// //                     <thead>
// //                       <tr>
// //                         <th scope="col">Products</th>
// //                         <th scope="col">Name</th>
// //                         <th scope="col">Price</th>
// //                         <th scope="col">Quantity</th>
// //                         <th scope="col">Total</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {cartItems &&
// //                         cartItems.map((product) => (
// //                           <tr key={product.product.id}>
// //                             <th scope="row">
// //                               <div className="d-flex align-items-center mt-2">
// //                                 <img
// //                                   src={product.product.image_url}
// //                                   className="img-fluid rounded-circle"
// //                                   style={{ width: 90, height: 90 }}
// //                                   alt=""
// //                                 />
// //                               </div>
// //                             </th>
// //                             <td className="text-capitalize ">
// //                               {product.product.name}
// //                             </td>
// //                             <td>
// //                               <i className="fa-solid "></i>
// //                               {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format(product.product.price)}
// //                             </td>
// //                             <td>{product.quantity}</td>
// //                             <td>
// //                               <i className="fa-solid "></i>
// //                               {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format(product.quantity * product.product.price)}
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       <tr>
// //                         <td colSpan="4">Subtotal:</td>
// //                         <td>{subtotal}</td>
// //                       </tr>
// //                       <tr>
// //                         <td colSpan="4">Shipping:</td>
// //                         <td>
// //                         {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format(totalShippingCost)}
// //                           </td>
// //                       </tr>
// //                       <tr>
// //                         <td colSpan="4">Total:</td>
// //                         <td>
// //                         {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format(totalShipping)}
// //                           </td>
// //                       </tr>
// //                     </tbody>
// //                   </table>
// //                   <div className="form-check">
// //                     <input
// //                       className="form-check-input"
// //                       type="checkbox"
// //                       id="FreeShipping"
// //                       name="freeShipping"
// //                       checked={shippingOptions.freeShipping}
// //                       onChange={handleShippingChange}
// //                     />
// //                     <label className="form-check-label" htmlFor="FreeShipping">
// //                       Free Shipping
// //                     </label>
// //                   </div>
// //                   <div className="form-check">
// //                     <input
// //                       className="form-check-input"
// //                       type="checkbox"
// //                       id="FlatRate"
// //                       name="flatRate"
// //                       checked={shippingOptions.flatRate}
// //                       onChange={handleShippingChange}
// //                     />
// //                     <label className="form-check-label" htmlFor="FlatRate">
// //                     Flat Rate: {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format( 15000)}
// //                     </label>
// //                   </div>
// //                   <div className="form-check">
// //                     <input
// //                       className="form-check-input"
// //                       type="checkbox"
// //                       id="LocalPickup"
// //                       name="localPickup"
// //                       checked={shippingOptions.localPickup}
// //                       onChange={handleShippingChange}
// //                     />
// //                     <label className="form-check-label" htmlFor="LocalPickup">
// //                       Local Pickup: {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format( 25000)}
// //                     </label>
// //                   </div>
// //                   <hr />
// //                   <h5 className="mb-4">Payment</h5>
// //                   <div className="form-check text-start my-3">
// //                     <input
// //                       type="radio"
// //                       className="form-check-input bg-primary border-0"
// //                       id="Transfer-1"
// //                       name="payment_method"
// //                       value="Transfer"
// //                       checked={payment_method === "Transfer"}
// //                       onChange={handlePaymentChange}
// //                     />
// //                     <label className="form-check-label" htmlFor="Transfer-1">
// //                       Direct Bank Transfer
// //                     </label>
// //                   </div>
// //                   <p className="text-start text-dark">
// //                     Make your payment directly into our bank account. Please use
// //                     your Order ID as the payment reference. Your order will not
// //                     be shipped until the funds have cleared in our account.
// //                   </p>
// //                   <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
// //                     <div className="col-12">
// //                       <div className="form-check text-start my-3">
// //                         <input
// //                           type="radio"
// //                           className="form-check-input bg-primary border-0"
// //                           id="Payments-1"
// //                           name="payment_method"
// //                           value="Check Payments"
// //                           checked={payment_method === "Check Payments"}
// //                           onChange={handlePaymentChange}
// //                         />
// //                         <label className="form-check-label" htmlFor="Payments-1">
// //                           Check Payments
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
// //                     <div className="col-12">
// //                       <div className="form-check text-start my-3">
// //                         <input
// //                           type="radio"
// //                           className="form-check-input bg-primary border-0"
// //                           id="Delivery-1"
// //                           name="payment_method"
// //                           value="Cash On Delivery"
// //                           checked={payment_method === "Cash On Delivery"}
// //                           onChange={handlePaymentChange}
// //                         />
// //                         <label className="form-check-label" htmlFor="Delivery-1">
// //                           Cash On Delivery
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <hr />
// //                   <div className="form-check">
// //                     <input
// //                       className="form-check-input"
// //                       type="checkbox"
// //                       id="TermsConditions"
// //                       required
// //                     />
// //                     <label
// //                       className="form-check-label"
// //                       htmlFor="TermsConditions"
// //                     >
// //                       I have read and agree to the terms and conditions
// //                     </label>
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="btn btn-primary w-100 py-3 mt-4"
// //                     disabled={isSubmitting}
// //                   >
// //                     {isSubmitting ? 
// //                     <div className="spinner-border text-success" role="status">
// //                     <span className="visually-hidden">Placing Order...</span>
// //                   </div>
// //                      : "Place Order"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default Index;


// // import React, { useEffect, useState } from "react";
// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";
// // import { useNavigate } from "react-router-dom";
// // import useProductStore from "../../store/useProductStore";
// // import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
// // import axios from "axios";

// // const Index = () => {
// //   const [note, setNote] = useState("");
// //   const [payment_method, setPayment_method] = useState("");
// //   const [error, setError] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const [latitude, setLatitude] = useState(null);
// //   const [longitude, setLongitude] = useState(null);
// //   const [address, setAddress] = useState("");
// //   const [selectedLocation, setSelectedLocation] = useState(null);

// //   useEffect(() => {
// //     // Mendapatkan lokasi pengguna saat pertama kali membuka peta
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const lat = position.coords.latitude;
// //           const lng = position.coords.longitude;
// //           setLatitude(lat);
// //           setLongitude(lng);
// //           setSelectedLocation({ lat, lng });
// //           fetchAddress(lat, lng); // Mengambil alamat berdasarkan koordinat pengguna
// //         },
// //         () => {
// //           console.error("Error: Tidak dapat mengambil lokasi pengguna.");
// //         }
// //       );
// //     } else {
// //       console.error("Geolocation not supported by this browser.");
// //     }
// //   }, []);

// //   const fetchAddress = async (lat, lng) => {
// //     const key = "AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA";
// //     const response = await axios.get(
// //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
// //     );
// //     if (response.data.status !== "OK") {
// //       console.error("Error: ", response.data.error_message);
// //       setAddress("Error fetching address");
// //       return;
// //     }

// //     const newAddress = response.data.results[0]?.formatted_address || "Alamat tidak ditemukan";
// //     setAddress(newAddress);
// //   };

// //   const handleMapClick = async (e) => {
// //     const lat = e.latLng.lat();
// //     const lng = e.latLng.lng();
// //     setLatitude(lat);
// //     setLongitude(lng);
// //     fetchAddress(lat, lng);
// //     setSelectedLocation({ lat, lng });
// //   };

// //   const { cartItems, fetchCarts, createOrder } = useProductStore();

// //   useEffect(() => {
// //     fetchCarts();
// //   }, [fetchCarts]);

// //   const navigate = useNavigate();

// //   // const [shippingOptions, setShippingOptions] = useState({
// //   //   freeShipping: false,
// //   //   flatRate: false,
// //   //   localPickup: false,
// //   // });

// //   // const handleShippingChange = (e) => {
// //   //   const { name, checked } = e.target;
// //   //   setShippingOptions((prev) => ({
// //   //     ...prev,
// //   //     [name]: checked,
// //   //   }));
// //   // };

// //   // const handlePaymentChange = (e) => {
// //   //   setPayment_method(e.target.value);
// //   // };

// //   // const flatRate = 15000;
// //   // const localPickup = 25000;
// //   // const freeShipping = 0;

// //   const subtotal = cartItems.reduce(
// //     (acc, product) => acc + product.quantity * product.product.price,
// //     0
// //   );
// //   // const totalShippingCost =
// //   //   (shippingOptions.freeShipping ? freeShipping : 0) +
// //   //   (shippingOptions.flatRate ? flatRate : 0) +
// //   //   (shippingOptions.localPickup ? localPickup : 0);
// //   // const totalShipping = subtotal + totalShippingCost;

// //   const handleCreate = async (e) => {
// //     e.preventDefault();

// //     if (isSubmitting) return;
// //     setIsSubmitting(true);

// //     const orderData = {
// //       items: cartItems,
// //       // total: totalShipping,
// //       payment_method,
// //       shipping: {
// //         address,
// //         note,
// //         // total: totalShipping,
// //         latitude: selectedLocation?.lat,
// //         longitude: selectedLocation?.lng,
// //       },
// //     };

// //     try {
// //       for (let i = 0; i < cartItems.length; i++) {
// //         if (cartItems[i].product.stock < cartItems[i].quantity) {
// //           alert(`Stok produk ${cartItems[i].product.title} tidak mencukupi!`);
// //           return;
// //         }
// //       }
// //       await createOrder(orderData, navigate, setError);
// //       navigate("/shop");
// //     } catch (error) {
// //       console.error("Error sending data:", error);
// //       setError("Failed to create order");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="container-fluid py-5">
// //         <div className="container py-5">
// //           {error && <p className="text-danger">{error}</p>}
// //           <h1 className="mb-4">Billing details</h1>
// //           <form onSubmit={handleCreate}>
// //             <div className="row g-5">
// //               <div className="col-md-12 col-lg-6">
// //                 <h1>Order Form</h1>
// //                 <div>
// //                   <label>Latitude: </label>
// //                   <input type="text" value={latitude || ""} readOnly />
// //                 </div>

// //                 <div>
// //                   <label>Longitude: </label>
// //                   <input type="text" value={longitude || ""} readOnly />
// //                 </div>

// //                 <div>
// //                   <label>Address: </label>
// //                   <input type="text" value={address} readOnly />
// //                 </div>
// //                 <div>
// //                   <label>Address: </label>
// //                   <option type="option" value={"COD"} />
// //                   <option type="option" value={"Transfer"} />
// //                 </div>
// //                 <LoadScript googleMapsApiKey="AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA">
// //                   <GoogleMap
// //                     mapContainerStyle={{ height: "400px", width: "100%" }}
// //                     center={selectedLocation || { lat: -6.2088, lng: 106.8456 }}
// //                     zoom={12}
// //                     onClick={handleMapClick}
// //                   >
// //                     {selectedLocation && (
// //                       <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
// //                         <InfoWindow position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
// //                           <div>
// //                             <h3>{address}</h3>
// //                           </div>
// //                         </InfoWindow>
// //                       </Marker>
// //                     )}
// //                   </GoogleMap>
// //                 </LoadScript>
// //               </div>
// //               <div className="col-md-12 col-lg-6 col-xl-5">
// //                 <div className="table-responsive">
// //                   <table className="table">
// //                     <thead>
// //                       <tr>
// //                         <th scope="col">Products</th>
// //                         <th scope="col">Name</th>
// //                         <th scope="col">Price</th>
// //                         <th scope="col">Quantity</th>
// //                         <th scope="col">Total</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {cartItems &&
// //                         cartItems.map((product) => (
// //                           <tr key={product.product.id}>
// //                             <th scope="row">
// //                               <div className="d-flex align-items-center mt-2">
// //                                 <img
// //                                   src={product.product.image_url}
// //                                   className="img-fluid rounded-circle"
// //                                   style={{ width: 90, height: 90 }}
// //                                   alt=""
// //                                 />
// //                               </div>
// //                             </th>
// //                             <td>{product.product.name}</td>
// //                             <td>
// //                               {new Intl.NumberFormat("id-ID", {
// //                                 style: "currency",
// //                                 currency: "IDR",
// //                               }).format(product.product.price)}
// //                             </td>
// //                             <td>{product.quantity}</td>
// //                             <td>
// //                               {new Intl.NumberFormat("id-ID", {
// //                                 style: "currency",
// //                                 currency: "IDR",
// //                               }).format(product.quantity * product.product.price)}
// //                             </td>
// //                           </tr>
// //                         ))}
// //                       <tr>
// //                         <td colSpan="4">Subtotal:</td>
// //                         <td>{subtotal}</td>
// //                       </tr>
                      
// //                     </tbody>
// //                   </table>
                  
                  
// //                   <div>
// //                     <label>Note:</label>
// //                     <textarea
// //                       className="form-control"
// //                       value={note}
// //                       onChange={(e) => setNote(e.target.value)}
// //                       rows="3"
// //                     ></textarea>
// //                   </div>
// //                   <div className="mt-4">
// //                     <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
// //                       {isSubmitting ? "Submitting..." : "Place Order"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default Index;


// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { useNavigate } from "react-router-dom";
// import useProductStore from "../../store/useProductStore";
// import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
// import axios from "axios";
// import toast from "react-hot-toast";

// const Index = () => {
//   const [note, setNote] = useState("");
//   const [payment_method, setPayment_method] = useState(""); // Menyimpan metode pembayaran
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [address, setAddress] = useState("");
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const lat = parseFloat(position.coords.latitude.toFixed(6));
//           const lng = parseFloat(position.coords.longitude.toFixed(6));
//           setLatitude(lat);
//           setLongitude(lng);
//           setSelectedLocation({ lat, lng });
//           fetchAddress(lat, lng);
//         },
//         () => {
//           console.error("Error: Tidak dapat mengambil lokasi pengguna.");
//         }
//       );
//     } else {
//       console.error("Geolocation not supported by this browser.");
//     }
//   }, []);
  
 

//   const fetchAddress = async (lat, lng) => {
//     const key = "AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA";
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
//     );
//     if (response.data.status !== "OK") {
//       console.error("Error: ", response.data.error_message);
//       setAddress("Error fetching address");
//       return;
//     }
//     const newAddress = response.data.results[0]?.formatted_address || "Alamat tidak ditemukan";
//     setAddress(newAddress);
//   };

//   const handleMapClick = async (e) => {
//     const lat = parseFloat(e.latLng.lat().toFixed(6));
//     const lng = parseFloat(e.latLng.lng().toFixed(6));
//     setLatitude(lat);
//     setLongitude(lng);
//     fetchAddress(lat, lng);
//     setSelectedLocation({ lat, lng });
//   };

//   const { cartItems, fetchCarts, createOrder, selectedCart, clearSelectedCart } = useProductStore();

//   useEffect(() => {
//     fetchCarts();
//     selectedCart
//   }, [fetchCarts, selectedCart]);

//   console.log("selectedCart", selectedCart)

//   const navigate = useNavigate();

//   const subtotal = selectedCart.reduce(
//     (acc, product) => acc + product.quantity * product.product.price,
//     0
//   );

// //   const handleCreate = async (e) => {
// //     e.preventDefault();
// //     if (isSubmitting) return;
// //     setIsSubmitting(true);

// //     const orderData = {
// //       items: cartItems,
// //       payment_method, // Menambahkan payment_method
// //       shipping: {
// //         // address,
// //         // note,
// //         latitude: selectedLocation?.lat,
// //         longitude: selectedLocation?.lng,
// //       },
// //     };

// // console.log("latitude", selectedLocation?.lat)
// // console.log("longitude", selectedLocation?.lng)

// //     try {
// //       for (let i = 0; i < cartItems.length; i++) {
// //         if (cartItems[i].product.stock < cartItems[i].quantity) {
// //           alert(`Stok produk ${cartItems[i].product.title} tidak mencukupi!`);
// //           return;
// //         }
// //       }
// //       await createOrder(orderData, navigate, setError);
// //       // navigate("/shop");
// //     } catch (error) {
// //       console.error("Error sending data:", error);
// //       setError("Failed to create order");
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };


// const handleCreate = async (e) => {
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
//       items: cartItems.map(item => ({
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
//       for (let i = 0; i < cartItems.length; i++) {
//           if (cartItems[i].product.stock < cartItems[i].quantity) {
//               alert(`Stok produk ${cartItems[i].product.title} tidak mencukupi!`);
//               setIsSubmitting(false);
//               return;
//           }
//       }

//       await createOrder(orderData, setError); // Panggil createOrder
//       toast.success("Pesanan berhasil dibuat!"); // Notifikasi sukses

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
//       <Navbar />
//       <div className="container-fluid py-5">
//         <div className="container py-5">
//           {error && <p className="text-danger">{error}</p>}
//           <h1 className="mb-4">Billing details</h1>
//           <form onSubmit={handleCreate}>
//             <div className="row g-5">
//               <div className="col-md-12 col-lg-6">
//                 <h1>Order Form</h1>
//                 <div>
//                   <label>Latitude: </label>
//                   <input type="text" value={latitude || ""} readOnly />
//                 </div>
//                 <div>
//                   <label>Longitude: </label>
//                   <input type="text" value={longitude || ""} readOnly />
//                 </div>
//                 <div>
//                   <label>Address: </label>
//                   <input type="text" value={address} readOnly />
//                 </div>

//                 <div>
//                   <label>Payment Method:</label>
//                   <div className="form-check">
//                     <input
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

//                 <LoadScript googleMapsApiKey="AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA">
//                   <GoogleMap
//                     mapContainerStyle={{ height: "400px", width: "100%" }}
//                     center={selectedLocation || { lat: -6.2088, lng: 106.8456 }}
//                     zoom={12}
//                     onClick={handleMapClick}
//                   >
//                     {selectedLocation && (
//                       <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
//                         <InfoWindow position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}>
//                           <div>
//                             <h3>{address}</h3>
//                           </div>
//                         </InfoWindow>
//                       </Marker>
//                     )}
//                   </GoogleMap>
//                 </LoadScript>
//               </div>

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
//             </div>
//           </form>
//         </div>
//       </div>
//       <Footer />
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

const Index = () => {
  // ... state lainnya
    const [note, setNote] = useState("");
  const [payment_method, setPayment_method] = useState(""); // Menyimpan metode pembayaran
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [inputAddress, setInputAddress] = useState(""); // Tambah state untuk input alamat

  // Fungsi untuk mencari alamat dari input teks
  const handleAddressSearch = async () => {
    if (!inputAddress.trim()) return;
    
    const key = "AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA";
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

  // Modifikasi fungsi fetchAddress untuk update input
  const fetchAddress = async (lat, lng) => {
    const key = "AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA";
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

  // Modifikasi handleMapClick
  const handleMapClick = async (e) => {
    const lat = parseFloat(e.latLng.lat().toFixed(6));
    const lng = parseFloat(e.latLng.lng().toFixed(6));
    setLatitude(lat);
    setLongitude(lng);
    fetchAddress(lat, lng);
    setSelectedLocation({ lat, lng });
  };

  const { cartItems, fetchCarts, createOrder, selectedCart, clearSelectedCart } = useProductStore();

    useEffect(() => {
      fetchCarts();
      selectedCart
    }, [fetchCarts, selectedCart]);
  
    console.log("selectedCart", selectedCart)
  
    const navigate = useNavigate();
  
    const subtotal = selectedCart.reduce(
      (acc, product) => acc + product.quantity * product.product.price,
      0
    );

  const handleCreate = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);

  // Validasi data sebelum membuat pesanan
  if (!payment_method) {
      alert("Silakan pilih metode pembayaran!");
      setIsSubmitting(false);
      return;
  }

  if (!selectedLocation || !selectedLocation.lat || !selectedLocation.lng) {
      alert("Silakan pilih lokasi pengiriman!");
      setIsSubmitting(false);
      return;
  }

  const orderData = {
      items: selectedCart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
      })),
      payment_method,
      shipping_cost: {
          latitude: parseFloat(selectedLocation.lat.toFixed(6)),
          longitude: parseFloat(selectedLocation.lng.toFixed(6)),
      },
  };

  console.log("Order Data:", orderData);

  try {
      // Validasi stok produk
      for (let i = 0; i < selectedCart.length; i++) {
          if (selectedCart[i].product.stock < selectedCart[i].quantity) {
              alert(`Stok produk ${selectedCart[i].product.title} tidak mencukupi!`);
              setIsSubmitting(false);
              return;
          }
      }

      await createOrder(orderData, setError); // Panggil createOrder
      toast.success("Pesanan berhasil dibuat!"); // Notifikasi sukses
      navigate("/payment");

  } catch (error) {
      console.error("Error sending data:", error);

      // Penanganan error yang lebih baik
      if (error.response) {
          // Error dari server (4xx atau 5xx)
          setError(error.response.data?.message || "Failed to create order.");
      } else if (error.request) {
          // Tidak ada respons dari server
          setError("No response from server. Please check your connection.");
      } else {
          // Error lainnya (misalnya, error JavaScript)
          setError("An unexpected error occurred. Please try again.");
      }
  } finally {
      setIsSubmitting(false);
  }
};

const handleClear = () => {
  clearSelectedCart();
  navigate("/cart")
};

  return (
    <>
    { selectedCart.length === 0 ? (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Keranjang Kosong!</h4> 
          <p>Silakan kembali ke <a href="/cart">halaman toko</a> untuk menambahkan produk ke keranjang.</p> 
      </div>
      </div>
    ):(
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
                      onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
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
                    <LoadScript googleMapsApiKey="AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA">
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
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </div>

              </div>
              {/* Metode Pembayaran */}
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
                      {selectedCart &&
                        selectedCart.map((product) => (
                          <tr key={product.product.id}>
                            <th scope="row">
                              <div className="d-flex align-items-center mt-2">
                                <img
                                  src={product.product.image_url}
                                  className="img-fluid rounded-circle"
                                  style={{ width: 90, height: 90 }}
                                  alt=""
                                />
                              </div>
                            </th>
                            <td>{product.product.name}</td>
                            <td>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(product.product.price)}
                            </td>
                            <td>{product.quantity}</td>
                            <td>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(product.quantity * product.product.price)}
                            </td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan="4">Subtotal:</td>
                        <td>{subtotal}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* <div>
                    <label>Note:</label>
                    <textarea
                      className="form-control"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows="3"
                    ></textarea>
                  </div> */}
                  <div className="d-flex justify-content-between gap-3 mt-4 w-50">
                  <button 
  type="button" 
  className="btn btn-danger ms-2" 
  style={{width: "95%"}}
  onClick={handleClear}
>
  Cancel
</button>
                    <button type="submit" className="btn btn-primary" style={{width: "95%"}} disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Place Order"}
                    </button>
                  </div>
                </div>
              </div>

              {/* ... Bagian kanan (keranjang belanja) tetap sama ... */}
            </div>
          </form>
        </div>
      </div>
      <Footer />
      </>
    )
  }
      
    </>
  );
};

export default Index;