import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarDropdowns = ({ linkTo, icon, label, chevron, children }) => {
  const [isOpen, setIsOpen] = useState(() => {
    const savedState = localStorage.getItem(`${label}-isOpen`);
    return savedState ? JSON.parse(savedState) : false;
  });

  const toggleDropdown = (e) => {
    if (linkTo === "#") {
      e.preventDefault(); // Prevent navigation if the link is a placeholder
      const newState = !isOpen;
      setIsOpen(newState);
      localStorage.setItem(`${label}-isOpen`, JSON.stringify(newState));
    }
  };

  useEffect(() => {
    const savedState = localStorage.getItem(`${label}-isOpen`);
    if (savedState) {
      setIsOpen(JSON.parse(savedState));
    }
  }, [label]);

  return (
    <li className={`nav-item ${isOpen ? "open" : ""}`}>
      <NavLink
        to={linkTo === "#" ? "#" : linkTo}
        className={`nav-link d-flex-row ${isOpen ? "active" : ""} ${
          chevron ? "has-children" : ""
        }`}
        onClick={toggleDropdown}
        activeclassname="active"
      >
        <div className="d-flex align-items-center">
          <i className={icon}></i>
          <span>{label}</span>
        </div>
        {chevron && <i className={`${chevron} ms-auto`}></i>}
      </NavLink>
      {children && isOpen && (
        <ul className="nav-content">
          {children.map((child, index) => (
            <li key={index}>
              <NavLink
                to={child.linkTo}
                className="nav-content-link"
                activeclassname="active"
              >
                <i className={child.icon}></i>
                <span>{child.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarDropdowns;
