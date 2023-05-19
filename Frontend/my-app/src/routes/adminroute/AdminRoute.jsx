import SideBar from "../../containers/sidebar/SideBar";
import TopBar from "../../containers/TopBar/TopBar";
import { Routes, Route } from "react-router-dom";
import Homepage from "../../pages/HomePage/Homepage";

import Dashboard from "../../Layouts/Dashboard";

const AdminRoute = () => {
  return <Dashboard />;
};

export default AdminRoute;
