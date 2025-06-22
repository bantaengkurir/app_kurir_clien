// import { Card, Row, Col, Spinner, Badge, Button } from "react-bootstrap";
// import Navbar from "../../components/Navbar";
// import useProductStore from "../../store/useProductStore";
// import { useEffect, useState } from "react";
// import "./style.css";
// import { format } from "date-fns";
// import { id } from "date-fns/locale";
// import Modal1 from "./modal1";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import Pusher from "pusher-js";
// import { useRef } from "react";

// const Index = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [countdowns, setCountdowns] = useState({}); //hitung count down
//   const {
//     fetchOrder,
//     orders,
//     fetchPayment,
//     createPayment,
//     payments,
//     updateOrderStatus,
//     checkPaymentStatus,
//   } = useProductStore();
//   const navigate = useNavigate();

//   // Di dalam useEffect
//   const initializePaymentListener = () => {
//     const pusher = new Pusher("27dd26c02b96af0f4e50", {
//       cluster: "ap1",
//     });

//     const channel = pusher.subscribe("payment-channel");
//     channel.bind("payment-completed", (data) => {
//       if (data.order_id === selectedOrder?.orderId) {
//         toast.success("Pembayaran berhasil!");
//         fetchOrder();
//         navigate("/orderhistories");
//       }
//     });

//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   };

//   useEffect(() => {
//     const cleanup = initializePaymentListener();
//     return cleanup;
//   }, [selectedOrder]);
//   // Tambahkan di bagian useEffect

//   useEffect(() => {
//     fetchOrder();
//     fetchPayment();

//     // Inisialisasi listener Pusher
//     const cleanup = useProductStore.getState().initializePaymentListener();

//     return () => {
//       // Cleanup listener saat komponen unmount
//       if (cleanup) cleanup();
//     };
//   }, [fetchOrder, fetchPayment]);


//   // Perbaikan fungsi polling
//   const startPaymentStatusPolling = (orderId) => {
//     let attempts = 0;
//     const maxAttempts = 36; // 3 menit (5 detik x 36 = 180 detik)

//     const interval = setInterval(async () => {
//       try {
//         attempts++;
//         const updatedOrder = await checkPaymentStatus(orderId);

//         if (updatedOrder.payment_status === "completed") {
//           clearInterval(interval);
//           toast.success("Pembayaran berhasil!");
//           fetchOrder(); // Refresh data
//           navigate("/orderhistories");
//         } else if (attempts >= maxAttempts) {
//           clearInterval(interval);
//           toast(
//             "Pembayaran masih diproses, kami akan mengirim notifikasi ketika selesai",
//             {
//               icon: "⏳",
//               duration: 6000,
//             }
//           );
//         }
//       } catch (error) {
//         console.error("Polling error:", error);
//         if (attempts >= maxAttempts) {
//           clearInterval(interval);
//         }
//       }
//     }, 5000); // Cek setiap 5 detik

//     // Bersihkan interval saat komponen unmount
//     return () => clearInterval(interval);
//   };

//   //hitung count down
//   const calculateTimeLeft = (createdAt) => {
//     const orderTime = new Date(createdAt);
//     const now = new Date();
//     const endTime = new Date(orderTime.getTime() + 20 * 60000); 
//     const difference = endTime - now;

//     if (difference <= 0) return "00:00";

//     const minutes = Math.floor((difference / 1000 / 60) % 60);
//     const seconds = Math.floor((difference / 1000) % 60);

//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   const countdownsRef = useRef(countdowns);
//   useEffect(() => {
//     countdownsRef.current = countdowns;
//   }, [countdowns]);

//   // Modifikasi fungsi handleCancel
//   const handleCancel = async (orderId) => {
//     try {
//       const newStatus = {
//         status: "cancelled",
//         note: "Waktu pembayaran habis",
//         availability: "ready",
//         // courierId: order.courier.id, // Gunakan optional chaining
//       };

//       await updateOrderStatus(orderId, newStatus);
//       toast.success("Pesanan berhasil dibatalkan");
//       fetchOrder();
//     } catch (error) {
//       console.error("Gagal memperbarui status pesanan:", error);
//       toast.error("Gagal membatalkan pesanan");
//     }
//   };

//   // Perbaiki useEffect countdown untuk deteksi transisi ke 00:00
//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     const newCountdowns = {};
//   //     const currentCountdowns = countdownsRef.current;

