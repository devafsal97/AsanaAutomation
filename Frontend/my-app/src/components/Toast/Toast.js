import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toast = ({ open, closeHandler, message, severity }) => {
  const vertical = "top";
  const horizontal = "right";

  const handleClose = () => {
    closeHandler();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
