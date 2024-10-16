import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import { message } from "antd";

interface Reservation {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
}

interface Vehicle {
  id: number;
  type: string;
  image: string;
  brand: string;
  price: number;
  avgRate: number;
  description: string; // Add other properties if needed
}

const RezervationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicleData, setVehicleData] = useState<{ [key: number]: Vehicle }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async (
    reservationId: number,
    getUsersReservations: () => void
  ) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to cancel this reservation?"
      );
      if (!confirmation) return;

      const response = await ApiService.cancelReservation(reservationId);

      if (!response.error) {
        message.success("Reservation canceled successfully.");
        getUsersReservations(); // Refresh reservations list after cancellation
      } else {
        message.error("Failed to cancel the reservation. Please try again.");
      }
    } catch (error) {
      message.error(
        "An error occurred while trying to cancel the reservation."
      );
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUsersReservations();

      if (response.error) {
        setError(response.error);
      }

      if (response.data.data) {
        const activeReservations = response.data.data;
        // Filter out reservations that have ended
        const now = new Date();
        const filteredReservations = activeReservations.filter(
          (reservation: Reservation) => new Date(reservation.endDate) > now
        );

        setReservations(filteredReservations); // Update to use filtered reservations

        const vehiclePromises = filteredReservations.map(
          async (reservation: Reservation) => {
            const vehicleResponse = await ApiService.getVehicleData(
              reservation.carId
            );
            return { id: reservation.carId, ...vehicleResponse.data.data }; // Adjusted to access vehicle data
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="reservations">
      <div className="flex justify-center">
        <div className="mt-8 w-full max-w-6xl mb-12">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Your Reservations
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            Overview of your active car reservations
          </p>
          {loading && (
            <div className="text-center text-xl text-gray-700">Loading...</div>
          )}
          {error && (
            <div className="text-center text-xl text-red-600">
              Error: {error}
            </div>
          )}
          {!loading && !error && (
            <div className="overflow-x-auto">
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
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => {
                    const vehicle = vehicleData[reservation.carId];

                    return (
                      <tr key={reservation.id} className="border-t">
                        <td className="px-4 py-2 text-red-500 text-sm">
                          {reservation.startDate}
                        </td>
                        <td className="px-4 py-2 text-red-500 text-sm">
                          {reservation.endDate}
                        </td>
                        <td className="px-4 py-2">
                          {vehicle ? (
                            <div className="flex items-center space-x-4">
                              <img
                                src={
                                  vehicle.image ||
                                  "https://via.placeholder.com/100"
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
                                <button
                                  style={{
                                    backgroundColor: "red",
                                    padding: "0.2rem 1rem",
                                    borderRadius: "5px",
                                  }}
                                  onClick={() => {
                                    handleCancel(reservation.id, fetchData);
                                  }}
                                >
                                  Cancel
                                </button>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RezervationsTable;
