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
//   import { useEffect, useState } from "react";
//   import "./style.css";
//   import { format, isValid } from 'date-fns';
//   import { id } from 'date-fns/locale';
//   import toast from "react-hot-toast";
//   import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
//   import 'leaflet/dist/leaflet.css';
//   import L from 'leaflet';
//   import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
//   import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
//   import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
  
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
  
//   const OrderMap = ({ order }) => {
// 	// Pastikan order.items ada dan tidak kosong
// 	if (!order.items || order.items.length === 0) {
// 	  return (
// 		<Card className="mb-4 map-card">
// 		  <Card.Header className="bg-primary text-white">
// 			Pelacakan Pengiriman
// 		  </Card.Header>
// 		  <Card.Body>
// 			<p className="text-center text-muted">Tidak ada data penjual.</p>
// 		  </Card.Body>
// 		</Card>
// 	  );
// 	}
  
// 	// Ambil data penjual dari item pertama
// 	const seller = order.items[0];
// 	console.log("seller", seller)
  
// 	// Pastikan koordinat penjual dan kurir valid
// 	const sellerLat = parseFloat(seller?.seller_latitude);
// 	const sellerLng = parseFloat(seller?.seller_longitude);
// 	const customerLat = parseFloat(order.shipping_cost[0]?.latitude);
// 	const customerLng = parseFloat(order.shipping_cost[0]?.longitude);
// 	const courierLat = parseFloat(order.courier?.latitude);
// 	const courierLng = parseFloat(order.courier?.longitude);
  
// 	console.log("seller lat", sellerLat);
// 	console.log("seller lng", sellerLng);
// 	console.log("customer lng", customerLat);
// 	console.log("customer lng", customerLng);
// 	console.log("courier lat", courierLat);
// 	console.log("courier lng", courierLng);
  
// 	// Jika koordinat tidak valid, jangan render peta
// 	if (isNaN(sellerLat) || isNaN(sellerLng) || isNaN(courierLat) || isNaN(courierLng)) {
// 	  return (
// 		<Card className="mb-4 map-card">
// 		  <Card.Header className="bg-primary text-white">
// 			Pelacakan Pengiriman
// 		  </Card.Header>
// 		  <Card.Body>
// 			<p className="text-center text-muted">Lokasi penjual atau kurir tidak valid.</p>
// 		  </Card.Body>
// 		</Card>
// 	  );
// 	}
  
// 	const sellerPosition = [sellerLat, sellerLng];
// 	const customerPosition = [customerLat, customerLng];
// 	const courierPosition = [courierLat, courierLng];
  
// 	return (
// 	  <Card className="mb-4 map-card">
// 		<Card.Header className="bg-primary text-white">
// 		  Pelacakan Pengiriman
// 		</Card.Header>
// 		<Card.Body style={{ height: '400px' }}>
// 		  <MapContainer
// 			center={courierPosition}
// 			zoom={13}
// 			scrollWheelZoom={false}
// 			style={{ height: '100%', width: '100%' }}
// 		  >
// 			<TileLayer
// 			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 			/>
  
// 			{/* Seller Marker */}
// 			<Marker position={sellerPosition}>
// 			  <Popup>
// 				<div>
// 				  <strong>Lokasi Penjual</strong><br />
// 				  {seller?.seller_address || 'Alamat penjual tidak tersedia'}
// 				</div>
// 			  </Popup>
// 			</Marker>

// 			{/* customer Marker */}
// 			<Marker position={customerPosition}>
// 			  <Popup>
// 				<div>
// 				  <strong>Lokasi Saya</strong><br />
// 				  {order.shipping_cost[0]?.address || 'Alamat penjual tidak tersedia'}
// 				</div>
// 			  </Popup>
// 			</Marker>
  
// 			{/* Courier Marker */}
// 			<Marker position={courierPosition}>
// 			  <Popup>
// 				<div>
// 				  <strong>Lokasi Kurir</strong><br />
// 				  {order.courier?.name || 'N/A'}<br />
// 				  {order.courier?.phone_number || 'N/A'}
// 				</div>
// 			  </Popup>
// 			</Marker>
// 		  </MapContainer>
// 		</Card.Body>
// 	  </Card>
// 	);
//   };
  
