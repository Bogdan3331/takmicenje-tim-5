// src/App.tsx
import React from "react";
import PrivateRoute from "./Pages/PrivateRoute";
import SignInPage from "./Pages/SignIn/SignIn";
import RegisterPage from "./Pages/Register/Register";
import MainPage from "./Pages/StartPage/MainPage";
import VehicleList from "./Pages/CarsList/VehicleList";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./Components/Header";
import Footer from "./Pages/Footer/Footer";
import UserPage from "./Pages/User/User";

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
          path="/main"
          element={
            <LayoutWrapper>
              <MainPage />
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
          path="/profile"
          element={
            <LayoutWrapper>
              <UserPage />
            </LayoutWrapper>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
