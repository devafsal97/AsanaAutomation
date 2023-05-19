import "./TopBar.css";
import accountIcon from "../../assets/account.png";
import { useContext, useState } from "react";
import { loggedInContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const TopBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(loggedInContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate();

  const logouthandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className="top-bar">
        <button onClick={logouthandler}>logout</button>
        <img
          className="account-img"
          onClick={handleOpen}
          src={accountIcon}
          alt="account icon"
        ></img>
        <Menu
          id="basic-menu"
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default TopBar;
