import * as React from "react";
import Box from "@mui/material/Box";
import MaterialDrawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";

export default function Drawer({ isOpen, onClose, children, title }) {
  return (
    <div>
      <React.Fragment>
        <MaterialDrawer
          anchor="right"
          open={isOpen}
          onClose={onClose}
          style={{ zIndex: 1250 }}
        >
          <Box sx={{ width: 500, zIndex: 4, height: 500, padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Divider sx={{ mb: 1 }} />
            {children}
          </Box>
        </MaterialDrawer>
      </React.Fragment>
    </div>
  );
}
