import "./Login.css";

const Login = () => {
  return (
    <div>
      <a
        className="login-button"
        href={`${process.env.REACT_APP_ServerUrl}/google`}
      >
        {/* <img className="login-icon" src={loginIcon} alt="google icon"></img> */}
        Sign in with Google
      </a>
    </div>
  );
};

export default Login;
