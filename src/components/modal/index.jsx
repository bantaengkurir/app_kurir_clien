import { useEffect, useState } from "react";
import "./styles.css";
import Icon from "../../../img/close.svg";
import { useNavigate } from "react-router-dom";
// import useProductStore from "../../store/useProductStore";

const Modal1 = ({ isOpen, toggleModal }) => {
  const navigate = useNavigate();
  // const { fetchProducts, productItems = [] } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchTerm == ""){
      alert("Kata kunci yang anda masukkan tidak ditemukan")
    }else{
      navigate(`/searchproduct?query=${searchTerm}`);
    }
    
  };
  

  // const filteredProducts = productItems.filter(product => {
  //   const isTitleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
  //   const isDescriptionMatch = product.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   return (isTitleMatch || isDescriptionMatch);
  // });

  return (
    <>
      <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
      <div className="div-close">
              <button 
              style={{marginTop: "-200px", marginRight: "-450px"}}
              className="rounded-pill p-3 border-secondary" onClick={toggleModal}>
                <img src={Icon} alt="Close" />
              </button>
            </div>
        <div className="modal-1-modal">
          <form onSubmit={handleSearchSubmit}>
            
            <div className="d-flex justify-content-center mt-5">
              <input
                className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
              />
              <button
                type="submit"
                className="btn btn-primary border-secondary p-3 mb-2 rounded-pill text-white"
                style={{ marginLeft: "-60px", marginTop: "-2px", width: "100px" }}
              >
                <i className="fas fa-search fs-5"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal1;
