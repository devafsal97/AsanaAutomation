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

export default function AuthorTable({ Authors }) {
  const [authors, setAuthors] = useState([]);
  const { user, setIsLoggedIn } = useContext(loggedInContext);

  const getAuthors = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8000/api/authors"
      );
      setAuthors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="18%">Name</TableCell>
            <TableCell width="18%" align="center">
              Time
            </TableCell>
            <TableCell width="18%" align="center">
              Email
            </TableCell>
            <TableCell align="center">PhoneNumber</TableCell>
            {user.currentUser.role === "admin" && (
              <TableCell align="center">Edit</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow
              key={author.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{author.name}</TableCell>
              <TableCell align="center">3:30 - 8:30</TableCell>
              <TableCell align="center">{author.email_id}</TableCell>
              <TableCell align="center">{author.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
