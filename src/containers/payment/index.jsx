// import { Card, Row, Col, Spinner, Badge, Button } from "react-bootstrap";
// import Navbar from "../../components/Navbar";
// import useProductStore from "../../store/useProductStore";
// import { useEffect, useState } from "react";
// import "./style.css";
// import { format } from 'date-fns';
// import { id } from 'date-fns/locale';
// import Payment from './paymentForm';


// import Modal from './modal';
// // import Modal from "../../components/modal";
// import toast from "react-hot-toast";

// const Index = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const { fetchOrder, orders } = useProductStore();

//   useEffect(() => {
//     fetchOrder();
//   }, [fetchOrder]);

//   const groupOrdersByTimeAndSeller = (orders) => {
//     const grouped = {};

//     orders.forEach((order) => {
//       const orderDate = new Date(order.shipping_cost[0].createdAt);
//       const timeKey = format(orderDate, 'yyyy-MM-dd HH:mm');
//       const dateLabel = format(orderDate, 'EEEE, d MMMM yyyy', { locale: id });
//       const timeLabel = format(orderDate, 'HH:mm', { locale: id });

//       if (!grouped[timeKey]) {
//         grouped[timeKey] = {
//           dateLabel,
//           timeLabel,
//           orderId: order.order_id,
//           totalAmount: order.total,
//           paymentMethod: order.payment_method,
//           sellers: {},
//           shippingInfo: order.shipping_cost[0]
//         };
//       }

//       order.items.forEach((item) => {
//         const sellerKey = `${item.seller_id}-${item.seller_name}`;

//         if (!grouped[timeKey].sellers[sellerKey]) {
//           grouped[timeKey].sellers[sellerKey] = {
//             sellerInfo: {
//               name: item.seller_name,
//               image: item.seller_profile_image,
//               id: item.seller_id
//             },
//             items: []
//           };
//         }

//         grouped[timeKey].sellers[sellerKey].items.push({
//           ...item,
//           orderDetails: {
//             orderId: order.order_id,
//             total: order.total,
//             paymentMethod: order.payment_method,
//             shipping: order.shipping_cost[0]
//           }
//         });
//       });
//     });

//     return grouped;
//   };


//   const handlePayment = (timeKey, group) => {
// 	console.log("timkey", timeKey)
// 	console.log("group", group)
//     setSelectedOrder({
//       timeKey,
//       orderId: group.orderId,
//       total: group.totalAmount,
//       paymentMethod: group.paymentMethod,
//       shipping: group.shippingInfo
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   const groupedOrders = groupOrdersByTimeAndSeller(orders);

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid py-4 orders-container">
//         <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>

//         {Object.keys(groupedOrders).length > 0 ? (
//           Object.entries(groupedOrders).map(([timeKey, group]) => (
//             <Card key={timeKey} className="mb-4 main-time-card shadow">
//               <Card.Header className="bg-primary text-white">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h4 className="mb-0">{group.dateLabel}</h4>
//                     <small className="opacity-75">Waktu Pesanan: {group.timeLabel}</small>
//                   </div>
//                   <div className="d-flex align-items-center gap-3">
//                     <Badge bg="light" text="dark" className="fs-6">
//                       <i className="bi bi-clock me-2"></i>
//                       {group.timeLabel}
//                     </Badge>
//                     <Button 
//                       variant="warning"
//                       onClick={() => handlePayment(timeKey, group)}
//                       className="fw-bold"
//                     >
//                       <i className="bi bi-credit-card me-2"></i>
//                       Bayar Sekarang
//                     </Button>
//                   </div>
//                 </div>
//               </Card.Header>

//               <Card.Body>
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
//                           <small className="text-muted">ID Seller: {seller.sellerInfo.id}</small>
//                         </div>
//                       </div>
//                     </Card.Header>

