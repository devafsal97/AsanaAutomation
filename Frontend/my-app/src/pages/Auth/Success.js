import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParam from "../../hooks/useQueryParam";
import { useContext } from "react";
import { loggedInContext } from "../../App";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Success = () => {
  console.log("reached");
  const { auth, setIsLoggedIn } = useContext(loggedInContext);
  const { token } = useQueryParam("token");
  console.log("token", token);
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/404");
    }

    validateToken();
  }, []);

  const validateToken = async () => {
    console.log("valod token reached");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ServerUrl}/validateToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);

      if (response.data.success) {
        console.log("token valid success");
        localStorage.setItem("token", token);
        setIsLoggedIn({ isLoggedIn: true, currentUser: response.data.user });
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Success;
