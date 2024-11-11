// DashboardLayout.js
import React, { useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const HeaderSidebar = ({ children }) => {
  const [isSidebarToggled, setIsSidebarToggled] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarToggled(!isSidebarToggled);
    if (!isSidebarToggled) {
      setIsSidebarHovered(false);
    }
  };

  return (
    <div
      className={`${
        isSidebarToggled && !isSidebarHovered ? "toggle-sidebar" : ""
      }`}
    >
      <Header handleToggleSidebar={handleToggleSidebar} />
      <Sidebar />
      <div className="min-vh-100 main" id="main">
        {children}
      </div>
    </div>
  );
};

export default HeaderSidebar;
