import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import pinIcon from "./Porsche.png";
import L from "leaflet";
import ApiService from "../../../Shared/api";

const AdminMap: React.FC = () => {
  const position: LatLngExpression = [42.44, 19.26];

  let data = {
    carId: 25,
    latitude: 42.44,
    longitude: 19.26,
  };

  const attribution: string =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const customIcon = new L.Icon({
    iconUrl: pinIcon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  setInterval(() => {
    ApiService.sendLocation(data);
  }, 5000);
  setInterval(() => {
    ApiService.getLocation();
  }, 5000);

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
    </MapContainer>
  );
};

export default AdminMap;
