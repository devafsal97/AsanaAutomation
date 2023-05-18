import "./TopBar.css";
import accountIcon from "../../assets/account.png";

const TopBar = () => {
  const logouthandler = () => {
    localStorage.removeItem("token");
    window.location.href = "http://localhost:5173/login";
    console.log("logout");
  };

  return (
    <>
      <div className="top-bar">
        <button onClick={logouthandler}>logout</button>
        <img className="account-img" src={accountIcon} alt="account icon"></img>
      </div>
    </>
  );
};

export default TopBar;
