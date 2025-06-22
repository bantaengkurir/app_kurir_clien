//! Kode awal yang mererender modal konfirmasi pesanan 3 kali
// import {
//   Card,
//   Row,
//   Col,
//   Spinner,
//   Badge,
//   Button,
//   Tabs,
//   Tab,
//   CardFooter,
// } from "react-bootstrap";
// import Navbar from "../../components/Navbar";
// import useProductStore from "../../store/useProductStore";
// import { useEffect, useRef, useState } from "react";
// import "./style.css";
// import { format, isValid } from "date-fns";
// import { id } from "date-fns/locale";
// import toast from "react-hot-toast";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
// import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
// import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
// import { RoutingMachine } from "./RoutingMachine"; // Buat komponen ini
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-rotatedmarker";
// import "../../assets/Leaflet.MovingMarker/MovingMarker";
// import { v4 as uuidv4 } from 'uuid';

// // Fix leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markericon2x,
//   iconUrl: markericon,
//   shadowUrl: markericonshadow,
// });

// const StatusTabs = ({ activeTab, setActiveTab }) => {
//   return (
//     <Tabs
//       activeKey={activeTab}
//       onSelect={(k) => setActiveTab(k)}
//       className="mb-4 status-tabs"
//       variant="pills"
//     >
//       <Tab eventKey="pending" title="Pending" />
//       <Tab eventKey="process" title="Dalam Proses" />
//       <Tab eventKey="completed" title="Selesai" />
//       <Tab eventKey="cancelled" title="Dibatalkan" />
//     </Tabs>
//   );
// };

// import WebSocketService from "../../utils/Websocet";
// import courierIcon from "../../assets/image/courier.png"; // Siapkan ikon motor
// import customerIcon from "../../assets/image/customer.png"; // Siapkan ikon motor
// import shopIcon from "../../assets/image/shop.png"; // Siapkan ikon motor
// import OrderTracking from "../Tracking/OrderTracking";
// import CourierTracking from "../Tracking/CourierTracking";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import OrderHistories from "./OrderHistory";
// import { ConfirmationModal } from "./KonfirmationModal";

// // Buat custom icon untuk kurir
// const CourierIcon = L.icon({
//   iconUrl: courierIcon,
//   iconSize: [82, 82],
//   iconAnchor: [45, 62],
//   popupAnchor: [0, -32],
//   rotationOrigin: "center center",
// });

// const CustomerIcon = L.icon({
//   iconUrl: customerIcon,
//   iconSize: [82, 82],
//   iconAnchor: [45, 62],
//   popupAnchor: [0, -32],
// });

// const ShopIcon = L.icon({
//   iconUrl: shopIcon,
//   iconSize: [42, 42],
//   iconAnchor: [22, 42],
//   popupAnchor: [0, -32],
// });

// // Komponen Marker Kurir dengan Animasi
// const AnimatedCourierMarker = ({ position, map, order }) => {
//   const markerRef = useRef(null);
//   const prevPositionRef = useRef(null);

//   // Fungsi untuk menghitung arah
//   const calculateBearing = (start, end) => {
//     const startLat = start.lat;
//     const startLng = start.lng;
//     const endLat = end.lat;
//     const endLng = end.lng;

//     const dLng = ((endLng - startLng) * Math.PI) / 180;
//     const lat1 = (startLat * Math.PI) / 180;
//     const lat2 = (endLat * Math.PI) / 180;

//     const y = Math.sin(dLng) * Math.cos(lat2);
//     const x =
//       Math.cos(lat1) * Math.sin(lat2) -
//       Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
//     let bearing = Math.atan2(y, x);
//     bearing = (bearing * 180) / Math.PI;
//     bearing = (bearing + 360) % 360;
//     return bearing;
//   };

//   useEffect(() => {
//     if (map && position) {
//       if (!markerRef.current) {
//         markerRef.current = L.Marker.movingMarker(
//           [position],
//           [5000], // Durasi animasi (ms)
//           {
//             icon: CourierIcon,
//             autostart: true,
//             rotationAngle: 0,
//           }
//         ).addTo(map);

//         // Tambahkan popup
//         markerRef.current.bindPopup(
//           `<strong>Kurir</strong><br>${order.courier?.name}`
//         );
//       } else {
//         const newPos = L.latLng(position);
//         const oldPos = prevPositionRef.current;

//         if (oldPos && !newPos.equals(oldPos)) {
//           // Hitung arah dan animasi
//           const bearing = calculateBearing(oldPos, newPos);
//           markerRef.current.setRotationAngle(bearing);
//           markerRef.current.moveTo(newPos, 2000); // Durasi perpindahan (ms)
//         }
//         prevPositionRef.current = newPos;
//       }
//     }

//     return () => {
//       if (markerRef.current) {
//         markerRef.current.stop();
//         markerRef.current.remove();
//       }
//     };
//   }, [position, map, order]);

//   return null;
// };

// import "leaflet/dist/leaflet.css";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import { CancelModal } from "./CancelModal ";
// import { useNavigate } from "react-router-dom";

// const OrderMap = ({ order }) => {
//   const [map, setMap] = useState(null);
//   const [courierPosition, setCourierPosition] = useState(null);
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [sellers, setSellers] = useState([]);
//   const [routingControls, setRoutingControls] = useState([]);
//   const [refreshKey, setRefreshKey] = useState(0);

//   console.log("ini seller", sellers);

//   // Fungsi validasi koordinat
//   const isValidCoordinate = (lat, lng) => {
//     return (
//       !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
//     );
//   };

//   // Setup WebSocket
//   useEffect(() => {
//     let animationFrameId;
//     const smoothTransition = (newPos) => {
//       setCourierPosition((prev) => {
//         if (!prev) return newPos;
//         const step = 0.1; // Kehalusan animasi
//         return [
//           prev[0] + (newPos[0] - prev[0]) * step,
//           prev[1] + (newPos[1] - prev[1]) * step,
//         ];
//       });
//       animationFrameId = requestAnimationFrame(() => smoothTransition(newPos));
//     };

//     const handleLocationUpdate = (data) => {
//       if (isValidCoordinate(data.latitude, data.longitude)) {
//         cancelAnimationFrame(animationFrameId);
//         smoothTransition([data.latitude, data.longitude]);
//       }
//     };

//     if (order?.order_id && order.status !== "completed") {
//       WebSocketService.connect(order.order_id);
//       WebSocketService.addCallback("location_update", handleLocationUpdate);
//     }

//     return () => {
//       WebSocketService.removeCallback("location_update", handleLocationUpdate);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [order?.order_id, order?.status]);

//   // Inisialisasi posisi awal
//   useEffect(() => {
//     if (order) {
//       // Customer position
//       const custLat = parseFloat(order.shipping_cost[0]?.latitude);
//       const custLng = parseFloat(order.shipping_cost[0]?.longitude);
//       if (isValidCoordinate(custLat, custLng)) {
//         setCustomerPosition([custLat, custLng]);
//       }

//       // Courier position (hanya jika status bukan 'completed')
//       if (order.status !== "completed") {
//         const courLat = parseFloat(order.courier?.latitude);
//         const courLng = parseFloat(order.courier?.longitude);
//         if (isValidCoordinate(courLat, courLng)) {
//           setCourierPosition([courLat, courLng]);
//         }
//       }

//       // Seller positions
//       const validSellers = order.items.reduce((acc, item) => {
//         const lat = parseFloat(item.seller_latitude);
//         const lng = parseFloat(item.seller_longitude);
//         if (isValidCoordinate(lat, lng)) {
//           acc.push({
//             position: [lat, lng],
//             name: item.seller_name,
//             address: item.seller_address,
//           });
//         }
//         return acc;
//       }, []);
//       setSellers(validSellers);
//     }
//   }, [order]);

//   // Update rute saat posisi berubah (hanya jika status bukan 'completed')
//   useEffect(() => {
//     if (
//       map &&
//       courierPosition &&
//       customerPosition &&
//       order.status !== "completed"
//     ) {
//       // Hapus rute sebelumnya
//       routingControls.forEach((control) => map.removeControl(control));

//       const newRoutingControls = [];

//       // Warna hijau untuk semua rute
//       const greenRouteStyle = {
//         color: "#4CAF50", // Warna hijau lebih modern
//         opacity: 0.8,
//         weight: 20,
//         dashArray: "10, 10", // Tambahkan garis putus untuk membedakan arah
//       };

//       // Rute dari kurir ke customer
//       const toCustomer = L.Routing.control({
//         waypoints: [
//           L.latLng(...courierPosition),
//           L.latLng(...customerPosition),
//         ],
//         lineOptions: {
//           styles: [greenRouteStyle],
//         },
//         show: false,
//         addWaypoints: false,
//         createMarker: () => null, // Hilangkan marker default
//       }).addTo(map);
//       newRoutingControls.push(toCustomer);

//       setRoutingControls(newRoutingControls);
//     }
//   }, [courierPosition, customerPosition, map, order.status]);

//   // Refresh peta setiap 15 detik
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRefreshKey((prevKey) => prevKey + 1); // Perbarui refreshKey setiap 15 detik
//     }, 30000);

//     return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
//   }, []);

//   const LeafletRoutingMachine = ({ position, destination, color }) => {
//     const map = useMap();

//     useEffect(() => {
//       if (!position || !destination || order.status === "completed") return;

//       const routingControl = L.Routing.control({
//         waypoints: [
//           L.latLng(position[0], position[1]),
//           L.latLng(destination[0], destination[1]),
//         ],
//         lineOptions: {
//           styles: [
//             {
//               color: color,
//               opacity: 0.8,
//               weight: 5,
//               dashArray: "5,5",
//             },
//           ],
//         },
//         show: false,
//         addWaypoints: false,
//         createMarker: () => null,
//       }).addTo(map);

//       return () => map.removeControl(routingControl);
//     }, [map, position, destination, color, order.status]);

//     return null;
//   };

//   return (
//     <Card className="mb-4 map-card">
//       <Card.Header className="bg-primary text-white">
//         Pelacakan Pengiriman Real-time
//       </Card.Header>
//       <Card.Body style={{ height: "500px" }}>
//         <MapContainer
//           key={refreshKey}
//           center={
//             customerPosition || courierPosition || [-5.547964, 119.945908]
//           }
//           zoom={customerPosition ? 15 : 13} // Default zoom 15 jika ada customerPosition
//           scrollWheelZoom={false}
//           style={{ height: "100%", width: "100%" }}
//           whenCreated={setMap}
//         >
//           {/* Tampilkan rute hanya jika status bukan 'completed' */}
//           {order.status !== "completed" && (
//             <LeafletRoutingMachine
//               position={courierPosition}
//               destination={customerPosition}
//               color="#4CAF50"
//             />
//           )}
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Marker Customer */}
//           {customerPosition && (
//             <Marker position={customerPosition} icon={CustomerIcon}>
//               <Popup>
//                 <div>
//                   <strong>Lokasi Pelanggan</strong>
//                   <br />
//                   {order.shipping_cost[0]?.address}
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* Marker Kurir dengan Animasi (hanya jika status bukan 'completed') */}
//           {courierPosition && order.status !== "completed" && (
//             <>
//               <AnimatedCourierMarker
//                 position={courierPosition}
//                 map={map}
//                 order={order}
//                 icon={courierIcon}
//               />
//               <Marker position={courierPosition} icon={CourierIcon}>
//                 <Popup>
//                   <div>
//                     <strong>Kurir</strong>
//                     <br />
//                     {order.courier?.name}
//                     <br />
//                     {order.courier?.phone_number}
//                   </div>
//                 </Popup>
//               </Marker>
//             </>
//           )}

//           {/* Marker Penjual */}
//           {sellers.map((seller) => (
//             <Marker key={uuidv4()} position={seller.position} icon={ShopIcon}>
//               <Popup>
//                 <div>
//                   <strong>Penjual: {seller.name}</strong>
//                   <br />
//                   {seller.address}
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </Card.Body>
//     </Card>
//   );
// };

// const safeFormatDate = (date, dateFormat, locale) => {
//   if (!date || !isValid(new Date(date))) return "Tanggal tidak valid";
//   return format(new Date(date), dateFormat, { locale });
// };

