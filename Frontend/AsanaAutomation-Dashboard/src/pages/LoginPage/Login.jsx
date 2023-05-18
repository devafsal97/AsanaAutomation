import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import GoogleIcon from "@mui/icons-material/Google";

import axios from "axios";

const Login = () => {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          href="http://localhost:8000/googl"
          endIcon={<GoogleIcon />}
          startIcon={<GoogleIcon />}
        >
          Sign with google
        </Button>
      </Stack>
    </div>
  );
};

export default Login;
