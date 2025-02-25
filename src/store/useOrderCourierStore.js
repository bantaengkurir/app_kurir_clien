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

const useOrderCourierStore = create((set, get) => ({
    // Existing state
    user: null,
    couriers: [],
    userData: getUserDataFromCookie(),
    productItems: [],
    productDesc: [],
    productSeller: [],
    cartItems: [],
    payments: [],
    selectedCart: JSON.parse(localStorage.getItem('selectedCart')) || [],
    courierOrders: [],
    shippings: [],
    ratings: [],
    hostories: [],
    errorMessage: '',
    productRatings: [],
    courierRatings: [],
    courierOrderById: [],

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

    fetchOrder: async() => {
        try {
            const userData = get().userData;
            if (!userData) {
                console.error("userData not found. Unable to fetch products.");
                return;
            }

            const response = await axiosInstance.get("/orders/courier&order", );
            set({ courierOrders: response.data.data });
            console.log("Fetched orders successfully:", response.data.data);
        } catch (error) {
            console.error("Fetch orders error:", error);
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
            set({ courierOrderById: response.data.data || [] }); // Handle jika response kosong
        } catch (error) {
            console.error("Fetch order error:", error);
            throw error; // Pastikan error dilemparkan untuk ditangani di komponen
        }
    },


    setOrders: (courierOrders) => set({ courierOrders }),


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

export default useOrderCourierStore;