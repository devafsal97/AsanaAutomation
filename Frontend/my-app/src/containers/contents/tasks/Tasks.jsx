import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

import axiosInstance from "../../../utils/axiosinstance";
import "./Tasks.css";
import Task from "../task/Task";
import DataTable from "../../../components/Table/DataTable";
import IconLabelButtons from "../../../components/Button/Button";
import SearchComponent from "components/Search/SearchComponent";
import DateRangePicker from "components/Date/DateRangePicker";
import Toast from "components/Toast/Toast";
import Comments from "./Comments";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setToastOpen] = useState(false);
  const [message, setToastMessage] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [severity, setToastSeverity] = useState("success");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const toggleComments = () => {
    setCommentsOpen(!commentsOpen);
  };

  const onCloseHandler = () => {
    setSearchKeyword("");
    setCurrentPage(1);
  };

  const onEnterHandler = (keyword) => {
    console.log("from parent", keyword);
    setSearchKeyword(keyword);
    if (currentPage != 1) {
      setCurrentPage(1);
    } else {
      getTasks();
    }
  };

  const toastCloseHandler = () => {
    setToastOpen(false);
  };

  const onPrevClickHandler = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextClickHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const getTasks = async () => {
    console.log(searchKeyword);
    const limit = 8;
    const offset = (currentPage - 1) * limit;

    let url = `http://localhost:8000/tasks?limit=${limit}&offset=${offset}`;

    if (searchKeyword) {
      url = url.concat(`&keyword=${searchKeyword}`);
    }

    console.log("url", url);

    const response = await axiosInstance.get(url);
    if (response.data.success) {
      setTasks(response.data.data);
    } else {
      setToastSeverity("error");
      setToastMessage(response.data.error);
      setToastOpen(true);
    }
  };

  const getTaskByDate = async () => {
    if (startDate.length > 0 && endDate.length > 0) {
      let url = `http://localhost:8000/tasks/getByDate?startDate=${startDate}&endDate=${endDate}`;
      const response = await axiosInstance.get(url);
      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        setToastMessage(response.data.error);
        setToastOpen(true);
      }
    } else {
      setToastMessage("please select the date range");
      setToastSeverity("error");
      setToastOpen(true);
    }
  };

  const commentToastHandler = () => {
    setToastMessage("comment updated successfully");
    setToastSeverity("success");
    setToastOpen(true);
  };

  const dateChangeHandler = (date, text) => {
    if (text === "StartDate") {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  useEffect(() => {
    getTasks();
  }, [currentPage]);

  return (
    <>
      <Comments
        open={commentsOpen}
        closeDrawer={toggleComments}
        commentToastHandler={commentToastHandler}
      ></Comments>

      {drawerOpen && (
        <Task
          open={drawerOpen}
          closeDrawer={toggleDrawer}
          selectedTask={selectedTask}
        ></Task>
      )}

      <Toast
        open={open}
        closeHandler={toastCloseHandler}
        message={message}
        severity={severity}
      ></Toast>
      <div className="tasks-container">
        <div className="title-search">
          <Button
            sx={{ marginRight: "10px" }}
            variant="contained"
            onClick={toggleComments}
          >
            Comments
          </Button>
          <DateRangePicker text="StartDate" ondateChange={dateChangeHandler} />
          <DateRangePicker text="EndDate" ondateChange={dateChangeHandler} />
          <Button
            sx={{ marginRight: "10px" }}
            variant="contained"
            onClick={getTaskByDate}
          >
            Filter
          </Button>
          <SearchComponent
            onCloseHandler={onCloseHandler}
            onEnterHandler={onEnterHandler}
          />
        </div>
        <DataTable taskList={tasks} handleTaskClick={handleTaskClick} />
        <div className="button-container">
          <IconLabelButtons
            text="Previous Page"
            onClick={onPrevClickHandler}
            disabled={currentPage === 1}
          ></IconLabelButtons>
          <IconLabelButtons
            text="Next Page"
            onClick={onNextClickHandler}
            disabled={tasks.length < 8}
          ></IconLabelButtons>
        </div>
      </div>
    </>
  );
};
export default Tasks;
