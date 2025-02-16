// import { 
// 	Card, 
// 	Row, 
// 	Col, 
// 	Spinner, 
// 	Badge, 
// 	Button, 
// 	Tabs, 
// 	Tab 
//   } from "react-bootstrap";
//   import Navbar from "../../components/Navbar";
//   import useProductStore from "../../store/useProductStore";
//   import { useEffect, useRef, useState } from "react";
//   import "./style.css";
//   import { format, isValid } from 'date-fns';
//   import { id } from 'date-fns/locale';
//   import toast from "react-hot-toast";
//   import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
//   import 'leaflet/dist/leaflet.css';
//   import L from 'leaflet';
//   import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
//   import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
//   import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
//   import { RoutingMachine } from './RoutingMachine'; // Buat komponen ini
//   import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
//   import 'leaflet-rotatedmarker';

// import 'leaflet-rotatedmarker';
// import "../../assets/Leaflet.MovingMarker/MovingMarker";
  
//   // Fix leaflet marker icons
//   delete L.Icon.Default.prototype._getIconUrl;
//   L.Icon.Default.mergeOptions({
// 	iconRetinaUrl: markericon2x,
// 	iconUrl: markericon,
// 	shadowUrl: markericonshadow,
//   });
  
//   const StatusTabs = ({ activeTab, setActiveTab }) => {
// 	return (
// 	  <Tabs
// 		activeKey={activeTab}
// 		onSelect={(k) => setActiveTab(k)}
// 		className="mb-4 status-tabs"
// 		variant="pills"
// 	  >
// 		<Tab eventKey="pending" title="Pending" />
// 		<Tab eventKey="process" title="Dalam Proses" />
// 		<Tab eventKey="completed" title="Selesai" />
// 		<Tab eventKey="cancelled" title="Dibatalkan" />
// 	  </Tabs>
// 	);
//   };
  
// import WebSocketService from "../../utils/Websocet";
// import courierIcon from "../../assets/image/courier.png"; // Siapkan ikon motor
// import customerIcon from "../../assets/image/customer.png"; // Siapkan ikon motor
// import shopIcon from "../../assets/image/shop.png"; // Siapkan ikon motor
// import OrderTracking from "../Tracking/OrderTracking";
// import CourierTracking from "../Tracking/CourierTracking";
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import OrderHistories from "./OrderHistory";

// // Buat custom icon untuk kurir
// // const CourierIcon = L.icon({
// // 	iconUrl: courierIcon,
// // 	iconSize: [82, 82],
// // 	iconAnchor: [45, 62],
// // 	popupAnchor: [0, -32]
// //   });
// const CourierIcon = L.icon({
// 	iconUrl: courierIcon,
// 	iconSize: [82, 82],
// 	iconAnchor: [45, 62],
// 	popupAnchor: [0, -32],
// 	rotationOrigin: 'center center'
//   });
// const CustomerIcon = L.icon({
// 	iconUrl: customerIcon,
// 	iconSize: [82, 82],
// 	iconAnchor: [45, 62],
// 	popupAnchor: [0, -32]
//   });

//   const ShopIcon = L.icon({
// 	iconUrl: shopIcon,
// 	iconSize: [42, 42],
// 	iconAnchor: [22, 42],
// 	popupAnchor: [0, -32]
//   });

// // Komponen Marker Kurir dengan Animasi
// const AnimatedCourierMarker = ({ position, map, order }) => {
// 	const markerRef = useRef(null);
// 	const prevPositionRef = useRef(null);
  
// 	// Fungsi untuk menghitung arah
// 	const calculateBearing = (start, end) => {
// 	  const startLat = start.lat;
// 	  const startLng = start.lng;
// 	  const endLat = end.lat;
// 	  const endLng = end.lng;
  
// 	  const dLng = (endLng - startLng) * Math.PI / 180;
// 	  const lat1 = startLat * Math.PI / 180;
// 	  const lat2 = endLat * Math.PI / 180;
  
// 	  const y = Math.sin(dLng) * Math.cos(lat2);
// 	  const x = Math.cos(lat1) * Math.sin(lat2) -
// 				Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
// 	  let bearing = Math.atan2(y, x);
// 	  bearing = bearing * 180 / Math.PI;
// 	  bearing = (bearing + 360) % 360;
// 	  return bearing;
// 	};
  
// 	useEffect(() => {
// 	  if (map && position) {
// 		if (!markerRef.current) {
// 		  markerRef.current = L.Marker.movingMarker(
// 			[position],
// 			[5000], // Durasi animasi (ms)
// 			{
// 			  icon: CourierIcon,
// 			  autostart: true,
// 			  rotationAngle: 0
// 			}
// 		  ).addTo(map);
		  
// 		  // Tambahkan popup
// 		  markerRef.current.bindPopup(
// 			`<strong>Kurir</strong><br>${order.courier?.name}`
// 		  );
// 		} else {
// 		  const newPos = L.latLng(position);
// 		  const oldPos = prevPositionRef.current;
		  
// 		  if (oldPos && !newPos.equals(oldPos)) {
// 			// Hitung arah dan animasi
// 			const bearing = calculateBearing(oldPos, newPos);
// 			markerRef.current.setRotationAngle(bearing);
// 			markerRef.current.moveTo(newPos, 2000); // Durasi perpindahan (ms)
// 		  }
// 		  prevPositionRef.current = newPos;
// 		}
// 	  }
  
// 	  return () => {
// 		if (markerRef.current) {
// 		  markerRef.current.stop();
// 		  markerRef.current.remove();
// 		}
// 	  };
// 	}, [position, map, order]);
  
// 	return null;
//   };
  
//   const OrderMap = ({ order }) => {
// 	const [routes, setRoutes] = useState([]);
// 	const [map, setMap] = useState(null);
// 	const [courierPosition, setCourierPosition] = useState(null);
// 	const [customerPosition, setCustomerPosition] = useState(null);
// 	const [sellers, setSellers] = useState([]);
// 	const [routingControls, setRoutingControls] = useState([]);

//   console.log("ini seller", sellers)
// 	// Fungsi validasi koordinat
// 	const isValidCoordinate = (lat, lng) => {
// 	  return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
// 	};
  
// // 	// Setup WebSocket
// 	useEffect(() => {

// 		// Handler update posisi kurir
// 	const handleLocationUpdate = (data) => {
// 		if (isValidCoordinate(data.latitude, data.longitude)) {
// 		  setCourierPosition([data.latitude, data.longitude]);
// 		}
// 	  };
  

// 		if (order?.order_id) {
// 			WebSocketService.connect(order.order_id);
// 			WebSocketService.addCallback('location_update', handleLocationUpdate);
// 		  }
		
// 		  return () => {
// 			WebSocketService.removeCallback('location_update', handleLocationUpdate);
// 			// Jangan panggil disconnect() di sini agar tidak memutus koneksi global
// 		  };
// 	}, [order?.order_id]); // Hanya jalankan ulang jika order_id berubah
  
// 	  // Setup WebSocket
// 	  useEffect(() => {
// 		let animationFrameId;
// 		const smoothTransition = (newPos) => {
// 		  setCourierPosition(prev => {
// 			if (!prev) return newPos;
// 			const step = 0.1; // Kehalusan animasi
// 			return [
// 			  prev[0] + (newPos[0] - prev[0]) * step,
// 			  prev[1] + (newPos[1] - prev[1]) * step
// 			];
// 		  });
// 		  animationFrameId = requestAnimationFrame(() => smoothTransition(newPos));
// 		};
	
// 		const handleLocationUpdate = (data) => {
// 		  if (isValidCoordinate(data.latitude, data.longitude)) {
// 			cancelAnimationFrame(animationFrameId);
// 			smoothTransition([data.latitude, data.longitude]);
// 		  }
// 		};
	
