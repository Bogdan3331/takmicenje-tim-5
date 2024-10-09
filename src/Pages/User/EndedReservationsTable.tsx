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
}

const EndedReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicleData, setVehicleData] = useState<{ [key: number]: Vehicle }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<{ [key: number]: number }>({});
  const [comment, setComment] = useState<{ [key: number]: string }>({});
  const [loadingRate, setLoadingRate] = useState<{ [key: number]: boolean }>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUserReservations();

      if (response.error) {
        setError(response.error);
      }

      if (response.data.data) {
        const activeReservations = response.data.data;

        const endedReservations = activeReservations.filter(
          (reservation: Reservation) => new Date(reservation.endDate) < new Date()
        );

        setReservations(endedReservations);

        const vehiclePromises = endedReservations.map(async (reservation: Reservation) => {
          const vehicleResponse = await ApiService.getVehicleData(reservation.carId);
          return { id: reservation.carId, ...vehicleResponse.data.data };
        });

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
                  <div
                    key={reservation.id}
                    className="card-container flex flex-col items-center bg-transparent text-white rounded-lg overflow-hidden shadow-lg ml-auto m-4 w-80"
                    style={{ border: "1px solid rgba(255, 255, 255, 0.2)" }}
                  >
                    {/* Car Image */}
                    <img
                      src={vehicle?.image || "https://via.placeholder.com/100"}
                      alt={vehicle?.brand || "Car"}
                      className="w-full h-40 object-cover"
                    />

                    {/* Car Details */}
                    <div className="p-4 flex flex-col items-start">
                      <p className="text-sm text-gray-400">
                        Brand: <span className="text-blue-400">{vehicle?.brand}</span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Type: <span className="text-white">{vehicle?.type}</span>
                      </p>

                      {/* Pickup Date */}
                      <p className="text-sm text-gray-400 mt-2">
                        Pickup Date: {new Date(reservation.startDate).toLocaleDateString()}
                      </p>

                      {/* Return Date */}
                      <p className="text-sm text-gray-400">
                        Return Date: {new Date(reservation.endDate).toLocaleDateString()}
                      </p>

                      {/* Price */}
                      <p className="text-xl font-bold mt-4">
                        {vehicle?.price} € / day
                      </p>

                      {/* Rate & Comment */}
                      <div className="mt-4 w-full">
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
                          className="border-gray-300 rounded mt-2 w-full"
                        />
                        <Button
                          type="primary"
                          onClick={() => handleRate(reservation.id)}
                          loading={loadingRate[reservation.id]}
                          className="mt-2 bg-blue-600 w-full"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
