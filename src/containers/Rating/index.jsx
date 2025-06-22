import React, { useEffect, useState } from "react";
import { Rate } from "antd"; // Impor Rate dari antd
import { Container, Card, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import useProductStore from "../../store/useProductStore";
import { Link, useParams } from "react-router-dom";
import { RatingModal } from "./RatingModal";
import ProductRatingSection from "./RatingSection";
import RatingSectionCourier from "./RatingSectionCourier";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const ProductRating = () => {  
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // State untuk menyimpan rating
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State untuk menyimpan item yang dipilih

  const {
    fetchRatProduct,
    fetchRatCourier,
    productRatings,
    courierRatings,
    fetchOrderById,
    orderById,
    updateRatProduct,
    updateRatCourier,
  } = useProductStore();

  const { id } = useParams();

  useEffect(() => {
    fetchRatProduct();
    fetchRatCourier();
  }, [fetchRatProduct, fetchRatCourier]);

  useEffect(() => {
    fetchOrderById(id);
  }, [id, fetchOrderById]);

  console.log("product rating", productRatings);
  console.log("courier rating", courierRatings);
  console.log("order by id", orderById);
  console.log("order courier id", orderById.courier?.id);


   // Fungsi untuk mengecek apakah produk sudah dinilai
   const isProductRated = (orderId, variantId) => {
    const rating = productRatings.find(
      (r) => r.order_id === orderId && r.variant_id === variantId
    );
    return rating && rating.rating !== null; // Kembalikan true jika rating tidak null
  };
   // Fungsi untuk mengecek apakah produk sudah dinilai
   const isCourierRated = (orderId, courierId) => {
    const rating = courierRatings.find(
      (r) => r.order_id === orderId && r.courier_id === courierId
    );
    return rating && rating.rating !== null; // Kembalikan true jika rating tidak null
  };

  console.log("ini tess", isProductRated(61, 2))

  const courierRating = courierRatings.find(
    (rating) =>
      rating.order_id === orderById.order_id &&
      rating.courier_id === orderById.courier?.id
  );

  const checkRating = orderById.items || []; // Pastikan checkRating adalah array
  console.log("ini check rating", checkRating);
  
  // const productRatings = productRatings || []; // Pastikan productRatings adalah array
  
  let hasNullRating = true; // Awalnya dianggap tidak ada rating null (true)
  
  // Iterasi melalui setiap item di checkRating
  // for (let i = 0; i < checkRating.length; i++) {
  //   // Cari rating di productRatings yang memiliki product_id dan order_id yang sama
  //   const matchingRating = productRatings.find(
  //     rating => 
  //       rating.variant_id === checkRating[i].variant_id && 
  //       rating.order_id === orderById.order_id
  //   );
  //   console.log("matching rating", matchingRating);
  
  //   // Jika ditemukan rating yang cocok dan rating-nya null
  //   if (matchingRating && matchingRating.rating === null) {
  //     hasNullRating = false; // Jika ditemukan rating null, set variabel ke false
  //     break; // Keluar dari loop karena sudah ditemukan rating null
  //   }
  // }

  for (let i = 0; i < checkRating.length; i++) {
  const currentVariantId = checkRating[i].variant_id;
  const currentOrderId = orderById.order_id; // Pastikan ini benar
  
  console.log(`Mencari rating untuk variant: ${currentVariantId}, order: ${currentOrderId}`);

  const matchingRating = productRatings.find(
    rating => 
      rating.variant_id === currentVariantId && 
      rating.order_id === currentOrderId
  );

  console.log("Hasil pencarian:", matchingRating);

  // Periksa jika matchingRating tidak ditemukan (undefined) atau rating-nya null
  if (!matchingRating || matchingRating.rating === null) {
    hasNullRating = false;
    console.log("Rating belum diberikan untuk item ini");
    break;
  }
}
  
  console.log("hasNullRating:", hasNullRating); // Output: true atau false
  const handleSubmit = async () => {
    try {

      if(hasNullRating === false) {
        toast.error("Ada satu atau beberapa penilaian produk yang belum dinilai")
      }else{
        const newData = {
          order_id: orderById.order_id, // Ambil order_id dari orderById
          courier_id: orderById.courier?.id, // Ambil product_id dari item
          rating: rating, // Rating yang diberikan
          review: review, // Komentar yang diberikan
        };

        if(!rating || !review) {
          toast.error("Rating dan review tidak boleh kosong");
          return;
        }
  
        // Panggil fungsi updateRatProduct dari store
        await updateRatCourier(newData);
        // window.location.reload();
        // alert("berhasil dinilai")
      }
      

    } catch (error) {
      console.error("Error during confirmation:", error);
    }
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <div className="d-flex">
            <span>
            <Link style={{textDecoration: "none", font:"bold", color:"black"}} to="/ratinglist">
            <ArrowLeft className="fw-bold me-3"/>
            </Link>
            </span>
            <span>
            <h4>Nilai Produk</h4>
            </span>
          </div>
          
          <div className="alert alert-warning mb-4">
            ➤ Nilai Produk dan Kurir agar dapat memantau kualitas layanan kami
          </div>

          {orderById.items?.length > 0 ? (
            orderById.items.map((item) => (
          <ProductRatingSection
          key={item.variant_id}
          orderById={orderById}
          productRatings={productRatings}
          isProductRated={isProductRated}
          setSelectedItem={setSelectedItem}
          setShowConfirmationModal={setShowConfirmationModal}
          item={item}
        />
            ))
          ) : (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Memuat data pesanan...</p>
            </div>
          )}

          {/* Modal untuk rating */}
          {selectedItem && (
            <RatingModal
              show={showConfirmationModal}
              onHide={() => setShowConfirmationModal(false)}
              item={selectedItem}
              orderById={orderById}
              updateRatProduct={updateRatProduct}
            />
          )}

          {/* {
            isCourierRated (orderById.order_id, orderById.courier?.id) ? (
              <>
              <p>penilaian kurir {courierRatings.rating}</p>
              <Button variant="secondary" size="lg" className="w-100" disabled>
                Sudah Dinilai
              </Button>
              </>
            ) : (

              <Button onClick={handleSubmit} variant="primary" size="lg" className="w-100">
              KIRIM
            </Button>
            )
          } */}
          <div>
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
        {/* <Button variant="outline-secondary" className="mb-3">
            Tambahkan 1 foto dan video
          </Button> */}
          <h5 className="mb-3">Penilaian Kurir</h5>

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

      {/* <RatingSectionCourier 
      orderById={orderById}
      isCourierRated={isCourierRated}
      review={review}
      setReview={setReview}
      rating={rating}
      setRating={setRating}
      /> */}
    </div>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductRating;


