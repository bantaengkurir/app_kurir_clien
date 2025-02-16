// // import React, { useEffect } from "react";
// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";
// // import useProductStore from "../../store/useProductStore";
// // import { useNavigate } from "react-router-dom";
// // import { useState } from "react";

// // const Cart = () => {
// //   const {
// //     cartItems,
// //     fetchCarts,
// //     removeCartItem,
// //     incrementCartItemQuantity,
// //     decrementCartItemQuantity,
// //     createOrder,
// //     user,
// //     // fetchUsers
// //   } = useProductStore();
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();
// //   const flatRate = 3000; // Flat rate untuk shipping

// //   useEffect(() => {
// //     fetchCarts();
// //   }, [fetchCarts]);

// //   useEffect(() => {
// //     console.log("cartItems:", cartItems);
// //   }, [cartItems]);

// //   // useEffect(() => {
// //   //   fetchUsers();
// //   // }, [fetchUsers]);

// //   console.log("ini usr hh", user)
// //   const subtotal = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => {
// //     return sum + item.product.price * item.quantity;
// //   }, 0) : 0;

// //   const total = subtotal + flatRate;

// //   const onRemoveItem = (productId) => {
// //     removeCartItem(productId);
// //   };

// //   const handleIncrease = (itemId) => {
// //     // Temukan item berdasarkan itemId
// //     const item = cartItems.find((item) => item.id === itemId);
  
// //     if (item) {
// //       // Jika stok produk sama dengan 0, munculkan alert
// //       if (item.product.stock === 0) {
// //         alert(`Stok produk ${item.product.title} tidak mencukupi!`);
// //       } else {
// //         // Jika stok mencukupi, tingkatkan jumlah item
// //         incrementCartItemQuantity(itemId);
// //       }
// //     } else {
// //       console.log("Item tidak ditemukan");
// //     }
// //   };

// //   const handleDecrease = (itemId) => {
// //     decrementCartItemQuantity(itemId);
// //   };

// //   const handleCheckout = () => {
// //     for (let i = 0; i < cartItems.length; i++) {
// //       if (cartItems[i].product.stock < cartItems[i].quantity) {
// //         alert(`Stok produk ${cartItems[i].product.title} tidak mencukupi!`);
// //         return; // Hentikan proses jika stok tidak mencukupi
// //       }
// //     }

// //     navigate("/checkout");
// //   };

