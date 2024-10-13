import React, { useState } from "react";
import { Modal, Input } from "antd";

interface EditPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (values: {
    currentPassword: string;
    newPassword: string;
    newPassword_confirmation: string;
  }) => Promise<void>;
}

const EditPasswordModal: React.FC<EditPasswordModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPassword_confirmation, setnewPassword_confirmation] =
    useState<string>("");

  const handleOk = async () => {
    await onUpdate({ currentPassword, newPassword, newPassword_confirmation });
  };

  return (
    <Modal
      title="Edit Password"
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
    >
      <div>
        <div>
          <label>Current Password:</label>
          <Input.Password
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>New Password:</label>
          <Input.Password
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Confirm New Password:</label>
          <Input.Password
            value={newPassword_confirmation}
            onChange={(e) => setnewPassword_confirmation(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditPasswordModal;
