import React, { useContext, useEffect, useState } from "react";
import "./homepage.css";

import WelcomeBanner from "./WelcomeBanner";
import QuickLinks from "./QuickLinks";

const Homepage = () => {
  const stats = {
    name: "Username",
    users: 599,
    tasks: 5,
    completed: 3,
  };
  useEffect(() => {
    document.title = "Snap Art | Dashboard";
  }, []);
  return (
    <div className="admin-dashboard">
      <div className="row gx-2">
        <WelcomeBanner stats={stats} />
        <div className="col-lg-8">
          <QuickLinks />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