//   const safeFormatDate = (date, dateFormat, locale) => {
// 	if (!date || !isValid(new Date(date))) {
// 	  return 'Tanggal tidak valid';
// 	}
// 	return format(new Date(date), dateFormat, { locale });
//   };
  
//   const Timeline = ({ order }) => {
// 	const statusHistory = [
// 	  {
// 		status: 'Pesanan Dibuat',
// 		timestamp: order.order_date,
// 		location: order.shipping_cost?.address || 'Alamat tidak tersedia' // 1. Tambahkan optional chaining
// 	  },
// 	  {
// 		status: 'Pembayaran',
// 		timestamp: order.payment?.payment_date, // 2. Gunakan optional chaining di sini
// 		location: 'Sistem Pembayaran'
// 	  }
// 	];
  
// 	return (
// 	  <Card className="timeline-card">
// 		<Card.Header className="bg-info text-white">
// 		  Riwayat Status
// 		</Card.Header>
// 		<Card.Body>
// 		  {statusHistory.map((item, idx) => (
// 			<div key={idx} className="timeline-item">
// 			  <div className="timeline-marker"></div>
// 			  <div className="timeline-content">
// 				<h6 className="mb-1">{item.status}</h6>
// 				<small className="text-muted">
// 				  {safeFormatDate(item.timestamp, 'dd MMM yyyy HH:mm', id)}
// 				</small>
// 				<p className="mb-0 text-muted">{item.location}</p>
// 			  </div>
// 			</div>
// 		  ))}
// 		</Card.Body>
// 	  </Card>
// 	);
//   };
  
//   const Index = () => {
// 	const [activeTab, setActiveTab] = useState('pending');
// 	const [selectedOrder, setSelectedOrder] = useState(null);
// 	const { fetchOrder, orders, fetchPayment, payments, updateOrderStatus, fetchHistories } = useProductStore();
  
// 	useEffect(() => {
// 	  const loadData = async () => {
// 		try {
// 		  await fetchOrder();
// 		  await fetchPayment();
// 		  await fetchHistories();
// 		} catch (error) {
// 		  toast.error("Gagal memuat data");
// 		}
// 	  };
// 	  loadData();
// 	}, [fetchOrder, fetchPayment, fetchHistories]);
  
// 	const isLoading = !orders;
// 	const filteredOrders = (orders || []).filter(order => {
// 	  const status = order.payment_status?.toLowerCase();
// 	  return status === activeTab.toLowerCase();
// 	});
  
// 	const getOrderSummary = (order) => {
// 	  const items = order.items || [];
// 	  const subtotal = items.reduce((sum, item) => {
// 		const price = item.price || 0;
// 		const quantity = item.quantity || 0;
// 		return sum + price * quantity;
// 	  }, 0);
// 	  const shipping = order.shipping_cost?.shipping_cost || 0;
// 	  const total = subtotal + shipping;
// 	  return { subtotal, shipping, total };
// 	};
  
// 	return (
// 	  <>
// 		<Navbar />
// 		<div className="container-fluid py-4 orders-container">
// 		  <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>
		  
// 		  <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
  
// 		  {selectedOrder && ['process', 'completed'].includes(activeTab) && (
// 			<Row className="mb-4">
// 			  <Col md={6}>
// 				<OrderMap order={selectedOrder} />
// 			  </Col>
// 			  <Col md={6}>
// 				<Timeline order={selectedOrder} />
// 			  </Col>
// 			</Row>
// 		  )}
  
