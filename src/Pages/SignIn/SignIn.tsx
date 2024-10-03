import React from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/main");  
  };

  return (
    <div className="bg-white px-20 py-20 rounded-3xl border-2 border-gray-300"> 
      <h1 className="text-5xl font-semibold text-black"> 
        Rent-a-car
      </h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome, Please enter your details
      </p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Email:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="rememberMe" />
            <label className="ml-2 font-medium text-base" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <button
            className="font-medium text-base text-violet-500"
            onClick={() => navigate("/forget-password")}
          >
            Forgot your password?
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            className="bg-violet-500 text-white text-lg font-bold rounded-xl p-4"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
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
    </div>
  );
}
