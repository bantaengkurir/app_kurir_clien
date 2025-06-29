// // export default Modal1;
// import { useState } from "react";
// import Icon from "../../../img/close.svg";
// import { Button, Spinner, Alert } from "react-bootstrap";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import "./modalStyle.css"; // Import your CSS file here

// const PaymentModal = ({ isOpen, onClose, order, onSubmit }) => {
//   const [paymentMethod, setPaymentMethod] = useState('transfer');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setIsProcessing(true);
//   //   setError(null);
    
//   //   try {
//   //     const paymentData = {
//   //       payment_method: paymentMethod,
//   //       amount: order.total
//   //     };
      
//   //     const response = await onSubmit(paymentData);
      
//   //     if (paymentMethod === 'transfer') {
//   //       if (response?.payment_url) {
//   //         window.open(response.payment_url, '_blank');
//   //         toast.success('Silakan selesaikan pembayaran di halaman baru');
//   //       } else {
//   //         throw new Error('Gagal mendapatkan URL pembayaran');
//   //       }
//   //     } else {
//   //       toast.success('Pembayaran COD berhasil dikonfirmasi');
//   //     }
      
//   //     onClose();
//   //     navigate("/orderhistories");
      
//   //   } catch (error) {
//   //     setError(error.message);
//   //     toast.error(`Gagal memproses pembayaran: ${error.message}`);
//   //     console.error("Payment error:", error);
//   //   } finally {
//   //     setIsProcessing(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!order) return;
    
//     setIsProcessing(true);
//     setError(null);

//     try {
//         const paymentData = {
//             payment_method: paymentMethod,
//             amount: order.total,
//             order_id: order.orderId
//         };

//         await onSubmit(paymentData);
        
//         // Tidak perlu onClose() di sini karena sudah dihandle di parent
//         // Tidak perlu navigate() di sini karena dihandle berdasarkan jenis pembayaran
        
//     } catch (error) {
//         setError(error.message);
//         toast.error(`Gagal memproses pembayaran: ${error.message}`);
//     } finally {
//         setIsProcessing(false);
//     }
// };

//   if (!isOpen) return null;

//   return (
//     <div className={`modal-1-overlay open`}>
//       <div className="div-close">
//         <button 
//           className="rounded-pill p-3 border-secondary" 
//           onClick={onClose}
//           disabled={isProcessing}
//         >
//           <img src={Icon} alt="Close" />
//         </button>
//       </div>
      
//       <div 
//       // className="modal-1-modal"
//       style={{position: "fixed",
//         height: "75%",
//         backgroundColor: "white",
//   borderRadius: "12px",
//   padding: "2rem",
//   top: "50%",
//   left:" 50%",
//   transform: "translate(-50%, -50%)"}}
//       >
//         <form className="overflow-scroll scroll-m-0" onSubmit={handleSubmit}>
//           <div className="modal-header border-0 pb-0">
//             <h3 className="fw-bold text-primary">
//               <i className="bi bi-credit-card me-2"></i>
//               Proses Pembayaran - Order #{order?.orderId}
//             </h3>
//           </div>
          
//           <div className="modal-body pt-0">
//             {error && (
//               <Alert variant="danger" className="mb-3">
//                 {error}
//               </Alert>
//             )}

//             <div className="mb-4">
//               <label className="form-label fw-bold">Metode Pembayaran</label>
//               <div className="d-flex gap-3">
//                 <button
//                   type="button"
//                   className={`btn ${paymentMethod === 'transfer' ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
//                   onClick={() => setPaymentMethod('transfer')}
//                 >
//                   <i className="bi bi-bank me-2"></i>
//                   Transfer Bank
//                 </button>
//                 <button
//                   type="button"
//                   className={`btn ${paymentMethod === 'COD' ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
//                   onClick={() => setPaymentMethod('COD')}
//                 >
//                   <i className="bi bi-cash-coin me-2"></i>
//                   COD
//                 </button>
//               </div>
//             </div>