// 		  {isLoading ? (
// 			<div className="text-center mt-5">
// 			  <Spinner animation="border" variant="primary" />
// 			  <p className="mt-3">Memuat data pesanan...</p>
// 			</div>
// 		  ) : filteredOrders.length > 0 ? (
// 			filteredOrders.map(order => {
// 			  const summary = getOrderSummary(order);
// 			  return (
// 				<Card key={`${order.order_id}-${order.order_code}`} className="mb-4 shadow">
//  			<Card.Header className="bg-primary text-white">
//  			  <Row className="align-items-center">
//  				<Col md={8}>
//  				  <h4 className="mb-1">Order #{order.order_code}</h4>
//  				  <small>
//  					{safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}
//  				  </small>
//  				</Col>
//  				<Col md={4} className="text-end">
//  				  <Badge bg="light" text="dark" className="fs-6 me-2">
//  					{order.payment_method}
//  				  </Badge>
//  				  <Badge bg="success" className="fs-6">
//  					Rp{summary.total.toLocaleString()}
//  				  </Badge>
//  				</Col>
//  			  </Row>
//  			</Card.Header>
	  
//  			<Card.Body>
//  			  <Row>
//  				<Col md={8}>
//  				  {order.items.map((item, idx) => (
// 					<div key={`${item.product_id}-${idx}`} className="product-item mb-4">
// 					  <Row className="g-3 align-items-center">
// 						<Col xs={3}>
// 						  <img
// 							src={item.image_url}
// 							alt={item.name}
// 							className="img-fluid rounded product-image"
// 						  />
// 						</Col>
// 						<Col xs={9}>
// 						  <div className="d-flex justify-content-between align-items-start">
// 							<div>
// 							  <h6 className="mb-1">{item.name}</h6>
// 							  <p className="text-muted small mb-2">{item.description}</p>
// 							</div>
// 							<Badge bg="info" className="ms-2">
// 							  Stok: {item.stock || 0}
// 							</Badge>
// 						  </div>
// 						  <div className="d-flex justify-content-between align-items-center">
// 							<div>
// 							  <span className="text-primary fw-bold me-2">
// 								Rp{(item.price || 0).toLocaleString()}
// 							  </span>
// 							  <span className="text-muted">x{item.quantity || 0}</span>
// 							</div>
// 							<span className="text-success fw-bold">
// 							  Rp{((item.price || 0) * (item.quantity || 0)).toLocaleString()}
// 							</span>
// 						  </div>
// 						</Col>
// 					  </Row>
// 					</div>
// 				  ))}
// 				</Col>
	  
// 				<Col md={4}>
// 				  <Card className="mb-3">
// 					<Card.Header className="bg-light">
// 					  <h5 className="mb-0">Info Kurir</h5>
// 					</Card.Header>
// 					<Card.Body>
// 					  <div className="d-flex align-items-center">
// 						<img
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
// 				</Col>
// 			  </Row>
// 			</Card.Body>
	  
// 			<Card.Footer className="bg-light">
// 			  <Button 
// 				variant="primary" 
// 				onClick={() => setSelectedOrder(selectedOrder?.order_id === order.order_id ? null : order)}
// 			  >
// 				{selectedOrder?.order_id === order.order_id ? 
// 				  'Sembunyikan Detail' : 'Lihat Detail Pengiriman'}
// 			  </Button>
// 			</Card.Footer>
// 		  </Card>
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
	Tab 
  } from "react-bootstrap";
  import Navbar from "../../components/Navbar";
  import useProductStore from "../../store/useProductStore";
  import { useEffect, useState } from "react";
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
  

// const OrderMap = ({ order }) => {
// 	const [routes, setRoutes] = useState([]);
// 	const [map, setMap] = useState(null); // State untuk menyimpan instance map
  
// 	// Fungsi untuk validasi koordinat
// 	const isValidCoordinate = (lat, lng) => {
// 	  return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
// 	};
  
// 	useEffect(() => {
// 	  if (order) {
// 		const newRoutes = [];
  
// 		// Ambil posisi customer
// 		const customerLat = parseFloat(order.shipping_cost[0]?.latitude);
// 		const customerLng = parseFloat(order.shipping_cost[0]?.longitude);
  
// 		// Ambil posisi kurir
// 		const courierLat = parseFloat(order.courier?.latitude);
// 		const courierLng = parseFloat(order.courier?.longitude);
  
// 		// Validasi posisi customer dan kurir
// 		const validCustomer = isValidCoordinate(customerLat, customerLng);
// 		const validCourier = isValidCoordinate(courierLat, courierLng);
  
