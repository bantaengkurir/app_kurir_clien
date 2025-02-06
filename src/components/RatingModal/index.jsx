// import { useEffect, useState } from "react";
// import "./styles.css";
// import Icon from "../../../img/close.svg";
// import { useNavigate, useParams } from "react-router-dom";
// import useProductStore from "../../store/useProductStore";
// import { FaStar } from "react-icons/fa";
// import axios from "axios";
// import { Col, Row } from "react-bootstrap";

// const colors = {
//   orange: "#FFBA5A",
//   grey: "#a9a9a9",
// };

// const Modal1 = ({ isOpen, toggleModal, order }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [ratingValues, setRatingValues] = useState({});
//   const [hoverValues, setHoverValues] = useState({});
//   const [productOrders, setProductOrders] = useState("");
//   const stars = Array(5).fill(0);
//   const { addRating, productItems, fetchProducts } = useProductStore();

//   const { id } = useParams();
//   console.log(id);

//   const fetchOrders = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/api/orders/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProductOrders(response.data.data);
//       console.log("ini data", response.data.data);
//     } catch (err) {
//       console.log("Data tidak ditemukan", err);
//       setProductOrders([]); // Set ke array kosong jika terjadi kesalahan
//     }
//   };

//   console.log("ini orderan", productOrders);
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handleClick = (productId, value) => {
//     setRatingValues((prevValues) => ({
//       ...prevValues,
//       [productId]: value,
//     }));
//     setHoverValues((prevValues) => ({
//       ...prevValues,
//       [productId]: undefined,
//     }));
//   };

//   const handleMouseOver = (productId, newHoverValue) => {
//     setHoverValues((prevValues) => ({
//       ...prevValues,
//       [productId]: newHoverValue,
//     }));
//   };

//   const handleMouseLeave = (productId) => {
//     setHoverValues((prevValues) => ({
//       ...prevValues,
//       [productId]: undefined,
//     }));
//   };

//   const handleAddRating = () => {
//     addRating();
//   };

//   const handleShow = (e) => {
//     e.preventDefault();
//     setIsOpen(true); // Open the modal
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   console.log("ini order", order);
//   return (
//     <>
//       <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
//         <div className="div-close">
//           <button
//             style={{ marginTop: "-400px", marginRight: "-450px" }}
//             className="rounded-pill p-3 border-secondary"
//             onClick={toggleModal}
//           >
//             <img src={Icon} alt="Close" />
//           </button>
//         </div>
//         <div className="modal-1-modal">
//           <h2 className="mt-3 text-center"> Berikan Penilaian Anda </h2>
//           {productOrders.items && productOrders.items.map((product) => (
//             <div style={styles.container} key={product.id}>
//               <Row className="d-flex align-items-center">
//                 <Col lg={4}>
//                   <img
//                     src={product.img_url}
//                     className="img-fluid me-2 rounded-circle"
//                     style={{ width: 80, height: 80 }}
//                     alt=""
//                   />
//                 </Col>
//                 <Col lg={8}>
//                   <div style={styles.stars}>
//                     {stars.map((_, index) => (
//                       <FaStar
//                         key={index}
//                         size={50}
//                         onClick={() => handleClick(product.id, index + 1)}
//                         onMouseOver={() => handleMouseOver(product.id, index + 1)}
//                         onMouseLeave={() => handleMouseLeave(product.id)}
//                         color={(hoverValues[product.id] || ratingValues[product.id]) > index ? colors.orange : colors.grey}
//                         style={{
//                           marginRight: 10,
//                           cursor: "pointer",
//                         }}
//                       />
//                     ))}
//                   </div>
//                   <textarea
//                     placeholder="What's your experience?"
//                     style={styles.textarea}
//                   />
//                 </Col>
//               </Row>
//             </div>
//           ))}
//           <div className="w-100 d-flex justify-content-center">
//             <button
//               onClick={handleAddRating}
//               style={styles.button}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   stars: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   textarea: {
//     border: "1px solid #a9a9a9",
//     borderRadius: 5,
//     padding: 10,
//     margin: "20px 0",
//     minHeight: 100,
//     width: 300,
//   },
//   button: {
//     border: "1px solid #a9a9a9",
//     borderRadius: 5,
//     width: 300,
//     padding: 10,
//   },
// };

// export default Modal1;

// import { useEffect, useState } from "react";
// import "./styles.css";
// import Icon from "../../../img/close.svg";
// import { useNavigate, useParams } from "react-router-dom";
// import useProductStore from "../../store/useProductStore";
// import axios from "axios";
// import { Col, Row } from "react-bootstrap";
// import { Rate } from 'antd';



// const Modal1 = ({ isOpen, toggleModal }) => {
//   const [productOrders, setProductOrders] = useState("");
//   const { addRating } = useProductStore();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/orders/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setProductOrders(response.data.data);
//         console.log("ini data", response.data.data);
//       } catch (err) {
//         console.log("Data tidak ditemukan", err);
//         setProductOrders([]); // Set ke array kosong jika terjadi kesalahan
//       }
//     };

//     fetchOrders();
//   }, [id]);

 
//   const handleAddRating = () => {
//     addRating();
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   return (
//     <>
//       <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
//         <div className="div-close">
//           <button
//             style={{ marginTop: "-400px", marginRight: "-450px" }}
//             className="rounded-pill p-3 border-secondary"
//             onClick={toggleModal}
//           >
//             <img src={Icon} alt="Close" />
//           </button>
//         </div>
//         <div className="modal-1-modal">
//           <h2 className="mt-3 text-center"> Berikan Penilaian Anda </h2>
//           {productOrders.items && productOrders.items.map((product) => (
//             <div style={styles.container} key={product.id}>
//               <Row className="d-flex align-items-center">
//                 <Col lg={4}>
//                   <img
//                     src={product.img_url}
//                     className="img-fluid me-2 rounded-circle"
//                     style={{ width: 80, height: 80 }}
//                     alt=""
//                   />
//                 </Col>
//                 <Col lg={8}>
//                 <Rate allowHalf defaultValue={2.5} />
//                   <textarea
//                     placeholder="What's your experience?"
//                     style={styles.textarea}
//                   />
//                 </Col>
//               </Row>
//             </div>
//           ))}
//           <div className="w-100 d-flex justify-content-center">
//             <button
//               onClick={handleAddRating}
//               style={styles.button}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   stars: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   textarea: {
//     border: "1px solid #a9a9a9",
//     borderRadius: 5,
//     padding: 10,
//     margin: "20px 0",
//     minHeight: 100,
//     width: 300,
//   },
//   button: {
//     border: "1px solid #a9a9a9",
//     borderRadius: 5,
//     width: 300,
//     padding: 10,
//   },
// };

// export default Modal1;

// import { useEffect, useState } from "react";
// import "./styles.css";
// import Icon from "../../../img/close.svg";
// import { useNavigate, useParams } from "react-router-dom";
// import useProductStore from "../../store/useProductStore";
// import { FaStar } from "react-icons/fa";
// import axios from "axios";
// import { Col, Row } from "react-bootstrap";
// import { Rate } from 'antd';

// const colors = {
//   orange: "#FFBA5A",
//   grey: "#a9a9a9",
// };

// // Komponen StarRating untuk menampilkan bintang penilaian
// const StarRating = ({ productId, rating, onRate }) => {
//   const [hoverValue, setHoverValue] = useState(undefined);
//   const stars = Array(5).fill(0);

//   const handleClick = (value) => {
//     onRate(productId, value);
//   };

//   const handleMouseOver = (value) => {
//     setHoverValue(value);
//   };

//   const handleMouseLeave = () => {
//     setHoverValue(undefined);
//   };

//   return (
//     <div style={styles.stars}>
//       {stars.map((_, index) => (
//         <FaStar
//           key={index}
//           size={50}
//           onClick={() => handleClick(index + 1)}
//           onMouseOver={() => handleMouseOver(index + 1)}
//           onMouseLeave={handleMouseLeave}
//           color={(hoverValue || rating) > index ? colors.orange : colors.grey}
//           style={{
//             marginRight: 10,
//             cursor: "pointer",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const Modal1 = ({ isOpen, toggleModal, order }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [ratings, setRatings] = useState({});
//   const [productOrders, setProductOrders] = useState("");
//   const { addRating, productItems, fetchProducts } = useProductStore();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/api/orders/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setProductOrders(response.data.data);
//         console.log("ini data", response.data.data);
//       } catch (err) {
//         console.log("Data tidak ditemukan", err);
//         setProductOrders([]); // Set ke array kosong jika terjadi kesalahan
//       }
//     };

//     fetchOrders();
//   }, [id]);

  

//   const handleRate = (productId, value) => {
//     setRatings((prevRatings) => ({
//       ...prevRatings,
//       [productId]: value,
//     }));
//   };

//   const handleAddRating = async () => {
//     const token = localStorage.getItem("token");
//     const ratingData = Object.entries(ratings).map(([product_id, rating]) => ({
//       product_id,
//       rating,
//       review: document.getElementById(`comment-${product_id}`).value, // Ambil komentar dari textarea
//     }));

//     try {
//       await axios.post('http://localhost:8000/api/ratings', ratingData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Ratings submitted successfully!');
//       setRatings({});
//     } catch (error) {
//       console.error("Error submitting ratings:", error);
//       alert('Failed to submit ratings.');
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   return (
//     <>
//       <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
//         <div className="div-close">
//           <button
//             style={{ marginTop: "-400px", marginRight: "-450px" }}
//             className="rounded-pill p-3 border-secondary"
//             onClick={toggleModal}
//           >
//             <img src={Icon} alt="Close" />
//           </button>
//         </div>
//         <div className="modal-1-modal">
//           <h2 className="mt-3 text-center"> Berikan Penilaian Anda </h2>
//           {productOrders.items && productOrders.items.map((product) => (
//             <div style={styles.container} key={product.id}>
//               <Row className="d-flex align-items-center">
//                 <Col lg={4}>
//                   <img
//                     src={product.img_url}
//                     className="img-fluid me-2 rounded-circle"
//                     style={{ width: 80, height: 80 }}
//                     alt=""
//                   />
//                 </Col>
//                 <Col lg={8}>
//                   <StarRating
//                     productId={product.id}
//                     rating={ratings[product.id] || 0}
//                     onRate={handleRate}
//                   />
//                   <textarea
//                     id={`comment-${product.id}`} // ID unik untuk setiap textarea
//                     placeholder="What's your experience?"
//                     style={styles.textarea}
//                   />
//                 </Col>
//               </Row>
//             </div>
//           ))}
//           <div className="w-100 d-flex justify-content-center">
//             <button
//               onClick={handleAddRating}
//               style={styles.button}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   stars: {
//     display: "flex",
//     flexDirection: "row",
//   },
//   textarea: {
//     border: "1px solid #a9a9a9",
//     borderRadius: 5,
//     padding: 10,
//     margin: "20px 0",
//     minHeight: 100,
//     width: 300,
//   },
//   button: {
//     border: "1px solid #a9a9a9",
//     borderRadius: 5,
//     width: 300,
//     padding: 10,
//   },
// };

// export default Modal1;
import { useEffect, useState } from "react";
import "./styles.css";
import Icon from "../../../img/close.svg";
import { useParams } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Rate } from 'antd';

const Modal1 = ({ isOpen, toggleModal }) => {
  const [productOrders, setProductOrders] = useState([]);
  const [ratings, setRatings] = useState({});
  const { id } = useParams();
  const addRating = useProductStore((state) => state.addRating);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProductOrders(response.data.data.items || []);
        console.log("ini data", response.data.data.items);
      } catch (err) {
        console.log("Data tidak ditemukan", err);
        setProductOrders([]); // Set ke array kosong jika terjadi kesalahan
      }
    };

    fetchOrders();
  }, [id]);

  const handleRatingChange = (productId, value) => {
    console.log(`Product ID: ${productId}, Rating: ${value}`);
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: {
        ...prevRatings[productId],
        rating: value,
      }
    }));
  };

  const handleCommentChange = (productId, review) => {
    console.log(`Product ID: ${productId}, Review: ${review}`);
    setRatings((prevRatings) => ({
      ...prevRatings,
      [productId]: {
        ...prevRatings[productId],
        review: review,
      }
    }));
  };

  const handleAddRating = async () => {
    console.log("Ratings before submission:", ratings);
    const ratingsArray = Object.keys(ratings).map(productId => ({
      product_id: productId,
      rating: ratings[productId]?.rating,
      review: ratings[productId]?.review,
    }));
    console.log("Ratings array:", ratingsArray);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/api/products/${productId}/ratings`, ratingsArray, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Ratings submitted successfully!');
      setRatings({});
    } catch (error) {
      console.error("Gagal mengirim rating", error);
      alert('Failed to submit ratings.');
    }
  };

  return (
    <>
      <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
        <div className="div-close">
          <button
            style={{ marginTop: "-400px", marginRight: "-450px" }}
            className="rounded-pill p-3 border-secondary"
            onClick={toggleModal}
          >
            <img src={Icon} alt="Close" />
          </button>
        </div>
        <div className="modal-1-modal">
          <h2 className="mt-3 text-center"> Berikan Penilaian Anda </h2>
          {productOrders.map((product) => (
            <div style={styles.container} key={product.id}>
              <Row className="d-flex align-items-center">
                <Col lg={4}>
                  <img
                    src={product.img_url}
                    className="img-fluid me-2 rounded-circle w-25"
                    style={{ width: 80, height: 80 }}
                    alt=""
                  />
                </Col>
                <Col lg={8}>
                  <Rate 
                    allowHalf 
                    defaultValue={2.5} 
                    onChange={(value) => handleRatingChange(product.id, value)}
                  />
                  <textarea
                    placeholder="What's your experience?"
                    style={styles.textarea}
                    onChange={(e) => handleCommentChange(product.id, e.target.value)}
                  />
                </Col>
              </Row>
            </div>
          ))}
          <div className="w-100 d-flex justify-content-center">
            <button
              onClick={()=>handleAddRating(id)}
              style={styles.button}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 75,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default Modal1;