//             {paymentMethod === 'transfer' && (
//               <Alert variant="info" className="mb-4">
//                 <div className="d-flex align-items-start">
//                   <i className="bi bi-info-circle-fill me-2 mt-1"></i>
//                   <div>
//                     <strong>Pembayaran via Transfer Bank</strong>
//                     <ul className="mb-0 ps-3">
//                       <li>Anda akan diarahkan ke halaman pembayaran Midtrans</li>
//                       <li>Pembayaran harus diselesaikan dalam 24 jam</li>
//                       <li>Pesanan akan diproses setelah pembayaran berhasil</li>
//                     </ul>
//                   </div>
//                 </div>
//               </Alert>
//             )}

//             {paymentMethod === 'COD' && (
//               <Alert variant="warning" className="mb-4">
//                 <div className="d-flex align-items-start">
//                   <i className="bi bi-exclamation-triangle-fill me-2 mt-1"></i>
//                   <div>
//                     <strong>Pembayaran via COD (Bayar di Tempat)</strong>
//                     <ul className="mb-0 ps-3">
//                       <li>Siapkan uang tunai sebesar total pembayaran</li>
//                       <li>Pembayaran dilakukan saat barang diterima</li>
//                       <li>Pastikan alamat pengiriman sudah benar</li>
//                     </ul>
//                   </div>
//                 </div>
//               </Alert>
//             )}

//             <div className="total-payment bg-light p-4 rounded">
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <span className="text-muted">Subtotal:</span>
//                 <span>Rp{(order.total - (order.shipping?.shipping_cost || 0)).toLocaleString()}</span>
//               </div>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <span className="text-muted">Ongkos Kirim:</span>
//                 <span>Rp{order.shipping?.shipping_cost?.toLocaleString() || 0}</span>
//               </div>
//               <hr />
//               <div className="d-flex justify-content-between align-items-center">
//                 <h5 className="fw-bold mb-0">Total:</h5>
//                 <h3 className="text-success mb-0">
//                   Rp{order?.total?.toLocaleString()}
//                 </h3>
//               </div>
//             </div>
//           </div>

//           <div className="modal-footer border-0 pt-4">
//             <Button 
//               variant="outline-secondary" 
//               onClick={onClose}
//               className="rounded-pill px-4"
//               disabled={isProcessing}
//             >
//               Batal
//             </Button>
//             <Button 
//               variant="primary" 
//               type="submit" 
//               className="rounded-pill px-4"
//               disabled={isProcessing}
//             >
//               {isProcessing ? (
//                 <>
//                   <Spinner 
//                     as="span" 
//                     animation="border" 
//                     size="sm" 
//                     role="status"
//                     aria-hidden="true"
//                     className="me-2"
//                   />
//                   {paymentMethod === 'transfer' ? 'Mengarahkan...' : 'Memproses...'}
//                 </>
//               ) : (
//                 <>
//                   <i className="bi bi-check-circle me-2"></i>
//                   Konfirmasi Pembayaran
//                 </>
//               )}
//             </Button>
//           </div>
//         </form>
//       </div>
      
//       <style>{`
//         .modal-1-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1050;
//           opacity: 0;
//           visibility: hidden;
//           transition: all 0.3s ease;
//         }
        
//         .modal-1-overlay.open {
//           opacity: 1;
//           visibility: visible;
//         }
        
//         .modal-1-modal {
//           background: white;
//           border-radius: 12px;
//           padding: 2rem;
//           width: 100%;
//           max-width: 500px;
//           max-height: 90vh;
//           overflow-y: auto;
//           position: relative;
//         }
        
//         .div-close {
//           position: absolute;
//           top: 20px;
//           right: 20px;
//           z-index: 1060;
//         }
        
//         .total-payment {
//           border: 1px solid #eee;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PaymentModal;

