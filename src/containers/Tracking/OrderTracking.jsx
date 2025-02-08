// // import React, { useEffect, useState } from "react";
// // import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
// // import io from "socket.io-client"; // Import socket.io-client

// // const OrderTracking = ({ orderId, customerId }) => {
// //     const [socket, setSocket] = useState(null);
// //     const [courierLocation, setCourierLocation] = useState(null);

// //     // Buka koneksi WebSocket saat komponen dimount
// //     useEffect(() => {
// //         const newSocket = io("http://localhost:3000", {
// //             query: {
// //                 userId: customerId,
// //                 role: "customer",
// //                 orderId,
// //             },
// //         });

// //         setSocket(newSocket);

// //         // Terima update lokasi kurir
// //         newSocket.on("locationUpdated", (data) => {
// //             console.log("Courier location updated:", data);
// //             setCourierLocation({ lat: data.latitude, lng: data.longitude });
// //         });

// //         return () => {
// //             newSocket.disconnect(); // Tutup koneksi saat komponen di-unmount
// //         };
// //     }, [orderId, customerId]);

// //     return (
// //         <div>
// //             <h3>Lacak Pesanan</h3>
// //             <LoadScript googleMapsApiKey="AIzaSyAW2HQ40GRaxDA9rDAQq0FarEWUszQhxAA">
// //                 <GoogleMap
// //                     mapContainerStyle={{ height: "400px", width: "100%" }}
// //                     center={courierLocation || { lat: -6.2088, lng: 106.8456 }}
// //                     zoom={15}
// //                 >
// //                     {courierLocation && (
// //                         <Marker
// //                             position={{ lat: courierLocation.lat, lng: courierLocation.lng }}
// //                             icon={{
// //                                 url: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Ikon motor
// //                                 scaledSize: new window.google.maps.Size(32, 32),
// //                             }}
// //                         />
// //                     )}
// //                 </GoogleMap>
// //             </LoadScript>
// //         </div>
// //     );
// // };

// // export default OrderTracking;


// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import WebSocketService from "../../utils/Websocet";

// // Custom icon untuk kurir
// const CourierIcon = L.icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/2838/2838694.png", // URL ikon motor
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const OrderTracking = ({ orderId, customerId }) => {
//   const [courierPosition, setCourierPosition] = useState(null);
//   const [customerPosition, setCustomerPosition] = useState(null);

//   // Fungsi validasi koordinat
//   const isValidCoordinate = (lat, lng) => {
//     return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
//   };

//   // Setup WebSocket
//   useEffect(() => {
//     if (orderId) {
//       console.log("Connecting WebSocket for order:", orderId);
//       WebSocketService.connect(orderId);
//       WebSocketService.addCallback("location_update", handleLocationUpdate);
//     }

//     return () => {
//       console.log("Disconnecting WebSocket");
//       WebSocketService.disconnect();
//     };
//   }, [orderId]);

//   // Handler update posisi kurir
//   const handleLocationUpdate = (data) => {
//     console.log("Received location update:", data);
//     const lat = parseFloat(data.latitude);
//     const lng = parseFloat(data.longitude);

//     if (isValidCoordinate(lat, lng)) {
//       console.log("Valid courier position:", [lat, lng]);
//       setCourierPosition([lat, lng]);
//     } else {
//       console.error("Invalid coordinates received:", data);
//     }
//   };

//   // Inisialisasi posisi customer
//   useEffect(() => {
//     // Misalnya, ambil posisi customer dari API atau state global
//     const custLat = -6.1754; // Contoh latitude
//     const custLng = 106.8272; // Contoh longitude

//     if (isValidCoordinate(custLat, custLng)) {
//       setCustomerPosition([custLat, custLng]);
//     }
//   }, []);

//   return (
//     <div style={{ height: "500px", width: "100%" }}>
//       <MapContainer
//         center={courierPosition || customerPosition || [-6.1754, 106.8272]}
//         zoom={13}
//         scrollWheelZoom={false}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Marker Customer */}
//         {customerPosition && isValidCoordinate(...customerPosition) && (
//           <Marker position={customerPosition}>
//             <Popup>
//               <div>
//                 <strong>Lokasi Pelanggan</strong>
//                 <br />
//                 Menunggu kurir...
//               </div>
//             </Popup>
//           </Marker>
//         )}

//         {/* Marker Kurir */}
//         {courierPosition && isValidCoordinate(...courierPosition) && (
//           <Marker position={courierPosition} icon={CourierIcon}>
//             <Popup>
//               <div>
//                 <strong>Kurir</strong>
//                 <br />
//                 Sedang dalam perjalanan...
//               </div>
//             </Popup>
//           </Marker>
//         )}
//       </MapContainer>
//     </div>
//   );
// };

// export default OrderTracking;



import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import WebSocketService from "../../utils/Websocet";
import "leaflet-routing-machine";

const OrderTracking = ({ orderId, customerId, latKurir, lnKurir, latCustomer, lnCustomer }) => {
  const [courierPosition, setCourierPosition] = useState(null);
  const [customerPosition] = useState([latCustomer, lnCustomer]); // Posisi customer (contoh)
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);

  console.log("latkurir", latKurir)
  console.log("lnkurir", lnKurir)
  console.log("latCustomer", latCustomer)
  console.log("lnCustomer", lnCustomer)

  // Fungsi validasi koordinat
  const isValidCoordinate = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  };

  // Setup WebSocket
  useEffect(() => {
    if (orderId) {
      WebSocketService.connect(orderId);
      WebSocketService.addCallback("location_update", handleLocationUpdate);
    }

    return () => {
      WebSocketService.disconnect();
      if (routingControl && map) {
        map.removeControl(routingControl);
      }
    };
  }, [orderId]);

  // Handler update posisi kurir
  const handleLocationUpdate = (data) => {
    const lat = parseFloat(data.latitude);
    const lng = parseFloat(data.longitude);

    if (isValidCoordinate(lat, lng)) {
      setCourierPosition([lat, lng]);
    }
  };

  // Update rute saat posisi berubah
  useEffect(() => {
    if (map && customerPosition && courierPosition) {
      // Hapus rute sebelumnya
      if (routingControl) {
        map.removeControl(routingControl);
      }

      // Buat rute baru
      const newRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(...customerPosition), // Titik awal (customer)
          L.latLng(...courierPosition) // Titik akhir (kurir)
        ],
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.7, weight: 5 }]
        },
        show: false, // Sembunyikan panel instruksi
        addWaypoints: false // Nonaktifkan penambahan waypoint interaktif
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }
  }, [courierPosition, map]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={customerPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker Customer */}
        <Marker position={customerPosition}>
          <Popup>
            <div>
              <strong>Lokasi Pelanggan</strong>
              <br />
              Menunggu kurir...
            </div>
          </Popup>
        </Marker>

        {/* Marker Kurir */}
        {courierPosition && (
          <Marker 
            position={courierPosition} 
            icon={L.icon({
              iconUrl: "https://cdn-icons-png.flaticon.com/512/2838/2838694.png",
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32]
            })}
          >
            <Popup>
              <div>
                <strong>Kurir</strong>
                <br />
                Sedang dalam perjalanan...
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default OrderTracking;