//                     <Card.Body>
//                       <Row>
//                         <Col md={8}>
//                           <div className="product-list">
//                             {seller.items.map((item, itemIndex) => (
//                               <div key={itemIndex} className="product-item mb-4">
//                                 <Row className="g-3 align-items-center">
//                                   <Col xs={3}>
//                                     <img
//                                       src={item.image_url}
//                                       alt={item.name}
//                                       className="img-fluid rounded product-image"
//                                     />
//                                   </Col>
//                                   <Col xs={9}>
//                                     <div className="d-flex justify-content-between align-items-start">
//                                       <div>
//                                         <h6 className="mb-1">{item.name}</h6>
//                                         <p className="text-muted small mb-2">{item.description}</p>
//                                       </div>
//                                       <Badge bg="info" className="ms-2">
//                                         Stok: {item.stock}
//                                       </Badge>
//                                     </div>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                       <div>
//                                         <span className="text-primary fw-bold me-2">
//                                           Rp{item.price.toLocaleString()}
//                                         </span>
//                                         <span className="text-muted">
//                                           x{item.quantity}
//                                         </span>
//                                       </div>
//                                       <span className="text-success fw-bold">
//                                         Rp{(item.price * item.quantity).toLocaleString()}
//                                       </span>
//                                     </div>
//                                   </Col>
//                                 </Row>
//                               </div>
//                             ))}
//                           </div>
//                         </Col>

//                         <Col md={4}>
//                           <div className="order-summary ps-md-3 border-start-md">
//                             <div className="shipping-info mb-4">
//                               <h5 className="section-title">
//                                 <i className="bi bi-truck me-2"></i>
//                                 Pengiriman
//                               </h5>
//                               <ul className="list-unstyled">
//                                 <li className="mb-2">
//                                   <i className="bi bi-geo-alt me-2"></i>
//                                   {group.shippingInfo.address}
//                                 </li>
//                                 <li className="mb-2">
//                                   <i className="bi bi-currency-dollar me-2"></i>
//                                   Biaya: Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}
//                                 </li>
//                                 <li>
//                                   <i className="bi bi-signpost me-2"></i>
//                                   Jarak: {group.shippingInfo.distance} km
//                                 </li>
//                               </ul>
//                             </div>

//                             <div className="payment-summary bg-light p-3 rounded">
//                               <h5 className="section-title">
//                                 <i className="bi bi-credit-card me-2"></i>
//                                 Ringkasan Pembayaran
//                               </h5>
//                               <div className="d-flex justify-content-between mb-2">
//                                 <span>Subtotal:</span>
//                                 <span>Rp{seller.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
//                               </div>
//                               <div className="d-flex justify-content-between mb-3">
//                                 <span>Pengiriman:</span>
//                                 <span>Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}</span>
//                               </div>
//                               <div className="d-flex justify-content-between fw-bold border-top pt-2">
//                                 <span>Total:</span>
//                                 <span className="text-success">
//                                   Rp{group.totalAmount.toLocaleString()}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </Col>
//                       </Row>
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </Card.Body>
//             </Card>
//           ))
//         ) : (
//           <div className="text-center mt-5">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Memuat data pesanan...</p>
//           </div>
//         )}

//       </div>
//     </>
//   );
// };

// export default Index;






































































// // import { 
// // 	Card, 
// // 	Row, Col, Spinner, Badge, Button } from "react-bootstrap";
// // import Navbar from "../../components/Navbar";
// // import useProductStore from "../../store/useProductStore";
// // import { useEffect, useState } from "react";
// // import "./style.css";
// // import { format } from 'date-fns';
// // import { id } from 'date-fns/locale';
// // import Modal1 from './modal1';
// // // import Modal from "../../components/modal";
// // import toast from "react-hot-toast";

// // const Index = () => {
// // 	const [isOpen, setIsOpen] = useState(false);
// // 	const toggleModal = () => setIsOpen(!isOpen); // Toggle modal visibility
// //   const [showModal, setShowModal] = useState(false);
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const { fetchOrder, orders, createPayment, updateOrderStatus } = useProductStore();

// //   const handlePayment = (timeKey, group) => {
// //     setSelectedOrder({
// //       orderId: group.orderId,
// //       total: group.totalAmount,
// //       paymentMethod: group.paymentMethod,
// //       shipping: group.shippingInfo
// //     });
// //     setIsOpen(true);
// //   };

// //   const handlePaymentSubmit = async (paymentData) => {
// //     try {
// //       if (!selectedOrder) return;
      
