import "./UsersTable.css";
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

export default function UsersTable({ onClickEdit, users }) {
  const { auth, setIsLoggedIn } = useContext(loggedInContext);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>USER</TableCell>

            <TableCell>FUNCTION</TableCell>
            <TableCell>PHONE NUMBER</TableCell>

            {auth.currentUser.role == "admin" && (
              <TableCell align="center">ACTION</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {console.log("user data", user)}
              <TableCell>
                <div className="userWrapper">
                  <div className="userImage">
                    <img src="https://drive.google.com/uc?export=view&id=1ZkOLli7mU4-Qh9qu38qKImV-qknbUBnQ" />
                  </div>
                  <div className="userDetails">
                    <b>
                      <span className="userName">{user.name}</span>
                    </b>
                    <br />
                    <span className="userSubDetails">{user.email}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell sx={{ textTransform: "capitalize" }}>
                <b>{user.role}</b>
                <br />
                <span className="userSubDetails">ABC.com</span>
              </TableCell>
              <TableCell>{user.phoneNumber}</TableCell>

              {auth.currentUser.role == "admin" && (
                <TableCell
                  align="center"
                  className="editCell"
                  onClick={() => onClickEdit(user)}
                >
                  Edit
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
