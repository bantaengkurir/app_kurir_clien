// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.MODE === "development" ? "http://localhost:8001/api" : "/api",
//     withCredentials: true,
// });


import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";


// Buat instance axios
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ?
        "http://localhost:8001/api" : "/api",
    withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async(error) => {
//         if (!error.response) {
//             console.error('Network Error ji:', error.message);

//             // Untuk development, tampilkan error lengkap
//             if (
//                 import.meta.env.MODE === 'development') {
//                 toast.error(`Network Error: ${error.message}`);
//             } else {
//                 toast.error('Network problem occurred. Please check your connection.');
//             }

//             return Promise.reject(error);
//         }

//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {

//                 const { logout } = useAuthStore.getState();
//                 await logout();
//                 // Membersihkan semua cookie
//                 document.cookie.split(';').forEach(cookie => {
//                     const [name] = cookie.trim().split('=');
//                     document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
//                 });

//                 // Force clear storage tambahan
//                 localStorage.clear();
//                 sessionStorage.clear();

//                 // Redirect ke login
//                 if (window.location.pathname !== '/login') {
//                     window.location.href = '/login';
//                     toast.error('Session expired. Please login again.');
//                 }
//             } catch (err) {
//                 console.error('Logout failed:', err);
//             }
//         }

//         return Promise.reject(error);
//     }
// );



// ! ini yang sudah bisa register tanpa mengarahkan kehalaman login
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async(error) => {
//         if (!error.response) {
//             console.error('Network Error:', error.message);
//             toast.error(
//                 import.meta.env.MODE === 'development' ?
//                 `Network Error: ${error.message}` :
//                 'Network problem occurred. Please check your connection.'
//             );
//             return Promise.reject(error);
//         }

//         const originalRequest = error.config;

//         // Tambahkan pengecualian untuk endpoint registrasi
//         if (error.response.status === 401 &&
//             !originalRequest._retry &&
//             !originalRequest.url.includes('/auth/register') // <-- Pengecualian untuk registrasi
//         ) {
//             originalRequest._retry = true;
//             try {
//                 const { logout } = useAuthStore.getState();
//                 await logout();

//                 // Bersihkan storage
//                 document.cookie.split(';').forEach(cookie => {
//                     const [name] = cookie.trim().split('=');
//                     document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
//                 });
//                 localStorage.clear();
//                 sessionStorage.clear();

//                 // Redirect ke login
//                 if (window.location.pathname !== '/login') {
//                     setTimeout(() => {
//                         toast.error('Session expired. Please login again.');
//                         window.location.href = '/login';
//                     }, 9000); // Tambahkan delay 1 detik sebelum redirect

//                 }
//             } catch (err) {
//                 console.error('Logout failed:', err);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        if (!error.response) {
            console.error('Network Error:', error.message);
            toast.error(
                import.meta.env.MODE === 'development' ?
                `Network Error: ${error.message}` :
                'Network problem occurred. Please check your connection.'
            );
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        // Pengecualian untuk endpoint yang tidak perlu auto-logout
        const excludedEndpoints = [
            '/auth/register',
            '/auth/loginweb' // Tambahkan endpoint login ke pengecualian
        ];

        if (error.response.status === 401 &&
            !originalRequest._retry &&
            !excludedEndpoints.some(endpoint => originalRequest.url.includes(endpoint))
        ) {
            originalRequest._retry = true;
            try {
                const { logout } = useAuthStore.getState();
                await logout();

                document.cookie.split(';').forEach(cookie => {
                    const [name] = cookie.trim().split('=');
                    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                });
                localStorage.clear();
                sessionStorage.clear();

                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                    toast.error('Session expired. Please login again.');
                }
            } catch (err) {
                console.error('Logout failed:', err);
            }
        }

        return Promise.reject(error);
    }
);


// import axios from "axios";
// import useAuthStore from "../store/useAuthStore";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom"; // Tambahkan ini

// // Buat instance axios
// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.MODE === "development" ?
//         "http://localhost:8001/api" : "/api",
//     withCredentials: true,
// });

// // Buat interceptor yang bisa menerima navigate sebagai parameter
// const createAxiosInterceptor = (navigate) => {
//     return axiosInstance.interceptors.response.use(
//         (response) => response,
//         async(error) => {
//             if (!error.response) {
//                 console.error('Network Error ji:', error.message);

//                 // Untuk development, tampilkan error lengkap
//                 if (
//                     import.meta.env.MODE === 'development') {
//                     toast.error(`Network Error: ${error.message}`);
//                 } else {
//                     toast.error('Network problem occurred. Please check your connection.');
//                 }

//                 return Promise.reject(error);
//             }

//             const originalRequest = error.config;

//             if (error.response.status === 401 && !originalRequest._retry) {
//                 originalRequest._retry = true;

//                 try {
//                     const { logout } = useAuthStore.getState();
//                     await logout();
//                     // Membersihkan semua cookie
//                     document.cookie.split(';').forEach(cookie => {
//                         const [name] = cookie.trim().split('=');
//                         document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
//                     });

//                     // Force clear storage tambahan
//                     localStorage.clear();
//                     sessionStorage.clear();

//                     // Redirect ke login tanpa reload
//                     if (window.location.pathname !== '/login') {
//                         navigate('/login'); // Gunakan navigate daripada window.location
//                         toast.error('Session expired. Please login again.');
//                     }
//                 } catch (err) {
//                     console.error('Logout failed:', err);
//                 }
//             }

//             return Promise.reject(error);
//         }
//     );
// };

// // Export fungsi untuk setup interceptor
// export const setupAxiosInterceptor = (navigate) => {
//     return createAxiosInterceptor(navigate);
// };