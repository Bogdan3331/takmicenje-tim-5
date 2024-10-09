import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ApiService from "../../Shared/api";
import ReserveBtn from "../../Components/Buttons/ReserveBtn";
import Pagination from "./Pagination"; // Import the new Pagination component

interface Car {
  id: number;
  type: string;
  brand: string;
  price: number;
  description: string;
  fuelType: string;
  image: string;
  gear?: string;
  passengers?: number;
}

interface VehicleListTableProps {
  searchQuery: string;
  filters: {
    manufacturer: string;
    type: string;
    gear: string;
    fuel: string;
    passengers: string;
  };
  availableCars: Car[]; // Passed in availableCars prop
}

const VehicleListTable: React.FC<VehicleListTableProps> = ({
  searchQuery,
  filters,
  availableCars,
}) => {
  const [vehicleList, setVehicleList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1); // Track current page
  const [lastPage, setLastPage] = useState<number>(1); // Track total pages
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      console.log("Fetching vehicles for:", { searchQuery, page }); // Log the searchQuery and currentPage

      const response = await ApiService.getVehiclesList(searchQuery, page);

      if (response.error) {
        setError(response.error);
        return;
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data?.data)) {
        setVehicleList(response.data.data.filter((car: Car) => car)); // Filter out any falsy values
        setLastPage(response.data.lastPage); // Set lastPage from response
        console.log("Total Pages:", response.data.lastPage); // Log the lastPage to check correctness
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page]); // Only these dependencies

  useEffect(() => {
    // Fetch data only if availableCars is empty
    if (availableCars.length === 0) {
      fetchData();
    } else {
      setVehicleList(availableCars); // If availableCars has data, set it to vehicleList
      console.log(availableCars);
    }
  }, [fetchData, availableCars]); // This will run every time availableCars changes

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update current page
  };

  const filteredVehicleList = vehicleList.filter((car) => {
    const matchesSearchQuery = car.brand
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase());

    const manufacturerMatch =
      !filters.manufacturer || car.brand === filters.manufacturer;
    const classMatch = !filters.type || car.type === filters.type;
    const gearMatch = !filters.gear || (car.gear && car.gear === filters.gear);
    const fuelMatch = !filters.fuel || car.fuelType === filters.fuel;
    const passengersMatch =
      !filters.passengers ||
      (car.passengers && String(car.passengers) === filters.passengers);

    return (
      matchesSearchQuery &&
      manufacturerMatch &&
      classMatch &&
      gearMatch &&
      fuelMatch &&
      passengersMatch
    );
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function to handle card click
  const handleCardClick = (carId: number) => {
    navigate(`/vehicle-details/${carId}`); // Navigate to vehicle details
  };

  return (
    <div className="flex flex-col items-center mt-12 w-full px-4 box-border">
      <div className="grid grid-cols-3 gap-6 w-full">
        {filteredVehicleList.map((car) => (
          <div key={car.id} className="wrapper">
            {/* Car image */}
            <div
              className="border rounded-lg shadow-md overflow-hidden bg-white cursor-pointer"
              onClick={() => handleCardClick(car.id)} // Call the navigate function
            >
              <img
                src={car.image || "https://via.placeholder.com/100"}
                alt={`${car.brand || "Unknown"}`}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              {/* Car details */}
              <ul className="mt-2 text-gray-600">
                <li className="text-[1.2rem] font-bold text-[#000060]">
                  <strong className="text-lg font-bold text-white">
                    Brand:
                  </strong>{" "}
                  {car.brand || "No Name"}
                </li>
                <li className="font-semibold">
                  <strong>Type:</strong> {car.type || "No Name"}
                </li>
                <li className="font-semibold">
                  <strong>Fuel Type:</strong> {car.fuelType || "N/A"}
                </li>
                <li className="font-semibold">
                  <strong>Description:</strong> {car.description || "N/A"}
                </li>
              </ul>

              {/* Price and Reserve button */}
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold">{car.price} €</span>
                  <p className="text-gray-500">per day</p>
                </div>
                <ReserveBtn carId={car.id} carPrice={car.price} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conditional Pagination Controls */}
      {availableCars.length === 0 && ( // Only show pagination if availableCars is empty
        <Pagination
          currentPage={page} // Pass current page
          totalPages={lastPage} // Pass total pages
          onPageChange={handlePageChange} // Pass the page change handler
        />
      )}
    </div>
  );
};

export default VehicleListTable;
