import image1 from "../../assets/image/fruite-item-5.jpg";
import image2 from "../../assets/image/fruite-item-2.jpg";
import useProductStore from "../../store/useProductStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Index = () => {
  const { productItems, fetchProducts, addCartItem } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(); // Ambil data produk saat komponen di-mount
  }, [fetchProducts]);

  // Fungsi untuk mendapatkan token dari cookie
  // const cookies = document.cookie;

// // Cari cookie dengan nama "user_data"
const getUserDataFromCookie = () => {
  try {
      const cookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user_data="));
      return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : null;
  } catch (error) {
      console.error("Error parsing user_data cookie:", error);
      return null;
  }
};


// Ambil token saat komponen dimuat
const userData = getUserDataFromCookie();
console.log("userData JWT:", userData);


  const handleAddToCart = (product) => {
    const userData = getUserDataFromCookie(); // Cek userData dari cookie

    if (!userData) {
      alert("Anda belum login, silakan login terlebih dahulu!");
      navigate("/login");
      return;
    }

    if (product.stock <= 0) {
      alert("Produk tidak mencukupi");
      return;
    }

    addCartItem(product);
    alert("Produk berhasil ditambahkan ke keranjang!");
  };

  console.log("ini product yang saya tampilkan", productItems)

  return (
    <>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-className text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1>Our Organic Products</h1>
              </div>
            </div>
            <div className="">
            <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {productItems.length > 0 ? (
                        productItems.map((product) => (
                          <div
                            className="col-md-6 col-lg-4 col-xl-3"
                            key={product.id}
                          >
                            <div className="rounded position-relative fruite-product border border-secondary">
                              <div className="fruite-img">
                                <button
                                  onClick={() =>
                                    navigate(`/detail/${product.id}`)
                                  }
                                >
                                  <img
                                    src={product.image_url}
                                    className="img-fluid w-100 rounded-top"
                                    alt={product.name}
                                  />
                                </button>
                              </div>
                              <div
                                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, left: 10 }}
                              >
                                {product.name}
                              </div>
                              <div className="p-4 fruite-product-content border-top-0 rounded-bottom">
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <div className="fruite-product-footer">
                                  <p className="text-dark fs-5 fw-bold mb-0">
                                    {product.price} / kg
                                  </p>
                                </div>
                                <p className="text-dark fs-5 mb-0 text-end">
                                  Stock: {product.stock}
                                </p>
                              </div>
                              <div className="d-flex justify-content-end">
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary ms-2 me-2 mb-3"
                                >
                                  <i className="fa-solid fa-cart-plus fs-5"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Data tidak ditemukan</p>
                      )}
                    </div>
                  </div>
                </div>
                </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {productItems.length > 0 ? (
                        productItems.map((product) => (
                          <div
                            className="col-md-6 col-lg-4 col-xl-3"
                            key={product.id}
                          >
                            <div className="rounded position-relative fruite-product border border-secondary">
                              <div className="fruite-img">
                                <button
                                  onClick={() =>
                                    navigate(`/detail/${product.id}`)
                                  }
                                >
                                  <img
                                    src={product.image_url}
                                    className="img-fluid w-100 rounded-top"
                                    alt={product.name}
                                  />
                                </button>
                              </div>
                              <div
                                className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                                style={{ top: 10, left: 10 }}
                              >
                                {product.name}
                              </div>
                              <div className="p-4 fruite-product-content border-top-0 rounded-bottom">
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <div className="fruite-product-footer">
                                  <p className="text-dark fs-5 fw-bold mb-0">
                                    {product.price} / kg
                                  </p>
                                </div>
                                <p className="text-dark fs-5 mb-0 text-end">
                                  Stock: {product.stock}
                                </p>
                              </div>
                              <div className="d-flex justify-content-end">
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary ms-2 me-2 mb-3"
                                >
                                  <i className="fa-solid fa-cart-plus fs-5"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>Data tidak ditemukan</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
