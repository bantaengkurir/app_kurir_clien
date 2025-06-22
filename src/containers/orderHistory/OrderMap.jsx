import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import courierIcon from "../../assets/image/courier.png";
import customerIcon from "../../assets/image/customer.png";
import shopIcon from "../../assets/image/shop.png";
import WebSocketService from "../../utils/Websocet";
import { v4 as uuidv4 } from 'uuid';
import { Card } from "react-bootstrap";
import markericon2x from "../../../node_modules/leaflet/dist/images/marker-icon-2x.png";
import markericon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import markericonshadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markericon2x,
  iconUrl: markericon,
  shadowUrl: markericonshadow,
});

const CourierIcon = L.icon({
  iconUrl: courierIcon,
  iconSize: [82, 82],
  iconAnchor: [45, 62],
  popupAnchor: [0, -32],
  rotationOrigin: "center center",
});

const CustomerIcon = L.icon({
  iconUrl: customerIcon,
  iconSize: [82, 82],
  iconAnchor: [45, 62],
  popupAnchor: [0, -32],
});

const ShopIcon = L.icon({
  iconUrl: shopIcon,
  iconSize: [42, 42],
  iconAnchor: [22, 42],
  popupAnchor: [0, -32],
});

const OrderMap = ({ order }) => {
  const mapInstance = useRef(null);
  const [courierPosition, setCourierPosition] = useState(null);
  const [customerPosition, setCustomerPosition] = useState(null);
  const [sellers, setSellers] = useState([]);
  const routingControl = useRef(null);
  const animatedMarker = useRef(null);
  const isMounted = useRef(true);

  // Fungsi validasi koordinat
  const isValidCoordinate = (lat, lng) => {
    return !isNaN(lat) && !isNaN(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;
  };

  // Setup mount status dan cleanup
  useEffect(() => {
    isMounted.current = true;
    
    return () => {
      isMounted.current = false;
      
      // Cleanup WebSocket
      WebSocketService.removeCallback('location_update');
      
      // Cleanup routing control
      if (routingControl.current && mapInstance.current) {
        mapInstance.current.removeControl(routingControl.current);
        routingControl.current = null;
      }
      
      // Cleanup animated marker
      if (animatedMarker.current) {
        animatedMarker.current.stop();
        animatedMarker.current.remove();
        animatedMarker.current = null;
      }
    };
  }, []);

  // Inisialisasi posisi awal
  useEffect(() => {
    if (!order) return;

    // Customer position
    const custLat = parseFloat(order.shipping_cost[0]?.latitude);
    const custLng = parseFloat(order.shipping_cost[0]?.longitude);
    if (isValidCoordinate(custLat, custLng)) {
      setCustomerPosition([custLat, custLng]);
    }

    // Courier position (hanya jika status bukan 'completed')
    if (order.status !== "completed") {
      const courLat = parseFloat(order.courier?.latitude);
      const courLng = parseFloat(order.courier?.longitude);
      if (isValidCoordinate(courLat, courLng)) {
        setCourierPosition([courLat, courLng]);
      }
    }

    // Seller positions
    const validSellers = order.items.reduce((acc, item) => {
      const lat = parseFloat(item.seller_latitude);
      const lng = parseFloat(item.seller_longitude);
      if (isValidCoordinate(lat, lng)) {
        acc.push({
          position: [lat, lng],
          name: item.seller_name,
          address: item.seller_address,
        });
      }
      return acc;
    }, []);
    setSellers(validSellers);
  }, [order]);

  // Setup WebSocket untuk update posisi kurir
  useEffect(() => {
    if (!order?.order_id || order.status === "completed") return;

    const handleLocationUpdate = (data) => {
      if (!isMounted.current) return;
      if (!isValidCoordinate(data.latitude, data.longitude)) return;

      setCourierPosition(prev => {
        if (!prev) return [data.latitude, data.longitude];
        
        // Smooth transition
        const step = 0.1;
        return [
          prev[0] + (data.latitude - prev[0]) * step,
          prev[1] + (data.longitude - prev[1]) * step
        ];
      });
    };

    WebSocketService.connect(order.order_id);
    WebSocketService.addCallback('location_update', handleLocationUpdate);

    return () => {
      WebSocketService.removeCallback('location_update', handleLocationUpdate);
    };
  }, [order?.order_id, order?.status]);

  // Komponen untuk routing machine
  const RoutingMachine = () => {
    const map = useMap();

    useEffect(() => {
      if (!courierPosition || !customerPosition || order.status === "completed") {
        return;
      }

      // Cleanup previous routing control
      if (routingControl.current) {
        map.removeControl(routingControl.current);
      }

      // Create new routing control
      routingControl.current = L.Routing.control({
        waypoints: [
          L.latLng(...courierPosition),
          L.latLng(...customerPosition)
        ],
        lineOptions: {
          styles: [{
            color: '#4CAF50',
            opacity: 0.8,
            weight: 5,
            dashArray: '5,5'
          }]
        },
        show: false,
        addWaypoints: false,
        createMarker: () => null
      }).addTo(map);

      return () => {
        if (routingControl.current) {
          map.removeControl(routingControl.current);
          routingControl.current = null;
        }
      };
    }, [map, courierPosition, customerPosition, order.status]);

    return null;
  };

  // Komponen untuk animasi marker kurir
  const AnimatedCourierMarker = () => {
    const map = useMap();
    const prevPosition = useRef(null);

    useEffect(() => {
      if (!courierPosition || order.status === "completed") return;

      const calculateBearing = (start, end) => {
        const startLat = start.lat;
        const startLng = start.lng;
        const endLat = end.lat;
        const endLng = end.lng;

        const dLng = ((endLng - startLng) * Math.PI) / 180;
        const lat1 = (startLat * Math.PI) / 180;
        const lat2 = (endLat * Math.PI) / 180;

        const y = Math.sin(dLng) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) -
                 Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
        let bearing = Math.atan2(y, x);
        bearing = (bearing * 180) / Math.PI;
        bearing = (bearing + 360) % 360;
        return bearing;
      };

      const currentPos = L.latLng(courierPosition);
      
      if (!animatedMarker.current) {
        // Create new animated marker
        animatedMarker.current = L.Marker.movingMarker(
          [currentPos],
          [5000],
          {
            icon: CourierIcon,
            autostart: true,
            rotationAngle: 0
          }
        ).addTo(map);

        animatedMarker.current.bindPopup(
          `<strong>Kurir</strong><br>${order.courier?.name || 'Sedang menuju lokasi'}`
        );
      } else {
        // Update existing marker
        const oldPos = prevPosition.current;
        if (oldPos && !currentPos.equals(oldPos)) {
          const bearing = calculateBearing(oldPos, currentPos);
          animatedMarker.current.setRotationAngle(bearing);
          animatedMarker.current.moveTo(currentPos, 2000);
        }
      }

      prevPosition.current = currentPos;

      return () => {
        if (animatedMarker.current) {
          animatedMarker.current.stop();
          animatedMarker.current.remove();
          animatedMarker.current = null;
        }
      };
    }, [courierPosition, map, order.status, order.courier?.name]);

    return null;
  };

  return (
    <Card className="mb-4 map-card">
      <Card.Header className="bg-primary text-white">
        Pelacakan Pengiriman {order.status === "completed" ? "Terakhir" : "Real-time"}
      </Card.Header>
      <Card.Body style={{ height: "500px" }}>
        <MapContainer
          center={customerPosition || courierPosition || [-6.1754, 106.8272]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(map) => { mapInstance.current = map; }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {order.status !== "completed" && (
            <>
              <RoutingMachine />
              <AnimatedCourierMarker />
            </>
          )}

          {/* Marker Customer */}
          {customerPosition && (
            <Marker position={customerPosition} icon={CustomerIcon}>
              <Popup>
                <div>
                  <strong>Lokasi Pelanggan</strong>
                  <br />
                  {order.shipping_cost[0]?.address || 'Alamat tidak tersedia'}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Static Courier Marker */}
          {courierPosition && order.status !== "completed" && (
            <Marker position={courierPosition} icon={CourierIcon}>
              <Popup>
                <div>
                  <strong>Kurir</strong>
                  <br />
                  {order.courier?.name || 'Sedang menuju lokasi'}
                  <br />
                  {order.courier?.phone_number || ''}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Marker Penjual */}
          {sellers.map((seller) => (
            <Marker key={uuidv4()} position={seller.position} icon={ShopIcon}>
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