import React, { useState } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import ApiService from "../../../Shared/api";

interface EditUserModalProps {
  visible: boolean;
  onClose: () => void;
  userId: number; // ID of the user to edit
  initialName: string; // Current name of the user
  initialAdmin: boolean; // Current admin status
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  visible,
  onClose,
  userId,
  initialName,
  initialAdmin,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [isAdmin, setIsAdmin] = useState<boolean>(initialAdmin);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      const values = { name, admin: isAdmin };
      const response = await ApiService.editUserData(userId, values);

      if (!response.error) {
        alert("User updated successfully.");
        onClose(); // Close the modal on success
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
    <Modal title="Edit User" visible={visible} onCancel={onClose} footer={null}>
      <Form layout="vertical">
        <Form.Item label="Name" required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
          />
        </Form.Item>

        <Form.Item label="Admin" required>
          <Select
            value={isAdmin}
            onChange={(value: boolean) => setIsAdmin(value)}
          >
            <Select.Option value={true}>True</Select.Option>
            <Select.Option value={false}>False</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSave} loading={loading}>
            Save
          </Button>
          <Button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
