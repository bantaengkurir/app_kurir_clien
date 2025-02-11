// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import axios from "axios";
// import toast from "react-hot-toast";

// const getUserDataFromCookie = () => {
//     try {
//         const cookie = document.cookie
//             .split("; ")
//             .find((row) => row.startsWith("user_data="));
//         return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : null;
//     } catch (error) {
//         console.error("Error parsing user_data cookie:", error);
//         return null;
//     }
// };


// const useProductStore = create((set, get) => ({
//     user: null,
//     userData: getUserDataFromCookie(),
//     productItems: [],
//     productDesc: [],
//     productSeller: [],
//     cartItems: [],
//     payments: [],
//     selectedCart: JSON.parse(localStorage.getItem('selectedCart')) || [],
//     orders: [],
//     shippings: [],
//     ratings: [],
//     hostories: [],
//     errorMessage: '',

//     setErrorMessage: (message) => set({ errorMessage: message }),



//     fetchProducts: async() => {
//         try {
//             // const token = get().token;
//             // if (!token) {
//             //     console.error("Token not found. Unable to fetch products.");
//             //     return;
//             // }

//             const response = await axios.get("http://localhost:8001/api/products",
//                 //     {
//                 //     headers: {
//                 //         Authorization: `Bearer ${token}`,
//                 //     },
//                 // }
//             );
//             set({ productItems: response.data.data });
//             console.log("Fetched products successfully:", response.data.data);
//         } catch (error) {
//             console.error("Fetch products error:", error);
//         }
//     },
//     fetchProductDescs: async() => {
//         try {
//             // const token = get().token;
//             // if (!token) {
//             //     console.error("Token not found. Unable to fetch products.");
//             //     return;
//             // }

//             const response = await axios.get("http://localhost:8001/api/products/desc",
//                 // {
//                 // headers: {
//                 //     Authorization: `Bearer ${token}`,
//                 // },
//                 // }
//             );
//             set({ productDesc: response.data.data });
//             console.log("Fetched products successfully:", response.data.data);
//         } catch (error) {
//             console.error("Fetch products error:", error);
//         }
//     },
//     fetchProductSeller: async() => {
//         try {
//             const token = get().token;
//             if (!token) {
//                 console.error("Token not found. Unable to fetch products.");
//                 return;
//             }

//             const response = await axiosInstance.get("http://localhost:8001/api/products/seller", {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             set({ productSeller: response.data.data });
//             console.log("Fetched products successfully:", response.data.data);
//         } catch (error) {
//             console.error("Fetch products error:", error);
//         }
//     },

//     fetchProductById: async(id) => {
//         try {
//             const token = get().token;
//             if (!token) {
//                 console.error("Token not found. Unable to fetch product.");
//                 return;
//             }

//             const response = await axiosInstance.get(`http://localhost:8001/api/products/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             return response.data.data;
//         } catch (error) {
//             console.error("Fetch product error:", error);
//         }
//     },

//     addProduct: async(productData) => {
//         const token = get().token; // Dapatkan token dari state store

//         if (!token) {
//             throw new Error("No token available");
//         }

//         try {
//             const response = await axiosInstance.post("http://localhost:8001/api/products", productData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             set((state) => ({
//                 productItems: [...state.productItems, response.data.data],
//             }));
//             console.log("Product added successfully:", response.data.data);
//         } catch (error) {
//             console.error("Add product error:", error);
//             throw error; // Re-throw the error to handle it in the component
//         }
//     },

//     updateProduct: async(id, productData) => {
//         try {
//             const token = get().token;
//             if (!token) {
//                 console.error("Token not found. Unable to update product.");
//                 return;
//             }

//             const response = await axiosInstance.put(`http://localhost:8001/api/products/${id}`, productData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data"
//                 },
//             });
//             console.log("Product updated successfully:", response.data);
//             // Optionally, refetch the products to update the state
//             get().fetchProducts();
//         } catch (error) {
//             console.error("Update product error:", error);
//         }
//     },


//     deleteProduct: async(productId) => {
//         try {
//             const token = get().token;
//             if (!token) {
//                 console.error("Token not found. Unable to delete product.");
//                 return;
//             }

//             const response = await axiosInstance.delete(`http://localhost:8001/api/products/${productId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log("Product deleted successfully:", response.data);

//             // Optionally, refetch the products to update the state
//             get().fetchProducts();
//         } catch (error) {
//             console.error("Delete product error:", error);
//         }
//     },


//     fetchCarts: async() => {
//         try {
//             const userData = get().userData;
//             if (!userData) {
//                 console.error("userData not found. Unable to fetch products.");
//                 return;
//             }

//             const response = await axiosInstance.get("/carts");
//             set({ cartItems: response.data.data });
//             console.log("Fetched carts successfully:", response.data.data);
//         } catch (error) {
//             console.error("Fetch carts error:", error);
//         }
//     },

//     // // toggleCartSelection: (itemId) => {
//     // //     set((state) => {
//     // //         const isSelected = state.selectedCart.includes(itemId);
//     // //         return {
//     // //             selectedCart: isSelected ?
//     // //                 state.selectedCart.filter(id => id !== itemId) : [...state.selectedCart, itemId]
//     // //         };
//     // //     });
//     // // },

//     // // clearSelectedCart: () => set({ selectedCart: [] }),

//     // // toggleCartSelection: (itemId) => {
//     // //     set((state) => {
//     // //         // Cari item lengkap dari cartItems
//     // //         const item = state.cartItems.find(item => item.id === itemId);
//     // //         if (!item) return state;

//     // //         // Cek apakah item sudah dipilih
//     // //         const isSelected = state.selectedCart.some(selectedItem =>
//     // //             selectedItem.id === itemId
//     // //         );

//     // //         return {
//     // //             selectedCart: isSelected ?
//     // //                 state.selectedCart.filter(selectedItem => selectedItem.id !== itemId) : [...state.selectedCart, item]
//     // //         };
//     // //     });
//     // // },