// const Index = () => {
//   const topRef = useRef(null);
//   const [activeTab, setActiveTab] = useState("pending");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const {
//     fetchOrder,
//     orders = [],
//     fetchPayment,
//     fetchHistoriesById,
//   } = useProductStore();
//   const currentUser = useProductStore((state) => state.currentUser); // Asumsikan currentUser
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   // const [selectedOrderId, setSelectedOrderId] = useState(null); // Untuk menyimpan ID pesanan yang dipilih
//   const [showCancelModal, setShowCancelModal] = useState(false); // Untuk menampilkan modal konfirmasi pembatalan
//   const [error, setError] = useState(null); // Untuk menyimpan pesan error
//   const {
//     cancelOrder,
//     clearSelectedCart,
//     toggleCartSelection,
//     createRatProduct,
//     createRatCourier,
//   } = useProductStore(); // Ambil fungsi cancelOrder dari store
//   const [selectedOrderForMap, setSelectedOrderForMap] = useState(null); // Khusus untuk peta
// const [selectedOrderForAction, setSelectedOrderForAction] = useState(null); // Khusus untuk aksi

//   const navigate = useNavigate();

//   console.log("selected order", selectedOrder);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         await fetchOrder();
//         await fetchPayment();
//         await fetchHistoriesById();

//         WebSocketService.addCallback("status_update", (data) => {
//           useProductStore.setState((state) => ({
//             orders: state.orders.map((order) =>
//               order.order_id === data.order_id
//                 ? { ...order, status: data.status }
//                 : order
//             ),
//           }));
//         });
//       } catch (error) {
//         toast.error("Gagal memuat data");
//       }
//     };
//     loadData();

//     WebSocketService.addCallback("status_update", loadData);

//     return () => {
//       WebSocketService.removeCallback("status_update", loadData);
//     };
//   }, [fetchOrder, fetchPayment, fetchHistoriesById]);

//   // Tentukan apakah pengguna adalah kurir atau customer
//   const isCourier = currentUser?.role === "courier";

//   const filteredOrders = orders.filter(
//     (order) => order.status?.toLowerCase() === activeTab.toLowerCase()
//   );

//   const groupItemsBySeller = (items) => {
//     return items.reduce((acc, item) => {
//       const sellerId = item.seller_id;
//       if (!acc[sellerId]) {
//         acc[sellerId] = {
//           sellerInfo: {
//             id: sellerId,
//             name: item.seller_name,
//             address: item.seller_address,
//             image: item.seller_profile_image,
//           },
//           items: [],
//         };
//       }
//       acc[sellerId].items.push(item);
//       return acc;
//     }, {});
//   };

//   const getOrderSummary = (order) => {
//     const items = order.items || [];

//     // Pastikan item.price dan item.quantity adalah angka
//     const subtotal = items.reduce((sum, item) => {
//       const price = parseFloat(item.price);
//       const quantity = parseFloat(item.quantity);
//       return sum + price * quantity;
//     }, 0);

//     // Pastikan shipping_cost adalah angka
//     const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;

//     // Kembalikan hasil sebagai angka
//     return { subtotal, shipping, total: subtotal + shipping };
//   };

//   const handleCancelOrder = async (orderId) => {
//     try {
//       const result = await cancelOrder(orderId, setError); // Panggil fungsi cancelOrder
//       console.log("Order canceled successfully:", result);
//       toast.success("Pesanan berhasil dibatalkan!"); // Beri feedback ke pengguna
//       setShowCancelModal(false); // Tutup modal setelah berhasil
//       // window.location.reload();
//       // Lakukan sesuatu setelah pembatalan berhasil, seperti refresh data
//     } catch (error) {
//       console.error("Failed to cancel order:", error);
//       alert(`Gagal membatalkan pesanan: ${error.message}`); // Beri feedback error ke pengguna
//     }
//   };

//   // Fungsi untuk menangani "Beli Lagi"
//   const handleBuyAgain = (order) => {
//     // Kosongkan selectedCart terlebih dahulu
//     clearSelectedCart();

//     // Tambahkan semua item dari pesanan yang dibatalkan ke selectedCart
//     order.items.forEach((item) => {
//       toggleCartSelection(item); // Tambahkan item ke selectedCart
//     });

//     // Arahkan pengguna ke halaman /cart
//     navigate("/cart");
//   };

//   // const handleConfirm = async () => {
//   //   try {
//   //     // Update status order menjadi 'completed'
//   //     await useProductStore.getState().updateOrderStatus(selectedOrder.order_id, { status: 'completed' });

//   //     // // Membuat rating untuk produk
//   //     // const productRatingData = {
//   //     //   order_id: selectedOrder.order_id,
//   //     //   product_id: null,
//   //     //   rating: null,
//   //     //   comment: null,
//   //     // };
//   //     // await createRatProduct(productRatingData);

//   //     // Membuat rating untuk kurir
//   //     const courierRatingData = {
//   //       order_id: selectedOrder.order_id,
//   //       courier_id: null,
//   //       rating: null,
//   //       comment: null,
//   //       rating_time: new Date(),
//   //     };
//   //     await createRatCourier(courierRatingData);

//   //     // Tutup modal setelah semua proses selesai
//   //     setShowConfirmationModal(false);
//   //   } catch (error) {
//   //     console.error("Error during confirmation:", error);
//   //   }
//   // };

//   // const handleConfirm = async () => {
//   //   try {
//   //     // Update status order menjadi 'completed'
//   //     await useProductStore
//   //       .getState()
//   //       .updateOrderStatus(selectedOrder.order_id, { status: "completed" });

//   //     // Membuat rating untuk kurir
//   //     const courierRatingData = {
//   //       order_id: selectedOrder.order_id,
//   //       courier_id: selectedOrder.courier.id, // Ambil courier_id dari selectedOrder.courier.id
//   //       rating: null,
//   //       comment: null,
//   //       rating_time: new Date(),
//   //     };
//   //     await createRatCourier(courierRatingData);

//   //     // Tutup modal
//   //     setShowConfirmationModal(false);

//   //     navigate(`/rating/${selectedOrder?.order_id}/product&kurir`);
//   //     window.location.reload();
//   //   } catch (error) {
//   //     console.error("Error during confirmation:", error);
//   //   }
//   // };

//   const handleConfirm = async () => {
//   try {
//     // Tutup modal terlebih dahulu sebelum proses
//     setShowConfirmationModal(false);
    
//     if (!selectedOrderForAction) {
//       console.error("No order selected for confirmation");
//       return;
//     }

//     // Update status order
//     await useProductStore.getState().updateOrderStatus(
//       selectedOrderForAction.order_id, 
//       { status: "completed" }
//     );

//     // Buat rating kurir
//     if (selectedOrderForAction.courier?.id) {
//       await createRatCourier({
//         order_id: selectedOrderForAction.order_id,
//         courier_id: selectedOrderForAction.courier.id,
//         rating: null,
//         comment: null,
//         rating_time: new Date(),
//       });
//     }

//     // Reset state dan navigasi
//     setSelectedOrderForAction(null);
//     navigate(`/rating/${selectedOrderForAction.order_id}/product&kurir`);
    
//     // Tidak perlu reload jika menggunakan React Router v6+
//     window.location.reload(); // Hapus ini

//   } catch (error) {
//     console.error("Error during confirmation:", error);
//     // Jika error, tetap tutup modal
//     setShowConfirmationModal(false);
//     setSelectedOrderForAction(null);
//   }
// };
//    const hasDeliveryNote = (order) => {
//     if (!order.order_historie || !Array.isArray(order.order_historie)) {
//       return false;
//     }
//     return order.order_historie.some(
//       (history) => history.note === "Pesanan diterima Oleh yang bersangkutan"
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid py-4 orders-container" ref={topRef}>
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           Riwayat Pesanan
//         </h2>

//         <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//         {/* {selectedOrder && ["process", "completed"].includes(activeTab) && (
//           <Row className="mb-4">
//             <Col md={6}>
//               {isCourier ? (
//                 <CourierTracking
//                   orderId={selectedOrder.order_id}
//                   courierId={selectedOrder.courier?.id}
//                   latCourier={selectedOrder.courier?.latitude}
//                   lnCourier={selectedOrder.courier?.longitude}
//                   destination={[
//                     selectedOrder.courier?.latitude,
//                     selectedOrder.courier?.longitude,
//                   ]} // Koordinat tujuan (customer)
//                 />
//               ) : (
//                 <OrderMap order={selectedOrder} />
//               )}
//             </Col>
//             <Col md={6}>
//               <OrderHistories
//                 orderId={selectedOrder.order_id}
//                 safeFormatDate={safeFormatDate}
//               />
//             </Col>
//           </Row>
//         )} */}

//         {selectedOrderForMap && ["process", "completed"].includes(activeTab) && (
//   <Row className="mb-4">
//     <Col md={6}>
//       {isCourier ? (
//         <CourierTracking
//           orderId={selectedOrderForMap.order_id}
//           courierId={selectedOrderForMap.courier?.id}
//           latCourier={selectedOrderForMap.courier?.latitude}
//           lnCourier={selectedOrderForMap.courier?.longitude}
//           destination={[
//             selectedOrderForMap.courier?.latitude,
//             selectedOrderForMap.courier?.longitude,
//           ]}
//         />
//       ) : (
//         <OrderMap order={selectedOrderForMap} />
//       )}
//     </Col>
//     <Col md={6}>
//       <OrderHistories
//         orderId={selectedOrderForMap.order_id}
//         safeFormatDate={safeFormatDate}
//       />
//     </Col>
//   </Row>
// )}

//         {!orders.length ? (
//           <div className="text-center mt-5">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Memuat data pesanan...</p>
//           </div>
//         ) : filteredOrders.length > 0 ? (
//           filteredOrders.map((order) => {
//             const summary = getOrderSummary(order);
//             const groupedSellers = groupItemsBySeller(order.items);

//             return (
//               <Card key={uuidv4()} className="mb-4 shadow">
//                 <Card.Header className="bg-primary text-white">
//                   <Row className="align-items-center">
//                     <Col md={8}>
//                       <h4 className="mb-1">Order #{order.order_code}</h4>
//                       <small>
//                         {safeFormatDate(
//                           order.order_date,
//                           "EEEE, d MMMM yyyy HH:mm",
//                           id
//                         )}
//                       </small>
//                     </Col>
//                     <Col md={4} className="text-end">
//                       <Badge
//                         bg="light"
//                         text="dark"
//                         className="fs-6 text-wrap me-2 mb-3"
//                       >
//                         {order.payment_method}
//                       </Badge>
//                       <Badge bg="success" className="fs-6">
//                         Rp{summary.total.toLocaleString()}
//                       </Badge>
//                     </Col>
//                   </Row>
//                 </Card.Header>

//                 <Card.Body>
//                   <Row>
//                     <Col md={8}>
//                       {Object.values(groupedSellers).map((seller) => (
//                         <Card
//                           key={uuidv4()}
//                           className="mb-4 seller-card"
//                         >
//                           <Card.Header className="bg-light">
//                             <div className="d-flex align-items-center">
//                               <img
//                                 src={seller.sellerInfo.image}
//                                 alt={seller.sellerInfo.name}
//                                 className="seller-avatar me-3"
//                               />
//                               <div>
//                                 <h5 className="mb-0">
//                                   {seller.sellerInfo.name}
//                                 </h5>
//                                 <small className="text-muted">
//                                   {seller.sellerInfo.address}
//                                 </small>
//                               </div>
//                             </div>
//                           </Card.Header>
//                           <Card.Body>
//                             {seller.items.map((item) => (
//                               <div
//                                 key={uuidv4()}
//                                 className="product-item mb-3"
//                               >
//                                 <Row className="align-items-center">
//                                   <Col xs={3}>
//                                     <img
//                                       src={item.img_url}
//                                       alt={item.name}
//                                       className="img-fluid rounded product-image"
//                                     />
//                                   </Col>
//                                   <Col xs={9}>
//                                     <h6>{item.name}</h6>
//                                     <div className="d-flex justify-content-between">
//                                       <span>
//                                         Rp
//                                         {(
//                                           item.price * item.quantity
//                                         ).toLocaleString()}
//                                       </span>
//                                       <span>x{item.quantity}</span>
//                                     </div>
//                                   </Col>
//                                 </Row>
//                               </div>
//                             ))}
//                           </Card.Body>
//                         </Card>
//                       ))}
//                     </Col>