//   //     orders.forEach((order) => {
//   //       if (
//   //         order.status === 'pending' &&
//   //         !getPaidOrderIds().has(order.order_id)
//   //       ) {
//   //         const previousTimeLeft = currentCountdowns[order.order_id] || '01:00';
//   //         const currentTimeLeft = calculateTimeLeft(order.shipping_cost?.[0]?.createdAt);
//   //         newCountdowns[order.order_id] = currentTimeLeft;

//   //         // Deteksi perubahan dari waktu > 00:00 ke 00:00
//   //         if (currentTimeLeft === '00:00' && previousTimeLeft !== '00:00') {
//   //           handleCancel(order.order_id);
//   //         }
//   //       }
//   //     });

//   //     setCountdowns(newCountdowns);
//   //   }, 1000);

//   //   return () => clearInterval(timer);
//   // }, [orders]);

//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     const newCountdowns = {};
//   //     const currentCountdowns = countdownsRef.current;

//   //     orders.forEach((order) => {
//   //       if (
//   //         order.status === "pending" &&
//   //         !getPaidOrderIds().has(order.order_id)
//   //       ) {
//   //         const previousTimeLeft = currentCountdowns[order.order_id] || "01:00";
//   //         const currentTimeLeft = calculateTimeLeft(
//   //           order.shipping_cost?.[0]?.createdAt
//   //         );
//   //         newCountdowns[order.order_id] = currentTimeLeft;

//   //         if (currentTimeLeft === "00:00" && previousTimeLeft !== "00:00") {
//   //           handleCancel(order.order_id, order); // Kirim order sebagai parameter kedua
//   //         }
//   //       }
//   //     });

//   //     setCountdowns(newCountdowns);
//   //   }, 1000);

//   //   return () => clearInterval(timer);
//   // }, [orders]);

//   useEffect(() => {
//   const timer = setInterval(() => {
//     const newCountdowns = {};
//     const currentCountdowns = countdownsRef.current;

//     orders.forEach((order) => {
//       // Proses semua order pending, tanpa peduli status pembayaran
//       if (order.status === "pending" && order.status !== "cancelled") {
//         const previousTimeLeft = currentCountdowns[order.order_id] || "05:00";
//         const currentTimeLeft = calculateTimeLeft(
//           order.shipping_cost?.[0]?.createdAt
//         );
//         newCountdowns[order.order_id] = currentTimeLeft;

//         if (currentTimeLeft === "00:00" && previousTimeLeft !== "00:00") {
//           handleCancel(order.order_id, order);
//         }
//       }
//     });

//     setCountdowns(newCountdowns);
//   }, 1000);

//   return () => clearInterval(timer);
// }, [orders]);

//   // Fungsi untuk mendapatkan daftar order_id yang sudah dibayar
//   const getPaidOrderIds = () => {
//     return new Set(payments.map((payment) => payment.order_id));
//   };

//   const handlePayment = (group) => {
//     const calculatedTotal =
//       group.subtotal + parseFloat(group.shippingInfo.shipping_cost);

//     setSelectedOrder({
//       orderId: group.orderId,
//       total: calculatedTotal,
//       paymentMethod: group.paymentMethod,
//       shipping: group.shippingInfo,
//     });
//     setIsOpen(true);
//   };

//   //tanpa midtrans
//   // const handlePaymentSubmit = async (paymentData) => {
//   //   try {
//   //     if (!selectedOrder) return;

//   //     await createPayment(selectedOrder.orderId, paymentData);

//   //     const newStatus = paymentData.payment_method === 'COD' ? 'completed' : 'process';
//   //     await updateOrderStatus(selectedOrder.orderId, newStatus);

//   //     setIsOpen(false);
//   //     toast.success("Pembayaran berhasil diproses!");
//   //     fetchOrder();
//   //     navigate("/orderhistories")

//   //   } catch (error) {
//   //     toast.error(`Gagal memproses pembayaran: ${error.message}`);
//   //   }
//   // };

//   //dengan midtrans
//   // const handlePaymentSubmit = async (paymentData) => {
//   //   try {
//   //     setIsProcessing(true);
//   //     const result = await createPayment({
//   //       ...paymentData,
//   //       amount: selectedOrder.total,
//   //       order_id: selectedOrder.orderId,
//   //     });

//   //     if (paymentData.payment_method === "transfer" && result.payment_url) {
//   //       window.open(result.payment_url, "_blank");
//   //       toast.success("Silakan selesaikan pembayaran di halaman baru");
//   //       setIsOpen(false);

