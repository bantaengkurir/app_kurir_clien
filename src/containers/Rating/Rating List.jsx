// import React, { useEffect, useState } from "react";
// import { Rate } from "antd";
// import { Container, Card, Form, Button, Row, Col, Badge, Spinner } from "react-bootstrap";
// import useProductStore from "../../store/useProductStore";
// import { format, isValid } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { id } from "date-fns/locale";
// import { ShoppingBagIcon } from "lucide-react";


// const ProductRating = () => {
//   const [review, setReview] = useState("");
//   const [sellerRating, setSellerRating] = useState(0);
//   const [productRating, setProductRating] = useState(0);
//   const [shippingRating, setShippingRating] = useState(0);
//   const [courierRating, setCourierRating] = useState(0);
//   const { fetchRatProduct, fetchRatCourier, productRatings, courierRatings } = useProductStore();
//   const { fetchOrder, orders = [], fetchPayment, fetchHistoriesById } = useProductStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchRatProduct();
//     fetchRatCourier();
//     fetchOrder();
//     fetchPayment();
//     fetchHistoriesById();
//   }, [fetchRatProduct, fetchRatCourier, fetchOrder, fetchPayment, fetchHistoriesById]);

//   // Filter orders yang memiliki rating di productRatings atau courierRatings
//   const filteredOrders = orders.filter(order => {
//     const hasProductRating = productRatings.some(rating => rating.order_id === order.order_id);
//     const hasCourierRating = courierRatings.some(rating => rating.order_id === order.order_id);
//     return hasProductRating || hasCourierRating;
//   });


//   console.log("filteredOrders", filteredOrders);

//   const safeFormatDate = (date, dateFormat, locale) => {
//     if (!date || !isValid(new Date(date))) return 'Tanggal tidak valid';
//     return format(new Date(date), dateFormat, { locale });
//   };

//   const groupItemsBySeller = (items) => {
//     return items.reduce((acc, item) => {
//       const sellerId = item.seller_id;
//       if (!acc[sellerId]) {
//         acc[sellerId] = {
//           sellerInfo: {
//             id: sellerId,
//             name: item.seller_name,
//             address: item.seller_address,
//             image: item.seller_profile_image
//           },
//           items: []
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
//       return sum + (price * quantity);
//     }, 0);
//     const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;
//     return { subtotal, shipping, total: subtotal + shipping };
//   };

//   // Fungsi untuk mengelompokkan order berdasarkan tanggal dan waktu
//   const groupOrdersByDateTime = (orders) => {
//     return orders.reduce((acc, order) => {
//       const orderDate = new Date(order.order_date);
//       if (!isValid(orderDate)) return acc;
      
//       // Format tanggal sebagai kunci grup: 'YYYY-MM-DD HH:mm:ss'
//       const dateTimeKey = format(orderDate, 'yyyy-MM-dd HH:mm:ss', { locale: id });
      
//       if (!acc[dateTimeKey]) {
//         acc[dateTimeKey] = [];
//       }
//       acc[dateTimeKey].push(order);
//       return acc;
//     }, {});
//   };

//   return (
//     <Container className="my-4">
//       <Card>
//         <Card.Body>
//           <h4 className="mb-4">Nilai Produk</h4>
//           <div className="alert alert-warning mb-4">
//             ➤ Nilai Produk dan Kurir agar dapat memantau kualitas layanan kami
//           </div>
//           {!orders.length ? (
//             <div className="text-center mt-5">
//               <Spinner animation="border" variant="primary" />
//               <p className="mt-3">Memuat data pesanan...</p>
//             </div>
//           ) : filteredOrders.length > 0 ? (
//             Object.entries(groupOrdersByDateTime(filteredOrders)).map(([dateKey, ordersInGroup]) => (
//               <div key={dateKey} className="datetime-group mb-5">
//                 <div className="datetime-header bg-light p-3 rounded-top">
//                   <h5 className="mb-0">
//                     {safeFormatDate(
//                       ordersInGroup[0].order_date, 
//                       "d MMMM yyyy, HH:mm:ss", 
//                       id
//                     )}
//                   </h5>
//                 </div>
                
