import PrivateRoute from "./Pages/PrivateRoute";
import SignInPage from "./Pages/SignIn/SignIn";
import RegisterPage from "./Pages/Register/Register";
import MainPage from "./Pages/StartPage/MainPage";
import Cars from "./Pages/CarsList/Cars"
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import User from "./Pages/User/User";
import Header from "./Pages/Header";

type LayoutWrapperProps = {
  children: React.ReactNode; 
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const location = useLocation();
  const isMainPage = location.pathname === "/main";
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/register"; 

  return (
    <div className="flex flex-col w-full h-screen bg-gray-900 text-white"> 
      {!isAuthPage && <Header />} 
      <div className={`flex w-full h-full ${isAuthPage || isMainPage ? 'items-center justify-center' : ''}`}>
        {/* Za main stranicu ceo sadržaj prikazujemo preko cele širine */}
        <div className={`w-full ${isAuthPage ? 'lg:w-full' : isMainPage ? 'lg:w-full' : 'lg:w-1/2'} flex items-center justify-center`}>
          {children}
        </div>

        {/* Dodatni elementi koji se prikazuju osim main i auth stranica */}
        {!isMainPage && !isAuthPage && (
          <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
            <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce" />
            <div className="w-full absolute h-1/2 bottom-0 bg-white/10 backdrop-blur-lg" />
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/register" element={<LayoutWrapper><RegisterPage /></LayoutWrapper>} />
        <Route path="/signin" element={<LayoutWrapper><SignInPage /></LayoutWrapper>} />
        <Route path="/main" element={<LayoutWrapper><MainPage /></LayoutWrapper>} />
        <Route path="/dashboard" element={<PrivateRoute element={<LayoutWrapper><Dashboard /></LayoutWrapper>} />} />
        <Route path="/user-profile" element={<LayoutWrapper><User /></LayoutWrapper>} />
        <Route path="/cars" element={<LayoutWrapper><Cars /></LayoutWrapper>} /> {/* Dodana ruta za Cars */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
