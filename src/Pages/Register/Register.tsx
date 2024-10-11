import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Password confirmation check
    if (form.password !== form.passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Register API call
      const response = await ApiService.register(form);

      if (response.error) {
        alert(response.error); // Display error if any
      } else {
        alert("Successfully registered");
        window.location.href = "/signin"; // Redirect to sign-in page
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-300 w-96 mx-auto mt-20">
      <h1 className="text-5xl font-semibold text-black">Rent-a-car</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Please enter your details to register
      </p>
      <form id="register-form" onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg text-black font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full text-black border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your name"
          />
        </div>

        <div className="mt-4">
          <label className="text-lg text-black font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full text-black border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>

        <div className="mt-4">
          <label className="text-lg text-black font-medium">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full text-black border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
          />
        </div>

        <div className="mt-4">
          <label className="text-lg text-black font-medium">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={form.passwordConfirmation}
            onChange={handleChange}
            className="w-full text-black border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Confirm your password"
          />
        </div>

        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-violet-500 text-white text-lg font-bold rounded-xl p-4"
          >
            Register
          </button>
        </div>
      </form>

      {/* Already have an account? */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-gray-500">Already have an account?</p>
        <button
          className="mt-2 text-violet-500 font-medium"
          onClick={() => navigate("/signin")}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
