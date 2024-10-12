import React, { useEffect, useState } from "react";
import { Spin } from "antd"; // You can use Ant Design for the spinner
import ApiService from "../../Shared/api";

interface Reservation {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  rate: { comment: string | null }; // Allowing null in case there's no comment
}

interface Vehicle {
  id: number;
  type: string;
  image: string;
  brand: string;
  price: number;
  avgRate: number;
  description: string;
}

const GetAllReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicleData, setVehicleData] = useState<{ [key: number]: Vehicle }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllReservations = async () => {
      setLoading(true); // Start loading state
      try {
        const response = await ApiService.getAllReservations();
        console.log(response);
        if (response.error) {
          setError(response.error);
          return;
        }

        if (response.data.data) {
          const allReservations = response.data.data;
          setReservations(allReservations);

          const vehiclePromises = allReservations.map(
            async (reservation: Reservation) => {
              const vehicleResponse = await ApiService.getVehicleData(
                reservation.carId
              );
              return { id: reservation.carId, ...vehicleResponse.data.data }; // Adjust to access vehicle data
            }
          );

          const vehicles = await Promise.all(vehiclePromises);
          const vehiclesById = vehicles.reduce((acc, vehicle) => {
            acc[vehicle.id] = vehicle;
            return acc;
          }, {} as { [key: number]: Vehicle });

          setVehicleData(vehiclesById);
        } else {
          setError("Failed to load data: " + response.error);
        }
      } catch (error: any) {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllReservations();
  }, []);

  return (
    <div className="overflow-x-auto">
      {loading && <Spin />}
      {error && <div className="text-red-600">Error: {error}</div>}
      {!loading && !error && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 rounded-lg">
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Pickup Date
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Return Date
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Car Details
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700">
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              const vehicle = vehicleData[reservation.carId]; // Access vehicle data for each reservation

              return (
                <tr key={reservation.id} className="border-t">
                  <td className="px-4 py-2 text-gray-500 text-sm">
                    {reservation.startDate}
                  </td>
                  <td className="px-4 py-2 text-gray-500 text-sm">
                    {reservation.endDate}
                  </td>
                  <td className="px-4 py-2">
                    {vehicle ? (
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            vehicle.image || "https://via.placeholder.com/100"
                          }
                          alt={vehicle.brand}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="text-lg font-semibold">
                            {vehicle.type || "No Name"}
                          </p>
                          <p className="text-gray-600">
                            {vehicle.brand || "No Brand"}
                          </p>
                          <p className="text-gray-600">
                            Price: ${vehicle.price || 0}
                          </p>
                          <p className="text-gray-600">
                            Avg Rate: {vehicle.avgRate || 0} / 5
                          </p>
                          <p className="text-gray-600">
                            {vehicle.description || "No Description"}
                          </p>
                          {/* <p className="text-gray-600">
                            {reservation.comment || "No Comment"}
                          </p> */}
                        </div>
                      </div>
                    ) : (
                      "Loading Vehicle..."
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetAllReservations;
