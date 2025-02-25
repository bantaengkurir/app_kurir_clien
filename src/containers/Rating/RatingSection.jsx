import React from "react";
import { Rate, Button } from "antd";
import { Col, Row } from "react-bootstrap";

const ProductRatingSection = ({
  orderById,
  productRatings,
  isProductRated,
  setSelectedItem,
  setShowConfirmationModal,
  item,
}) => {
  // Cari rating produk berdasarkan order_id dan product_id
  const productRating = productRatings.find(
    (rating) =>
      rating.order_id === orderById.order_id &&
      rating.product_id === item.product_id
  );

  return (
    <div key={item.product_id} className="product-item border-0">
      <Row className="align-items-center lh-1">
        <Col xs={3}>
          <img
            src={item.image_url}
            alt={item.name}
            className="img-fluid rounded product-image"
          />
        </Col>
        {isProductRated(orderById.order_id, item.product_id) ? (
          <>
            <Col xs={9}>
              <h6>{item.name}</h6>
              <div className="d-flex justify-content-between">
                <span>
                  {item.description.length > 45
                    ? `${item.description.slice(0, 45)}...`
                    : item.description}
                </span>
                <span>
                  <Button
                    variant="secondary"
                    className="p-0 lh-1 ms-2"
                    disabled
                  >
                    Sudah Dinilai
                  </Button>
                </span>
              </div>
            </Col>
            <div className="d-flex justify-content-center align-items-center">
              <Rate disabled defaultValue={productRating?.rating || 0} />
            </div>
          </>
        ) : (
          <Col xs={9}>
            <h6>{item.name}</h6>
            <div className="d-flex justify-content-between">
              <span>
                {item.description.length > 45
                  ? `${item.description.slice(0, 45)}...`
                  : item.description}
              </span>
              <span>
                <Button
                  className="ms-2"
                  onClick={() => {
                    setSelectedItem(item); // Simpan item yang dipilih
                    setShowConfirmationModal(true); // Tampilkan modal
                  }}
                >
                  Nilai
                </Button>
              </span>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProductRatingSection;