//                     {/* Bagian kanan (info kurir dan ringkasan) */}
//                     <Col md={4}>
//                       {order.status === "process" && (
//                         <Card className="mb-3">
//                           <Card.Header className="bg-light">
//                             <h5 className="mb-0">Info Kurir</h5>
//                           </Card.Header>
//                           <button
//                             onClick={() =>
//                               navigate(
//                                 `/courierinformation/${order.courier?.id}`
//                               )
//                             }
//                           >
//                             <Card.Body>
//                               <div className="d-flex align-items-center">
//                                 <img
//                                   src={order.courier?.profile_image}
//                                   alt={order.courier?.name}
//                                   className="seller-avatar me-3"
//                                 />
//                                 <div>
//                                   <h6 className="mb-1">
//                                     {order.courier?.name || "N/A"}
//                                   </h6>
//                                   <small className="text-muted">
//                                     {order.courier?.phone_number || "N/A"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </Card.Body>
//                           </button>
//                         </Card>
//                       )}
//                       {order.status === "pending" && (
//                         <Card className="mb-3">
//                           <Card.Header className="bg-light">
//                             <h5 className="mb-0">Info Kurir</h5>
//                           </Card.Header>
//                           <button
//                             onClick={() =>
//                               navigate(
//                                 `/courierinformation/${order.courier?.id}`
//                               )
//                             }
//                           >
//                             <Card.Body>
//                               <div className="d-flex align-items-center">
//                                 <img
//                                   src={order.courier?.profile_image}
//                                   alt={order.courier?.name}
//                                   className="seller-avatar me-3"
//                                 />
//                                 <div>
//                                   <h6 className="mb-1">
//                                     {order.courier?.name || "N/A"}
//                                   </h6>
//                                   <small className="text-muted">
//                                     {order.courier?.phone_number || "N/A"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </Card.Body>
//                           </button>
//                         </Card>
//                       )}

//                       <Card>
//                         <Card.Header className="bg-light">
//                           <h5 className="mb-0">Ringkasan Pembayaran</h5>
//                         </Card.Header>
//                         <Card.Body>
//                           <div className="d-flex justify-content-between mb-2">
//                             <span>Subtotal:</span>
//                             <span>Rp{summary.subtotal.toLocaleString()}</span>
//                           </div>
//                           <div className="d-flex justify-content-between mb-3">
//                             <span>Pengiriman:</span>
//                             <span>Rp{summary.shipping.toLocaleString()}</span>
//                           </div>
//                           <div className="d-flex justify-content-between mb-2">
//                             <span>Jarak Pengiriman:</span>
//                             <span>
//                               {order.shipping_cost[0]?.distance
//                                 ? `${order.shipping_cost[0].distance} Meter`
//                                 : "Tidak tersedia"}
//                             </span>
//                           </div>
//                           <div className="d-flex justify-content-between fw-bold border-top pt-2">
//                             <span>Total:</span>
//                             <span className="text-success">
//                               Rp{summary.total.toLocaleString()}
//                             </span>
//                           </div>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   </Row>
//                 </Card.Body>
//                 {order.status === "pending" && (
//                   <Card.Footer className="bg-light d-flex justify-content-between">
//                     {order.status === "pending" && (
//                       <>
//                         <Button
//                           variant="danger"
//                           className="ms-2 w-100"
//                           onClick={() => {
//                             setSelectedOrder(order); // Simpan order yang dipilih
//                             setShowCancelModal(true); // Tampilkan modal
//                           }}
//                         >
//                           Batalkan pesanan
//                         </Button>

//                         {selectedOrder && (
//                           <CancelModal
//                             show={showCancelModal}
//                             onHide={() => setShowCancelModal(false)} // Tutup modal
//                             order={order}
//                             onConfirm={() => handleCancelOrder(order.order_id)} // Konfirmasi pembatalan
//                             safeFormatDate={safeFormatDate} // Fungsi format tanggal
//                           />
//                         )}
//                       </>
//                     )}
//                   </Card.Footer>
//                 )}
//                 {order.status === "process" && (
//                   // <Card.Footer className="bg-light d-flex justify-content-between">
//                   //   {/* <Button
//                   //     className="w-50"
//                   //     variant="primary"
//                   //     onClick={() =>
//                   //       setSelectedOrder(
//                   //         selectedOrder?.order_id === order.order_id
//                   //           ? null
//                   //           : order
//                   //       )
//                   //     }
//                   //   >
//                   //     {selectedOrder?.order_id === order.order_id
//                   //       ? "Sembunyikan Detail"
//                   //       : "Lihat Detail Pengiriman"}
//                   //   </Button> */}
//                   //   <Button
//                   //     className="w-50"
//                   //     variant="primary"
//                   //     onClick={() => {
//                   //       setSelectedOrder(
//                   //         selectedOrder?.order_id === order.order_id
//                   //           ? null
//                   //           : order
//                   //       );
//                   //       // Scroll ke atas setelah 100ms (memberi waktu untuk render komponen)
//                   //       setTimeout(() => {
//                   //         topRef.current?.scrollIntoView({
//                   //           behavior: "smooth",
//                   //         });
//                   //       }, 100);
//                   //     }}
//                   //   >
//                   //     {selectedOrder?.order_id === order.order_id
//                   //       ? "Sembunyikan Detail"
//                   //       : "Lihat Detail Pengiriman"}
//                   //   </Button>
//                   //   {/* Tombol "Pesanan Diterima" */}
//                   //   {order.status === "process" && (
//                   //     <>
//                   //       <Button
//                   //         variant="success"
//                   //         className="ms-2 w-50"
//                   //         onClick={() => {
//                   //           setSelectedOrder(order); // Simpan order yang dipilih
//                   //           setShowConfirmationModal(true); // Tampilkan modal
                            
//                   //         }}
//                   //         disabled={!hasDeliveryNote(order)} // Disable jika tidak ada note
//                   //       >
//                   //         Pesanan Diterima
//                   //       </Button>

//                   //       {selectedOrder && (
//                   //         <ConfirmationModal
//                   //           show={showConfirmationModal}
//                   //           onHide={() => setShowConfirmationModal(false)}
//                   //           order={selectedOrder} // Kirim order yang dipilih ke modal
//                   //           onConfirm={handleConfirm}
//                   //           safeFormatDate={safeFormatDate}
//                   //         />
//                   //       )}
//                   //     </>
//                   //   )}
//                   // </Card.Footer>

//                   <Card.Footer className="bg-light d-flex justify-content-between">
//   {/* Tombol Lihat Detail Pengiriman */}
//   <Button
//     className="w-50"
//     variant="primary"
//     onClick={() => {
//       setSelectedOrderForMap(
//         selectedOrderForMap?.order_id === order.order_id ? null : order
//       );
//       setTimeout(() => {
//         topRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 100);
//     }}
//   >
//     {selectedOrderForMap?.order_id === order.order_id
//       ? "Sembunyikan Detail"
//       : "Lihat Detail Pengiriman"}
//   </Button>

//   {/* Tombol Pesanan Diterima */}
//   {order.status === "process" && (
//     <>
//       <Button
//   variant="success"
//   className="ms-2 w-50"
//   onClick={() => {
//     // Pastikan hanya menyetel order jika belum ada
//     if (!selectedOrderForAction) {
//       setSelectedOrderForAction(order);
//     }
//     setShowConfirmationModal(true);
//   }}
//   disabled={!hasDeliveryNote(order)}
// >
//   Pesanan Diterima
// </Button>

//       {showConfirmationModal && selectedOrderForAction && (
//   <ConfirmationModal
//     show={showConfirmationModal}
//     onHide={() => {
//       setShowConfirmationModal(false);
//       setSelectedOrderForAction(null);
//     }}
//     order={selectedOrderForAction}
//     onConfirm={handleConfirm}
//     safeFormatDate={safeFormatDate}
//   />
// )}
//     </>
//   )}
// </Card.Footer>
//                 )}
//                 {order.status === "completed" && (
//                   <Card.Footer className="bg-light d-flex justify-content-between">
//                     <Button
//                       className="w-100"
//                       variant="primary"
//                       onClick={() => {
//                         setSelectedOrder(
//                           selectedOrder?.order_id === order.order_id
//                             ? null
//                             : order
//                         );
//                         setTimeout(() => {
//                           topRef.current?.scrollIntoView({
//                             behavior: "smooth",
//                           });
//                         }, 100);
//                       }}
//                     >
//                       {selectedOrder?.order_id === order.order_id
//                         ? "Sembunyikan Detail"
//                         : "Lihat Detail Pengiriman"}
//                     </Button>
//                   </Card.Footer>
//                 )}

//                 {/* {order.status === 'cancelled' && (
// 					<Card.Footer className="bg-light d-flex justify-content-between">
// 					<Button 
// 				  className="w-100"
//                     variant="primary" 
//                     onClick={() => setSelectedOrder(selectedOrder?.order_id === order.order_id ? null : order)}
//                   >
//                     {selectedOrder?.order_id === order.order_id ? 
//                       'Sembunyikan Detail' : 'Lihat Detail Pengiriman'}
					  
//                   </Button>
// 				  </Card.Footer>
// 				)} */}
//               </Card>
//             );
//           })
//         ) : (
//           <div className="alert alert-info mt-4">
//             Tidak ada pesanan dengan status ini
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Index;


//! kode yang sudah diperbaiki dan belum menggunakan tailwind css serta masih ada error remove layer
// import {
//   Card,
//   Row,
//   Col,
//   Spinner,
//   Badge,
//   Button,
//   Tabs,
//   Tab,
//   CardFooter,
// } from "react-bootstrap";
// import Navbar from "../../components/Navbar";
// import useProductStore from "../../store/useProductStore";
// import { useCallback, useEffect, useRef, useState } from "react";
// import "./style.css";
// import { format, isValid } from "date-fns";
// import { id } from "date-fns/locale";
// import toast from "react-hot-toast";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
// import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
// import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-rotatedmarker";
// import "../../assets/Leaflet.MovingMarker/MovingMarker";
// import { v4 as uuidv4 } from 'uuid';
// import WebSocketService from "../../utils/Websocet";
// import courierIcon from "../../assets/image/courier.png";
// import customerIcon from "../../assets/image/customer.png";
// import shopIcon from "../../assets/image/shop.png";
// import OrderTracking from "../Tracking/OrderTracking";
// import CourierTracking from "../Tracking/CourierTracking";
// import OrderHistories from "./OrderHistory";
// import { ConfirmationModal } from "./KonfirmationModal";
// import { CancelModal } from "./CancelModal ";
// import { useNavigate } from "react-router-dom";

// // Fix leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markericon2x,
//   iconUrl: markericon,
//   shadowUrl: markericonshadow,
// });

// // const StatusTabs = ({ activeTab, setActiveTab }) => {
// //   return (
// //     <Tabs
// //       activeKey={activeTab}
// //       onSelect={(k) => setActiveTab(k)}
// //       className="mb-4 status-tabs"
// //       variant="pills"
// //     >
// //       <Tab eventKey="pending" title="Pending" />
// //       <Tab eventKey="process" title="Dalam Proses" />
// //       <Tab eventKey="completed" title="Selesai" />
// //       <Tab eventKey="cancelled" title="Dibatalkan" />
// //     </Tabs>
// //   );
// // };

// const StatusTabs = ({ activeTab, setActiveTab }) => {
//   return (
//     <div className="relative">
//       <div className="flex overflow-x-auto pb-2 hide-scrollbar">
//         <Tabs
//           activeKey={activeTab}
//           onSelect={(k) => setActiveTab(k)}
//           className="flex-nowrap whitespace-nowrap mb-4"
//           variant="pills"
//         >
//           <Tab eventKey="pending" title="Pending" className="inline-block" />
//           <Tab eventKey="process" title="Dalam Proses" className="inline-block" />
//           <Tab eventKey="completed" title="Selesai" className="inline-block" />
//           <Tab eventKey="cancelled" title="Dibatalkan" className="inline-block" />
//         </Tabs>
//       </div>
//     </div>
//   );
// };


// const OrderMap = ({ order }) => {
//   const mapRef = useRef(null);
//   const routingControlRef = useRef(null);
//   const markersRef = useRef([]);
//   const [positions, setPositions] = useState({
//     courier: null,
//     customer: null,
//     sellers: []
//   });

//   // Inisialisasi icon
//   const CourierIcon = L.icon({
//     iconUrl: courierIcon,
//     iconSize: [82, 82],
//     iconAnchor: [45, 62],
//     popupAnchor: [0, -32],
//     rotationOrigin: "center center",
//   });

//   const CustomerIcon = L.icon({
//     iconUrl: customerIcon,
//     iconSize: [82, 82],
//     iconAnchor: [45, 62],
//     popupAnchor: [0, -32],
//   });

//   const ShopIcon = L.icon({
//     iconUrl: shopIcon,
//     iconSize: [42, 42],
//     iconAnchor: [22, 42],
//     popupAnchor: [0, -32],
//   });

//   // Fungsi cleanup peta
//   const cleanupMap = useCallback(() => {
//     if (routingControlRef.current && mapRef.current) {
//       try {
//         mapRef.current.removeControl(routingControlRef.current);
//       } catch (e) {
//         console.warn("Failed to remove routing control:", e);
//       }
//       routingControlRef.current = null;
//     }

//     markersRef.current.forEach(marker => {
//       if (marker && mapRef.current) {
//         try {
//           if (marker.stop) marker.stop();
//           mapRef.current.removeLayer(marker);
//         } catch (e) {
//           console.warn("Failed to remove marker:", e);
//         }
//       }
//     });
//     markersRef.current = [];

