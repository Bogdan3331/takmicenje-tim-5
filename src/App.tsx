import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Pages/PrivateRoute";
import Home from "./Pages/Home/Home";
import SignInPage from "./Pages/SignIn/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
