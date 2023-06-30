import "./Login.css";
import loginIcon from "assets/google.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Login = () => {
  return (
    <div>
      <a
        className="login-button"
        href={`${process.env.REACT_APP_ServerUrl}/google`}
      >
        <img className="login-icon" src={loginIcon} alt="google icon"></img>
        Sign in with Google
      </a>
    </div>
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "20px",
    //     width: "25%",
    //   }}
    // >
    //   <TextField id="outlined-basic" label="email" variant="outlined" />
    //   <TextField
    //     id="outlined-password-input"
    //     label="Password"
    //     type="password"
    //     autoComplete="current-password"
    //   />
    //   <Button variant="contained">Login</Button>
    // </Box>
  );
};

export default Login;
