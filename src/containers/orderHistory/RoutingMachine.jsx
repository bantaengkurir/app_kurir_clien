// // components/RoutingMachine.jsx
// import { useEffect } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// export const RoutingMachine = ({ waypoints, color, map }) => {
//   useEffect(() => {
//     if (!map || waypoints.length < 2) return;

// 	console.log("Waypoints:", waypoints);
// console.log("Map instance:", map);

//     // Buat routing control
//     const routingControl = L.Routing.control({
//       waypoints: waypoints.map((wp) => L.latLng(wp[0], wp[1])),
//       routeWhileDragging: false,
//       show: false,
//       lineOptions: {
//         styles: [{ color, opacity: 0.7, weight: 5 }],
//       },
//       addWaypoints: false, // Nonaktifkan penambahan waypoints secara interaktif
//       draggableWaypoints: false, // Nonaktifkan drag waypoints
//       fitSelectedRoutes: true, // Otomatis zoom ke rute
//     }).addTo(map);

//     // Bersihkan routing control saat komponen di-unmount
//     return () => {
//   //     map.removeControl(routingControl);
//   //   };
//   // }, [map, waypoints, color]);

//   // return null;
//   if (map && routingControl) {
//     map.removeControl(routingControl);
//   }
// };
// }, [map, waypoints, color]);

// return null;
// };

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

export const RoutingMachine = ({ waypoints, color, map }) => {
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || waypoints.length < 2) return;

    console.log("Waypoints:", waypoints);
    console.log("Map instance:", map);

    // Hapus rute lama sebelum membuat yang baru
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    // Buat routing control baru
    const routingControl = L.Routing.control({
      waypoints: waypoints.map((wp) => L.latLng(wp[0], wp[1])),
      routeWhileDragging: false,
      show: false,
      lineOptions: {
        styles: [{ color, opacity: 0.7, weight: 5 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    routingControlRef.current = routingControl;

    return () => {
      if (routingControlRef.current) {
        try {
          map.removeControl(routingControlRef.current);
        } catch (error) {
          console.warn("Error removing routing control:", error);
        }
      }
    };
  }, [map, waypoints, color]);

  return null;
};


