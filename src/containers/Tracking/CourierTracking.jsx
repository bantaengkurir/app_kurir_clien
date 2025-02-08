import React, { useEffect, useState } from "react";
import io from "socket.io-client"; // Import socket.io-client

const CourierTracking = ({ orderId, courierId }) => {
    const [socket, setSocket] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    // Fungsi untuk mendapatkan lokasi saat ini
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });

                    // Kirim update lokasi ke server
                    if (socket) {
                        socket.emit("updateLocation", {
                            orderId,
                            courierId,
                            latitude,
                            longitude,
                        });
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    // Buka koneksi WebSocket saat komponen dimount
    useEffect(() => {
        const newSocket = io("http://localhost:5173", {
            query: {
                userId: courierId,
                role: "courier",
                orderId,
            },
        });

        setSocket(newSocket);

        // Kirim update lokasi setiap 10 detik
        const interval = setInterval(getCurrentLocation, 10000);

        return () => {
            newSocket.disconnect(); // Tutup koneksi saat komponen di-unmount
            clearInterval(interval); // Hentikan interval
        };
    }, [orderId, courierId]);

    return (
        <div>
            <h3>Lacak Lokasi Kurir</h3>
            {currentLocation ? (
                <p>
                    Lokasi saat ini: {currentLocation.latitude}, {currentLocation.longitude}
                </p>
            ) : (
                <p>Mengambil lokasi...</p>
            )}
        </div>
    );
};

export default CourierTracking;