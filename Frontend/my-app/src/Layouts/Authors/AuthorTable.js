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

export default function AuthorTable({ onClickDeleteHandler, authors, users }) {
  const { auth, setIsLoggedIn } = useContext(loggedInContext);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteAuthor = async (id) => {
    let url = `${process.env.REACT_APP_ServerUrl}/authors/${id}`;
    const response = await axiosInstance.delete(url);
    if (response.data.success) {
      onClickDeleteHandler(id);
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
            <TableCell>Name</TableCell>
            <TableCell align="center">Start Time</TableCell>
            <TableCell align="center">End Time</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">PhoneNumber</TableCell>
            {auth.currentUser.role === "admin" && (
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
                <TableCell align="center">{author.endTime}</TableCell>
                <TableCell align="center">
                  {usersById[author.userId].email}
                </TableCell>
                <TableCell align="center">
                  {usersById[author.userId].phoneNumber}
                </TableCell>
                {auth.currentUser.role === "admin" && (
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