//   //       // Mulai polling dengan cleanup
//   //       const cleanupPolling = startPaymentStatusPolling(selectedOrder.orderId);

//   //       // Juga setup Pusher listener sebagai fallback
//   //       return () => {
//   //         cleanupPolling();
//   //       };
//   //     } else {
//   //       // Untuk COD
//   //       toast.success("Pembayaran COD berhasil dikonfirmasi");
//   //       setIsOpen(false);
//   //       navigate("/orderhistories");
//   //     }
//   //   } catch (error) {
//   //     toast.error(`Gagal memproses pembayaran: ${error.message}`);
//   //   } finally {
//   //     setIsProcessing(false);
//   //   }
//   // };

//   const handlePaymentSubmit = async (paymentData) => {
//   try {
//     setIsProcessing(true);
//     const result = await createPayment({
//       ...paymentData,
//       amount: selectedOrder.total,
//       order_id: selectedOrder.orderId,
//     });

//     if (paymentData.payment_method === "transfer" && result.payment_url) {
//       window.open(result.payment_url, "_blank");
//       toast.success("Silakan selesaikan pembayaran di halaman baru");
//       setIsOpen(false);

//       // Mulai polling dengan cleanup
//       const cleanupPolling = startPaymentStatusPolling(selectedOrder.orderId);

//       // Inisialisasi Pusher dan trigger event untuk kurir
//       // const pusher = new Pusher('27dd26c02b96af0f4e50', {
//       //   cluster: 'ap1'
//       // });
//       // const channel = pusher.subscribe('payment-channel');
      
//       // // Kirim event ke kurir bahwa pembayaran selesai
//       // channel.trigger('client-payment-completed', {
//       //   order_id: selectedOrder.orderId,
//       //   courier_id: selectedOrder.courier?.id // Gunakan selectedOrder.courier
//       // });

//       // Juga setup Pusher listener sebagai fallback
//       return () => {
//         cleanupPolling();
//         // pusher.unsubscribe('payment-channel');
//       };
//     } else {
//       // Untuk COD
//       // Juga trigger event untuk COD
//       const pusher = new Pusher('27dd26c02b96af0f4e50', {
//         cluster: 'ap1'
//       });
//       const channel = pusher.subscribe('payment-channel');
//       channel.trigger('client-payment-completed', {
//         order_id: selectedOrder.orderId,
//         courier_id: selectedOrder.courier?.id
//       });

//       toast.success("Pembayaran COD berhasil dikonfirmasi");
//       setIsOpen(false);
//       navigate("/orderhistories");
//       window.location.reload(); // Reload halaman untuk memastikan data terbaru
//     }
//   } catch (error) {
//     toast.error(`Gagal memproses pembayaran: ${error.message}`);
//   } finally {
//     setIsProcessing(false);
//   }
// };

//   console.log("ini order", orders);

//   useEffect(() => {
//     fetchOrder();
//     fetchPayment();
//   }, [fetchOrder, fetchPayment]);

//   // const groupOrdersByTimeAndSeller = (orders) => {
//   //   const grouped = {};
//   //   const paidOrderIds = getPaidOrderIds();

//   //   console.log("ini group payment", paidOrderIds);

//   //   orders.forEach((order) => {
//   //     // Skip order yang sudah memiliki pembayaran
//   //     // if (paidOrderIds.has(order.order_id) || order.status === 'cancelled') return;
//   //     if (
//   //       order.status !== "pending" ||
//   //       paidOrderIds.has(order.order_id) ||
//   //       order.status === "cancelled"
//   //     )
//   //       return;

//   //     const orderDate = new Date(order.shipping_cost?.[0]?.createdAt);
//   //     if (!orderDate.getTime()) return;

//   //     const timeKey = format(orderDate, "yyyy-MM-dd HH:mm");
//   //     const dateLabel = format(orderDate, "EEEE, d MMMM yyyy", { locale: id });
//   //     const timeLabel = format(orderDate, "HH:mm", { locale: id });

//   //     if (!grouped[timeKey]) {
//   //       grouped[timeKey] = {
//   //         dateLabel,
//   //         timeLabel,
//   //         orderId: order.order_id,
//   //         paymentMethod: order.payment_method,
//   //         sellers: {},
//   //         shippingInfo: order.shipping_cost[0],
//   //         subtotal: 0,
//   //         courier: order.courier, // Tambahkan informasi kurir
//   //         createdAt: order.shipping_cost?.[0]?.createdAt, // Tambahkan createdAt
//   //         countdown: countdowns[order.order_id] || "01:00", // Default 1 menit
//   //       };
//   //     }