// //       await createPayment(selectedOrder.orderId, paymentData);
      
// //       // Update status order
// //       const newStatus = paymentData.payment_method === 'COD' ? 'paid' : 'process';
// //       await updateOrderStatus(selectedOrder.orderId, newStatus);
      
// //       setIsOpen(false);
// //       toast.success("Pembayaran berhasil diproses!");
// //       fetchOrder(); // Refresh data order

// //     } catch (error) {
// //       toast.error(`Gagal memproses pembayaran: ${error.message}`);
// //     }
// //   };


// //   const handleClick = (e) => {
// //     e.preventDefault();
// //     setIsOpen(true); // Open the modal
// //   };





// //   useEffect(() => {
// // 	    fetchOrder();
// // 	  }, [fetchOrder]);
	
// // 	  const groupOrdersByTimeAndSeller = (orders) => {
// // 	    const grouped = {};
	
// // 	    orders.forEach((order) => {
// // 	      const orderDate = new Date(order.shipping_cost[0].createdAt);
// // 	      const timeKey = format(orderDate, 'yyyy-MM-dd HH:mm');
// // 	      const dateLabel = format(orderDate, 'EEEE, d MMMM yyyy', { locale: id });
// // 	      const timeLabel = format(orderDate, 'HH:mm', { locale: id });

// // 		  console.log("order data", orderDate)
	
// // 	      if (!grouped[timeKey]) {
// // 	        grouped[timeKey] = {
// // 	          dateLabel,
// // 	          timeLabel,
// // 	          orderId: order.order_id,
// // 	          totalAmount: order.total,
// // 	          paymentMethod: order.payment_method,
// // 	          sellers: {},
// // 	          shippingInfo: order.shipping_cost[0]
// // 	        };
// // 	      }
	
// // 	      order.items.forEach((item) => {
// // 	        const sellerKey = `${item.seller_id}-${item.seller_name}`;
	
// // 	        if (!grouped[timeKey].sellers[sellerKey]) {
// // 	          grouped[timeKey].sellers[sellerKey] = {
// // 	            sellerInfo: {
// // 	              name: item.seller_name,
// // 	              image: item.seller_profile_image,
// // 	              id: item.seller_id
// // 	            },
// // 	            items: []
// // 	          };
// // 	        }
	
// // 	        grouped[timeKey].sellers[sellerKey].items.push({
// // 	          ...item,
// // 	          orderDetails: {
// // 	            orderId: order.order_id,
// // 	            total: order.total,
// // 	            paymentMethod: order.payment_method,
// // 	            shipping: order.shipping_cost[0]
// // 	          }
// // 	        });
// // 	      });
// // 	    });
	
// // 	    return grouped;
// // 	  };

// // 	  const handleCloseModal = () => {
// // 	    setShowModal(false);
// // 	    setSelectedOrder(null);
// // 	  };
	
// // 	  const groupedOrders = groupOrdersByTimeAndSeller(orders);
	

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="container-fluid py-4 orders-container">
// //         <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>

// // 		<Modal1
// //   isOpen={isOpen}
// //   onClose={() => {
// //     setIsOpen(false);
// //     setSelectedOrder(null);
// //   }}
// //   order={selectedOrder}
// //   onSubmit={handlePaymentSubmit}
// // />

// //         {Object.keys(groupedOrders).length > 0 ? (
// //           Object.entries(groupedOrders).map(([timeKey, group]) => (
// //             <Card key={timeKey} className="mb-4 main-time-card shadow">
// //               <Card.Header className="bg-primary text-white">
// //                 <div className="d-flex justify-content-between align-items-center">
// //                   <div>
// //                     <h4 className="mb-0">{group.dateLabel}</h4>
// //                     <small className="opacity-75">Waktu Pesanan: {group.timeLabel}</small>
// //                   </div>
// //                   <div className="d-flex align-items-center gap-3">
// //                     <Badge bg="light" text="dark" className="fs-6">
// //                       <i className="bi bi-clock me-2"></i>
// //                       {group.timeLabel}
// //                     </Badge>
// // 					<Button 
// //           variant="warning" 
// //           onClick={() => handlePayment(timeKey, group)}
// //           className="fw-bold"
// //         >
// //           <i className="bi bi-credit-card me-2"></i>
// //           Bayar Sekarang
// //         </Button>
// //               {/* <Modal toggleModal={toggleModal} isOpen={isOpen} show={showModal}
// //   order={selectedOrder}
// //   onClose={() => {
// //     setShowModal(false);
// //     setSelectedOrder(null);
// //   }}
// //   onSubmit={handlePayment}/>  */}
// //                   </div>
// //                 </div>
// //               </Card.Header>

