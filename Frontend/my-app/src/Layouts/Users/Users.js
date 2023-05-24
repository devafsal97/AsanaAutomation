import UsersTable from "./UsersTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import UserForm from "./UserForm";
import { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import axiosInstance from "utils/axiosinstance";
import Toast from "components/Toast/Toast";
import { loggedInContext } from "App";

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [open, setToastOpen] = useState(false);
  const [message, setToastMessage] = useState("");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (user) setUser(null);
  };

  const onClickEditUser = (user) => {
    setUser(user);
    toggleDrawer();
  };

  const toastCloseHandler = () => {
    setToastOpen(false);
  };

  const updatedUserList = (data) => {
    return user.map((user) => {
      if (user.id === data.id) {
        return {
          ...data,
        };
      }
      return user;
    });
  };

  const addUserHandler = async (data) => {
    if (user) {
      const response = await axiosInstance.put(
        `http://localhost:8000/users/${user.id}`,
        data
      );
      if (response.data.success) {
        setToastMessage("user updated successfully");
        setToastOpen(true);
      }
    } else {
      const response = await axiosInstance.post(
        "http://localhost:8000/users/",
        data
      );
      if (response.data.success) {
        setToastMessage("user added successfully");
        setToastOpen(true);
      }
      console.log("response", response);
    }
  };

  return (
    <>
      <Toast
        open={open}
        closeHandler={toastCloseHandler}
        message={message}
        severity="success"
      ></Toast>
      <UserForm
        isOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        user={user}
        addUserHandler={addUserHandler}
      />
      <Box
        sx={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}
      >
        <Button
          onClick={toggleDrawer}
          variant="contained"
          endIcon={<PersonAddAlt1Icon />}
        >
          Add User
        </Button>
      </Box>
      <UsersTable onClickEdit={onClickEditUser} />;
    </>
  );
};
export default Users;