//   //     order.items.forEach((item) => {
//   //       const sellerKey = `${item.seller_id}-${item.seller_name}`;
//   //       const itemTotal = item.price * item.quantity;

//   //       if (!grouped[timeKey].sellers[sellerKey]) {
//   //         grouped[timeKey].sellers[sellerKey] = {
//   //           sellerInfo: {
//   //             name: item.seller_name,
//   //             image: item.seller_profile_image,
//   //             id: item.seller_id,
//   //           },
//   //           items: [],
//   //         };
//   //       }

//   //       grouped[timeKey].subtotal += itemTotal;
//   //       grouped[timeKey].sellers[sellerKey].items.push({
//   //         ...item,
//   //         orderDetails: {
//   //           orderId: order.order_id,
//   //           paymentMethod: order.payment_method,
//   //         },
//   //       });
//   //     });
//   //   });

//   //   return grouped;
//   // };

//   const groupOrdersByTimeAndSeller = (orders) => {
//   const grouped = {};
//   const paidOrderIds = getPaidOrderIds();

//   orders.forEach((order) => {
//     // Hanya proses order dengan status 'pending' dan bukan 'cancelled'
//     if (order.status !== "pending") return;
//     if (order.status === "cancelled") return;

//     const orderDate = new Date(order.shipping_cost?.[0]?.createdAt);
//     if (!orderDate.getTime()) return;

//     const timeKey = format(orderDate, "yyyy-MM-dd HH:mm");
//     const dateLabel = format(orderDate, "EEEE, d MMMM yyyy", { locale: id });
//     const timeLabel = format(orderDate, "HH:mm", { locale: id });

//     if (!grouped[timeKey]) {
//       grouped[timeKey] = {
//         dateLabel,
//         timeLabel,
//         orderId: order.order_id,
//         paymentMethod: order.payment_method,
//         sellers: {},
//         shippingInfo: order.shipping_cost[0],
//         subtotal: 0,
//         courier: order.courier,
//         createdAt: order.shipping_cost?.[0]?.createdAt,
//         countdown: countdowns[order.order_id] || "01:00",
//         isPaid: paidOrderIds.has(order.order_id), // Tambahkan status pembayaran
//       };
//     }
//  order.items.forEach((item) => {
//         const sellerKey = `${item.seller_id}-${item.seller_name}`;
//         const itemTotal = item.price * item.quantity;

//         if (!grouped[timeKey].sellers[sellerKey]) {
//           grouped[timeKey].sellers[sellerKey] = {
//             sellerInfo: {
//               name: item.seller_name,
//               image: item.seller_profile_image,
//               id: item.seller_id,
//             },
//             items: [],
//           };
//         }

//         grouped[timeKey].subtotal += itemTotal;
//         grouped[timeKey].sellers[sellerKey].items.push({
//           ...item,
//           orderDetails: {
//             orderId: order.order_id,
//             paymentMethod: order.payment_method,
//           },
//         });
//       });
//   });

//   return grouped;
// };


//   const groupedOrders = groupOrdersByTimeAndSeller(orders);
//   console.log("group order", groupedOrders);

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid py-4 orders-container">
//         <h2 className="text-center mb-4 fw-bold text-primary">
//           Riwayat Pesanan
//         </h2>

