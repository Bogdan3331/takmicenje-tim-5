import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import UserReservationsBtn from "./UserReservations/UserReservationsBtn";
import GetAllReservations from "./GetAllReservations";
import { Button, Dropdown, MenuProps, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
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
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
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

      if (Array.isArray(response.data?.data)) {
        setUsers(response.data.data);
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderUserOptions = (user: User): MenuProps["items"] => [
    {
      key: "reservations",
      label: <UserReservationsBtn userId={user.id} />,
    },
    {
      key: "edit",
      label: (
        <EditUserBtn
          userId={user.id}
          userName={user.name as string}
          userAdmin={user.admin}
          fetchData={fetchData}
        />
      ),
    },
    {
      key: "delete",
      label: (
        <Button
          type="primary"
          onClick={() => {
            handleDelete(user.id);
          }}
        >
          Delete User
        </Button>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4 h-screen overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 bg-gray-700 mb-2 rounded-lg shadow-sm"
          >
            <span className="text-white">{user.name || "No Name"}</span>
            <Dropdown
              menu={{ items: renderUserOptions(user) }}
              trigger={["click"]}
            >
              <Button
                icon={<EllipsisOutlined />}
                className="bg-transparent border-none shadow-none text-white hover:bg-transparent focus:bg-transparent active:bg-transparent"
              />
            </Dropdown>
          </div>
        ))}
      </div>
      <div className="w-3/4 p-6">
        <GetAllReservations />
      </div>
      <a href="/admin-map">open map</a>
    </div>
  );
};

export default AdminPage;
