import React, { useState } from "react";
import { Button } from "antd";
import EditUserModal from "./EditUserModal";

interface EditUserBtnProps {
  userId: number;
  userName: string;
  userAdmin: boolean;
}

const EditUserBtn: React.FC<EditUserBtnProps> = ({
  userId,
  userName,
  userAdmin,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Edit User
      </Button>

      {/* Render the EditUserModal only when the button is clicked */}
      {isModalVisible && (
        <EditUserModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          userId={userId}
          initialName={userName}
          initialAdmin={userAdmin}
        />
      )}
    </>
  );
};

export default EditUserBtn;