//         {Object.keys(groupedOrders).length > 0 ? (
//           Object.entries(groupedOrders).map(([timeKey, group]) => (
//             <Card key={timeKey} className="mb-4 main-time-card shadow">
//               {/* <Card.Header className="bg-primary text-white">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h4 className="mb-0">{group.dateLabel}</h4>
//                     <small>Waktu Pesanan: {group.timeLabel}</small>
//                   </div>
//                   <div className="d-flex align-items-center gap-3">
//                     <Badge bg="light" text="dark" className="fs-6">
//                       <i className="bi bi-clock me-2"></i>
//                       {group.timeLabel}
//                     </Badge>
//                     <Button 
//                       variant="warning" 
//                       onClick={() => handlePayment(group)}
//                       className="fw-bold"
//                     >
//                       <i className="bi bi-credit-card me-2"></i>
//                       Bayar Sekarang
//                     </Button>
//                   </div>
//                 </div>
//               </Card.Header> */}
//               {/* Nambah count down */}
//               <Card.Header className="bg-primary text-white">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h4 className="mb-0">{group.dateLabel}</h4>
//                     <small>Waktu Pesanan: {group.timeLabel}</small>
//                   </div>
//                   <div className="d-flex align-items-center gap-3">
//                     <Badge bg="light" text="dark" className="fs-6">
//                       <i className="bi bi-clock me-2"></i>
//                       {group.countdown === "00:00"
//                         ? "Waktu Habis"
//                         : group.countdown}
//                     </Badge>
//                     <Button
//                       variant={
//                         group.countdown === "00:00" ? "secondary" : "warning"
//                       }
//                       onClick={() => handlePayment(group)}
//                       className="fw-bold"
//                       disabled={group.countdown === "00:00"}
//                     >
//                       <i className="bi bi-credit-card me-2"></i>
//                       {group.countdown === "00:00"
//                         ? "Waktu Habis"
//                         : "Bayar Sekarang"}
//                     </Button>
//                   </div>
//                 </div>
//               </Card.Header>

//               <Card.Body>
//                 {/* Daftar penjual dan produk */}
//                 {Object.entries(group.sellers).map(([sellerKey, seller]) => (
//                   <Card key={sellerKey} className="mb-4 seller-sub-card">
//                     <Card.Header className="bg-light">
//                       <div className="d-flex align-items-center">
//                         <img
//                           src={seller.sellerInfo.image}
//                           alt={seller.sellerInfo.name}
//                           className="seller-avatar me-3"
//                         />
//                         <div>
//                           <h5 className="mb-0">{seller.sellerInfo.name}</h5>
//                           <small className="text-muted">
//                             ID Seller: {seller.sellerInfo.id}
//                           </small>
//                         </div>
//                       </div>
//                     </Card.Header>
//                     <Card.Body>
//                       <Row>
//                         <Col md={12}>
//                           <div className="product-list">
//                             {seller.items.map((item, itemIndex) => (
//                               <div
//                                 key={itemIndex}
//                                 className="product-item mb-4"
//                               >
//                                 <Row className="g-3 align-items-center">
//                                   <Col xs={3}>
//                                     <img
//                                       src={item.img_url}
//                                       alt={item.name}
//                                       className="img-fluid rounded product-image"
//                                     />
//                                   </Col>
//                                   <Col xs={9}>
//                                     <div className="d-flex justify-content-between align-items-start">
//                                       <div>
//                                         <h6 className="mb-1">{item.name}</h6>
//                                         <p className="text-muted small mb-2">
//                                           {item.product_description}
//                                         </p>
//                                       </div>
//                                       <Badge bg="info" className="ms-2">
//                                         Stok: {item.stock}
//                                       </Badge>
//                                     </div>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                       <div>
//                                         <span className="text-primary fw-bold me-2">
//                                           Rp{item?.price?.toLocaleString()}
//                                         </span>
//                                         <span className="text-muted">
//                                           x{item.quantity}
//                                         </span>
//                                       </div>
//                                       <span className="text-success fw-bold">
//                                         Rp
//                                         {(
//                                           item.price * item.quantity
//                                         ).toLocaleString()}
//                                       </span>
//                                     </div>
//                                   </Col>
//                                 </Row>
//                               </div>
//                             ))}
//                           </div>
//                         </Col>
//                       </Row>
//                     </Card.Body>
//                   </Card>
//                 ))}

//                 {/* Bagian pengiriman dan pembayaran */}
//                 <Row className="mt-4">
//                   <Col md={8}></Col>
//                   <Col md={4}>
//                     <div className="order-summary ps-md-3 border-start-md">
//                       <div className="shipping-info mb-4">
//                         <h5 className="section-title">
//                           <i className="bi bi-truck me-2"></i>
//                           Pengiriman
//                         </h5>
//                         <ul className="list-unstyled">
//                           <li className="mb-2">
//                             <i className="bi bi-geo-alt me-2"></i>
//                             {group.shippingInfo.address}
//                           </li>
//                           {/* Tambahkan informasi kurir */}
//                           <li>
//                             <i className="bi bi-person me-2"></i>
//                             <image
//                               src={
//                                 group.courier?.profile_image ||
//                                 "Belum ditentukan"
//                               }
//                             />
//                             Nama Kurir:{" "}
//                             {group.courier?.name || "Belum ditentukan"}
//                           </li>
//                           <li>
//                             <i className="bi bi-phone me-2 "></i>
//                             Kontak Kurir:{" "}
//                             {group.courier?.phone_number || "Belum ditentukan"}
//                           </li>
//                           <li className="mb-2">
//                             <i className="bi bi-currency-dollar me-2"></i>
//                             Biaya: Rp
//                             {parseFloat(
//                               group.shippingInfo.shipping_cost
//                             ).toLocaleString()}
//                           </li>
//                           <li>
//                             <i className="bi bi-signpost me-2"></i>
//                             Jarak: {group.shippingInfo.distance} meter
//                           </li>
//                         </ul>
//                       </div>

