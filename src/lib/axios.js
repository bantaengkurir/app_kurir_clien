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

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        if (!error.response) {
            console.error('Network Error:', error.message);

            // Untuk development, tampilkan error lengkap
            if (
                import.meta.env.MODE === 'development') {
                toast.error(`Network Error: ${error.message}`);
            } else {
                toast.error('Network problem occurred. Please check your connection.');
            }

            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {

                const { logout } = useAuthStore.getState();
                await logout();
                // Membersihkan semua cookie
                document.cookie.split(';').forEach(cookie => {
                    const [name] = cookie.trim().split('=');
                    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                });

                // Force clear storage tambahan
                localStorage.clear();
                sessionStorage.clear();

                // Redirect ke login
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