// 		if (order?.order_id) {
// 		  WebSocketService.connect(order.order_id);
// 		  WebSocketService.addCallback('location_update', handleLocationUpdate);
// 		}
	
// 		return () => {
// 		  WebSocketService.removeCallback('location_update', handleLocationUpdate);
// 		  cancelAnimationFrame(animationFrameId);
// 		};
// 	  }, [order?.order_id]);
	
	  
	
  
// 	// Inisialisasi posisi awal
// 	useEffect(() => {
// 	  if (order) {
// 		// Customer position
// 		const custLat = parseFloat(order.shipping_cost[0]?.latitude);
// 		const custLng = parseFloat(order.shipping_cost[0]?.longitude);
// 		if (isValidCoordinate(custLat, custLng)) {
// 		  setCustomerPosition([custLat, custLng]);
// 		}


// 		// Courier position
// 		const courLat = parseFloat(order.courier?.latitude);
// 		const courLng = parseFloat(order.courier?.longitude);
// 		if (isValidCoordinate(courLat, courLng)) {
// 		  setCourierPosition([courLat, courLng]);
// 		}
  
// 		// Seller positions
// 		const validSellers = order.items.reduce((acc, item) => {
// 		  const lat = parseFloat(item.seller_latitude);
// 		  const lng = parseFloat(item.seller_longitude);
// 		  if (isValidCoordinate(lat, lng)) {
// 			acc.push({
// 			  position: [lat, lng],
// 			  name: item.seller_name,
// 			  address: item.seller_address
// 			});
// 		  }
// 		  return acc;
// 		}, []);
// 		setSellers(validSellers);
// 	  }
// 	}, [order]);
  
// 	// // Update rute saat posisi berubah
// 	// useEffect(() => {
// 	//   if (map && courierPosition && customerPosition) {
// 	// 	// Hapus rute sebelumnya
// 	// 	routingControls.forEach(control => map.removeControl(control));
		
// 	// 	const newRoutingControls = [];
  
// 	// 	// Rute dari kurir ke customer
// 	// 	const toCustomer = L.Routing.control({
// 	// 	  waypoints: [
// 	// 		L.latLng(...courierPosition),
// 	// 		L.latLng(...customerPosition)
// 	// 	  ],
// 	// 	  lineOptions: {
// 	// 		styles: [{color: 'green', opacity: 0.7, weight: 5}]
// 	// 	  },
// 	// 	  show: false,
// 	// 	  addWaypoints: false
// 	// 	}).addTo(map);
// 	// 	newRoutingControls.push(toCustomer);
  
// 	// 	// Rute dari seller ke kurir
// 	// 	sellers.forEach(seller => {
// 	// 	  const route = L.Routing.control({
// 	// 		waypoints: [
// 	// 		  L.latLng(...seller.position),
// 	// 		  L.latLng(...courierPosition)
// 	// 		],
// 	// 		lineOptions: {
// 	// 		  styles: [{color: 'blue', opacity: 0.7, weight: 5}]
// 	// 		},
// 	// 		show: false,
// 	// 		addWaypoints: false
// 	// 	  }).addTo(map);
// 	// 	  newRoutingControls.push(route);
// 	// 	});
  
// 	// 	setRoutingControls(newRoutingControls);
// 	//   }
// 	// }, [courierPosition, customerPosition, map]);
//   // Update rute saat posisi berubah
// useEffect(() => {
// 	if (map && courierPosition && customerPosition) {
// 	  // Hapus rute sebelumnya
// 	  routingControls.forEach(control => map.removeControl(control));
	  
// 	  const newRoutingControls = [];
  
// 	  // Warna hijau untuk semua rute
// 	  const greenRouteStyle = {
// 		color: '#4CAF50', // Warna hijau lebih modern
// 		opacity: 0.8,
// 		weight: 20,
// 		dashArray: '10, 10' // Tambahkan garis putus untuk membedakan arah
// 	  };
  
// 	  // Rute dari kurir ke customer
// 	  const toCustomer = L.Routing.control({
// 		waypoints: [
// 		  L.latLng(...courierPosition),
// 		  L.latLng(...customerPosition)
// 		],
// 		lineOptions: {
// 		  styles: [greenRouteStyle]
// 		},
// 		show: false,
// 		addWaypoints: false,
// 		createMarker: () => null // Hilangkan marker default
// 	  }).addTo(map);
// 	  newRoutingControls.push(toCustomer);

// 	  // Rute dari seller ke kurir
// 	//   sellers.forEach(seller => {
// 	// 	const route = L.Routing.control({
// 	// 	  waypoints: [
// 	// 		L.latLng(...seller.position),
// 	// 		L.latLng(...courierPosition)
// 	// 	  ],
// 	// 	  lineOptions: {
// 	// 		styles: [greenRouteStyle]
// 	// 	  },
// 	// 	  show: false,
// 	// 	  addWaypoints: false,
// 	// 	  createMarker: () => null
// 	// 	}).addTo(map);
// 	// 	newRoutingControls.push(route);
// 	//   });
	  
  
// 	  setRoutingControls(newRoutingControls);
// 	}
//   }, [courierPosition, customerPosition, map]);

//   const LeafletRoutingMachine = ({ position, destination, color }) => {
// 	const map = useMap();
  
// 	useEffect(() => {
// 	  if (!position || !destination) return;
  
// 	  const routingControl = L.Routing.control({
// 		waypoints: [
// 		  L.latLng(position[0], position[1]),
// 		  L.latLng(destination[0], destination[1])
// 		],
// 		lineOptions: {
// 		  styles: [{ 
// 			color: color,
// 			opacity: 0.8,
// 			weight: 5,
// 			dashArray: '5,5'
// 		  }]
// 		},
// 		show: false,
// 		addWaypoints: false,
// 		createMarker: () => null
// 	  }).addTo(map);
  
// 	  return () => map.removeControl(routingControl);
// 	}, [map, position, destination, color]);
  
// 	return null;
//   };

// // return (
// //     <Card className="mb-4 map-card">
// //       <Card.Header className="bg-primary text-white">
// //         Pelacakan Pengiriman Real-time
// //       </Card.Header>
// //       <Card.Body style={{ height: "500px" }}>
// //         <MapContainer
// //           center={courierPosition || [-6.1754, 106.8272]}
// //           zoom={13}
// //           scrollWheelZoom={false}
// //           style={{ height: "100%", width: "100%" }}
// //           whenCreated={setMap}
// //         >
// //           <TileLayer
// //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //           />

// //           {/* Marker Customer */}
// //           {customerPosition && (
// //             <Marker position={customerPosition} icon={CustomerIcon}>
// //               <Popup>
// //                 <div>
// //                   <strong>Lokasi Pelanggan</strong>
// //                   <br />
// //                   {order.shipping_cost[0]?.address}
// //                 </div>
// //               </Popup>
// //             </Marker>
// //           )}

// //           {/* Marker Kurir dengan Animasi */}
// //           {courierPosition && (
// //             <AnimatedCourierMarker position={courierPosition} map={map} order={order} />
// //           )}

// //           {/* Marker Penjual */}
// //           {sellers.map((seller, idx) => (
// //             <Marker key={idx} position={seller.position} icon={ShopIcon}>
// //               <Popup>
// //                 <div>
// //                   <strong>Penjual: {seller.name}</strong>
// //                   <br />
// //                   {seller.address}
// //                 </div>
// //               </Popup>
// //             </Marker>
// //           ))}
// //         </MapContainer>
// //       </Card.Body>
// //     </Card>
// //   );


// 	return (
// 	  <Card className="mb-4 map-card">
// 		<Card.Header className="bg-primary text-white">
// 		  Pelacakan Pengiriman Real-time
// 		</Card.Header>
// 		<Card.Body style={{ height: "500px" }}>
// 		  <MapContainer
// 			center={courierPosition || [-6.1754, 106.8272]}
// 			zoom={13}
// 			scrollWheelZoom={false}
// 			style={{ height: "100%", width: "100%" }}
// 			whenCreated={setMap}
// 		  >

