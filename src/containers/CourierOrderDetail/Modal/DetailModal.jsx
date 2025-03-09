// import { Button, Card, Col, Spinner } from "react-bootstrap";
// import { id } from 'date-fns/locale/id';
// import { Modal } from 'react-bootstrap';

// export const DetailModal = ({ show, onHide, order, onConfirm, safeFormatDate }) => {


// console.log("ini order", order)
// const total_price = parseFloat(order.total) + parseFloat(order.shipping_cost[0]?.shipping_cost || 0);

//   return (
//     <div className={`modal-1-overlay ${show ? "open" : ""}`}>
//       <div className="modal-1-modal">
// 	  <Card.Header>
//         <Card.Title>Konfirmasi Pesanan Diterima</Card.Title>
//       </Card.Header>
//       <Card.Body>
//         <p>Apakah Anda yakin ingin menandai pesanan ini sebagai <strong>Diterima</strong>?</p>
//         <div>
//           <strong>Detail Pesanan:</strong>
//           <ul className="list-group list-group-horizontal">
// 			<div className="me-3">
// 			<li>ID Pesanan </li>
//             <li>Nama Kurir </li>
//             <li>Total Pembayaran </li>
//             <li>Tanggal Pesanan </li>
// 			</div>
// 			<div>
//             <li> : {order.order_code}</li>
//             <li> : {order.courier?.name || 'N/A'}</li>
//             <li> : Rp{total_price.toLocaleString()}</li>
//             <li> : {safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}</li>
// 		</div>
// 		  </ul>
//         </div>
//       </Card.Body>
//       <Card.Footer className="d-flex justify-content-center gap-2">
//         <Button  variant="secondary" onClick={onHide}>
//           Batal
//         </Button>
//         <Button  variant="success" onClick={onConfirm}>
//           Ya, Pesanan Diterima
//         </Button>
//       </Card.Footer>
//       </div>
//     </div>
//   );
// };

import { Badge, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import useOrderCourierStore from "../../../store/useOrderCourierStore";
import useProductStore from "../../../store/useProductStore";
import { useEffect, useState } from "react";
import { format, isValid } from "date-fns";
import { id as localeId } from 'date-fns/locale/id'; // Ubah nama impor untuk menghindari konflik

export const DetailModal = ({ show, onHide, order }) => {
  const userData = useProductStore((state) => state.userData);
  const { fetchOrderById, courierOrderById } = useOrderCourierStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchOrderById(order.id);
      setLoading(false);
    };
    loadData();
  }, [order.id, fetchOrderById]);

  const safeFormatDate = (date, dateFormat) => {
    if (!date || !isValid(new Date(date))) return 'Tanggal tidak valid';
    return format(new Date(date), dateFormat, { locale: localeId }); // Gunakan localeId di sini
  };

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
      const price = parseFloat(item.price) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
    const shipping = parseFloat(order.shipping_cost?.[0]?.shipping_cost) || 0;
    return { subtotal, shipping, total: subtotal + shipping };
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Memuat data pesanan...</p>
      </div>
    );
  }

  if (!courierOrderById) {
    return (
      <div className="text-center mt-5">
        <p>Pesanan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className={`modal-1-overlay ${show ? "open" : ""}`}>
      <div className="modal-1-modal" style={{ padding: '20px', fontSize: '14px' }}>
        {/* Header Section */}
        <div className="text-center mb-3">
          <h5 style={{ fontWeight: 'bold' }}>Diterima</h5>
        </div>

        {/* Buyer Info Section */}
        <div className="mb-3">
          <div><strong>Pembeli:</strong> {order.customer?.name || 'Customer'}</div>
          <div><strong>Pembayaran Tunai</strong></div>
          <div className="d-flex justify-content-between">
            <span className="mt-1">Terima Pembayaran dari Pembeli</span>
            <span>
              <p>Rp{getOrderSummary(courierOrderById).total.toLocaleString('id-ID')}</p>
            </span>
          </div>
        </div>

        <strong className="me-2">Rincian Barang :</strong>
        <Card.Body>
          <h4 className="mb-4">Detail Pesanan (ID: {order.id})</h4> {/* Gunakan order.id, bukan id dari date-fns */}
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

        {/* Order Number */}
        <div className="mb-3">
          <div>Kode Pesanan {order.order_code}</div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button variant="success" onClick={onHide} className="w-100">
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};