// //               <Card.Body>
// //                 {Object.entries(group.sellers).map(([sellerKey, seller]) => (
// //                   <Card key={sellerKey} className="mb-4 seller-sub-card">
// //                     <Card.Header className="bg-light">
// //                       <div className="d-flex align-items-center">
// //                         <img 
// //                           src={seller.sellerInfo.image} 
// //                           alt={seller.sellerInfo.name}
// //                           className="seller-avatar me-3"
// //                         />
// //                         <div>
// //                           <h5 className="mb-0">{seller.sellerInfo.name}</h5>
// //                           <small className="text-muted">ID Seller: {seller.sellerInfo.id}</small>
// //                         </div>
// //                       </div>
// //                     </Card.Header>

// //                     <Card.Body>
// //                       <Row>
// //                         <Col md={8}>
// //                           <div className="product-list">
// //                             {seller.items.map((item, itemIndex) => (
// //                               <div key={itemIndex} className="product-item mb-4">
// //                                 <Row className="g-3 align-items-center">
// //                                   <Col xs={3}>
// //                                     <img
// //                                       src={item.image_url}
// //                                       alt={item.name}
// //                                       className="img-fluid rounded product-image"
// //                                     />
// //                                   </Col>
// //                                   <Col xs={9}>
// //                                     <div className="d-flex justify-content-between align-items-start">
// //                                       <div>
// //                                         <h6 className="mb-1">{item.name}</h6>
// //                                         <p className="text-muted small mb-2">{item.description}</p>
// //                                       </div>
// //                                       <Badge bg="info" className="ms-2">
// //                                         Stok: {item.stock}
// //                                       </Badge>
// //                                     </div>
// //                                     <div className="d-flex justify-content-between align-items-center">
// //                                       <div>
// //                                         <span className="text-primary fw-bold me-2">
// //                                           Rp{item.price.toLocaleString()}
// //                                         </span>
// //                                         <span className="text-muted">
// //                                           x{item.quantity}
// //                                         </span>
// //                                       </div>
// //                                       <span className="text-success fw-bold">
// //                                         Rp{(item.price * item.quantity).toLocaleString()}
// //                                       </span>
// //                                     </div>
// //                                   </Col>
// //                                 </Row>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </Col>

// //                         <Col md={4}>
// //                           <div className="order-summary ps-md-3 border-start-md">
// //                             <div className="shipping-info mb-4">
// //                               <h5 className="section-title">
// //                                 <i className="bi bi-truck me-2"></i>
// //                                 Pengiriman
// //                               </h5>
// //                               <ul className="list-unstyled">
// //                                 <li className="mb-2">
// //                                   <i className="bi bi-geo-alt me-2"></i>
// //                                   {group.shippingInfo.address}
// //                                 </li>
// //                                 <li className="mb-2">
// //                                   <i className="bi bi-currency-dollar me-2"></i>
// //                                   Biaya: Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}
// //                                 </li>
// //                                 <li>
// //                                   <i className="bi bi-signpost me-2"></i>
// //                                   Jarak: {group.shippingInfo.distance} km
// //                                 </li>
// //                               </ul>
// //                             </div>

// //                             <div className="payment-summary bg-light p-3 rounded">
// //   <h5 className="section-title">
// //     <i className="bi bi-credit-card me-2"></i>
// //     Ringkasan Pembayaran
// //   </h5>
// //   <div className="d-flex justify-content-between mb-2">
// //     <span>Subtotal:</span>
// //     <span>
// //       Rp{seller.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
// //     </span>
// //   </div>
// //   <div className="d-flex justify-content-between mb-3">
// //     <span>Pengiriman:</span>
// //     <span>Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}</span>
// //   </div>
// //   <div className="d-flex justify-content-between fw-bold border-top pt-2">
// //     <span>Total:</span>
// //     <span className="text-success">
// //       Rp{(seller.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + parseFloat(group.shippingInfo.shipping_cost)).toLocaleString()}
// //     </span>
// //   </div>
// // </div>

