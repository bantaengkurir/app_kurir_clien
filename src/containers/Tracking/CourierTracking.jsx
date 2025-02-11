// // CourierTracking.js
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client"; // Import socket.io-client

// const CourierTracking = ({ orderId, courierId }) => {
//     const [socket, setSocket] = useState(null);
//     const [currentLocation, setCurrentLocation] = useState(null);

//     // Fungsi untuk mendapatkan lokasi saat ini
//     const getCurrentLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     console.log("Current location:", latitude, longitude); // Debug log
//                     setCurrentLocation({ latitude, longitude });

//                     // Kirim update lokasi ke server
//                     if (socket) {
//                         socket.emit("updateLocation", {
//                             orderId,
//                             courierId,
//                             latitude,
//                             longitude,
//                         });
//                         console.log("Location update sent to server"); // Debug log
//                     }
//                 },
//                 (error) => {
//                     console.error("Error getting location:", error);
//                 },
//                 {
//                     enableHighAccuracy: true, // Gunakan akurasi tinggi
//                     timeout: 5000, // Batas waktu 5 detik
//                     maximumAge: 0 // Jangan gunakan cache lokasi lama
//                 }
//             );
//         } else {
//             console.error("Geolocation is not supported by this browser.");
//         }
//     };

//     // Buka koneksi WebSocket saat komponen dimount
//     useEffect(() => {
//         const newSocket = io("http://localhost:8001", { // Ganti dengan alamat backend yang benar
//             query: {
//                 userId: courierId,
//                 role: "courier",
//                 orderId,
//             },
//         });

//         setSocket(newSocket);

//         // Kirim update lokasi setiap 10 detik
//         const interval = setInterval(getCurrentLocation, 10000);

//         // Ambil lokasi pertama kali
//         getCurrentLocation();

//         return () => {
//             newSocket.disconnect(); // Tutup koneksi saat komponen di-unmount
//             clearInterval(interval); // Hentikan interval
//         };
//     }, [orderId, courierId]);

//     return (
//         <div>
//             <h3>Lacak Lokasi Kurir</h3>
//             {currentLocation ? (
//                 <p>
//                     Lokasi saat ini: {currentLocation.latitude}, {currentLocation.longitude}
//                 </p>
//             ) : (
//                 <p>Mengambil lokasi...</p>
//             )}
//         </div>
//     );
// };

// export default CourierTracking;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import useProductStore from "../../store/useProductStore";

// Fix untuk marker icons yang hilang
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CourierTracking = ({ orderId, courierId }) => {
  const [socket, setSocket] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-6.1754, 106.8272]); // Default Jakarta
  const {updateCourierLocation, userData} = useProductStore(); // Ambil fungsi dari Zustand

  console.log("courier id:", userData);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current location:", latitude, longitude);
          setCurrentLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);

          try {
            // Update via Socket.io untuk realtime tracking
            if (socket) {
              socket.emit("updateLocation", {
                orderId,
                courierId,
                latitude,
                longitude,
              });
            }

            // Update ke backend via Zustand
            await updateCourierLocation(orderId, {
              latitude,
              longitude
            });
            
          } catch (error) {
            console.error("Gagal update lokasi:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8001", {
      query: {
        userId: courierId,
        role: "courier",
        orderId,
      },
    });

    setSocket(newSocket);
    const interval = setInterval(getCurrentLocation, 10000);
    getCurrentLocation();

    return () => {
      newSocket.disconnect();
      clearInterval(interval);
    };
  }, [orderId, courierId]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <h3 className="mb-3">Pelacakan Lokasi Kurir</h3>
      
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {currentLocation && (
          <Marker position={currentLocation}>
            <Popup>
              <div>
                <strong>Posisi Anda Sekarang</strong>
                <div>Lat: {currentLocation[0].toFixed(6)}</div>
                <div>Lng: {currentLocation[1].toFixed(6)}</div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="mt-3">
        {currentLocation ? (
          <p>
            Koordinat terkini:{" "}
            <span className="text-primary">
              {currentLocation[0].toFixed(6)}, {currentLocation[1].toFixed(6)}
            </span>
          </p>
        ) : (
          <p>Mengambil lokasi pertama kali...</p>
        )}
      </div>
    </div>
  );
};

export default CourierTracking;