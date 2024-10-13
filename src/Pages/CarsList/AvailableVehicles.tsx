import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, DatePicker, Input } from "antd";
import ApiService from "../../Shared/api";
import ReserveBtn from "../../Components/Buttons/ReserveBtn";
import UpdateCarBtn from "./AdminCars/UpdateCarBtn";
import CreateCarBtn from "./AdminCars/CreateCarBtn";
import { Dayjs } from "dayjs";

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
  currentPage: number; // New prop
  setCurrentPage: (page: number) => void; // New prop
  lastPage: number; // New prop
  setLastPage: (page: number) => void; // New prop
}

const AvailableVehicles: React.FC<AvailableVehiclesProps> = ({
  filters,
  isAdmin,
  currentPage,
  setCurrentPage,
  setLastPage,
}) => {
  const [startDate, setStartDate] = useState<Dayjs | undefined>(undefined);
  const [endDate, setEndDate] = useState<Dayjs | undefined>(undefined);
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  const fetchVehicles = useCallback(
    async (page: number, filters: Filters) => {
      setLoading(true);
      setError(null);

      const data = {
        startDate: startDate ? startDate.format("YYYY-MM-DD HH:mm") : undefined,
        endDate: endDate ? endDate.format("YYYY-MM-DD HH:mm") : undefined,
        available: startDate && endDate ? true : null,
        filter: filters,
      };

      try {
        const response = await ApiService.getVehiclesList(
          page,
          searchQuery,
          data
        );
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
    [searchQuery, startDate, endDate, setLastPage]
  );

  useEffect(() => {
    fetchVehicles(currentPage, filters);
  }, [currentPage, fetchVehicles, filters]);

  useEffect(() => {
    setCurrentPage(1);
    fetchVehicles(1, filters);
  }, [filters, setCurrentPage, fetchVehicles]);

  const handleDeleteCar = async (carId: number) => {
    setLoading(true);
    try {
      await ApiService.deleteCar(carId);
      await fetchVehicles(currentPage, filters);
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-12 w-full px-4 box-border">
      <div className="date-picker mb-4 flex space-x-4 w-full justify-start">
        <DatePicker
          showTime
          placeholder="Select pick up date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          format="YYYY-MM-DD HH:mm"
        />
        <DatePicker
          showTime
          placeholder="Select drop off date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          format="YYYY-MM-DD HH:mm"
        />
        <Input
          placeholder="Search by brand"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "300px" }}
        />
        {isAdmin === 1 && <CreateCarBtn />}
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      <div className="grid grid-cols-3 gap-6 w-full">
        {vehicles.map((car) => (
          <div key={car.id} className="wrapper">
            {/* Car image */}
            <div className="border rounded-lg shadow-md overflow-hidden bg-white cursor-pointer">
              <img
                onClick={() => {
                  navigate(`/vehicle-details/${car.id}`);
                }}
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
                <ReserveBtn
                  carId={car.id}
                  carPrice={car.price}
                  startDateProp={startDate}
                  endDateProp={endDate}
                />
                {isAdmin === 1 && (
                  <Button
                    type="primary"
                    onClick={() => handleDeleteCar(car.id)}
                  >
                    Delete Car
                  </Button>
                )}
                {isAdmin === 1 && (
                  <UpdateCarBtn
                    carId={car.id}
                    onUpdate={() => fetchVehicles(currentPage, filters)}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableVehicles;
