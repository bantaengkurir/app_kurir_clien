import "../../../../Front-End/css/bootstrap.min.css";
import "../../../../Front-End/lib/lightbox/css/lightbox.min.css";
import "../../../../Front-End/lib/owl/assets/owl..min.css";
import "../../../../Front-End/css/style.css";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import { useEffect, useState } from "react";
import { generateUrl } from '../../utils';
import Modal from "../../components/modal";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen); // Toggle modal visibility
  const { fetchCarts, fetchProductSeller, cartItems, logout, user } = useProductStore();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const url = generateUrl();

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  useEffect(() => {
    fetchProductSeller()
  }, [fetchProductSeller]);

  console.log("navbar user", user);

  const handleLogout = () => {
    logout();
    alert("Anda berhasil keluar");
    navigate("/");
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(true); // Open the modal
  };

  return (
    <>
      <div className="container px-0">
        <div className="container d-none d-lg-block">
          <div className="d-flex justify-content-between align-items-center top">
            <div className="top-info ps-2">
              <small className="me-3">
                <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                <span className="text-white">123 Street, New York</span>
              </small>
              <small className="me-3">
                <i className="fas fa-envelope me-2 text-secondary"></i>
                <span className="text-white">Email@Example.com</span>
              </small>
            </div>
            <div className="top-link pe-2">
              <span className="text-white">
                <small className="text-white mx-2">Privacy Policy</small>/
              </span>
              <span className="text-white">
                <small className="text-white mx-2">Terms of Use</small>/
              </span>
              <span className="text-white">
                <small className="text-white ms-2">Sales and Refunds</small>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-0 containerpx-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <Link to="/" className="navbar-brand">
            <h1 className="text-primary display-6">Fruitables</h1>
          </Link>
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <Link to={url} className="nav-item nav-link active">
                Home
              </Link>
              {token && (
                <Link to={"/shop"} className="nav-item nav-link">
                  Shop
                </Link>
              )}

              <div className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Pages
                </span>
                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                  {token && (
                    <Link to={"/cart"} className="dropdown-item">
                      Cart
                    </Link>
                  )}
                  <span className="dropdown-item">
                    Testimonial
                  </span>
                </div>
              </div>
              <span className="nav-item nav-link">
                Contact
              </span>
            </div>
            <div className="d-flex m-3 me-0">
              <button
                onClick={handleClick}
                className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4"
              >
                <i className="fas fa-search primary-color"></i>
              </button>
              <Modal toggleModal={toggleModal} isOpen={isOpen} />
              {token && cartItems.length !== 0 ? (
                <Link to="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x primary-color"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{ top: -5, left: 15, height: 20, minWidth: 20 }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
              ):(
                <Link to="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x primary-color"></i>
                  
                </Link>
              )}

              <span className="my-auto">
                <i className="fas fa-user fa-2x primary-color"></i>
              </span>
              <div className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle mt-3 ms-2"
                  data-bs-toggle="dropdown"
                ></span>
                <div className="dropdown-menu m-0 bg-secondary rounded-0">
                  {!token ? (
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  ) : (
                    <span onClick={handleLogout} className="dropdown-item">
                      Logout
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Index;
