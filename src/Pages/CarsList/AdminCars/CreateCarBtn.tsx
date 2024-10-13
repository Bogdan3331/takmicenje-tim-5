import React, { useState } from "react";
import { Button } from "antd";
import CreateCarModal from "./CreateCarModal";

const CreateCarBtn: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const handleCreateModalOpen = () => {
    setCreateModalVisible(true);
  };
  const handleCreateModalClose = () => {
    setCreateModalVisible(false);
  };

  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={handleCreateModalOpen}>
        Create New Car
      </Button>

      <CreateCarModal
        visible={createModalVisible}
        onCancel={handleCreateModalClose}
        onCreateSuccess={handleCreateSuccess}
      />
    </div>
  );
};

export default CreateCarBtn;
