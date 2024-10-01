import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Assets/rent-a-car-logo.svg"; // Putanja do vaše slike

function Header() {
  return (
    <header className="text-black p-4 fixed top-0 left-0 right-0 w-full flex justify-between items-center shadow-lg z-30">
      {/* Zamena teksta sa slikom, koja vodi na /main */}
      <Link to="/main">
        <img
          src=".\Assets\rent-a-car-logo.svg"
          alt="Rent-a-car Logo"
          className="h-12 w-auto ml-20"
        />
      </Link>

      {/* Navigacioni linkovi sa marginom */}
      <nav className="flex space-x-12 mr-20">
        <Link to="/" className="hover:text-gray-500">
          Home
        </Link>
        <a href="#" className="hover:text-gray-500">
          About
        </a>
        <a href="/user-profile" className="hover:text-gray-500">
          Profile
        </a>
        {/* FIXME: Ja bih odje stavio sliku covjeka ciji je acc ili deafult user */}
      </nav>
    </header>
  );
}

export default Header;
