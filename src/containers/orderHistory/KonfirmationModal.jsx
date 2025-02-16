// import { id } from 'date-fns/locale/id';
// import { Modal, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export const ConfirmationModal = ({ show, onHide, order, onConfirm, safeFormatDate }) => {
//   return (
//     <Modal show={show} onHide={onHide} centered backdrop="static">
//       <Modal.Header closeButton>
//         <Modal.Title>Konfirmasi Pesanan Diterima</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <p>Apakah Anda yakin ingin menandai pesanan ini sebagai <strong>Diterima</strong>?</p>
//         <div>
//           <strong>Detail Pesanan:</strong>
//           <ul>
//             <li>ID Pesanan: {order.order_code}</li>
//             <li>Nama Kurir: {order.courier?.name || 'N/A'}</li>
//             <li>Total Pembayaran: Rp{order.total?.toLocaleString() || 'N/A'}</li>
//             <li>Tanggal Pesanan: {safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}</li>
//           </ul>
//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Batal
//         </Button>
//         <Button variant="success" onClick={onConfirm}>
//           Ya, Pesanan Diterima
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

import { Button, Card, Col, Spinner } from "react-bootstrap";
import { id } from 'date-fns/locale/id';
import { Modal } from 'react-bootstrap';

export const ConfirmationModal = ({ show, onHide, order, onConfirm, safeFormatDate }) => {


console.log("ini order", order)
const total_price = parseFloat(order.total) + parseFloat(order.shipping_cost[0]?.shipping_cost || 0);

  return (
    <div className={`modal-1-overlay ${show ? "open" : ""}`}>
      <div className="modal-1-modal">
	  <Card.Header>
        <Card.Title>Konfirmasi Pesanan Diterima</Card.Title>
      </Card.Header>
      <Card.Body>
        <p>Apakah Anda yakin ingin menandai pesanan ini sebagai <strong>Diterima</strong>?</p>
        <div>
          <strong>Detail Pesanan:</strong>
          <ul className="list-group list-group-horizontal">
			<div className="me-3">
			<li>ID Pesanan </li>
            <li>Nama Kurir </li>
            <li>Total Pembayaran </li>
            <li>Tanggal Pesanan </li>
			</div>
			<div>
            <li> : {order.order_code}</li>
            <li> : {order.courier?.name || 'N/A'}</li>
            <li> : Rp{total_price.toLocaleString()}</li>
            <li> : {safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}</li>
		</div>
		  </ul>
        </div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center gap-2">
        <Button  variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button  variant="success" onClick={onConfirm}>
          Ya, Pesanan Diterima
        </Button>
      </Card.Footer>
      </div>
    </div>
  );
};

