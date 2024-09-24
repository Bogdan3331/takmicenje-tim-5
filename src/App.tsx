import PrivateRoute from "./Pages/PrivateRoute";
import Home from "./Pages/Home/MainPage";
import SignInPage from "./Pages/SignIn/SignIn";
import RegisterPage from "./Pages/Register/Register";
import MainPage from "./Pages/Home/MainPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
