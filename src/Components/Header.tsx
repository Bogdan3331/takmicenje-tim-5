import React from "react";
import MoreBtn from "./Buttons/MoreBtn";
import ApiService from "../Shared/api";
import { MenuProps, message } from "antd";

const Header: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await ApiService.logoutUser();
      if (!response.error) {
        localStorage.removeItem("auth_token");
        message.success("Logged out successfully.");
        window.location.href = "/";
      }
    } catch (error) {
      message.error("There was a problem with the logout operation.");
    }
  };

  const renderMenuItems = (): MenuProps["items"] => {
    const items: MenuProps["items"] = [
      {
        label: (
          <a
            href="/show-profile"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            My Profile
          </a>
        ),
        key: "0",
      },
      {
        label: (
          <span
            onClick={handleLogout}
            style={{ color: "inherit", cursor: "pointer" }}
          >
            Log Out
          </span>
        ),
        key: "1",
      },
      {
        label: (
          <a
            href="/admin-page"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Admin Page
          </a>
        ),
        key: "2",
      },
    ];

    return items;
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
          <a
            href="/about-us"
            className="hidden lg:inline-block text-white hover:text-blue-500"
          >
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