// //   return (
// //     <>
// //       <Navbar />
// //       <div className="container-fluid py-5">
// //         <div className="container py-5">
// //           <div className="table-responsive">
// //             <table className="table">
// //               <thead>
// //                 <tr>
// //                   <th scope="col">Products</th>
// //                   <th scope="col">Name</th>
// //                   <th scope="col">Price</th>
// //                   <th scope="col">Quantity</th>
// //                   <th scope="col">Total</th>
// //                   <th scope="col">Handle</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {Array.isArray(cartItems) &&
// //                   cartItems.map((item) => (
// //                     <tr key={item.id}>
// //                       <th scope="row">
// //                         <div className="d-flex align-items-center">
// //                           <img
// //                             src={item.product.image_url}
// //                             className="img-fluid me-5 rounded-circle"
// //                             style={{ width: 80, height: 80 }}
// //                             alt={item.product.name}
// //                           />
// //                         </div>
// //                       </th>
// //                       <td>
// //                         <p className="">{item.product.name}</p>
// //                       </td>
// //                       <td>
// //                         <p className="mb-0 mt-4">
// //                           {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format(item.product.price)}
// //                         </p>
// //                       </td>
// //                       <td>
// //                         <div
// //                           className="input-group quantity mt-4"
// //                           style={{ width: 100 }}
// //                         >
// //                           <div className="input-group-btn">
// //                             <button
// //                               onClick={() => handleDecrease(item.id)}
// //                               className="btn btn-sm btn-minus rounded-circle bg-light border"
// //                             >
// //                               <i className="fa fa-minus"></i>
// //                             </button>
// //                           </div>
// //                           <input
// //                             type="text"
// //                             className="form-control form-control-sm text-center border-0"
// //                             value={item.quantity}
// //                             readOnly
// //                           />
// //                           <div className="input-group-btn">
// //                             <button
// //                               onClick={() => handleIncrease(item.id)}
// //                               className="btn btn-sm btn-plus rounded-circle bg-light border"
// //                             >
// //                               <i className="fa fa-plus"></i>
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </td>
// //                       <td>
// //                         <p className="mb-0 mt-4">
// //                           {new Intl.NumberFormat("id-ID", {
// //                             style: "currency",
// //                             currency: "IDR",
// //                           }).format(item.product.price * item.quantity)}
// //                         </p>
// //                       </td>
// //                       <td>
// //                         <button
// //                           onClick={() => onRemoveItem(item.id)}
// //                           className="btn btn-md rounded-circle bg-light border mt-4"
// //                         >
// //                           <i className="fa fa-times text-danger"></i>
// //                         </button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //               </tbody>
// //             </table>
// //           </div>
// //           <div className="mt-5">
// //             <input
// //               type="text"
// //               className="border-0 border-bottom rounded me-5 py-3 mb-4"
// //               placeholder="Coupon Code"
// //             />
// //             <button
// //               className="btn border-secondary rounded-pill px-4 py-3 text-primary"
// //               type="button"
// //             >
// //               Apply Coupon
// //             </button>
// //           </div>
// //           <div className="row g-4 justify-content-end">
// //             <div className="col-8"></div>
// //             <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
// //               <div className="bg-light rounded">
// //                 <div className="p-4">
// //                   <h1 className="display-6 mb-4">
// //                     Cart <span className="fw-normal">Total</span>
// //                   </h1>
// //                   <div className="d-flex justify-content-between mb-4">
// //                     <h5 className="mb-0 me-4">Subtotal:</h5>
// //                     <p className="mb-0">
// //                       {new Intl.NumberFormat("id-ID", {
// //                         style: "currency",
// //                         currency: "IDR",
// //                       }).format(subtotal.toFixed(2))}
// //                     </p>
// //                   </div>
// //                   <div className="d-flex justify-content-between">
// //                     <h5 className="mb-0 me-4">Shipping</h5>
// //                     <div className="">
// //                       <p className="mb-0">
// //                         Flat rate:
// //                         {new Intl.NumberFormat("id-ID", {
// //                           style: "currency",
// //                           currency: "IDR",
// //                         }).format(flatRate.toFixed(2))}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <p className="mb-0 text-end">Shipping to Ukraine.</p>
// //                 </div>
// //                 <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
// //                   <h5 className="mb-0 ps-4 me-4">Total</h5>
// //                   <p className="mb-0 pe-4">
// //                     {new Intl.NumberFormat("id-ID", {
// //                       style: "currency",
// //                       currency: "IDR",
// //                     }).format(total.toFixed(2))}
// //                   </p>
// //                 </div>
// //                 <button
// //                   onClick={handleCheckout}
// //                   // onClick={() => navigate("/checkout")}
// //                   className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
// //                   type="button"
// //                 >
// //                   Proceed Checkout
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </>
// //   );
// // };

// // export default Cart;

// import React, { useEffect, useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import useProductStore from "../../store/useProductStore";
// import { useNavigate } from "react-router-dom";
// import { Checkbox } from "../../components/ui/checkbox";

// const Cart = () => {
//   const {
//     cartItems,
//     fetchCarts,
//     removeCartItem,
//     incrementCartItemQuantity,
//     decrementCartItemQuantity,
//   } = useProductStore();

//   const {
//     selectedCart,
//     toggleCartSelection,
//     clearSelectedCart,
//     // ... lainnya
//   } = useProductStore();
  
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [expandedSellers, setExpandedSellers] = useState({});
//   const navigate = useNavigate();
//   const FLAT_RATE = 3000;

//   useEffect(() => {
//     fetchCarts();
//   }, [fetchCarts]);

//   // Group items by seller
//   const groupedItems = cartItems.reduce((acc, item) => {
//     const sellerId = item.product.seller_id;

//     console.log("sellerId", sellerId);
//     if (!acc[sellerId]) {
//       acc[sellerId] = {
//         sellerName: item.product.seller.name,
//         items: [],
//         subtotal: 0,
//       };
//     }
//     acc[sellerId].items.push(item);
//     acc[sellerId].subtotal += item.product.price * item.quantity;
//     return acc;
//   }, {});
  

