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
  import { format } from 'date-fns';
  import { id } from 'date-fns/locale';
//   import Modal1 from './modal1';
  import toast from "react-hot-toast";
  import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png"
  import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png"
  import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png"
  
  // Fix leaflet marker icons
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
	iconRetinaUrl: {markericon2x},
	iconUrl: {markericon},
	shadowUrl: {markericonshadow},
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
  
  const OrderMap = ({ shippingHistory }) => {
	const position = [-7.2575, 112.7521]; // Default Surabaya coordinates
  
	return (
	  <Card className="mb-4 map-card">
		<Card.Header className="bg-primary text-white">
		  Pelacakan Pengiriman
		</Card.Header>
		<Card.Body style={{ height: '400px' }}>
		  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
			<TileLayer
			  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{shippingHistory?.map((history, idx) => (
			  <Marker key={idx} position={[history.lat, history.lng]}>
				<Popup>
				  <div>
					<strong>{history.status}</strong><br />
					{history.location}<br />
					{format(new Date(history.timestamp), 'dd MMM yyyy HH:mm')}
				  </div>
				</Popup>
			  </Marker>
			))}
		  </MapContainer>
		</Card.Body>
	  </Card>
	);
  };
  
  const Timeline = ({ history }) => {
	return (
	  <Card className="timeline-card">
		<Card.Header className="bg-info text-white">
		  Riwayat Pengiriman
		</Card.Header>
		<Card.Body>
		  {history?.map((item, idx) => (
			<div key={idx} className="timeline-item">
			  <div className="timeline-marker"></div>
			  <div className="timeline-content">
				<h6 className="mb-1">{item.status}</h6>
				<small className="text-muted">
				  {format(new Date(item.timestamp), 'dd MMM yyyy HH:mm')}
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
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const { fetchOrder, orders, fetchPayment, createPayment, payments, updateOrderStatus } = useProductStore();
  
	// Filter orders based on active tab
	const filteredOrders = orders.filter(order => {
	  const paymentStatus = payments.find(p => p.order_id === order.order_id)?.status;
	  return paymentStatus === activeTab;
	});
  
	// Modified group function with status
	const groupOrdersByStatus = (orders) => {
	  // ... (similar to previous group function but include status)
	};
  
	// Rest of your existing code...
  
	return (
	  <>
		<Navbar />
		<div className="container-fluid py-4 orders-container">
		  <h2 className="text-center mb-4 fw-bold text-primary">Riwayat Pesanan</h2>
		  
		  <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />
  
		  {['process', 'completed'].includes(activeTab) && (
			<Row className="mb-4">
			  <Col md={6}>
				<OrderMap shippingHistory={selectedOrder?.shippingHistory} />
			  </Col>
			  <Col md={6}>
				<Timeline history={selectedOrder?.shippingHistory} />
			  </Col>
			</Row>
		  )}
  
		  {filteredOrders.length > 0 ? (
			filteredOrders.map(order => (
			  <Card key={order.order_id} className="mb-4 shadow">
				{/* Existing order card content */}
				{activeTab === 'process' && (
				  <div className="shipping-updates">
					<Card.Header className="bg-warning text-dark">
					  Update Pengiriman
					</Card.Header>
					<Card.Body>
					  {order.shippingHistory?.map((update, idx) => (
						<div key={idx} className="shipping-step">
						  <div className="step-icon">
							<i className={`bi bi-${getStatusIcon(update.status)}`}></i>
						  </div>
						  <div className="step-content">
							<h6>{update.status}</h6>
							<small>{format(new Date(update.timestamp), 'dd MMM HH:mm')}</small>
							<p className="mb-0">{update.location}</p>
						  </div>
						</div>
					  ))}
					</Card.Body>
				  </div>
				)}
			  </Card>
			))
		  ) : (
			<div className="text-center mt-5">
			  {orders.length === 0 ? (
				<>
				  <Spinner animation="border" variant="primary" />
				  <p className="mt-3">Memuat data pesanan...</p>
				</>
			  ) : (
				<div className="alert alert-info">
				  Tidak ada pesanan dengan status ini
				</div>
			  )}
			</div>
		  )}
  
		  {/* Existing modal code */}
		</div>
	  </>
	);
  };
  
  // Helper function for status icons
  const getStatusIcon = (status) => {
	const icons = {
	  'dikirim': 'truck',
	  'diproses': 'gear',
	  'tiba': 'check2-circle',
	  'diterima': 'box-seam'
	};
	return icons[status.toLowerCase()] || 'info-circle';
  };
  
  export default Index;