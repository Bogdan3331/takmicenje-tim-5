import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-6 px-10">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-blue-500">Rent A Car</span>
        </div>

        <nav className="flex space-x-8">
          <a href="/" className="text-white hover:text-blue-500">
            Početna
          </a>
          <a href="Vehiclelist" className="text-white hover:text-blue-500">
            Vozila
          </a>
          <a href="/dashboard" className="text-white hover:text-blue-500">
            Rezervacije
          </a>
          <a href="#" className="text-white hover:text-blue-500">
            Kontakt
          </a>
        </nav>

        <div>
          <a href="/user-profile" className="text-white hover:text-blue-500">
            Moj Profil
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
