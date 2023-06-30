import { useEffect, useState } from "react";
import DataCard from "./DataCard";
import Box from "@mui/material/Box";
import axiosInstance from "utils/axiosinstance";
import Typography from "@mui/material/Typography";
import AuthorCard from "./AuthorCard";
import NewTaskCard from "./NewTaskCard";

const Overview = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [newTasksData, setNewTaskData] = useState([]);
  const [activeTask, setActiveTask] = useState([]);

  const getAnalyticsData = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/tasks/getActiveTaskCount`;
    const response = await axiosInstance.get(url);
    console.log(response.data.data);
    setAnalyticsData(response.data.data);
  };

  const getActiveTask = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/tasks/getActiveTask`;
    const response = await axiosInstance.get(url);
    console.log(response.data.data);
    setActiveTask(response.data.data);
  };

  const analyticsKeyObject = {
    newTask: "New Task",
    activeTask: "Active Task",
    averageTat: "Average TurnArround Time",
    completedTask: "Completed Task Count",
  };
  const getNewTaskData = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/tasks/getNewTaskData`;
    const response = await axiosInstance.get(url);
    console.log("new task adat", response.data.data);
    setNewTaskData(response.data.data);
  };

  useEffect(() => {
    getAnalyticsData();
    getNewTaskData();
    getActiveTask();
    const interval = setInterval(() => {
      getAnalyticsData();
      getNewTaskData();
      getActiveTask();
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: "50px",
        }}
      >
        {console.log("adata", analyticsData)}
        {!!analyticsData.length &&
          analyticsData.map((item, index) => {
            return (
              <DataCard
                title={analyticsKeyObject[item.title]}
                value={item.value}
              ></DataCard>
            );
          })}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box>
          <Typography sx={{ marginTop: "40px", marginBottom: "10px" }}>
            Authoring Team
          </Typography>
          <AuthorCard></AuthorCard>
        </Box>
        <Box>
          <Typography sx={{ marginTop: "40px", marginBottom: "10px" }}>
            New Tasks
          </Typography>
          <NewTaskCard tasks={newTasksData}></NewTaskCard>
        </Box>
        <Box>
          <Typography sx={{ marginTop: "40px", marginBottom: "10px" }}>
            Active Tasks
          </Typography>
          <NewTaskCard tasks={activeTask}></NewTaskCard>
        </Box>
      </Box>
    </>
  );
};

export default Overview;
