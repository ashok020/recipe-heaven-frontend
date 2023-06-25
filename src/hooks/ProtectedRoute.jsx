import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import checkAuthorization from "../utils/auth";

function ProtectedRoute() {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function checkAuth() {
      const auth = await checkAuthorization();
      setAuthenticated(false);
    }
    if (token) checkAuth();
  }, []);

  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} /> // replace will replace navigation history
  );
}

export default ProtectedRoute;