// <LeafletRoutingMachine 
//     position={courierPosition} 
//     destination={customerPosition} 
//     color="#4CAF50"
//   />
// 			<TileLayer
// 			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 			/>
  
// 			{/* Marker Customer */}
// 			{customerPosition && (
// 			  <Marker position={customerPosition}
// 			  icon={CustomerIcon}
// 			  >
// 				<Popup>
// 				  <div>
// 					<strong>Lokasi Pelanggan</strong>
// 					<br />
// 					{order.shipping_cost[0]?.address}
// 				  </div>
// 				</Popup>
// 			  </Marker>
// 			)}
// {/* Marker Kurir dengan Animasi */}
// {/* {courierPosition && (
// 	<AnimatedCourierMarker position={courierPosition} map={map} order={order} />
//   )}
//    */}
//  			{/* Marker Kurir dengan ikon motor */}
//  			{courierPosition && (
// 				<>
// 					<AnimatedCourierMarker position={courierPosition} map={map} order={order} icon={courierIcon}
				
// 					/>
// 			  <Marker 
// 				position={courierPosition}
// 				icon={CourierIcon}
// 			  >
			
// 				<Popup>
// 				  <div>
// 					<strong>Kurir</strong>
// 					<br />
// 					{order.courier?.name}
// 					<br />
// 					{order.courier?.phone_number}
// 				  </div>
// 				</Popup>
// 			  </Marker>
// 			  </>
// 			)}
  
// 			{/* Marker Penjual */}
// 			{sellers.map((seller, idx) => (
// 			  <Marker key={idx} position={seller.position}			  
// 				icon={ShopIcon}
// 			  >
// 				<Popup>
// 				  <div>
// 					<strong>Penjual: {seller.name}</strong>
// 					<br />
// 					{seller.address}
// 				  </div>
// 				</Popup>
// 			  </Marker>
// 			))}
// 		  </MapContainer>
// 		</Card.Body>
// 	  </Card>
// 	);
//   };
  


//   const safeFormatDate = (date, dateFormat, locale) => {
// 	if (!date || !isValid(new Date(date))) return 'Tanggal tidak valid';
// 	return format(new Date(date), dateFormat, { locale });
//   };
  

//   const Index = () => {
// 	const [activeTab, setActiveTab] = useState('pending');
// 	const [selectedOrder, setSelectedOrder] = useState(null);
// 	const { fetchOrder, orders = [], fetchPayment, fetchHistoriesById } = useProductStore();
// 	const currentUser = useProductStore((state) => state.currentUser); // Asumsikan currentUser 
  
// 	useEffect(() => {
// 		  const loadData = async () => {
//             try {
//                 await fetchOrder();
//                 await fetchPayment();
//                 await fetchHistoriesById();

//                 WebSocketService.addCallback('status_update', (data) => {
//                     useProductStore.setState(state => ({
//                         orders: state.orders.map(order =>
//                             order.order_id === data.order_id ? { ...order, status: data.status } : order
//                         )
//                     }));
//                 });
//             } catch (error) {
//                 toast.error("Gagal memuat data");
//             }
//         };
//         loadData();

//         WebSocketService.addCallback('status_update', loadData);

//   return () => {
//     WebSocketService.removeCallback('status_update', loadData);
//   };
//     }, [fetchOrder, fetchPayment, fetchHistoriesById]);

//     // Tentukan apakah pengguna adalah kurir atau customer
//     const isCourier = currentUser?.role === "courier";
  
// 	const filteredOrders = orders.filter(order => 
// 	  order.payment_status?.toLowerCase() === activeTab.toLowerCase()
// 	);

  
// 	const groupItemsBySeller = (items) => {
// 	  return items.reduce((acc, item) => {
// 		const sellerId = item.seller_id;
// 		if (!acc[sellerId]) {
// 		  acc[sellerId] = {
// 			sellerInfo: {
// 			  id: sellerId,
// 			  name: item.seller_name,
// 			  address: item.seller_address,
// 			  image: item.seller_profile_image
// 			},
// 			items: []
// 		  };
// 		}
// 		acc[sellerId].items.push(item);
// 		return acc;
// 	  }, {});
// 	};
  
// 	const getOrderSummary = (order) => {
// 		const items = order.items || [];
		
// 		// Pastikan item.price dan item.quantity adalah angka
// 		const subtotal = items.reduce((sum, item) => {
// 		  const price = parseFloat(item.price);
// 		  const quantity = parseFloat(item.quantity);
// 		  return sum + (price * quantity);
// 		}, 0);
	  
// 		// Pastikan shipping_cost adalah angka
// 		const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;
	  
// 		// Kembalikan hasil sebagai angka
// 		return { subtotal, shipping, total: subtotal + shipping };
// 	  };
  
// 	return (
// 	  <>
// 		<Navbar />
// 		<div className="container-fluid py-4 orders-container">
// 		  <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>
		  
// 		  <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
  
// 		  {selectedOrder && ['process', 'completed'].includes(activeTab) && (
//   <Row className="mb-4">
//   <Col md={6}>
// 	{isCourier ? (
// 	//   <OrderTracking
// 	//   orderId={selectedOrder.order_id}
// 	//   customerId={selectedOrder.user_id}
// 	//   latCustomer={selectedOrder.shipping_cost[0]?.latitude}
// 	//   lnCustomer={selectedOrder.shipping_cost[0]?.longitude}
// 	// />
// 	<CourierTracking 
// 		orderId={selectedOrder.order_id} 
// 		courierId={selectedOrder.courier?.id}		
// 		latCourier={selectedOrder.courier?.latitude}
// 		lnCourier={selectedOrder.courier?.longitude}
// 		destination={[selectedOrder.courier?.latitude, selectedOrder.courier?.longitude]} // Koordinat tujuan (customer)
// 	  />
// 	) : (
	  
// 	//   <CourierTracking 
// 	// 	orderId={selectedOrder.order_id} 
// 	// 	courierId={selectedOrder.courier?.id}		
// 	// 	latCourier={selectedOrder.courier?.latitude}
// 	// 	lnCourier={selectedOrder.courier?.longitude}
// 	// 	destination={[selectedOrder.courier?.latitude, selectedOrder.courier?.longitude]} // Koordinat tujuan (customer)
// 	//   />
// 	//   <OrderTracking
// 	//   orderId={selectedOrder.order_id}
// 	//   customerId={selectedOrder.user_id}
// 	//   latCustomer={selectedOrder.shipping_cost[0]?.latitude}
// 	//   lnCustomer={selectedOrder.shipping_cost[0]?.longitude}
// 	//   destination={[selectedOrder.shipping_cost[0]?.latitude, selectedOrder.shipping_cost[0]?.longitude]}
// 	// />
// 	<OrderMap order={selectedOrder} />
// 	)}
//   </Col>
//   <Col md={6}>
// 	<OrderHistories orderId={selectedOrder.order_id} safeFormatDate={safeFormatDate} />
//   </Col>
// </Row>
// )}
  
// 		  {!orders.length ? (
// 			<div className="text-center mt-5">
// 			  <Spinner animation="border" variant="primary" />
// 			  <p className="mt-3">Memuat data pesanan...</p>
// 			</div>
// 		  ) : filteredOrders.length > 0 ? (
// 			filteredOrders.map(order => {
// 			  const summary = getOrderSummary(order);
// 			  const groupedSellers = groupItemsBySeller(order.items);
  
