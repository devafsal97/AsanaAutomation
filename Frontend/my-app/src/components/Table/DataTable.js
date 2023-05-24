import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export default function DataTable({ taskList }) {
  const convertTime = (time) => {
    const timestamp = new firebase.firestore.Timestamp(
      time._seconds,
      time._nanoseconds
    );
    timestamp.toDate();
    const date = new Date(timestamp.toDate());
    const formattedDate = date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return formattedDate;
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width="15%">Name</TableCell>
            <TableCell width="18%" align="center">
              Created At
            </TableCell>
            <TableCell width="15%" align="center">
              TurnAround Time
            </TableCell>
            <TableCell width="15%" align="center">
              Author
            </TableCell>
            <TableCell align="center">Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log("tasklist", taskList)}
          {taskList.map((task) => (
            <TableRow
              key={task.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{task.name}</TableCell>
              <TableCell align="center">
                {convertTime(task.created_at)}
              </TableCell>
              <TableCell align="center">{task.turnAroundTime}</TableCell>
              <TableCell align="center">{task.currentAuthor}</TableCell>
              <TableCell align="center">
                <Link sx={{ textDecoration: "none" }} href={task.taskUrl}>
                  {task.taskUrl}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
