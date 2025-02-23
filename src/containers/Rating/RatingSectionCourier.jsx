import React from "react";
import { Rate, Button } from "antd";
import { Col, Form, Row } from "react-bootstrap";
import useProductStore from "../../store/useProductStore";

const ProductRatingSection = ({ 
	orderById, 
	isCourierRated,
	review,
	setReview,
	rating,
	setRating,
	productRatings, 
	isProductRated, 
	setSelectedItem, 
	setShowConfirmationModal, 
}) => {

	const updateRatCourier = useProductStore();
	console.log("order By Id", orderById)

	const handleSubmit = async () => {
		try {
		  
		  const newData = {
			order_id: orderById.order_id, // Ambil order_id dari orderById
			courier_id: orderById.courier?.id, // Ambil product_id dari item
			rating: rating, // Rating yang diberikan
			review: review, // Komentar yang diberikan
		  };
	
		  // Panggil fungsi updateRatProduct dari store
		  await updateRatCourier(newData);
		  window.location.reload();
		  // alert("berhasil dinilai")
		} catch (error) {
		  console.error("Error during confirmation:", error);
		}
	  };
	

  return (
                  <div key={item.product_id} className="product-item border-0">
				  {isCourierRated(orderById.order_id, orderById.courier?.id) ? (
        <>
          <p>Penilaian Kurir:</p>
          {/* Tampilkan rating dengan bintang */}
          <Rate className="mb-3" disabled defaultValue={courierRating?.rating || 0} />
          {/* <p>Review: {courierRating?.review || "Tidak ada review"}</p> */}
          <Button variant="secondary" size="lg" className="w-100" disabled>
            Sudah Dinilai
          </Button>
        </>
      ) : (
        <>
        {/* Photo/Video Upload */}
        <Button variant="outline-secondary" className="mb-3">
            Tambahkan 1 foto dan video
          </Button>

          {/* Review Input */}
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Tulis ulasan minimal 50 karakter mengenai jasa pengiriman anda"
              value={review}
            onChange={(e) => setReview(e.target.value)}
            />
            <div className="text-end text-muted mt-1">
              {review.length} karakter
            </div>
          </Form.Group>

          <Form.Check className="mb-4">
            <Form.Check.Input type="checkbox" />
            <Form.Check.Label>Sembunyikan username pada penilaian</Form.Check.Label>
          </Form.Check>
          <div className="mb-4">
            <h6>Pelayanan Kurir</h6>
            <Rate
              value={rating}
              onChange={(rate) => setRating(rate)}
              allowHalf={false}
            />
          </div>
        <Button onClick={handleSubmit} variant="primary" size="lg" className="w-100">
          KIRIM
        </Button>
        </>

      )}
    </div>
  );
};

export default ProductRatingSection;