// //                           </div>
// //                         </Col>
// //                       </Row>
// //                     </Card.Body>
// //                   </Card>
// //                 ))}
// //               </Card.Body>
// //             </Card>
// //           ))
// //         ) : (
// //           <div className="text-center mt-5">
// //             <Spinner animation="border" variant="primary" />
// //             <p className="mt-3">Memuat data pesanan...</p>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default Index;


// import { 
//   Card, 
//   Row, Col, Spinner, Badge, Button } from "react-bootstrap";
// import Navbar from "../../components/Navbar";
// import useProductStore from "../../store/useProductStore";
// import { useEffect, useState } from "react";
// import "./style.css";
// import { format } from 'date-fns';
// import { id } from 'date-fns/locale';
// import Modal1 from './modal1';
// import toast from "react-hot-toast";

// const Index = () => {
//   // ... (kode sebelumnya tetap sama)
//   const [isOpen, setIsOpen] = useState(false);
// 	const toggleModal = () => setIsOpen(!isOpen); // Toggle modal visibility
//   const [showModal, setShowModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const { fetchOrder, orders, createPayment, updateOrderStatus } = useProductStore();

//   const handlePayment = (timeKey, group) => {
//     setSelectedOrder({
//       orderId: group.orderId,
//       total: group.totalAmount,
//       paymentMethod: group.paymentMethod,
//       shipping: group.shippingInfo
//     });
//     setIsOpen(true);
//   };

//   const handlePaymentSubmit = async (paymentData) => {
//     try {
//       if (!selectedOrder) return;
      
//       await createPayment(selectedOrder.orderId, paymentData);
      
//       // Update status order
//       const newStatus = paymentData.payment_method === 'COD' ? 'paid' : 'process';
//       await updateOrderStatus(selectedOrder.orderId, newStatus);
      
//       setIsOpen(false);
//       toast.success("Pembayaran berhasil diproses!");
//       fetchOrder(); // Refresh data order

//     } catch (error) {
//       toast.error(`Gagal memproses pembayaran: ${error.message}`);
//     }
//   };


//   const handleClick = (e) => {
//     e.preventDefault();
//     setIsOpen(true); // Open the modal
//   };





//   useEffect(() => {
// 	    fetchOrder();
// 	  }, [fetchOrder]);

//   const groupOrdersByTimeAndSeller = (orders) => {
//     const grouped = {};

//     orders.forEach((order) => {
//       const orderDate = new Date(order.shipping_cost[0].createdAt);
//       const timeKey = format(orderDate, 'yyyy-MM-dd HH:mm');
//       const dateLabel = format(orderDate, 'EEEE, d MMMM yyyy', { locale: id });
//       const timeLabel = format(orderDate, 'HH:mm', { locale: id });

//       if (!grouped[timeKey]) {
//         grouped[timeKey] = {
//           dateLabel,
//           timeLabel,
//           orderId: order.order_id,
//           totalAmount: order.total,
//           paymentMethod: order.payment_method,
//           sellers: {},
//           shippingInfo: order.shipping_cost[0],
//           subtotal: 0 // Tambahkan field subtotal
//         };
//       }

//       order.items.forEach((item) => {
//         const sellerKey = `${item.seller_id}-${item.seller_name}`;
//         const itemTotal = item.price * item.quantity;

//         if (!grouped[timeKey].sellers[sellerKey]) {
//           grouped[timeKey].sellers[sellerKey] = {
//             sellerInfo: {
//               name: item.seller_name,
//               image: item.seller_profile_image,
//               id: item.seller_id
//             },
//             items: []
//           };
//         }

//         grouped[timeKey].subtotal += itemTotal; // Akumulasi subtotal
//         grouped[timeKey].sellers[sellerKey].items.push({
//           ...item,
//           orderDetails: {
//             orderId: order.order_id,
//             total: order.total,
//             paymentMethod: order.payment_method
//           }
//         });
//       });
//     });