// 			  return (
// 				<Card key={order.order_id} className="mb-4 shadow">
// 				  <Card.Header className="bg-primary text-white">
// 					<Row className="align-items-center">
// 					  <Col md={8}>
// 						<h4 className="mb-1">Order #{order.order_code}</h4>
// 						<small>
// 						  {safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}
// 						</small>
// 					  </Col>
// 					  <Col md={4} className="text-end">
// 						<Badge bg="light" text="dark" className="fs-6 me-2">
// 						  {order.payment_method}
// 						</Badge>
// 						<Badge bg="success" className="fs-6">
// 						  Rp{summary.total.toLocaleString()}
// 						</Badge>
// 					  </Col>
// 					</Row>
// 				  </Card.Header>
  
// 				  <Card.Body>
// 					<Row>
// 					  <Col md={8}>
// 						{Object.values(groupedSellers).map(seller => (
// 						  <Card key={seller.sellerInfo.id} className="mb-4 seller-card">
// 							<Card.Header className="bg-light">
// 							  <div className="d-flex align-items-center">
// 								<img
// 								  src={seller.sellerInfo.image}
// 								  alt={seller.sellerInfo.name}
// 								  className="seller-avatar me-3"
// 								/>
// 								<div>
// 								  <h5 className="mb-0">{seller.sellerInfo.name}</h5>
// 								  <small className="text-muted">{seller.sellerInfo.address}</small>
// 								</div>
// 							  </div>
// 							</Card.Header>
// 							<Card.Body>
// 							  {seller.items.map((item) => (
// 								<div key={item.product_id} className="product-item mb-3">
// 								  <Row className="align-items-center">
// 									<Col xs={3}>
// 									  <img
// 										src={item.image_url}
// 										alt={item.name}
// 										className="img-fluid rounded product-image"
// 									  />
// 									</Col>
// 									<Col xs={9}>
// 									  <h6>{item.name}</h6>
// 									  <div className="d-flex justify-content-between">
// 										<span>Rp{(item.price * item.quantity).toLocaleString()}</span>
// 										<span>x{item.quantity}</span>
// 									  </div>
// 									</Col>
// 								  </Row>
// 								</div>
// 							  ))}
// 							</Card.Body>
// 						  </Card>
// 						))}
// 					  </Col>
  
// 					  {/* Bagian kanan (info kurir dan ringkasan) */}
// 					  <Col md={4}>
// 						{/* ... (sama seperti sebelumnya) */}
// 						<Card className="mb-3">
//  					<Card.Header className="bg-light">
//  					  <h5 className="mb-0">Info Kurir</h5>
//  					</Card.Header>
//  					<Card.Body>
//  					  <div className="d-flex align-items-center">
//  						<img
// 						  src={order.courier?.profile_image}
// 						  alt={order.courier?.name}
// 						  className="seller-avatar me-3"
// 						/>
// 						<div>
// 						  <h6 className="mb-1">{order.courier?.name || 'N/A'}</h6>
// 						  <small className="text-muted">{order.courier?.phone_number || 'N/A'}</small>
// 						</div>
// 					  </div>
// 					</Card.Body>
// 				  </Card>
	  
// 				  <Card>
// 					<Card.Header className="bg-light">
// 					  <h5 className="mb-0">Ringkasan Pembayaran</h5>
// 					</Card.Header>
// 					<Card.Body>
// 					  <div className="d-flex justify-content-between mb-2">
// 						<span>Subtotal:</span>
// 						<span>Rp{summary.subtotal.toLocaleString()}</span>
// 					  </div>
// 					  <div className="d-flex justify-content-between mb-3">
// 						<span>Pengiriman:</span>
// 						<span>Rp{summary.shipping.toLocaleString()}</span>
// 					  </div>
// 					  <div className="d-flex justify-content-between fw-bold border-top pt-2">
// 						<span>Total:</span>
// 						<span className="text-success">
// 						  Rp{summary.total.toLocaleString()}
// 						</span>
// 					  </div>
// 					</Card.Body>
// 				  </Card>
// 					  </Col>
// 					</Row>
// 				  </Card.Body>
				  
//  			<Card.Footer className="bg-light">
//  			  <Button 
// 				variant="primary" 
// 				onClick={() => setSelectedOrder(selectedOrder?.order_id === order.order_id ? null : order)}
// 			  >
// 				{selectedOrder?.order_id === order.order_id ? 
// 				  'Sembunyikan Detail' : 'Lihat Detail Pengiriman'}
// 			  </Button>
// 			</Card.Footer>
// 				</Card>
// 			  );
// 			})
// 		  ) : (
// 			<div className="alert alert-info mt-4">
// 			  Tidak ada pesanan dengan status ini
// 			</div>
// 		  )}
// 		</div>
// 	  </>
// 	);
//   };
  
//   export default Index;



import { 
  Card, 
  Row, 
  Col, 
  Spinner, 
  Badge, 
  Button, 
  Tabs, 
  Tab, 
  CardFooter
} from "react-bootstrap";
import Navbar from "../../components/Navbar";
import useProductStore from "../../store/useProductStore";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import toast from "react-hot-toast";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import { RoutingMachine } from './RoutingMachine'; // Buat komponen ini
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import 'leaflet-rotatedmarker';
import "../../assets/Leaflet.MovingMarker/MovingMarker";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markericon2x,
  iconUrl: markericon,
  shadowUrl: markericonshadow,
});

const StatusTabs = ({ activeTab, setActiveTab }) => {
  return (
    <Tabs
      activeKey={activeTab}
      onSelect={(k) => setActiveTab(k)}
      className="mb-4 status-tabs"
      variant="pills"
    >
      <Tab eventKey="pending" title="Pending" />
      <Tab eventKey="process" title="Dalam Proses" />
      <Tab eventKey="completed" title="Selesai" />
      <Tab eventKey="cancelled" title="Dibatalkan" />
    </Tabs>
  );
};

import WebSocketService from "../../utils/Websocet";
import courierIcon from "../../assets/image/courier.png"; // Siapkan ikon motor
import customerIcon from "../../assets/image/customer.png"; // Siapkan ikon motor
import shopIcon from "../../assets/image/shop.png"; // Siapkan ikon motor
import OrderTracking from "../Tracking/OrderTracking";
import CourierTracking from "../Tracking/CourierTracking";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import OrderHistories from "./OrderHistory";
import { ConfirmationModal } from "./KonfirmationModal";

// Buat custom icon untuk kurir
const CourierIcon = L.icon({
  iconUrl: courierIcon,
  iconSize: [82, 82],
  iconAnchor: [45, 62],
  popupAnchor: [0, -32],
  rotationOrigin: 'center center'
});

const CustomerIcon = L.icon({
  iconUrl: customerIcon,
  iconSize: [82, 82],
  iconAnchor: [45, 62],
  popupAnchor: [0, -32]
});

const ShopIcon = L.icon({
  iconUrl: shopIcon,
  iconSize: [42, 42],
  iconAnchor: [22, 42],
  popupAnchor: [0, -32]
});

// Komponen Marker Kurir dengan Animasi
const AnimatedCourierMarker = ({ position, map, order }) => {
  const markerRef = useRef(null);
  const prevPositionRef = useRef(null);

  // Fungsi untuk menghitung arah
  const calculateBearing = (start, end) => {
    const startLat = start.lat;
    const startLng = start.lng;
    const endLat = end.lat;
    const endLng = end.lng;

    const dLng = (endLng - startLng) * Math.PI / 180;
    const lat1 = startLat * Math.PI / 180;
    const lat2 = endLat * Math.PI / 180;

    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    let bearing = Math.atan2(y, x);
    bearing = bearing * 180 / Math.PI;
    bearing = (bearing + 360) % 360;
    return bearing;
  };

  useEffect(() => {
    if (map && position) {
      if (!markerRef.current) {
        markerRef.current = L.Marker.movingMarker(
          [position],
          [5000], // Durasi animasi (ms)
          {
            icon: CourierIcon,
            autostart: true,
            rotationAngle: 0
          }
        ).addTo(map);
        
        // Tambahkan popup
        markerRef.current.bindPopup(
          `<strong>Kurir</strong><br>${order.courier?.name}`
        );
      } else {
        const newPos = L.latLng(position);
        const oldPos = prevPositionRef.current;
        
        if (oldPos && !newPos.equals(oldPos)) {
          // Hitung arah dan animasi
          const bearing = calculateBearing(oldPos, newPos);
          markerRef.current.setRotationAngle(bearing);
          markerRef.current.moveTo(newPos, 2000); // Durasi perpindahan (ms)
        }
        prevPositionRef.current = newPos;
      }
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.stop();
        markerRef.current.remove();
      }
    };
  }, [position, map, order]);

  return null;
};

