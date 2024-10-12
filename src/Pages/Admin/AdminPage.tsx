import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import UserReservationsBtn from "./UserReservations/UserReservationsBtn";
import GetAllReservations from "./GetAllReservations";
import { Button, message } from "antd";
import EditUserBtn from "./EditUser/EditUserBtn";

interface User {
  id: number;
  name?: string;
  email?: string;
  admin: boolean;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmation) return;

      const response = await ApiService.deleteUser(id);

      if (!response.error) {
        message.success("User deleted successfully.");
      } else {
        message.error("Failed to delete user. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred while trying to delete the user.");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUsers();

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data?.data)) {
        setUsers(response.data.data);
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
        {users.map((user) => (
          <div key={user.id} className="grid-item">
            <div>{user.name || "No Name"}</div>
            <div>{user.email || "N/A"}</div>
            <UserReservationsBtn userId={user.id} />
            <EditUserBtn
              userId={user.id}
              userName={user.name as string}
              userAdmin={user.admin}
            />
            <Button
              type="primary"
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              Delete User
            </Button>
          </div>
        ))}
      </div>
      <GetAllReservations />
    </div>
  );
};

export default AdminPage;
