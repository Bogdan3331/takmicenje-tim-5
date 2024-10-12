import React, { useState } from "react";
import { Button } from "antd";
import UserReservationsModal from "./UserReservationsModal";

interface UserReservationsBtnProps {
  userId: number;
}

const UserReservationsBtn: React.FC<UserReservationsBtnProps> = ({
  userId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        View Reservations
      </Button>
      <UserReservationsModal
        visible={isModalVisible}
        onClose={handleClose}
        userId={userId}
      />
    </>
  );
};

export default UserReservationsBtn;