// const OrderMap = ({ order }) => {
//   const [routes, setRoutes] = useState([]);
//   const [map, setMap] = useState(null);
//   const [courierPosition, setCourierPosition] = useState(null);
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [sellers, setSellers] = useState([]);
//   const [routingControls, setRoutingControls] = useState([]);

//   console.log("ini seller", sellers)

//   // Fungsi validasi koordinat
//   const isValidCoordinate = (lat, lng) => {
//     return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
//   };

//   // Setup WebSocket
//   useEffect(() => {
//     let animationFrameId;
//     const smoothTransition = (newPos) => {
//       setCourierPosition(prev => {
//         if (!prev) return newPos;
//         const step = 0.1; // Kehalusan animasi
//         return [
//           prev[0] + (newPos[0] - prev[0]) * step,
//           prev[1] + (newPos[1] - prev[1]) * step
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

//     if (order?.order_id) {
//       WebSocketService.connect(order.order_id);
//       WebSocketService.addCallback('location_update', handleLocationUpdate);
//     }

//     return () => {
//       WebSocketService.removeCallback('location_update', handleLocationUpdate);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [order?.order_id]);

//   // Inisialisasi posisi awal
//   useEffect(() => {
//     if (order) {
//       // Customer position
//       const custLat = parseFloat(order.shipping_cost[0]?.latitude);
//       const custLng = parseFloat(order.shipping_cost[0]?.longitude);
//       if (isValidCoordinate(custLat, custLng)) {
//         setCustomerPosition([custLat, custLng]);
//       }

//       // Courier position
//       const courLat = parseFloat(order.courier?.latitude);
//       const courLng = parseFloat(order.courier?.longitude);
//       if (isValidCoordinate(courLat, courLng)) {
//         setCourierPosition([courLat, courLng]);
//       }

//       // Seller positions
//       const validSellers = order.items.reduce((acc, item) => {
//         const lat = parseFloat(item.seller_latitude);
//         const lng = parseFloat(item.seller_longitude);
//         if (isValidCoordinate(lat, lng)) {
//           acc.push({
//             position: [lat, lng],
//             name: item.seller_name,
//             address: item.seller_address
//           });
//         }
//         return acc;
//       }, []);
//       setSellers(validSellers);
//     }
//   }, [order]);

//   // Update rute saat posisi berubah
//   useEffect(() => {
//     if (map && courierPosition && customerPosition) {
//       // Hapus rute sebelumnya
//       routingControls.forEach(control => map.removeControl(control));
      
//       const newRoutingControls = [];

//       // Warna hijau untuk semua rute
//       const greenRouteStyle = {
//         color: '#4CAF50', // Warna hijau lebih modern
//         opacity: 0.8,
//         weight: 20,
//         dashArray: '10, 10' // Tambahkan garis putus untuk membedakan arah
//       };

//       // Rute dari kurir ke customer
//       const toCustomer = L.Routing.control({
//         waypoints: [
//           L.latLng(...courierPosition),
//           L.latLng(...customerPosition)
//         ],
//         lineOptions: {
//           styles: [greenRouteStyle]
//         },
//         show: false,
//         addWaypoints: false,
//         createMarker: () => null // Hilangkan marker default
//       }).addTo(map);
//       newRoutingControls.push(toCustomer);

//       setRoutingControls(newRoutingControls);
//     }
//   }, [courierPosition, customerPosition, map]);

//   const LeafletRoutingMachine = ({ position, destination, color }) => {
//     const map = useMap();

//     useEffect(() => {
//       if (!position || !destination) return;

//       const routingControl = L.Routing.control({
//         waypoints: [
//           L.latLng(position[0], position[1]),
//           L.latLng(destination[0], destination[1])
//         ],
//         lineOptions: {
//           styles: [{ 
//             color: color,
//             opacity: 0.8,
//             weight: 5,
//             dashArray: '5,5'
//           }]
//         },
//         show: false,
//         addWaypoints: false,
//         createMarker: () => null
//       }).addTo(map);

//       return () => map.removeControl(routingControl);
//     }, [map, position, destination, color]);

//     return null;
//   };

//   return (
//     <Card className="mb-4 map-card">
//       <Card.Header className="bg-primary text-white">
//         Pelacakan Pengiriman Real-time
//       </Card.Header>
//       <Card.Body style={{ height: "500px" }}>
//         <MapContainer
//           center={courierPosition || [-6.1754, 106.8272]}
//           zoom={13}
//           scrollWheelZoom={false}
//           style={{ height: "100%", width: "100%" }}
//           whenCreated={setMap}
//         >
//           <LeafletRoutingMachine 
//             position={courierPosition} 
//             destination={customerPosition} 
//             color="#4CAF50"
//           />
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Marker Customer */}
//           {customerPosition && (
//             <Marker position={customerPosition}
//             icon={CustomerIcon}
//             >
//               <Popup>
//                 <div>
//                   <strong>Lokasi Pelanggan</strong>
//                   <br />
//                   {order.shipping_cost[0]?.address}
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* Marker Kurir dengan Animasi */}
//           {courierPosition && (
//             <>
//               <AnimatedCourierMarker position={courierPosition} map={map} order={order} icon={courierIcon}
//             />
//               <Marker 
//                 position={courierPosition}
//                 icon={CourierIcon}
//               >
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
//           {sellers.map((seller, idx) => (
//             <Marker key={idx} position={seller.position}			  
//               icon={ShopIcon}
//             >
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

// const OrderMap = ({ order }) => {
// 	const [routes, setRoutes] = useState([]);
// 	const [map, setMap] = useState(null);
// 	const [courierPosition, setCourierPosition] = useState(null);
// 	const [customerPosition, setCustomerPosition] = useState(null);
// 	const [sellers, setSellers] = useState([]);
// 	const [routingControls, setRoutingControls] = useState([]);
// 	const [refreshKey, setRefreshKey] = useState(0); // State untuk memaksa refresh peta
  
// 	console.log("ini seller", sellers);
  
// 	// Fungsi validasi koordinat
// 	const isValidCoordinate = (lat, lng) => {
// 	  return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
// 	};
  
// 	// Setup WebSocket
// 	useEffect(() => {
// 	  let animationFrameId;
// 	  const smoothTransition = (newPos) => {
// 		setCourierPosition(prev => {
// 		  if (!prev) return newPos;
// 		  const step = 0.1; // Kehalusan animasi
// 		  return [
// 			prev[0] + (newPos[0] - prev[0]) * step,
// 			prev[1] + (newPos[1] - prev[1]) * step
// 		  ];
// 		});
// 		animationFrameId = requestAnimationFrame(() => smoothTransition(newPos));
// 	  };
  
// 	  const handleLocationUpdate = (data) => {
// 		if (isValidCoordinate(data.latitude, data.longitude)) {
// 		  cancelAnimationFrame(animationFrameId);
// 		  smoothTransition([data.latitude, data.longitude]);
// 		}
// 	  };
  
