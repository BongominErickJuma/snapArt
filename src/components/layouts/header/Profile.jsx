import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  // const navigate = useNavigate();

  // const handleLogOut = () => {
  //   navigate("/snapArt/");
  // };

  return (
    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
      <li className="dropdown-header">
        <h6>Username</h6>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>

      <li>
        <Link
          className="dropdown-item d-flex align-items-center"
          to={"/snapArt/profile"}
        >
          <i className="bi bi-person"></i>
          <span>My Profile</span>
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>

      <li>
        <Link
          className="dropdown-item d-flex align-items-center"
          // onClick={handleLogOut}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Sign Out</span>
        </Link>
      </li>
    </ul>
  );
};

export default Profile;
