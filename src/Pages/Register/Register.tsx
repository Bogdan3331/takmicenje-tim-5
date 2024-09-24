import React, { useState } from "react";
import "./Register.css";
import ApiService from "../../Shared/api";

interface RegisterForm {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await ApiService.register({
        device: "WEB_BROWSER",
        ...form,
      });

      if (response.error) {
        alert(response.error);
        return;
      } else {
        alert("Successfully registered");
        window.location.href = "/signin";
      }
    } catch (error) {
      console.error(error);

      alert("An error occurred while registering " + JSON.stringify(error));
    }
  };

  return (
    <div className="register-container">
      <h1>Register </h1>
      <form id="register-form" onSubmit={handleSubmit}>
        {Object.entries({
          name: "Name:",
          surname: "Surname:",
          email: "Email:",
          username: "Username:",
          password: "Password:",
          password_confirmation: "Confirm Password:",
        }).map(([key, label]) => (
          <div key={key}>
            <label htmlFor={key}>{label}</label>
            <input
              type={
                key === "password" || key === "password_confirmation"
                  ? "password"
                  : "text"
              }
              id={key}
              name={key}
              value={(form as any)[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
