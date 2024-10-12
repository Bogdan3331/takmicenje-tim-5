// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./Pages/PrivateRoute";
import SignInPage from "./Pages/SignIn/SignIn";
import RegisterPage from "./Pages/Register/Register";
import MainPage from "./Pages/MainPage/MainPage";
import VehicleList from "./Pages/CarsList/VehicleList";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UserPage from "./Pages/User/User";
import Header from "./Components/Header";
import Footer from "./Pages/Footer/Footer";
import ApiService from "./Shared/api";
import CarDetails from "./Pages/CarsList/CarDetails";
import AboutUs from "./Pages/AboutUs/AboutUs"; // Import About Us page
import "bootstrap-icons/font/bootstrap-icons.css";
import AdminPage from "./Pages/Admin/AdminPage";

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/main";
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header component displayed on all pages except for login and register */}
      {!isAuthPage && <Header />}

      <div
        className={`flex-grow ${
          isAuthPage || isMainPage ? "flex items-center justify-center" : ""
        }`}
      >
        <div
          className={`w-full ${
            isAuthPage ? "lg:w-full" : "lg:w-4/4"
          } flex items-center justify-center`}
        >
          {children}
        </div>
      </div>

      {/* Footer component displayed on all pages except for login and register */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  ApiService.init();
  ApiService.setHeader();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWrapper>
              <MainPage />
            </LayoutWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <LayoutWrapper>
              <RegisterPage />
            </LayoutWrapper>
          }
        />
        <Route
          path="/signin"
          element={
            <LayoutWrapper>
              <SignInPage />
            </LayoutWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={
                <LayoutWrapper>
                  <Dashboard />
                </LayoutWrapper>
              }
            />
          }
        />
        <Route
          path="/show-profile"
          element={
            <PrivateRoute
              element={
                <LayoutWrapper>
                  <UserPage />
                </LayoutWrapper>
              }
            />
          }
        />
        <Route
          path="/vehicle-list"
          element={
            <LayoutWrapper>
              <VehicleList />
            </LayoutWrapper>
          }
        />
        <Route
          path="/vehicle-details/:id"
          element={
            <LayoutWrapper>
              <CarDetails />
            </LayoutWrapper>
          }
        />
        <Route
          path="/about-us" // About Us route
          element={
            <LayoutWrapper>
              <AboutUs />
            </LayoutWrapper>
          }
        />
        <Route
          path="/admin-page"
          element={
            <PrivateRoute
              element={
                <LayoutWrapper>
                  <AdminPage />
                </LayoutWrapper>
              }
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
