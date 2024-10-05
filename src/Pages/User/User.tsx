import React, { useState, useEffect, useCallback, Fragment } from "react";
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

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getUser();

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
  }, []);

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
