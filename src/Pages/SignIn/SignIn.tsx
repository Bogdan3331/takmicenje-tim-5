import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../Shared/api";

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

    try {
      const response = await ApiService.signIn(email, password);

      if (response.error) {
        setError(response.error);
      } else {
        localStorage.setItem("auth_token", response.data.token);
        window.location.href = "/";
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray">
      <h1 className="text-5xl font-semibold">Rent-a-car</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Dobrodosli, Molim vas unesite svoje podatke
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg font-medium">Email:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Unesite Vas email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label className="text-lg font-medium">Sifra:</label>
          <input
            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Unesite Vasu sifru"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="mt-8 flex justify-between items-center">
          <div>
            <input type="checkbox" id="Zapamti" />
            <label className="ml-2 font-medium text-base" htmlFor="Zapamti">
              Zapamti me
            </label>
          </div>
          <button
            type="button"
            className="font-medium text-base text-violet-500"
          >
            Zaboravili ste sifru
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="bg-violet-500 text-white text-lg font-bold rounded-xl p-4"
          >
            Sign In
          </button>
        </div>

        <div className="flex items-center justify-center mt-4">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="mx-4 text-gray-400">or</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <div className="mt-4 flex flex-col gap-y-4">
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="bg-gray-500 text-white text-lg font-bold rounded-xl p-4"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
