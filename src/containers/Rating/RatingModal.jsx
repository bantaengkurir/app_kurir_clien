
// import { Button, Card, CardHeader, Col, Form, Spinner } from "react-bootstrap";
// import { id } from 'date-fns/locale/id';
// import { Modal } from 'react-bootstrap';
// import { Rate } from "antd";
// import { useState } from "react";
// import useProductStore from "../../store/useProductStore";

// export const RatingModal = ({ show, onHide, item, orderById }) => {
// const [review, setReview] = useState("");

// const updateRatProduct = useProductStore();

// console.log("ini item", item)

// const handleConfirm = async () => {
//   try {
//     const newData = {
//       order_id: orderById.order_id,
//       product_id: item.product_id // Provide a value for product_id
//     };
//     await updateRatProduct(newData);

//     // Tutup modal
//     onHide
//   } catch (error) {
//     console.error("Error during confirmation:", error);
//   }
// };





//   return (
//     <div className={`modal-1-overlay ${show ? "open" : ""}`}>
//       <div className="modal-1-modal">
//         {
//           item && (
//             <>
//             <Card.Header>
//             <Card.Title>Silahkan Berikan Penilaian Mengenai Produk Ini</Card.Title>
//           </Card.Header>
//           <Card.Body>
//             <div>
//                     <div className="mb-3">
//                 <h5 className="me-2">Nilai Produk {item.product_id}</h5>
//                 <div className="mt-2">
//                   <Rate
//                     // value={productRating}
//                     // onChange={(rate) => setProductRating(rate)}
//                     allowHalf={false}
//                   />
//                 </div>
//               </div>
//             </div>
//             <Form.Group className="mb-3">
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   placeholder="Tulis ulasan minimal 50 karakter"
//                   value={review}
//                   onChange={(e) => setReview(e.target.value)}
//                 />
//                 <div className="text-end text-muted mt-1">
//                   {review.length} karakter
//                 </div>
//               </Form.Group>
//           </Card.Body>
//           <Card.Footer className="d-flex justify-content-center gap-2">
//             <Button  variant="secondary" onClick={onHide}>
//               Batal
//             </Button>
//             <Button  variant="success" onClick={handleConfirm}>
//               Nilai
//             </Button>
//           </Card.Footer>
//           </>
//           )
//         }

//       </div>
//     </div>
//   );
// };


import { Button, Card, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Rate } from "antd";
import { useState } from "react";

export const RatingModal = ({ show, onHide, item, orderById, updateRatProduct }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // State untuk menyimpan rating

  const handleConfirm = async () => {
    try {
      const newData = {
        order_id: orderById.order_id, // Ambil order_id dari orderById
        variant_id: item.variant_id, // Ambil product_id dari item
        rating: rating, // Rating yang diberikan
        comment: review, // Komentar yang diberikan
      };

      // Panggil fungsi updateRatProduct dari store
      await updateRatProduct(newData);

      // Tutup modal
      onHide();
      // window.location.reload()
    } catch (error) {
      console.error("Error during confirmation:", error);
    }
  };

  return (
    <div className={`modal-1-overlay ${show ? "open" : ""}`}>
      <div style={{position: "fixed",
        backgroundColor: "white",
  borderRadius: "12px",
  padding: "2rem",
  top: "50%",
  left:" 50%",
  transform: "translate(-50%, -50%)"}}>
        <Card.Header>
        <Card.Title>Silahkan Berikan Penilaian Mengenai Produk Ini</Card.Title>
      </Card.Header>
      <Card.Body>
        <div>
          <div className="mb-3">
            <h5 className="me-2">Nilai Produk {item.name}</h5>
            <div className="mt-2">
              <Rate
                value={rating}
                onChange={(rate) => setRating(rate)}
                allowHalf={false}
              />
            </div>
          </div>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tulis ulasan minimal 50 karakter"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="text-end text-muted mt-1">
            {review.length} karakter
          </div>
        </Form.Group>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center gap-2">
        <Button variant="secondary" onClick={onHide}>
          Batal
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Nilai
        </Button>
      </Card.Footer>
      </div>
    </div>
  );
};