// 	  if (order?.order_id) {
// 		WebSocketService.connect(order.order_id);
// 		WebSocketService.addCallback('location_update', handleLocationUpdate);
// 	  }
  
// 	  return () => {
// 		WebSocketService.removeCallback('location_update', handleLocationUpdate);
// 		cancelAnimationFrame(animationFrameId);
// 	  };
// 	}, [order?.order_id]);
  
// 	// Inisialisasi posisi awal
// 	useEffect(() => {
// 	  if (order) {
// 		// Customer position
// 		const custLat = parseFloat(order.shipping_cost[0]?.latitude);
// 		const custLng = parseFloat(order.shipping_cost[0]?.longitude);
// 		if (isValidCoordinate(custLat, custLng)) {
// 		  setCustomerPosition([custLat, custLng]);
// 		}
  
// 		// Courier position
// 		const courLat = parseFloat(order.courier?.latitude);
// 		const courLng = parseFloat(order.courier?.longitude);
// 		if (isValidCoordinate(courLat, courLng)) {
// 		  setCourierPosition([courLat, courLng]);
// 		}
  
// 		// Seller positions
// 		const validSellers = order.items.reduce((acc, item) => {
// 		  const lat = parseFloat(item.seller_latitude);
// 		  const lng = parseFloat(item.seller_longitude);
// 		  if (isValidCoordinate(lat, lng)) {
// 			acc.push({
// 			  position: [lat, lng],
// 			  name: item.seller_name,
// 			  address: item.seller_address
// 			});
// 		  }
// 		  return acc;
// 		}, []);
// 		setSellers(validSellers);
// 	  }
// 	}, [order]);
  
// 	// Update rute saat posisi berubah
// 	useEffect(() => {
// 	  if (map && courierPosition && customerPosition) {
// 		// Hapus rute sebelumnya
// 		routingControls.forEach(control => map.removeControl(control));
		
// 		const newRoutingControls = [];
  
// 		// Warna hijau untuk semua rute
// 		const greenRouteStyle = {
// 		  color: '#4CAF50', // Warna hijau lebih modern
// 		  opacity: 0.8,
// 		  weight: 20,
// 		  dashArray: '10, 10' // Tambahkan garis putus untuk membedakan arah
// 		};
  
// 		// Rute dari kurir ke customer
// 		const toCustomer = L.Routing.control({
// 		  waypoints: [
// 			L.latLng(...courierPosition),
// 			L.latLng(...customerPosition)
// 		  ],
// 		  lineOptions: {
// 			styles: [greenRouteStyle]
// 		  },
// 		  show: false,
// 		  addWaypoints: false,
// 		  createMarker: () => null // Hilangkan marker default
// 		}).addTo(map);
// 		newRoutingControls.push(toCustomer);
  
// 		setRoutingControls(newRoutingControls);
// 	  }
// 	}, [courierPosition, customerPosition, map]);
  
// 	// Refresh peta setiap 15 detik
// 	useEffect(() => {
// 	  const interval = setInterval(() => {
// 		setRefreshKey(prevKey => prevKey + 1); // Perbarui refreshKey setiap 15 detik
// 	  }, 15000);
  
// 	  return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
// 	}, []);
  
// 	const LeafletRoutingMachine = ({ position, destination, color }) => {
// 	  const map = useMap();
  
// 	  useEffect(() => {
// 		if (!position || !destination) return;
  
// 		const routingControl = L.Routing.control({
// 		  waypoints: [
// 			L.latLng(position[0], position[1]),
// 			L.latLng(destination[0], destination[1])
// 		  ],
// 		  lineOptions: {
// 			styles: [{ 
// 			  color: color,
// 			  opacity: 0.8,
// 			  weight: 5,
// 			  dashArray: '5,5'
// 			}]
// 		  },
// 		  show: false,
// 		  addWaypoints: false,
// 		  createMarker: () => null
// 		}).addTo(map);
  
// 		return () => map.removeControl(routingControl);
// 	  }, [map, position, destination, color]);
  
// 	  return null;
// 	};
  
// 	return (
// 	  <Card className="mb-4 map-card">
// 		<Card.Header className="bg-primary text-white">
// 		  Pelacakan Pengiriman Real-time
// 		</Card.Header>
// 		<Card.Body style={{ height: "500px" }}>
// 		  <MapContainer
// 			key={refreshKey} // Gunakan refreshKey untuk memaksa render ulang peta
// 			center={courierPosition || [-6.1754, 106.8272]}
// 			zoom={13}
// 			scrollWheelZoom={false}
// 			style={{ height: "100%", width: "100%" }}
// 			whenCreated={setMap}
// 		  >
// 			<LeafletRoutingMachine 
// 			  position={courierPosition} 
// 			  destination={customerPosition} 
// 			  color="#4CAF50"
// 			/>
// 			<TileLayer
// 			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 			/>
  
// 			{/* Marker Customer */}
// 			{customerPosition && (
// 			  <Marker position={customerPosition}
// 			  icon={CustomerIcon}
// 			  >
// 				<Popup>
// 				  <div>
// 					<strong>Lokasi Pelanggan</strong>
// 					<br />
// 					{order.shipping_cost[0]?.address}
// 				  </div>
// 				</Popup>
// 			  </Marker>
// 			)}
  
// 			{/* Marker Kurir dengan Animasi */}
// 			{courierPosition && (
// 			  <>
// 				<AnimatedCourierMarker position={courierPosition} map={map} order={order} icon={courierIcon}
// 			  />
// 				<Marker 
// 				  position={courierPosition}
// 				  icon={CourierIcon}
// 				>
// 				  <Popup>
// 					<div>
// 					  <strong>Kurir</strong>
// 					  <br />
// 					  {order.courier?.name}
// 					  <br />
// 					  {order.courier?.phone_number}
// 					</div>
// 				  </Popup>
// 				</Marker>
// 			  </>
// 			)}
  
// 			{/* Marker Penjual */}
// 			{sellers.map((seller, idx) => (
// 			  <Marker key={idx} position={seller.position}			  
// 				icon={ShopIcon}
// 			  >
// 				<Popup>
// 				  <div>
// 					<strong>Penjual: {seller.name}</strong>
// 					<br />
// 					{seller.address}
// 				  </div>
// 				</Popup>
// 			  </Marker>
// 			))}
// 		  </MapContainer>
// 		</Card.Body>
// 	  </Card>
// 	);
//   };

import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { CancelModal } from "./CancelModal ";
import { useNavigate } from "react-router-dom";