//                       <div className="payment-summary bg-light p-3 rounded">
//                         <h5 className="section-title">
//                           <i className="bi bi-credit-card me-2"></i>
//                           Ringkasan Pembayaran
//                         </h5>
//                         <div className="d-flex justify-content-between mb-2">
//                           <span>Subtotal:</span>
//                           <span>Rp{group.subtotal.toLocaleString()}</span>
//                         </div>
//                         <div className="d-flex justify-content-between mb-3">
//                           <span>Pengiriman:</span>
//                           <span>
//                             Rp
//                             {parseFloat(
//                               group.shippingInfo.shipping_cost
//                             ).toLocaleString()}
//                           </span>
//                         </div>
//                         <div className="d-flex justify-content-between fw-bold border-top pt-2">
//                           <span>Total:</span>
//                           <span className="text-success">
//                             Rp
//                             {(
//                               group.subtotal +
//                               parseFloat(group.shippingInfo.shipping_cost)
//                             ).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           ))
//         ) : (
//           <div className="text-center mt-5">
//             {orders.length === 0 ? (
//               <>
//                 <Spinner animation="border" variant="primary" />
//                 <p className="mt-3">Memuat data pesanan...</p>
//               </>
//             ) : (
//               <div className="container py-5">
//                 <div className="alert alert-danger" role="alert">
//                   <h4 className="alert-heading">Pembayaran Kosong!</h4>
//                   <p>Belum ada pesanan yang perlu diproses</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <Modal1
//           isOpen={isOpen}
//           onClose={() => setIsOpen(false)}
//           order={selectedOrder}
//           onSubmit={handlePaymentSubmit}
//         />
//       </div>
//     </>
//   );
// };

// export default Index;



