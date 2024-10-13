import React, { useState } from "react";
import { Modal, Button } from "antd";
import ApiService from "../../../Shared/api";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
  fetchData: () => void; // Add fetchData to trigger the user reload
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onClose,
  userId,
  userName,
  fetchData, // Destructure fetchData
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const values = { name: userName, admin: 1 }; // Always send admin: 1
      const response = await ApiService.editUserData(userId, values);

      if (!response.error) {
        alert("User updated successfully.");
        fetchData(); // Trigger the user list refresh
        onClose();
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while trying to update the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Confirm Edit"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={handleConfirm}
          loading={loading}
        >
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to update {userName} to admin?</p>
    </Modal>
  );
};

export default EditUserModal;
