import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQueryParam from "../../hooks/useQueryParam";

const Success = () => {
  const { token } = useQueryParam("token");
  let history = useNavigate();
  useEffect(() => {
    if (!token) {
      history.push("/404");
    }

    validateToken();
  }, []);

  const validateToken = () => {
    //validate token
    localStorage.setItem("token", token);
    window.location.href = "http://localhost:5173";
  };

  return "loading";
};

export default Success;