import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Navbar from "../../components/Navbar";
import useProductStore from "../../store/useProductStore";
import Modal1 from "./modal1";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Pusher from "pusher-js";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [countdowns, setCountdowns] = useState({});
  const {
    fetchOrder,
    orders,
    fetchPayment,
    createPayment,
    payments,
    updateOrderStatus,
    checkPaymentStatus,
  } = useProductStore();
  const navigate = useNavigate();
  const countdownsRef = useRef(countdowns);

  useEffect(() => {
    countdownsRef.current = countdowns;
  }, [countdowns]);

  const initializePaymentListener = () => {
    const pusher = new Pusher("27dd26c02b96af0f4e50", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("payment-channel");
    channel.bind("payment-completed", (data) => {
      if (data.order_id === selectedOrder?.orderId) {
        toast.success("Pembayaran berhasil!");
        fetchOrder();
        navigate("/orderhistories");
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  };

  useEffect(() => {
    const cleanup = initializePaymentListener();
    return cleanup;
  }, [selectedOrder]);

  useEffect(() => {
    fetchOrder();
    fetchPayment();
    const cleanup = useProductStore.getState().initializePaymentListener();
    return () => {
      if (cleanup) cleanup();
    };
  }, [fetchOrder, fetchPayment]);

  const startPaymentStatusPolling = (orderId) => {
    let attempts = 0;
    const maxAttempts = 36;

    const interval = setInterval(async () => {
      try {
        attempts++;
        const updatedOrder = await checkPaymentStatus(orderId);

        if (updatedOrder.payment_status === "completed") {
          clearInterval(interval);
          toast.success("Pembayaran berhasil!");
          fetchOrder();
          navigate("/orderhistories");
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          toast(
            "Pembayaran masih diproses, kami akan mengirim notifikasi ketika selesai",
            {
              icon: "⏳",
              duration: 6000,
            }
          );
        }
      } catch (error) {
        console.error("Polling error:", error);
        if (attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  };

  const calculateTimeLeft = (createdAt) => {
    const orderTime = new Date(createdAt);
    const now = new Date();
    const endTime = new Date(orderTime.getTime() + 10 * 60000);
    const difference = endTime - now;

    if (difference <= 0) return "00:00";

    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleCancel = async (orderId) => {
    try {
      const newStatus = {
        status: "cancelled",
        note: "Waktu pembayaran habis",
        availability: "ready",
      };

      await updateOrderStatus(orderId, newStatus);
      toast.success("Pesanan berhasil dibatalkan");
      fetchOrder();
    } catch (error) {
      console.error("Gagal memperbarui status pesanan:", error);
      toast.error("Gagal membatalkan pesanan");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const newCountdowns = {};
      const currentCountdowns = countdownsRef.current;

      orders.forEach((order) => {
        if (order.status === "pending" && order.status !== "cancelled") {
          const previousTimeLeft = currentCountdowns[order.order_id] || "05:00";
          const currentTimeLeft = calculateTimeLeft(
            order.shipping_cost?.[0]?.createdAt
          );
          newCountdowns[order.order_id] = currentTimeLeft;

          if (currentTimeLeft === "00:00" && previousTimeLeft !== "00:00") {
            handleCancel(order.order_id, order);
          }
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(timer);
  }, [orders]);

  const getPaidOrderIds = () => {
    return new Set(payments.map((payment) => payment.order_id));
  };

  const handlePayment = (group) => {
    const calculatedTotal =
      group.subtotal + parseFloat(group.shippingInfo.shipping_cost);

    setSelectedOrder({
      orderId: group.orderId,
      total: calculatedTotal,
      paymentMethod: group.paymentMethod,
      shipping: group.shippingInfo,
    });
    setIsOpen(true);
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      setIsProcessing(true);
      const result = await createPayment({
        ...paymentData,
        amount: selectedOrder.total,
        order_id: selectedOrder.orderId,
      });

      if (paymentData.payment_method === "transfer" && result.payment_url) {
        window.open(result.payment_url, "_blank");
        toast.success("Silakan selesaikan pembayaran di halaman baru");
        setIsOpen(false);
        const cleanupPolling = startPaymentStatusPolling(selectedOrder.orderId);
        return () => {
          cleanupPolling();
        };
      } else {
        const pusher = new Pusher('27dd26c02b96af0f4e50', {
          cluster: 'ap1'
        });
        const channel = pusher.subscribe('payment-channel');
        channel.trigger('client-payment-completed', {
          order_id: selectedOrder.orderId,
          courier_id: selectedOrder.courier?.id
        });

        toast.success("Pembayaran COD berhasil dikonfirmasi");
        setIsOpen(false);
        navigate("/orderhistories");
        window.location.reload();
      }
    } catch (error) {
      toast.error(`Gagal memproses pembayaran: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const groupOrdersByTimeAndSeller = (orders) => {
    const grouped = {};
    const paidOrderIds = getPaidOrderIds();

    orders.forEach((order) => {
      if (order.status !== "pending") return;
      if (order.status === "cancelled") return;

      const orderDate = new Date(order.shipping_cost?.[0]?.createdAt);
      if (!orderDate.getTime()) return;

      const timeKey = format(orderDate, "yyyy-MM-dd HH:mm");
      const dateLabel = format(orderDate, "EEEE, d MMMM yyyy", { locale: id });
      const timeLabel = format(orderDate, "HH:mm", { locale: id });

      if (!grouped[timeKey]) {
        grouped[timeKey] = {
          dateLabel,
          timeLabel,
          orderId: order.order_id,
          paymentMethod: order.payment_method,
          sellers: {},
          shippingInfo: order.shipping_cost[0],
          subtotal: 0,
          courier: order.courier,
          createdAt: order.shipping_cost?.[0]?.createdAt,
          countdown: countdowns[order.order_id] || "01:00",
          isPaid: paidOrderIds.has(order.order_id),
        };
      }

      order.items.forEach((item) => {
        const sellerKey = `${item.seller_id}-${item.seller_name}`;
        const itemTotal = item.price * item.quantity;

        if (!grouped[timeKey].sellers[sellerKey]) {
          grouped[timeKey].sellers[sellerKey] = {
            sellerInfo: {
              name: item.seller_name,
              image: item.seller_profile_image,
              id: item.seller_id,
            },
            items: [],
          };
        }

        grouped[timeKey].subtotal += itemTotal;
        grouped[timeKey].sellers[sellerKey].items.push({
          ...item,
          orderDetails: {
            orderId: order.order_id,
            paymentMethod: order.payment_method,
          },
        });
      });
    });

    return grouped;
  };

  const groupedOrders = groupOrdersByTimeAndSeller(orders);

  return (
    <>
      <Navbar />
      <div className="w-full py-4 px-4">
        <h2 className="text-center mb-4 font-bold text-blue-600 text-2xl">
          Riwayat Pesanan
        </h2>

        {Object.keys(groupedOrders).length > 0 ? (
          Object.entries(groupedOrders).map(([timeKey, group]) => (
            <div key={timeKey} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-orange-400 text-white p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{group.dateLabel}</h4>
                    <p className="text-sm">Waktu Pesanan: {group.timeLabel}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      <span className="mr-2">⏱</span>
                      {group.countdown === "00:00" ? "Waktu Habis" : group.countdown}
                    </span>
                    <button
                      className={`px-4 py-2 rounded-lg font-bold ${
                        group.countdown === "00:00"
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                      onClick={() => handlePayment(group)}
                      disabled={group.countdown === "00:00"}
                    >
                      <span className="mr-2">💳</span>
                      {group.countdown === "00:00" ? "Waktu Habis" : "Bayar Sekarang"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {/* Seller List */}
                {Object.entries(group.sellers).map(([sellerKey, seller]) => (
                  <div key={sellerKey} className="mb-4 border rounded-lg overflow-hidden">
                    {/* Seller Header */}
                    <div className="bg-gray-100 p-3">
                      <div className="flex items-center">
                        <img
                          src={seller.sellerInfo.image}
                          alt={seller.sellerInfo.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <h5 className="font-bold">{seller.sellerInfo.name}</h5>
                          <p className="text-gray-600 text-sm">
                            ID Seller: {seller.sellerInfo.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="p-3">
                      {seller.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="mb-4">
                          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <div className="w-full sm:w-1/4">
                              <img
                                src={item.img_url}
                                alt={item.name}
                                className="w-full rounded"
                              />
                            </div>
                            <div className="w-full sm:w-3/4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h6 className="font-semibold">{item.name}</h6>
                                  <p className="text-gray-600 text-sm mb-2">
                                    {item.product_description}
                                  </p>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  Stok: {item.stock}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="text-blue-600 font-bold mr-2">
                                    Rp{item?.price?.toLocaleString()}
                                  </span>
                                  <span className="text-gray-600">
                                    x{item.quantity}
                                  </span>
                                </div>
                                <span className="text-green-600 font-bold">
                                  Rp{(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Shipping and Payment Summary */}
                <div className="mt-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-2/3"></div>
                    <div className="w-full md:w-1/3">
                      <div className="shipping-info mb-4">
                        <h5 className="font-semibold text-lg mb-2 flex items-center">
                          <span className="mr-2">🚚</span>
                          Pengiriman
                        </h5>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2">📍</span>
                            {group.shippingInfo.address}
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">👤</span>
                            Nama Kurir: {group.courier?.name || "Belum ditentukan"}
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">📞</span>
                            Kontak Kurir: {group.courier?.phone_number || "Belum ditentukan"}
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">💰</span>
                            Biaya: Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">📏</span>
                            Jarak: {group.shippingInfo.distance} meter
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-100 p-3 rounded-lg">
                        <h5 className="font-semibold text-lg mb-2 flex items-center">
                          <span className="mr-2">💳</span>
                          Ringkasan Pembayaran
                        </h5>
                        <div className="flex justify-between mb-2">
                          <span>Subtotal:</span>
                          <span>Rp{group.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span>Pengiriman:</span>
                          <span>Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold border-t border-gray-300 pt-2">
                          <span>Total:</span>
                          <span className="text-green-600">
                            Rp{(group.subtotal + parseFloat(group.shippingInfo.shipping_cost)).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            {orders.length === 0 ? (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-3">Memuat data pesanan...</p>
              </>
            ) : (
              <div className="py-5">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                  <h4 className="font-bold">Pembayaran Kosong!</h4>
                  <p>Belum ada pesanan yang perlu diproses</p>
                </div>
              </div>
            )}
          </div>
        )}

        <Modal1
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          order={selectedOrder}
          onSubmit={handlePaymentSubmit}
        />
      </div>
    </>
  );
};

export default Index;
