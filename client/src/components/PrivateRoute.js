import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { isAuth } = useSelector((state) => state.user);
  return isAuth ? <Outlet /> : <Navigate to="/signIn"></Navigate>;
};
export default PrivateRoute;
