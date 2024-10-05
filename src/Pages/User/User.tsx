// import React, { useState, useEffect, useCallback, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import ApiService from "../../Shared/api";
// import { message, Modal, Button, Form, Input } from "antd";

// interface User {
//   id?: number;
//   //jmbg?: string;
//   name?: string;
//   admin?: string;
//   email?: string;
// }

// const UserPage: React.FC = () => {
//   const [user, setUser] = useState<User>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { id } = useParams();

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       console.log("Password change values:", values);
//       // Handle password change logic here

//       // Close the modal after processing
//       setIsModalOpen(false);
//     } catch (info) {
//       console.log("Validation Failed:", info);
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const navigate = useNavigate();

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await ApiService.getUser(id);

//       if (response.error) {
//         setError(response.error);
//       }

//       setUser(response.data);
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const deleteUser = async () => {
//     Modal.confirm({
//       title: "Are you sure you want to delete your profile?",
//       content: "This action cannot be undone.",
//       okText: "Yes, delete",
//       cancelText: "Cancel",
//       onOk: async () => {
//         try {
//           await ApiService.deleteUser(user.id);
//           message.success("Profile deleted successfully.");
//           navigate("/login");
//         } catch (error) {
//           message.error("There was an issue deleting your profile.");
//         }
//       },
//     });
//   };

//   const [form] = Form.useForm();

//   return (
//     <Fragment>
//       <div className="user-page">
//         {loading && <div>Loading...</div>}
//         {!loading && (
//           <div className="ucenik-details-page">
//             {error && <div>Error: {error}</div>}
//             <div className="ucenik-details-card-left">
//               {/* Profile Details */}
//               <div className="row-container">
//                 <p style={{ margin: "0" }}>Ime</p>
//                 <p style={{ margin: "0" }}>{user.name}</p>
//               </div>
//               {/* <div className="row-container">
//                 <p style={{ margin: "0" }}>JMBG</p>
//                 <p style={{ margin: "0" }}>{user.jmbg}</p>
//               </div> */}
//               <div className="row-container">
//                 <p style={{ margin: "0" }}>Email</p>
//                 <p style={{ margin: "0" }}>{user.email}</p>
//               </div>
//               <div className="row-container">
//                 <p style={{ margin: "0" }}>Role</p>
//                 <p style={{ margin: "0" }}>{user.admin}</p>
//               </div>
//             </div>
//             <div className="ucenik-details-card-right">
//               <div
//                 className="buttons-wrapper"
//                 style={{ marginLeft: "11rem", marginTop: "5rem" }}
//               >
//                 <Button type="primary" onClick={showModal}>
//                   Izmjeni Lozinku
//                 </Button>
//                 <Modal
//                   title="Change Password"
//                   open={isModalOpen}
//                   onOk={handleOk}
//                   onCancel={handleCancel}
//                 >
//                   <Form form={form} layout="vertical">
//                     <Form.Item
//                       name="oldPassword"
//                       label="Old Password"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please input your old password!",
//                         },
//                       ]}
//                     >
//                       <Input.Password placeholder="Enter old password" />
//                     </Form.Item>
//                     <Form.Item
//                       name="newPassword"
//                       label="New Password"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please input your new password!",
//                         },
//                       ]}
//                     >
//                       <Input.Password placeholder="Enter new password" />
//                     </Form.Item>
//                   </Form>
//                 </Modal>
//                 <Button
//                   type="primary"
//                   onClick={() => navigate("/profile-edit")}
//                 >
//                   Izmjeni Profil
//                 </Button>
//                 <Button type="primary" onClick={deleteUser}>
//                   Obrisi Profil
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <style>
//         {`
//         .ucenik-details-page {
//             display: flex;
//             flex-direction: row;
//         }
//         .ucenik-details-card-right {
//             display: flex;
//             flex-direction: column;
//         }
//         .row-container {
//             margin: 2rem 0 2rem 1rem;
//         }
//         .image {
//             width: 15rem;
//             height: 15rem;
//             margin: 6rem 0 0 15rem;
//         }
//         Button {
//           margin: 0 0.5rem;
//         }
//           `}
//       </style>
//     </Fragment>
//   );
// };

// export default UserPage;
import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";
import { Col, Row } from "antd";

interface User {
  id?: number;
  // jmbg?: string;
  name?: string;
  admin?: string;
  email?: string;
}

const UserPage: React.FC = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUser(id);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      setUser(response.data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Fragment>
      <div className="bibliotekar-details-page">
        {error && <div>Error: {error}</div>}
        {loading && <div>Loading...</div>}
        <div className="bibliotekar-details-card">
          <div className="rows-container">
            <Row className="row">
              <Col span={6}>
                <img
                  src="src\assets\Porsche.png"
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
                admin:
              </Col>
              <Col span={18}>{user.admin}</Col>
            </Row>
            <Row className="row">
              <Col span={6} className="col-title">
                Ime:
              </Col>
              <Col span={18}>{user.name}</Col>
            </Row>
            <Row className="row">
              <Col span={6} className="col-title">
                Email:
              </Col>
              <Col span={18}>{user.email}</Col>
            </Row>
            {/* <Row className="row">
              <Col span={6} className="col-title">
                JMBG:
              </Col>
              <Col span={18}>{user.jmbg}</Col>
            </Row> */}
          </div>
        </div>
      </div>
      <style>
        {`
            .bibliotekar-details-page {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: rgb(210, 248, 249);
            }

            .bibliotekar-details-card {
              width: 30rem;
              padding: 1.7rem;
              background-color: rgba(178, 237, 239, 0.881);
              box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
            }

            .bibliotekar-details-card .rows-container {
              width: 100%;
            }

            .bibliotekar-details-card .rows-container .row {
              margin-bottom: 1rem;
            }

            .bibliotekar-details-card .rows-container .col-title {
              font-weight: bold;
            }
          `}
      </style>
    </Fragment>
  );
};

export default UserPage;
