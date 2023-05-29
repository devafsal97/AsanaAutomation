import * as React from "react";
import AuthorForm from "./AuthorForm";

import AuthorTable from "./AuthorTable";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import axiosInstance from "utils/axiosinstance";
import Toast from "components/Toast/Toast";
import { loggedInContext } from "App";

const Authors = () => {
  const { auth, setIsLoggedIn } = useContext(loggedInContext);
  const [author, setAuthor] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [open, setToastOpen] = useState(false);
  const [message, setToastMessage] = useState("");
  const [buttonVisibilty, setButtonVisibilty] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    getAuthors();
  }, []);

  const onClickDeleteHandler = (id) => {
    const updatedArray = authors.filter((item) => item.id !== id);
    setAuthors(updatedArray);
    setToastMessage("author deleted successfully");
    setSeverity("error");
    setToastOpen(true);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (author) setAuthor(null);
  };

  const toastCloseHandler = () => {
    setToastOpen(false);
  };

  const getAuthors = async () => {
    let url = `http://localhost:8000/authors`;
    try {
      const response = await axiosInstance.get(url);
      console.log(response.data);
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    let url = `http://localhost:8000/users`;
    try {
      const response = await axiosInstance.get(url);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addAuthorHandler = async (data) => {
    console.log("data", data);
    const response = await axiosInstance.post(
      "http://localhost:8000/authors/",
      data
    );
    if (response.data.success) {
      setDrawerOpen(false);
      setToastMessage("author added successfully");
      setSeverity("success");
      setToastOpen(true);
      setAuthors((previous) => [...authors, response.data.data]);
    } else {
      setToastMessage(response.data.error);
      setSeverity("error");
      setToastOpen(true);
    }
  };

  return (
    <>
      <Toast
        open={open}
        closeHandler={toastCloseHandler}
        message={message}
        severity={severity}
      ></Toast>
      <AuthorForm
        isOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        addAuthorHandler={addAuthorHandler}
      />

      {authors.length < 2 && auth.currentUser.role === "admin" && (
        <Box
          sx={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}
        >
          <Button
            onClick={toggleDrawer}
            variant="contained"
            endIcon={<PersonAddAlt1Icon />}
          >
            Add Author
          </Button>
        </Box>
      )}

      <AuthorTable
        onClickDeleteHandler={onClickDeleteHandler}
        authors={authors}
        users={users}
      />
    </>
  );
};

export default Authors;
