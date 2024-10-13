import React, { useState } from "react";
import { Button } from "antd";
import EditUserModal from "./EditUserModal";

interface EditUserBtnProps {
  userId: number;
  userName: string;
  userAdmin: boolean;
  fetchData: () => void; // Fetch data prop to trigger user list reload
}

const EditUserBtn: React.FC<EditUserBtnProps> = ({
  userId,
  userName,
  userAdmin,
  fetchData, // Destructure fetchData prop
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
      {!userAdmin && (
        <Button type="primary" onClick={handleOpenModal}>
          Upgrade to admin
        </Button>
      )}

      {isModalVisible && (
        <EditUserModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          userId={userId}
          userName={userName}
          fetchData={fetchData} // Pass fetchData to the modal
        />
      )}
    </>
  );
};

export default EditUserBtn;