//   // Toggle select all items from a seller
//   const toggleSellerSelection = (sellerId) => {
//     const sellerItems = groupedItems[sellerId].items;
//     const allSelected = sellerItems.every(item => 
//       selectedItems.includes(item.id)
//     );
  
//     setSelectedItems(prev => 
//       allSelected
//         ? prev.filter(id => !sellerItems.some(item => item.id === id))
//         : [...prev, ...sellerItems.map(item => item.id)]
//     );
//   };
//   // Toggle select all



//   // Calculate totals
//   const selectedSubtotal = Object.values(groupedItems).reduce((sum, seller) => {
//     const sellerTotal = seller.items
//       .filter(item => selectedItems.includes(item.id))
//       .reduce((s, item) => s + (item.product.price * item.quantity), 0);
//     return sum + sellerTotal;
//   }, 0);

//   const total = selectedSubtotal + FLAT_RATE;

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-6">Keranjang Saya ({cartItems.length})</h1>
        
//         {Object.entries(groupedItems).map(([sellerId, seller]) => (
//           <div key={sellerId} className="bg-white rounded-lg shadow-md mb-6 p-4">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//               <Checkbox
//   checked={seller.items.every(item => selectedItems.includes(item.id))}
//   onCheckedChange={() => toggleSellerSelection(sellerId)}
// />
//                 <span className="font-semibold">{seller.sellerName}</span>
//               </div>
//               <button 
//                 onClick={() => setExpandedSellers(prev => ({
//                   ...prev,
//                   [sellerId]: !prev[sellerId]
//                 }))}
//                 className="text-blue-500"
//               >
//                 {expandedSellers[sellerId] ? 'Sembunyikan' : 'Lihat Detail'}
//               </button>
//             </div>

//             {expandedSellers[sellerId] && seller.items.map(item => (
//               <div key={item.id} className="flex items-center gap-4 mb-4 p-2 border-b">
//                 <Checkbox
//                   checked={selectedItems.includes(item.id)}
//                   onCheckedChange={(checked) => {
//                     setSelectedItems(prev => checked 
//                       ? [...prev, item.id] 
//                       : prev.filter(id => id !== item.id)
//                     );
//                   }}
//                 />
//                 <img
//                   src={item.product.image_url}
//                   className="w-16 h-16 object-cover rounded"
//                   alt={item.product.name}
//                 />
//                 <div className="flex-1">
//                   <h3 className="font-medium">{item.product.name}</h3>
//                   <div className="flex items-center gap-4 mt-2">
//                     <p className="text-primary font-bold">
//                       {new Intl.NumberFormat("id-ID", {
//                         style: "currency",
//                         currency: "IDR",
//                       }).format(item.product.price)}
//                     </p>
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => decrementCartItemQuantity(item.id)}
//                         className="px-2 py-1 border rounded"
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => incrementCartItemQuantity(item.id)}
//                         className="px-2 py-1 border rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeCartItem(item.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Hapus
//                 </button>
//               </div>
//             ))}

//             <div className="mt-4 p-4 bg-gray-50 rounded">
//               <div className="flex justify-between items-center mb-2">
//                 <span>Gratis Ongkir s/d Rp40.000</span>
//                 <span className="text-green-500">
//                   Tambah Rp{new Intl.NumberFormat("id-ID").format(
//                     40000 - seller.subtotal
//                   )} untuk gratis ongkir
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
//                   Voucher Rp22,997RB
//                 </div>
//                 <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
//                   Gratis Ongkir
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Checkout Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6 mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Total Belanja</h2>
//             <div className="text-right">
//               <p className="text-gray-600">
//                 Total Item: {selectedItems.length}
//               </p>
//               <p className="text-2xl font-bold text-primary">
//                 {new Intl.NumberFormat("id-ID", {
//                   style: "currency",
//                   currency: "IDR",
//                 }).format(total)}
//               </p>
//             </div>
//           </div>
          
//           <button
//             onClick={() => navigate("/checkout")}
//             className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
//           >
//             Checkout ({selectedItems.length})
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useProductStore from "../../store/useProductStore";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../../components/ui/checkbox";

