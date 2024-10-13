import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, DatePicker, Button, message } from "antd";
import ApiService from "../../Shared/api";
import { Dayjs } from "dayjs";

interface ReserveBtnProps {
  carId: number;
  carPrice: number;
  startDateProp?: Dayjs | null;
  endDateProp?: Dayjs | null;
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

    const values = {
      carId,
      startDate: startDateProp
        ? startDateProp.format("YYYY-MM-DD HH:mm")
        : startDateTime
        ? startDateTime.format("YYYY-MM-DD HH:mm")
        : null,
      endDate: endDateProp
        ? endDateProp.format("YYYY-MM-DD HH:mm")
        : endDateTime
        ? endDateTime.format("YYYY-MM-DD HH:mm")
        : null,
    };

    try {
      const response = await ApiService.reserveVehicle(values);
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
  const calculateTotalPrice = useCallback(
    (startDate: Dayjs | null, endDate: Dayjs | null) => {
      if (startDate && endDate) {
        const diffInDays = endDate.diff(startDate, "day");
        const calculatedPrice = diffInDays * carPrice + carPrice;
        setTotalPrice(calculatedPrice);
      } else {
        setTotalPrice(0);
      }
    },
    [carPrice]
  );

  useEffect(() => {
    if (startDateProp && endDateProp) {
      calculateTotalPrice(startDateProp, endDateProp);
    }
  }, [startDateProp, endDateProp, calculateTotalPrice]);

  useEffect(() => {
    if (!startDateProp && !endDateProp) {
      calculateTotalPrice(startDateTime, endDateTime);
    }
  }, [
    startDateTime,
    endDateTime,
    calculateTotalPrice,
    endDateProp,
    startDateProp,
  ]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Reserve Car
      </Button>

      <Modal
        title="Reserve Car"
        open={isModalOpen}
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

          <div className="form-section">
            <p>
              {totalPrice > 0
                ? `Total Price: $${totalPrice.toFixed(2)}`
                : "Please select both start and end dates"}
            </p>
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
