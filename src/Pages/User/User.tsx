import React, { useState, useEffect, useCallback, Fragment } from "react";
import ApiService from "../../Shared/api";
import { message } from "antd";
import EditProfileModal from "./EditProfileModal";
import EditPasswordModal from "./EditPasswordModal"; // Import the password modal
import { useNavigate } from "react-router-dom";

interface User {
  id?: number;
  name?: string;
  admin?: string;
  email?: string;
}

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false); // State for password modal

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
    newPasswordConfirmation: string;
  }) => {
    try {
      await ApiService.editPassword(values); // Call your API service for password update
      setIsPasswordModalVisible(false); // Close the password modal
      message.success("Password updated successfully!");
    } catch (error) {
      message.error("Failed to update password.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await ApiService.logoutUser();
      if (!response.error) {
        localStorage.removeItem("auth_token");
        message.success("Logged out successfully.");
        navigate("/");
      }
    } catch (error) {
      message.error("There was a problem with the logout operation.");
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.showProfile();
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

  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-20 w-full max-w-md">
          {error && <div className="text-red-500">Error: {error}</div>}
          {loading && <div className="text-center">Loading...</div>}
          {!loading && user && (
            <div className="space-y-6">
              {/* User Image */}
              <div className="flex justify-center">
                <svg
                  width="96px"
                  height="96px"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#000000"
                  strokeWidth="0.8640000000000001"
                  transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
                  className="w-24 h-24 rounded-full border-2 border-gray-300"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">{/* Your SVG content here */}</g>
                </svg>
              </div>

              <div className="space-y-4">
                {/* Admin Input (Darker and Read-Only without label) */}
                <div>
                  <input
                    type="text"
                    value="admin 1"
                    readOnly
                    className="w-full text-white bg-gray-800 border-2 border-gray-700 rounded-xl p-4 mt-1 cursor-not-allowed"
                  />
                </div>

                {/* Name Input (Read-Only) */}
                <div>
                  <label className="text-lg text-black font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    value={user.name || "N/A"}
                    readOnly
                    className="w-full text-black border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Email Input (Read-Only) */}
                <div>
                  <label className="text-lg text-black font-medium">
                    Email:
                  </label>
                  <input
                    type="text"
                    value={user.email || "N/A"}
                    readOnly
                    className="w-full text-black border-2 border-gray-100 rounded-xl p-4 mt-1 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between space-x-4">
                  <button
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>

                  <button
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                    onClick={() => setIsProfileModalVisible(true)}
                  >
                    Edit Profile
                  </button>

                  <button
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
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
    </Fragment>
  );
};

export default UserPage;