// 		// Group penjual dengan validasi koordinat
// 		const sellers = order.items.reduce((acc, item) => {
// 		  const sellerLat = parseFloat(item.seller_latitude);
// 		  const sellerLng = parseFloat(item.seller_longitude);
  
// 		  if (isValidCoordinate(sellerLat, sellerLng)) {
// 			const sellerKey = `${sellerLat}-${sellerLng}`;
// 			if (!acc[sellerKey]) {
// 			  acc[sellerKey] = {
// 				position: [sellerLat, sellerLng],
// 				name: item.seller_name,
// 				address: item.seller_address,
// 			  };
// 			}
// 		  }
// 		  return acc;
// 		}, {});
  
// 		// Buat rute untuk penjual yang valid
// 		Object.values(sellers).forEach((seller) => {
// 		  if (validCourier) {
// 			newRoutes.push({
// 			  waypoints: [
// 				[seller.position[0], seller.position[1]],
// 				[courierLat, courierLng],
// 			  ],
// 			  color: "blue",
// 			});
// 		  }
// 		});
  
// 		// Buat rute dari kurir ke customer jika valid
// 		if (validCourier && validCustomer) {
// 		  newRoutes.push({
// 			waypoints: [
// 			  [courierLat, courierLng],
// 			  [customerLat, customerLng],
// 			],
// 			color: "green",
// 		  });
// 		}
  
// 		setRoutes(newRoutes);
// 	  }
// 	}, [order]);
  
// 	if (!order?.items?.length) {
// 	  return (
// 		<Card className="mb-4 map-card">
// 		  <Card.Header className="bg-primary text-white">
// 			Pelacakan Pengiriman
// 		  </Card.Header>
// 		  <Card.Body>
// 			<p className="text-center text-muted">Tidak ada data penjual.</p>
// 		  </Card.Body>
// 		</Card>
// 	  );
// 	}
  
// 	// Dapatkan posisi dengan validasi
// 	const getValidPosition = (lat, lng, fallback) => {
// 	  return isValidCoordinate(lat, lng) ? [lat, lng] : fallback;
// 	};
  
// 	// Posisi default jika koordinat tidak valid
// 	const defaultPosition = [-6.1754, 106.8272]; // Posisi Jakarta
  
// 	// Posisi untuk peta
// 	const customerPosition = getValidPosition(
// 	  parseFloat(order.shipping_cost[0]?.latitude),
// 	  parseFloat(order.shipping_cost[0]?.longitude),
// 	  defaultPosition
// 	);
  
// 	const courierPosition = getValidPosition(
// 	  parseFloat(order.courier?.latitude),
// 	  parseFloat(order.courier?.longitude),
// 	  defaultPosition
// 	);
  
// 	return (
// 	  <Card className="mb-4 map-card">
// 		<Card.Header className="bg-primary text-white">
// 		  Pelacakan Pengiriman
// 		</Card.Header>
// 		<Card.Body style={{ height: "500px" }}>
// 		  <MapContainer
// 			center={courierPosition}
// 			zoom={13}
// 			scrollWheelZoom={false}
// 			style={{ height: "100%", width: "100%" }}
// 			whenCreated={setMap} // Simpan instance map ke state
// 		  >
// 			<TileLayer
// 			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 			/>
  
// 			{/* Marker Customer */}
// 			{isValidCoordinate(...customerPosition) && (
// 			  <Marker position={customerPosition}>
// 				<Popup>
// 				  <div>
// 					<strong>Lokasi Pelanggan</strong>
// 					<br />
// 					{order.shipping_cost[0]?.address || "Alamat tidak tersedia"}
// 				  </div>
// 				</Popup>
// 			  </Marker>
// 			)}
  
// 			{/* Marker Kurir */}
// 			{isValidCoordinate(...courierPosition) && (
// 			  <Marker position={courierPosition}>
// 				<Popup>
// 				  <div>
// 					<strong>Kurir</strong>
// 					<br />
// 					{order.courier?.name || "Nama kurir tidak tersedia"}
// 					<br />
// 					{order.courier?.phone_number || "Nomor HP tidak tersedia"}
// 				  </div>
// 				</Popup>
// 			  </Marker>
// 			)}
  
