import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import "./tasktable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

const NewTaskCard = ({ tasks }) => {
  return (
    <TableContainer sx={{ width: "80%" }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>

            <TableCell>URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <div className="userWrapper">
                  <div className="userDetails">
                    <b>
                      <span className="userName">{task.name}</span>
                    </b>
                    <br />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Link
                  sx={{ textDecoration: "none" }}
                  href={task.url}
                  target="_blank"
                >
                  {task.url}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NewTaskCard;