import { useState } from "react";
import Icon from "../../../img/close.svg";
import { Button, Spinner, Alert } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PaymentModal = ({ isOpen, onClose, order, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsProcessing(true);
  //   setError(null);
    
  //   try {
  //     const paymentData = {
  //       payment_method: paymentMethod,
  //       amount: order.total
  //     };
      
  //     const response = await onSubmit(paymentData);
      
  //     if (paymentMethod === 'transfer') {
  //       if (response?.payment_url) {
  //         window.open(response.payment_url, '_blank');
  //         toast.success('Silakan selesaikan pembayaran di halaman baru');
  //       } else {
  //         throw new Error('Gagal mendapatkan URL pembayaran');
  //       }
  //     } else {
  //       toast.success('Pembayaran COD berhasil dikonfirmasi');
  //     }
      
  //     onClose();
  //     navigate("/orderhistories");
      
  //   } catch (error) {
  //     setError(error.message);
  //     toast.error(`Gagal memproses pembayaran: ${error.message}`);
  //     console.error("Payment error:", error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order) return;
    
    setIsProcessing(true);
    setError(null);

    try {
        const paymentData = {
            payment_method: paymentMethod,
            amount: order.total,
            order_id: order.orderId
        };

        await onSubmit(paymentData);
        
        // Tidak perlu onClose() di sini karena sudah dihandle di parent
        // Tidak perlu navigate() di sini karena dihandle berdasarkan jenis pembayaran
        
    } catch (error) {
        setError(error.message);
        toast.error(`Gagal memproses pembayaran: ${error.message}`);
    } finally {
        setIsProcessing(false);
    }
};

  if (!isOpen) return null;


  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      {/* Tombol Close */}
      <button 
        className="fixed  top-5 right-5 z-50 rounded-full p-3 border border-gray-300 bg-white hover:bg-gray-100"
        onClick={onClose}
        disabled={isProcessing}
      >
        <img src={Icon} alt="Close" className="w-5 h-5" />
      </button>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
                     <form className="overflow-scroll scroll-m-0" onSubmit={handleSubmit}>
          <div className="modal-header border-0 pb-0">
            <h3 className="fw-bold text-primary">
              <i className="bi bi-credit-card me-2"></i>
              Proses Pembayaran - Order #{order?.orderId}
            </h3>
          </div>
          
          <div className="modal-body pt-0">
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <div className="mb-4">
              <label className="form-label fw-bold">Metode Pembayaran</label>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className={`btn ${paymentMethod === 'transfer' ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <i className="bi bi-bank me-2"></i>
                  Transfer Bank
                </button>
                <button
                  type="button"
                  className={`btn ${paymentMethod === 'COD' ? 'btn-primary' : 'btn-outline-primary'} flex-grow-1`}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <i className="bi bi-cash-coin me-2"></i>
                  COD
                </button>
              </div>
            </div>

            {paymentMethod === 'transfer' && (
              <Alert variant="info" className="mb-4">
                <div className="d-flex align-items-start">
                  <i className="bi bi-info-circle-fill me-2 mt-1"></i>
                  <div>
                    <strong>Pembayaran via Transfer Bank</strong>
                    <ul className="mb-0 ps-3">
                      <li>Anda akan diarahkan ke halaman pembayaran Midtrans</li>
                      <li>Pembayaran harus diselesaikan dalam waktu 5 menit</li>
                      <li>Pesanan akan diproses setelah pembayaran berhasil</li>
                    </ul>
                  </div>
                </div>
              </Alert>
            )}

            {paymentMethod === 'COD' && (
              <Alert variant="warning" className="mb-4">
                <div className="d-flex align-items-start">
                  <i className="bi bi-exclamation-triangle-fill me-2 mt-1"></i>
                  <div>
                    <strong>Pembayaran via COD (Bayar di Tempat)</strong>
                    <ul className="mb-0 ps-3">
                      <li>Siapkan uang tunai sebesar total pembayaran</li>
                      <li>Pembayaran dilakukan saat barang diterima</li>
                      <li>Pastikan alamat pengiriman sudah benar</li>
                    </ul>
                  </div>
                </div>
              </Alert>
            )}

            <div className="total-payment bg-light p-4 rounded">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Subtotal:</span>
                <span>Rp{(order.total - (order.shipping?.shipping_cost || 0)).toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Ongkos Kirim:</span>
                <span>Rp{order.shipping?.shipping_cost?.toLocaleString() || 0}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Total:</h5>
                <h3 className="text-success mb-0">
                  Rp{order?.total?.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex justify-between border-0 pt-4">
            <Button 
              variant="outline-secondary" 
              onClick={onClose}
              className="rounded-pill px-4"
              disabled={isProcessing}
            >
              Batal
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              className="rounded-pill px-2"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Spinner 
                    as="span" 
                    animation="border" 
                    size="sm" 
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  {paymentMethod === 'transfer' ? 'Mengarahkan...' : 'Memproses...'}
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Konfirmasi Pembayaran
                </>
              )}
            </Button>
          </div>
        </form>
          
      </div>
    </div>
  );
};

export default PaymentModal;