import React, { useEffect, useState } from "react";
import { Rate } from "antd"; // Impor Rate dari antd
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import useProductStore from "../../store/useProductStore";

const ProductRating = () => {
  const [review, setReview] = useState("");
  const [sellerRating, setSellerRating] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [shippingRating, setShippingRating] = useState(0);
  const [courierRating, setCourierRating] = useState(0);
  const {fetchRatProduct, fetchRatCourier, productRatings, courierRatings } = useProductStore();
  useEffect(() => {
	fetchRatProduct();
	fetchRatCourier();
  }, [fetchRatProduct, fetchRatCourier]);

  console.log("product rating", productRatings);
  console.log("courier rating", courierRatings);

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <h4 className="mb-4">Nilai Produk</h4>

          <div className="alert alert-warning mb-4">
            ➤ Nilai untuk mendapatkan s/d 25 Koin Koin Shopee!
          </div>

          {/* Product Details */}
          <div className="mb-4">
            <h6>(PART 3 LARGE) CELENGAN TARGET LARGE UKUR...</h6>
            <Row>
              <Col md={6}>
                <small>2K Target 1JT,LARGE (Permanent)</small>
              </Col>
              <Col md={6}>
                <small>5K Target 5JT,LARGE (Per...</small>
              </Col>
            </Row>
          </div>

          {/* Product Rating */}
          <div className="mb-3">
            <h5 className="me-2">Nilai Produk</h5>
            <div className="mt-2">
              <Rate
                value={productRating}
                onChange={(rate) => setProductRating(rate)}
                allowHalf={false}
              />
            </div>
          </div>

          {/* Photo/Video Upload */}
          <Button variant="outline-secondary" className="mb-3">
            Tambahkan 1 foto dan video
          </Button>

          {/* Review Input */}
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

          <Form.Check className="mb-4">
            <Form.Check.Input type="checkbox" />
            <Form.Check.Label>Sembunyikan username pada penilaian</Form.Check.Label>
          </Form.Check>

          {/* Rating Sections */}
          <div className="mb-3">
            <h6>Pelayanan Penjual</h6>
            <Rate
              value={sellerRating}
              onChange={(rate) => setSellerRating(rate)}
              allowHalf={false}
            />
          </div>

          <div className="mb-3">
            <h6>Kecepatan Jasa Kirim</h6>
            <Rate
              value={shippingRating}
              onChange={(rate) => setShippingRating(rate)}
              allowHalf={false}
            />
          </div>

          <div className="mb-4">
            <h6>Pelayanan Kurir</h6>
            <Rate
              value={courierRating}
              onChange={(rate) => setCourierRating(rate)}
              allowHalf={false}
            />
          </div>

          <Button variant="primary" size="lg" className="w-100">
            KIRIM
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductRating;