import React from "react"
import { Outlet , Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"


const PrivateRoute = ({ path, element: Element }) => {
  const { currentUser } = useAuth(); 

  return currentUser ? (
    <Outlet/>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;