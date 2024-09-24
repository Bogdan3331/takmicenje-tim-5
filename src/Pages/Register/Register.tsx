import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
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
    <div className="bg-white px-20 py-20 rounded-3xl border-2 border-gray">
      <h1 className="text-5xl font-semibold">Register</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Enter your details to sign up
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg font-medium" htmlFor="name">
            First Name:
          </label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            placeholder="Enter your first name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label
            className="text-lg font-medium"
            htmlFor="password_confirmation"
          >
            Confirm Password:
          </label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent"
            placeholder="Confirm your password"
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
          />
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-violet-500 text-white text-lg font-bold rounded-xl p-3"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-500">Already have an account?</p>
        <button
          onClick={() => navigate("/")}
          className="text-violet-500 font-medium"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
