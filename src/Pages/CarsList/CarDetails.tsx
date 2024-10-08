import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
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
  avgRate: number;
  status: string;
  gear?: string;
  passengers?: number;
}

const CarDetails: React.FC = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getVehicleData(id);

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setCar(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {error && <div className="text-red-500 text-xl font-bold">{error}</div>}
      {loading && (
        <div className="text-gray-500 text-xl font-bold">Loading...</div>
      )}
      {car && (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <img
                src={car.image}
                alt={car.brand}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 p-4 space-y-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {car.brand}
              </h1>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Type:</span>
                  <span className="text-black">{car.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">
                    Price Per Day:
                  </span>
                  <span className="text-black">${car.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">
                    Fuel Type:
                  </span>
                  <span className="text-black">{car.fuelType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Gear:</span>
                  <span className="text-black">{car.gear || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">
                    Passengers:
                  </span>
                  <span className="text-black">{car.passengers || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Avg Rate:</span>
                  <span className="text-black">{car.avgRate}</span>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-800 font-medium">Description:</p>
                <p className="text-black">{car.description}</p>
              </div>
              {/* Reserve button and status button */}
              <div className="mt-6 flex space-x-4">
                <ReserveBtn carId={car.id} carPrice={car.price} />
                <div
                  className={`px-4 py-2 rounded-full font-semibold flex items-center space-x-2 ${
                    car.status === "available"
                      ? "bg-green-200 text-green-600"
                      : car.status === "unusable"
                      ? "bg-yellow-200"
                      : "bg-red-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${
                      car.status === "available"
                        ? "bg-green-600"
                        : car.status === "unusable"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  ></span>
                  <span>{car.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
