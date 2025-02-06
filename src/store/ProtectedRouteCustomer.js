import { useNavigate } from "react-router-dom";
import useAuthStore from "./useAuthStore";
import { useEffect } from "react";
import useProductStore from "./useProductStore";

const ProtectedRoute = ({ children, allowedRole }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
    const { user, fetchUsers } = useProductStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Arahkan ke halaman login jika tidak terautentikasi
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (user && user.length > 0) {
            if (user[0].role !== allowedRole) {
                navigate('/notfound'); // Ganti dengan halaman yang sesuai
            }
        }
    }, [user, navigate, allowedRole]);

    if (!isAuthenticated || !user || user.length === 0) {
        return null; // Atau tampilkan pesan atau komponen loading jika perlu
    }

    return children;
};

export default ProtectedRoute;