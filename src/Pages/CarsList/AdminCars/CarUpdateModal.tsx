import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button } from "antd";
import ApiService from "../../../Shared/api"; // Assuming this is where you handle API calls

const { Option } = Select;

interface CarUpdateModalProps {
  carId: number;
  visible: boolean;
  onCancel: () => void;
  onUpdateSuccess: () => void;
}

const CarUpdateModal: React.FC<CarUpdateModalProps> = ({
  carId,
  visible,
  onCancel,
  onUpdateSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (carId && visible) {
      fetchCarData();
    }
  }, [carId, visible]);

  const fetchCarData = async () => {
    try {
      const response = await ApiService.getVehicleData(carId);
      const carData = response.data.data;
      form.setFieldsValue({
        image: carData.image,
        fuelType: carData.fuelType,
        price: carData.price,
        description: carData.description,
        brand: carData.brand,
        type: carData.type,
      });
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  const handleUpdate = async (values: any) => {
    setLoading(true);
    try {
      await ApiService.updateCar(carId, values); // Call update API
      console.log(values);
      setLoading(false);
      onUpdateSuccess(); // Notify parent of successful update
      onCancel(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating car:", error);
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Update Car Information"
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} onFinish={handleUpdate} layout="vertical">
        {/* Reformat Image for it to work */}
        {/* <Form.Item
          label="Image URL"
          name="image"
          rules={[{ required: true, message: "Please enter image URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item> */}

        {/* Fuel Type */}
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

        {/* Submit button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update Car
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CarUpdateModal;
