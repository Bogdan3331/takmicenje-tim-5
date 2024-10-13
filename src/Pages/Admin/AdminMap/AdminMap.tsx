import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import pinIcon from "./Porsche.png";
import L from "leaflet";
import ApiService from "../../../Shared/api";
import Pusher from "pusher-js";
import { useState, useEffect } from "react";

// RecenterMap component to recenter map on position change
const RecenterMap = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);

  return null;
};

const AdminMap: React.FC = () => {
  let [position, setPosition] = useState<LatLngExpression>([42.44, 19.26]);

  const generateRandomPoint = () => {
    const minLat = 42.427617;
    const maxLat = 42.444071;
    const minLng = 19.241229;
    const maxLng = 19.246672;

    const lat = Math.random() * (maxLat - minLat) + minLat;
    const lng = Math.random() * (maxLng - minLng) + minLng;

    return { lat, lng };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let data = {
        carId: 25,
        latitude: generateRandomPoint().lat,
        longitude: generateRandomPoint().lng,
      };
      ApiService.sendLocation(data);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pusher = new Pusher("cf3398f2961697904806", { cluster: "eu" });
    const channel = pusher.subscribe("locations");
    channel.bind("locations", function (data: any) {
      let longitude = data.carLocations.longitude;
      let latitude = data.carLocations.latitude;
      if (longitude && latitude) {
        setPosition([latitude, longitude]);
      }
    });

    return () => {
      pusher.unsubscribe("locations");
    };
  }, []);

  const attribution: string =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const customIcon = new L.Icon({
    iconUrl: pinIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "30rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={attribution}
      />
      <Marker icon={customIcon} position={position}>
        <Popup>Belgrade, Serbia.</Popup>
      </Marker>
      {/* Recenter the map when position changes */}
      <RecenterMap position={position} />
    </MapContainer>
  );
};

export default AdminMap;
