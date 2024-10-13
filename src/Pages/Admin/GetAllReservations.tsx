import React, { useEffect, useState } from "react";
import ApiService from "../../Shared/api";
import AllReservationsTable from "./AllReservationsTable";

interface Reservation {
  id: number;
  userId: number;
  carId: number;
  startDate: string;
  endDate: string;
  rate: { comment: string | undefined }; // Allowing null in case there's no comment
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

interface User {
  id: number;
  name: string; // Assuming the user object contains an id and name
}

const GetAllReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicleData, setVehicleData] = useState<{ [key: number]: Vehicle }>(
    {}
  );
  const [userData, setUserData] = useState<{ [key: number]: User }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllReservations = async () => {
      setLoading(true);
      try {
        const response = await ApiService.getAllReservations();
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
              return { id: reservation.carId, ...vehicleResponse.data.data };
            }
          );

          const vehicles = await Promise.all(vehiclePromises);
          const vehiclesById = vehicles.reduce((acc, vehicle) => {
            acc[vehicle.id] = vehicle;
            return acc;
          }, {} as { [key: number]: Vehicle });

          setVehicleData(vehiclesById);

          const userPromises = allReservations.map(
            async (reservation: Reservation) => {
              const userResponse = await ApiService.getUsersNames(
                reservation.userId
              );
              return {
                id: reservation.userId,
                name: userResponse.data?.data.name || "Unknown User",
              };
            }
          );
          const users = await Promise.all(userPromises);
          const usersById = users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {} as { [key: number]: User });

          setUserData(usersById);
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
      <AllReservationsTable
        reservations={reservations}
        vehicleData={vehicleData}
        userData={userData}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default GetAllReservations;