//     if (mapRef.current) {
//       try {
//         mapRef.current.remove();
//       } catch (e) {
//         console.warn("Failed to remove map:", e);
//       }
//       mapRef.current = null;
//     }
//   }, []);

//   // Validasi koordinat
//   const isValidCoord = (lat, lng) => {
//     return lat && lng && !isNaN(lat) && !isNaN(lng);
//   };

//   // Ekstrak posisi dari order data
//   useEffect(() => {
//     if (!order) {
//       setPositions({
//         courier: null,
//         customer: null,
//         sellers: []
//       });
//       return;
//     }

//     const newPositions = {
//       courier: null,
//       customer: null,
//       sellers: []
//     };

//     // Posisi customer
//     const custLat = parseFloat(order.shipping_cost[0]?.latitude);
//     const custLng = parseFloat(order.shipping_cost[0]?.longitude);
//     if (isValidCoord(custLat, custLng)) {
//       newPositions.customer = [custLat, custLng];
//     }

//     // Posisi kurir (hanya jika order aktif)
//     if (order.status !== "completed") {
//       const courLat = parseFloat(order.courier?.latitude);
//       const courLng = parseFloat(order.courier?.longitude);
//       if (isValidCoord(courLat, courLng)) {
//         newPositions.courier = [courLat, courLng];
//       }
//     }

//     // Posisi sellers
//     newPositions.sellers = order.items.reduce((acc, item) => {
//       const lat = parseFloat(item.seller_latitude);
//       const lng = parseFloat(item.seller_longitude);
//       if (isValidCoord(lat, lng)) {
//         acc.push({
//           position: [lat, lng],
//           name: item.seller_name,
//           address: item.seller_address
//         });
//       }
//       return acc;
//     }, []);

//     setPositions(newPositions);
//   }, [order]);

//   // Inisialisasi peta
//   useEffect(() => {
//     if (!positions.customer) {
//       cleanupMap();
//       return;
//     }

//     cleanupMap(); // Bersihkan peta sebelumnya

//     const center = positions.customer || [-6.1754, 106.8272];
//     const map = L.map('map-container', {
//       center,
//       zoom: 15
//     });

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);

//     mapRef.current = map;

//     return () => {
//       cleanupMap();
//     };
//   }, [positions.customer, cleanupMap]);

//   // Update routing dan markers
//   useEffect(() => {
//     if (!mapRef.current || !positions.customer) return;

//     // Hapus routing sebelumnya
//     if (routingControlRef.current) {
//       try {
//         mapRef.current.removeControl(routingControlRef.current);
//       } catch (e) {
//         console.warn("Failed to remove routing control:", e);
//       }
//       routingControlRef.current = null;
//     }

//     // Hapus markers sebelumnya
//     markersRef.current.forEach(marker => {
//       if (marker && mapRef.current) {
//         try {
//           if (marker.stop) marker.stop();
//           mapRef.current.removeLayer(marker);
//         } catch (e) {
//           console.warn("Failed to remove marker:", e);
//         }
//       }
//     });
//     markersRef.current = [];

//     // Tambahkan markers
//     // Marker customer
//     if (positions.customer) {
//       const customerMarker = L.marker(positions.customer, { icon: CustomerIcon })
//         .bindPopup(`<b>Customer</b><br>${order.shipping_cost[0]?.address || ''}`)
//         .addTo(mapRef.current);
//       markersRef.current.push(customerMarker);
//     }

//     // Marker kurir (hanya jika ada posisi dan order belum selesai)
//     if (positions.courier && order.status !== "completed") {
//       const courierMarker = L.marker(positions.courier, {
//         icon: CourierIcon,
//         rotationAngle: order.courier?.bearing || 0
//       })
//         .bindPopup(`<b>Courier</b><br>${order.courier?.name || ''}`)
//         .addTo(mapRef.current);
//       markersRef.current.push(courierMarker);

//       // Tambahkan routing jika ada posisi kurir dan customer
//       if (positions.courier && positions.customer) {
//         try {
//           routingControlRef.current = L.Routing.control({
//             waypoints: [
//               L.latLng(...positions.courier),
//               L.latLng(...positions.customer)
//             ],
//             lineOptions: {
//               styles: [{ color: '#4CAF50', opacity: 0.8, weight: 5 }]
//             },
//             show: false,
//             addWaypoints: false,
//             createMarker: () => null
//           }).addTo(mapRef.current);
//         } catch (e) {
//           console.error("Routing error:", e);
//         }
//       }
//     }

//     // Marker sellers
//     positions.sellers.forEach(seller => {
//       const sellerMarker = L.marker(seller.position, { icon: ShopIcon })
//         .bindPopup(`<b>Seller: ${seller.name}</b><br>${seller.address}`)
//         .addTo(mapRef.current);
//       markersRef.current.push(sellerMarker);
//     });

//     // Fit bounds untuk mencakup semua marker
//     if (markersRef.current.length > 0) {
//       const group = new L.featureGroup(markersRef.current.filter(m => m));
//       mapRef.current.fitBounds(group.getBounds().pad(0.2)); // Tambahkan padding
//     }

//   }, [positions, order]);

//   if (!order || !order.shipping_cost || order.shipping_cost.length === 0) {
//     return <div className="text-center p-5">Data pengiriman tidak tersedia</div>;
//   }

//   return (
//     <div 
//       id="map-container" 
//       style={{ height: "500px", width: "100%" }}
//       key={`map-${order?.order_id || 'default'}`}
//     />
//   );
// };

// const safeFormatDate = (date, dateFormat, locale) => {
//   if (!date || !isValid(new Date(date))) return "Tanggal tidak valid";
//   return format(new Date(date), dateFormat, { locale });
// };

// const Index = () => {
//   const topRef = useRef(null);
//   const [activeTab, setActiveTab] = useState("pending");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedOrderForMap, setSelectedOrderForMap] = useState(null);
//   const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const {
//     fetchOrder,
//     orders = [],
//     fetchPayment,
//     fetchHistoriesById,
//     cancelOrder,
//     clearSelectedCart,
//     toggleCartSelection,
//     createRatProduct,
//     createRatCourier,
//   } = useProductStore();

//   const currentUser = useProductStore((state) => state.currentUser);
//   const isCourier = currentUser?.role === "courier";

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         await fetchOrder();
//         await fetchPayment();
//         await fetchHistoriesById();

//         WebSocketService.addCallback("status_update", (data) => {
//           useProductStore.setState((state) => ({
//             orders: state.orders.map((order) =>
//               order.order_id === data.order_id
//                 ? { ...order, status: data.status }
//                 : order
//             ),
//           }));
//         });
//       } catch (error) {
//         toast.error("Gagal memuat data");
//       }
//     };
//     loadData();

//     WebSocketService.addCallback("status_update", loadData);

//     return () => {
//       WebSocketService.removeCallback("status_update", loadData);
//     };
//   }, [fetchOrder, fetchPayment, fetchHistoriesById]);

//   const filteredOrders = orders.filter(
//     (order) => order.status?.toLowerCase() === activeTab.toLowerCase()
//   );

//   const groupItemsBySeller = (items) => {
//     return items.reduce((acc, item) => {
//       const sellerId = item.seller_id;
//       if (!acc[sellerId]) {
//         acc[sellerId] = {
//           sellerInfo: {
//             id: sellerId,
//             name: item.seller_name,
//             address: item.seller_address,
//             image: item.seller_profile_image,
//           },
//           items: [],
//         };
//       }
//       acc[sellerId].items.push(item);
//       return acc;
//     }, {});
//   };

//   const getOrderSummary = (order) => {
//     const items = order.items || [];
//     const subtotal = items.reduce((sum, item) => {
//       const price = parseFloat(item.price);
//       const quantity = parseFloat(item.quantity);
//       return sum + price * quantity;
//     }, 0);
//     const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;
//     return { subtotal, shipping, total: subtotal + shipping };
//   };

//   const handleCancelOrder = async (orderId) => {
//     try {
//       const result = await cancelOrder(orderId, setError);
//       console.log("Order canceled successfully:", result);
//       toast.success("Pesanan berhasil dibatalkan!");
//       setShowCancelModal(false);
//     } catch (error) {
//       console.error("Failed to cancel order:", error);
//       alert(`Gagal membatalkan pesanan: ${error.message}`);
//     }
//   };

//   const handleBuyAgain = (order) => {
//     clearSelectedCart();
//     order.items.forEach((item) => {
//       toggleCartSelection(item);
//     });
//     navigate("/cart");
//   };

//   const handleConfirm = async () => {
//     try {
//       setShowConfirmationModal(false);
      
//       if (!selectedOrderForAction) {
//         console.error("No order selected for confirmation");
//         return;
//       }

//       await useProductStore.getState().updateOrderStatus(
//         selectedOrderForAction.order_id, 
//         { status: "completed" }
//       );

//       if (selectedOrderForAction.courier?.id) {
//         await createRatCourier({
//           order_id: selectedOrderForAction.order_id,
//           courier_id: selectedOrderForAction.courier.id,
//           rating: null,
//           comment: null,
//           rating_time: new Date(),
//         });
//       }

//       setSelectedOrderForAction(null);
//       navigate(`/rating/${selectedOrderForAction.order_id}/product&kurir`);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error during confirmation:", error);
//       setShowConfirmationModal(false);
//       setSelectedOrderForAction(null);
//     }
//   };

//   const hasDeliveryNote = (order) => {
//     if (!order.order_historie || !Array.isArray(order.order_historie)) {
//       return false;
//     }
//     return order.order_historie.some(
//       (history) => history.note === "Pesanan diterima Oleh yang bersangkutan"
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid py-4 orders-container" ref={topRef}>
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           Riwayat Pesanan
//         </h2>

//         <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//         {selectedOrderForMap && ["process", "completed"].includes(activeTab) && (
//           <Row className="mb-4">
//             <Col md={6}>
//               {isCourier ? (
//                 <CourierTracking
//                   orderId={selectedOrderForMap.order_id}
//                   courierId={selectedOrderForMap.courier?.id}
//                   latCourier={selectedOrderForMap.courier?.latitude}
//                   lnCourier={selectedOrderForMap.courier?.longitude}
//                   destination={[
//                     selectedOrderForMap.courier?.latitude,
//                     selectedOrderForMap.courier?.longitude,
//                   ]}
//                 />
//               ) : (
//                 <OrderMap order={selectedOrderForMap} />
//               )}
//             </Col>
//             <Col md={6}>
//               <OrderHistories
//                 orderId={selectedOrderForMap.order_id}
//                 safeFormatDate={safeFormatDate}
//               />
//             </Col>
//           </Row>
//         )}

//         {!orders.length ? (
//           <div className="text-center mt-5">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Memuat data pesanan...</p>
//           </div>
//         ) : filteredOrders.length > 0 ? (
//           filteredOrders.map((order) => {
//             const summary = getOrderSummary(order);
//             const groupedSellers = groupItemsBySeller(order.items);

//             return (
//               <Card key={uuidv4()} className="mb-4 shadow">
//                 <Card.Header className="bg-primary text-white">
//                   <Row className="align-items-center">
//                     <Col md={8}>
//                       <h4 className="mb-1">Order #{order.order_code}</h4>
//                       <small>
//                         {safeFormatDate(
//                           order.order_date,
//                           "EEEE, d MMMM yyyy HH:mm",
//                           id
//                         )}
//                       </small>
//                     </Col>
//                     <Col md={4} className="text-end">
//                       <Badge
//                         bg="light"
//                         text="dark"
//                         className="fs-6 text-wrap me-2 mb-3"
//                       >
//                         {order.payment_method}
//                       </Badge>
//                       <Badge bg="success" className="fs-6">
//                         Rp{summary.total.toLocaleString()}
//                       </Badge>
//                     </Col>
//                   </Row>
//                 </Card.Header>

