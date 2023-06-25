import React, { createContext, useState, useEffect } from "react";
import API from "./utils/api";
export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    null || JSON.parse(localStorage.getItem("user"))
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    window.location.reload();
  }

  async function getUser(token) {
    try {
      setIsLoading(true);
      const user = await API.get("/user");
      setIsLoading(false);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  }

  async function handleLogin(token) {
    console.error("token", token);
    localStorage.setItem("token", token);
    setIsAuthenticated(false);
    setTimeout(async () => {
      getUser(token);
    }, 100);
    window.location.reload();
  }

  async function handleUpdateUser(u) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(u);
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        handleLogin,
        handleLogout,
        handleUpdateUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};