//     // // Dalam useProductStore.js
//     // toggleSellerSelection: (sellerId) => {
//     //     set((state) => {
//     //         // Konversi sellerId ke number jika diperlukan
//     //         const numericSellerId = Number(sellerId);

//     //         // Dapatkan semua item dari seller tersebut
//     //         const sellerItems = state.cartItems.filter(
//     //             item => item.product.seller_id === numericSellerId
//     //         );

//     //         // Cek apakah semua item seller sudah terpilih
//     //         const allSelected = sellerItems.every(sellerItem =>
//     //             state.selectedCart.some(selectedItem =>
//     //                 selectedItem.id === sellerItem.id
//     //             )
//     //         );

//     //         return {
//     //             selectedCart: allSelected ? // Jika sudah terpilih semua, hapus yang dari seller ini
//     //                 state.selectedCart.filter(selectedItem =>
//     //                     !sellerItems.some(sellerItem =>
//     //                         sellerItem.id === selectedItem.id
//     //                     )
//     //                 ) : // Jika belum, tambahkan yang belum terpilih
//     //                 [
//     //                     ...state.selectedCart,
//     //                     ...sellerItems.filter(sellerItem =>
//     //                         !state.selectedCart.some(selectedItem =>
//     //                             selectedItem.id === sellerItem.id
//     //                         )
//     //                     )
//     //                 ]
//     //         };
//     //     });
//     // },





//     // toggleCartSelection: (product) => {
//     //     set((state) => {
//     //         const isSelected = state.selectedCart.some(item => item.id === product.id);
//     //         return {
//     //             selectedCart: isSelected ?
//     //                 state.selectedCart.filter(item => item.id !== product.id) // Hapus jika sudah ada
//     //                 :
//     //                 [...state.selectedCart, product] // Tambahkan jika belum ada
//     //         };
//     //     });
//     // },


//     // clearSelectedCart: () => set({ selectedCart: [] }),

//     toggleSellerSelection: (sellerId) => {
//         set((state) => {
//             const numericSellerId = Number(sellerId);
//             const sellerItems = state.cartItems.filter(
//                 item => item.product.seller_id === numericSellerId
//             );

//             const allSelected = sellerItems.every(sellerItem =>
//                 state.selectedCart.some(selectedItem =>
//                     selectedItem.id === sellerItem.id
//                 )
//             );

//             const newSelectedCart = allSelected ?
//                 state.selectedCart.filter(selectedItem =>
//                     !sellerItems.some(sellerItem =>
//                         sellerItem.id === selectedItem.id
//                     )
//                 ) : [
//                     ...state.selectedCart,
//                     ...sellerItems.filter(sellerItem =>
//                         !state.selectedCart.some(selectedItem =>
//                             selectedItem.id === sellerItem.id
//                         )
//                     )
//                 ];

//             // Simpan ke localStorage
//             localStorage.setItem('selectedCart', JSON.stringify(newSelectedCart));

//             return { selectedCart: newSelectedCart };
//         });
//     },

//     toggleCartSelection: (product) => {
//         set((state) => {
//             const isSelected = state.selectedCart.some(item => item.id === product.id);
//             const newSelectedCart = isSelected ?
//                 state.selectedCart.filter(item => item.id !== product.id) : [...state.selectedCart, product];

//             // Simpan ke localStorage
//             localStorage.setItem('selectedCart', JSON.stringify(newSelectedCart));

//             return { selectedCart: newSelectedCart };
//         });
//     },

//     clearSelectedCart: () => {
//         // Hapus dari localStorage dan state
//         localStorage.removeItem('selectedCart');
//         set({ selectedCart: [] });
//     },





//     addCartItem: async(item) => {
//         if (!item || !item.id) {
//             console.error("Invalid product item:", item);
//             return;
//         }

//         console.log("Adding item to cart:", item);

//         const userData = get().userData;

//         console.log("ini userData", userData);
//         if (!userData) {
//             console.error("Token not found. Unable to add item to cart.");
//             return;
//         }

//         try {
//             const response = await axiosInstance.post(
//                 "/carts", {
//                     product_id: item.id,
//                     quantity: 1
//                 },
//             );
//             const updatedCartItems = response.data.data;
//             set({ cartItems: updatedCartItems });

//             set((state) => ({
//                 productItems: state.productItems.map((p) =>
//                     p.id === item.id ? {...p, stock: p.stock - 1 } : p //mengurangi langsung stock
//                     // p.id === item.id ? {...p } : p
//                 ),
//             }));
//             console.log("Updated cart items:", updatedCartItems);
//         } catch (error) {
//             console.error("Add cart item error:", error);
//         }
//     },

//     removeCartItem: async(itemId) => {
//         const userData = get().userData;
//         if (!userData) {
//             console.error("userData not found. Unable to remove item from cart.");
//             return;
//         }

//         try {
//             console.log("itemId: ", itemId);
//             console.log("Cart Items: ", get().cartItems);

//             await axiosInstance.delete(`/carts/${itemId}`);

//             const updatedCartItems = get().cartItems.filter(
//                 (item) => item.id !== itemId
//             );
//             set({ cartItems: updatedCartItems });

//             console.log("ini remove", itemId);

//             console.log("Removed item from cart:", itemId);
//         } catch (error) {
//             console.error("Remove cart item error:", error);
//         }
//     },

//     incrementCartItemQuantity: async(itemId) => {
//         const userData = get().userData;
//         if (!userData) {
//             console.error("userData not found. Unable to update item quantity.");
//             return;
//         }

//         const cartItem = get().cartItems.find((item) => item.id === itemId);
//         if (!cartItem) {
//             console.error("Cart item not found.");
//             return;
//         }

//         const newQuantity = cartItem.quantity + 1;

//         try {
//             const response = await axiosInstance.put(
//                 `/carts/${itemId}`, {
//                     quantity: newQuantity,
//                 },
//             );

