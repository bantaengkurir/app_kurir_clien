import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Index = () => {
  return (
    <>
      <div id="testimonial" className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
          </div>

          {/* Carousel */}
          <div
            id="testimonialCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="3000"
          >
            <div className="carousel-inner">
              {/* Slide 1 */}
              <div className="carousel-item active">
                <div className="row">
                  {/* Item 1 */}
                  <div className="col-md-4">
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                      <div className="position-relative">
                        <i
                          className="fa fa-quote-right fa-2x text-secondary position-absolute"
                          style={{ bottom: 30, right: 0 }}
                        ></i>
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                          <p className="mb-0">
                            Lorem Ipsum is simply dummy text of the printing Ipsum
                            has been the industry's standard dummy text ever since
                            the 1500s,
                          </p>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                          <div className="bg-secondary rounded">
                            <img
                              src="img/testimonial-1.jpg"
                              className="img-fluid rounded"
                              style={{ width: 100, height: 100 }}
                              alt="Client 1"
                            />
                          </div>
                          <div className="ms-4 d-block">
                            <h4 className="text-dark">Client Name</h4>
                            <p className="m-0 pb-3">Profession</p>
                            <div className="d-flex pe-5">
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="col-md-4">
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                      <div className="position-relative">
                        <i
                          className="fa fa-quote-right fa-2x text-secondary position-absolute"
                          style={{ bottom: 30, right: 0 }}
                        ></i>
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                          <p className="mb-0">
                            Lorem Ipsum is simply dummy text of the printing Ipsum
                            has been the industry's standard dummy text ever since
                            the 1500s,
                          </p>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                          <div className="bg-secondary rounded">
                            <img
                              src="img/testimonial-1.jpg"
                              className="img-fluid rounded"
                              style={{ width: 100, height: 100 }}
                              alt="Client 2"
                            />
                          </div>
                          <div className="ms-4 d-block">
                            <h4 className="text-dark">Client Name</h4>
                            <p className="m-0 pb-3">Profession</p>
                            <div className="d-flex pe-5">
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div className="col-md-4">
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                      <div className="position-relative">
                        <i
                          className="fa fa-quote-right fa-2x text-secondary position-absolute"
                          style={{ bottom: 30, right: 0 }}
                        ></i>
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                          <p className="mb-0">
                            Lorem Ipsum is simply dummy text of the printing Ipsum
                            has been the industry's standard dummy text ever since
                            the 1500s,
                          </p>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                          <div className="bg-secondary rounded">
                            <img
                              src="img/testimonial-1.jpg"
                              className="img-fluid rounded"
                              style={{ width: 100, height: 100 }}
                              alt="Client 3"
                            />
                          </div>
                          <div className="ms-4 d-block">
                            <h4 className="text-dark">Client Name</h4>
                            <p className="m-0 pb-3">Profession</p>
                            <div className="d-flex pe-5">
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div className="carousel-item">
                <div className="row">
                  {/* Item 4 */}
                  <div className="col-md-4">
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                      <div className="position-relative">
                        <i
                          className="fa fa-quote-right fa-2x text-secondary position-absolute"
                          style={{ bottom: 30, right: 0 }}
                        ></i>
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                          <p className="mb-0">
                            Lorem Ipsum is simply dummy text of the printing Ipsum
                            has been the industry's standard dummy text ever since
                            the 1500s,
                          </p>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                          <div className="bg-secondary rounded">
                            <img
                              src="img/testimonial-1.jpg"
                              className="img-fluid rounded"
                              style={{ width: 100, height: 100 }}
                              alt="Client 4"
                            />
                          </div>
                          <div className="ms-4 d-block">
                            <h4 className="text-dark">Client Name</h4>
                            <p className="m-0 pb-3">Profession</p>
                            <div className="d-flex pe-5">
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item 5 */}
                  <div className="col-md-4">
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                      <div className="position-relative">
                        <i
                          className="fa fa-quote-right fa-2x text-secondary position-absolute"
                          style={{ bottom: 30, right: 0 }}
                        ></i>
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                          <p className="mb-0">
                            Lorem Ipsum is simply dummy text of the printing Ipsum
                            has been the industry's standard dummy text ever since
                            the 1500s,
                          </p>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                          <div className="bg-secondary rounded">
                            <img
                              src="img/testimonial-1.jpg"
                              className="img-fluid rounded"
                              style={{ width: 100, height: 100 }}
                              alt="Client 5"
                            />
                          </div>
                          <div className="ms-4 d-block">
                            <h4 className="text-dark">Client Name</h4>
                            <p className="m-0 pb-3">Profession</p>
                            <div className="d-flex pe-5">
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Item 6 */}
                  <div className="col-md-4">
                    <div className="testimonial-item img-border-radius bg-light rounded p-4">
                      <div className="position-relative">
                        <i
                          className="fa fa-quote-right fa-2x text-secondary position-absolute"
                          style={{ bottom: 30, right: 0 }}
                        ></i>
                        <div className="mb-4 pb-4 border-bottom border-secondary">
                          <p className="mb-0">
                            Lorem Ipsum is simply dummy text of the printing Ipsum
                            has been the industry's standard dummy text ever since
                            the 1500s,
                          </p>
                        </div>
                        <div className="d-flex align-items-center flex-nowrap">
                          <div className="bg-secondary rounded">
                            <img
                              src="img/testimonial-1.jpg"
                              className="img-fluid rounded"
                              style={{ width: 100, height: 100 }}
                              alt="Client 6"
                            />
                          </div>
                          <div className="ms-4 d-block">
                            <h4 className="text-dark">Client Name</h4>
                            <p className="m-0 pb-3">Profession</p>
                            <div className="d-flex pe-5">
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                              <i className="fas fa-star text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Navigasi Carousel */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#testimonialCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;