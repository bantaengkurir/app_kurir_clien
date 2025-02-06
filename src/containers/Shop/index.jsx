import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useProductStore from "../../store/useProductStore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { fetchOrder, orders, cancelOrder, fetchShippingByOrderId, shippings } = useProductStore();
  // const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // useEffect(() => {
  //   // Fetch shipping for each order
  //   orders.forEach(order => {
  //     fetchShippingByOrderId(order.id);
  //   });
  // }, [orders,]);

  // useEffect(() => {
  //   // console.log("Fetched shippings:", shippings); // Tambahkan log ini
  // }, [shippings]);



  return (
    <>
      <Navbar />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Address</th>
                  <th scope="col">Total price</th>
                  <th scope="col">Order date</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Status</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map((order) => {
                  const shipping = shippings.find(sh => sh.order_id === order.id);
                  return (
                    <tr key={order.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {order.items && order.items.length > 0 && (
                            <img
                              src={order.items[0].img_url} // Mengambil gambar pertama dari items
                              className="img-fluid me-2 rounded-circle"
                              style={{ width: 80, height: 80 }}
                              alt=""
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{shipping ? shipping.address : 'Tidak ditemukan'}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {shipping ? new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(shipping.total) : 'Tidak ditemukan'}
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {dayjs(order.order_date).format('dddd, D MMMM YYYY')}
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {order.quantity}
                        </p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {order.status}
                        </p>
                      </td>
                      <td>
                        <button 
                          // onClick={() => handleCancelOrder(order.id)}
                          onClick={() =>
                            navigate(`/orderdetail/${order.id}`)
                          }
                          className="btn border border-secondary rounded-pill px-3 text-primary btn-md rounded-circle bg-light border mt-4">
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;

// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import useProductStore from "../../store/useProductStore";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

// const Index = () => {
//   const { 
//     fetchOrder, 
//     orders, 
//     cancelOrder, 
//     fetchShippingByOrderId, 
//     shippings,
//     selectedCart, // Ambil selectedCart dari store
//     cartItems
//   } = useProductStore();
  
//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchOrder();
//   }, [fetchOrder]);

//   console.log("fetchOrder", orders)

//   // Filter order yang dibuat dari selectedCart
//   useEffect(() => {
//     const filteredOrders = orders.filter(order => 
//       order.items.some(item => 
//         selectedCart.includes(item.id) && 
//         cartItems.some(cartItem => cartItem.id === item.id)
//       )
//     );
//     setSelectedOrders(filteredOrders);
//   }, [orders, selectedCart, cartItems]);

//   const handleCreateOrder = async () => {
//     try {
//       await useProductStore.getState().createOrder();
//       navigate("/orders");
//     } catch (error) {
//       console.error("Gagal membuat order:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container-fluid py-5">
//         <div className="container py-5">
//           {/* Tombol Create Order */}
//           <div className="mb-4">
//             <button 
//               onClick={handleCreateOrder}
//               className="btn btn-primary"
//               disabled={selectedCart.length === 0}
//             >
//               Buat Order dari Selected Items ({selectedCart.length})
//             </button>
//           </div>

//           <div className="table-responsive">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Selected</th>
//                   <th>Products</th>
//                   <th>Total Items</th>
//                   <th>Total Price</th>
//                   <th>Order Date</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedOrders.map((order) => {
//                   const orderTotal = order.items.reduce((sum, item) => 
//                     sum + (item.price * item.quantity), 0);
                    
//                   return (
//                     <tr key={order.id}>
//                       <td>
//                         <input 
//                           type="checkbox"
//                           checked={selectedCart.includes(order.id)}
//                           onChange={() => 
//                             useProductStore.getState().toggleCartSelection(order.id)
//                           }
//                         />
//                       </td>
//                       <td>
//                         <div className="d-flex flex-wrap gap-2">
//                           {order.items.map((item, idx) => (
//                             <div key={idx} className="d-flex align-items-center">
//                               <img
//                                 src={item.image_url}
//                                 className="img-fluid me-2 rounded"
//                                 style={{ width: 50, height: 50 }}
//                                 alt={item.name}
//                               />
//                               <span>{item.name} (x{item.quantity})</span>
//                             </div>
//                           ))}
//                         </div>
//                       </td>
//                       <td>{order.items.length} items</td>
//                       <td>
//                         {new Intl.NumberFormat("id-ID", {
//                           style: "currency",
//                           currency: "IDR"
//                         }).format(orderTotal)}
//                       </td>
//                       <td>
//                         {dayjs(order.created_at).format('DD MMM YYYY HH:mm')}
//                       </td>
//                       <td>
//                         <span className={`badge ${
//                           order.status === 'completed' ? 'bg-success' : 'bg-warning'
//                         }`}>
//                           {order.status}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="d-flex gap-2">
//                           <button
//                             onClick={() => navigate(`/orders/${order.id}`)}
//                             className="btn btn-sm btn-primary"
//                           >
//                             Detail
//                           </button>
//                           <button
//                             onClick={() => cancelOrder(order.id)}
//                             className="btn btn-sm btn-danger"
//                           >
//                             Batalkan
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Index;
