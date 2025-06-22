// // import { id } from 'date-fns/locale/id';
// // import { Modal, Button } from 'react-bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// // export const ConfirmationModal = ({ show, onHide, order, onConfirm, safeFormatDate }) => {
// //   return (
// //     <Modal show={show} onHide={onHide} centered backdrop="static">
// //       <Modal.Header closeButton>
// //         <Modal.Title>Konfirmasi Pesanan Diterima</Modal.Title>
// //       </Modal.Header>
// //       <Modal.Body>
// //         <p>Apakah Anda yakin ingin menandai pesanan ini sebagai <strong>Diterima</strong>?</p>
// //         <div>
// //           <strong>Detail Pesanan:</strong>
// //           <ul>
// //             <li>ID Pesanan: {order.order_code}</li>
// //             <li>Nama Kurir: {order.courier?.name || 'N/A'}</li>
// //             <li>Total Pembayaran: Rp{order.total?.toLocaleString() || 'N/A'}</li>
// //             <li>Tanggal Pesanan: {safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}</li>
// //           </ul>
// //         </div>
// //       </Modal.Body>
// //       <Modal.Footer>
// //         <Button variant="secondary" onClick={onHide}>
// //           Batal
// //         </Button>
// //         <Button variant="success" onClick={onConfirm}>
// //           Ya, Pesanan Diterima
// //         </Button>
// //       </Modal.Footer>
// //     </Modal>
// //   );
// // };

// import { Button, Card, Col, Spinner } from "react-bootstrap";
// import { id } from 'date-fns/locale/id';
// import { Modal } from 'react-bootstrap';

// export const ConfirmationModal = ({ show, onHide, order, onConfirm, safeFormatDate }) => {


// // console.log("ini order", order)
// const total_price = parseFloat(order.total) + parseFloat(order.shipping_cost[0]?.shipping_cost || 0);

//   return (
//     <div className={`modal-1-overlay ${show ? "open" : ""}`}>
//       <div style={{position: "fixed",
//         backgroundColor: "white",
//   borderRadius: "12px",
//   padding: "2rem",
//   top: "50%",
//   left:" 50%",
//   transform: "translate(-50%, -50%)"}}>
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

import { id } from 'date-fns/locale/id';

export const ConfirmationModal = ({ show, onHide, order, onConfirm, safeFormatDate }) => {
  const total_price = parseFloat(order.total) + parseFloat(order.shipping_cost[0]?.shipping_cost || 0);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-xl font-bold">Konfirmasi Pesanan Diterima</h3>
        </div>
        
        <div className="mb-6">
          <p className="mb-4">Apakah Anda yakin ingin menandai pesanan ini sebagai <strong>Diterima</strong>?</p>
          
          <div>
            <strong className="block mb-2">Detail Pesanan:</strong>
            <div className="flex">
              <div className="mr-4 space-y-2">
                <div>ID Pesanan</div>
                <div>Nama Kurir</div>
                <div>Total Pembayaran</div>
                <div>Tanggal Pesanan</div>
              </div>
              <div className="space-y-2">
                <div>: {order.order_code}</div>
                <div>: {order.courier?.name || 'N/A'}</div>
                <div>: Rp{total_price.toLocaleString()}</div>
                <div>: {safeFormatDate(order.order_date, 'EEEE, d MMMM yyyy HH:mm', id)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4 border-t">
          <button
            onClick={onHide}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors"
          >
            Ya, Pesanan Diterima
          </button>
        </div>
      </div>
    </div>
  );
};