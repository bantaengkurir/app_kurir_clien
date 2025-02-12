// src/components/OrderHistories.js
import { useEffect } from 'react';
import useProductStore from '../../store/useProductStore'; // Sesuaikan path ke store
import { Card } from 'react-bootstrap';

const OrderHistories = ({ orderId }) => {
    const { histories, fetchHistoriesById } = useProductStore();

	console.log("histories ini", histories.order_history)

    // Ambil data histories saat komponen di-mount atau orderId berubah
    useEffect(() => {
        if (orderId) {
            fetchHistoriesById(orderId);
        }
    }, [orderId, fetchHistoriesById]);

    if (!orderId) {
        return <p>Order ID tidak valid.</p>;
    }

    if (histories.length === 0) {
        return <p>Tidak ada riwayat pesanan.</p>;
    }
    

    return (
        <Card className="timeline-card">
		<Card.Header className="bg-info text-white">
		  Riwayat Status
		</Card.Header>
		<Card.Body>
		  {histories.order_history.map((item, idx) => (
			<div key={idx} className="timeline-item">
			  <div className="timeline-marker"></div>
			  <div className="timeline-content">
				<h6 className="mb-1">{item.status}</h6>
				<small className="text-muted">
                <p><strong>Tanggal:</strong> {new Date(item.created_at).toLocaleString()}</p>
				</small>
				<p className="mb-0 text-muted">Kterangan : {item.note}</p>
			  </div>
			</div>
		  ))}
		</Card.Body>
	  </Card>
    );
};

export default OrderHistories;