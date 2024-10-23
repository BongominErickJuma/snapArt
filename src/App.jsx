import React, { useState } from "react";
import { match } from "path-to-regexp"; // Import the matching function
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/layouts/sidebar/Sidebar";
import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import Login from "./pages/Login/Login";
import Profile from "./pages/profile/Profile";
import Homepage from "./pages/homepage/Homepage";
import SignUp from "./pages/Sign Up/SignUp";
import ProtectedRoute from "./protect/ProtectedRoute";

// Define your valid paths
const validPaths = ["/snapArt/dashboard", "/snapArt/profile"];

// Function to check if the current path is valid, including dynamic segments
const isPathValid = (currentPath) => {
  return validPaths.some((path) => {
    const matcher = match(path, { decode: decodeURIComponent });
    return matcher(currentPath); // Returns true if the path matches
  });
};

const App = () => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleToggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
    if (!isSidebarToggled) {
      setIsSidebarHovered(false);
    }
  };

  // Show sidebar and header only for valid paths
  const showHeaderAndSidebar = isPathValid(currentPath);

  return (
    <div
      className={`${
        isSidebarToggled && !isSidebarHovered ? "toggle-sidebar" : ""
      } ${isSidebarHovered ? "hover-sidebar" : ""}`}
    >
      {showHeaderAndSidebar && (
        <>
          <Header handleToggleSidebar={handleToggleSidebar} />
          <Sidebar />
        </>
      )}

      <div className="min-vh-100 main" id={`${showHeaderAndSidebar && "main"}`}>
        <Routes>
          {/* Public route */}
          <Route exact path="/snapArt/" element={<Login />} />
          <Route path="/snapArt/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/snapArt/dashboard"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/snapArt/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* 404 Route */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
