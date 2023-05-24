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

  const modalVisibilityHandler = () => {
    setModalVisible(false);
  };

  const onCloseHandler = () => {
    setSearchKeyword("");
    setCurrentPage(1);
  };

  const onEnterHandler = (keyword) => {
    console.log("keyword1".keyword);
    setSearchKeyword(keyword);
    setCurrentPage(1);
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
    setModalVisible(true);
    console.log("selected task", selectedTask);
  };

  const getTasks = (keyword) => {
    console.log("keyword", keyword);
    const limit = 8;
    const offset = (currentPage - 1) * limit;

    const url = `http://localhost:8000/tasks?limit=${limit}&offset=${offset}`;

    if (keyword) {
      setCurrentPage(1);
      url = url + `&keyword=${keyword}`;
    }

    axiosInstance
      .get(url)
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((err) => {});
  };

  const getTaskByDate = async () => {
    if (startDate.length > 0 && endDate.length > 0) {
      let url = `http://localhost:8000/tasks/getByDate?startDate=${startDate}&endDate=${endDate}`;
      const response = await axiosInstance.get(url);
      if (response.data.success) {
        console.log("response", response.data.data);
        setTasks(response.data.data);
      } else {
        console.log(response.data.data);
        setToastMessage(response.data.error);
        setToastOpen(true);
      }
    } else {
      setToastMessage(" date range is not selected");
      setToastOpen(true);
    }
  };

  const dateChangeHandler = (date, text) => {
    console.log(date, text);
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
      <Toast
        open={open}
        closeHandler={toastCloseHandler}
        message={message}
        severity="error"
      ></Toast>
      <div className="tasks-container">
        <div className="title-search">
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
        <DataTable taskList={tasks} />
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
        {/* <div>
          {modalVisible && (
            <Task
              modalVisibilityHandler={modalVisibilityHandler}
              selectedTask={selectedTask}
            ></Task>
          )}
        </div> */}
      </div>
    </>
  );
};
export default Tasks;
