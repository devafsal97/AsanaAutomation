import Drawer from "components/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState, useContext } from "react";
import axiosInstance from "utils/axiosinstance";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loggedInContext } from "App";

const Comments = ({ open, closeDrawer, commentToastHandler }) => {
  const [comments, setComments] = useState([]);
  const [commentOnDelay, setCommentOnDelay] = useState("");
  const [commentOnComepleted, setCommentOnCompleted] = useState("");
  const [editCommentOnDelay, setEditCommentOnDelay] = useState(false);
  const [editCommentOnCompleted, setEditCommentOnCompleted] = useState(false);
  const { auth, setIsLoggedIn } = useContext(loggedInContext);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/comments`;
    const response = await axiosInstance.get(url);
    setComments(response.data);
    setCommentOnDelay(response.data[0].comment);
    setCommentOnCompleted(response.data[1].comment);

    console.log("response commensts", response.data);
  };

  const onClickCompleted = () => {
    if (editCommentOnCompleted) {
      updateComment({ ...comments[1], comment: commentOnComepleted });
    }
    setEditCommentOnCompleted(!editCommentOnCompleted);
  };

  const onClickOnDelayed = () => {
    if (editCommentOnDelay) {
      updateComment({ ...comments[0], comment: commentOnDelay });
    }
    setEditCommentOnDelay(!editCommentOnDelay);
  };

  const onDelayCommentChange = (event) => {
    setCommentOnDelay(event.target.value);
  };

  const onCompletedCommentChange = (event) => {
    setCommentOnCompleted(event.target.value);
  };

  const updateComment = async (data) => {
    const url = `${process.env.REACT_APP_ServerUrl}/comments`;
    const response = await axiosInstance.put(url, data);
    if (response.data.success) {
      commentToastHandler();
      closeDrawer();
    }
  };

  return (
    <Drawer isOpen={open} onClose={closeDrawer} title="Comments">
      {!!comments.length && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ width: "100%", marginBottom: "10px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                sx={{ mb: !commentOnDelay.length ? 0 : 2 }}
                label={comments[0].name}
                defaultValue={commentOnDelay}
                onChange={(event) => onDelayCommentChange(event)}
                InputProps={
                  editCommentOnDelay ? { readOnly: false } : { readOnly: true }
                }
              ></TextField>
              {!commentOnDelay.length && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  comment is required
                </Typography>
              )}
              {console.log("edit delay", editCommentOnDelay)}
              {auth.currentUser.role == "admin" && (
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={onClickOnDelayed}
                  disabled={!commentOnDelay.length ? true : false}
                >
                  {editCommentOnDelay ? "Save" : "Edit"}
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ width: "100%", marginBottom: "10px" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label={comments[1].name}
                fullWidth
                multiline
                rows={4}
                defaultValue={commentOnComepleted}
                sx={{ mb: 2 }}
                onChange={(event) => onCompletedCommentChange(event)}
                InputProps={
                  editCommentOnCompleted
                    ? { readOnly: false }
                    : { readOnly: true }
                }
              ></TextField>
              {!commentOnComepleted.length && (
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  comment is required
                </Typography>
              )}
              {auth.currentUser.role == "admin" && (
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={onClickCompleted}
                  disabled={!commentOnComepleted.length ? true : false}
                >
                  {editCommentOnCompleted ? "Save" : "edit"}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};

export default Comments;
