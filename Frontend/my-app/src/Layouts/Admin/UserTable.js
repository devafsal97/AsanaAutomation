import * as React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import axiosInstance from "utils/axiosinstance";
import { useEffect } from "react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const UserTable = () => {
  const [stripe, setStripe] = React.useState("odd");
  const [users, setUsers] = React.useState([]);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8000/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Table aria-label="striped table" stripe={stripe}>
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email_id}</td>
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
