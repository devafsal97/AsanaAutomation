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
      <ListItemButton component={NavLink} to="/escalation">
        <ListItemIcon>
          <ContactEmergencyIcon />
        </ListItemIcon>
        <ListItemText primary="Escalation" />
      </ListItemButton>
      <ListItemButton component={NavLink} to="/users">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </div>
  );
};

export default MainListItems;
