import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import Pusher from 'pusher-js';

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
    couriers: [],
    sellers: [],
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
    productRatings: [],
    courierRatings: [],
    orderById: [],

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

    fetchCouriers: async(id) => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }


            const response = await axiosInstance.get(`/couriers/${id}`
                //     {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
            );
            set({ couriers: response.data.data });
            console.log("Fetched couriers successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch couriers error:", error);
        }
    },

    fetchSeller: async(id) => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }


            const response = await axiosInstance.get(`/couriers/${id}`
                //     {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
            );
            set({ sellers: response.data.data });
            console.log("Fetched couriers successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch couriers error:", error);
        }
    },


    fetchProducts: async() => {
        try {
            // const token = get().token;
            // if (!token) {
            //     console.error("Token not found. Unable to fetch products.");
            //     return;
            // }

            const response = await axiosInstance.get("/products",
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
            // const userData = get().userData;
            // if (!userData) {
            //     console.error("userData not found. Unable to fetch products.");
            //     return;
            // }

            const response = await axiosInstance.get("/products/desc",
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

            const response = await axiosInstance.get("/products/seller",
                //     {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
            );
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

            const response = await axiosInstance.get(`/products/${id}`
                //     , {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
            );
            return response.data.data;
        } catch (error) {
            console.error("Fetch product error:", error);
        }
    },

    addProduct: async(productData) => {
        const userData = get().userData;
        if (!userData) {
            console.error("userData not found. Unable to fetch products.");
            return;
        }

        try {
            const response = await axiosInstance.post("http://localhost:8001/api/products", productData
                //     , {
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //         'Content-Type': 'multipart/form-data'
                //     }
                // }
            );
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
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.put(`/products/${id}`, productData
                //     , {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //         "Content-Type": "multipart/form-data"
                //     },
                // }
            );
            console.log("Product updated successfully:", response.data);
            // Optionally, refetch the products to update the state
            get().fetchProducts();
        } catch (error) {
            console.error("Update product error:", error);
        }
    },


    deleteProduct: async(productId) => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.delete(`/products/${productId}`
                //     , {
                //     headers: {
                //         Authorization: `Bearer ${token}`,
                //     },
                // }
            );
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
            // console.error("Create order error:", error);

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
            set({ orderById: response.data.data || [] }); // Handle jika response kosong
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


    //tanpa midtrans
    // Tambahkan dalam useProductStore
    // createPayment: async(orderId, paymentData, setError) => {
    //     const userData = get().userData;
    //     if (!userData) {
    //         throw new Error("User tidak terautentikasi");
    //     }

    //     try {
    //         const response = await axiosInstance.post(
    //             `/payments/${orderId}/payment-by-order`, {
    //                 ...paymentData,
    //                 amount: get().orders.find(o => o.order_id === orderId).total
    //             }
    //         );

    //         const { payment: newPayment, updatedOrder } = response.data.data;

    //         console.log("response dari create payment", response.data.data)

    //         set((state) => ({
    //             payments: [...state.payments, newPayment],
    //             orders: state.orders.map(order =>
    //                 order.order_id === orderId ? {
    //                     ...order,
    //                     payment_status: updatedOrder.payment_status,
    //                     status: updatedOrder.status
    //                 } : order
    //             ),
    //             // orders: paymentData.payment_method === 'COD' ? [] : state.cartItems
    //         }));

    //         return newPayment;

    //     } catch (error) {
    //         const errorMessage = error.response.data.message ||
    //             "Terjadi kesalahan saat memproses pembayaran";
    //         throw new Error(errorMessage);
    //     }
    // },


    //dengan midtrans
    // createPayment: async(orderId, paymentData) => {
    //     const userData = get().userData;
    //     if (!userData) {
    //         throw new Error("User tidak terautentikasi");
    //     }

    //     try {
    //         const response = await axiosInstance.post(
    //             `/payments/${orderId}/payment-by-order`,
    //             paymentData
    //         );

    //         const { payment_data: newPayment, payment_url } = response.data;

    //         set((state) => ({
    //             payments: [...state.payments, newPayment],
    //             orders: state.orders.map(order =>
    //                 order.order_id === orderId ? {
    //                     ...order,
    //                     payment_status: newPayment.payment_status,
    //                     status: newPayment.order_status
    //                 } : order
    //             ),
    //             cartItems: paymentData.payment_method === 'COD' ? [] : state.cartItems
    //         }));

    //         return { payment: newPayment, payment_url };

    //     } catch (error) {
    //         const errorMessage = error.response.data.message ||
    //             "Terjadi kesalahan saat memproses pembayaran";
    //         throw new Error(errorMessage);
    //     }
    // },

    // processMidtransNotification: async(notification) => {
    //     try {
    //         const response = await axiosInstance.post('/payments/midtrans-notification', notification);
    //         const { updatedPayment, updatedOrder } = response.data;

    //         set((state) => ({
    //             payments: state.payments.map(payment =>
    //                 payment.id === updatedPayment.id ? updatedPayment : payment
    //             ),
    //             orders: state.orders.map(order =>
    //                 order.order_id === updatedOrder.id ? updatedOrder : order
    //             )
    //         }));

    //         return { success: true };
    //     } catch (error) {
    //         console.error('Error processing notification:', error);
    //         throw error;
    //     }
    // },

    createPayment: async(paymentData) => {
        const userData = get().userData;
        if (!userData) throw new Error("User tidak terautentikasi");

        try {
            const response = await axiosInstance.post(
                `/payments/${paymentData.order_id}/payment-by-order`,
                paymentData
            );

            const { payment_data: newPayment, payment_url } = response.data;

            // Update state
            set((state) => ({
                payments: [...state.payments, newPayment],
                orders: state.orders.map(order =>
                    order.order_id === paymentData.order_id ? {
                        ...order,
                        payment_status: newPayment.payment_status,
                        status: newPayment.payment_status === 'completed' ? 'process' : order.status
                    } : order
                )
            }));

            return { payment: newPayment, payment_url };
        } catch (error) {
            throw new Error(error.response.data.message || "Terjadi kesalahan saat memproses pembayaran");
        }
    },

    // checkPaymentStatus: async(orderId) => {
    //     try {
    //         const response = await axiosInstance.get(`/orders/${orderId}/status`);
    //         const order = response.data;

    //         // Jika pembayaran sudah selesai, update state
    //         if (order.payment_status === 'completed') {
    //             set((state) => ({
    //                 orders: state.orders.map(o =>
    //                     o.order_id === orderId ? {
    //                         ...o,
    //                         payment_status: 'completed',
    //                         status: 'process'
    //                     } : o
    //                 ),
    //                 payments: state.payments.map(p =>
    //                     p.order_id === orderId ? {
    //                         ...p,
    //                         payment_status: 'completed'
    //                     } : p
    //                 )
    //             }));
    //         }

    //         return order;
    //     } catch (error) {
    //         throw new Error(error.response.data.message || "Gagal memeriksa status pembayaran");
    //     }
    // },
    // // Initialize Pusher listener
    // initializePaymentListener: () => {
    //     try {
    //         // Initialize Pusher with your credentials
    //         const pusher = new Pusher("27dd26c02b96af0f4e50", {
    //             cluster: "ap1",
    //             forceTLS: true
    //         });

    //         // Subscribe to the channel
    //         const channel = pusher.subscribe('payment-channel');

    //         // Bind to payment-completed event
    //         channel.bind('payment-completed', (data) => {
    //             set((state) => ({
    //                 orders: state.orders.map(order =>
    //                     order.order_id === data.order_id ? {
    //                         ...order,
    //                         payment_status: 'completed',
    //                         status: 'process'
    //                     } : order
    //                 ),
    //                 payments: state.payments.map(payment =>
    //                     payment.order_id === data.order_id ? {
    //                         ...payment,
    //                         payment_status: 'completed'
    //                     } : payment
    //                 )
    //             }));

    //             // Show success notification
    //             toast.success('Pembayaran berhasil diproses!');
    //         });

    //         // Return cleanup function
    //         return () => {
    //             channel.unbind_all();
    //             channel.unsubscribe();
    //             pusher.disconnect();
    //         };
    //     } catch (error) {
    //         console.error('Error initializing Pusher:', error);
    //     }
    // },


    // // Setup Pusher listener di store initialization
    initializePaymentListener: () => {
        const pusher = new Pusher("27dd26c02b96af0f4e50", {
            cluster: "ap1",
            encrypted: true
        });

        const channel = pusher.subscribe('payment-channel');
        channel.bind('payment-completed', (data) => {
            set((state) => ({
                orders: state.orders.map(order =>
                    order.order_id === data.order_id ? {
                        ...order,
                        payment_status: 'completed',
                        status: 'process'
                    } : order
                ),
                payments: state.payments.map(payment =>
                    payment.order_id === data.order_id ? {
                        ...payment,
                        payment_status: 'completed'
                    } : payment
                )
            }));
        });
    },



    // updateOrderStatus: (orderId, newStatus) => {
    //     set((state) => ({
    //         orders: state.orders.map(order =>
    //             order.order_id === orderId ? {
    //                 ...order,
    //                 status: newStatus,
    //             } : order
    //         )
    //     }));
    // },
    updateOrderStatus: async(orderId, newStatus) => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to update order status.");
                return;
            }

            const response = await axiosInstance.put(`/orders/${orderId}/status`, newStatus);
            console.log("Status pesanan berhasil diperbarui:", response.data);

            // Refetch data pesanan untuk memperbarui state
            get().fetchOrder();
        } catch (error) {
            console.error("Gagal memperbarui status pesanan:", error);
        }
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

    fetchHistoriesById: async(orderId) => {
        if (!orderId) {
            console.warn("Order ID tidak ditemukan atau produk belum dipilih");
            set({ histories: [] }); // Reset state jika orderId kosong
            return;
        }

        try {
            const userData = get().userData;
            if (!userData) {
                console.error("User tidak terautentikasi");
                set({ histories: [] });
                return;
            }

            const response = await axiosInstance.get(`/orders/${orderId}`);
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
                console.error('userData not found. Unable to update courier.');
                return;
            }

            const response = await axiosInstance.put(
                `/orders/${courierId}/update-location`,
                courierData
            );
            console.log('courier updated successfully:', response.data);
            toast.success('Courier location updated successfully');
            // Optionally, refetch the couriers to update the state
            get().fetchorders();
        } catch (error) {
            console.error('Update courier error:', error);
        }
    },

    fetchRatProduct: async() => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("User tidak terautentikasi");
                set({ productRatings: [] });
                return;
            }

            const response = await axiosInstance.get(`/ratings`);
            set({ productRatings: response.data.data || [] }); // Handle jika response kosong
        } catch (error) {
            console.error("Error:", error);
            set({ productRatings: [] }); // Reset state saat error
            toast.error("Gagal memuat riwayat pesanan");
        }
    },
    fetchRatCourier: async() => {

        try {
            const userData = get().userData;
            if (!userData) {
                console.error("User tidak terautentikasi");
                set({ courierRatings: [] });
                return;
            }

            const response = await axiosInstance.get("/ratings/courier");
            set({ courierRatings: response.data.data || [] }); // Handle jika response kosong
        } catch (error) {
            console.error("Error:", error);
            set({ courierRatings: [] }); // Reset state saat error
            toast.error("Gagal memuat riwayat pesanan");
        }
    },

    createRatCourier: async(ratingData) => {
        const userData = get().userData; // Dapatkan userData dari state store

        if (!userData) {
            throw new Error("No userData available");
        }

        try {
            const response = await axiosInstance.post("/ratings/courier", ratingData);
            set((state) => ({
                courierRatings: [...state.courierRatings, response.data.data],
            }));
            console.log("rating added successfully:", response.data.data);
        } catch (error) {
            console.error("Add rating error:", error);
            throw error; // Re-throw the error to handle it in the component
        }
    },

    updateRatProduct: async(newRatData) => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error('userData not found. Unable to update courier.');
                return;
            }

            const response = await axiosInstance.put(
                `/ratings`,
                newRatData
            );
            console.log('product rating updated successfully:', response.data);
            toast.success('product rating updated successfully');
        } catch (error) {
            console.error('Update product rating error:', error);
        }
    },
    updateRatCourier: async(newRatData) => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error('userData not found. Unable to update courier.');
                return;
            }

            const response = await axiosInstance.put(
                `/ratings/courier`,
                newRatData
            );
            console.log('courier updated successfully:', response.data);
            toast.success('Courier rating updated successfully');
        } catch (error) {
            console.error('Update courier error:', error);
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