// 			{/* Marker Penjual */}
// 			{order.items
// 			  .filter((item) =>
// 				isValidCoordinate(
// 				  parseFloat(item.seller_latitude),
// 				  parseFloat(item.seller_longitude)
// 				)
// 			  )
// 			  .reduce((acc, item) => {
// 				const key = `${item.seller_latitude}-${item.seller_longitude}`;
// 				if (!acc.find((i) => i.key === key)) {
// 				  acc.push({
// 					key,
// 					position: [
// 					  parseFloat(item.seller_latitude),
// 					  parseFloat(item.seller_longitude),
// 					],
// 					name: item.seller_name,
// 					address: item.seller_address,
// 				  });
// 				}
// 				return acc;
// 			  }, [])
// 			  .map((seller, idx) => (
// 				<Marker key={idx} position={seller.position}>
// 				  <Popup>
// 					<div>
// 					  <strong>Penjual: {seller.name}</strong>
// 					  <br />
// 					  {seller.address || "Alamat penjual tidak tersedia"}
// 					</div>
// 				  </Popup>
// 				</Marker>
// 			  ))}
  
// 			{/* Render RoutingMachine */}
// 			{map &&
// 			  routes.map((route, idx) => (
// 				<RoutingMachine
// 				  key={idx}
// 				  waypoints={route.waypoints}
// 				  color={route.color}
// 				  map={map} // Kirim instance map ke RoutingMachine
// 				/>
// 			  ))}
// 		  </MapContainer>
// 		</Card.Body>
// 	  </Card>
// 	);
//   };
  


import WebSocketService from "../../utils/Websocet";
import courierIcon from "../../assets/image/courier.png"; // Siapkan ikon motor
import customerIcon from "../../assets/image/customer.png"; // Siapkan ikon motor
import shopIcon from "../../assets/image/shop.png"; // Siapkan ikon motor
import OrderTracking from "../Tracking/OrderTracking";
import CourierTracking from "../Tracking/CourierTracking";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Buat custom icon untuk kurir
// const CourierIcon = L.icon({
//   iconUrl: courierIcon,
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32]
// });

// const OrderMap = ({ order }) => {
//   const [routes, setRoutes] = useState([]);
//   const [map, setMap] = useState(null);
//   const [courierPosition, setCourierPosition] = useState(null);
//   const [customerPosition, setCustomerPosition] = useState(null);
//   const [sellers, setSellers] = useState([]);
//   const [routingControls, setRoutingControls] = useState([]);

//   // Fungsi validasi koordinat
//   const isValidCoordinate = (lat, lng) => {
//     return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
//   };

//   console.log("ini order", order)

//   // Setup WebSocket
//   useEffect(() => {
   

//   if (order?.order_id) {
// 	WebSocketService.connect(order.order_id);
// 	WebSocketService.addCallback('location_update', handleLocationUpdate);
//   }

//   console.log("order_id", order.order_id)
//   return () => {
// 	WebSocketService.disconnect(); // Pastikan WebSocket diputus saat komponen di-unmount
// 	routingControls.forEach(control => map?.removeControl(control));
//   };
// }, [order?.order_id]); // Hanya jalankan ulang jika order_id berubah

//   // Handler update posisi kurir
//   const handleLocationUpdate = (data) => {
//     if (isValidCoordinate(data.latitude, data.longitude)) {
//       setCourierPosition([data.latitude, data.longitude]);
//     }
//   };

//   // Inisialisasi posisi awal
//   useEffect(() => {
//     if (order) {
//       // Customer position
//       const custLat = parseFloat(order.shipping_cost[0]?.latitude);
//       const custLng = parseFloat(order.shipping_cost[0]?.longitude);
//       if (isValidCoordinate(custLat, custLng)) {
//         setCustomerPosition([custLat, custLng]);
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

//       // Rute dari kurir ke customer
//       const toCustomer = L.Routing.control({
//         waypoints: [
//           L.latLng(...courierPosition),
//           L.latLng(...customerPosition)
//         ],
//         lineOptions: {
//           styles: [{color: 'green', opacity: 0.7, weight: 5}]
//         },
//         show: false,
//         addWaypoints: false
//       }).addTo(map);
//       newRoutingControls.push(toCustomer);