const OrderMap = ({ order }) => {
  const [map, setMap] = useState(null);
  const [courierPosition, setCourierPosition] = useState(null);
  const [customerPosition, setCustomerPosition] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [routingControls, setRoutingControls] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  console.log("ini seller", sellers);

  // Fungsi validasi koordinat
  const isValidCoordinate = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  };

  // Setup WebSocket
  useEffect(() => {
    let animationFrameId;
    const smoothTransition = (newPos) => {
      setCourierPosition(prev => {
        if (!prev) return newPos;
        const step = 0.1; // Kehalusan animasi
        return [
          prev[0] + (newPos[0] - prev[0]) * step,
          prev[1] + (newPos[1] - prev[1]) * step
        ];
      });
      animationFrameId = requestAnimationFrame(() => smoothTransition(newPos));
    };

    const handleLocationUpdate = (data) => {
      if (isValidCoordinate(data.latitude, data.longitude)) {
        cancelAnimationFrame(animationFrameId);
        smoothTransition([data.latitude, data.longitude]);
      }
    };

    if (order?.order_id && order.status !== 'completed') {
      WebSocketService.connect(order.order_id);
      WebSocketService.addCallback('location_update', handleLocationUpdate);
    }

    return () => {
      WebSocketService.removeCallback('location_update', handleLocationUpdate);
      cancelAnimationFrame(animationFrameId);
    };
  }, [order?.order_id, order?.status]);

  // Inisialisasi posisi awal
  useEffect(() => {
    if (order) {
      // Customer position
      const custLat = parseFloat(order.shipping_cost[0]?.latitude);
      const custLng = parseFloat(order.shipping_cost[0]?.longitude);
      if (isValidCoordinate(custLat, custLng)) {
        setCustomerPosition([custLat, custLng]);
      }

      // Courier position (hanya jika status bukan 'completed')
      if (order.status !== 'completed') {
        const courLat = parseFloat(order.courier?.latitude);
        const courLng = parseFloat(order.courier?.longitude);
        if (isValidCoordinate(courLat, courLng)) {
          setCourierPosition([courLat, courLng]);
        }
      }

      // Seller positions
      const validSellers = order.items.reduce((acc, item) => {
        const lat = parseFloat(item.seller_latitude);
        const lng = parseFloat(item.seller_longitude);
        if (isValidCoordinate(lat, lng)) {
          acc.push({
            position: [lat, lng],
            name: item.seller_name,
            address: item.seller_address
          });
        }
        return acc;
      }, []);
      setSellers(validSellers);
    }
  }, [order]);

  // Update rute saat posisi berubah (hanya jika status bukan 'completed')
  useEffect(() => {
    if (map && courierPosition && customerPosition && order.status !== 'completed') {
      // Hapus rute sebelumnya
      routingControls.forEach(control => map.removeControl(control));
      
      const newRoutingControls = [];

      // Warna hijau untuk semua rute
      const greenRouteStyle = {
        color: '#4CAF50', // Warna hijau lebih modern
        opacity: 0.8,
        weight: 20,
        dashArray: '10, 10' // Tambahkan garis putus untuk membedakan arah
      };

      // Rute dari kurir ke customer
      const toCustomer = L.Routing.control({
        waypoints: [
          L.latLng(...courierPosition),
          L.latLng(...customerPosition)
        ],
        lineOptions: {
          styles: [greenRouteStyle]
        },
        show: false,
        addWaypoints: false,
        createMarker: () => null // Hilangkan marker default
      }).addTo(map);
      newRoutingControls.push(toCustomer);

      setRoutingControls(newRoutingControls);
    }
  }, [courierPosition, customerPosition, map, order.status]);

  // Refresh peta setiap 15 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(prevKey => prevKey + 1); // Perbarui refreshKey setiap 15 detik
    }, 30000);

    return () => clearInterval(interval); // Bersihkan interval saat komponen di-unmount
  }, []);

  const LeafletRoutingMachine = ({ position, destination, color }) => {
    const map = useMap();

    useEffect(() => {
      if (!position || !destination || order.status === 'completed') return;

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(position[0], position[1]),
          L.latLng(destination[0], destination[1])
        ],
        lineOptions: {
          styles: [{ 
            color: color,
            opacity: 0.8,
            weight: 5,
            dashArray: '5,5'
          }]
        },
        show: false,
        addWaypoints: false,
        createMarker: () => null
      }).addTo(map);

      return () => map.removeControl(routingControl);
    }, [map, position, destination, color, order.status]);

    return null;
  };

  return (
    <Card className="mb-4 map-card">
      <Card.Header className="bg-primary text-white">
        Pelacakan Pengiriman Real-time
      </Card.Header>
      <Card.Body style={{ height: "500px" }}>
	  <MapContainer
  key={refreshKey}
  center={customerPosition || courierPosition || [-5.547964, 119.945908]}
  zoom={customerPosition ? 15 : 13} // Default zoom 15 jika ada customerPosition
  scrollWheelZoom={false}
  style={{ height: "100%", width: "100%" }}
  whenCreated={setMap}
>
          {/* Tampilkan rute hanya jika status bukan 'completed' */}
          {order.status !== 'completed' && (
            <LeafletRoutingMachine 
              position={courierPosition} 
              destination={customerPosition} 
              color="#4CAF50"
            />
          )}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marker Customer */}
          {customerPosition && (
            <Marker position={customerPosition} icon={CustomerIcon}>
              <Popup>
                <div>
                  <strong>Lokasi Pelanggan</strong>
                  <br />
                  {order.shipping_cost[0]?.address}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Marker Kurir dengan Animasi (hanya jika status bukan 'completed') */}
          {courierPosition && order.status !== 'completed' && (
            <>
              <AnimatedCourierMarker position={courierPosition} map={map} order={order} icon={courierIcon} />
              <Marker position={courierPosition} icon={CourierIcon}>
                <Popup>
                  <div>
                    <strong>Kurir</strong>
                    <br />
                    {order.courier?.name}
                    <br />
                    {order.courier?.phone_number}
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* Marker Penjual */}
          {sellers.map((seller, idx) => (
            <Marker key={idx} position={seller.position} icon={ShopIcon}>
              <Popup>
                <div>
                  <strong>Penjual: {seller.name}</strong>
                  <br />
                  {seller.address}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card.Body>
    </Card>
  );
};


const safeFormatDate = (date, dateFormat, locale) => {
  if (!date || !isValid(new Date(date))) return 'Tanggal tidak valid';
  return format(new Date(date), dateFormat, { locale });
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { fetchOrder, orders = [], fetchPayment, fetchHistoriesById } = useProductStore();
  const currentUser = useProductStore((state) => state.currentUser); // Asumsikan currentUser 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
// const [selectedOrderId, setSelectedOrderId] = useState(null); // Untuk menyimpan ID pesanan yang dipilih
const [showCancelModal, setShowCancelModal] = useState(false); // Untuk menampilkan modal konfirmasi pembatalan
const [error, setError] = useState(null); // Untuk menyimpan pesan error
const { cancelOrder, clearSelectedCart, toggleCartSelection } = useProductStore(); // Ambil fungsi cancelOrder dari store

const navigate = useNavigate();

  console.log("order", orders);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchOrder();
        await fetchPayment();
        await fetchHistoriesById();

        WebSocketService.addCallback('status_update', (data) => {
          useProductStore.setState(state => ({
            orders: state.orders.map(order =>
              order.order_id === data.order_id ? { ...order, status: data.status } : order
            )
          }));
        });
      } catch (error) {
        toast.error("Gagal memuat data");
      }
    };
    loadData();

    WebSocketService.addCallback('status_update', loadData);

    return () => {
      WebSocketService.removeCallback('status_update', loadData);
    };
  }, [fetchOrder, fetchPayment, fetchHistoriesById]);

  // Tentukan apakah pengguna adalah kurir atau customer
  const isCourier = currentUser?.role === "courier";

  const filteredOrders = orders.filter(order => 
    order.status?.toLowerCase() === activeTab.toLowerCase()
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
            image: item.seller_profile_image
          },
          items: []
        };
      }
      acc[sellerId].items.push(item);
      return acc;
    }, {});
  };

  const getOrderSummary = (order) => {
    const items = order.items || [];
    
    // Pastikan item.price dan item.quantity adalah angka
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price);
      const quantity = parseFloat(item.quantity);
      return sum + (price * quantity);
    }, 0);
  
    // Pastikan shipping_cost adalah angka
    const shipping = parseFloat(order.shipping_cost[0]?.shipping_cost) || 0;
  
    // Kembalikan hasil sebagai angka
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const result = await cancelOrder(orderId, setError); // Panggil fungsi cancelOrder
      console.log("Order canceled successfully:", result);
      toast.success("Pesanan berhasil dibatalkan!"); // Beri feedback ke pengguna
      setShowCancelModal(false); // Tutup modal setelah berhasil
		window.location.reload();
      // Lakukan sesuatu setelah pembatalan berhasil, seperti refresh data
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert(`Gagal membatalkan pesanan: ${error.message}`); // Beri feedback error ke pengguna
    }
  };

  // Fungsi untuk menangani "Beli Lagi"
  const handleBuyAgain = (order) => {
    // Kosongkan selectedCart terlebih dahulu
    clearSelectedCart();

    // Tambahkan semua item dari pesanan yang dibatalkan ke selectedCart
    order.items.forEach((item) => {
      toggleCartSelection(item); // Tambahkan item ke selectedCart
    });

    // Arahkan pengguna ke halaman /cart
    navigate("/cart");
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-4 orders-container">
        <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>
        
        <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {selectedOrder && ['process', 'completed'].includes(activeTab) && (
          <Row className="mb-4">
            <Col md={6}>
              {isCourier ? (
                <CourierTracking 
                  orderId={selectedOrder.order_id} 
                  courierId={selectedOrder.courier?.id}		
                  latCourier={selectedOrder.courier?.latitude}
                  lnCourier={selectedOrder.courier?.longitude}
                  destination={[selectedOrder.courier?.latitude, selectedOrder.courier?.longitude]} // Koordinat tujuan (customer)
                />
              ) : (
                <OrderMap order={selectedOrder} />
              )}
            </Col>
            <Col md={6}>
              <OrderHistories orderId={selectedOrder.order_id} safeFormatDate={safeFormatDate} />
            </Col>
          </Row>
        )}

        {!orders.length ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Memuat data pesanan...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const summary = getOrderSummary(order);
            const groupedSellers = groupItemsBySeller(order.items);

            return (
              <Card key={order.order_id} className="mb-4 shadow">
                <Card.Header className="bg-primary text-white">
                  <Row className="align-items-center">
                    <Col md={8}>
                      <h4 className="mb-1">Order #{order.order_code}</h4>
                      <small>
                        {safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}
                      </small>
                    </Col>
                    <Col md={4} className="text-end">
                      <Badge bg="light" text="dark" className="fs-6 text-wrap me-2 mb-3">
                        {order.payment_method}
                      </Badge>
                      <Badge bg="success" className="fs-6">
                        Rp{summary.total.toLocaleString()}
                      </Badge>
                    </Col>
                  </Row>
                </Card.Header>

                <Card.Body>
                  <Row>
                    <Col md={8}>
                      {Object.values(groupedSellers).map(seller => (
                        <Card key={seller.sellerInfo.id} className="mb-4 seller-card">
                          <Card.Header className="bg-light">
                            <div className="d-flex align-items-center">
                              <img
                                src={seller.sellerInfo.image}
                                alt={seller.sellerInfo.name}
                                className="seller-avatar me-3"
                              />
                              <div>
                                <h5 className="mb-0">{seller.sellerInfo.name}</h5>
                                <small className="text-muted">{seller.sellerInfo.address}</small>
                              </div>
                            </div>
                          </Card.Header>
                          <Card.Body>
                            {seller.items.map((item) => (
                              <div key={item.product_id} className="product-item mb-3">
                                <Row className="align-items-center">
                                  <Col xs={3}>
                                    <img
                                      src={item.image_url}
                                      alt={item.name}
                                      className="img-fluid rounded product-image"
                                    />
                                  </Col>
                                  <Col xs={9}>
                                    <h6>{item.name}</h6>
                                    <div className="d-flex justify-content-between">
                                      <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
                                      <span>x{item.quantity}</span>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                          </Card.Body>
                        </Card>
                      ))}
                    </Col>

                    {/* Bagian kanan (info kurir dan ringkasan) */}
                    <Col md={4}>
                      <Card className="mb-3">
                        <Card.Header className="bg-light">
                          <h5 className="mb-0">Info Kurir</h5>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-flex align-items-center">
                            <img
                              src={order.courier?.profile_image}
                              alt={order.courier?.name}
                              className="seller-avatar me-3"
                            />
                            <div>
                              <h6 className="mb-1">{order.courier?.name || 'N/A'}</h6>
                              <small className="text-muted">{order.courier?.phone_number || 'N/A'}</small>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
            
                      <Card>
                        <Card.Header className="bg-light">
                          <h5 className="mb-0">Ringkasan Pembayaran</h5>
                        </Card.Header>
                        <Card.Body>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>Rp{summary.subtotal.toLocaleString()}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-3">
                            <span>Pengiriman:</span>
                            <span>Rp{summary.shipping.toLocaleString()}</span>
                          </div>
                          <div className="d-flex justify-content-between fw-bold border-top pt-2">
                            <span>Total:</span>
                            <span className="text-success">
                              Rp{summary.total.toLocaleString()}
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
				{order.status === 'pending' && (
                <Card.Footer className="bg-light d-flex justify-content-between">
                 
				  {order.status === 'pending' && (
  <>
    <Button
  variant="danger"
  className="ms-2 w-100"
  onClick={() => {
    setSelectedOrder(order); // Simpan order yang dipilih
    setShowCancelModal(true); // Tampilkan modal
  }}
>
  Batalkan pesanan
</Button>


{selectedOrder && (
  
  <CancelModal
        show={showCancelModal}
        onHide={() => setShowCancelModal(false)} // Tutup modal
        order={order}
        onConfirm={() => handleCancelOrder(order.order_id)} // Konfirmasi pembatalan
        safeFormatDate={safeFormatDate} // Fungsi format tanggal
      />
)}
  </>
)}
                </Card.Footer>
				)}
                {order.status === 'process' && (
                <Card.Footer className="bg-light d-flex justify-content-between">
                  <Button 
				  className="w-50"
                    variant="primary" 
                    onClick={() => setSelectedOrder(selectedOrder?.order_id === order.order_id ? null : order)}
                  >
                    {selectedOrder?.order_id === order.order_id ? 
                      'Sembunyikan Detail' : 'Lihat Detail Pengiriman'}
					  
                  </Button>
				  {/* Tombol "Pesanan Diterima" */}
				  {order.status === 'process' && (
  <>
    <Button
  variant="success"
  className="ms-2 w-50"
  onClick={() => {
    setSelectedOrder(order); // Simpan order yang dipilih
    setShowConfirmationModal(true); // Tampilkan modal
  }}
>
  Pesanan Diterima
</Button>


{selectedOrder && (
  <ConfirmationModal
    show={showConfirmationModal}
    onHide={() => setShowConfirmationModal(false)}
    order={selectedOrder} // Kirim order yang dipilih ke modal
    onConfirm={() => {
      useProductStore.getState().updateOrderStatus(selectedOrder.order_id, { status: 'completed' });
      setShowConfirmationModal(false);
    }}
    safeFormatDate={safeFormatDate}
  />
)}
  </>
)}
                </Card.Footer>
				)}
                {order.status === 'completed' && (
					<Card.Footer className="bg-light d-flex justify-content-between">
					<Button 
				  className="w-100"
                    variant="primary" 
                    onClick={() => setSelectedOrder(selectedOrder?.order_id === order.order_id ? null : order)}
                  >
                    {selectedOrder?.order_id === order.order_id ? 
                      'Sembunyikan Detail' : 'Lihat Detail Pengiriman'}
					  
                  </Button>
				  </Card.Footer>
				)}
				
				{/* {order.status === 'cancelled' && (
					<Card.Footer className="bg-light d-flex justify-content-between">
					<Button 
				  className="w-100"
                    variant="primary" 
                    onClick={() => setSelectedOrder(selectedOrder?.order_id === order.order_id ? null : order)}
                  >
                    {selectedOrder?.order_id === order.order_id ? 
                      'Sembunyikan Detail' : 'Lihat Detail Pengiriman'}
					  
                  </Button>
				  </Card.Footer>
				)} */}
              </Card>

            );
          })
        ) : (
          <div className="alert alert-info mt-4">
            Tidak ada pesanan dengan status ini
          </div>
        )}
      </div>
    </>
  );
};

export default Index;