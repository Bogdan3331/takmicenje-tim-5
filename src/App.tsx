import PrivateRoute from "./Pages/PrivateRoute";
import SignInPage from "./Pages/SignIn/SignIn";
import RegisterPage from "./Pages/Register/Register";
import MainPage from "./Pages/StartPage/MainPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import User from "./Pages/User/User";

type LayoutWrapperProps = {
  children: React.ReactNode; // Fixing the type of children prop
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/main";

  return (
    <div className="flex w-full h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        {children}
      </div>

      {/* Background image only on login/register pages */}
      {!isMainPage && (
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
          <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
          <div className="w-full absolute h-1/2 bottom-0 bg-white/10 backdrop-blur-lg" />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          path="/"
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
          path="/user-profile "
          element={
            <LayoutWrapper>
              <User />
            </LayoutWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
