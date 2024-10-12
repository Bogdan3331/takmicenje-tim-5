import React, { useState } from "react";
import { Modal, Input } from "antd";

interface EditPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (values: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }) => Promise<void>;
}

const EditPasswordModal: React.FC<EditPasswordModalProps> = ({
  visible,
  onClose,
  onUpdate,
}) => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");

  const handleOk = async () => {
    // Call onUpdate with the current password, new password, and confirm password values
    await onUpdate({ currentPassword, newPassword, newPasswordConfirmation });
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
            value={newPasswordConfirmation}
            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditPasswordModal;
