import FullWidthTabs from "components/TabComponent/FullWidthTabs";
import UserTable from "./UserTable";

const Admin = () => {
  return <FullWidthTabs UserTable={UserTable}></FullWidthTabs>;
};

export default Admin;
