import React from "react";
import "./sidebar.css";
import SidebarDropdowns from "./SidebarDropdowns";
import dropdown from "./dropdown";

const Sidebar = () => {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <div className="sidebar-logo mb-2">
          <a href="#" className="lg-screen-logo">
            <span className="d-lg-block h4 text-white">
              sNap<span className="designed">Earn</span>
            </span>
          </a>
        </div>
        <ul className="sidebar-nav" id="sidebar-nav">
          {dropdown.map((item, index) => (
            <SidebarDropdowns
              key={index}
              linkTo={item.linkTo}
              icon={item.icon}
              label={item.label}
              chevron={item.chevron}
              children={item.children}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
