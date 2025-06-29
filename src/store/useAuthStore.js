// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";
// import axios from "axios";

// const BASE_URL =
//     import.meta.env.MODE === "development" ? "http://localhost:8001" : "/";

// const useAuthStore = create((set, get) => ({
//     authUser: null,
//     userId: null,
//     isSigningUp: false,
//     isLoggingIn: false,
//     isUpdatingProfile: false,
//     isCheckingAuth: true,
//     onlineUsers: [],
//     socket: null,

//     checkAuth: async() => {
//         try {
//             const res = await axiosInstance.get("auth/check");

//             set({ authUser: res.data });
//             get().connectSocket();
//         } catch (error) {
//             console.log("Error in checkAuth:", error);
//             set({ authUser: null });
//         } finally {
//             set({ isCheckingAuth: false });
//         }
//     },

//     signup: async(data) => {
//         set({ isSigningUp: true });
//         try {
//             const res = await axiosInstance.post("/auth/signup", data);
//             set({ authUser: res.data });
//             toast.success("Account created successfully");
//             get().connectSocket();
//         } catch (error) {
//             toast.error(error.response.data.message);
//         } finally {
//             set({ isSigningUp: false });
//         }
//     },

//     // login: async(credentials, navigate) => {
//     //     try {
//     //         const response = await axios.post(
//     //             "https://localhost:8000/api/auth/login",
//     //             credentials
//     //         );
//     //         const data = response.data;
//     //         set({ authUser: data.data.data });
//     //         localStorage.setItem("token", data.data.token);

//     //         console.log("user", data.data.data)
//     //         navigate("/");
//     //         window.location.reload();

//     //         toast.success("Logged in successfully");

//     //         get().connectSocket();


//     //     } catch (error) {
//     //         toast.error(error.response);
//     //     } finally {
//     //         set({ isLoggingIn: false });
//     //     }
//     // },

//     login: async(data) => {
//         set({ isLoggingIn: true });
//         try {
//             const res = await axiosInstance.post("/auth/login", data);
//             set({ authUser: res.data.data.data });
//             console.log("ini login", res.data.data.data);
//             toast.success("Logged in successfully");


//             get().connectSocket();
//         } catch (error) {
//             toast.error(error.response);
//         } finally {
//             set({ isLoggingIn: false });
//         }
//     },

//     logout: async() => {
//         try {
//             await axiosInstance.post("/auth/logout");
//             set({ authUser: null });
//             toast.success("Logged out successfully");
//             get().disconnectSocket();
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     },

//     updateProfile: async(data) => {
//         set({ isUpdatingProfile: true });
//         try {
//             const res = await axiosInstance.put("/auth/update-profile", data);
//             set({ authUser: res.data });
//             toast.success("Profile updated successfully");
//         } catch (error) {
//             console.log("error in update profile:", error);
//             toast.error(error.response.data.message);
//         } finally {
//             set({ isUpdatingProfile: false });
//         }
//     },


//     connectSocket: () => {
//         const { authUser } = get();
//         if (!authUser || (get().socket && get().socket.connected)) return;

//         const socket = io(BASE_URL, {
//             query: {
//                 userId: authUser.id,
//             },
//         });
//         socket.connect();
//         console.log("ini user", authUser)

//         set({ socket });

//         socket.on("getOnlineUsers", (userIds) => {
//             console.log("Online users:", userIds);
//             set({ onlineUsers: userIds });
//         });
//     },

//     disconnectSocket: () => {
//         const socket = get().socket;
//         if (socket && socket.connected) {
//             socket.disconnect();
//         }
//     },


//     // connectSocket: () => {
//     //     const { authUser } = get();
//     //     if (!authUser || get().socket.connected) return;

//     //     const socket = io(BASE_URL, {
//     //         query: {
//     //             userId: authUser.id,
//     //         },
//     //     });
//     //     socket.connect();

//     //     set({ socket: socket });

