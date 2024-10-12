import React from "react";
import { Spin } from "antd";

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
  name: string;
}

interface AllReservationsTableProps {
  reservations: Reservation[];
  vehicleData: { [key: number]: Vehicle };
  userData: { [key: number]: User };
  loading: boolean;
  error: string | null;
}

const AllReservationsTable: React.FC<AllReservationsTableProps> = ({
  reservations,
  vehicleData,
  userData,
  loading,
  error,
}) => {
  if (loading) return <Spin />;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
      <thead>
        <tr className="bg-gray-200 rounded-lg">
          <th className="px-4 py-2 text-left font-semibold text-gray-700">
            User Name
          </th>
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
          const vehicle = vehicleData[reservation.carId];
          const user = userData[reservation.userId];

          return (
            <tr key={reservation.id} className="border-t">
              <td className="px-4 py-2 text-gray-500 text-sm">
                {user ? user.name : "Loading..."}
              </td>
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
                      src={vehicle.image || "https://via.placeholder.com/100"}
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
                    </div>
                  </div>
                ) : (
                  "Loading Vehicle..."
                )}
              </td>
              <td className="px-4 py-2 text-gray-500 text-sm">
                {reservation.rate && reservation.rate.comment
                  ? reservation.rate.comment
                  : "No Comment"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AllReservationsTable;
