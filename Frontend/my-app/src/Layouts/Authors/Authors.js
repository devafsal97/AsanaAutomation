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
  const { user, setIsLoggedIn } = useContext(loggedInContext);
  const [author, setAuthor] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [open, setToastOpen] = useState(false);
  const [message, setToastMessage] = useState("");
  const [buttonVisibilty, setButtonVisibilty] = useState(false);

  const onClickEditAuthor = (author) => {
    setAuthor(author);
    toggleDrawer();
  };

  const setAuthorsHandler = (authors) => {
    {
      console.log("lengty", authors.length);
    }
    setAuthors(authors);
    if (authors.length < 2) {
      setButtonVisibilty(true);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (author) setAuthor(null);
  };

  const toastCloseHandler = () => {
    setToastOpen(false);
  };

  const addAuthorHandler = async (data) => {
    console.log("data", data);
    const response = await axiosInstance.post(
      "http://localhost:8000/authors/",
      data
    );
    if (response.data.success) {
      setToastMessage("author added successfully");
      setToastOpen(true);
    }
    console.log("response", response);
  };

  return (
    <>
      <Toast
        open={open}
        closeHandler={toastCloseHandler}
        message={message}
      ></Toast>
      <AuthorForm
        isOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        addAuthorHandler={addAuthorHandler}
      />

      {buttonVisibilty && user.currentUser.role === "admin" && (
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
        onClickEditHandler={onClickEditAuthor}
        setAuthorsHandler={setAuthorsHandler}
      />
    </>
  );
};

export default Authors;