//       // Rute dari seller ke kurir
//       sellers.forEach(seller => {
//         const route = L.Routing.control({
//           waypoints: [
//             L.latLng(...seller.position),
//             L.latLng(...courierPosition)
//           ],
//           lineOptions: {
//             styles: [{color: 'blue', opacity: 0.7, weight: 5}]
//           },
//           show: false,
//           addWaypoints: false
//         }).addTo(map);
//         newRoutingControls.push(route);
//       });

//       setRoutingControls(newRoutingControls);
//     }
//   }, [courierPosition, customerPosition, map]);

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
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {/* Marker Customer */}
//           {customerPosition && (
//             <Marker position={customerPosition}>
//               <Popup>
//                 <div>
//                   <strong>Lokasi Pelanggan</strong>
//                   <br />
//                   {order.shipping_cost[0]?.address}
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* Marker Kurir dengan ikon motor */}
//           {courierPosition && (
//             <Marker 
//               position={courierPosition}
//               icon={CourierIcon}
//             >
//               <Popup>
//                 <div>
//                   <strong>Kurir</strong>
//                   <br />
//                   {order.courier?.name}
//                   <br />
//                   {order.courier?.phone_number}
//                 </div>
//               </Popup>
//             </Marker>
//           )}

//           {/* Marker Penjual */}
//           {sellers.map((seller, idx) => (
//             <Marker key={idx} position={seller.position}>
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

