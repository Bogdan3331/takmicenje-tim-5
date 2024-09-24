import React, { ReactElement } from "react";
import { BrowserRouterProps, Navigate } from "react-router-dom";

interface PrivateRouteProps extends BrowserRouterProps {
  element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
  const authToken = localStorage.getItem("auth_token");

  return authToken ? Component : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
