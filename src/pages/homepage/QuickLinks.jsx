import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => (
  <div className="card mb-3">
    <div className="card-body">
      <h3 className="card-title">Quick Links</h3>
      <ul className="d-flex">
        <li>
          <Link to="/todayschedule" className="me-2">
            Tasks |
          </Link>
        </li>
        <li>
          <Link to="/admin/courses" className="me-2">
            Tasks Completed |
          </Link>
        </li>
        <li>
          <Link to="/admin/announcements">Competitions</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default QuickLinks;