//     //     socket.on("getOnlineUsers", (userIds) => {
//     //         set({ onlineUsers: userIds });
//     //     });
//     // },
//     // disconnectSocket: () => {
//     //     if (get().socket.connected) get().socket.disconnect();
//     // },
// }));

// export default useAuthStore;


// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";

// const BASE_URL =
//     import.meta.env.MODE === "development" ? "http://localhost:8001" : "/";

// const useAuthStore = create((set, get) => ({
//     authUser: null, // Ambil data dari localStorage
//     userId: null,
//     isSigningUp: false,
//     isLoggingIn: false,
//     isUpdatingProfile: false,
//     isCheckingAuth: true,
//     onlineUsers: [],
//     socket: null,

//     checkAuth: async() => {
//         try {
//             const res = await axiosInstance.get("auth/check");

//             set({ authUser: res.data });
//             localStorage.setItem("authUser", JSON.stringify(res.data)); // Simpan data ke localStorage
//             get().connectSocket();
//         } catch (error) {
//             console.log("Error in checkAuth:", error);
//             set({ authUser: null });
//             localStorage.removeItem("authUser"); // Hapus data dari localStorage jika error
//         } finally {
//             set({ isCheckingAuth: false });
//         }
//     },

//     signup: async(data) => {
//         set({ isSigningUp: true });
//         try {
//             const res = await axiosInstance.post("/auth/signup", data);
//             set({ authUser: res.data });
//             localStorage.setItem("authUser", JSON.stringify(res.data)); // Simpan data ke localStorage
//             toast.success("Account created successfully");
//             get().connectSocket();
//         } catch (error) {
//             toast.error(error.response.data.message);
//         } finally {
//             set({ isSigningUp: false });
//         }
//     },

//     login: async(data) => {
//         set({ isLoggingIn: true });
//         try {
//             const res = await axiosInstance.post("/auth/login", data);
//             set({ authUser: res.data.data.data });
//             localStorage.setItem("authUser", JSON.stringify(res.data.data.data)); // Simpan data ke localStorage
//             console.log("ini login", res.data.data.data);
//             toast.success("Logged in successfully");

//             get().connectSocket();
//         } catch (error) {
//             toast.error(error.response);
//         } finally {
//             set({ isLoggingIn: false });
//         }
//     },

//     logout: async() => {
//         try {
//             await axiosInstance.post("/auth/logout");
//             set({ authUser: null });
//             localStorage.removeItem("authUser"); // Hapus data dari localStorage
//             toast.success("Logged out successfully");
//             get().disconnectSocket();
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     },

//     updateProfile: async(data) => {
//         set({ isUpdatingProfile: true });
//         try {
//             const res = await axiosInstance.put("/auth/update-profile", data);
//             set({ authUser: res.data });
//             localStorage.setItem("authUser", JSON.stringify(res.data)); // Simpan data ke localStorage
//             toast.success("Profile updated successfully");
//         } catch (error) {
//             console.log("error in update profile:", error);
//             toast.error(error.response.data.message);
//         } finally {
//             set({ isUpdatingProfile: false });
//         }
//     },

//     connectSocket: () => {
//         const { authUser, socket } = get();

//         // Jika tidak ada authUser, return
//         if (!authUser) return;

//         // Bersihkan socket lama jika ada
//         if (socket) {
//             socket.disconnect();
//             socket.removeAllListeners(); // Hapus semua event listener
//             set({ socket: null });
//         }

//         // Buat koneksi socket baru
//         const newSocket = io(BASE_URL, {
//             query: {
//                 userId: authUser.id,
//             },
//             reconnection: true, // Aktifkan rekoneksi otomatis
//             reconnectionAttempts: 5, // Jumlah percobaan rekoneksi
//             reconnectionDelay: 1000, // Delay antara percobaan rekoneksi (1 detik)
//         });

//         newSocket.connect();
//         console.log("Socket connected for user:", authUser);

//         set({ socket: newSocket });

//         // Daftarkan event listener
//         newSocket.on("getOnlineUsers", (userIds) => {
//             console.log("Online users:", userIds);
//             set({ onlineUsers: userIds });
//         });

