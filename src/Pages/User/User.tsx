import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";
import { message, Modal, Button, Form, Input } from "antd";

interface User {
  id?: number;
  role?: string;
  jmbg?: string;
  photoPath?: string;
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Password change values:", values);
      // Handle password change logic here

      // Close the modal after processing
      setIsModalOpen(false);
    } catch (info) {
      console.log("Validation Failed:", info);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUser();

      if (response.error) {
        setError(response.error);
      }

      setUser(response.data.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteUser = async () => {
    Modal.confirm({
      title: "Are you sure you want to delete your profile?",
      content: "This action cannot be undone.",
      okText: "Yes, delete",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await ApiService.deleteUser(user.id);
          message.success("Profile deleted successfully.");
          navigate("/login");
        } catch (error) {
          message.error("There was an issue deleting your profile.");
        }
      },
    });
  };

  const [form] = Form.useForm();

  return (
    <Fragment>
      <div className="user-page">
        {loading && <div>Loading...</div>}
        {!loading && (
          <div className="ucenik-details-page">
            {error && <div>Error: {error}</div>}
            <div className="ucenik-details-card-left">
              {/* Profile Details */}
              <div className="row-container">
                <p style={{ margin: "0" }}>Ime i Prezime</p>
                <p style={{ margin: "0" }}>
                  {user.name} {user.surname}
                </p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Tip Korisnika</p>
                <p style={{ margin: "0" }}>{user.role}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>JMNG</p>
                <p style={{ margin: "0" }}>{user.jmbg}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Email</p>
                <p style={{ margin: "0" }}>{user.email}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Korisnicko ime</p>
                <p style={{ margin: "0" }}>{user.username}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Broj Logovanja</p>
                <p style={{ margin: "0" }}>{user.username}</p>
              </div>
              <div className="row-container">
                <p style={{ margin: "0" }}>Poslednji put ulogovan</p>
                <p style={{ margin: "0" }}>{user.username}</p>
              </div>
            </div>
            <div className="ucenik-details-card-right">
              <img className="image" src={user.photoPath} alt="Slika" />
              <div
                className="buttons-wrapper"
                style={{ marginLeft: "11rem", marginTop: "5rem" }}
              >
                <Button type="primary" onClick={showModal}>
                  Izmjeni Lozinku
                </Button>
                <Modal
                  title="Change Password"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <Form form={form} layout="vertical">
                    <Form.Item
                      name="oldPassword"
                      label="Old Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your old password!",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Enter old password" />
                    </Form.Item>
                    <Form.Item
                      name="newPassword"
                      label="New Password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your new password!",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Enter new password" />
                    </Form.Item>
                  </Form>
                </Modal>
                <Button
                  type="primary"
                  onClick={() => navigate("/profile-edit")}
                >
                  Izmjeni Profil
                </Button>
                <Button type="primary" onClick={deleteUser}>
                  Obrisi Profil
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>
        {`
        .ucenik-details-page {
            display: flex;
            flex-direction: row;
        }
        .ucenik-details-card-right {
            display: flex;
            flex-direction: column;
        }
        .row-container {
            margin: 2rem 0 2rem 1rem;
        }
        .image {
            width: 15rem;
            height: 15rem;
            margin: 6rem 0 0 15rem;
        }
        Button {
          margin: 0 0.5rem;
        }
          `}
      </style>
    </Fragment>
  );
};

export default User;
