import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useContext } from "react";
import axiosInstance from "utils/axiosinstance";
import { loggedInContext } from "App";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function UsersTable({ onClickEdit }) {
  const [users, setUsers] = useState([]);
  const { user, setIsLoggedIn } = useContext(loggedInContext);
  const [currentPage, setCurrentPage] = useState(1);

  const getUsers = async () => {
    console.log("get users called");
    const limit = 8;
    const offset = (currentPage - 1) * limit;

    let url = `http://localhost:8000/users?limit=${limit}&offset=${offset}`;
    try {
      const response = await axiosInstance.get(url);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("useeffect called");
    getUsers();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="18%">Name</TableCell>
            <TableCell width="18%" align="center">
              Email
            </TableCell>
            <TableCell width="18%" align="center">
              PhoneNumber
            </TableCell>
            <TableCell width="18%" align="center">
              role
            </TableCell>
            <TableCell align="center">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.phoneNumber}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
              <TableCell align="center" onClick={() => onClickEdit(user)}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
