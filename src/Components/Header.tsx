import React from "react";
import MoreBtn from "./Buttons/MoreBtn";
import ApiService from "../Shared/api";
import { MenuProps, message } from "antd";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await ApiService.logoutUser();
      if (!response.error) {
        localStorage.removeItem("auth_token");
        message.success("Logged out successfully.");
        navigate("/");
      }
    } catch (error) {
      message.error("There was a problem with the logout operation.");
    }
  };

  const renderMenuItems = () => {
    var menuItems: MenuProps["items"] = [
      {
        label: <p className="text-white hover:text-blue-500">My Profile</p>,
        key: "0",
        onClick: () => {
          navigate("/show-profile");
        },
      },
      {
        icon: (
          <i className="bi bi-pencil-square" style={{ fontSize: "1rem" }}></i>
        ),
        label: <p style={{ margin: "0" }}>Izmjeni</p>,
        key: "1",
        onClick: () => {
          navigate(``);
        },
      },
      {
        icon: <i className="bi bi-trash3" style={{ fontSize: "1rem" }}></i>,
        label: <p style={{ margin: "0" }}>Log Out</p>,
        key: "2",
        onClick: () => {
          handleLogout();
          message.success("U have successfully logged out");
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