//         // Handle socket connection errors
//         newSocket.on("connect_error", (error) => {
//             console.error("Socket connection error:", error);
//         });

//         // Handle rekoneksi
//         newSocket.on("reconnect", (attempt) => {
//             console.log("Socket reconnected after attempt:", attempt);
//         });

//         newSocket.on("reconnect_failed", () => {
//             console.error("Socket reconnection failed");
//         });
//     },

//     disconnectSocket: () => {
//         const socket = get().socket;
//         if (socket && socket.connected) {
//             socket.disconnect();
//             socket.removeAllListeners(); // Hapus semua event listener
//             set({ socket: null });
//         }
//     },
// }));

// export default useAuthStore;

// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";
// import { io } from "socket.io-client";
// import { persist } from "zustand/middleware";
// import axios from "axios";

// const BASE_URL =
//     import.meta.env.MODE === "development" ? "http://localhost:8001" : "/";

// const userDataCookie = document.cookie
//     .split("; ") // Pisahkan setiap cookie
//     .find((row) => row.startsWith("user_data=")).split("=")[1] || null;

// console.log("user data", userDataCookie)

// const useAuthStore = create(
//     persist(
//         (set, get) => ({
//             authUser: null, // Default: tidak ada user
//             userId: null,
//             isSigningUp: false,
//             isLoggingIn: false,
//             isUpdatingProfile: false,
//             isCheckingAuth: true,
//             onlineUsers: [],
//             socket: null,

//             checkAuth: async() => {
//                 try {
//                     const res = await axios.get("http://localhost:8001/api/auth/check");
//                     if (res.data) {
//                         set({ authUser: res.data });
//                         get().connectSocket();
//                     }
//                 } catch (error) {
//                     console.log("Error in checkAuth:", error);
//                     set({ authUser: null });
//                 } finally {
//                     set({ isCheckingAuth: false });
//                 }
//             },


//             signup: async(data) => {
//                 set({ isSigningUp: true });
//                 try {
//                     const res = await axiosInstance.post("/auth/signup", data);
//                     set({ authUser: res.data });
//                     toast.success("Account created successfully");
//                     get().connectSocket();
//                 } catch (error) {
//                     toast.error(error.response.data.message || "Signup failed");
//                 } finally {
//                     set({ isSigningUp: false });
//                 }
//             },

//             login: async(data) => {
//                 set({ isLoggingIn: true });
//                 try {
//                     const res = await axiosInstance.post("/auth/login", data);
//                     if (res.data.data.data) {
//                         set({ authUser: res.data.data.data });
//                         get().connectSocket();
//                     }
//                     toast.success("Logged in successfully");
//                 } catch (error) {
//                     toast.error(error.response.data.message || "Login failed");
//                 } finally {
//                     set({ isLoggingIn: false });
//                 }
//             },


//             logout: async() => {
//                 try {
//                     await axiosInstance.post("/auth/logout");
//                     set({ authUser: null });
//                     toast.success("Logged out successfully");
//                     get().disconnectSocket();
//                 } catch (error) {
//                     toast.error(error.response.data.message || "Logout failed");
//                 }
//             },

//             updateProfile: async(data) => {
//                 set({ isUpdatingProfile: true });
//                 try {
//                     const res = await axiosInstance.put("/auth/update-profile", data);
//                     set({ authUser: res.data });
//                     toast.success("Profile updated successfully");
//                 } catch (error) {
//                     console.log("Error in update profile:", error);
//                     toast.error(error.response.data.message || "Update failed");
//                 } finally {
//                     set({ isUpdatingProfile: false });
//                 }
//             },

//             connectSocket: () => {
//                 const { authUser, socket } = get();

//                 if (!authUser || !authUser.id) {
//                     console.error("Socket connection failed: authUser is null");
//                     return;
//                 }

//                 if (socket) {
//                     socket.disconnect();
//                     socket.removeAllListeners();
//                     set({ socket: null });
//                 }

