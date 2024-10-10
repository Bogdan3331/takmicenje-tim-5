import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import RatingForm from "./RatingLogic";
import { Rate } from "antd";

interface Reservation {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  rate?: { rate: number; comment: string };
}

interface Vehicle {
  id: number;
  type: string;
  image: string;
  brand: string;
  price: number;
  avgRate: number;
}

const EndedReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicleData, setVehicleData] = useState<{ [key: number]: Vehicle }>({});
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
      console.log(response);
      if (response.error) {
        setError(response.error);
      }

      if (response.data.data) {
        const activeReservations: Reservation[] = response.data.data;
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
    } catch (error: unknown) {
      console.error("There was a problem with the fetch operation:", error);
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="reservations py-10 px-4">
      <div className="flex justify-end"> {/* Aligning the card to the right */}
        <div className="mt-8 w-full max-w-6xl mb-12 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-white mb-6">
            Ended Reservations
          </h1>
          
          {loading && (
            <div className="text-center text-xl text-gray-700">Loading...</div>
          )}
          {error && (
            <div className="text-center text-xl text-red-600">
              Error: {error}
            </div>
          )}
          {!loading && !error && reservations.length > 0 && (
            <div className="flex flex-col items-end"> {/* Align items to the end */}
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
