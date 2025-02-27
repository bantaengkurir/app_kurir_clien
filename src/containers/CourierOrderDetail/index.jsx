// // src/App.js
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; // Import useParams
// import CourierLocationHandler from './HandlerLocationCourier';
// import useProductStore from '../../store/useProductStore';
// import Navbar from '../../components/Navbar';
// import useOrderCourierStore from '../../store/useOrderCourierStore';
// import { Badge, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
// import { format, isValid } from 'date-fns';
// import { id } from 'date-fns/locale';

// function CourierOrderDetail() {
//   const { id } = useParams(); // Ambil id dari URL
//   const userData = useProductStore((state) => state.userData);
//   const { fetchOrderById, courierOrderById } = useOrderCourierStore();
//   const [loading, setLoading] = useState(true);
//   const [orderDetails, setOrderDetails] = useState(null); // State untuk menyimpan detail pesanan

//   useEffect(() => {
//     const loadData = async () => {
//       // Panggil fetchOrder dengan id yang diambil dari useParams
//       await fetchOrderById(id); // Asumsikan fetchOrder menerima id sebagai parameter
//       setLoading(false);
//     };
//     loadData();
//   }, [ id, fetchOrderById,]); // Tambahkan id ke dependency array

//   console.log("ini order id", courierOrderById)

//   // Setelah data diambil, cari pesanan yang sesuai dengan id
// //   useEffect(() => {
// //     if (courierOrderById.length > 0) {
// //       const order = courierOrderById.find(order => order.id === id); // Cari pesanan berdasarkan id

// // 	  console.log("order", order)
// //       setOrderDetails(order); // Simpan detail pesanan ke state
// //     }
// //   }, [courierOrderById, id]);

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
//       const price = parseFloat(item.price) || 0;
//       const quantity = parseFloat(item.quantity) || 0;
//       return sum + price * quantity;
//     }, 0);
//     const shipping = parseFloat(order.shipping_cost?.[0]?.shipping_cost) || 0;
//     return { subtotal, shipping, total: subtotal + shipping };
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="mt-3">Memuat data pesanan...</p>
//       </div>
//     );
//   }

//   if (!courierOrderById) {
//     return (
//       <div className="text-center mt-5">
//         <p>Pesanan tidak ditemukan.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="App" style={{ marginTop: '100px' }}>
//         {userData && (
//           <>
//             <h2>Halo, {userData.role}</h2>
//             <button>Logout</button>
//             {userData.role === 'courier' && (
//               <CourierLocationHandler userId={userData.id} role={userData.role} />
//             )}
//           </>
//         )}
//       </div>
//       <Container className="my-4">
//         <Card>
//           <Card.Body>
//             <h4 className="mb-4">Detail Pesanan (ID: {id})</h4>
//             <div className="datetime-group mb-5">
//               <Card className="rounded-0 rounded-bottom mb-4">
//                 {Object.values(groupItemsBySeller(courierOrderById.items)).map((seller) => (
//                   <div key={seller.sellerInfo.id}>
//                     <Card className="mb-3 border-0">
//                       <Card.Header className="bg-light">
//                         <div className="d-flex align-items-center">
//                           <img
//                             src={seller.sellerInfo.image}
//                             alt={seller.sellerInfo.name}
//                             className="rounded-circle me-2"
//                             style={{ width: '30px', height: '30px' }}
//                           />
//                           <h5 className="mb-0">{seller.sellerInfo.name}</h5>
//                         </div>
//                       </Card.Header>
//                       {seller.items.map((item) => (
//                         <div key={item.product_id} className="product-item border-0 p-3">
//                           <Row className="align-items-center lh-1">
//                             <Col xs={3}>
//                               <img
//                                 src={item.image_url}
//                                 alt={item.name}
//                                 className="img-fluid rounded product-image"
//                               />
//                             </Col>
//                             <Col xs={9}>
//                               <h6>{item.name}</h6>
//                               <div className="text-muted">
//                                 {item.description.length > 45
//                                   ? `${item.description.slice(0, 45)}...`
//                                   : item.description}
//                               </div>
//                               <div className="mt-2">
//                                 <Badge bg="secondary">
//                                   {item.quantity} x Rp{parseFloat(item.price).toLocaleString('id-ID')}
//                                 </Badge>
//                               </div>
//                             </Col>
//                           </Row>
//                         </div>
//                       ))}
//                     </Card>
//                   </div>
//                 ))}
//                 <div className="p-3 border-top">
//                   <Row className="text-end">
//                     <Col>
//                       <p className="mb-1">
//                         Total Pesanan: Rp{getOrderSummary(courierOrderById).total.toLocaleString('id-ID')}
//                         <span className="text-muted ms-2">
//                           (Termasuk ongkos kirim Rp{getOrderSummary(courierOrderById).shipping.toLocaleString('id-ID')})
//                         </span>
//                       </p>
//                     </Col>
//                   </Row>
//                 </div>
//               </Card>
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>
//     </>
//   );
// }

