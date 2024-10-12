import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import UserReservationsBtn from "./UserReservationsBtn";
import GetAllReservations from "./GetAllReservations";

interface User {
  id: number;
  name?: string;
  email?: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUsers();

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data?.data)) {
        setUsers(response.data.data); // Remove filtering by role
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="grid-header">Ime</div>
        <div className="grid-header">E-mail</div>
        <div className="grid-header"></div>
        {users.map(
          (
            user // Use 'users' instead of 'filteredUsers'
          ) => (
            <div key={user.id} className="grid-item">
              <div>{user.name || "No Name"}</div>
              <div>{user.email || "N/A"}</div>
              <UserReservationsBtn userId={user.id} />
            </div>
          )
        )}
      </div>
      <GetAllReservations />
    </div>
  );
};

export default AdminPage;
