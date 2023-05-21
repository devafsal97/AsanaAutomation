import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import axiosInstance from "../../../utils/axiosinstance";
import "./Tasks.css";
import Task from "../task/Task";
import DataTable from "../../../components/Table/DataTable";
import IconLabelButtons from "../../../components/Button/Button";
import SearchComponent from "components/Search/SearchComponent";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [taskData, setTaskData] = useState({});

  const modalVisibilityHandler = () => {
    setModalVisible(false);
  };

  const onCloseHandler = () => {
    setCurrentPage(1);
    getTasks();
  };

  const onEnterHandler = (event, keyword) => {
    if (event.key === "Enter") {
      getTasks(keyword);
    }
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
    const limit = 8;
    const offset = (currentPage - 1) * limit;

    let url = `http://localhost:8000/api/tasks?limit=${limit}&offset=${offset}`;
    if (keyword) {
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

  useEffect(() => {
    getTasks();
  }, [currentPage]);

  return (
    <>
      <div className="tasks-container">
        <div className="title-search">
          <SearchComponent
            onCloseHandler={onCloseHandler}
            onEnterHandler={onEnterHandler}
          />
        </div>
        {/* <div className="title-search">
          <div>
            <input
              placeholder="Search"
              className="searchbox"
              value={searchKeyword}
              onChange={handleSearchInputChange}
            />
            <Link to={`/search/${searchKeyword}`}>
              <img
                className="search-icon"
                src={searchIcon}
                alt="searchtext"
              ></img>
            </Link>
          </div>
        </div> */}
        {/* <div className="tasks-list">
          <div className="tasks-list-head">
            <h6 className="tasks-list-item">Id</h6>
            <h6 className="tasks-list-item">Name</h6>
            <h6 className="tasks-list-item">Created At</h6>
            <h6 className="tasks-list-item">Current Author</h6>
          </div>
          {tasks.map((task) => (
            <div
              className="tasks-list-head list-item-color"
              key={task.id}
              onClick={() => handleTaskClick(task)}
            >
              <h6 className="tasks-list-item">{task.gid}</h6>
              <h6 className="tasks-list-item"> {task.name}</h6>
              <h6 className="tasks-list-item">{task.created_at}</h6>
              <h6 className="tasks-list-item">{task.currentAuthor}</h6>
            </div>
          ))}
        </div> */}
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
        <div>
          {modalVisible && (
            <Task
              modalVisibilityHandler={modalVisibilityHandler}
              selectedTask={selectedTask}
            ></Task>
          )}
        </div>
      </div>
    </>
  );
};
export default Tasks;