//                 <Card.Body>
//                   <Row>
//                     <Col md={8}>
//                       {Object.values(groupedSellers).map((seller) => (
//                         <Card key={uuidv4()} className="mb-4 seller-card">
//                           <Card.Header className="bg-light">
//                             <div className="d-flex align-items-center">
//                               <img
//                                 src={seller.sellerInfo.image}
//                                 alt={seller.sellerInfo.name}
//                                 className="seller-avatar me-3"
//                               />
//                               <div>
//                                 <h5 className="mb-0">
//                                   {seller.sellerInfo.name}
//                                 </h5>
//                                 <small className="text-muted">
//                                   {seller.sellerInfo.address}
//                                 </small>
//                               </div>
//                             </div>
//                           </Card.Header>
//                           <Card.Body>
//                             {seller.items.map((item) => (
//                               <div
//                                 key={uuidv4()}
//                                 className="product-item mb-3"
//                               >
//                                 <Row className="align-items-center">
//                                   <Col xs={3}>
//                                     <img
//                                       src={item.img_url}
//                                       alt={item.name}
//                                       className="img-fluid rounded product-image"
//                                     />
//                                   </Col>
//                                   <Col xs={9}>
//                                     <h6>{item.name}</h6>
//                                     <div className="d-flex justify-content-between">
//                                       <span>
//                                         Rp
//                                         {(
//                                           item.price * item.quantity
//                                         ).toLocaleString()}
//                                       </span>
//                                       <span>x{item.quantity}</span>
//                                     </div>
//                                   </Col>
//                                 </Row>
//                               </div>
//                             ))}
//                           </Card.Body>
//                         </Card>
//                       ))}
//                     </Col>

//                     <Col md={4}>
//                       {(order.status === "process" || order.status === "pending") && (
//                         <Card className="mb-3">
//                           <Card.Header className="bg-light">
//                             <h5 className="mb-0">Info Kurir</h5>
//                           </Card.Header>
//                           <button
//                             onClick={() =>
//                               navigate(
//                                 `/courierinformation/${order.courier?.id}`
//                               )
//                             }
//                           >
//                             <Card.Body>
//                               <div className="d-flex align-items-center">
//                                 <img
//                                   src={order.courier?.profile_image}
//                                   alt={order.courier?.name}
//                                   className="seller-avatar me-3"
//                                 />
//                                 <div>
//                                   <h6 className="mb-1">
//                                     {order.courier?.name || "N/A"}
//                                   </h6>
//                                   <small className="text-muted">
//                                     {order.courier?.phone_number || "N/A"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </Card.Body>
//                           </button>
//                         </Card>
//                       )}

//                       <Card>
//                         <Card.Header className="bg-light">
//                           <h5 className="mb-0">Ringkasan Pembayaran</h5>
//                         </Card.Header>
//                         <Card.Body>
//                           <div className="d-flex justify-content-between mb-2">
//                             <span>Subtotal:</span>
//                             <span>Rp{summary.subtotal.toLocaleString()}</span>
//                           </div>
//                           <div className="d-flex justify-content-between mb-3">
//                             <span>Pengiriman:</span>
//                             <span>Rp{summary.shipping.toLocaleString()}</span>
//                           </div>
//                           <div className="d-flex justify-content-between mb-2">
//                             <span>Jarak Pengiriman:</span>
//                             <span>
//                               {order.shipping_cost[0]?.distance
//                                 ? `${order.shipping_cost[0].distance} Meter`
//                                 : "Tidak tersedia"}
//                             </span>
//                           </div>
//                           <div className="d-flex justify-content-between fw-bold border-top pt-2">
//                             <span>Total:</span>
//                             <span className="text-success">
//                               Rp{summary.total.toLocaleString()}
//                             </span>
//                           </div>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   </Row>
//                 </Card.Body>

//                 {order.status === "pending" && (
//                   <Card.Footer className="bg-light d-flex justify-content-between">
//                     <Button
//                       variant="danger"
//                       className="ms-2 w-100"
//                       onClick={() => {
//                         setSelectedOrder(order);
//                         setShowCancelModal(true);
//                       }}
//                     >
//                       Batalkan pesanan
//                     </Button>

//                     {selectedOrder && (
//                       <CancelModal
//                         show={showCancelModal}
//                         onHide={() => setShowCancelModal(false)}
//                         order={order}
//                         onConfirm={() => handleCancelOrder(order.order_id)}
//                         safeFormatDate={safeFormatDate}
//                       />
//                     )}
//                   </Card.Footer>
//                 )}

//                 {order.status === "process" && (
//                   <Card.Footer className="bg-light d-flex justify-content-between">
//                     <Button
//                       className="w-50"
//                       variant="primary"
//                       onClick={() => {
//                         setSelectedOrderForMap(
//                           selectedOrderForMap?.order_id === order.order_id ? null : order
//                         );
//                         setTimeout(() => {
//                           topRef.current?.scrollIntoView({ behavior: "smooth" });
//                         }, 100);
//                       }}
//                     >
//                       {selectedOrderForMap?.order_id === order.order_id
//                         ? "Sembunyikan Detail"
//                         : "Lihat Detail Pengiriman"}
//                     </Button>

//                     <Button
//                       variant="success"
//                       className="ms-2 w-50"
//                       onClick={() => {
//                         if (!selectedOrderForAction) {
//                           setSelectedOrderForAction(order);
//                         }
//                         setShowConfirmationModal(true);
//                       }}
//                       disabled={!hasDeliveryNote(order)}
//                     >
//                       Pesanan Diterima
//                     </Button>

//                     {showConfirmationModal && selectedOrderForAction && (
//                       <ConfirmationModal
//                         show={showConfirmationModal}
//                         onHide={() => {
//                           setShowConfirmationModal(false);
//                           setSelectedOrderForAction(null);
//                         }}
//                         order={selectedOrderForAction}
//                         onConfirm={handleConfirm}
//                         safeFormatDate={safeFormatDate}
//                       />
//                     )}
//                   </Card.Footer>
//                 )}

//                 {order.status === "completed" && (
//                   <Card.Footer className="bg-light d-flex justify-content-between">
//                     <Button
//                       className="w-100"
//                       variant="primary"
//                       onClick={() => {
//                         setSelectedOrderForMap(
//                           selectedOrderForMap?.order_id === order.order_id ? null : order
//                         );
//                         setTimeout(() => {
//                           topRef.current?.scrollIntoView({ behavior: "smooth" });
//                         }, 100);
//                       }}
//                     >
//                       {selectedOrderForMap?.order_id === order.order_id
//                         ? "Sembunyikan Detail"
//                         : "Lihat Detail Pengiriman"}
//                     </Button>
//                   </Card.Footer>
//                 )}
//               </Card>
//             );
//           })
//         ) : (
//           <div className="alert alert-info mt-4">
//             Tidak ada pesanan dengan status ini
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Index;


// !Menggunakan Tailwind CSS dan memperbaiki error remove layer
// import {
//   Card,
//   Row,
//   Col,
//   Spinner,
//   Badge,
//   Button,
//   Tabs,
//   Tab,
//   CardFooter,
// } from "react-bootstrap";
// import Navbar from "../../components/Navbar";
// import useProductStore from "../../store/useProductStore";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { format, isValid } from "date-fns";
// import { id } from "date-fns/locale";
// import toast from "react-hot-toast";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
// import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
// import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-rotatedmarker";
// import "../../assets/Leaflet.MovingMarker/MovingMarker";
// import { v4 as uuidv4 } from 'uuid';
// import WebSocketService from "../../utils/Websocet";
// import courierIcon from "../../assets/image/courier.png";
// import customerIcon from "../../assets/image/customer.png";
// import shopIcon from "../../assets/image/shop.png";
// import OrderTracking from "../Tracking/OrderTracking";
// import CourierTracking from "../Tracking/CourierTracking";
// import OrderHistories from "./OrderHistory";
// import { ConfirmationModal } from "./KonfirmationModal";
// import { CancelModal } from "./CancelModal ";
// import { useNavigate } from "react-router-dom";


// // Fungsi untuk menghitung bearing (derajat) antara dua titik
// function calculateBearing(lat1, lng1, lat2, lng2) {
//   const startLat = (lat1 * Math.PI) / 180;
//   const startLng = (lng1 * Math.PI) / 180;
//   const destLat = (lat2 * Math.PI) / 180;
//   const destLng = (lng2 * Math.PI) / 180;

//   const y = Math.sin(destLng - startLng) * Math.cos(destLat);
//   const x =
//     Math.cos(startLat) * Math.sin(destLat) -
//     Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
//   let bearing = Math.atan2(y, x);
//   bearing = (bearing * 180) / Math.PI;
//   bearing = (bearing + 360) % 360;

//   return bearing;
// }

// // Fix leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markericon2x,
//   iconUrl: markericon,
//   shadowUrl: markericonshadow,
// });

// // const StatusTabs = ({ activeTab, setActiveTab }) => {
// //   return (
// //     <div className="relative">
// //       <div className="flex overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
// //         <Tabs
// //           activeKey={activeTab}
// //           onSelect={(k) => setActiveTab(k)}
// //           className="flex flex-nowrap whitespace-nowrap mb-4"
// //           variant="pills"
// //         >
// //           <Tab eventKey="pending" title="Pending" className="inline-block" />
// //           <Tab eventKey="process" title="Dalam Proses" className="inline-block" />
// //           <Tab eventKey="completed" title="Selesai" className="inline-block" />
// //           <Tab eventKey="cancelled" title="Dibatalkan" className="inline-block" />
// //         </Tabs>
// //       </div>
// //     </div>
// //   );
// // };

// const StatusTabs = ({ activeTab, setActiveTab }) => {
//   const tabs = [
//     { key: "pending", title: "Pending" },
//     { key: "process", title: "Dalam Proses" },
//     { key: "completed", title: "Selesai" },
//     { key: "cancelled", title: "Dibatalkan" }
//   ];

//   return (
//     <div className="mb-8">
//       <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => setActiveTab(tab.key)}
//             className={`px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
//               activeTab === tab.key
//                 ? "bg-blue-600 text-white shadow-md"
//                 : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//             }`}
//           >
//             {tab.title}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };





// const OrderMap = ({ order }) => {
//   const mapRef = useRef(null);
//   const routingControlRef = useRef(null);
//   const markersRef = useRef([]);
//   const [positions, setPositions] = useState({
//     courier: null,
//     customer: null,
//     sellers: []
//   });

//   const CourierIcon = L.icon({
//   iconUrl: courierIcon,
//   iconSize: [37, 37],
//   iconAnchor: [21, 21],  // Pusat ikon (center)
//   popupAnchor: [0, -41], // Penyesuaian popup
//   rotationOrigin: "center center",
// });

//   const CustomerIcon = L.icon({
//     iconUrl: customerIcon,
//     iconSize: [37, 37],
//     iconAnchor: [15, 32],
//     popupAnchor: [0, -32],
//   });

//   const ShopIcon = L.icon({
//     iconUrl: shopIcon,
//     iconSize: [37, 37],
//     iconAnchor: [8, 22],
//     popupAnchor: [0, -32],
//   });

//   const cleanupMap = useCallback(() => {
//     if (routingControlRef.current && mapRef.current) {
//       try {
//         mapRef.current.removeControl(routingControlRef.current);
//       } catch (e) {
//         console.warn("Failed to remove routing control:", e);
//       }
//       routingControlRef.current = null;
//     }

//     markersRef.current.forEach(marker => {
//       if (marker && mapRef.current) {
//         try {
//           if (marker.stop) marker.stop();
//           mapRef.current.removeLayer(marker);
//         } catch (e) {
//           console.warn("Failed to remove marker:", e);
//         }
//       }
//     });
//     markersRef.current = [];

//     if (mapRef.current) {
//       try {
//         mapRef.current.remove();
//       } catch (e) {
//         console.warn("Failed to remove map:", e);
//       }
//       mapRef.current = null;
//     }
//   }, []);

//   const isValidCoord = (lat, lng) => {
//     return lat && lng && !isNaN(lat) && !isNaN(lng);
//   };

//   useEffect(() => {
//     if (!order) {
//       setPositions({
//         courier: null,
//         customer: null,
//         sellers: []
//       });
//       return;
//     }

//     const newPositions = {
//       courier: null,
//       customer: null,
//       sellers: []
//     };

//     const custLat = parseFloat(order.shipping_cost[0]?.latitude);
//     const custLng = parseFloat(order.shipping_cost[0]?.longitude);
//     if (isValidCoord(custLat, custLng)) {
//       newPositions.customer = [custLat, custLng];
//     }

//     if (order.status !== "completed") {
//       const courLat = parseFloat(order.courier?.latitude);
//       const courLng = parseFloat(order.courier?.longitude);
//       if (isValidCoord(courLat, courLng)) {
//         newPositions.courier = [courLat, courLng];
//       }
//     }

//     newPositions.sellers = order.items.reduce((acc, item) => {
//       const lat = parseFloat(item.seller_latitude);
//       const lng = parseFloat(item.seller_longitude);
//       if (isValidCoord(lat, lng)) {
//         acc.push({
//           position: [lat, lng],
//           name: item.seller_name,
//           address: item.seller_address
//         });
//       }
//       return acc;
//     }, []);

//     setPositions(newPositions);
//   }, [order]);

//   useEffect(() => {
//     if (!positions.customer) {
//       cleanupMap();
//       return;
//     }

//     cleanupMap();

