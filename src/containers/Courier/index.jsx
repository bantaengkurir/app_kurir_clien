// src/App.js
import { useState, useEffect } from 'react';
import CourierLocationHandler from './HandlerLocationCourier';
import useProductStore from '../../store/useProductStore';
import Navbar from '../../components/Navbar';
import useOrderCourierStore from '../../store/useOrderCourierStore';
import { Badge, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

function Courier() {
  const userData = useProductStore((state) => state.userData);
  const { fetchOrder, courierOrders } = useOrderCourierStore();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      await fetchOrder();
      setLoading(false);
    };
    loadData();
  }, [fetchOrder]);

  const safeFormatDate = (date, dateFormat, locale) => {
    if (!date || !isValid(new Date(date))) return 'Tanggal tidak valid';
    return format(new Date(date), dateFormat, { locale });
  };

  const groupItemsBySeller = (items) => {
    return items.reduce((acc, item) => {
      // Gunakan seller_name sebagai kunci unik
      const sellerKey = item.seller_name;
    
      if (!acc[sellerKey]) {
      acc[sellerKey] = {
        sellerInfo: {
        id: sellerKey, // Gunakan seller_name sebagai ID sementara
        name: item.seller_name,
        address: item.seller_address,
        image: item.seller_profile_image,
        latitude: item.seller_latitude, // Tambahkan latitude
        longitude: item.seller_longitude, // Tambahkan longitude
        },
        items: [],
      };
      }
      acc[sellerKey].items.push(item);
      return acc;
    }, {});
    };

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

  const groupOrdersByDateTime = (orders) => {
    return orders.reduce((acc, order) => {
      const orderDate = new Date(order.order_date);
      if (!isValid(orderDate)) return acc;
      const dateTimeKey = format(orderDate, 'yyyy-MM-dd HH:mm:ss', { locale: id });
      if (!acc[dateTimeKey]) {
        acc[dateTimeKey] = [];
      }
      acc[dateTimeKey].push(order);
      return acc;
    }, {});
  };

  // Filter orders with status "process"
  const filteredOrders = courierOrders.filter(order => order.status === 'process');

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Memuat data pesanan...</p>
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
            <button>Logout</button>
            {userData.role === 'courier' && (
              <CourierLocationHandler userId={userData.id} role={userData.role} />
            )}
          </>
        )}
      </div>
      <Container className="my-4">
        <Card>
          <Card.Body>
            <h4 className="mb-4">Daftar Pesanan (Status: Process)</h4>
            {!filteredOrders || filteredOrders.length === 0 ? (
              <div className="text-center mt-5">
                <p>Tidak ada pesanan yang ditemukan.</p>
              </div>
            ) : (
              Object.entries(groupOrdersByDateTime(filteredOrders)).map(([dateKey, ordersInGroup]) => (
                <div key={dateKey} className="datetime-group mb-5">
                  <div className="datetime-header bg-light p-3 rounded-top">
                    <h5 className="mb-0">
                      {safeFormatDate(ordersInGroup[0].order_date, 'd MMMM yyyy, HH:mm:ss', id)}
                    </h5>
                  </div>
                  {ordersInGroup.map((order) => {
                    const groupedSellers = groupItemsBySeller(order.items);
                    const orderSummary = getOrderSummary(order);
                    return (
                      <button className='w-100 '  key={order.order_id} onClick={() => navigate(`/courier/${order.order_id}/courier&order_detail`)}>
                      <Card  className="rounded-0 rounded-bottom mb-4">
                        {Object.values(groupedSellers).map((seller) => (
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
                                    <Col className='text-start' xs={9}>
                                      <h6>{item.name}</h6>
                                      <div className="text-muted">
                                        {
                                        item.description
                                        .length > 45
                                          ? `${item.description.slice(0, 45)}...`
                                          : 
                                          item.description}
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
                                Total Pesanan: Rp{orderSummary.total.toLocaleString('id-ID')}
                                <span className="text-muted ms-2">
                                  (Termasuk ongkos kirim Rp{orderSummary.shipping.toLocaleString('id-ID')})
                                </span>
                              </p>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Courier;