//                 {ordersInGroup.map(order => {
//                   const groupedSellers = groupItemsBySeller(order.items);
//                   const orderSummary = getOrderSummary(order);

//                   return (
//                     <button
//                       key={order.order_id}
//                       onClick={() => navigate(`/rating/${order.order_id}/product&kurir`)}
//                       className="order-card w-100 text-start border-0 bg-transparent p-0"
//                     >
//                       <Card className="rounded-0 rounded-bottom mb-4">
//                         {Object.values(groupedSellers).map(seller => (
//                           <div key={seller.sellerInfo.id}>
//                             {/* Seller Card */}
//                             <Card className="mb-3 border-0">
//                               <Card.Header className="bg-light">
//                                 <div className="d-flex align-items-center">
//                                   <img
//                                     src={seller.sellerInfo.image}
//                                     alt={seller.sellerInfo.name}
//                                     className="rounded-circle me-2"
//                                     style={{ width: '30px', height: '30px' }}
//                                   />
//                                   <h5 className="mb-0">{seller.sellerInfo.name}</h5>
//                                 </div>
//                               </Card.Header>

//                               {/* Product Items */}
//                               {seller.items.map((item) => (
//                                 <div key={item.variant_id} className="product-item border-0 p-3">
//                                   <Row className="align-items-center lh-1">
//                                     <Col xs={3}>
//                                       <img
//                                         src={item.img_url}
//                                         alt={item.name}
//                                         className="img-fluid rounded product-image"
//                                       />
//                                     </Col>
//                                     <Col xs={9}>
//                                       <h6>{item.name}</h6>
//                                       <div className="text-muted">
//                                         {item.product_description?.ength > 45
//                                           ? `${item.product_description.slice(0, 45)}...`
//                                           : item.product_description}
//                                       </div>
//                                       <div className="mt-2">
//                                         <Badge bg="secondary">
//                                           {item.quantity} x Rp{parseFloat(item.price).toLocaleString('id-ID')}
//                                         </Badge>
//                                       </div>
//                                     </Col>
//                                   </Row>
//                                 </div>
//                               ))}
//                             </Card>
//                           </div>
//                         ))}
                        
//                         {/* Order Summary */}
//                         <div className="p-3 border-top">
//                           <Row className="text-end">
//                             <Col>
//                               <p className="mb-1">
//                                 Total Pesanan: Rp{orderSummary.total.toLocaleString('id-ID')}
//                                 <span className="text-muted ms-2">
//                                   (Termasuk ongkos kirim Rp{orderSummary.shipping.toLocaleString('id-ID')})
//                                 </span>
//                               </p>
//                             </Col>
//                           </Row>
//                         </div>
//                       </Card>
//                     </button>
//                   );
//                 })}
//               </div>
//             ))
//           ) : (
//             <div className="alert alert-info mt-4">
//               Tidak ada pesanan dengan rating yang tersedia.
//             </div>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );

//   // return (
//   //   <Container className="my-4">
//   //     <Card>
//   //       <Card.Body>
//   //         <h4 className="mb-4">Nilai Produk</h4>
//   //         <div className="alert alert-warning mb-4">
//   //           ➤ Nilai untuk mendapatkan s/d 25 Koin Koin Shopee!
//   //         </div>
//   //         {!orders.length ? (
//   //           <div className="text-center mt-5">
//   //             <Spinner animation="border" variant="primary" />
//   //             <p className="mt-3">Memuat data pesanan...</p>
//   //           </div>
//   //         ) : filteredOrders.length > 0 ? (
//   //           filteredOrders.map(order => {
//   //             const groupedSellers = groupItemsBySeller(order.items);

