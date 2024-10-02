import PrivateRoute from "./Pages/PrivateRoute";
import SignInPage from "./Pages/SignIn/SignIn";
import RegisterPage from "./Pages/Register/Register";
import MainPage from "./Pages/StartPage/MainPage";
import VehicleList from "./Pages/CarsList/VehicleList";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import User from "./Pages/User/User";
import Header from "./Components/Header";

// LayoutWrapper ostaje isti, sa stilovima koji rade
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/main";
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/register";

  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 text-white">
      {/* Header komponenta se prikazuje na svim stranicama osim za prijavu i registraciju */}
      {!isAuthPage && <Header />}

      <div
        className={`flex w-full h-full ${
          isAuthPage || isMainPage ? "items-center justify-center" : ""
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
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
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
          path="/user-profile"
          element={
            <LayoutWrapper>
              <User />
            </LayoutWrapper>
          }
        />
        <Route
          path="/VehicleList"
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
