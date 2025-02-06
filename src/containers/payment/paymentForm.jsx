// paymentForm.jsx
import { useState } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import "./style.css"

const PaymentForm = ({ isOpen, toggleModal, show, order, onClose, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const paymentData = {
        payment_method: paymentMethod,
        bank_name: paymentMethod === 'transfer' ? 'BCA' : null,
        account_number: paymentMethod === 'transfer' ? '1234567890' : null
      };
      
      await onSubmit(paymentData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
	<div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>

	
    <Modal 
      show={show} 
      onHide={onClose} 
      centered
      size="lg" // Tambahkan ukuran modal
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary">
            <i className="bi bi-credit-card me-2"></i>
            Proses Pembayaran - Order #{order?.orderId}
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="pt-0">
          {/* ... konten form ... */}
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button 
            variant="secondary" 
            onClick={onClose}
            className="rounded-pill px-4"
          >
            Batal
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            className="rounded-pill px-4"
            disabled={isProcessing || order?.paymentStatus === 'completed'}
          >
            {isProcessing ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Memproses...
              </>
            ) : (
              'Konfirmasi Pembayaran'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
	</div>
  );
};

export default PaymentForm;