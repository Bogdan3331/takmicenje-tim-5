import React, { useState, useEffect } from "react";
import AdminMap from "./AdminMap";

// Sample location interface
interface MarkerLocation {
  id: number;
  position: { lat: number; lng: number }; // {latitude, longitude}
  title?: string;
}

const AdminLocations: React.FC = () => {
  const [locations, setLocations] = useState<MarkerLocation[]>([]);

  // Function to simulate fetching updated locations from your backend
  const fetchLocations = async () => {
    // Replace this with your API call logic
    // This is just a simulated example
    const newLocations: MarkerLocation[] = [
      {
        id: 1,
        position: {
          lat: 42.6904 + (Math.random() - 0.5) * 0.01,
          lng: 19.398 + (Math.random() - 0.5) * 0.01,
        },
        title: "Car 1",
      },
      {
        id: 2,
        position: {
          lat: 42.695 + (Math.random() - 0.5) * 0.01,
          lng: 19.3 + (Math.random() - 0.5) * 0.01,
        },
        title: "Car 2",
      },
    ];
    setLocations(newLocations);
  };

  useEffect(() => {
    const interval = setInterval(fetchLocations, 1000); // Fetch new locations every second

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <div>
      <h1>Live Location Map</h1>
      <AdminMap locations={locations} />
    </div>
  );
};

export default AdminLocations;
