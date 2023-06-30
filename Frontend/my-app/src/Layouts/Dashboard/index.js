import { useState } from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";

import Typography from "@mui/material/Typography";

import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import MainListItems from "./MainListItems";
import List from "@mui/material/List";
import Container from "@mui/material/Container";

import AppBar from "./AppBar";
import Drawer from "./Drawer";

import { loggedInContext } from "../../App";

const Dashboard = ({ children }) => {
  const { auth, setIsLoggedIn } = useContext(loggedInContext);
  let navigate = useNavigate();
  {
    console.log("context", auth);
  }
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuopen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logOutHandler = () => {
    setIsLoggedIn({
      isLoggedIn: false,
      currentUser: null,
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            WorkFlow+
          </Typography>
          <div>
            <IconButton
              style={{ marginRight: "20px" }}
              color="inherit"
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={menuopen}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <BadgeIcon sx={{ color: "gray", mr: 2 }} />
                  <Typography>{auth.currentUser.name}</Typography>
                </Box>
              </MenuItem>
              <MenuItem>
                <EmailIcon sx={{ color: "gray", mr: 2 }} />{" "}
                {auth.currentUser.email}
              </MenuItem>
              <MenuItem>
                <PhoneIcon sx={{ color: "gray", mr: 2 }} />{" "}
                {auth.currentUser.phoneNumber}
              </MenuItem>
              <MenuItem>
                <PersonIcon sx={{ color: "gray", mr: 2 }} />{" "}
                {auth.currentUser.role}
              </MenuItem>
              <MenuItem onClick={logOutHandler}>
                <LogoutIcon sx={{ color: "gray", mr: 2 }} /> logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: [1],
          }}
        >
          {open && (
            <Typography
              sx={{
                marginLeft: "auto",
                color: "#2076D2",
                fontWeight: "Bold",
                letterSpacing: "2px",
              }}
              variant="h5"
            >
              ABC.com
            </Typography>
          )}
          <IconButton sx={{ marginLeft: "auto" }} onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <MainListItems></MainListItems>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
          {/* <Routes>
            <Route path="/" element={<Homepage />}></Route>
          </Routes> */}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
