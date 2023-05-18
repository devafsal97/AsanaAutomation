import React, { useState } from "react";
import "./SideBar.css";
import projectIcon from "../../assets/projects.png";
import authroIcon from "../../assets/author.png";
import emergencyContacts from "../../assets/emergencyContacts.png";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [showProjects, setShowProjects] = useState(false);

  return (
    <div className="sidebar">
      <div className="head">
        <Link className="sidebar-link" to="/">
          <h3 className="sidebar-h3">Auki</h3>
        </Link>
      </div>
      <div>
        <ul>
          <li>
            <div className="sidebar-items">
              <div
                className={`sidebarbar-img-link`}
                onClick={() => setShowProjects(!showProjects)}
              >
                <img
                  className="sidebar-icon"
                  src={projectIcon}
                  alt="projectIcon"
                ></img>
                <Link className="sidebar-link" to="/admin-dashboard">
                  <div>Admin Dashboard</div>
                </Link>
              </div>
            </div>
            <div className="sidebar-items">
              <div
                className={`sidebarbar-img-link`}
                onClick={() => setShowProjects(!showProjects)}
              >
                <img
                  className="sidebar-icon"
                  src={projectIcon}
                  alt="projectIcon"
                ></img>
                <Link className="sidebar-link" to="/">
                  <div>Tasks</div>
                </Link>
              </div>
            </div>
          </li>
          <li>
            <div className="sidebarbar-img-link">
              <img
                className="sidebar-icon"
                src={authroIcon}
                alt="projectIcon"
              ></img>
              <Link className="sidebar-link" to="/author">
                <div>Author</div>
              </Link>
            </div>
          </li>
          <li>
            <div className="sidebarbar-img-link">
              <img
                className="sidebar-icon"
                src={emergencyContacts}
                alt="projectIcon"
              ></img>
              <Link className="sidebar-link" to="/escalation-process">
                <div>Escalation Process</div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
