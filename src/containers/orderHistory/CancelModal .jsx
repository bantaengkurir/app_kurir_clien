import { Button, Card } from "react-bootstrap";
import { id } from 'date-fns/locale/id';

export const CancelModal = ({ show, onHide, order, onConfirm, safeFormatDate }) => {
  const total_price = parseFloat(order.total) + parseFloat(order.shipping_cost[0]?.shipping_cost || 0);

  return (
    <div className={`modal-1-overlay ${show ? "open" : ""}`}>
      <div className="modal-1-modal">
        <Card.Header>
          <Card.Title>Konfirmasi Pembatalan Pesanan</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Apakah Anda yakin ingin <strong>membatalkan pesanan</strong> ini?</p>
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
          <Button variant="secondary" onClick={onHide}>
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Ya, Batalkan Pesanan
          </Button>
        </Card.Footer>
      </div>
    </div>
  );
};