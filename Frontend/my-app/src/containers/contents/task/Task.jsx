import Drawer from "components/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

const Task = ({ open, closeDrawer, selectedTask }) => {
  console.log("selected tas", selectedTask);

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

  const boxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: "3px",
  };
  const titleStye = { width: "150px", fontWeight: "600" };

  return (
    <Drawer isOpen={open} onClose={closeDrawer} title="Task">
      {console.log("stask".selectedTask)}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        }}
      >
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" sx={titleStye}>
            Name:
          </Typography>
          <Typography variant="subtitle1">{selectedTask.name}</Typography>
        </Box>
        <Divider />
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" sx={titleStye}>
            Gid:
          </Typography>
          <Typography variant="subtitle1">{selectedTask.gid}</Typography>
        </Box>
        <Divider />
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" sx={titleStye}>
            Created At:
          </Typography>
          <Typography variant="subtitle1">
            {convertTime(selectedTask.createdAt)}
          </Typography>
        </Box>
        <Divider />
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" sx={titleStye}>
            Author:
          </Typography>
          <Typography variant="subtitle1">{selectedTask.author}</Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={titleStye}>
            Author Call Status:
          </Typography>
          <Box sx={{ marginLeft: "150px" }}>
            <Box sx={boxStyle}>
              <Typography sx={{ marginRight: "15px" }} variant="subtitle1">
                Call Status:
              </Typography>
              <Typography>
                {selectedTask.currentAuthotCallStatus.callStatus}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={{ marginRight: "15px" }} variant="subtitle1">
                Time:
              </Typography>
              <Typography>
                {selectedTask.currentAuthotCallStatus.timeStamp}
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography sx={{ marginRight: "15px" }} variant="subtitle1">
                number
              </Typography>
              <Typography>
                {selectedTask.currentAuthotCallStatus.number}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" sx={titleStye}>
            Inprogress Time:
          </Typography>
          <Typography variant="subtitle1">
            {selectedTask.inProgressTime}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="subtitle1" sx={titleStye}>
            Escalation Process:
          </Typography>
          <Box sx={{ marginLeft: "150px" }}>
            {selectedTask.escalationProcess.map((item, index) => {
              return (
                <Box
                  sx={{
                    marginBottom: "10px",
                    borderBottom: "1px solid #E0E0E0",
                  }}
                >
                  <Box sx={boxStyle}>
                    <Typography
                      sx={{ marginRight: "15px" }}
                      variant="subtitle1"
                    >
                      {callPriority[index]}
                    </Typography>
                    <Typography>{item.callStatus}</Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography
                      sx={{ marginRight: "15px" }}
                      variant="subtitle1"
                    >
                      Time:
                    </Typography>
                    <Typography>{item.timeStamp}</Typography>
                  </Box>
                  <Box sx={boxStyle}>
                    <Typography
                      sx={{ marginRight: "15px" }}
                      variant="subtitle1"
                    >
                      number
                    </Typography>
                    <Typography>{item.number}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Divider />
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" sx={titleStye}>
            Completed Time:
          </Typography>
          <Typography variant="subtitle1">
            {selectedTask.completedTime}
          </Typography>
        </Box>
        <Divider />
        <Box sx={boxStyle}>
          <Typography variant="subtitle1" sx={titleStye}>
            Turn Arround Time:
          </Typography>
          <Typography variant="subtitle1">
            {selectedTask.turnArroundTime}
          </Typography>
        </Box>
        <Divider />
        <Box sx={boxStyle}>
          <Typography
            variant="subtitle1"
            sx={{ ...titleStye, marginRight: "10px" }}
          >
            Url:
          </Typography>
          <Typography variant="subtitle1">
            <Link
              sx={{ textDecoration: "none" }}
              href={selectedTask.url}
              target="_blank"
            >
              {selectedTask.url}
            </Link>
          </Typography>
        </Box>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Task;
