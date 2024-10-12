import React, { useState, useEffect, useCallback } from "react";
import { Button, DatePicker, Input, Pagination } from "antd";
import ApiService from "../../Shared/api";
import ReserveBtn from "../../Components/Buttons/ReserveBtn";
import UpdateCarBtn from "./AdminCars/UpdateCarBtn";
import CreateCarBtn from "./AdminCars/CreateCarBtn";

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

interface Filters {
  manufacturer?: string;
  type?: string;
  gear?: string;
  fuel?: string;
  passengers?: string;
}

interface AvailableVehiclesProps {
  filters: Filters;
  isAdmin: number;
}

const AvailableVehicles: React.FC<AvailableVehiclesProps> = (
  { filters },
  { isAdmin }
) => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchVehicles = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      const dates = {
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        available: startDate && endDate ? true : null,
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
    },
    [searchQuery, startDate, endDate]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchVehicles(page);
  };

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage, fetchVehicles]);

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

  const handleDeleteCar = async (carId: number) => {
    setLoading(true);
    try {
      await ApiService.deleteCar(carId);
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 w-full px-4 box-border">
      <div className="date-picker mb-4">
        <DatePicker
          showTime
          placeholder="Select pick up date"
          onChange={(date) =>
            setStartDate(date ? date.format("YYYY-MM-DD HH:mm") : undefined)
          }
          format="YYYY-MM-DD HH:mm"
          style={{ marginRight: "1rem" }}
        />
        <DatePicker
          showTime
          placeholder="Select drop off date"
          onChange={(date) =>
            setEndDate(date ? date.format("YYYY-MM-DD HH:mm") : undefined)
          }
          format="YYYY-MM-DD HH:mm"
        />
      </div>

      <Input
        placeholder="Search by brand"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "1rem", width: "300px" }}
      />
      {(isAdmin = 1 && <CreateCarBtn />)}
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
                {
                  (isAdmin = 1 && (
                    <Button
                      type="primary"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      Delete Car
                    </Button>
                  ))
                }
                <ReserveBtn carId={car.id} carPrice={car.price} />
                {(isAdmin = 1 && <UpdateCarBtn carId={car.id} />)}
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
        className="mt-6"
      />
    </div>
  );
};

export default AvailableVehicles;
