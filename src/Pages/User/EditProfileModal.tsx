import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (values: { name: string; email: string }) => Promise<void>;
  initialValues: { name: string; email: string };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  visible,
  onClose,
  onUpdate,
  initialValues,
}) => {
  // Initialize state with initialValues
  const [name, setName] = useState<string>(initialValues.name);
  const [email, setEmail] = useState<string>(initialValues.email);

  // Update state whenever initialValues changes
  useEffect(() => {
    setName(initialValues.name);
    setEmail(initialValues.email);
  }, [initialValues]);

  const handleOk = async () => {
    // Call onUpdate with the current name and email values
    await onUpdate({ name, email });
  };

  return (
    <Modal
      title="Edit Profile"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
    >
      <div>
        <div>
          <label>Name:</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Email:</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
