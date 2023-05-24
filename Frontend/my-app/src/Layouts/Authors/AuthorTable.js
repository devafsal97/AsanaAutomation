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
import { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AuthorTable({
  onClickDeleteHandler,
  setAuthorsHandler,
}) {
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);
  const { user, setIsLoggedIn } = useContext(loggedInContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getUsers();
    getAuthors();
  }, []);

  const deleteAuthor = async (id) => {
    console.log(id);
    let url = `http://localhost:8000/authors/${id}`;
    const response = await axiosInstance.delete(url);
  };

  const getAuthors = async () => {
    const limit = 8;
    const offset = (currentPage - 1) * limit;

    let url = `http://localhost:8000/authors`;
    try {
      const response = await axiosInstance.get(url);
      setAuthors(response.data);
      setAuthorsHandler(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    let url = `http://localhost:8000/users`;
    try {
      const response = await axiosInstance.get(url);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const usersById = useMemo(() => {
    return users.reduce((byId, user) => {
      byId[user.id] = user;
      return byId;
    }, {});
  }, [users]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="18%">Name</TableCell>
            <TableCell width="18%" align="center">
              Start Time
            </TableCell>
            <TableCell width="18%" align="center">
              End Time
            </TableCell>
            <TableCell width="18%" align="center">
              Email
            </TableCell>
            <TableCell align="center">PhoneNumber</TableCell>
            {user.currentUser.role === "admin" && (
              <TableCell align="center">Delete</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!authors.length &&
            !!users.length &&
            authors.map((author) => (
              <TableRow
                key={author.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{usersById[author.userId].name}</TableCell>
                <TableCell align="center">{author.startTime}</TableCell>
                <TableCell align="center">{author.startTime}</TableCell>
                <TableCell align="center">
                  {usersById[author.userId].email}
                </TableCell>
                <TableCell align="center">
                  {usersById[author.userId].phoneNumber}
                </TableCell>
                {user.currentUser.role === "admin" && (
                  <TableCell
                    align="center"
                    onClick={() => deleteAuthor(author.id)}
                  >
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
