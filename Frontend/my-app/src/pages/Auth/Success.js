import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParam from "../../hooks/useQueryParam";
import { useContext } from "react";
import { loggedInContext } from "../../App";
import axios from "axios";
import { userContext } from "../../App";

const Success = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(loggedInContext);
  const { currentUser, setCurrentUser } = useContext(userContext);
  const { token } = useQueryParam("token");
  let navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/404");
    }

    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      const response = await axios.get("http://localhost:8000/validateToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        setCurrentUser(response.data.user.role);
        navigate("/");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return "loading";
};

export default Success;