//   //             return (
//   //               <button
//   //                 key={order.order_id}
//   //                 onClick={() => navigate(`/rating/${order.order_id}/product&kurir`)}
//   //                 className="order-card w-100 text-start border-0 bg-transparent p-0"
//   //               >
//   //                 <Row className="mb-4">
//   //                   {Object.values(groupedSellers).map(seller => (
//   //                     <Card key={seller.sellerInfo.id} className="mb-4 seller-card">
//   //                       <Card.Header className="bg-light">
//   //                         <div className="d-flex align-items-center">
//   //                           <ShoppingBagIcon size={24} />
//   //                           <div className="ms-3">
//   //                             <h5 className="mb-0">{seller.sellerInfo.name}</h5>
//   //                           </div>
//   //                         </div>
//   //                       </Card.Header>
//   //                       {seller.items.slice(0, 1).map((item) => (
//   //                         <div key={item.product_id} className="product-item border-0">
//   //                           <Row className="align-items-center lh-1">
//   //                             <Col xs={3}>
//   //                               <img
//   //                                 src={item.image_url}
//   //                                 alt={item.name}
//   //                                 className="img-fluid rounded product-image"
//   //                               />
//   //                             </Col>
//   //                             <Col xs={9}>
//   //                               <h6>{item.name}</h6>
//   //                               <div className="d-flex justify-content-between">
//   //                                 <span>
//   //                                   {item.description.length > 45
//   //                                     ? `${item.description.slice(0, 45)}...`
//   //                                     : item.description
//   //                                   }
//   //                                 </span>
//   //                               </div>
//   //                             </Col>
//   //                           </Row>
//   //                         </div>
//   //                       ))}
//   //                     </Card>
//   //                   ))}
//   //                 </Row>
//   //               </button>
//   //             );
//   //           })
//   //         ) : (
//   //           <div className="alert alert-info mt-4">
//   //             Tidak ada pesanan dengan rating yang tersedia.
//   //           </div>
//   //         )}
//   //       </Card.Body>
//   //     </Card>
//   //   </Container>
//   // );
// };

// export default ProductRating;






// // import React, { useEffect, useState } from "react";
// // import { Rate } from "antd";
// // import { Container, Card, Form, Button, Row, Col, Badge, Spinner, Tabs, Tab } from "react-bootstrap";
// // import useProductStore from "../../store/useProductStore";
// // import { format, isValid } from "date-fns";
// // import { useNavigate } from "react-router-dom";
// // import { id } from "date-fns/locale";
// // import { ShoppingBagIcon } from "lucide-react";

// // import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
// // import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle"
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // const ProductRating = () => {
// //   const [review, setReview] = useState("");
// //   const [sellerRating, setSellerRating] = useState(0);
// //   const [productRating, setProductRating] = useState(0);
// //   const [shippingRating, setShippingRating] = useState(0);
// //   const [courierRating, setCourierRating] = useState(0);
// //   const [activeTab, setActiveTab] = useState("unrated"); // State untuk aktif tab

// //   const {
// //     fetchRatProduct,
// //     fetchRatCourier,
// //     productRatings,
// //     courierRatings,
// //     fetchOrder,
// //     orders = [],
// //     fetchPayment,
// //     fetchHistoriesById,
// //   } = useProductStore();

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchRatProduct();
// //     fetchRatCourier();
// //     fetchOrder();
// //     fetchPayment();
// //     fetchHistoriesById();
// //   }, [fetchRatProduct, fetchRatCourier, fetchOrder, fetchPayment, fetchHistoriesById]);

// //   // Filter orders yang memiliki rating di productRatings atau courierRatings
// //   const filteredOrders = orders.filter((order) => {
// //     const hasProductRating = productRatings.some((rating) => rating.order_id === order.order_id);
// //     const hasCourierRating = courierRatings.some((rating) => rating.order_id === order.order_id);
// //     return hasProductRating || hasCourierRating;
// //   });