//     return grouped;
//   };

//   // ... (kode sebelumnya tetap sama)
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   };

//   const groupedOrders = groupOrdersByTimeAndSeller(orders);

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid py-4 orders-container">
//         <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>

        

//         {Object.keys(groupedOrders).length > 0 ? (
//           Object.entries(groupedOrders).map(([timeKey, group]) => (
//             <Card key={timeKey} className="mb-4 main-time-card shadow">
//               {/* Bagian header tetap sama */}
//               <Card.Header className="bg-primary text-white">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h4 className="mb-0">{group.dateLabel}</h4>
//                     <small className="opacity-75">Waktu Pesanan: {group.timeLabel}</small>
//                   </div>
//                   <div className="d-flex align-items-center gap-3">
//                     <Badge bg="light" text="dark" className="fs-6">
//                       <i className="bi bi-clock me-2"></i>
//                       {group.timeLabel}
//                     </Badge>
// 					<Button 
//           variant="warning" 
//           onClick={() => handlePayment(timeKey, group)}
//           className="fw-bold"
//         >
//           <i className="bi bi-credit-card me-2"></i>
//           Bayar Sekarang
//         </Button>
//               {/* <Modal toggleModal={toggleModal} isOpen={isOpen} show={showModal}
//   order={selectedOrder}
//   onClose={() => {
//     setShowModal(false);
//     setSelectedOrder(null);
//   }}
//   onSubmit={handlePayment}/>  */}
//                   </div>
//                 </div>
//               </Card.Header>

//               <Card.Body>
//                 {/* Daftar penjual dan produk */}
//                 {Object.entries(group.sellers).map(([sellerKey, seller]) => (
//                   <Card key={sellerKey} className="mb-4 seller-sub-card">
//                     <Card.Header className="bg-light">
//                       {/* Header penjual */}
//                       <div className="d-flex align-items-center">
//                          <img 
//                           src={seller.sellerInfo.image} 
//                           alt={seller.sellerInfo.name}
//                           className="seller-avatar me-3"
//                         />
//                         <div>
//                           <h5 className="mb-0">{seller.sellerInfo.name}</h5>
//                           <small className="text-muted">ID Seller: {seller.sellerInfo.id}</small>
//                         </div>
//                       </div>
//                     </Card.Header>
//                     <Card.Body>
//                       <Row>
//                         <Col md={12}> {/* Kolom diperlebar ke 12 */}
//                           <div className="product-list">
//                             {seller.items.map((item, itemIndex) => (
//                               // Daftar produk tetap sama
//                               <div key={itemIndex} className="product-item mb-4">
//                                 <Row className="g-3 align-items-center">
//                                   <Col xs={3}>
//                                     <img
//                                       src={item.image_url}
//                                       alt={item.name}
//                                       className="img-fluid rounded product-image"
//                                     />
//                                   </Col>
//                                   <Col xs={9}>
//                                     <div className="d-flex justify-content-between align-items-start">
//                                       <div>
//                                         <h6 className="mb-1">{item.name}</h6>
//                                         <p className="text-muted small mb-2">{item.description}</p>
//                                       </div>
//                                       <Badge bg="info" className="ms-2">
//                                         Stok: {item.stock}
//                                       </Badge>
//                                     </div>
//                                     <div className="d-flex justify-content-between align-items-center">
//                                       <div>
//                                         <span className="text-primary fw-bold me-2">
//                                           Rp{item.price.toLocaleString()}
//                                         </span>
//                                         <span className="text-muted">
//                                           x{item.quantity}
//                                         </span>
//                                       </div>
//                                       <span className="text-success fw-bold">
//                                         Rp{(item.price * item.quantity).toLocaleString()}
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

//                 {/* Bagian pengiriman dan pembayaran dipindah ke sini */}
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
//                           <li className="mb-2">
//                             <i className="bi bi-currency-dollar me-2"></i>
//                             Biaya: Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}
//                           </li>
//                           <li>
//                             <i className="bi bi-signpost me-2"></i>
//                             Jarak: {group.shippingInfo.distance} km
//                           </li>
//                         </ul>
//                       </div>

