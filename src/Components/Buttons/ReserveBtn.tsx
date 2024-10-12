import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, DatePicker, Button, message } from "antd";
import ApiService from "../../Shared/api";
import { Dayjs } from "dayjs";

interface ReserveBtnProps {
  carId: number;
  carPrice: number;
  startDateProp?: Dayjs | null; // Optional prop
  endDateProp?: Dayjs | null; // Optional prop
}

const ReserveBtn: React.FC<ReserveBtnProps> = ({
  carId,
  carPrice,
  startDateProp,
  endDateProp,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(
    startDateProp || null
  );
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(
    endDateProp || null
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const authToken = localStorage.getItem("auth_token");

  // Show the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle reservation API call
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
      } else {
        message.success(response.data.message);
      }
    } catch (error) {
      console.error("Error reserving vehicle:", error);
    }
  };

  // Calculate total price based on selected or prefilled dates
  const calculateTotalPrice = (
    startDate: Dayjs | null,
    endDate: Dayjs | null
  ) => {
    if (startDate && endDate) {
      const diffInDays = endDate.diff(startDate, "day");
      const calculatedPrice = diffInDays * carPrice + carPrice;
      setTotalPrice(calculatedPrice);
    } else {
      setTotalPrice(0); // Reset price if dates are not fully selected
    }
  };

  // Initial price calculation if props are provided
  useEffect(() => {
    if (startDateProp && endDateProp) {
      calculateTotalPrice(startDateProp, endDateProp);
    }
  }, [startDateProp, endDateProp, carPrice]);

  // Recalculate price when user selects dates in the DatePicker
  useEffect(() => {
    if (!startDateProp && !endDateProp) {
      calculateTotalPrice(startDateTime, endDateTime);
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
          {/* Only show DatePicker if startDateProp or endDateProp are not passed */}
          {!startDateProp && !endDateProp && (
            <>
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
            </>
          )}

          {/* Show total price */}
          <div className="form-section">
            <label>
              Total Price:{" "}
              <p>
                {startDateProp && endDateProp
                  ? `Total Price: $${totalPrice.toFixed(2)} (pre-filled)`
                  : totalPrice > 0
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
