import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import { NavLink, Link } from "react-router-dom";

import "./dashboard.css";

const MainListItems = () => {
  return (
    <div className="main-menu">
      <ListItemButton component={NavLink} to="/">
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>

        <ListItemText primary="Tasks" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/authors">
        <ListItemIcon>
          <LaptopChromebookIcon />
        </ListItemIcon>
        <ListItemText primary="Author" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ContactEmergencyIcon />
        </ListItemIcon>
        <Link to="/escalation" className="link-style">
          <ListItemText primary="Escalation" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <Link to="/users" className="link-style">
          <ListItemText primary="Users" />
        </Link>
      </ListItemButton>
    </div>
  );
};

export default MainListItems;