//             const updatedCartItem = response.data.data;

//             set((state) => ({
//                 cartItems: state.cartItems.map((item) =>
//                     item.id === itemId ? {...item, quantity: newQuantity } : item
//                 ),
//                 productItems: state.productItems.map((p) =>
//                     p.id === updatedCartItem.product_id ? {...p, stock: p.stock - 1 } : p
//                 ),
//             }));

//             console.log("Incremented cart item quantity:", updatedCartItem);
//         } catch (error) {
//             alert("Cek kembali ketersediaan produk")
//             console.error("Update cart item quantity error:", error);
//         }
//     },

//     decrementCartItemQuantity: async(itemId) => {
//         const userData = get().userData;
//         if (!userData) {
//             console.error("Token not found. Unable to update item quantity.");
//             return;
//         }

//         const cartItem = get().cartItems.find((item) => item.id === itemId);
//         if (!cartItem) {
//             console.error("Cart item not found.");
//             return;
//         }

//         if (cartItem.quantity <= 1) {
//             console.error("Quantity must be greater than 0.");
//             alert("Quantity must be greater than 0.")
//             return;
//         }

//         const newQuantity = cartItem.quantity - 1;

//         try {
//             const response = await axiosInstance.put(
//                 `carts/${itemId}`, {
//                     quantity: newQuantity,
//                 },
//             );

//             const updatedCartItem = response.data.data;

//             set((state) => ({
//                 cartItems: state.cartItems.map((item) =>
//                     item.id === itemId ? {...item, quantity: newQuantity } : item
//                 ),
//                 productItems: state.productItems.map((p) =>
//                     p.id === updatedCartItem.product_id ? {...p, stock: p.stock + 1 } : p
//                 ),
//             }));

//             console.log("Decremented cart item quantity:", updatedCartItem);
//         } catch (error) {
//             alert("Cek kembali ketersediaan produk")
//             console.error("Update cart item quantity error:", error);
//         }
//     },


//     createOrder: async(orderData, setError) => {
//         const userData = get().userData;
//         // const { cartItems, selectedCart } = get();
//         console.log("ini userData", userData);
//         if (!userData) {
//             console.error("Token not found. Unable to create order.");
//             return;
//         }

//         // // Filter item yang dipilih
//         // const selectedItems = cartItems.filter(item =>
//         //     selectedCart.includes(item.id)
//         // );

//         // // Validasi item terpilih
//         // if (selectedItems.length === 0) {
//         //     setError("Pilih minimal 1 produk untuk checkout");
//         //     return;
//         // }

//         try {
//             const response = await axios.post("http://localhost:8001/api/orders", orderData, {
//                 withCredentials: true,
//             });
//             console.log("Create order response:", response.data);
//             const newOrder = response.data;

//             console.log("newOrder", response);

//             set((state) => ({
//                 orders: [...state.orders, newOrder],
//                 cartItems: [], // Kosongkan keranjang setelah order sukses
//             }));

//             // // Update state setelah order sukses
//             // set((state) => ({
//             //     orders: [...state.orders, newOrder],
//             //     cartItems: state.cartItems.filter(item =>
//             //         !state.selectedCart.includes(item.id)
//             //     ),
//             //     selectedCart: []
//             // }));

//             toast.success("Order created successfully!"); // Notifikasi sukses
//             get().clearSelectedCart(); // Otomatis hapus dari localStorage

//         } catch (error) {
//             console.error("Create order error:", error);

//             // Penanganan error yang lebih baik
//             if (error.response) {
//                 // Error dari server (4xx atau 5xx)
//                 toast.error(error.response.data.message || "Order creation failed.");
//                 setError(error.response.data.message || "Order creation failed. Please try again.");
//             } else if (error.request) {
//                 // Tidak ada respons dari server
//                 toast.error("No response from server. Please check your connection.");
//                 setError("No response from server. Please check your connection.");
//             } else {
//                 // Error lainnya (misalnya, error JavaScript)
//                 toast.error("An unexpected error occurred. Please try again.");
//                 setError("An unexpected error occurred. Please try again.");
//             }
//         }
//     },


//     // sendMessage: async(orderData) => {
//     //     // const {  messages } = get();
//     //     try {
//     //         const res = await axiosInstance.post(`/orders/`, orderData);
//     //         set({ messages: [...messages, res.data] });
//     //     } catch (error) {
//     //         toast.error(error.response.data.message);
//     //     }
//     // },

//     fetchOrder: async() => {
//         try {
//             const userData = get().userData;
//             if (!userData) {
//                 console.error("userData not found. Unable to fetch products.");
//                 return;
//             }

//             const response = await axiosInstance.get("/orders", );
//             set({ orders: response.data.data });
//             console.log("Fetched carts successfully:", response.data.data);
//         } catch (error) {
//             console.error("Fetch carts error:", error);
//         }
//     },

//     fetchOrderById: async(orderId) => {
//         const userData = get().userData;
//         if (!userData) {
//             console.error("userData not found. Unable to fetch order.");
//             return;
//         }

//         try {
//             const response = await axiosInstance.get(`/orders/${orderId}`);
//             return response.data; // Pastikan data dikembalikan dengan benar
//         } catch (error) {
//             console.error("Fetch order error:", error);
//             throw error; // Pastikan error dilemparkan untuk ditangani di komponen
//         }
//     },


//     setOrders: (orders) => set({ orders }),


//     cancelOrder: async(orderId, setError) => {
//         const userData = get().userData;
//         if (!userData) {
//             console.error("Token not found. Unable to cancel order.");
//             setError("Token not found. Unable to cancel order.");
//             return;
//         }
//         console.log("order id ini", orderId);
//         try {
//             const response = await axiosInstance.put(`/orders/${orderId}/cancel`,
//                 null, // No body payload required for cancellation
//             );

