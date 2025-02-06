import { useState } from "react";
import Icon from "../../../img/close.svg";
import { Button, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";

const Modal1 = ({ isOpen, onClose, order, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const paymentData = {
        payment_method: paymentMethod,
        amount: order.total // Pastikan mengirim total yang benar
      };
      
      await onSubmit(paymentData);
      toast.success('Pembayaran berhasil dikonfirmasi');
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.error("Error pembayaran:", error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
      <div className="div-close">
        <button className="rounded-pill p-3 border-secondary" onClick={onClose}>
          <img src={Icon} alt="Close" />
        </button>
      </div>
      <div className="modal-1-modal">
        <form onSubmit={handleSubmit}>
          <div className="modal-header border-0 pb-0">
            <h3 className="fw-bold text-primary">
              <i className="bi bi-credit-card me-2"></i>
              Proses Pembayaran - Order #{order?.orderId}
            </h3>
          </div>
          
          <div className="modal-body pt-0">
            <div className="mb-3">
              <label>Metode Pembayaran</label>
              <select
                className="form-select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="transfer">Transfer Bank</option>
                <option value="COD">COD (Bayar di Tempat)</option>
              </select>
            </div>

            <div className="total-payment bg-light p-3 rounded">
              <h5 className="fw-bold">Total Pembayaran</h5>
              <h3 className="text-success">
                Rp{order?.total?.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="modal-footer border-0">
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
              disabled={isProcessing}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal1;