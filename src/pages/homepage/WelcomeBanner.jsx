import React, { useEffect } from "react";
import PureCounter from "@srexi/purecounterjs";

const WelcomeBanner = ({ stats }) => {
  useEffect(() => {
    new PureCounter(); // Initialize PureCounter
  }, []);

  return (
    <div className="welcome-banner mb-3">
      <h1>Welcome, {stats.name}!</h1>
      <p>Here’s a quick overview:</p>
      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <i className="bi bi-people me-2"></i>
              Total Users:{" "}
              <span
                data-purecounter-start="0"
                data-purecounter-end={stats.users}
                data-purecounter-duration="1"
                className="purecounter"
              ></span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <i className="bi bi-person-workspace me-2"></i>
              Tasks:{" "}
              <span
                data-purecounter-start="0"
                data-purecounter-end={stats.tasks}
                data-purecounter-duration="1"
                className="purecounter"
              ></span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <i className="bi bi-journals me-2"></i>
              Completed Tasks:{" "}
              <span
                data-purecounter-start="0"
                data-purecounter-end={stats.completed}
                data-purecounter-duration="1"
                className="purecounter"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
