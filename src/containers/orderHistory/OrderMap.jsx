import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import WebSocketService from "../../utils/Websocet";
import courierIcon from "../../assets/image/avatar.jpg"; // Siapkan ikon motor

// Buat custom icon untuk kurir
const CourierIcon = L.icon({
  iconUrl: courierIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const OrderMap = ({ order }) => {
  const [routes, setRoutes] = useState([]);
  const [map, setMap] = useState(null);
  const [courierPosition, setCourierPosition] = useState(null);
  const [customerPosition, setCustomerPosition] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [routingControls, setRoutingControls] = useState([]);

  // Fungsi validasi koordinat
  const isValidCoordinate = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  };

  // Setup WebSocket
  useEffect(() => {
    if (order?.order_id) {
      WebSocketService.connect(order.order_id);
      WebSocketService.addCallback('location_update', handleLocationUpdate);
    }

    return () => {
      WebSocketService.disconnect(); // Pastikan WebSocket diputus saat komponen di-unmount
      routingControls.forEach(control => map?.removeControl(control));
    };
  }, [order?.order_id]); // Hanya jalankan ulang jika order_id berubah

  // Handler update posisi kurir
  const handleLocationUpdate = (data) => {
    if (isValidCoordinate(data.latitude, data.longitude)) {
      setCourierPosition([data.latitude, data.longitude]);
    }
  };

  // Inisialisasi posisi awal
  useEffect(() => {
    if (order) {
      // Customer position
      const custLat = parseFloat(order.shipping_cost[0]?.latitude);
      const custLng = parseFloat(order.shipping_cost[0]?.longitude);
      if (isValidCoordinate(custLat, custLng)) {
        setCustomerPosition([custLat, custLng]);
      }

      // Seller positions
      const validSellers = order.items.reduce((acc, item) => {
        const lat = parseFloat(item.seller_latitude);
        const lng = parseFloat(item.seller_longitude);
        if (isValidCoordinate(lat, lng)) {
          acc.push({
            position: [lat, lng],
            name: item.seller_name,
            address: item.seller_address
          });
        }
        return acc;
      }, []);
      setSellers(validSellers);
    }
  }, [order]);

  // Update rute saat posisi berubah
  useEffect(() => {
    if (map && courierPosition && customerPosition) {
      // Hapus rute sebelumnya
      routingControls.forEach(control => map.removeControl(control));
      
      const newRoutingControls = [];

      // Rute dari kurir ke customer
      const toCustomer = L.Routing.control({
        waypoints: [
          L.latLng(...courierPosition),
          L.latLng(...customerPosition)
        ],
        lineOptions: {
          styles: [{color: 'green', opacity: 0.7, weight: 5}]
        },
        show: false,
        addWaypoints: false
      }).addTo(map);
      newRoutingControls.push(toCustomer);

      // Rute dari seller ke kurir
      sellers.forEach(seller => {
        const route = L.Routing.control({
          waypoints: [
            L.latLng(...seller.position),
            L.latLng(...courierPosition)
          ],
          lineOptions: {
            styles: [{color: 'blue', opacity: 0.7, weight: 5}]
          },
          show: false,
          addWaypoints: false
        }).addTo(map);
        newRoutingControls.push(route);
      });

      setRoutingControls(newRoutingControls);
    }
  }, [courierPosition, customerPosition, map]);

  return (
    <Card className="mb-4 map-card">
      <Card.Header className="bg-primary text-white">
        Pelacakan Pengiriman Real-time
      </Card.Header>
      <Card.Body style={{ height: "500px" }}>
        <MapContainer
          center={courierPosition || [-6.1754, 106.8272]}
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
          {customerPosition && (
            <Marker position={customerPosition}>
              <Popup>
                <div>
                  <strong>Lokasi Pelanggan</strong>
                  <br />
                  {order.shipping_cost[0]?.address}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Marker Kurir dengan ikon motor */}
          {courierPosition && (
            <Marker 
              position={courierPosition}
              icon={CourierIcon}
            >
              <Popup>
                <div>
                  <strong>Kurir</strong>
                  <br />
                  {order.courier?.name}
                  <br />
                  {order.courier?.phone_number}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Marker Penjual */}
          {sellers.map((seller, idx) => (
            <Marker key={idx} position={seller.position}>
              <Popup>
                <div>
                  <strong>Penjual: {seller.name}</strong>
                  <br />
                  {seller.address}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </Card.Body>
    </Card>
  );
};

export default OrderMap;