// //   // Filter orders yang belum dinilai
// //   const unratedOrders = orders.filter((order) => {
// //     const hasProductRating = productRatings.some((rating) => rating.order_id === order.order_id);
// //     const hasCourierRating = courierRatings.some((rating) => rating.order_id === order.order_id);
// //     return !hasProductRating && !hasCourierRating;
// //   });

// //   console.log("Orders:", orders);
// //   console.log("Filtered Orders (Rated):", filteredOrders);
// //   console.log("Unrated Orders:", unratedOrders);

// //   const safeFormatDate = (date, dateFormat, locale) => {
// //     if (!date || !isValid(new Date(date))) return "Tanggal tidak valid";
// //     return format(new Date(date), dateFormat, { locale });
// //   };

// //   const groupItemsBySeller = (items) => {
// //     return items.reduce((acc, item) => {
// //       const sellerId = item.seller_id;
// //       if (!acc[sellerId]) {
// //         acc[sellerId] = {
// //           sellerInfo: {
// //             id: sellerId,
// //             name: item.seller_name,
// //             address: item.seller_address,
// //             image: item.seller_profile_image,
// //           },
// //           items: [],
// //         };
// //       }
// //       acc[sellerId].items.push(item);
// //       return acc;
// //     }, {});
// //   };

// //   const getOrderSummary = (order) => {
// //     const items = order.items || [];
// //     const subtotal = items.reduce((sum, item) => {
// //       const price = parseFloat(item.price);
// //       const quantity = parseFloat(item.quantity);
// //       return sum + price * quantity;
// //     }, 0);
// //     const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;
// //     return { subtotal, shipping, total: subtotal + shipping };
// //   };

// //   const groupOrdersByDateTime = (orders) => {
// //     return orders.reduce((acc, order) => {
// //       const orderDate = new Date(order.order_date);
// //       if (!isValid(orderDate)) return acc;

// //       const dateTimeKey = format(orderDate, "yyyy-MM-dd HH:mm:ss", { locale: id });

// //       if (!acc[dateTimeKey]) {
// //         acc[dateTimeKey] = [];
// //       }
// //       acc[dateTimeKey].push(order);
// //       return acc;
// //     }, {});
// //   };

// //   return (
// //     <Container className="my-4">
// //       {/* <Card> */}
// //         <Card.Body>
// //           <h4 className="mb-4">Nilai Produk</h4>
// //           <div className="alert alert-warning mb-4">
// //             ➤ Nilai untuk mendapatkan s/d 25 Koin Koin Shopee!
// //           </div>

// //           {/* Tabs untuk Belum Dinilai dan Penilaian Saya */}
// //           <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
// //             <Tab eventKey="unrated" title="Belum Dinilai">
// //               <div className="mt-4">
// //                 {!orders.length ? (
// //                   <div className="text-center mt-5">
// //                     <Spinner animation="border" variant="primary" />
// //                     <p className="mt-3">Memuat data pesanan...</p>
// //                   </div>
// //                 ) : unratedOrders.length > 0 ? (
// //                   Object.entries(groupOrdersByDateTime(unratedOrders)).map(([dateKey, ordersInGroup]) => (
// //                     <div key={dateKey} className="datetime-group mb-5">
// //                       <div className="datetime-header bg-light p-3 rounded-top">
// //                         <h5 className="mb-0">
// //                           {safeFormatDate(ordersInGroup[0].order_date, "d MMMM yyyy, HH:mm:ss", id)}
// //                         </h5>
// //                       </div>

// //                       {ordersInGroup.map((order) => {
// //                         const groupedSellers = groupItemsBySeller(order.items);
// //                         const orderSummary = getOrderSummary(order);

