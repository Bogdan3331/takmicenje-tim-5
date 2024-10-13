import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface MarkerLocation {
  id: number;
  position: { lat: number; lng: number }; // Latitude and Longitude
  title?: string; // Optional title for the marker
}

interface AdminMapProps {
  locations: MarkerLocation[]; // Prop to receive locations
}

const AdminMap: React.FC<AdminMapProps> = ({ locations }) => {
  const containerStyle = {
    width: "100%",
    height: "450px",
  };

  const center = {
    lat: 42.6904, // Default center latitude
    lng: 19.398, // Default center longitude
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      {" "}
      {/* Replace with your API key */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
        {locations.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default AdminMap;