//                 const newSocket = io(BASE_URL, {
//                     query: { userId: authUser.id },
//                     reconnection: true,
//                     reconnectionAttempts: 5,
//                     reconnectionDelay: 1000,
//                 });

//                 newSocket.on("connect", () => {
//                     console.log("Socket connected for user:", authUser.id);
//                     set({ socket: newSocket });
//                 });

//                 newSocket.on("getOnlineUsers", (userIds) => {
//                     console.log("Online users:", userIds);
//                     set({ onlineUsers: userIds });
//                 });

//                 newSocket.on("connect_error", (error) => {
//                     console.error("Socket connection error:", error);
//                 });

//                 newSocket.on("reconnect", (attempt) => {
//                     console.log("Socket reconnected after attempt:", attempt);
//                 });

//                 newSocket.on("reconnect_failed", () => {
//                     console.error("Socket reconnection failed");
//                 });
//             },


//             disconnectSocket: () => {
//                 const socket = get().socket;
//                 if (socket && socket.connected) {
//                     socket.disconnect();
//                     socket.removeAllListeners();
//                     set({ socket: null });
//                 }
//             },
//         }), {
//             name: "auth-storage", // Nama key dalam cookie
//             getStorage: () => ({
//                 getItem: (name) => {
//                     const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
//                         const [key, value] = cookie.split("=");
//                         acc[key] = value ? decodeURIComponent(value) : null;
//                         return acc;
//                     }, {});
//                     return cookies[name] ? cookies[name] : null;
//                 },
//                 setItem: (name, value) => {
//                     document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=86400;`; // Cookie bertahan 1 hari
//                 },
//                 removeItem: (name) => {
//                     document.cookie = `${name}=; path=/; max-age=0;`;
//                 },
//             }),
//             partialize: (state) => {
//                 const { socket, ...rest } = state;
//                 return rest;
//             },
//         }
//     )
// );

// export default useAuthStore;


import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { persist } from "zustand/middleware";
import axios from "axios";


const BASE_URL =
    import.meta.env.MODE === "development" ? "http://localhost:8001" : "/";

// Fungsi aman untuk mendapatkan data user dari cookie
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

// console.log("data user", getUserDataFromCookie())

