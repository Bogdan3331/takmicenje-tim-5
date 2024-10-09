import React from "react";
import MoreBtn from "./Buttons/MoreBtn";
import ApiService from "../Shared/api";
import { MenuProps, message } from "antd";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Funkcija za odjavljivanje korisnika
  const handleLogout = async () => {
    try {
      const response = await ApiService.logoutUser(); // API poziv za odjavu
      if (!response.error) {
        localStorage.removeItem("auth_token"); // Brisanje tokena iz lokalne memorije
        message.success("Logged out successfully."); // Poruka o uspješnoj odjavi
        navigate("/"); // Redirekcija na početnu stranicu
      }
    } catch (error) {
      message.error("There was a problem with the logout operation."); // Poruka u slučaju greške
    }
  };

  // Funkcija za kreiranje menija
  const renderMenuItems = () => {
    var menuItems: MenuProps["items"] = [
      {
        icon: <i className="bi bi-person" style={{ fontSize: "1rem", marginRight: "8px" }}></i>, // Ikonica za profil
        label: <p className="text-black hover:text-blue-500">My Profile</p>,
        key: "0",
        onClick: () => {
          navigate("/show-profile"); // Navigacija ka profilu korisnika
        },
      },
      {
        icon: <i className="bi bi-pencil-square" style={{ fontSize: "1rem", marginRight: "8px" }}></i>, // Ikonica za editovanje
        label: <p style={{ margin: "0" }}>Edit</p>,
        key: "1",
        onClick: () => {
          navigate(""); // Navigacija za izmjenu profila (popuni rutu)
        },
      },
      {
        icon: <i className="bi bi-box-arrow-right" style={{ fontSize: "1rem", marginRight: "8px" }}></i>, // Ikonica za odjavu
        label: <p style={{ margin: "0" }}>Log Out</p>,
        key: "2",
        onClick: async () => {
          await handleLogout(); // Pravilno pozivanje funkcije za odjavu
          message.success("You have successfully logged out"); // Poruka nakon odjave
        },
      },
    ];
    return menuItems;
  };

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
          <MoreBtn items={renderMenuItems()} />
        </div>
      </div>
    </header>
  );
};

export default Header;
