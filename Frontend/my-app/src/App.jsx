import "./App.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import AuthSuccess from "./pages/Auth/Success";
import { useEffect } from "react";
import axiosInstance from "./utils/axiosinstance";
import { useState } from "react";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { createContext } from "react";
import Dashboard from "Layouts/Dashboard";
import Homepage from "pages/HomePage/Homepage";
import AuthorPage from "pages/AuthorPage/AuthorPage";
import EscalationPage from "pages/EscalationPage/EscalationPage";
import UserPage from "pages/UserPage/UserPage";
export const loggedInContext = createContext();

function App() {
  const [auth, setIsLoggedIn] = useState({
    isLoggedIn: false,
    currentUser: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      isTokenValid();
    } else {
      setIsLoggedIn({
        isLoggedIn: false,
        auth: null,
      });
      setIsLoading(false);
    }
  }, []);

  const isTokenValid = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_ServerUrl}/validateToken`
      );
      console.log("valid login in app js", response.data);

      if (response.data.success) {
        setIsLoggedIn({
          isLoggedIn: true,
          currentUser: response.data.user,
        });
        console.log("logged user", response.data.user);
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
  console.log("isLoggedIn", auth.isLoggedIn);

  const withLayout = (component) => {
    const Compenent = component;
    return (
      <Dashboard>
        <Compenent />
      </Dashboard>
    );
  };
  return (
    <loggedInContext.Provider value={{ auth, setIsLoggedIn }}>
      <Routes>
        {auth.isLoggedIn ? (
          <>
            <Route path="/" element={withLayout(Homepage)} />
            <Route path="/authors" element={withLayout(AuthorPage)} />
            <Route path="/escalation" element={withLayout(EscalationPage)} />
            <Route path="/users" element={withLayout(UserPage)} />
          </>
        ) : (
          <>
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route path="/" element={<Login />} />
          </>
        )}
      </Routes>
    </loggedInContext.Provider>
  );
}

export default App;
