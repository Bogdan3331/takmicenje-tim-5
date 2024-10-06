import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, DatePicker, Button } from "antd";
import ApiService from "../../Shared/api";
import { Dayjs } from "dayjs";

interface ReserveBtnProps {
  carId: number;
}

const ReserveBtn: React.FC<ReserveBtnProps> = ({ carId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);
  const authToken = localStorage.getItem("auth_token");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReserve = async () => {
    if (!authToken) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (!startDateTime || !endDateTime) {
      console.error("Please select both start and end date-time.");
      return;
    }

    const values = {
      carId,
      startDate: startDateTime.format("YYYY-MM-DD HH:mm"),
      endDate: endDateTime.format("YYYY-MM-DD HH:mm"),
    };

    try {
      const response = await ApiService.reserveVehicle(values);
      console.log("Reservation Response:", response);
      setIsModalOpen(false);
      // Handle success/failure (e.g., notifications, redirect)
    } catch (error) {
      console.error("Error reserving vehicle:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Reserve Car
      </Button>

      <Modal
        title="Reserve Car"
        visible={isModalOpen}
        onCancel={handleCancel}
        onOk={handleReserve}
        okText="Reserve"
        cancelText="Cancel"
      >
        <div className="reserve-form">
          <div className="form-section">
            <label>Start Date and Time:</label>
            <DatePicker
              showTime
              placeholder="Select start date and time"
              value={startDateTime}
              onChange={(value) => setStartDateTime(value)}
              format="YYYY-MM-DD HH:mm"
              style={{ marginBottom: "1rem" }}
            />
          </div>
          <div className="form-section">
            <label>End Date and Time:</label>
            <DatePicker
              showTime
              placeholder="Select end date and time"
              value={endDateTime}
              onChange={(value) => setEndDateTime(value)}
              format="YYYY-MM-DD HH:mm"
              style={{ marginBottom: "1rem" }}
            />
          </div>
        </div>
      </Modal>

      <style>{`
        .reserve-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default ReserveBtn;
