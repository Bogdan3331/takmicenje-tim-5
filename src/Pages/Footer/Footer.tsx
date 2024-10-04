import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-10 shadow-lg rounded-3xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left Column - Info */}
        <div>
          <h2 className="text-red-500 text-xl font-bold">RENTIFY RENT A CAR</h2>
          <p className="mt-4">
            Our desire to contribute maximally to the transportation sector has defined us as:
          </p>
          <p>
            The most flexible rent-a-car agency in Montenegro. We have rules, but we are always ready to meet special needs.
          </p>
          <p>
            Vehicle delivery and pickup are available at any location within Montenegro, as well as from neighboring countries.
          </p>
        </div>

        {/* Middle Column - Links */}
        <div className="flex flex-col items-center">
          <h2 className="text-red-500 text-xl font-bold">Quick Links</h2>
          <div className="mt-4 space-y-2 text-center">
            <button
              className="block text-blue-400 hover:underline"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="block text-blue-400 hover:underline"
              onClick={() => navigate("/vehicle-list")}
            >
              Cars
            </button>
            <button
              className="block text-blue-400 hover:underline"
              onClick={() => navigate("/profile")}
            >
              My Profile
            </button>
            <button
              className="block text-blue-400 hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="block text-blue-400 hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>

        {/* Right Column - Contact */}
        <div>
          <h2 className="text-red-500 text-xl font-bold">Contact</h2>
          <ul className="mt-4 space-y-2">
            <li>📍 Podgorica, Sarajevo, Tirana, Ljubljana, Skopje</li>
            <li>📞 +38269810805</li>
            <li>💬 WhatsApp | Telegram | Viber</li>
            <li>✉️ info@planetrentacar.me</li>
            <li>🕒 07:00 - 21:00 | Every Day</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
