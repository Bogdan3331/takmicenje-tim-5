import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";
import PasswordRecovery from "./PasswordRecovery";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await ApiService.signIn(email, password);
      if (response && !response.error) {
        localStorage.setItem("auth_token", response.data.token);
        navigate("/");
      } else {
        setError(response.error || "Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-300 w-96 mx-auto mt-20">
      <h1 className="text-5xl font-semibold text-black">Rent-a-car</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome, Please enter your details
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg text-black font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="w-full text-black border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mt-4">
          <label className="text-lg text-black font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full border-2 text-black border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="rememberMe" />
            <label className="ml-2 font-medium text-base" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <PasswordRecovery />
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-violet-500 text-white text-lg font-bold rounded-xl p-4"
          >
            Log In
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center mt-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="mx-4 text-gray-400">or</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <div className="mt-4 flex flex-col gap-y-4">
        <button
          className="bg-gray-500 text-white text-lg font-bold rounded-xl p-4"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