const useAuthStore = create(
    // persist(
    (set, get) => ({
        authUser: getUserDataFromCookie(), // Langsung ambil data user dari cookie
        userId: null,
        isSigningUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true,
        onlineUsers: [],
        socket: null,

        checkAuth: async() => {
            try {

                const res = await axios.get("http://localhost:8001/api/auth/check");
                if (res.data) {
                    set({ authUser: res.data });
                    get().connectSocket();
                }
            } catch (error) {
                console.log("Error in checkAuth:", error);
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        // signup: async(data) => {
        //     set({ isSigningUp: true });
        //     try {
        //         const res = await axiosInstance.post("/auth/register", data);
        //         set({ authUser: res.data });
        //         document.cookie = `user_data=${encodeURIComponent(JSON.stringify(res.data))}; path=/; max-age=86400;`;

        //         toast.success("Account created successfully");
        //         get().connectSocket();
        //     } catch (error) {
        //         toast.error(error.response.data.message || "Signup failed");
        //     } finally {
        //         set({ isSigningUp: false });
        //     }
        // },

        signup: async(data) => {
            set({ isSigningUp: true });
            try {
                const res = await axiosInstance.post("/auth/register", data);
                set({ authUser: res.data });
                document.cookie = `user_data=${encodeURIComponent(JSON.stringify(res.data))}; path=/; max-age=86400;`;
                toast.success("Account created successfully");
                get().connectSocket();
                return { success: true }; // Tandai bahwa signup berhasil
            } catch (error) {
                toast.error(error.response.data.message || "Signup failed");
                return { success: false, error: error.response.data }; // Tandai gagal + error
            } finally {
                set({ isSigningUp: false });
            }
        },

        // login: async(data) => {
        //     set({ isLoggingIn: true });
        //     try {
        //         const res = await axiosInstance.post("/auth/loginweb", data);
        //         console.log("ini login", res.data.data.data)
        //         if (res.data.data.data) {
        //             set({ authUser: res.data.data.data });
        //             document.cookie = `user_data=${encodeURIComponent(JSON.stringify(res.data.data.data))}; path=/; max-age=86400;`;
        //             get().connectSocket();
        //         }
        //         toast.success("Logged in successfully");
        //         // window.location.reload();
        //     } catch (error) {
        //         toast.error(error.response.data.message || "Login failed");
        //     } finally {
        //         set({ isLoggingIn: false });
        //     }
        // },

        // logout: async() => {
        //     try {
        //         await axiosInstance.post("/auth/logoutWeb");
        //         set({ authUser: null });
        //         document.cookie = "user_data=; path=/; max-age=0;";
        //         toast.success("Logged out successfully");
        //         window.location.reload();
        //         get().disconnectSocket();

        //     } catch (error) {
        //         toast.error(error.response.data.message || "Logout failed");
        //     }
        // },

        // store/useAuthStore.js
        login: async(data) => {
            set({ isLoggingIn: true });
            try {
                const res = await axiosInstance.post("/auth/loginweb", data);

                if (!res.data.data.data) {
                    throw new Error('Invalid response structure from server');
                }

                const userData = {
                    ...res.data.data.data,
                    token: res.data.data.token // Pastikan backend mengembalikan token
                };

                set({ authUser: userData });
                document.cookie = `user_data=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400;`;
                get().connectSocket();
                toast.success("Logged in successfully");
                return userData;
            } catch (error) {
                console.error('Login error:', error);

                // Handle error dengan lebih baik
                let errorMessage = 'Login failed';
                if (error.response) {
                    errorMessage = error.response.data.message || error.response.statusText;
                } else if (error.request) {
                    errorMessage = 'No response from server';
                } else {
                    errorMessage = error.message;
                }

                toast.error(errorMessage);
                throw error;
            } finally {
                set({ isLoggingIn: false });
            }
        },

        // logout: async() => {
        //     try {
        //         await axiosInstance.post("/auth/logoutWeb");
        //         set({ authUser: null });
        //         document.cookie = "user_data=; path=/; max-age=0;";
        //         toast.success("Logged out successfully");
        //         window.location.reload();
        //         get().disconnectSocket();
        //     } catch (error) {
        //         toast.error(error.response.data.message || "Logout failed");
        //     }
        // },

        // store/useAuthStore.js
        // logout: async() => {
        //     try {
        //         await axiosInstance.post("/auth/logoutWeb");
        //         // Membersihkan semua cookie dan local storage
        //         document.cookie.split(';').forEach(cookie => {
        //             const [name] = cookie.trim().split('=');
        //             document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        //         });
        //         localStorage.clear();
        //         // authUser(); // Removed as it is not defined
        //         localStorage.removeItem('auth-storage');
        //         set({ authUser: null });
        //         toast.success("Logged out successfully");
        //         window.location.reload();
        //     } catch (error) {
        //         toast.error(error.response.data.message || "Logout failed");
        //     }
        // },

        // logout: async() => {
        //     try {
        //         await axiosInstance.post("/auth/logoutWeb");

        //         // Membersihkan semua cookie
        //         document.cookie.split(';').forEach(cookie => {
        //             const [name] = cookie.trim().split('=');
        //             document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        //         });

        //         // Membersihkan localStorage
        //         localStorage.clear();

        //         // Reset state
        //         set({
        //             authUser: null,
        //             userId: null,
        //             socket: null,
        //             onlineUsers: []
        //         });

        //         // Membersihkan persistensi Zustand
        //         // Ini akan memicu rehydrasi state kosong
        //         await useAuthStore.persist.clearStorage();

        //         toast.success("Logged out successfully");
        //         window.location.href = '/login'; // Redirect ke login page
        //     } catch (error) {
        //         toast.error(error.response.data.message || "Logout failed");
        //     }
        // },

        logout: async() => {
            try {
                // 1. Panggil API logout (meskipun cookie mungkin sudah hilang)
                await axiosInstance.post("/auth/logoutWeb");

                // 2. Force-reset semua state dan storage
                set({
                    authUser: null,
                    userId: null,
                    // ...reset state lainnya
                });

                localStorage.clear();
                sessionStorage.clear();

                // 3. Hapus semua cookie yang mungkin ada
                document.cookie.split(";").forEach(cookie => {
                    const [name] = cookie.trim().split("=");
                    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
                });

                // 4. Redirect dengan hard reload
                window.location.href = "/login";
            } catch (error) {
                // Jika API gagal (misal: 401), tetap lakukan cleanup
                if (error.response.status === 401) {
                    set({ authUser: null, userId: null });
                    window.location.href = "/login";
                } else {
                    toast.error("Logout failed. Please try again.");
                }
            }
        },


        verify: async(data) => {
            set({ isSigningUp: true });
            try {
                const res = await axios.post("http://localhost:8001/api/auth/verify-email", data);
                return res.data;
                // set({ authUser: res.data });
                // localStorage.setItem("authUser", JSON.stringify(res.data)); // Simpan data user di local storage
            } catch (error) {
                toast.error(error.response.data.message || "Verification failed");
            } finally {
                set({ isSigningUp: false });
            }
        },
        resendEmail: async(data) => {
            set({ isSigningUp: true });
            try {
                const res = await axios.post("http://localhost:8001/api/auth/resend-email", {
                    email: data.email
                });

                if (res.data.success) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message || "Failed to resend email");
                }

                return res.data;
            } catch (error) {
                const errorMessage = error.response.data.message || "Verification failed";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            } finally {
                set({ isSigningUp: false });
            }
        },

        updateProfile: async(data) => {
            set({ isUpdatingProfile: true });
            try {
                const res = await axiosInstance.put("/auth/update-profile", data);
                set({ authUser: res.data });
                document.cookie = `user_data=${encodeURIComponent(JSON.stringify(res.data))}; path=/; max-age=86400;`;
                toast.success("Profile updated successfully");
            } catch (error) {
                console.log("Error in update profile:", error);
                toast.error(error.response.data.message || "Update failed");
            } finally {
                set({ isUpdatingProfile: false });
            }
        },

        connectSocket: () => {
            const { authUser, socket } = get();

            if (!authUser || !authUser.id) {
                console.error("Socket connection failed: authUser is null");
                return;
            }

            if (socket) {
                socket.disconnect();
                socket.removeAllListeners();
                set({ socket: null });
            }

            const newSocket = io(BASE_URL, {
                query: { userId: authUser.id },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            newSocket.on("connect", () => {
                console.log("Socket connected for user:", authUser.id);
                set({ socket: newSocket });
            });

            newSocket.on("getOnlineUsers", (userIds) => {
                console.log("Online users:", userIds);
                set({ onlineUsers: userIds });
            });

            newSocket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            newSocket.on("reconnect", (attempt) => {
                console.log("Socket reconnected after attempt:", attempt);
            });

            newSocket.on("reconnect_failed", () => {
                console.error("Socket reconnection failed");
            });
        },

        disconnectSocket: () => {
            const socket = get().socket;
            if (socket && socket.connected) {
                socket.disconnect();
                socket.removeAllListeners();
                set({ socket: null });
            }
        },
    }),
    //  {
    //     name: "auth-storage",
    //     getStorage: () => ({
    //         getItem: (name) => {
    //             const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    //                 const [key, value] = cookie.split("=");
    //                 acc[key] = value ? decodeURIComponent(value) : null;
    //                 return acc;
    //             }, {});
    //             return cookies[name] ? cookies[name] : null;
    //         },
    //         setItem: (name, value) => {
    //             document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=86400;`;
    //         },
    //         removeItem: (name) => {
    //             document.cookie = `${name}=; path=/; max-age=0;`;
    //         },
    //     }),
    //     partialize: (state) => {
    //         const { socket, ...rest } = state;
    //         return rest;
    //     },
    // }
    // )
);

export default useAuthStore;