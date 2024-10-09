import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, DatePicker, Button, message } from "antd";
import ApiService from "../../Shared/api";
import { Dayjs } from "dayjs";

interface ReserveBtnProps {
  carId: number;
  carPrice: number;
}

const ReserveBtn: React.FC<ReserveBtnProps> = ({ carId, carPrice }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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
      if (
        response.data.message === "Selected car is not available for that dates"
      ) {
        message.warning(response.data.message);
      } else message.success(response.data.message);
    } catch (error) {
      console.error("Error reserving vehicle:", error);
    }
  };

  // Calculate total price whenever the dates are updated
  useEffect(() => {
    if (startDateTime && endDateTime) {
      const diffInDays = endDateTime.diff(startDateTime, "day");
      let calculatedPrice = diffInDays * carPrice + carPrice;

      // Extract the hour from startDateTime
      const startHour = startDateTime.hour();

      // Check if the start time is between 19:00 and 07:00
      if (startHour >= 19 || startHour <= 7) {
        // Leave a line for your custom logic here if you want to apply any additional logic
      } else {
        calculatedPrice += carPrice; // Normal calculation
      }

      setTotalPrice(calculatedPrice);
    } else {
      setTotalPrice(0); // Reset if dates are not fully selected
    }
  }, [startDateTime, endDateTime, carPrice]);

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
          <div className="form-section">
            <label>
              Total Price:{" "}
              <p>
                {totalPrice > 0
                  ? `Total Price: $${totalPrice.toFixed(2)}`
                  : "Please select both start and end dates"}
              </p>
            </label>
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