//     const center = positions.customer || [-6.1754, 106.8272];
//     const map = L.map('map-container', {
//       center,
//       zoom: 15
//     });

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);

//     mapRef.current = map;

//     return () => {
//       cleanupMap();
//     };
//   }, [positions.customer, cleanupMap]);

//   useEffect(() => {
//     if (!mapRef.current || !positions.customer) return;

//     if (routingControlRef.current) {
//       try {
//         mapRef.current.removeControl(routingControlRef.current);
//       } catch (e) {
//         console.warn("Failed to remove routing control:", e);
//       }
//       routingControlRef.current = null;
//     }

//     markersRef.current.forEach(marker => {
//       if (marker && mapRef.current) {
//         try {
//           if (marker.stop) marker.stop();
//           mapRef.current.removeLayer(marker);
//         } catch (e) {
//           console.warn("Failed to remove marker:", e);
//         }
//       }
//     });
//     markersRef.current = [];

//     if (positions.customer) {
//       const customerMarker = L.marker(positions.customer, { icon: CustomerIcon })
//         .bindPopup(`<b>Customer</b><br>${order.shipping_cost[0]?.address || ''}`)
//         .addTo(mapRef.current);
//       markersRef.current.push(customerMarker);
//     }


//     // Di dalam useEffect yang mengatur marker
// if (positions.courier && order.status !== "completed") {
//   // Hitung bearing jika tidak ada dari server
//   let bearing = order.courier?.bearing;
//   if (!bearing && positions.customer) {
//     bearing = calculateBearing(
//       positions.courier[0],
//       positions.courier[1],
//       positions.customer[0],
//       positions.customer[1]
//     );
//   }

//   const courierMarker = L.marker(positions.courier, {
//     icon: CourierIcon,
//     rotationAngle: (bearing || 0) - 180, // Gunakan bearing jika ada
//     rotationOrigin: "center center",
//   })
//     .bindPopup(`<b>Courier</b><br>${order.courier?.name || ''}`)
//     .addTo(mapRef.current);
  
//   markersRef.current.push(courierMarker);

//    if (positions.courier && positions.customer) {
//         try {
//           routingControlRef.current = L.Routing.control({
//             waypoints: [
//               L.latLng(...positions.courier),
//               L.latLng(...positions.customer)
//             ],
//             lineOptions: {
//               styles: [{ color: '#4CAF50', opacity: 0.8, weight: 5 }]
//             },
//             show: false,
//             addWaypoints: false,
//             createMarker: () => null
//           }).addTo(mapRef.current);
//         } catch (e) {
//           console.error("Routing error:", e);
//         }
//       }
// }

//     // if (positions.courier && order.status !== "completed") {
//     //   const courierMarker = L.marker(positions.courier, {
//     //     icon: CourierIcon,
//     //     rotationAngle: order.courier?.bearing || 0
//     //   })
//     //     .bindPopup(`<b>Courier</b><br>${order.courier?.name || ''}`)
//     //     .addTo(mapRef.current);
//     //   markersRef.current.push(courierMarker);

//     //   if (positions.courier && positions.customer) {
//     //     try {
//     //       routingControlRef.current = L.Routing.control({
//     //         waypoints: [
//     //           L.latLng(...positions.courier),
//     //           L.latLng(...positions.customer)
//     //         ],
//     //         lineOptions: {
//     //           styles: [{ color: '#4CAF50', opacity: 0.8, weight: 5 }]
//     //         },
//     //         show: false,
//     //         addWaypoints: false,
//     //         createMarker: () => null
//     //       }).addTo(mapRef.current);
//     //     } catch (e) {
//     //       console.error("Routing error:", e);
//     //     }
//     //   }
//     // }



//     positions.sellers.forEach(seller => {
//       const sellerMarker = L.marker(seller.position, { icon: ShopIcon })
//         .bindPopup(`<b>Seller: ${seller.name}</b><br>${seller.address}`)
//         .addTo(mapRef.current);
//       markersRef.current.push(sellerMarker);
//     });

//     if (markersRef.current.length > 0) {
//       const group = new L.featureGroup(markersRef.current.filter(m => m));
//       mapRef.current.fitBounds(group.getBounds().pad(0.2));
//     }
//   }, [positions, order]);

//   if (!order || !order.shipping_cost || order.shipping_cost.length === 0) {
//     return <div className="text-center p-5">Data pengiriman tidak tersedia</div>;
//   }

//   return (
//     <div 
//       id="map-container" 
//       className="w-full h-[500px]"
//       key={`map-${order?.order_id || 'default'}`}
//     />
//   );
// };



// const safeFormatDate = (date, dateFormat, locale) => {
//   if (!date || !isValid(new Date(date))) return "Tanggal tidak valid";
//   return format(new Date(date), dateFormat, { locale });
// };

// const Index = () => {
//   const topRef = useRef(null);
//   const [activeTab, setActiveTab] = useState("pending");
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedOrderForMap, setSelectedOrderForMap] = useState(null);
//   const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const {
//     fetchOrder,
//     orders = [],
//     fetchPayment,
//     fetchHistoriesById,
//     cancelOrder,
//     clearSelectedCart,
//     toggleCartSelection,
//     createRatProduct,
//     createRatCourier,
//   } = useProductStore();

//   const currentUser = useProductStore((state) => state.currentUser);
//   const isCourier = currentUser?.role === "courier";

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         await fetchOrder();
//         await fetchPayment();
//         await fetchHistoriesById();

//         WebSocketService.addCallback("position_update", (data) => {
//   useProductStore.setState((state) => ({
//     orders: state.orders.map((order) => {
//       if (order.order_id === data.order_id && order.courier?.id === data.courier_id) {
//         let bearing = data.bearing;
        
//         if (!bearing && order.shipping_cost[0]) {
//           bearing = calculateBearing(
//             data.latitude,
//             data.longitude,
//             parseFloat(order.shipping_cost[0].latitude),
//             parseFloat(order.shipping_cost[0].longitude)
//           );
//         }

//         // Tambahkan 180° untuk orientasi yang benar
//         const correctedBearing = (bearing || 0) + 180;

//         return {
//           ...order,
//           courier: {
//             ...order.courier,
//             latitude: data.latitude,
//             longitude: data.longitude,
//             bearing: correctedBearing,
//           }
//         };
//       }
//       return order;
//     }),
//   }));
// });

//         WebSocketService.addCallback("status_update", (data) => {
//           useProductStore.setState((state) => ({
//             orders: state.orders.map((order) =>
//               order.order_id === data.order_id
//                 ? { ...order, status: data.status }
//                 : order
//             ),
//           }));
//         });
//       } catch (error) {
//         toast.error("Gagal memuat data");
//       }
//     };
//     loadData();

//     WebSocketService.addCallback("status_update", loadData);

//     return () => {
//       WebSocketService.removeCallback("status_update", loadData);
//     };
//   }, [fetchOrder, fetchPayment, fetchHistoriesById]);

//   const filteredOrders = orders.filter(
//     (order) => order.status?.toLowerCase() === activeTab.toLowerCase()
//   );

//   const groupItemsBySeller = (items) => {
//     return items.reduce((acc, item) => {
//       const sellerId = item.seller_id;
//       if (!acc[sellerId]) {
//         acc[sellerId] = {
//           sellerInfo: {
//             id: sellerId,
//             name: item.seller_name,
//             address: item.seller_address,
//             image: item.seller_profile_image,
//           },
//           items: [],
//         };
//       }
//       acc[sellerId].items.push(item);
//       return acc;
//     }, {});
//   };

//   const getOrderSummary = (order) => {
//     const items = order.items || [];
//     const subtotal = items.reduce((sum, item) => {
//       const price = parseFloat(item.price);
//       const quantity = parseFloat(item.quantity);
//       return sum + price * quantity;
//     }, 0);
//     const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;
//     return { subtotal, shipping, total: subtotal + shipping };
//   };

//   const handleCancelOrder = async (orderId) => {
//     try {
//       const result = await cancelOrder(orderId, setError);
//       console.log("Order canceled successfully:", result);
//       toast.success("Pesanan berhasil dibatalkan!");
//       setShowCancelModal(false);
//     } catch (error) {
//       console.error("Failed to cancel order:", error);
//       alert(`Gagal membatalkan pesanan: ${error.message}`);
//     }
//   };

//   const handleBuyAgain = (order) => {
//     clearSelectedCart();
//     order.items.forEach((item) => {
//       toggleCartSelection(item);
//     });
//     navigate("/cart");
//   };

//   const handleConfirm = async () => {
//     try {
//       setShowConfirmationModal(false);
      
//       if (!selectedOrderForAction) {
//         console.error("No order selected for confirmation");
//         return;
//       }

//       await useProductStore.getState().updateOrderStatus(
//         selectedOrderForAction.order_id, 
//         { status: "completed" }
//       );

//       if (selectedOrderForAction.courier?.id) {
//         await createRatCourier({
//           order_id: selectedOrderForAction.order_id,
//           courier_id: selectedOrderForAction.courier.id,
//           rating: null,
//           comment: null,
//           rating_time: new Date(),
//         });
//       }

//       setSelectedOrderForAction(null);
//       navigate(`/rating/${selectedOrderForAction.order_id}/product&kurir`);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error during confirmation:", error);
//       setShowConfirmationModal(false);
//       setSelectedOrderForAction(null);
//     }
//   };

//   const hasDeliveryNote = (order) => {
//     if (!order.order_historie || !Array.isArray(order.order_historie)) {
//       return false;
//     }
//     return order.order_historie.some(
//       (history) => history.note === "Pesanan diterima Oleh yang bersangkutan"
//     );
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid py-4" ref={topRef}>
//         <h2 className="text-center mb-4 font-bold text-primary">
//           Riwayat Pesanan
//         </h2>

//         <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//         {selectedOrderForMap && ["process", "completed"].includes(activeTab) && (
//           <Row className="mb-4">
//             <Col md={6}>
//               {isCourier ? (
//                 <CourierTracking
//                   orderId={selectedOrderForMap.order_id}
//                   courierId={selectedOrderForMap.courier?.id}
//                   latCourier={selectedOrderForMap.courier?.latitude}
//                   lnCourier={selectedOrderForMap.courier?.longitude}
//                   destination={[
//                     selectedOrderForMap.courier?.latitude,
//                     selectedOrderForMap.courier?.longitude,
//                   ]}
//                 />
//               ) : (
//                 <OrderMap order={selectedOrderForMap} />
//               )}
//             </Col>
//             <Col md={6}>
//               <OrderHistories
//                 orderId={selectedOrderForMap.order_id}
//                 safeFormatDate={safeFormatDate}
//               />
//             </Col>
//           </Row>
//         )}

//         {!orders.length ? (
//           <div className="text-center mt-5">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Memuat data pesanan...</p>
//           </div>
//         ) : filteredOrders.length > 0 ? (
//           filteredOrders.map((order) => {
//             const summary = getOrderSummary(order);
//             const groupedSellers = groupItemsBySeller(order.items);

//             return (
//               <Card key={uuidv4()} className="mb-4 shadow">
//                 <Card.Header className="bg-orange-700 text-white">
//                   <Row className="items-center">
//                     <Col md={8}>
//                       <h4 className="mb-1">Order #{order.order_code}</h4>
//                       <small>
//                         {safeFormatDate(
//                           order.order_date,
//                           "EEEE, d MMMM yyyy HH:mm",
//                           id
//                         )}
//                       </small>
//                     </Col>
//                     <Col md={4} className="text-end">
//                       <Badge
//                         bg="light"
//                         text="dark"
//                         className="text-base whitespace-normal me-2 mb-3"
//                       >
//                         {order.payment_method}
//                       </Badge>
//                       <Badge bg="success" className="text-base">
//                         Rp{summary.total.toLocaleString()}
//                       </Badge>
//                     </Col>
//                   </Row>
//                 </Card.Header>

//                 <Card.Body>
//                   <Row>
//                     <Col md={8}>
//                       {Object.values(groupedSellers).map((seller) => (
//                         <Card key={uuidv4()} className="mb-4">
//                           <Card.Header className="bg-light">
//                             <div className="flex items-center">
//                               <img
//                                 src={seller.sellerInfo.image}
//                                 alt={seller.sellerInfo.name}
//                                 className="w-10 h-10 rounded-full me-3"
//                               />
//                               <div>
//                                 <h5 className="mb-0">
//                                   {seller.sellerInfo.name}
//                                 </h5>
//                                 <small className="text-muted">
//                                   {seller.sellerInfo.address}
//                                 </small>
//                               </div>
//                             </div>
//                           </Card.Header>
//                           <Card.Body>
//                             {seller.items.map((item) => (
//                               <div
//                                 key={uuidv4()}
//                                 className="mb-3"
//                               >
//                                 <Row className="items-center">
//                                   <Col xs={3}>
//                                     <img
//                                       src={item.img_url}
//                                       alt={item.name}
//                                       className="img-fluid rounded"
//                                     />
//                                   </Col>
//                                   <Col xs={9}>
//                                     <h6>{item.name}</h6>
//                                     <div className="flex justify-between">
//                                       <span>
//                                         Rp
//                                         {(
//                                           item.price * item.quantity
//                                         ).toLocaleString()}
//                                       </span>
//                                       <span>x{item.quantity}</span>
//                                     </div>
//                                   </Col>
//                                 </Row>
//                               </div>
//                             ))}
//                           </Card.Body>
//                         </Card>
//                       ))}
//                     </Col>

