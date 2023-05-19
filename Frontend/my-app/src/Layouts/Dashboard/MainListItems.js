import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import { Link } from "react-router-dom";
import { userContext } from "App";
import { useContext } from "react";

import "./dashboard.css";

const MainListItems = () => {
  const { currentUser, setCurrentUser } = useContext(userContext);

  return (
    <React.Fragment>
      {currentUser == "admin" && (
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <Link to="/admin" className="link-style">
            <ListItemText primary="Admin Dashboard" />
          </Link>
        </ListItemButton>
      )}

      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <Link to="/" className="link-style">
          <ListItemText primary="Tasks" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LaptopChromebookIcon />
        </ListItemIcon>
        <Link to="/author" className="link-style">
          <ListItemText primary="Author" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ContactEmergencyIcon />
        </ListItemIcon>
        <Link to="/escalation" className="link-style">
          <ListItemText primary="Escalation" />
        </Link>
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;
