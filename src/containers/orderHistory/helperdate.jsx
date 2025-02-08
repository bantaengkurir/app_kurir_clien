import { format, isValid } from 'date-fns'; // Import isValid from date-fns
import { id } from 'date-fns/locale';

// Helper function to safely format dates
const safeFormatDate = (date, dateFormat, locale) => {
  if (!date || !isValid(new Date(date))) {
    return 'Tanggal tidak valid'; // Fallback for invalid dates
  }
  return format(new Date(date), dateFormat, { locale });
};

// Usage in your component
const Timeline = ({ order }) => {
  const statusHistory = [
    {
      status: 'Pesanan Dibuat',
      timestamp: order.order_date,
      location: order.shipping_cost.address
    },
    {
      status: 'Pembayaran',
      timestamp: order.payment.payment_date,
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

export default Timeline;