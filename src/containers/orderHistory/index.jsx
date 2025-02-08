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
  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
  import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
  import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
  
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
  
  const OrderMap = ({ order }) => {
	// Pastikan order.items ada dan tidak kosong
	if (!order.items || order.items.length === 0) {
	  return (
		<Card className="mb-4 map-card">
		  <Card.Header className="bg-primary text-white">
			Pelacakan Pengiriman
		  </Card.Header>
		  <Card.Body>
			<p className="text-center text-muted">Tidak ada data penjual.</p>
		  </Card.Body>
		</Card>
	  );
	}
  
	// Ambil data penjual dari item pertama
	const seller = order.items[0];
	console.log("seller", seller)
  
	// Pastikan koordinat penjual dan kurir valid
	const sellerLat = parseFloat(seller?.seller_latitude);
	const sellerLng = parseFloat(seller?.seller_longitude);
	const customerLat = parseFloat(order.shipping_cost[0]?.latitude);
	const customerLng = parseFloat(order.shipping_cost[0]?.longitude);
	const courierLat = parseFloat(order.courier?.latitude);
	const courierLng = parseFloat(order.courier?.longitude);
  
	console.log("seller lat", sellerLat);
	console.log("seller lng", sellerLng);
	console.log("customer lng", customerLat);
	console.log("customer lng", customerLng);
	console.log("courier lat", courierLat);
	console.log("courier lng", courierLng);
  
	// Jika koordinat tidak valid, jangan render peta
	if (isNaN(sellerLat) || isNaN(sellerLng) || isNaN(courierLat) || isNaN(courierLng)) {
	  return (
		<Card className="mb-4 map-card">
		  <Card.Header className="bg-primary text-white">
			Pelacakan Pengiriman
		  </Card.Header>
		  <Card.Body>
			<p className="text-center text-muted">Lokasi penjual atau kurir tidak valid.</p>
		  </Card.Body>
		</Card>
	  );
	}
  
	const sellerPosition = [sellerLat, sellerLng];
	const customerPosition = [customerLat, customerLng];
	const courierPosition = [courierLat, courierLng];
  
	return (
	  <Card className="mb-4 map-card">
		<Card.Header className="bg-primary text-white">
		  Pelacakan Pengiriman
		</Card.Header>
		<Card.Body style={{ height: '400px' }}>
		  <MapContainer
			center={courierPosition}
			zoom={13}
			scrollWheelZoom={false}
			style={{ height: '100%', width: '100%' }}
		  >
			<TileLayer
			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
  
			{/* Seller Marker */}
			<Marker position={sellerPosition}>
			  <Popup>
				<div>
				  <strong>Lokasi Penjual</strong><br />
				  {seller?.seller_address || 'Alamat penjual tidak tersedia'}
				</div>
			  </Popup>
			</Marker>

			{/* customer Marker */}
			<Marker position={customerPosition}>
			  <Popup>
				<div>
				  <strong>Lokasi Saya</strong><br />
				  {order.shipping_cost[0]?.address || 'Alamat penjual tidak tersedia'}
				</div>
			  </Popup>
			</Marker>
  
			{/* Courier Marker */}
			<Marker position={courierPosition}>
			  <Popup>
				<div>
				  <strong>Lokasi Kurir</strong><br />
				  {order.courier?.name || 'N/A'}<br />
				  {order.courier?.phone_number || 'N/A'}
				</div>
			  </Popup>
			</Marker>
		  </MapContainer>
		</Card.Body>
	  </Card>
	);
  };
  
  const safeFormatDate = (date, dateFormat, locale) => {
	if (!date || !isValid(new Date(date))) {
	  return 'Tanggal tidak valid';
	}
	return format(new Date(date), dateFormat, { locale });
  };
  
  const Timeline = ({ order }) => {
	const statusHistory = [
	  {
		status: 'Pesanan Dibuat',
		timestamp: order.order_date,
		location: order.shipping_cost?.address || 'Alamat tidak tersedia' // 1. Tambahkan optional chaining
	  },
	  {
		status: 'Pembayaran',
		timestamp: order.payment?.payment_date, // 2. Gunakan optional chaining di sini
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
	const { fetchOrder, orders, fetchPayment, payments, updateOrderStatus, fetchHistories } = useProductStore();
  
	useEffect(() => {
	  const loadData = async () => {
		try {
		  await fetchOrder();
		  await fetchPayment();
		  await fetchHistories();
		} catch (error) {
		  toast.error("Gagal memuat data");
		}
	  };
	  loadData();
	}, [fetchOrder, fetchPayment, fetchHistories]);
  
	const isLoading = !orders;
	const filteredOrders = (orders || []).filter(order => {
	  const status = order.payment_status?.toLowerCase();
	  return status === activeTab.toLowerCase();
	});
  
	const getOrderSummary = (order) => {
	  const items = order.items || [];
	  const subtotal = items.reduce((sum, item) => {
		const price = item.price || 0;
		const quantity = item.quantity || 0;
		return sum + price * quantity;
	  }, 0);
	  const shipping = order.shipping_cost?.shipping_cost || 0;
	  const total = subtotal + shipping;
	  return { subtotal, shipping, total };
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
				<OrderMap order={selectedOrder} />
			  </Col>
			  <Col md={6}>
				<Timeline order={selectedOrder} />
			  </Col>
			</Row>
		  )}
  
		  {isLoading ? (
			<div className="text-center mt-5">
			  <Spinner animation="border" variant="primary" />
			  <p className="mt-3">Memuat data pesanan...</p>
			</div>
		  ) : filteredOrders.length > 0 ? (
			filteredOrders.map(order => {
			  const summary = getOrderSummary(order);
			  return (
				<Card key={`${order.order_id}-${order.order_code}`} className="mb-4 shadow">
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
 				  {order.items.map((item, idx) => (
					<div key={`${item.product_id}-${idx}`} className="product-item mb-4">
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
							  Stok: {item.stock || 0}
							</Badge>
						  </div>
						  <div className="d-flex justify-content-between align-items-center">
							<div>
							  <span className="text-primary fw-bold me-2">
								Rp{(item.price || 0).toLocaleString()}
							  </span>
							  <span className="text-muted">x{item.quantity || 0}</span>
							</div>
							<span className="text-success fw-bold">
							  Rp{((item.price || 0) * (item.quantity || 0)).toLocaleString()}
							</span>
						  </div>
						</Col>
					  </Row>
					</div>
				  ))}
				</Col>
	  
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