//             console.log("Cancel order response:", response.data);
//             return response.data; // You may return additional data if needed
//         } catch (error) {
//             console.error("Cancel order error:", error);
//             if (
//                 error.response &&
//                 error.response.data &&
//                 error.response.data.message
//             ) {
//                 setError(error.response.data.message);
//             } else {
//                 setError("Failed to cancel order. Please try again.");
//             }
//             throw error; // Re-throw error to handle in caller function
//         }
//     },

//     fetchshipping: async() => {
//         try {
//             const userData = get().userData;
//             if (!userData) {
//                 console.error("userData not found. Unable to fetch products.");
//                 return;
//             }

//             const response = await axiosInstance.get("/shippings", );
//             set({ shippings: response.data.data });
//             console.log("Fetched shipping successfully:", response.data.data);
//         } catch (error) {
//             console.error("Fetch shipping error:", error);
//         }
//     },

//     // Tambahkan dalam useProductStore
//     createPayment: async(orderId, paymentData, setError) => {
//         const userData = get().userData;
//         if (!userData) {
//             throw new Error("User tidak terautentikasi");
//         }

//         try {
//             const response = await axiosInstance.post(
//                 `/payments/${orderId}/payment-by-order`, {
//                     ...paymentData,
//                     amount: get().orders.find(o => o.order_id === orderId).total
//                 }
//             );

//             const { payment: newPayment, updatedOrder } = response.data.data;

//             console.log("response dari create payment", response.data.data)

//             set((state) => ({
//                 payments: [...state.payments, newPayment],
//                 orders: state.orders.map(order =>
//                     order.order_id === orderId ? {
//                         ...order,
//                         payment_status: updatedOrder.payment_status,
//                         status: updatedOrder.status
//                     } : order
//                 ),
//                 // orders: paymentData.payment_method === 'COD' ? [] : state.cartItems
//             }));

//             return newPayment;

//         } catch (error) {
//             const errorMessage = error.response.data.message ||
//                 "Terjadi kesalahan saat memproses pembayaran";
//             throw new Error(errorMessage);
//         }
//     },

//     updateOrderStatus: (orderId, newStatus) => {
//         set((state) => ({
//             orders: state.orders.map(order =>
//                 order.order_id === orderId ? {
//                     ...order,
//                     status: newStatus,
//                     payment_status: newStatus === 'paid' ? 'completed' : 'pending'
//                 } : order
//             )
//         }));
//     },


//     fetchPayment: async() => {
//         try {
//             const userData = get().userData;
//             if (!userData) {
//                 console.error("userData not found. Unable to fetch products.");
//                 return;
//             }

//             const response = await axiosInstance.get("/payments", );
//             set({ payments: response.data.data });
//             console.log("Fetched payment successfully:", response.data.data);
//         } catch (error) {
//             console.error("Fetch payment error:", error);
//         }
//     },

//     fetchHistories: async() => {
//         try {
//             const userData = get().userData;
//             if (!userData) {
//                 console.error("User tidak terautentikasi");
//                 set({ histories: [] }); // Reset state jika tidak ada user
//                 return;
//             }

//             const response = await axiosInstance.get("/order_histories");
//             set({ histories: response.data.data || [] }); // Handle jika response kosong
//         } catch (error) {
//             console.error("Error:", error);
//             set({ histories: [] }); // Reset state saat error
//             toast.error("Gagal memuat riwayat pesanan");
//         }
//     },


// }));

// export default useProductStore;

// // import { create } from "zustand";
// // import { io } from "socket.io-client";
// // import axios from "axios";
// // import toast from "react-hot-toast";

// // // Helper function to get user data from cookie
// // const getUserDataFromCookie = () => {
// //     try {
// //         const cookie = document.cookie
// //             .split("; ")
// //             .find((row) => row.startsWith("user_data="));
// //         return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : null;
// //     } catch (error) {
// //         console.error("Error parsing user_data cookie:", error);
// //         return null;
// //     }
// // };

// // const useProductStore = create((set, get) => ({
// //     // State
// //     user: null,
// //     userData: getUserDataFromCookie(),
// //     productItems: [],
// //     productDesc: [],
// //     productSeller: [],
// //     cartItems: [],
// //     payments: [],
// //     selectedCart: JSON.parse(localStorage.getItem("selectedCart")) || [],
// //     orders: [],
// //     shippings: [],
// //     ratings: [],
// //     histories: [],
// //     errorMessage: "",
// //     socket: null,
// //     isConnected: false,
// //     realtimeUpdates: [],

// //     // Actions
// //     setErrorMessage: (message) => set({ errorMessage: message }),

// //     // Socket.io functions
// //     initSocket: () => {
// //         const socket = io("http://localhost:8001", {
// //             autoConnect: true,
// //             withCredentials: true,
// //         });

// //         socket.on("connect", () => {
// //             console.log("Socket connected");
// //             set({ isConnected: true });
// //         });

// //         socket.on("disconnect", () => {
// //             console.log("Socket disconnected");
// //             set({ isConnected: false });
// //         });

// //         socket.on("productUpdate", (updatedProduct) => {
// //             set((state) => ({
// //                 productItems: state.productItems.map((product) =>
// //                     product.id === updatedProduct.id ? updatedProduct : product
// //                 ),
// //             }));
// //         });

// //         socket.on("orderUpdate", (updatedOrder) => {
// //             set((state) => ({
// //                 orders: state.orders.map((order) =>
// //                     order.order_id === updatedOrder.order_id ? updatedOrder : order
// //                 ),
// //             }));
// //         });

// //         socket.on("newNotification", (notification) => {
// //             toast.success(notification.message);
// //         });

// //         set({ socket });
// //     },

// //     disconnectSocket: () => {
// //         const { socket } = get();
// //         if (socket) {
// //             socket.disconnect();
// //             set({ socket: null, isConnected: false });
// //         }
// //     },

