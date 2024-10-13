import React, { useState, useEffect, useCallback, Fragment } from "react";
import ApiService from "../../Shared/api";
import { message } from "antd";
import EditProfileModal from "./EditProfileModal";
import EditPasswordModal from "./EditPasswordModal";
import EndedReservationsTable from "./EndedReservationsTable";
import { useNavigate } from "react-router-dom";

interface User {
  id?: number;
  name?: string;
  admin?: number;
  email?: string;
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false); // State for password modal

  const navigate = useNavigate();

  const handleUpdateProfile = async (values: {
    name: string;
    email: string;
  }) => {
    try {
      await ApiService.editUser(values);
      setUser((prev) => (prev ? { ...prev, ...values } : null));
      setIsProfileModalVisible(false); // Close the profile modal
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile.");
    }
  };

  const handleUpdatePassword = async (values: {
    currentPassword: string;
    newPassword: string;
    newPassword_confirmation: string;
  }) => {
    try {
      await ApiService.editPassword(values); // Call your API service for password update
      setIsPasswordModalVisible(false); // Close the password modal
      message.success("Password updated successfully!");
    } catch (error) {
      message.error("Failed to update password.");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUserData();
      if (response.error) {
        setError(response.error);
      } else {
        setUser(response.data?.data);
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

  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in"); // Redirect only after the data has been fetched and user is null
    }
  }, [loading, user, navigate]);

  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-lg">
          {error && (
            <div className="text-red-500 text-center mb-4">Error: {error}</div>
          )}
          {loading && <div className="text-center">Loading...</div>}
          {!loading && user && (
            <div className="space-y-8">
              {/* User Image */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z"></path>
                    <path d="M12 14c-4.41 0-8 1.79-8 4v2h16v-2c0-2.21-3.59-4-8-4z"></path>
                  </svg>
                </div>
              </div>

              <div className="space-y-4">
                {/* Admin Input */}
                <input
                  type="text"
                  value={
                    user.admin === 1 ? "You are admin" : "You are not admin"
                  }
                  readOnly
                  className="w-full text-white bg-gray-800 border-2 border-gray-700 rounded-lg p-4 cursor-default"
                />

                {/* Name Input */}
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <input
                    type="text"
                    value={user.name || "N/A"}
                    readOnly
                    className="w-full text-gray-700 border-2 border-gray-200 rounded-lg p-4 mt-1 bg-gray-100 cursor-default"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <input
                    type="text"
                    value={user.email || "N/A"}
                    readOnly
                    className="w-full text-gray-700 border-2 border-gray-200 rounded-lg p-4 mt-1 bg-gray-100 cursor-default"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between space-x-4">
                  <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    onClick={() => setIsProfileModalVisible(true)}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    onClick={() => setIsPasswordModalVisible(true)}
                  >
                    Change Password
                  </button>
                </div>
              </div>

              {/* Modal for editing profile */}
              <EditProfileModal
                visible={isProfileModalVisible}
                onClose={() => setIsProfileModalVisible(false)}
                onUpdate={handleUpdateProfile}
                initialValues={{
                  name: user.name || "",
                  email: user.email || "",
                }}
              />

              {/* Modal for editing password */}
              <EditPasswordModal
                visible={isPasswordModalVisible}
                onClose={() => setIsPasswordModalVisible(false)}
                onUpdate={handleUpdatePassword}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {" "}
        {/* Aligning reservations to the right */}
        <div className="w-full max-w-2xl p-4">
          {" "}
          {/* Set max width for the reservations table */}
          <EndedReservationsTable />
        </div>
      </div>
    </Fragment>
  );
};

export default UserPage;