//                       <div className="payment-summary bg-light p-3 rounded">
//   <h5 className="section-title">
//     <i className="bi bi-credit-card me-2"></i>
//     Ringkasan Pembayaran
//   </h5>
//   <div className="d-flex justify-content-between mb-2">
//     <span>Subtotal:</span>
//     <span>Rp{group.subtotal.toLocaleString()}</span>
//   </div>
//   <div className="d-flex justify-content-between mb-3">
//     <span>Pengiriman:</span>
//     <span>Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}</span>
//   </div>
//   <div className="d-flex justify-content-between fw-bold border-top pt-2">
//     <span>Total:</span>
//     <span className="text-success">
//       {/* Jumlahkan dulu baru konversi ke string */}
//       Rp{(group.subtotal + parseFloat(group.shippingInfo.shipping_cost)).toLocaleString()}
//     </span>
//   </div>
// </div>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           ))
//         ) : (
//           // Tampilan loading tetap sama
//           <div className="text-center mt-5">
//             <Spinner animation="border" variant="primary" />
//             <p className="mt-3">Memuat data pesanan...</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Index;


import { 
  Card, 
  Row, Col, Spinner, Badge, Button } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import useProductStore from "../../store/useProductStore";
import { useEffect, useState } from "react";
import "./style.css";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import Modal1 from './modal1';
import toast from "react-hot-toast";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { fetchOrder, orders, createPayment, updateOrderStatus } = useProductStore();

  const handlePayment = (group) => {
    // Hitung total yang benar dengan menambahkan subtotal dan ongkir
    const calculatedTotal = group.subtotal + parseFloat(group.shippingInfo.shipping_cost);
    
    setSelectedOrder({
      orderId: group.orderId,
      total: calculatedTotal,
      paymentMethod: group.paymentMethod,
      shipping: group.shippingInfo
    });
    setIsOpen(true);
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      if (!selectedOrder) return;
      
      await createPayment(selectedOrder.orderId, paymentData);
      
      const newStatus = paymentData.payment_method === 'COD' ? 'paid' : 'process';
      await updateOrderStatus(selectedOrder.orderId, newStatus);
      
      setIsOpen(false);
      toast.success("Pembayaran berhasil diproses!");
      fetchOrder();

    } catch (error) {
      toast.error(`Gagal memproses pembayaran: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const groupOrdersByTimeAndSeller = (orders) => {
    const grouped = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.shipping_cost[0].createdAt);
      const timeKey = format(orderDate, 'yyyy-MM-dd HH:mm');
      const dateLabel = format(orderDate, 'EEEE, d MMMM yyyy', { locale: id });
      const timeLabel = format(orderDate, 'HH:mm', { locale: id });

      if (!grouped[timeKey]) {
        grouped[timeKey] = {
          dateLabel,
          timeLabel,
          orderId: order.order_id,
          paymentMethod: order.payment_method,
          sellers: {},
          shippingInfo: order.shipping_cost[0],
          subtotal: 0
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
              id: item.seller_id
            },
            items: []
          };
        }

        grouped[timeKey].subtotal += itemTotal;
        grouped[timeKey].sellers[sellerKey].items.push({
          ...item,
          orderDetails: {
            orderId: order.order_id,
            paymentMethod: order.payment_method
          }
        });
      });
    });

    return grouped;
  };

  const groupedOrders = groupOrdersByTimeAndSeller(orders);

  return (
    <>
      <Navbar />
      <div className="container-fluid py-4 orders-container">
        <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>

        {Object.keys(groupedOrders).length > 0 ? (
          Object.entries(groupedOrders).map(([timeKey, group]) => {
            // Hitung total yang benar untuk ditampilkan
            // const calculatedTotal = group.subtotal + parseFloat(group.shippingInfo.shipping_cost);
            
            return (
              <Card key={timeKey} className="mb-4 main-time-card shadow">
                <Card.Header className="bg-primary text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0">{group.dateLabel}</h4>
                      <small>Waktu Pesanan: {group.timeLabel}</small>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <Badge bg="light" text="dark" className="fs-6">
                        <i className="bi bi-clock me-2"></i>
                        {group.timeLabel}
                      </Badge>
                      <Button 
                        variant="warning" 
                        onClick={() => handlePayment(group)}
                        className="fw-bold"
                      >
                        <i className="bi bi-credit-card me-2"></i>
                        Bayar Sekarang
                      </Button>
                    </div>
                  </div>
                </Card.Header>
                {/* ... (bagian Card.Body tetap sama) */}
              <Card.Body>
                {/* Daftar penjual dan produk */}
                {Object.entries(group.sellers).map(([sellerKey, seller]) => (
                  <Card key={sellerKey} className="mb-4 seller-sub-card">
                    <Card.Header className="bg-light">
                      {/* Header penjual */}
                      <div className="d-flex align-items-center">
                         <img 
                          src={seller.sellerInfo.image} 
                          alt={seller.sellerInfo.name}
                          className="seller-avatar me-3"
                        />
                        <div>
                          <h5 className="mb-0">{seller.sellerInfo.name}</h5>
                          <small className="text-muted">ID Seller: {seller.sellerInfo.id}</small>
                        </div>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={12}> {/* Kolom diperlebar ke 12 */}
                          <div className="product-list">
                            {seller.items.map((item, itemIndex) => (
                              // Daftar produk tetap sama
                              <div key={itemIndex} className="product-item mb-4">
                                <Row className="g-3 align-items-center">
                                  <Col xs={3}>
                                    <img
                                      src={item.image_url}
                                      alt={item.name}
                                      className="img-fluid rounded product-image"
                                    />
                                  </Col>
                                  <Col xs={9}>
                                    <div className="d-flex justify-content-between align-items-start">
                                      <div>
                                        <h6 className="mb-1">{item.name}</h6>
                                        <p className="text-muted small mb-2">{item.description}</p>
                                      </div>
                                      <Badge bg="info" className="ms-2">
                                        Stok: {item.stock}
                                      </Badge>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div>
                                        <span className="text-primary fw-bold me-2">
                                          Rp{item.price.toLocaleString()}
                                        </span>
                                        <span className="text-muted">
                                          x{item.quantity}
                                        </span>
                                      </div>
                                      <span className="text-success fw-bold">
                                        Rp{(item.price * item.quantity).toLocaleString()}
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}

                {/* Bagian pengiriman dan pembayaran dipindah ke sini */}
                <Row className="mt-4">
                  <Col md={8}></Col>
                  <Col md={4}>
                    <div className="order-summary ps-md-3 border-start-md">
                      <div className="shipping-info mb-4">
                        <h5 className="section-title">
                          <i className="bi bi-truck me-2"></i>
                          Pengiriman
                        </h5>
                        <ul className="list-unstyled">
                          <li className="mb-2">
                            <i className="bi bi-geo-alt me-2"></i>
                            {group.shippingInfo.address}
                          </li>
                          <li className="mb-2">
                            <i className="bi bi-currency-dollar me-2"></i>
                            Biaya: Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}
                          </li>
                          <li>
                            <i className="bi bi-signpost me-2"></i>
                            Jarak: {group.shippingInfo.distance} meter
                          </li>
                        </ul>
                      </div>

                      <div className="payment-summary bg-light p-3 rounded">
  <h5 className="section-title">
    <i className="bi bi-credit-card me-2"></i>
    Ringkasan Pembayaran
  </h5>
  <div className="d-flex justify-content-between mb-2">
    <span>Subtotal:</span>
    <span>Rp{group.subtotal.toLocaleString()}</span>
  </div>
  <div className="d-flex justify-content-between mb-3">
    <span>Pengiriman:</span>
    <span>Rp{parseFloat(group.shippingInfo.shipping_cost).toLocaleString()}</span>
  </div>
  <div className="d-flex justify-content-between fw-bold border-top pt-2">
    <span>Total:</span>
    <span className="text-success">
      {/* Jumlahkan dulu baru konversi ke string */}
      Rp{(group.subtotal + parseFloat(group.shippingInfo.shipping_cost)).toLocaleString()}
    </span>
  </div>
</div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              </Card>
            )
          })
        ) : (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Memuat data pesanan...</p>
          </div>
        )}

        {/* Tambahkan Modal1 dengan props yang benar */}
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