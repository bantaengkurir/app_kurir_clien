import { useEffect } from "react";
import { io } from "socket.io-client";

const CourierLocationHandler = ({ userId, role }) => {
    useEffect(() => {
        if (role !== "courier") return;

        const socket = io("http://localhost:8001", {
            query: { userId },
            withCredentials: true,
            transports: ["websocket", "polling"],
        });

        // Handler untuk permintaan lokasi awal
        const handleRequestLocation = () => {
            if (!navigator.geolocation) {
                console.error("Geolocation tidak didukung browser ini");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        // Dapatkan alamat dari koordinat menggunakan API geocoding
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
                        );
                        const addressData = await response.json();

                        const locationData = {
                            address: addressData.display_name,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };

                        // Kirim lokasi ke server via Socket.io
                        socket.emit("updateLocation", locationData);
                        console.log("Lokasi awal berhasil dikirim ke server");
                    } catch (error) {
                        console.error("Gagal mendapatkan alamat atau mengupdate lokasi:", error);
                    }
                },
                (error) => {
                    console.error("Error mendapatkan lokasi:", error);
                },
                { enableHighAccuracy: true }
            );
        };

        // Handler untuk permintaan update lokasi berkala
        const handleRequestLocationUpdate = () => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
                        );
                        const addressData = await response.json();

                        const locationData = {
                            address: addressData.display_name,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };

                        socket.emit("updateLocation", locationData);
                        console.log("Lokasi diperbarui dan dikirim ke server");
                    } catch (error) {
                        console.error("Gagal memperbarui lokasi:", error);
                    }
                },
                (error) => {
                    console.error("Error mendapatkan lokasi:", error);
                },
                { enableHighAccuracy: true }
            );
        };

        // Daftarkan event listener
        socket.on("requestLocation", handleRequestLocation);
        socket.on("requestLocationUpdate", handleRequestLocationUpdate);

        return () => {
            socket.off("requestLocation", handleRequestLocation);
            socket.off("requestLocationUpdate", handleRequestLocationUpdate);
            socket.disconnect();
        };
    }, [userId, role]);

    return null;
};

export default CourierLocationHandler;