// Buat custom icon untuk kurir
const CourierIcon = L.icon({
	iconUrl: courierIcon,
	iconSize: [82, 82],
	iconAnchor: [45, 62],
	popupAnchor: [0, -32]
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
  
  const OrderMap = ({ order }) => {
	const [routes, setRoutes] = useState([]);
	const [map, setMap] = useState(null);
	const [courierPosition, setCourierPosition] = useState(null);
	const [customerPosition, setCustomerPosition] = useState(null);
	const [sellers, setSellers] = useState([]);
	const [routingControls, setRoutingControls] = useState([]);
  
	// Fungsi validasi koordinat
	const isValidCoordinate = (lat, lng) => {
	  return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
	};
  
	// Setup WebSocket
	useEffect(() => {

		// Handler update posisi kurir
	const handleLocationUpdate = (data) => {
		if (isValidCoordinate(data.latitude, data.longitude)) {
		  setCourierPosition([data.latitude, data.longitude]);
		}
	  };
  

		if (order?.order_id) {
			WebSocketService.connect(order.order_id);
			WebSocketService.addCallback('location_update', handleLocationUpdate);
		  }
		
		  return () => {
			WebSocketService.removeCallback('location_update', handleLocationUpdate);
			// Jangan panggil disconnect() di sini agar tidak memutus koneksi global
		  };
	}, [order?.order_id]); // Hanya jalankan ulang jika order_id berubah
  
	
	
  
	// Inisialisasi posisi awal
	useEffect(() => {
	  if (order) {
		// Customer position
		const custLat = parseFloat(order.shipping_cost[0]?.latitude);
		const custLng = parseFloat(order.shipping_cost[0]?.longitude);
		if (isValidCoordinate(custLat, custLng)) {
		  setCustomerPosition([custLat, custLng]);
		}

		console.log("order di map", order)

		// Courier position
		const courLat = parseFloat(order.courier?.latitude);
		const courLng = parseFloat(order.courier?.longitude);
		if (isValidCoordinate(courLat, courLng)) {
		  setCourierPosition([courLat, courLng]);
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
  
	// // Update rute saat posisi berubah
	// useEffect(() => {
	//   if (map && courierPosition && customerPosition) {
	// 	// Hapus rute sebelumnya
	// 	routingControls.forEach(control => map.removeControl(control));
		
	// 	const newRoutingControls = [];
  
	// 	// Rute dari kurir ke customer
	// 	const toCustomer = L.Routing.control({
	// 	  waypoints: [
	// 		L.latLng(...courierPosition),
	// 		L.latLng(...customerPosition)
	// 	  ],
	// 	  lineOptions: {
	// 		styles: [{color: 'green', opacity: 0.7, weight: 5}]
	// 	  },
	// 	  show: false,
	// 	  addWaypoints: false
	// 	}).addTo(map);
	// 	newRoutingControls.push(toCustomer);
  
	// 	// Rute dari seller ke kurir
	// 	sellers.forEach(seller => {
	// 	  const route = L.Routing.control({
	// 		waypoints: [
	// 		  L.latLng(...seller.position),
	// 		  L.latLng(...courierPosition)
	// 		],
	// 		lineOptions: {
	// 		  styles: [{color: 'blue', opacity: 0.7, weight: 5}]
	// 		},
	// 		show: false,
	// 		addWaypoints: false
	// 	  }).addTo(map);
	// 	  newRoutingControls.push(route);
	// 	});
  
	// 	setRoutingControls(newRoutingControls);
	//   }
	// }, [courierPosition, customerPosition, map]);
  // Update rute saat posisi berubah
useEffect(() => {
	if (map && courierPosition && customerPosition) {
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
  
	  // Rute dari seller ke kurir
	  sellers.forEach(seller => {
		const route = L.Routing.control({
		  waypoints: [
			L.latLng(...seller.position),
			L.latLng(...courierPosition)
		  ],
		  lineOptions: {
			styles: [greenRouteStyle]
		  },
		  show: false,
		  addWaypoints: false,
		  createMarker: () => null
		}).addTo(map);
		newRoutingControls.push(route);
	  });
  
	  setRoutingControls(newRoutingControls);
	}
  }, [courierPosition, customerPosition, map]);

  const LeafletRoutingMachine = ({ position, destination, color }) => {
	const map = useMap();
  
	useEffect(() => {
	  if (!position || !destination) return;
  
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
	}, [map, position, destination, color]);
  
	return null;
  };


	return (
	  <Card className="mb-4 map-card">
		<Card.Header className="bg-primary text-white">
		  Pelacakan Pengiriman Real-time
		</Card.Header>
		<Card.Body style={{ height: "500px" }}>
		  <MapContainer
			center={courierPosition || [-6.1754, 106.8272]}
			zoom={13}
			scrollWheelZoom={false}
			style={{ height: "100%", width: "100%" }}
			whenCreated={setMap}
		  >

<LeafletRoutingMachine 
    position={courierPosition} 
    destination={customerPosition} 
    color="#4CAF50"
  />
			<TileLayer
			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
  
			{/* Marker Customer */}
			{customerPosition && (
			  <Marker position={customerPosition}
			  icon={CustomerIcon}
			  >
				<Popup>
				  <div>
					<strong>Lokasi Pelanggan</strong>
					<br />
					{order.shipping_cost[0]?.address}
				  </div>
				</Popup>
			  </Marker>
			)}
  
			{/* Marker Kurir dengan ikon motor */}
			{courierPosition && (
			  <Marker 
				position={courierPosition}
				icon={CourierIcon}
			  >
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
			)}
  
			{/* Marker Penjual */}
			{sellers.map((seller, idx) => (
			  <Marker key={idx} position={seller.position}			  
				icon={ShopIcon}
			  >
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
  
  const Timeline = ({ order }) => {
	const statusHistory = [
	  {
		status: 'Pesanan Dibuat',
		timestamp: order.order_date,
		location: order.shipping_cost[0]?.address
	  },
	  {
		status: 'Pembayaran',
		timestamp: order.payment?.payment_date,
		location: 'Sistem Pembayaran'
	  }
	];
  
	return (
	  <Card className="timeline-card">
		<Card.Header className="bg-info text-white">
		  Riwayat Status
		</Card.Header>
		<Card.Body>
		  {statusHistory.map((item, idx) => (
			<div key={idx} className="timeline-item">
			  <div className="timeline-marker"></div>
			  <div className="timeline-content">
				<h6 className="mb-1">{item.status}</h6>
				<small className="text-muted">
				  {safeFormatDate(item.timestamp, 'dd MMM yyyy HH:mm', id)}
				</small>
				<p className="mb-0 text-muted">{item.location}</p>
			  </div>
			</div>
		  ))}
		</Card.Body>
	  </Card>
	);
  };
  
  const Index = () => {
	const [activeTab, setActiveTab] = useState('pending');
	const [selectedOrder, setSelectedOrder] = useState(null);
	const { fetchOrder, orders = [], fetchPayment, fetchHistories } = useProductStore();
	const currentUser = useProductStore((state) => state.currentUser); // Asumsikan currentUser 
  
	useEffect(() => {
		// const loadData = async () => {
		// 	try {
		// 	  await fetchOrder();
		// 	  await fetchPayment();
		// 	  await fetchHistories();
			  
		// 	  WebSocketService.addCallback('status_update', (data) => {
		// 		useProductStore.setState(state => ({
		// 		  orders: state.orders.map(order => 
		// 			order.order_id === data.order_id ? {...order, status: data.status} : order
		// 		  )
		// 		}));
		// 	  });
		// 	} catch (error) {
		// 	  toast.error("Gagal memuat data");
		// 	}
		//   };
		//   loadData();
		// return () => {
		// 	WebSocketService.disconnect(); // Pastikan WebSocket diputus saat komponen di-unmount
		//   };
		// }, [fetchOrder, fetchPayment, fetchHistories]);



		  const loadData = async () => {
            try {
                await fetchOrder();
                await fetchPayment();
                await fetchHistories();

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
    }, [fetchOrder, fetchPayment, fetchHistories]);

    // Tentukan apakah pengguna adalah kurir atau customer
    const isCourier = currentUser?.role === "courier";




	  
		  console.log("selected Order", selectedOrder)
	
  
	const filteredOrders = orders.filter(order => 
	  order.payment_status?.toLowerCase() === activeTab.toLowerCase()
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
	  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
	  const shipping = order.shipping_cost[0]?.shipping_cost || 0;
	  return { subtotal, shipping, total: subtotal + shipping };
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
	//   <OrderTracking
	//   orderId={selectedOrder.order_id}
	//   customerId={selectedOrder.user_id}
	//   latCustomer={selectedOrder.shipping_cost[0]?.latitude}
	//   lnCustomer={selectedOrder.shipping_cost[0]?.longitude}
	// />
	<CourierTracking 
		orderId={selectedOrder.order_id} 
		courierId={selectedOrder.courier?.id}		
		latCourier={selectedOrder.courier?.latitude}
		lnCourier={selectedOrder.courier?.longitude}
		destination={[selectedOrder.courier?.latitude, selectedOrder.courier?.longitude]} // Koordinat tujuan (customer)
	  />
	) : (
	  
	//   <CourierTracking 
	// 	orderId={selectedOrder.order_id} 
	// 	courierId={selectedOrder.courier?.id}		
	// 	latCourier={selectedOrder.courier?.latitude}
	// 	lnCourier={selectedOrder.courier?.longitude}
	// 	destination={[selectedOrder.courier?.latitude, selectedOrder.courier?.longitude]} // Koordinat tujuan (customer)
	//   />
	//   <OrderTracking
	//   orderId={selectedOrder.order_id}
	//   customerId={selectedOrder.user_id}
	//   latCustomer={selectedOrder.shipping_cost[0]?.latitude}
	//   lnCustomer={selectedOrder.shipping_cost[0]?.longitude}
	//   destination={[selectedOrder.shipping_cost[0]?.latitude, selectedOrder.shipping_cost[0]?.longitude]}
	// />
	<OrderMap order={selectedOrder} />
	)}
  </Col>
  <Col md={6}>
	<Timeline order={selectedOrder} />
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
						<Badge bg="light" text="dark" className="fs-6 me-2">
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
							  {seller.items.map((item, idx) => (
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
						{/* ... (sama seperti sebelumnya) */}
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
				  
 			<Card.Footer className="bg-light">
 			  <Button 
				variant="primary" 
				onClick={() => setSelectedOrder(selectedOrder?.order_id === order.order_id ? null : order)}
			  >
				{selectedOrder?.order_id === order.order_id ? 
				  'Sembunyikan Detail' : 'Lihat Detail Pengiriman'}
			  </Button>
			</Card.Footer>
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