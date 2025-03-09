import React, { useEffect, useRef } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import useOrderCourierStore from '../../store/useOrderCourierStore';
import toast from 'react-hot-toast';
import notif from "../../assets/sound/ada_pesanan.mp3";

const OrderPopup = ({ show, onHide, orderDetails }) => {
  const updateOrderStatus = useOrderCourierStore((state) => state.updateOrderStatus);
  const audioRef = useRef(null);

  useEffect(() => {
    if (show && audioRef.current) {
      audioRef.current.play();
    }
  }, [show]);


  if (!orderDetails) return null;

const handleUpdate = async () => {
  try {
    // Data yang akan dikirim ke backend
    const newStatus = {
      status: 'process', // Update status order menjadi 'process'
      note: 'Pesanan sudah diterima oleh kurir', // Catatan untuk history
      availability: 'unready', // Update availability kurir menjadi 'unready'
    };

    // Panggil fungsi updateOrderStatus dari store
    await updateOrderStatus(orderDetails.order_id, newStatus);

    // Tutup modal setelah update berhasil
    onHide();
    toast.success("pesanan berhasil diclaim")
  } catch (error) {
    console.error("Gagal memperbarui status pesanan:", error);
  }
};


  return (
    <div className={`modal-1-overlay ${show ? "open" : ""}`}>
      <div className="modal-1-modal">
    <Card show={show} onHide={onHide}>
      <Card.Header closeButton>
        <Card.Title>Pesanan Baru</Card.Title>
      </Card.Header>
      <Card.Body>
        <p>Order ID: {orderDetails.order_id}</p>
        <p>Total: Rp{orderDetails.total}</p>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x Rp{item.price}
            </li>
          ))}
        </ul>
      </Card.Body>
      <Card.Footer>
        {/* <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button> */}
        <Button className='w-100' variant="primary" onClick={handleUpdate}>
          Terima Pesanan
        </Button>
      </Card.Footer>
    </Card>
    </div>
    <audio ref={audioRef} src={notif} preload="auto" />
    </div>
  );
};

export default OrderPopup;
