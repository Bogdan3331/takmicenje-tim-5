import React, { useState, useEffect } from "react";
import { DatePicker, Button, message, Input, Pagination } from "antd"; // Import Input and Pagination from antd
import ApiService from "../../Shared/api";
import ReserveBtn from "../../Components/Buttons/ReserveBtn";

// Define the Car interface
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

// Define the filters interface
interface Filters {
  manufacturer?: string;
  type?: string;
  gear?: string;
  fuel?: string;
  passengers?: string;
}

interface AvailableVehiclesProps {
  filters: Filters; // Accept filters as a prop
}

const AvailableVehicles: React.FC<AvailableVehiclesProps> = ({ filters }) => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchVehicles = async (page: number) => {
    setLoading(true);
    setError(null); // Reset error state

    const dates = {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      available: true,
    };

    try {
      const response = await ApiService.getVehiclesList(
        searchQuery,
        page,
        dates
      );
      console.log(response);
      if (response.error) {
        throw new Error(response.error);
      }
      setVehicles(response.data.data);
      setLastPage(response.data.lastPage);
    } catch (error: any) {
      console.error("Error fetching vehicles:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!startDate && !endDate) {
      message.warning(
        "Please select a date range or clear dates to view all vehicles"
      );
      return;
    }
    setCurrentPage(1); // Reset to first page on new search
    fetchVehicles(1); // Fetch vehicles for the first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchVehicles(page); // Fetch vehicles for the selected page
  };

  useEffect(() => {
    fetchVehicles(currentPage); // Fetch vehicles when component mounts or current page changes
  }, [currentPage, searchQuery]); // Add searchQuery as a dependency

  // Apply filtering logic
  const filteredVehicleList = vehicles.filter((car) => {
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

  return (
    <div className="flex flex-col items-center mt-12 w-full px-4 box-border">
      <div className="date-picker mb-4">
        <DatePicker
          showTime
          placeholder="Select start date"
          onChange={(date) =>
            setStartDate(date ? date.format("YYYY-MM-DD HH:mm") : null)
          }
          format="YYYY-MM-DD HH:mm"
          style={{ marginRight: "1rem" }}
        />
        <DatePicker
          showTime
          placeholder="Select end date"
          onChange={(date) =>
            setEndDate(date ? date.format("YYYY-MM-DD HH:mm") : null)
          }
          format="YYYY-MM-DD HH:mm"
        />
        <Button
          type="primary"
          onClick={handleSearch}
          style={{ marginLeft: "1rem" }}
        >
          Search
        </Button>
      </div>

      <Input
        placeholder="Search by brand"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "1rem", width: "300px" }} // Adjust width as needed
      />

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <div className="grid grid-cols-3 gap-6 w-full">
        {filteredVehicleList.map((car) => (
          <div key={car.id} className="wrapper">
            {/* Car image */}
            <div className="border rounded-lg shadow-md overflow-hidden bg-white cursor-pointer">
              <img
                src={car.image || "https://via.placeholder.com/100"}
                alt={car.brand}
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

      <Pagination
        current={currentPage}
        pageSize={6}
        total={lastPage * 6}
        onChange={handlePageChange}
        className="mt-6" // Add margin for better spacing
      />
    </div>
  );
};

export default AvailableVehicles;