// //                         return (
// //                           <button
// //                             key={order.order_id}
// //                             onClick={() => navigate(`/rating/${order.order_id}/product&kurir`)}
// //                             className="order-card w-100 text-start border-0 bg-transparent p-0"
// //                           >
// //                             <Card className="rounded-0 rounded-bottom mb-4">
// //                               {Object.values(groupedSellers).map((seller) => (
// //                                 <div key={seller.sellerInfo.id}>
// //                                   {/* Seller Card */}
// //                                   <Card className="mb-3 border-0">
// //                                     <Card.Header className="bg-light">
// //                                       <div className="d-flex align-items-center">
// //                                         <img
// //                                           src={seller.sellerInfo.image}
// //                                           alt={seller.sellerInfo.name}
// //                                           className="rounded-circle me-2"
// //                                           style={{ width: "30px", height: "30px" }}
// //                                         />
// //                                         <h5 className="mb-0">{seller.sellerInfo.name}</h5>
// //                                       </div>
// //                                     </Card.Header>

// //                                     {/* Product Items */}
// //                                     {seller.items.map((item) => (
// //                                       <div key={item.product_id} className="product-item border-0 p-3">
// //                                         <Row className="align-items-center lh-1">
// //                                           <Col xs={3}>
// //                                             <img
// //                                               src={item.image_url}
// //                                               alt={item.name}
// //                                               className="img-fluid rounded product-image"
// //                                             />
// //                                           </Col>
// //                                           <Col xs={9}>
// //                                             <h6>{item.name}</h6>
// //                                             <div className="text-muted">
// //                                               {item.description.length > 45
// //                                                 ? `${item.description.slice(0, 45)}...`
// //                                                 : item.description}
// //                                             </div>
// //                                             <div className="mt-2">
// //                                               <Badge bg="secondary">
// //                                                 {item.quantity} x Rp{parseFloat(item.price).toLocaleString("id-ID")}
// //                                               </Badge>
// //                                             </div>
// //                                           </Col>
// //                                         </Row>
// //                                       </div>
// //                                     ))}
// //                                   </Card>
// //                                 </div>
// //                               ))}

// //                               {/* Order Summary */}
// //                               <div className="p-3 border-top">
// //                                 <Row className="text-end">
// //                                   <Col>
// //                                     <p className="mb-1">
// //                                       Total Pesanan: Rp{orderSummary.total.toLocaleString("id-ID")}
// //                                       <span className="text-muted ms-2">
// //                                         (Termasuk ongkos kirim Rp{orderSummary.shipping.toLocaleString("id-ID")})
// //                                       </span>
// //                                     </p>
// //                                   </Col>
// //                                 </Row>
// //                               </div>
// //                             </Card>
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="alert alert-info mt-4">
// //                     Tidak ada pesanan yang belum dinilai.
// //                   </div>
// //                 )}
// //               </div>
// //             </Tab>

// //             <Tab eventKey="rated" title="Penilaian Saya">
// //               <div className="mt-4">
// //                 {!orders.length ? (
// //                   <div className="text-center mt-5">
// //                     <Spinner animation="border" variant="primary" />
// //                     <p className="mt-3">Memuat data pesanan...</p>
// //                   </div>
// //                 ) : filteredOrders.length > 0 ? (
// //                   Object.entries(groupOrdersByDateTime(filteredOrders)).map(([dateKey, ordersInGroup]) => (
// //                     <div key={dateKey} className="datetime-group mb-5">
// //                       <div className="datetime-header bg-light p-3 rounded-top">
// //                         <h5 className="mb-0">
// //                           {safeFormatDate(ordersInGroup[0].order_date, "d MMMM yyyy, HH:mm:ss", id)}
// //                         </h5>
// //                       </div>

// //                       {ordersInGroup.map((order) => {
// //                         const groupedSellers = groupItemsBySeller(order.items);
// //                         const orderSummary = getOrderSummary(order);

