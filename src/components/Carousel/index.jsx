import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import img1 from "../../assets/image/hero-img-1.png";
import img2 from "../../assets/image/hero-img-2.jpg";

const Index = () => {
  return (
    <>
      <div className="container-fluid py-5 mb-5">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
              <h1 className="mb-5 display-3 text-primary">
                Organic Veggies & Fruits Foods
              </h1>
              <div className="position-relative mx-auto">
                <input
                  className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                  type="text"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
                  style={{ top: 0, right: "25%" }}
                >
                  Submit Now
                </button>
              </div>
            </div>
            <div className="col-md-12 col-lg-5">
              {/* Tambahkan data-bs-interval untuk mengatur waktu perpindahan slide */}
              <div 
                id="carouselExample" 
                className="carousel slide" 
                data-bs-ride="carousel"
                data-bs-interval="3000" // <- Tambahkan ini untuk auto-rotate setiap 3 detik
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={img1}
                      className="d-block w-100 rounded"
                      alt="First slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <a href="#" className="btn btn-primary px-4 py-2 rounded">
                        Fruits
                      </a>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src={img2}
                      className="d-block w-100 rounded"
                      alt="Second slide"
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <a href="#" className="btn btn-primary px-4 py-2 rounded">
                        Vegetables
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;