// //     // Product functions
// //     fetchProducts: async() => {
// //         try {
// //             const response = await axios.get("http://localhost:8001/api/products");
// //             set({ productItems: response.data.data });
// //             console.log("Fetched products successfully:", response.data.data);
// //         } catch (error) {
// //             console.error("Fetch products error:", error);
// //         }
// //     },

// //     fetchProductDescs: async() => {
// //         try {
// //             const response = await axios.get("http://localhost:8001/api/products/desc");
// //             set({ productDesc: response.data.data });
// //             console.log("Fetched product descriptions successfully:", response.data.data);
// //         } catch (error) {
// //             console.error("Fetch product descriptions error:", error);
// //         }
// //     },

// //     fetchProductSeller: async() => {
// //         try {
// //             const token = get().token;
// //             if (!token) {
// //                 console.error("Token not found. Unable to fetch products.");
// //                 return;
// //             }

// //             const response = await axios.get("http://localhost:8001/api/products/seller", {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                 },
// //             });
// //             set({ productSeller: response.data.data });
// //             console.log("Fetched seller products successfully:", response.data.data);
// //         } catch (error) {
// //             console.error("Fetch seller products error:", error);
// //         }
// //     },

// //     addProduct: async(productData) => {
// //         const token = get().token;
// //         if (!token) {
// //             throw new Error("No token available");
// //         }

// //         try {
// //             const response = await axios.post("http://localhost:8001/api/products", productData, {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                     "Content-Type": "multipart/form-data",
// //                 },
// //             });
// //             set((state) => ({
// //                 productItems: [...state.productItems, response.data.data],
// //             }));
// //             console.log("Product added successfully:", response.data.data);
// //         } catch (error) {
// //             console.error("Add product error:", error);
// //             throw error;
// //         }
// //     },

// //     // Cart functions
// //     fetchCarts: async() => {
// //         try {
// //             const userData = get().userData;
// //             if (!userData) {
// //                 console.error("userData not found. Unable to fetch products.");
// //                 return;
// //             }

// //             const response = await axios.get("/carts");
// //             set({ cartItems: response.data.data });
// //             console.log("Fetched carts successfully:", response.data.data);
// //         } catch (error) {
// //             console.error("Fetch carts error:", error);
// //         }
// //     },

// //     addCartItem: async(item) => {
// //         if (!item || !item.id) {
// //             console.error("Invalid product item:", item);
// //             return;
// //         }

// //         const userData = get().userData;
// //         if (!userData) {
// //             console.error("Token not found. Unable to add item to cart.");
// //             return;
// //         }

// //         try {
// //             const response = await axios.post("/carts", {
// //                 product_id: item.id,
// //                 quantity: 1,
// //             });
// //             const updatedCartItems = response.data.data;
// //             set({ cartItems: updatedCartItems });

// //             set((state) => ({
// //                 productItems: state.productItems.map((p) =>
// //                     p.id === item.id ? {...p, stock: p.stock - 1 } : p
// //                 ),
// //             }));
// //             console.log("Updated cart items:", updatedCartItems);
// //         } catch (error) {
// //             console.error("Add cart item error:", error);
// //         }
// //     },

// //     // Order functions
// //     createOrder: async(orderData, setError) => {
// //         const userData = get().userData;
// //         if (!userData) {
// //             console.error("Token not found. Unable to create order.");
// //             return;
// //         }

// //         try {
// //             const response = await axios.post("http://localhost:8001/api/orders", orderData, {
// //                 withCredentials: true,
// //             });
// //             console.log("Create order response:", response.data);
// //             const newOrder = response.data;

// //             set((state) => ({
// //                 orders: [...state.orders, newOrder],
// //                 cartItems: [],
// //             }));

// //             toast.success("Order created successfully!");
// //             get().clearSelectedCart();
// //         } catch (error) {
// //             console.error("Create order error:", error);
// //             if (error.response) {
// //                 toast.error(error.response.data.message || "Order creation failed.");
// //                 setError(error.response.data.message || "Order creation failed. Please try again.");
// //             } else if (error.request) {
// //                 toast.error("No response from server. Please check your connection.");
// //                 setError("No response from server. Please check your connection.");
// //             } else {
// //                 toast.error("An unexpected error occurred. Please try again.");
// //                 setError("An unexpected error occurred. Please try again.");
// //             }
// //         }
// //     },

// //     // Cleanup function
// //     // cleanup: () => {
// //     //     const { socket } = get();
// //     //     if (socket) {
// //     //         socket.disconnect();
// //     //     }
// //     //     set({
// //     //         user: null,
// //     //         userData: null,
// //     //         productItems: [],
// //     //         cartItems: [],
// //     //         orders: [],
// //     //         socket: null,
// //     //         isConnected: false,
// //     //     });
// //     // },
// // }));

// // export default useProductStore;

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

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

