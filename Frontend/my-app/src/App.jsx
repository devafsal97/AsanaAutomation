import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import AdminRoute from "./routes/adminroute/AdminRoute";
import AuthSuccess from "./pages/Auth/Success";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosinstance";
import { useState } from "react";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createContext } from "react";
export const loggedInContext = createContext();
export const userContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      isTokenValid();
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, []);

  const isTokenValid = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8000/validateToken"
      );

      if (response.data.success) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  console.log("isLoggedIn", isLoggedIn);
  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      <loggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<AdminRoute />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/auth/success" element={<AuthSuccess />} />
        </Routes>
      </loggedInContext.Provider>
    </userContext.Provider>
  );
}

export default App;
