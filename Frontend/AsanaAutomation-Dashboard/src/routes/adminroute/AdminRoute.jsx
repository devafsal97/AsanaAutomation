import SideBar from "../../containers/sidebar/SideBar";
import TopBar from "../../containers/TopBar/TopBar";
import { Routes, Route } from "react-router-dom";
import Homepage from "../../pages/HomePage/Homepage";
import CurrentAuthorPage from "../../pages/CurrentAuthor/CurrentAuthorPage";

const AdminRoute = () => {
  return (
    <div>
      {/* Render the sidebar component */}
      <SideBar></SideBar>
      <TopBar></TopBar>

      {/* Render the content area */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Homepage></Homepage>}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoute;