const useProductStore = create((set, get) => ({
    // Existing state
    user: null,
    userData: getUserDataFromCookie(),
    productItems: [],
    productDesc: [],
    productSeller: [],
    cartItems: [],
    payments: [],
    selectedCart: JSON.parse(localStorage.getItem('selectedCart')) || [],
    orders: [],
    shippings: [],
    ratings: [],
    hostories: [],
    errorMessage: '',

    setErrorMessage: (message) => set({ errorMessage: message }),


    // New state for online users
    onlineUsers: [],
    socket: null,
    isConnected: false,

    // Socket.io functions
    initSocket: () => {
        const userData = getUserDataFromCookie();
        if (!userData) return;

        const socket = io("http://localhost:8001", {
            autoConnect: true,
            withCredentials: true,
            query: {
                userId: userData.id
            }
        });

        socket.on("connect", () => {
            console.log("Socket connected");
            set({ isConnected: true });
            // Emit user online status saat pertama connect
            socket.emit("userOnline", userData.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            set({ isConnected: false });
        });

        socket.on("onlineUsers", (users) => {
            set({ onlineUsers: users });
        });

        socket.on("userOnline", (userId) => {
            set((state) => ({
                onlineUsers: [...state.onlineUsers, userId]
            }));
        });

        socket.on("userOffline", (userId) => {
            set((state) => ({
                onlineUsers: state.onlineUsers.filter(id => id !== userId)
            }));
        });

        set({ socket });
    },

    disconnectSocket: () => {
        const { socket, userData } = get();
        if (socket && userData) {
            socket.emit("userOffline", userData.id);
            socket.disconnect();
            set({ socket: null, isConnected: false });
        }
    },

    fetchProducts: async() => {
        try {
            // const token = get().token;
            // if (!token) {
            //     console.error("Token not found. Unable to fetch products.");
            //     return;
            // }

            const response = await axios.get("http://localhost:8001/api/products",
                //     {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
            );
            set({ productItems: response.data.data });
            console.log("Fetched products successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch products error:", error);
        }
    },
    fetchProductDescs: async() => {
        try {
            // const token = get().token;
            // if (!token) {
            //     console.error("Token not found. Unable to fetch products.");
            //     return;
            // }

            const response = await axios.get("http://localhost:8001/api/products/desc",
                // {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
                // }
            );
            set({ productDesc: response.data.data });
            console.log("Fetched products successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch products error:", error);
        }
    },
    fetchProductSeller: async() => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.get("http://localhost:8001/api/products/seller", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ productSeller: response.data.data });
            console.log("Fetched products successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch products error:", error);
        }
    },

    fetchProductById: async(id) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to fetch product.");
                return;
            }

            const response = await axiosInstance.get(`http://localhost:8001/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        } catch (error) {
            console.error("Fetch product error:", error);
        }
    },

    addProduct: async(productData) => {
        const token = get().token; // Dapatkan token dari state store

        if (!token) {
            throw new Error("No token available");
        }

        try {
            const response = await axiosInstance.post("http://localhost:8001/api/products", productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            set((state) => ({
                productItems: [...state.productItems, response.data.data],
            }));
            console.log("Product added successfully:", response.data.data);
        } catch (error) {
            console.error("Add product error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },

    updateProduct: async(id, productData) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to update product.");
                return;
            }

            const response = await axiosInstance.put(`http://localhost:8001/api/products/${id}`, productData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });
            console.log("Product updated successfully:", response.data);
            // Optionally, refetch the products to update the state
            get().fetchProducts();
        } catch (error) {
            console.error("Update product error:", error);
        }
    },


    deleteProduct: async(productId) => {
        try {
            const token = get().token;
            if (!token) {
                console.error("Token not found. Unable to delete product.");
                return;
            }

            const response = await axiosInstance.delete(`http://localhost:8001/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Product deleted successfully:", response.data);

            // Optionally, refetch the products to update the state
            get().fetchProducts();
        } catch (error) {
            console.error("Delete product error:", error);
        }
    },


    fetchCarts: async() => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.get("/carts");
            set({ cartItems: response.data.data });
            console.log("Fetched carts successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch carts error:", error);
        }
    },

    // // toggleCartSelection: (itemId) => {
    // //     set((state) => {
    // //         const isSelected = state.selectedCart.includes(itemId);
    // //         return {
    // //             selectedCart: isSelected ?
    // //                 state.selectedCart.filter(id => id !== itemId) : [...state.selectedCart, itemId]
    // //         };
    // //     });
    // // },

    // // clearSelectedCart: () => set({ selectedCart: [] }),

    // // toggleCartSelection: (itemId) => {
    // //     set((state) => {
    // //         // Cari item lengkap dari cartItems
    // //         const item = state.cartItems.find(item => item.id === itemId);
    // //         if (!item) return state;

    // //         // Cek apakah item sudah dipilih
    // //         const isSelected = state.selectedCart.some(selectedItem =>
    // //             selectedItem.id === itemId
    // //         );

    // //         return {
    // //             selectedCart: isSelected ?
    // //                 state.selectedCart.filter(selectedItem => selectedItem.id !== itemId) : [...state.selectedCart, item]
    // //         };
    // //     });
    // // },

    // // Dalam useProductStore.js
    // toggleSellerSelection: (sellerId) => {
    //     set((state) => {
    //         // Konversi sellerId ke number jika diperlukan
    //         const numericSellerId = Number(sellerId);

    //         // Dapatkan semua item dari seller tersebut
    //         const sellerItems = state.cartItems.filter(
    //             item => item.product.seller_id === numericSellerId
    //         );

    //         // Cek apakah semua item seller sudah terpilih
    //         const allSelected = sellerItems.every(sellerItem =>
    //             state.selectedCart.some(selectedItem =>
    //                 selectedItem.id === sellerItem.id
    //             )
    //         );

    //         return {
    //             selectedCart: allSelected ? // Jika sudah terpilih semua, hapus yang dari seller ini
    //                 state.selectedCart.filter(selectedItem =>
    //                     !sellerItems.some(sellerItem =>
    //                         sellerItem.id === selectedItem.id
    //                     )
    //                 ) : // Jika belum, tambahkan yang belum terpilih
    //                 [
    //                     ...state.selectedCart,
    //                     ...sellerItems.filter(sellerItem =>
    //                         !state.selectedCart.some(selectedItem =>
    //                             selectedItem.id === sellerItem.id
    //                         )
    //                     )
    //                 ]
    //         };
    //     });
    // },





    // toggleCartSelection: (product) => {
    //     set((state) => {
    //         const isSelected = state.selectedCart.some(item => item.id === product.id);
    //         return {
    //             selectedCart: isSelected ?
    //                 state.selectedCart.filter(item => item.id !== product.id) // Hapus jika sudah ada
    //                 :
    //                 [...state.selectedCart, product] // Tambahkan jika belum ada
    //         };
    //     });
    // },


    // clearSelectedCart: () => set({ selectedCart: [] }),

    toggleSellerSelection: (sellerId) => {
        set((state) => {
            const numericSellerId = Number(sellerId);
            const sellerItems = state.cartItems.filter(
                item => item.product.seller_id === numericSellerId
            );

            const allSelected = sellerItems.every(sellerItem =>
                state.selectedCart.some(selectedItem =>
                    selectedItem.id === sellerItem.id
                )
            );

            const newSelectedCart = allSelected ?
                state.selectedCart.filter(selectedItem =>
                    !sellerItems.some(sellerItem =>
                        sellerItem.id === selectedItem.id
                    )
                ) : [
                    ...state.selectedCart,
                    ...sellerItems.filter(sellerItem =>
                        !state.selectedCart.some(selectedItem =>
                            selectedItem.id === sellerItem.id
                        )
                    )
                ];

            // Simpan ke localStorage
            localStorage.setItem('selectedCart', JSON.stringify(newSelectedCart));

            return { selectedCart: newSelectedCart };
        });
    },

    toggleCartSelection: (product) => {
        set((state) => {
            const isSelected = state.selectedCart.some(item => item.id === product.id);
            const newSelectedCart = isSelected ?
                state.selectedCart.filter(item => item.id !== product.id) : [...state.selectedCart, product];

            // Simpan ke localStorage
            localStorage.setItem('selectedCart', JSON.stringify(newSelectedCart));

            return { selectedCart: newSelectedCart };
        });
    },

    clearSelectedCart: () => {
        // Hapus dari localStorage dan state
        localStorage.removeItem('selectedCart');
        set({ selectedCart: [] });
    },





    addCartItem: async(item) => {
        if (!item || !item.id) {
            console.error("Invalid product item:", item);
            return;
        }

        console.log("Adding item to cart:", item);

        const userData = get().userData;

        console.log("ini userData", userData);
        if (!userData) {
            console.error("Token not found. Unable to add item to cart.");
            return;
        }

        try {
            const response = await axiosInstance.post(
                "/carts", {
                    product_id: item.id,
                    quantity: 1
                },
            );
            const updatedCartItems = response.data.data;
            set({ cartItems: updatedCartItems });

            set((state) => ({
                productItems: state.productItems.map((p) =>
                    p.id === item.id ? {...p, stock: p.stock - 1 } : p //mengurangi langsung stock
                    // p.id === item.id ? {...p } : p
                ),
            }));
            console.log("Updated cart items:", updatedCartItems);
        } catch (error) {
            console.error("Add cart item error:", error);
        }
    },

    removeCartItem: async(itemId) => {
        const userData = get().userData;
        if (!userData) {
            console.error("userData not found. Unable to remove item from cart.");
            return;
        }

        try {
            console.log("itemId: ", itemId);
            console.log("Cart Items: ", get().cartItems);

            await axiosInstance.delete(`/carts/${itemId}`);

            const updatedCartItems = get().cartItems.filter(
                (item) => item.id !== itemId
            );
            set({ cartItems: updatedCartItems });

            console.log("ini remove", itemId);

            console.log("Removed item from cart:", itemId);
        } catch (error) {
            console.error("Remove cart item error:", error);
        }
    },

    incrementCartItemQuantity: async(itemId) => {
        const userData = get().userData;
        if (!userData) {
            console.error("userData not found. Unable to update item quantity.");
            return;
        }

        const cartItem = get().cartItems.find((item) => item.id === itemId);
        if (!cartItem) {
            console.error("Cart item not found.");
            return;
        }

        const newQuantity = cartItem.quantity + 1;

        try {
            const response = await axiosInstance.put(
                `/carts/${itemId}`, {
                    quantity: newQuantity,
                },
            );

            const updatedCartItem = response.data.data;

            set((state) => ({
                cartItems: state.cartItems.map((item) =>
                    item.id === itemId ? {...item, quantity: newQuantity } : item
                ),
                productItems: state.productItems.map((p) =>
                    p.id === updatedCartItem.product_id ? {...p, stock: p.stock - 1 } : p
                ),
            }));

            console.log("Incremented cart item quantity:", updatedCartItem);
        } catch (error) {
            alert("Cek kembali ketersediaan produk")
            console.error("Update cart item quantity error:", error);
        }
    },

    decrementCartItemQuantity: async(itemId) => {
        const userData = get().userData;
        if (!userData) {
            console.error("Token not found. Unable to update item quantity.");
            return;
        }

        const cartItem = get().cartItems.find((item) => item.id === itemId);
        if (!cartItem) {
            console.error("Cart item not found.");
            return;
        }

        if (cartItem.quantity <= 1) {
            console.error("Quantity must be greater than 0.");
            alert("Quantity must be greater than 0.")
            return;
        }

        const newQuantity = cartItem.quantity - 1;

        try {
            const response = await axiosInstance.put(
                `carts/${itemId}`, {
                    quantity: newQuantity,
                },
            );

            const updatedCartItem = response.data.data;

            set((state) => ({
                cartItems: state.cartItems.map((item) =>
                    item.id === itemId ? {...item, quantity: newQuantity } : item
                ),
                productItems: state.productItems.map((p) =>
                    p.id === updatedCartItem.product_id ? {...p, stock: p.stock + 1 } : p
                ),
            }));

            console.log("Decremented cart item quantity:", updatedCartItem);
        } catch (error) {
            alert("Cek kembali ketersediaan produk")
            console.error("Update cart item quantity error:", error);
        }
    },


    createOrder: async(orderData, setError) => {
        const userData = get().userData;
        // const { cartItems, selectedCart } = get();
        console.log("ini userData", userData);
        if (!userData) {
            console.error("Token not found. Unable to create order.");
            return;
        }

        // // Filter item yang dipilih
        // const selectedItems = cartItems.filter(item =>
        //     selectedCart.includes(item.id)
        // );

        // // Validasi item terpilih
        // if (selectedItems.length === 0) {
        //     setError("Pilih minimal 1 produk untuk checkout");
        //     return;
        // }

        try {
            const response = await axios.post("http://localhost:8001/api/orders", orderData, {
                withCredentials: true,
            });
            console.log("Create order response:", response.data);
            const newOrder = response.data;

            console.log("newOrder", response);

            set((state) => ({
                orders: [...state.orders, newOrder],
                cartItems: [], // Kosongkan keranjang setelah order sukses
            }));

            // // Update state setelah order sukses
            // set((state) => ({
            //     orders: [...state.orders, newOrder],
            //     cartItems: state.cartItems.filter(item =>
            //         !state.selectedCart.includes(item.id)
            //     ),
            //     selectedCart: []
            // }));

            toast.success("Order created successfully!"); // Notifikasi sukses
            get().clearSelectedCart(); // Otomatis hapus dari localStorage

        } catch (error) {
            console.error("Create order error:", error);

            // Penanganan error yang lebih baik
            if (error.response) {
                // Error dari server (4xx atau 5xx)
                toast.error(error.response.data.message || "Order creation failed.");
                setError(error.response.data.message || "Order creation failed. Please try again.");
            } else if (error.request) {
                // Tidak ada respons dari server
                toast.error("No response from server. Please check your connection.");
                setError("No response from server. Please check your connection.");
            } else {
                // Error lainnya (misalnya, error JavaScript)
                toast.error("An unexpected error occurred. Please try again.");
                setError("An unexpected error occurred. Please try again.");
            }
        }
    },


    // sendMessage: async(orderData) => {
    //     // const {  messages } = get();
    //     try {
    //         const res = await axiosInstance.post(`/orders/`, orderData);
    //         set({ messages: [...messages, res.data] });
    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }
    // },

    fetchOrder: async() => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.get("/orders", );
            set({ orders: response.data.data });
            console.log("Fetched carts successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch carts error:", error);
        }
    },

    fetchOrderById: async(orderId) => {
        const userData = get().userData;
        if (!userData) {
            console.error("userData not found. Unable to fetch order.");
            return;
        }

        try {
            const response = await axiosInstance.get(`/orders/${orderId}`);
            return response.data; // Pastikan data dikembalikan dengan benar
        } catch (error) {
            console.error("Fetch order error:", error);
            throw error; // Pastikan error dilemparkan untuk ditangani di komponen
        }
    },


    setOrders: (orders) => set({ orders }),


    cancelOrder: async(orderId, setError) => {
        const userData = get().userData;
        if (!userData) {
            console.error("Token not found. Unable to cancel order.");
            setError("Token not found. Unable to cancel order.");
            return;
        }
        console.log("order id ini", orderId);
        try {
            const response = await axiosInstance.put(`/orders/${orderId}/cancel`,
                null, // No body payload required for cancellation
            );

            console.log("Cancel order response:", response.data);
            return response.data; // You may return additional data if needed
        } catch (error) {
            console.error("Cancel order error:", error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("Failed to cancel order. Please try again.");
            }
            throw error; // Re-throw error to handle in caller function
        }
    },

    fetchshipping: async() => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.get("/shippings", );
            set({ shippings: response.data.data });
            console.log("Fetched shipping successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch shipping error:", error);
        }
    },

    // Tambahkan dalam useProductStore
    createPayment: async(orderId, paymentData, setError) => {
        const userData = get().userData;
        if (!userData) {
            throw new Error("User tidak terautentikasi");
        }

        try {
            const response = await axiosInstance.post(
                `/payments/${orderId}/payment-by-order`, {
                    ...paymentData,
                    amount: get().orders.find(o => o.order_id === orderId).total
                }
            );

            const { payment: newPayment, updatedOrder } = response.data.data;

            console.log("response dari create payment", response.data.data)

            set((state) => ({
                payments: [...state.payments, newPayment],
                orders: state.orders.map(order =>
                    order.order_id === orderId ? {
                        ...order,
                        payment_status: updatedOrder.payment_status,
                        status: updatedOrder.status
                    } : order
                ),
                // orders: paymentData.payment_method === 'COD' ? [] : state.cartItems
            }));

            return newPayment;

        } catch (error) {
            const errorMessage = error.response.data.message ||
                "Terjadi kesalahan saat memproses pembayaran";
            throw new Error(errorMessage);
        }
    },

    updateOrderStatus: (orderId, newStatus) => {
        set((state) => ({
            orders: state.orders.map(order =>
                order.order_id === orderId ? {
                    ...order,
                    status: newStatus,
                    payment_status: newStatus === 'paid' ? 'completed' : 'pending'
                } : order
            )
        }));
    },


    fetchPayment: async() => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.get("/payments", );
            set({ payments: response.data.data });
            console.log("Fetched payment successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch payment error:", error);
        }
    },

    fetchHistories: async() => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("User tidak terautentikasi");
                set({ histories: [] }); // Reset state jika tidak ada user
                return;
            }

            const response = await axiosInstance.get("/order_histories");
            set({ histories: response.data.data || [] }); // Handle jika response kosong
        } catch (error) {
            console.error("Error:", error);
            set({ histories: [] }); // Reset state saat error
            toast.error("Gagal memuat riwayat pesanan");
        }
    },
    updateCourierLocation: async(courierId, courierData) => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to update courier.");
                return;
            }

            const response = await axiosInstance.put(`/orders/${courierId}/update-location`, courierData);
            console.log("courier updated successfully:", response.data);
            // Optionally, refetch the couriers to update the state
            get().fetchorders();
        } catch (error) {
            console.error("Update courier error:", error);
        }
    },

    // New action to check online status
    isUserOnline: (userId) => {
        return get().onlineUsers.includes(userId);
    },

    // Cleanup saat logout atau komponen unmount
    cleanup: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
        }
        set({
            user: null,
            userData: null,
            onlineUsers: [],
            socket: null,
            isConnected: false
        });
    },


}));

export default useProductStore;