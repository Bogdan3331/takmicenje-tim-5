import React, { useState, useEffect, useCallback, Fragment } from "react";
import ApiService from "../../Shared/api";
import { Col, message, Row } from "antd";
import EditProfileModal from "./EditProfileModal";

interface User {
  id?: number;
  name?: string;
  admin?: string;
  email?: string;
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdate = async (values: { name: string; email: string }) => {
    // Perform API call to update user information
    await ApiService.editUser(values);
    // Update the local user state with new user info
    setUser((prev) => (prev ? { ...prev, ...values } : null));
    setIsModalVisible(false); // Close the modal
  };

  const handleLogout = async () => {
    try {
      const response = await ApiService.logoutUser();
      // Because api only has error method
      if (!response.error) {
        // Clear user data from local storage or context
        localStorage.removeItem("auth_token");
      }
    } catch (error) {
      message.error("There was a problem with the logout operation");
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

      console.log("API Response:", response);
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

  return (
    <Fragment>
      <div className="bibliotekar-details-page">
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        {!loading && user && (
          <div className="bibliotekar-details-card">
            <div className="rows-container">
              <Row className="row">
                <Col span={6}>
                  <img
                    src="src/assets/Porsche.png"
                    alt="User"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </Col>
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  Admin:
                </Col>
                <Col span={18}>{user.admin || "N/A"}</Col> {/* Safe fallback */}
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  Ime:
                </Col>
                <Col span={18}>{user.name || "N/A"}</Col> {/* Safe fallback */}
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  Email:
                </Col>
                <Col style={{ color: "red" }} span={18}>
                  {user.email || "N/A"} {/* Safe fallback */}
                </Col>
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  <button onClick={handleLogout}>LogOut</button>
                </Col>
              </Row>
              <Row className="row">
                <Col span={6} className="col-title">
                  <button onClick={() => setIsModalVisible(true)}>
                    Edit Profile
                  </button>
                  <EditProfileModal
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    onUpdate={handleUpdate}
                    initialValues={{
                      name: user.name || "",
                      email: user.email || "",
                    }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UserPage;