const Cart = () => {
  const {
    cartItems,
    fetchCarts,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    selectedCart,
    toggleCartSelection,
    // toggleSellerSelection,
    clearSelectedCart
  } = useProductStore();

// Mendapatkan semua data produk yang dipilih
// const selectedProducts = selectedCart;

// Contoh menampilkan data
// console.log("Selected Items:", selectedProducts.map(item => ({
//   id: item.id,
//   name: item.product.name,
//   price: item.product.price,
//   quantity: item.quantity
// })));
  
  const [expandedSellers, setExpandedSellers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  // Group items by seller
  const groupedItems = cartItems.reduce((acc, item) => {
    const sellerId = item.product.seller_id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        sellerName: item.product.seller.name,
        items: [],
        subtotal: 0,
      };
    }
    acc[sellerId].items.push(item);
    acc[sellerId].subtotal += item.product.price * item.quantity;
    return acc;
  }, {});

  // Hitung total
  const selectedSubtotal = Object.values(groupedItems).reduce((sum, seller) => {
    const sellerTotal = seller.items
      .filter(item => selectedCart.includes(item))
      .reduce((s, item) => s + (item.product.price * item.quantity), 0);
    return sum + sellerTotal;
  }, 0);

  const toggleSellerSelection = (sellerId) => {
    // Pastikan sellerId dikirim sebagai number
    useProductStore.getState().toggleSellerSelection(Number(sellerId));
  };
  

  const total = selectedSubtotal;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Keranjang Saya ({cartItems.length})</h1>
        
        {Object.entries(groupedItems).map(([sellerId, seller]) => (
          <div key={sellerId} className="bg-white rounded-lg shadow-md mb-6 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* <Checkbox
                  checked={seller.items.every(item => 
                    selectedCart.includes(item.id)
                  )}
                  onCheckedChange={() => toggleSellerSelection(sellerId)}
                /> */}
<Checkbox
  checked={seller.items.every(item => 
    selectedCart.some(selected => selected.id === item.id)
  )}
  onCheckedChange={() => toggleSellerSelection(sellerId)}
/>


                <span className="font-semibold">{seller.sellerName}</span>
              </div>
              <button 
                onClick={() => setExpandedSellers(prev => ({
                  ...prev,
                  [sellerId]: !prev[sellerId]
                }))}
                className="text-blue-500"
              >
                {expandedSellers[sellerId] ? 'Sembunyikan' : 'Lihat Detail'}
              </button>
            </div>

            {expandedSellers[sellerId] && seller.items.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-4 p-2 border-b">
               
{/* <Checkbox
  checked={selectedCart.includes(item.id)}
  onCheckedChange={() => toggleCartSelection(item.id)}
/> */}

<Checkbox
  checked={selectedCart.some(cartItem => cartItem.id === item.id)}
  onCheckedChange={() => toggleCartSelection(item)}
/>



{/* <Checkbox
  checked={seller.items.every(item => 
    selectedCart.includes(item.id)
  )}
  onCheckedChange={() => toggleSellerSelection(sellerId)}
/> */}
                <img
                  src={item.product.image_url}
                  className="w-16 h-16 object-cover rounded"
                  alt={item.product.name}
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-primary font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.product.price)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementCartItemQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => incrementCartItemQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeCartItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </div>
            ))}

            <div className="mt-4 p-4 bg-gray-50 rounded">
              <div className="flex justify-between items-center mb-2">
                <span>Gratis Ongkir s/d Rp40.000</span>
                <span className="text-green-500">
                  Tambah Rp{new Intl.NumberFormat("id-ID").format(
                    40000 - seller.subtotal
                  )} untuk gratis ongkir
                </span>
              </div>
              <div className="flex gap-2">
                <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  Voucher Rp22,997RB
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Gratis Ongkir
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Checkout Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Total Belanja</h2>
            <div className="text-right">
              <p className="text-gray-600">
                Total Item: {selectedCart.length}
              </p>
              <p className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(total)}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition"
            disabled={selectedCart.length === 0}
          >
            Checkout ({selectedCart.length})
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;