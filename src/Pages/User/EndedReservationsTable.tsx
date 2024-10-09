import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import { Rate, Input, Button } from "antd"; // Ant Design for stars and input

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

const EndedReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicleData, setVehicleData] = useState<{ [key: number]: Vehicle }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<{ [key: number]: number }>({});
  const [comment, setComment] = useState<{ [key: number]: string }>({});
  const [loadingRate, setLoadingRate] = useState<{ [key: number]: boolean }>(
    {}
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUserReservations();

      if (response.error) {
        setError(response.error);
      }

      if (response.data.data) {
        const activeReservations = response.data.data;

        const endedReservations = activeReservations.filter(
          (reservation: Reservation) =>
            new Date(reservation.endDate) < new Date()
        );

        setReservations(endedReservations);

        const vehiclePromises = endedReservations.map(
          async (reservation: Reservation) => {
            const vehicleResponse = await ApiService.getVehicleData(
              reservation.carId
            );
            return { id: reservation.carId, ...vehicleResponse.data.data };
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

  const handleRate = async (reservationId: number) => {
    const selectedRating = rating[reservationId];
    const selectedComment = comment[reservationId];

    if (selectedRating && selectedComment) {
      setLoadingRate({ ...loadingRate, [reservationId]: true });
      try {
        await ApiService.RateReservation(reservationId, {
          rate: selectedRating,
          comment: selectedComment,
        });
        alert("Rating submitted successfully!");
      } catch (error) {
        console.error("Failed to submit rating", error);
      } finally {
        setLoadingRate({ ...loadingRate, [reservationId]: false });
      }
    } else {
      alert("Please provide a rating and a comment.");
    }
  };

  return (
    <div className="reservations">
      <div className="flex justify-center">
        <div className="mt-8 w-full max-w-6xl mb-12">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Ended Reservations
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            Overview of your ended car reservations
          </p>
          {loading && (
            <div className="text-center text-xl text-gray-700">Loading...</div>
          )}
          {error && (
            <div className="text-center text-xl text-red-600">
              Error: {error}
            </div>
          )}
          {!loading && !error && reservations.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
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
                      Rate & Comment
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
                                className="w-16 h-16 object-cover"
                              />
                              <div>
                                <p className="text-gray-600">
                                  {vehicle.brand || "No Brand"}
                                </p>
                              </div>
                            </div>
                          ) : (
                            "Loading Vehicle..."
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <div>
                            <Rate
                              allowHalf
                              value={rating[reservation.id]}
                              onChange={(value) =>
                                setRating({
                                  ...rating,
                                  [reservation.id]: value,
                                })
                              }
                            />
                            <Input
                              placeholder="Leave a comment"
                              maxLength={100}
                              value={comment[reservation.id]}
                              onChange={(e) =>
                                setComment({
                                  ...comment,
                                  [reservation.id]: e.target.value,
                                })
                              }
                            />
                            <Button
                              type="primary"
                              onClick={() => handleRate(reservation.id)}
                              loading={loadingRate[reservation.id]}
                              className="mt-2"
                            >
                              Submit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!loading && !error && reservations.length === 0 && (
            <div className="text-center text-xl text-gray-600">
              No ended reservations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EndedReservationsTable;
