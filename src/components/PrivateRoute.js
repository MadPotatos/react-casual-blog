import { useContext } from "react";
import { ThemeContext } from "../ThemeContext.js";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute =() => {
  const {user} = useContext(ThemeContext);
  return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
};

export default PrivateRoute;