import React, { useState } from "react";
import { Modal, Input, message } from "antd";

interface ForgotPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

interface ResetPasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: {
    email: string;
    token: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }) => Promise<void>;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState<string>("");

  const handleOk = async () => {
    try {
      await onSubmit(email);
      message.success("Check your email for the reset token.");
      onClose();
    } catch (error) {
      message.error("Failed to send reset email.");
    }
  };

  return (
    <Modal
      title="Forgot Password"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Submit"
      cancelText="Cancel"
    >
      <div>
        <label>Email:</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
    </Modal>
  );
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");

  const handleOk = async () => {
    try {
      await onSubmit({
        email,
        token,
        newPassword,
        newPasswordConfirmation,
      });
      message.success("Password reset successfully.");
      onClose();
    } catch (error) {
      message.error("Failed to reset password.");
    }
  };

  return (
    <Modal
      title="Reset Password"
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
      cancelText="Cancel"
    >
      <div>
        <div>
          <label>Email:</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Token:</label>
          <Input value={token} onChange={(e) => setToken(e.target.value)} />
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

// Main component to handle both modals
const PasswordRecovery: React.FC = () => {
  const [forgotVisible, setForgotVisible] = useState<boolean>(true);
  const [resetVisible, setResetVisible] = useState<boolean>(false);

  const forgetPassword = async (email: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === "test@example.com") {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };

  const resetPassword = async (values: {
    email: string;
    token: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }) => {
    // Call the API for reset password
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (values.token === "12345") {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };

  return (
    <>
      <ForgotPasswordModal
        visible={forgotVisible}
        onClose={() => setForgotVisible(false)}
        onSubmit={async (email) => {
          try {
            await forgetPassword(email);
            setForgotVisible(false);
            setResetVisible(true);
          } catch (error) {
            message.error("Email not found.");
          }
        }}
      />
      <ResetPasswordModal
        visible={resetVisible}
        onClose={() => setResetVisible(false)}
        onSubmit={resetPassword}
      />
    </>
  );
};

export default PasswordRecovery;
