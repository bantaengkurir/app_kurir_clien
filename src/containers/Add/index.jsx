import React, { useState, useRef } from "react";
import Navbar from "../../components/NavbarSeller";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/useProductStore";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [img_url, setImg_url] = useState("");
  const [imgPreview, setImgPreview] = useState(null); // State untuk URL pratinjau gambar
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false); // State untuk drag-and-drop

  const { addProduct } = useProductStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Reference to the hidden file input

  const handleImageChange = (file) => {
    setImg_url(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgPreview(reader.result); // Set pratinjau gambar
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Click hidden file input when area is clicked
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category_id", category_id);
    formData.append("img_url", img_url);

    try {
      await addProduct(formData);
      navigate("/listproduct");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid py-5">
        <div className="container py-5">
          {error && <p className="text-danger">{error}</p>}
          <h1 className="mb-4 text-center">Add Product</h1>
          <form onSubmit={handleAddProduct}>
            <div className="row g-5 d-flex justify-content-center">
              <div className="w-50">
                <div className="form-item">
                  <label className="form-label my-3">
                    Product Title<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Description<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Price<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Stock<sup>*</sup>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Category<sup>*</sup>
                  </label>
                  <select
                    className="form-select"
                    id="new-select"
                    value={category_id}
                    onChange={(e) => setCategory_id(e.target.value)}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="1">Fruit</option>
                    <option value="2">Vegetable</option>
                    <option value="3">Meat</option>
                  </select>
                </div>
                <div className="form-item">
                  <label className="form-label my-3">
                    Image<sup>*</sup>
                  </label>
                  <div
                    className={`form-control ${
                      dragActive ? "drag-active" : ""
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={handleClick} // Add onClick handler
                    style={{ cursor: "pointer" }} // Change cursor to pointer
                  >
                    <input
                      type="file"
                      className="d-none"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <p className="text-center my-3">
                      Drag & Drop your image here or click to upload
                    </p>
                  </div>
                  {imgPreview && (
                    <div className="mt-3">
                      <img
                        src={imgPreview}
                        alt="Image Preview"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-3 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding Product..." : "Save"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
