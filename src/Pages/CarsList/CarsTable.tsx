import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import ReserveBtn from "../../Components/Buttons/ReserveBtn";

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
}

const VehicleListTable: React.FC<VehicleListTableProps> = ({ searchQuery }) => {
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
    return fullName.startsWith(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center mt-12 w-full px-4 box-border">
      <div className="grid grid-cols-6 gap-4 overflow-x-auto mb-4">
        <div className="font-bold border-b-2 border-gray-300 p-3 text-center bg-gray-200 uppercase">
          Image
        </div>
        <div className="font-bold border-b-2 border-gray-300 p-3 text-center bg-gray-200 uppercase">
          Type
        </div>
        <div className="font-bold border-b-2 border-gray-300 p-3 text-center bg-gray-200 uppercase">
          Brand
        </div>
        <div className="font-bold border-b-2 border-gray-300 p-3 text-center bg-gray-200 uppercase">
          Price
        </div>
        <div className="font-bold border-b-2 border-gray-300 p-3 text-center bg-gray-200 uppercase">
          Description
        </div>
        <div className="font-bold border-b-2 border-gray-300 p-3 text-center bg-gray-200 uppercase">
          Fuel Type
        </div>
        <div></div>
        {filteredVehicleList.map((car) => (
          <React.Fragment key={car.id}>
            <div className="border-b border-gray-300 flex items-center justify-center text-center bg-white shadow-sm transition-transform duration-200 ease-in-out">
              <img
                src={car.image || "https://via.placeholder.com/100"}
                alt={`${car.brand || "Unknown"}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="border-b border-gray-300 flex items-center justify-center text-center bg-white shadow-sm transition-transform duration-200 ease-in-out">
              {car.type || "No Name"}
            </div>
            <div className="border-b border-gray-300 flex items-center justify-center text-center bg-white shadow-sm transition-transform duration-200 ease-in-out">
              {car.brand || "N/A"}
            </div>
            <div className="border-b border-gray-300 flex items-center justify-center text-center bg-white shadow-sm transition-transform duration-200 ease-in-out">
              {car.price || "N/A"}
            </div>
            <div className="border-b border-gray-300 flex items-center justify-center text-center bg-white shadow-sm transition-transform duration-200 ease-in-out">
              {car.description || "N/A"}
            </div>
            <div
              style={{ color: "red" }}
              className="border-b border-gray-300 flex items-center justify-center text-center bg-white shadow-sm transition-transform duration-200 ease-in-out"
            >
              {car.fuelType || "N/A"}
            </div>
            <ReserveBtn carId={car.id} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default VehicleListTable;
