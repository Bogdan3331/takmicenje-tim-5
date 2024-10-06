import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import ReserveBtn from "../../Components/Buttons/ReserveBtn";

// Future interface update
/**
 *   image: string;
 *   name: string; // no
 *   class: string;
 *   gear: string; // no
 *   passengers: number; // no
 *   fuelType: string;
 *   fuelConsumption: number; // no
 *   price: number;
 */

interface Car {
  id: number;
  type: string;
  brand: string;
  price: number;
  description: string;
  fuelType: string;
  image: string;
}

interface VehicleListTableProps {
  searchQuery: string;
  selectedBrand: string | null; // Dodato stanje za odabrani brend
}

const VehicleListTable: React.FC<VehicleListTableProps> = ({ searchQuery, selectedBrand }) => {
  const [VehicleList, setVehicleList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getVehiclesList(searchQuery);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data?.data)) {
        setVehicleList(response.data.data.filter((car: Car) => car));
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredVehicleList = VehicleList.filter((car) => {
    const fullName = `${car.brand}`.toLowerCase();
    return (
      (!selectedBrand || car.brand.toLowerCase() === selectedBrand.toLowerCase()) &&
      fullName.startsWith(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center mt-12 w-full px-4 box-border">
      <div className="grid grid-cols-3 gap-6 w-full">
        {filteredVehicleList.map((car) => (
          <div
            key={car.id}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            {/* Car image */}
            <img
              src={car.image || "https://via.placeholder.com/100"}
              alt={`${car.brand || "Unknown"}`}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              {/* Car details */}
              <ul className="mt-2 text-gray-600">
                <li
                  style={{
                    fontSize: "large",
                    fontWeight: "500",
                    color: "red",
                  }}
                >
                  <strong>Brand:</strong> {car.brand || "No Name"}
                </li>
                <li>
                  <strong>Type:</strong> {car.type || "No Name"}
                </li>
                <li>
                  <strong>Fuel Type:</strong> {car.fuelType || "N/A"}
                </li>
                <li>
                  <strong>Description:</strong> {car.description || "N/A"}
                </li>
              </ul>

              {/* Price and Reserve button */}
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">{car.price} €</span>
                  <p className="text-gray-500">per day</p>
                </div>
                <ReserveBtn carId={car.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleListTable;
