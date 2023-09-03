import React from "react";
import Drawer from "components/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Link from "@mui/material/Link";

const Task = ({ open, closeDrawer, selectedTask }) => {
  console.log("selected task", selectedTask);

  const convertTime = (time) => {
    console.log("time", time);
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

  const callPriority = [
    "Initial Call Status:",
    "Secondary Call Status:",
    "Tertiary call Status:",
  ];

  // Custom styling for the boxes
  const customBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: "15px",
    fontSize: "14px",
  };

  // Custom styling for the titles
  const customTitleStyle = {
    width: "150px",
    fontWeight: "600",
    marginRight: "15px",
    fontSize: "14px",
  };

  // Custom styling for the wrapper box
  const customWrapperBoxStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    width: "fit-content",
    maxWidth: "650px",
  };

  const customValueStyle = {
    fontSize: "14px",
  };

  const statusColors = {
    "no-answer": "red",
    Answered: "green",
  };

  return (
    <Drawer isOpen={open} onClose={closeDrawer} title="Task Details">
      <Box sx={{ ...customWrapperBoxStyle }}>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Name:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ ...customValueStyle, marginLeft: "17px" }}
          >
            {selectedTask.name}
          </Typography>
        </Box>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            URL:
          </Typography>
          <Box
            sx={{
              ...customBoxStyle,
              marginLeft: "48px",
              wordBreak: "break-all",
            }}
          >
            <Link
              sx={{ textDecoration: "none" }}
              href={selectedTask.url}
              target="_blank"
            >
              {selectedTask.url}
            </Link>
          </Box>
        </Box>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Gid:
          </Typography>
          <Typography variant="subtitle1" sx={{ ...customValueStyle }}>
            {selectedTask.gid}
          </Typography>
        </Box>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Created At:
          </Typography>
          <Typography variant="subtitle1" sx={{ ...customValueStyle }}>
            {convertTime(selectedTask.createdAt)}
          </Typography>
        </Box>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Author:
          </Typography>
          <Typography variant="subtitle1" sx={{ ...customValueStyle }}>
            {selectedTask.author}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Author Call Status:
          </Typography>
          <Box sx={{ marginLeft: "165px" }}>
            <Box sx={{ ...customBoxStyle }}>
              <Typography sx={{ ...customValueStyle }} variant="subtitle1">
                Call Status:
              </Typography>
              <Typography sx={{ ...customValueStyle, marginLeft: "5px" }}>
                {selectedTask.authorCallStatus.callStatus}
              </Typography>
            </Box>
            <Box sx={{ ...customBoxStyle }}>
              <Typography sx={{ ...customValueStyle }} variant="subtitle1">
                Time:
              </Typography>
              <Typography sx={{ ...customValueStyle, marginLeft: "5px" }}>
                {selectedTask.authorCallStatus.timeStamp}
              </Typography>
            </Box>
            <Box sx={{ ...customBoxStyle }}>
              <Typography sx={{ ...customValueStyle }} variant="subtitle1">
                Number:
              </Typography>
              <Typography sx={{ ...customValueStyle, marginLeft: "5px" }}>
                {selectedTask.authorCallStatus.number}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Inprogress Time:
          </Typography>
          <Typography variant="subtitle1" sx={{ ...customValueStyle }}>
            {selectedTask.inProgressTime}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Escalation Process:
          </Typography>
          <Box sx={{ marginLeft: "165px" }}>
            {selectedTask.escalationProcess.map((item, index) => {
              const statusColor = statusColors[item.callStatus] || "inherit";
              return (
                <Box
                  key={index}
                  sx={{
                    marginBottom: "7px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "4px",
                    padding: "10px",
                    minWidth: "250px",
                    width: "fit-content",
                  }}
                >
                  <Box sx={{ ...customBoxStyle }}>
                    <Typography
                      sx={{ ...customValueStyle }}
                      variant="subtitle1"
                    >
                      {callPriority[index]}
                    </Typography>
                    <Typography
                      sx={{
                        ...customBoxStyle,
                        marginLeft: "5px",
                        color: statusColor,
                      }}
                    >
                      {item.callStatus}
                    </Typography>
                  </Box>
                  <Box sx={{ ...customBoxStyle }}>
                    <Typography
                      sx={{ ...customValueStyle }}
                      variant="subtitle1"
                    >
                      Time:
                    </Typography>
                    <Typography sx={{ ...customBoxStyle, marginLeft: "5px" }}>
                      {item.timeStamp}
                    </Typography>
                  </Box>
                  <Box sx={{ ...customBoxStyle }}>
                    <Typography
                      sx={{ ...customValueStyle }}
                      variant="subtitle1"
                    >
                      Number:
                    </Typography>
                    <Typography sx={{ ...customBoxStyle, marginLeft: "5px" }}>
                      {item.number}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Completed Time:
          </Typography>
          <Typography variant="subtitle1" sx={{ ...customValueStyle }}>
            {selectedTask.completedTime}
          </Typography>
        </Box>
        <Box sx={{ ...customBoxStyle }}>
          <Typography variant="subtitle1" sx={{ ...customTitleStyle }}>
            Turn Around Time:
          </Typography>
          <Typography variant="subtitle1" sx={{ ...customBoxStyle }}>
            {selectedTask.turnArroundTime}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Task;
