import React, { useState } from "react";
import { Button } from "antd";
import CreateCarModal from "./CreateCarModal";

const CreateCarBtn: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);

  // Handle opening and closing the create modal
  const handleCreateModalOpen = () => {
    setCreateModalVisible(true);
  };
  const handleCreateModalClose = () => {
    setCreateModalVisible(false);
  };

  // Callback for successful creation
  const handleCreateSuccess = () => {
    console.log("Car created successfully");
    setCreateModalVisible(false);
  };

  return (
    <div>
      {/* Button to open create car modal */}
      <Button type="primary" onClick={handleCreateModalOpen}>
        Create New Car
      </Button>

      {/* Car create modal */}
      <CreateCarModal
        visible={createModalVisible}
        onCancel={handleCreateModalClose}
        onCreateSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default CreateCarBtn;