//                     <Col md={4}>
//                       {(order.status === "process" || order.status === "pending") && (
//                         <Card className="mb-3">
//                           <Card.Header className="bg-light">
//                             <h5 className="mb-0">Info Kurir</h5>
//                           </Card.Header>
//                           <button
//                             onClick={() =>
//                               navigate(
//                                 `/courierinformation/${order.courier?.id}`
//                               )
//                             }
//                           >
//                             <Card.Body>
//                               <div className="flex items-center">
//                                 <img
//                                   src={order.courier?.profile_image}
//                                   alt={order.courier?.name}
//                                   className="w-10 h-10 rounded-full me-3"
//                                 />
//                                 <div>
//                                   <h6 className="mb-1">
//                                     {order.courier?.name || "N/A"}
//                                   </h6>
//                                   <small className="text-muted">
//                                     {order.courier?.phone_number || "N/A"}
//                                   </small>
//                                 </div>
//                               </div>
//                             </Card.Body>
//                           </button>
//                         </Card>
//                       )}

//                       <Card>
//                         <Card.Header className="bg-light">
//                           <h5 className="mb-0">Ringkasan Pembayaran</h5>
//                         </Card.Header>
//                         <Card.Body>
//                           <div className="flex justify-between mb-2">
//                             <span>Subtotal:</span>
//                             <span>Rp{summary.subtotal.toLocaleString()}</span>
//                           </div>
//                           <div className="flex justify-between mb-3">
//                             <span>Pengiriman:</span>
//                             <span>Rp{summary.shipping.toLocaleString()}</span>
//                           </div>
//                           <div className="flex justify-between mb-2">
//                             <span>Jarak Pengiriman:</span>
//                             <span>
//                               {order.shipping_cost[0]?.distance
//                                 ? `${order.shipping_cost[0].distance} Meter`
//                                 : "Tidak tersedia"}
//                             </span>
//                           </div>
//                           <div className="flex justify-between font-bold border-t pt-2">
//                             <span>Total:</span>
//                             <span className="text-success">
//                               Rp{summary.total.toLocaleString()}
//                             </span>
//                           </div>
//                         </Card.Body>
//                       </Card>
//                     </Col>
//                   </Row>
//                 </Card.Body>

//                 {order.status === "pending" && (
//                   <Card.Footer className="bg-light flex justify-between">
//                     <Button
//                       variant="danger"
//                       className="ms-2 w-full"
//                       onClick={() => {
//                         setSelectedOrder(order);
//                         setShowCancelModal(true);
//                       }}
//                     >
//                       Batalkan pesanan
//                     </Button>

//                     {selectedOrder && (
//                       <CancelModal
//                         show={showCancelModal}
//                         onHide={() => setShowCancelModal(false)}
//                         order={order}
//                         onConfirm={() => handleCancelOrder(order.order_id)}
//                         safeFormatDate={safeFormatDate}
//                       />
//                     )}
//                   </Card.Footer>
//                 )}

//                 {order.status === "process" && (
//                   <Card.Footer className="bg-light flex justify-between">
//                     <Button
//                       className="w-1/2"
//                       variant="primary"
//                       onClick={() => {
//                         setSelectedOrderForMap(
//                           selectedOrderForMap?.order_id === order.order_id ? null : order
//                         );
//                         setTimeout(() => {
//                           topRef.current?.scrollIntoView({ behavior: "smooth" });
//                         }, 100);
//                       }}
//                     >
//                       {selectedOrderForMap?.order_id === order.order_id
//                         ? "Sembunyikan Detail"
//                         : "Lihat Detail Pengiriman"}
//                     </Button>

//                     <Button
//                       variant="success"
//                       className="ms-2 w-1/2"
//                       onClick={() => {
//                         if (!selectedOrderForAction) {
//                           setSelectedOrderForAction(order);
//                         }
//                         setShowConfirmationModal(true);
//                       }}
//                       disabled={!hasDeliveryNote(order)}
//                     >
//                       Pesanan Diterima
//                     </Button>

//                     {showConfirmationModal && selectedOrderForAction && (
//                       <ConfirmationModal
//                         show={showConfirmationModal}
//                         onHide={() => {
//                           setShowConfirmationModal(false);
//                           setSelectedOrderForAction(null);
//                         }}
//                         order={selectedOrderForAction}
//                         onConfirm={handleConfirm}
//                         safeFormatDate={safeFormatDate}
//                       />
//                     )}
//                   </Card.Footer>
//                 )}

//                 {order.status === "completed" && (
//                   <Card.Footer className="bg-light flex justify-between">
//                     <Button
//                       className="w-full"
//                       variant="primary"
//                       onClick={() => {
//                         setSelectedOrderForMap(
//                           selectedOrderForMap?.order_id === order.order_id ? null : order
//                         );
//                         setTimeout(() => {
//                           topRef.current?.scrollIntoView({ behavior: "smooth" });
//                         }, 100);
//                       }}
//                     >
//                       {selectedOrderForMap?.order_id === order.order_id
//                         ? "Sembunyikan Detail"
//                         : "Lihat Detail Pengiriman"}
//                     </Button>
//                   </Card.Footer>
//                 )}
//               </Card>
//             );
//           })
//         ) : (
//           <div className="alert alert-info mt-4">
//             Tidak ada pesanan dengan status ini
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Index;


import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format, isValid } from "date-fns";
import { id } from "date-fns/locale";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-rotatedmarker";

import Navbar from "../../components/Navbar";
import useProductStore from "../../store/useProductStore";
import OrderTracking from "../Tracking/OrderTracking";
import CourierTracking from "../Tracking/CourierTracking";
import OrderHistories from "./OrderHistory";
import { ConfirmationModal } from "./KonfirmationModal";
import { CancelModal } from "./CancelModal ";
import WebSocketService from "../../utils/Websocet";

// Assets
import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import courierIcon from "../../assets/image/courier.png";
import customerIcon from "../../assets/image/customer.png";
import shopIcon from "../../assets/image/shop.png";

// Fungsi untuk menghitung bearing (derajat) antara dua titik
function calculateBearing(lat1, lng1, lat2, lng2) {
  const startLat = (lat1 * Math.PI) / 180;
  const startLng = (lng1 * Math.PI) / 180;
  const destLat = (lat2 * Math.PI) / 180;
  const destLng = (lng2 * Math.PI) / 180;

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI;
  bearing = (bearing + 360) % 360;

  return bearing;
}

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markericon2x,
  iconUrl: markericon,
  shadowUrl: markericonshadow,
});

const StatusTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "pending", title: "Pending" },
    { key: "process", title: "Dalam Proses" },
    { key: "completed", title: "Selesai" },
    { key: "cancelled", title: "Dibatalkan" }
  ];

  return (
    <div className="mb-8 mt-4 px-4">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-orange-400 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

const OrderMap = ({ order }) => {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const markersRef = useRef([]);
  const [positions, setPositions] = useState({
    courier: null,
    customer: null,
    sellers: []
  });

  const CourierIcon = L.icon({
    iconUrl: courierIcon,
    iconSize: [37, 37],
    iconAnchor: [21, 21],
    popupAnchor: [0, -41],
    rotationOrigin: "center center",
  });

  const CustomerIcon = L.icon({
    iconUrl: customerIcon,
    iconSize: [37, 37],
    iconAnchor: [15, 32],
    popupAnchor: [0, -32],
  });

  const ShopIcon = L.icon({
    iconUrl: shopIcon,
    iconSize: [37, 37],
    iconAnchor: [8, 22],
    popupAnchor: [0, -32],
  });

  const cleanupMap = useCallback(() => {
    if (routingControlRef.current && mapRef.current) {
      try {
        mapRef.current.removeControl(routingControlRef.current);
      } catch (e) {
        console.warn("Failed to remove routing control:", e);
      }
      routingControlRef.current = null;
    }

    markersRef.current.forEach(marker => {
      if (marker && mapRef.current) {
        try {
          if (marker.stop) marker.stop();
          mapRef.current.removeLayer(marker);
        } catch (e) {
          console.warn("Failed to remove marker:", e);
        }
      }
    });
    markersRef.current = [];

    if (mapRef.current) {
      try {
        mapRef.current.remove();
      } catch (e) {
        console.warn("Failed to remove map:", e);
      }
      mapRef.current = null;
    }
  }, []);

  const isValidCoord = (lat, lng) => {
    return lat && lng && !isNaN(lat) && !isNaN(lng);
  };

  useEffect(() => {
    if (!order) {
      setPositions({
        courier: null,
        customer: null,
        sellers: []
      });
      return;
    }

    const newPositions = {
      courier: null,
      customer: null,
      sellers: []
    };

    const custLat = parseFloat(order.shipping_cost[0]?.latitude);
    const custLng = parseFloat(order.shipping_cost[0]?.longitude);
    if (isValidCoord(custLat, custLng)) {
      newPositions.customer = [custLat, custLng];
    }

    if (order.status !== "completed") {
      const courLat = parseFloat(order.courier?.latitude);
      const courLng = parseFloat(order.courier?.longitude);
      if (isValidCoord(courLat, courLng)) {
        newPositions.courier = [courLat, courLng];
      }
    }

    newPositions.sellers = order.items.reduce((acc, item) => {
      const lat = parseFloat(item.seller_latitude);
      const lng = parseFloat(item.seller_longitude);
      if (isValidCoord(lat, lng)) {
        acc.push({
          position: [lat, lng],
          name: item.seller_name,
          address: item.seller_address
        });
      }
      return acc;
    }, []);

    setPositions(newPositions);
  }, [order]);

  useEffect(() => {
    if (!positions.customer) {
      cleanupMap();
      return;
    }

    cleanupMap();

    const center = positions.customer || [-6.1754, 106.8272];
    const map = L.map('map-container', {
      center,
      zoom: 15
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    return () => {
      cleanupMap();
    };
  }, [positions.customer, cleanupMap]);

  useEffect(() => {
    if (!mapRef.current || !positions.customer) return;

    if (routingControlRef.current) {
      try {
        mapRef.current.removeControl(routingControlRef.current);
      } catch (e) {
        console.warn("Failed to remove routing control:", e);
      }
      routingControlRef.current = null;
    }

    markersRef.current.forEach(marker => {
      if (marker && mapRef.current) {
        try {
          if (marker.stop) marker.stop();
          mapRef.current.removeLayer(marker);
        } catch (e) {
          console.warn("Failed to remove marker:", e);
        }
      }
    });
    markersRef.current = [];

    if (positions.customer) {
      const customerMarker = L.marker(positions.customer, { icon: CustomerIcon })
        .bindPopup(`<b>Customer</b><br>${order.shipping_cost[0]?.address || ''}`)
        .addTo(mapRef.current);
      markersRef.current.push(customerMarker);
    }

    if (positions.courier && order.status !== "completed") {
      let bearing = order.courier?.bearing;
      if (!bearing && positions.customer) {
        bearing = calculateBearing(
          positions.courier[0],
          positions.courier[1],
          positions.customer[0],
          positions.customer[1]
        );
      }

      const courierMarker = L.marker(positions.courier, {
        icon: CourierIcon,
        rotationAngle: (bearing || 0) - 180,
        rotationOrigin: "center center",
      })
        .bindPopup(`<b>Courier</b><br>${order.courier?.name || ''}`)
        .addTo(mapRef.current);
      
      markersRef.current.push(courierMarker);

      if (positions.courier && positions.customer) {
        try {
          routingControlRef.current = L.Routing.control({
            waypoints: [
              L.latLng(...positions.courier),
              L.latLng(...positions.customer)
            ],
            lineOptions: {
              styles: [{ color: '#4CAF50', opacity: 0.8, weight: 5 }]
            },
            show: false,
            addWaypoints: false,
            createMarker: () => null
          }).addTo(mapRef.current);
        } catch (e) {
          console.error("Routing error:", e);
        }
      }
    }

    positions.sellers.forEach(seller => {
      const sellerMarker = L.marker(seller.position, { icon: ShopIcon })
        .bindPopup(`<b>Seller: ${seller.name}</b><br>${seller.address}`)
        .addTo(mapRef.current);
      markersRef.current.push(sellerMarker);
    });

    if (markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current.filter(m => m));
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [positions, order]);

  if (!order || !order.shipping_cost || order.shipping_cost.length === 0) {
    return <div className="text-center p-5">Data pengiriman tidak tersedia</div>;
  }

  return (
    <div 
      id="map-container" 
      className="w-full h-[500px]"
      key={`map-${order?.order_id || 'default'}`}
    />
  );
};

const safeFormatDate = (date, dateFormat, locale) => {
  if (!date || !isValid(new Date(date))) return "Tanggal tidak valid";
  return format(new Date(date), dateFormat, { locale });
};

const Index = () => {
  const topRef = useRef(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderForMap, setSelectedOrderForMap] = useState(null);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    fetchOrder,
    orders = [],
    fetchPayment,
    fetchHistoriesById,
    cancelOrder,
    clearSelectedCart,
    toggleCartSelection,
    createRatProduct,
    createRatCourier,
  } = useProductStore();

  const currentUser = useProductStore((state) => state.currentUser);
  const isCourier = currentUser?.role === "courier";

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchOrder();
        await fetchPayment();
        await fetchHistoriesById();

        WebSocketService.addCallback("position_update", (data) => {
          useProductStore.setState((state) => ({
            orders: state.orders.map((order) => {
              if (order.order_id === data.order_id && order.courier?.id === data.courier_id) {
                let bearing = data.bearing;
                
                if (!bearing && order.shipping_cost[0]) {
                  bearing = calculateBearing(
                    data.latitude,
                    data.longitude,
                    parseFloat(order.shipping_cost[0].latitude),
                    parseFloat(order.shipping_cost[0].longitude)
                  );
                }

                const correctedBearing = (bearing || 0) + 180;

                return {
                  ...order,
                  courier: {
                    ...order.courier,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    bearing: correctedBearing,
                  }
                };
              }
              return order;
            }),
          }));
        });

        WebSocketService.addCallback("status_update", (data) => {
          useProductStore.setState((state) => ({
            orders: state.orders.map((order) =>
              order.order_id === data.order_id
                ? { ...order, status: data.status }
                : order
            ),
          }));
        });
      } catch (error) {
        toast.error("Gagal memuat data");
      }
    };
    loadData();

    WebSocketService.addCallback("status_update", loadData);

    return () => {
      WebSocketService.removeCallback("status_update", loadData);
    };
  }, [fetchOrder, fetchPayment, fetchHistoriesById]);

  const filteredOrders = orders.filter(
    (order) => order.status?.toLowerCase() === activeTab.toLowerCase()
  );

  const groupItemsBySeller = (items) => {
    return items.reduce((acc, item) => {
      const sellerId = item.seller_id;
      if (!acc[sellerId]) {
        acc[sellerId] = {
          sellerInfo: {
            id: sellerId,
            name: item.seller_name,
            address: item.seller_address,
            image: item.seller_profile_image,
          },
          items: [],
        };
      }
      acc[sellerId].items.push(item);
      return acc;
    }, {});
  };

  const getOrderSummary = (order) => {
    const items = order.items || [];
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price);
      const quantity = parseFloat(item.quantity);
      return sum + price * quantity;
    }, 0);
    const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await cancelOrder(orderId, setError);
      console.log("Order canceled successfully:", result);
      toast.success("Pesanan berhasil dibatalkan!");
      setShowCancelModal(false);
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert(`Gagal membatalkan pesanan: ${error.message}`);
    }
  };

  const handleBuyAgain = (order) => {
    clearSelectedCart();
    order.items.forEach((item) => {
      toggleCartSelection(item);
    });
    navigate("/cart");
  };

  const handleConfirm = async () => {
    try {
      setShowConfirmationModal(false);
      
      if (!selectedOrderForAction) {
        console.error("No order selected for confirmation");
        return;
      }

      await useProductStore.getState().updateOrderStatus(
        selectedOrderForAction.order_id, 
        { status: "completed" }
      );

      if (selectedOrderForAction.courier?.id) {
        await createRatCourier({
          order_id: selectedOrderForAction.order_id,
          courier_id: selectedOrderForAction.courier.id,
          rating: null,
          comment: null,
          rating_time: new Date(),
        });
      }

      setSelectedOrderForAction(null);
      navigate(`/rating/${selectedOrderForAction.order_id}/product&kurir`);
      window.location.reload();
    } catch (error) {
      console.error("Error during confirmation:", error);
      setShowConfirmationModal(false);
      setSelectedOrderForAction(null);
    }
  };

  const hasDeliveryNote = (order) => {
    if (!order.order_historie || !Array.isArray(order.order_historie)) {
      return false;
    }
    return order.order_historie.some(
      (history) => history.note === "Pesanan diterima Oleh yang bersangkutan"
    );
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col" ref={topRef}>
        <h2 className="text-center mb-4 font-bold text-blue-600 text-2xl">
          Riwayat Pesanan
        </h2>

        <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {selectedOrderForMap && ["process", "completed"].includes(activeTab) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              {isCourier ? (
                <CourierTracking
                  orderId={selectedOrderForMap.order_id}
                  courierId={selectedOrderForMap.courier?.id}
                  latCourier={selectedOrderForMap.courier?.latitude}
                  lnCourier={selectedOrderForMap.courier?.longitude}
                  destination={[
                    selectedOrderForMap.courier?.latitude,
                    selectedOrderForMap.courier?.longitude,
                  ]}
                />
              ) : (
                <OrderMap order={selectedOrderForMap} />
              )}
            </div>
            <div>
              <OrderHistories
                orderId={selectedOrderForMap.order_id}
                safeFormatDate={safeFormatDate}
              />
            </div>
          </div>
        )}

        {!orders.length ? (
          <div className="flex flex-col items-center justify-center mt-5">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-3">Memuat data pesanan...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const summary = getOrderSummary(order);
            const groupedSellers = groupItemsBySeller(order.items);

            return (
              <div key={uuidv4()} className="px-4">
              <div className="mb-6 rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="bg-orange-400 text-white p-4">
                  <div className="flex flex-wrap items-center">
                    <div className="w-full md:w-8/12">
                      <h4 className="text-xl font-bold mb-1">Order #{order.order_code}</h4>
                      <small>
                        {safeFormatDate(
                          order.order_date,
                          "EEEE, d MMMM yyyy HH:mm",
                          id
                        )}
                      </small>
                    </div>
                    <div className="w-full md:w-4/12 text-right">
                      <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-semibold mr-2 mb-2 inline-block">
                        {order.payment_method}
                      </span>
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Rp{summary.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-8/12 px-2">
                      {Object.values(groupedSellers).map((seller) => (
                        <div key={uuidv4()} className="mb-4 rounded-lg border border-gray-200">
                          <div className="bg-gray-100 p-3">
                            <div className="flex items-center">
                              <img
                                src={seller.sellerInfo.image}
                                alt={seller.sellerInfo.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <h5 className="font-bold mb-0">
                                  {seller.sellerInfo.name}
                                </h5>
                                <small className="text-gray-600">
                                  {seller.sellerInfo.address}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="p-3">
                            {seller.items.map((item) => (
                              <div
                                key={uuidv4()}
                                className="mb-3"
                              >
                                <div className="flex items-center">
                                  <div className="w-1/4">
                                    <img
                                      src={item.img_url}
                                      alt={item.name}
                                      className="w-full rounded"
                                    />
                                  </div>
                                  <div className="w-3/4 pl-3">
                                    <h6 className="font-semibold">{item.name}</h6>
                                    <div className="flex justify-between">
                                      <span>
                                        Rp
                                        {(
                                          item.price * item.quantity
                                        ).toLocaleString()}
                                      </span>
                                      <span>x{item.quantity}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full md:w-4/12 px-2">
                      {(order.status === "process" || order.status === "pending") && (
                        <div className="mb-4 rounded-lg border border-gray-200">
                          <div className="bg-gray-100 p-3">
                            <h5 className="font-bold mb-0">Info Kurir</h5>
                          </div>
                          <button
                            onClick={() =>
                              navigate(
                                `/courierinformation/${order.courier?.id}`
                              )
                            }
                            className="w-full text-left"
                          >
                            <div className="p-3">
                              <div className="flex items-center">
                                <img
                                  src={order.courier?.profile_image}
                                  alt={order.courier?.name}
                                  className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                  <h6 className="mb-1 font-semibold">
                                    {order.courier?.name || "N/A"}
                                  </h6>
                                  <small className="text-gray-600">
                                    {order.courier?.phone_number || "N/A"}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </button>
                        </div>
                      )}

                      <div className="rounded-lg border border-gray-200">
                        <div className="bg-gray-100 p-3">
                          <h5 className="font-bold mb-0">Ringkasan Pembayaran</h5>
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>Rp{summary.subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between mb-3">
                            <span>Pengiriman:</span>
                            <span>Rp{summary.shipping.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span>Jarak Pengiriman:</span>
                            <span>
                              {order.shipping_cost[0]?.distance
                                ? `${order.shipping_cost[0].distance} Meter`
                                : "Tidak tersedia"}
                            </span>
                          </div>
                          <div className="flex justify-between font-bold border-t border-gray-200 pt-2">
                            <span>Total:</span>
                            <span className="text-green-600">
                              Rp{summary.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {order.status === "pending" && (
                  <div className="bg-gray-50 p-4 flex justify-between">
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none w-full"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowCancelModal(true);
                      }}
                    >
                      Batalkan pesanan
                    </button>

                    {selectedOrder && (
                      <CancelModal
                        show={showCancelModal}
                        onHide={() => setShowCancelModal(false)}
                        order={order}
                        onConfirm={() => handleCancelOrder(order.order_id)}
                        safeFormatDate={safeFormatDate}
                      />
                    )}
                  </div>
                )}

                {order.status === "process" && (
                  <div className="bg-gray-50 p-4 flex justify-between space-x-2">
                    <button
                      className="px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 focus:outline-none w-1/2"
                     onClick={() => {
  // Kosongkan dulu selectedOrderForMap sebelum menetapkan yang baru
  if (selectedOrderForMap?.order_id !== order.order_id) {
    setSelectedOrderForMap(null);
  }
  
  // Set timeout kecil untuk memastikan render selesai sebelum update berikutnya
  setTimeout(() => {
    setSelectedOrderForMap(
      selectedOrderForMap?.order_id === order.order_id ? null : order
    );
    
    // Scroll ke atas
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 50);
}}
                    >
                      {selectedOrderForMap?.order_id === order.order_id
                        ? "Sembunyikan Detail"
                        : "Lihat Detail Pengiriman"}
                    </button>

                    <button
                      className={`px-4 py-2 rounded focus:outline-none w-1/2 ${
                        !hasDeliveryNote(order)
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-orange-400 text-white "
                      }`}
                      onClick={() => {
                        if (!selectedOrderForAction) {
                          setSelectedOrderForAction(order);
                        }
                        setShowConfirmationModal(true);
                      }}
                      disabled={!hasDeliveryNote(order)}
                    >
                      Pesanan Diterima
                    </button>

                    {showConfirmationModal && selectedOrderForAction && (
                      <ConfirmationModal
                        show={showConfirmationModal}
                        onHide={() => {
                          setShowConfirmationModal(false);
                          setSelectedOrderForAction(null);
                        }}
                        order={selectedOrderForAction}
                        onConfirm={handleConfirm}
                        safeFormatDate={safeFormatDate}
                      />
                    )}
                  </div>
                )}

                {order.status === "completed" && (
                  <div className="bg-gray-50 p-4 flex justify-between">
                    <button
                      className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded focus:outline-none w-full"
                      onClick={() => {
                        setSelectedOrderForMap(
                          selectedOrderForMap?.order_id === order.order_id ? null : order
                        );
                        setTimeout(() => {
                          topRef.current?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      }}
                    >
                      {selectedOrderForMap?.order_id === order.order_id
                        ? "Sembunyikan Detail"
                        : "Lihat Detail Pengiriman"}
                    </button>
                  </div>
                )}
              </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center items-center h-64">
          <div className="bg-blue-100 border px-4 border-blue-400 text-blue-700 px-4 py-3 rounded mt-4">
            Tidak ada pesanan dengan status ini
          </div>
          </div>
        )}
        <footer className="bg-gray-800 text-white py-4 text-xs mt-auto">
  <div className="container mx-auto px-4 text-center">
    <p>© 2025 Food Delivery App. All rights reserved.</p>
  </div>
</footer>
      </div>
  
    </>
  );
};

export default Index;