// export default CourierOrderDetail;


import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CourierLocationHandler from './HandlerLocationCourier';
import useProductStore from '../../store/useProductStore';
import Navbar from '../../components/Navbar';
import useOrderCourierStore from '../../store/useOrderCourierStore';
import { Badge, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import "./style.css";

// Fix leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function CourierOrderDetail() {
  const { id } = useParams();
  const userData = useProductStore((state) => state.userData);
  const { fetchOrderById, courierOrderById } = useOrderCourierStore();
  const [loading, setLoading] = useState(true);

  // Koordinat contoh (harap ganti dengan data sebenarnya dari API)
  const [locations, setLocations] = useState({
    customer: { lat: -6.200000, lng: 106.816666 }, // Contoh koordinat Jakarta
    sellers: [{ lat: -6.175110, lng: 106.865036 }] // Contoh koordinat Jakarta Selatan
  });

//   useEffect(() => {
//     const loadData = async () => {
//       await fetchOrderById(id);
//       setLoading(false);
//     };
//     loadData();
//   }, [id, fetchOrderById]);

useEffect(() => {
	const loadData = async () => {
	  await fetchOrderById(id);
	  setLoading(false);
  
	  // Update lokasi customer dan seller berdasarkan data dari API
	  if (courierOrderById) {
		const customerLat = parseFloat(courierOrderById.shipping_cost[0]?.latitude); // Pastikan properti ini ada di API
		const customerLng = parseFloat(courierOrderById.shipping_cost[0]?.longitude); // Pastikan properti ini ada di API
  
		const sellers = courierOrderById.items.map((item) => ({
		  lat: parseFloat(item.seller_latitude),
		  lng: parseFloat(item.seller_longitude),
		}));
  
		setLocations({
		  customer: { lat: customerLat, lng: customerLng }, // Update lokasi customer
		  sellers, // Update lokasi seller
		});
	  }
	};
	loadData();
  }, [id, fetchOrderById]);

  console.log("ini order id", courierOrderById)
  

  const safeFormatDate = (date, dateFormat, locale) => {
    if (!date || !isValid(new Date(date))) return 'Tanggal tidak valid';
    return format(new Date(date), dateFormat, { locale });
  };

  // const groupItemsBySeller = (items) => {
	// return items.reduce((acc, item) => {
	//   // Gunakan seller_name sebagai kunci unik
	//   const sellerKey = item.seller_name;
  
	//   if (!acc[sellerKey]) {
	// 	acc[sellerKey] = {
	// 	  sellerInfo: {
	// 		id: sellerKey, // Gunakan seller_name sebagai ID sementara
	// 		name: item.seller_name,
	// 		address: item.seller_address,
	// 		image: item.seller_profile_image,
	// 		latitude: item.seller_latitude, // Tambahkan latitude
	// 		longitude: item.seller_longitude, // Tambahkan longitude
	// 	  },
	// 	  items: [],
	// 	};
	//   }
	//   acc[sellerKey].items.push(item);
	//   return acc;
	// }, {});
  // };


  const groupItemsBySeller = (items) => {
    if (!items || !Array.isArray(items)) {
      return {}; // Kembalikan objek kosong jika items tidak terdefinisi atau bukan array
    }
    return items.reduce((acc, item) => {
      const sellerKey = item.seller_name;
      if (!acc[sellerKey]) {
        acc[sellerKey] = {
          sellerInfo: {
            id: sellerKey,
            name: item.seller_name,
            address: item.seller_address,
            image: item.seller_profile_image,
            latitude: item.seller_latitude,
            longitude: item.seller_longitude,
          },
          items: [],
        };
      }
      acc[sellerKey].items.push(item);
      return acc;
    }, {});
  };



  console.log("group seller", groupItemsBySeller(courierOrderById.items))

  const getOrderSummary = (order) => {
    const items = order.items || [];
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    const shipping = parseFloat(order.shipping_cost?.[0]?.shipping_cost) || 0;
    return { subtotal, shipping, total: subtotal + shipping };
  };

  const handleAddressClick = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Memuat data pesanan...</p>
      </div>
    );
  }

  if (!courierOrderById || !courierOrderById.items) {
    return (
      <div className="text-center mt-5">
        <p>Data pesanan belum tersedia.</p>
      </div>
    );
  }



  return (
    <>
      <Navbar />
      <div className="App" style={{ marginTop: '100px' }}>
        {userData && (
          <>
            <h2>Halo, {userData.role}</h2>
            {userData.role === 'courier' && (
              <CourierLocationHandler userId={userData.id} role={userData.role} />
            )}
          </>
        )}
      </div>
      
      <Container className="my-4">
        {/* Peta Lokasi */}
        <Card className="mb-4">
          <Card.Body>
            <h4 className="mb-3">Peta Lokasi Pengiriman</h4>
            <div style={{ height: '400px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
              <MapContainer
                center={[locations.customer.lat, locations.customer.lng]}
                zoom={20}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Marker Customer */}
                <Marker position={[locations.customer.lat, locations.customer.lng]}>
                  <Popup>Lokasi Customer</Popup>
                </Marker>

{/* Marker Seller(s) */}
{Object.values(groupItemsBySeller(courierOrderById.items)).map((seller, index) => (
  <Marker
    key={index}
    position={[parseFloat(seller.sellerInfo.latitude), parseFloat(seller.sellerInfo.longitude)]}
  >
    <Popup>Lokasi Seller ({seller.sellerInfo.name})</Popup>
  </Marker>
))}
              </MapContainer>
            </div>
          </Card.Body>
        </Card>

        {/* Card Alamat */}
        <Row className="mb-4">
          {/* Alamat Customer */}
          <Col md={6} className="mb-3">
            <Card 
              className="h-100 shadow-sm clickable-card"
              onClick={() => handleAddressClick(courierOrderById.shipping_cost[0]?.address)}
            >
              <Card.Body>
                <Card.Title>📍 Alamat Customer</Card.Title>
                <Card.Text className="text-muted">
                  {courierOrderById.shipping_cost[0]?.address}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

{/* Alamat Seller(s) */}
<Row className="mb-4 w-100">
  {Object.values(groupItemsBySeller(courierOrderById.items)).map((seller) => (
    <Col md={6} className="mb-3" key={seller.sellerInfo.id}>
      <Card 
        className="w-100 shadow-sm clickable-card"
        onClick={() => handleAddressClick(seller.sellerInfo.address)}
      >
        <Card.Body >
          <Card.Title>🏪 {seller.sellerInfo.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Alamat Seller</Card.Subtitle>
          <Card.Text>{seller.sellerInfo.address}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
        </Row>

        {/* Detail Pesanan (existing code) */}
        <Card>
          <Card.Body>
			<h4 className="mb-4">Detail Pesanan (ID: {id})</h4>
             <div className="datetime-group mb-5">
               <Card className="rounded-0 rounded-bottom mb-4">
                 {Object.values(groupItemsBySeller(courierOrderById.items)).map((seller) => (
                  <div key={seller.sellerInfo.id}>
                    <Card className="mb-3 border-0">
                      <Card.Header className="bg-light">
                        <div className="d-flex align-items-center">
                          <img
                            src={seller.sellerInfo.image}
                            alt={seller.sellerInfo.name}
                            className="rounded-circle me-2"
                            style={{ width: '30px', height: '30px' }}
                          />
                          <h5 className="mb-0">{seller.sellerInfo.name}</h5>
                        </div>
                      </Card.Header>
                      {seller.items.map((item) => (
                        <div key={item.product_id} className="product-item border-0 p-3">
                          <Row className="align-items-center lh-1">
                            <Col xs={3}>
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="img-fluid rounded product-image"
                              />
                            </Col>
                            <Col xs={9}>
                              <h6>{item.name}</h6>
                              <div className="text-muted">
                                {item.description.length > 45
                                  ? `${item.description.slice(0, 45)}...`
                                  : item.description}
                              </div>
                              <div className="mt-2">
                                <Badge bg="secondary">
                                  {item.quantity} x Rp{parseFloat(item.price).toLocaleString('id-ID')}
                                </Badge>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Card>
                  </div>
                ))}
                <div className="p-3 border-top">
                  <Row className="text-end">
                    <Col>
                      <p className="mb-1">
                        Total Pesanan: Rp{getOrderSummary(courierOrderById).total.toLocaleString('id-ID')}
                        <span className="text-muted ms-2">
                          (Termasuk ongkos kirim Rp{getOrderSummary(courierOrderById).shipping.toLocaleString('id-ID')})
                        </span>
                      </p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default CourierOrderDetail;