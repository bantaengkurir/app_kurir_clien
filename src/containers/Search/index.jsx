import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useProductStore from "../../store/useProductStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const index = () => {
  const { productItems = [], fetchProducts, addCartItem } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (productItems.length > 0 && query) {
      const filtered = productItems.filter(product => {
        const isTitleMatch = product.title.toLowerCase().includes(query.toLowerCase());
        const isDescriptionMatch = product.description.toLowerCase().includes(query.toLowerCase());
        return (isTitleMatch || isDescriptionMatch);
      });
      setFilteredProducts(filtered);
    }
  }, [productItems, query]);

  const handleAddToCart = (product) => {
    console.log("product", product)
    if(!token){
      alert("Anda belum login, silahkan login terlebih dahulu !!")
      navigate("/login")
    }else if (product.stock <= 0) {
      alert("produk tidak mencukupi")
    } else if(product && product.id) {
      addCartItem(product);
      alert("produk berhasil ditambahkan")
      // navigate("/cart")
    }else{
      console.error("Invalid product:", product);
    }
  };

  return (
    <>
      <Navbar />
      <div className="tab-content container mt-3 mb-3">
      <div className=" text-end">
                <ul className="nav nav-pills text-center mb-5">
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-light rounded-pill active"
                      data-bs-toggle="pill"
                      href="#tab-1"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        All Products
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex py-2 m-2 bg-light rounded-pill"
                      data-bs-toggle="pill"
                      href="#tab-2"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        Vegetables
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-light rounded-pill"
                      data-bs-toggle="pill"
                      href="#tab-3"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        Fruits
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-light rounded-pill"
                      data-bs-toggle="pill"
                      href="#tab-4"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        Bread
                      </span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="d-flex m-2 py-2 bg-light rounded-pill"
                      data-bs-toggle="pill"
                      href="#tab-5"
                    >
                      <span className="text-dark" style={{ width: 130 }}>
                        Meat
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
        <div id="tab-1" className="tab-pane fade show p-0 active">
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
              {filteredProducts.map(product => (
          <div
          className="col-md-6 col-lg-4 col-xl-3"
          key={product.id}
        >
          <div className="rounded position-relative fruite-product border border-secondary">
            <div className="fruite-img">
              <button
                onClick={() => navigate(`/detail/${product.id}`)}
              >
                <img
                  src={product.img_url}
                  className="img-fluid w-100 rounded-top"
                  alt=""
                />
              </button>
            </div>
            <div
              className="text-white bg-secondary px-3 py-1 rounded position-absolute"
              style={{ top: 10, left: 10 }}
            >
              Fruits
            </div>
            <div className="p-4 fruite-product-content border-top-0 rounded-bottom">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <div className="fruite-product-footer">
                <p className="text-dark fs-5 fw-bold mb-0">
                  {product.price} / kg
                </p>
              </div>
              <p className="text-dark fs-5 mb-0 text-end">
                Stock : {product.stock}
              </p>
            </div>
            <div className="d-flex justify-content-end">
              <button
                onClick={() => handleAddToCart(product)}
                className="btn border border-secondary rounded-pill px-3 text-primary ms-2 me-2 mb-3"
              >
               <i class="fa-duotone fa-solid fa-cart-plus fs-5"></i>
              </button>
            </div>
          </div>
        </div>
        ))}
                {/* {products.length > 0 ? (
                  products.map((product) => (
                    
                  ))
                ) : (
                  <>
                    <h2 className="d-flex justify-content-center mt-3 mb-3">
                      Data tidak ditemukan
                    </h2>
                  </>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
