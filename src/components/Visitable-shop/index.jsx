import React, { useEffect, useState } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "../../../../Front-End/lib/owlcarousel/assets/.min.css";
// import "../../../../Front-End/lib/owlcarousel/assets/.css";
// import "../../../../Front-End/lib/owlcarousel/";
// import "../../../../Front-End/lib/lightbox/css/lightbox.min.css";
// import "./.min.css";
// import "/dist/assets/.css";
// import "";
// import "/dist/assets/.css";
// import "/dist/assets/owl.theme.default.css";
import { Link, useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";

const index = () => {

  const { user, productItems, fetchProducts, addCartItem } = useProductStore();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Vegetable");

  useEffect(() => {
    // Panggil fungsi fetchProducts untuk mengambil data produk saat komponen di-mount
    fetchProducts();
  }, [fetchProducts]);

  console.log("ini produk tanpa user", productItems);

  const handleAddToCart = (product) => {
    console.log("product", product);
    if (!token) {
      alert("Anda belum login, silahkan login terlebih dahulu !!");
      navigate("/login");
    } else if (product.stock <= 0) {
      alert("produk tidak mencukupi");
    } else if (product && product.id) {
      addCartItem(product);
      alert("produk berhasil ditambahkan");
      // navigate("/cart")
    } else {
      console.error("Invalid product:", product);
    }
  };

  const handleClick = (() =>{
    if(!token){
      alert("Anda belum login, silahkan login terlebih dahulu !!")
    }else{
      window.location.reload()
    }
  })

  return (
    <>
      {/* <!-- Vesitable Shop Start--> */}
      <div className="container-fluid vesitable py-5">
        <div className="container py-5">
          <h1 className="mb-0">Fresh Organic Vegetables</h1>
          {/* <OwlCarousel className="owl-carousel vegetable-carousel justify-content-center"> */}
          {productItems.length > 0 ? 
          (
                          productItems.filter((product) =>
                          product.category?.name === selectedCategory
                              
                          ).map((product) => (
                            <>
            <div className="me-3 me-3 border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img
                  src={product.img_url}
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </div>
              <div
                className="text-white bg-primary px-3 py-1 rounded position-absolute"
                style={{ top: 10, right: 10 }}
              >
                {product.category?.name}
              </div>
              <div className="p-4 rounded-bottom">
                <h4>{product.title}</h4>
                <p>
                 {product.description}
                </p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">{product.price} / kg</p>
                  <Link
                    onClick={() => handleAddToCart(product)}
                    className="btn border border-secondary rounded-pill px-3 text-primary"
                  >
                    <i className="fa fa-shopping-bag me-2 text-primary"></i> Add
                    to cart
                  </Link>
                </div>
              </div>
            </div>
            </>
                          ))):(
                          
                          <>
                          <p>not found</p>
                          </>)}
                          
          {/* </OwlCarousel> */}
        </div>
      </div>
      {/* <!-- Vesitable Shop End -->

    <!-- Banner Section Start--> */}
      <div className="container banner bg-secondary my-5">
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="py-4">
                <h1 className="display-3 text-white">Fresh Exotic Fruits</h1>
                <p className="fw-normal display-3 text-dark mb-4">
                  in Our Store
                </p>
                <p className="mb-4 text-dark">
                  The generated Lorem Ipsum is therefore always free from
                  repetition injected humour, or non-characteristic words etc.
                </p>
                <Link
                  onClick={handleClick}
                  className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5"
                >
                  BUY
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <div className="bg-light d-flex justify-content-center p-2 rounded-circle "
                style={{content: "center", width:"40%", height: "40%", marginLeft: "340px"}}
                >
                <h1 style={{ fontSize: 100 }}>1</h1>
                  <div className="d-flex flex-column">
                    <span className="h2 mb-0">50$</span>
                    <span className="h4 text-muted mb-0">kg</span>
                  </div>
                </div>
              
                <img
                  src="img/baner-1.png"
                  className="img-fluid w-100 rounded"
                  alt=""
                />
                <div
                  className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute"
                  // style="width: 140px; height: 140px; top: 0; left: 0"
                >
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default index;