// //                         return (
// //                           <button
// //                             key={order.order_id}
// //                             onClick={() => navigate(`/rating/${order.order_id}/product&kurir`)}
// //                             className="order-card w-100 text-start border-0 bg-transparent p-0"
// //                           >
// //                             <Card className="rounded-0 rounded-bottom mb-4">
// //                               {Object.values(groupedSellers).map((seller) => (
// //                                 <div key={seller.sellerInfo.id}>
// //                                   {/* Seller Card */}
// //                                   <Card className="mb-3 border-0">
// //                                     <Card.Header className="bg-light">
// //                                       <div className="d-flex align-items-center">
// //                                         <img
// //                                           src={seller.sellerInfo.image}
// //                                           alt={seller.sellerInfo.name}
// //                                           className="rounded-circle me-2"
// //                                           style={{ width: "30px", height: "30px" }}
// //                                         />
// //                                         <h5 className="mb-0">{seller.sellerInfo.name}</h5>
// //                                       </div>
// //                                     </Card.Header>

// //                                     {/* Product Items */}
// //                                     {seller.items.map((item) => (
// //                                       <div key={item.product_id} className="product-item border-0 p-3">
// //                                         <Row className="align-items-center lh-1">
// //                                           <Col xs={3}>
// //                                             <img
// //                                               src={item.image_url}
// //                                               alt={item.name}
// //                                               className="img-fluid rounded product-image"
// //                                             />
// //                                           </Col>
// //                                           <Col xs={9}>
// //                                             <h6>{item.name}</h6>
// //                                             <div className="text-muted">
// //                                               {item.description.length > 45
// //                                                 ? `${item.description.slice(0, 45)}...`
// //                                                 : item.description}
// //                                             </div>
// //                                             <div className="mt-2">
// //                                               <Badge bg="secondary">
// //                                                 {item.quantity} x Rp{parseFloat(item.price).toLocaleString("id-ID")}
// //                                               </Badge>
// //                                             </div>
// //                                           </Col>
// //                                         </Row>
// //                                       </div>
// //                                     ))}
// //                                   </Card>
// //                                 </div>
// //                               ))}

// //                               {/* Order Summary */}
// //                               <div className="p-3 border-top">
// //                                 <Row className="text-end">
// //                                   <Col>
// //                                     <p className="mb-1">
// //                                       Total Pesanan: Rp{orderSummary.total.toLocaleString("id-ID")}
// //                                       <span className="text-muted ms-2">
// //                                         (Termasuk ongkos kirim Rp{orderSummary.shipping.toLocaleString("id-ID")})
// //                                       </span>
// //                                     </p>
// //                                   </Col>
// //                                 </Row>
// //                               </div>
// //                             </Card>
// //                           </button>
// //                         );
// //                       })}
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <div className="alert alert-info mt-4">
// //                     Belum ada penilaian yang diberikan.
// //                   </div>
// //                 )}
// //               </div>
// //             </Tab>
// //           </Tabs>
// //         </Card.Body>
// //       {/* </Card> */}
// //     </Container>
// //   );
// // };

// // export default ProductRating;


import React, { useEffect, useState, useMemo } from 'react';
import { Rate } from 'antd';
import useProductStore from '../../store/useProductStore';
import { format, isValid } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { id } from 'date-fns/locale';
import { ArrowLeft } from 'lucide-react';

const ProductRating = () => {
  const [activeTab, setActiveTab] = useState('unrated');
  const { 
    fetchRatProduct, 
    fetchRatCourier, 
    productRatings, 
    courierRatings 
  } = useProductStore();
  
  const { 
    fetchOrder, 
    orders = [], 
    fetchPayment, 
    fetchHistoriesById 
  } = useProductStore();
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchRatProduct();
    fetchRatCourier();
    fetchOrder();
    fetchPayment();
    fetchHistoriesById();
  }, [fetchRatProduct, fetchRatCourier, fetchOrder, fetchPayment, fetchHistoriesById]);

  // Filter orders that have ratings
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const hasProductRating = productRatings.some(rating => rating.order_id === order.order_id);
      const hasCourierRating = courierRatings.some(rating => rating.order_id === order.order_id);
      return hasProductRating || hasCourierRating;
    });
  }, [orders, productRatings, courierRatings]);

  // Separate orders into rated and unrated
  const { ratedOrders, unratedOrders } = useMemo(() => {
    const rated = [];
    const unrated = [];

    filteredOrders.forEach(order => {
      const productRating = productRatings.find(pr => pr.order_id === order.order_id);
      const courierRating = courierRatings.find(cr => cr.order_id === order.order_id);
      
      const isProductRated = productRating?.rating !== null && productRating?.rating !== undefined;
      const isCourierRated = courierRating?.rating !== null && courierRating?.rating !== undefined;
      
      if (isProductRated && isCourierRated) {
        rated.push(order);
      } else {
        unrated.push(order);
      }
    });

    return { ratedOrders: rated, unratedOrders: unrated };
  }, [filteredOrders, productRatings, courierRatings]);

  const safeFormatDate = (date, dateFormat, locale) => {
    if (!date || !isValid(new Date(date))) return 'Tanggal tidak valid';
    return format(new Date(date), dateFormat, { locale });
  };

  const renderOrderCard = (order) => {
    const orderSummary = order.items?.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return {
        subtotal: sum.subtotal + (price * quantity),
        shipping: sum.shipping + (parseFloat(order.shipping_cost?.[0]?.shipping_cost) || 0)
      };
    }, { subtotal: 0, shipping: 0 });

    return (
      <div 
        key={order.order_id}
        onClick={() => navigate(`/rating/${order.order_id}/product&kurir`)}
        className="w-full mb-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">
            {safeFormatDate(order.order_date, "d MMMM yyyy, HH:mm:ss", id)}
          </span>
          <span className="text-sm font-medium text-gray-700">
            Order ID: {order.order_id}
          </span>
        </div>

        {order.items?.map((item, index) => (
          <div key={`${item.variant_id}-${index}`} className="flex py-3 border-b border-gray-100 last:border-0">
            <img
              src={item.img_url || "https://via.placeholder.com/80"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="ml-3 flex-1">
              <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
              <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                {item.product_description || 'Tidak ada deskripsi'}
              </p>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-700">
                  {item.quantity} × Rp{parseFloat(item.price).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-700">
            <span>Subtotal:</span>
            <span>Rp{orderSummary.subtotal.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 mt-1">
            <span>Ongkos Kirim:</span>
            <span>Rp{orderSummary.shipping.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900 mt-2">
            <span>Total:</span>
            <span>Rp{(orderSummary.subtotal + orderSummary.shipping).toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <span className="flex text-xl font-bold text-gray-800 mb-4">
          <Link className='text-black' to="/orderhistories" > <ArrowLeft className="fw-bold me-3 mt-1"/></Link>
          Rating Produk</span>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6">
          <p className="text-yellow-700 text-sm">Nilai Produk dan Kurir untuk meningkatkan kualitas layanan kami</p>
        </div>

        {!orders.length ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-3"></div>
            <p className="text-gray-600">Memuat data pesanan...</p>
          </div>
        ) : (
          <div>
            {/* Custom Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'unrated' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('unrated')}
              >
                Belum Dinilai
              </button>
              <button
                className={`py-2 px-4 font-medium text-sm ${activeTab === 'rated' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('rated')}
              >
                Sudah Dinilai
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'unrated' ? (
                <div>
                  {unratedOrders.length > 0 ? (
                    unratedOrders.map(order => renderOrderCard(order)))
                  : (
                    <div className="bg-blue-50 text-blue-800 p-4 rounded text-sm">
                      Tidak ada pesanan yang belum dinilai
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {ratedOrders.length > 0 ? (
                    ratedOrders.map(order => renderOrderCard(order)))
                  : (
                    <div className="bg-blue-50 text-blue-800 p-4 rounded text-sm">
                      Tidak ada pesanan yang sudah dinilai
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRating;