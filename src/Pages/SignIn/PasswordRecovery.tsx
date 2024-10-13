import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import ApiService from "../../Shared/api"; // Adjust the import path as needed

const PasswordRecovery: React.FC = () => {
  const [visibleEmailModal, setVisibleEmailModal] = useState(false);
  const [visibleResetModal, setVisibleResetModal] = useState(false);
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  // Open the email modal
  const showEmailModal = () => {
    setVisibleEmailModal(true);
  };

  // Handle email submission without promises
  const handleEmailSubmit = () => {
    ApiService.forgetPassword(email);
    console.log(email);
    setVisibleEmailModal(false);
    setVisibleResetModal(true); // Show the second modal after calling the API
  };

  // Handle password reset submission using async/await
  const handleResetSubmit = async () => {
    const values = {
      email: resetEmail,
      token: token,
      newPassword: newPassword,
      newPassword_confirmation: newPasswordConfirmation,
    };
    try {
      const response = await ApiService.resetPassword(values);
      console.log(response);
      setVisibleResetModal(false);
      // Clear inputs if needed
      setResetEmail("");
      setToken("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <>
      <Button type="primary" onClick={showEmailModal}>
        Forgot Password?
      </Button>

      {/* Email Modal */}
      <Modal
        title="Reset Password"
        open={visibleEmailModal}
        onCancel={() => setVisibleEmailModal(false)}
        footer={null}
      >
        <Input
          placeholder="Enter your email"
          value={email}
          type="required"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleEmailSubmit}
          style={{ marginTop: 16 }}
        >
          Submit
        </Button>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        title="Set New Password"
        open={visibleResetModal}
        onCancel={() => setVisibleResetModal(false)}
        footer={null}
      >
        <Input
          placeholder="Enter your email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          style={{ marginTop: 16 }}
        />
        <Input
          placeholder="Enter the token from your email"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Input.Password
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ marginTop: 16 }}
        />
        <Input.Password
          placeholder="Confirm New Password"
          value={newPasswordConfirmation}
          onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          style={{ marginTop: 16 }}
        />
        <Button
          type="primary"
          onClick={handleResetSubmit}
          style={{ marginTop: 16 }}
        >
          Reset Password
        </Button>
      </Modal>
    </>
  );
};

export default PasswordRecovery;
