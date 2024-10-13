import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Button } from "antd";
import ApiService from "../../../Shared/api"; // Assuming this is where you handle API calls

const { Option } = Select;

interface CarCreateModalProps {
  visible: boolean;
  onCancel: () => void;
  onCreateSuccess: () => void; // Callback for successful creation
}

const CreateCarModal: React.FC<CarCreateModalProps> = ({
  visible,
  onCancel,
  onCreateSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreate = async (values: any) => {
    setLoading(true);
    values.image = selectedImage;
    try {
      const reponse = await ApiService.createCar(values);
      console.log(reponse);
      setLoading(false);
      onCreateSuccess();
      onCancel();
    } catch (error) {
      console.error("Error creating car:", error);
      setLoading(false);
    }
  };

  const handleImageChange = (event: any) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <Modal
      open={visible}
      title="Create New Car"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleCreate} layout="vertical">
        <Form.Item
          label="Image jpg format"
          name="image"
          rules={[{ required: false, message: "Please enter image URL" }]}
        >
          <Input
            type="file"
            onChange={handleImageChange}
            placeholder="Enter image URL"
          />
        </Form.Item>

        <Form.Item
          label="Fuel Type"
          name="fuelType"
          rules={[{ required: true, message: "Please select fuel type" }]}
        >
          <Select placeholder="Select fuel type">
            <Option value="Petrol">Petrol</Option>
            <Option value="Diesel">Diesel</Option>
            <Option value="Electric">Electric</Option>
            <Option value="Hybrid">Hybrid</Option>
          </Select>
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            placeholder="Enter price"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Fuel Consumption"
          name="fuelConsumption"
          rules={[{ required: true, message: "Please enter Fuel Consumption" }]}
        >
          <InputNumber
            placeholder="Fuel Consumption"
            min={0}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea placeholder="Enter description" rows={3} />
        </Form.Item>

        {/* Brand */}
        <Form.Item
          label="Brand"
          name="brand"
          rules={[{ required: true, message: "Please enter brand" }]}
        >
          <Input placeholder="Enter brand" />
        </Form.Item>

        {/* Type */}
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please enter type" }]}
        >
          <Input placeholder="Enter type" />
        </Form.Item>

        {/* Gear */}
        <Form.Item
          label="Gear"
          name="gear"
          rules={[{ required: true, message: "Please select gear type" }]}
        >
          <Select placeholder="Select gear type">
            <Option value="Automatic">Automatic</Option>
            <Option value="Manual">Manual</Option>
          </Select>
        </Form.Item>

        {/* Passengers */}
        <Form.Item
          label="Passengers"
          name="passengers"
          rules={[
            { required: true, message: "Please enter number of passengers" },
          ]}
        >
          <InputNumber
            placeholder="Enter number of passengers"
            min={1}
            style={{ width: "100%" }}
          />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create Car
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCarModal;
