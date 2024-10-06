import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-6 px-10">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-500">Rentify</span>
        </div>

        <nav className="flex space-x-8">
          <a href="/" className="text-white hover:text-blue-500">
            Home
          </a>
          <a href="/vehicle-list" className="text-white hover:text-blue-500">
            Cars
          </a>
          <a href="/dashboard" className="text-white hover:text-blue-500">
            Reservations
          </a>
          <a href="/about-us" className="text-white hover:text-blue-500">
            About Us
          </a>
        </nav>

        <div>
          <a href={"/show-profile"} className="text-white hover:text-blue-500">
            My Profile
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
