import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosinstance";
import "./Tasks.css";
import searchIcon from "../../../assets/search.png";
import { Link } from "react-router-dom";
import Task from "../task/Task";

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

  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
    console.log("selected task", selectedTask);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    console.log("use effect called");
    const limit = 10;
    const offset = (currentPage - 1) * limit;

    const requestBody = {
      limit: limit,
      offset: offset,
    };

    axiosInstance
      .post("http://localhost:8000/api/get-all-tasks", requestBody)
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((err) => {});
  }, [currentPage]);

  return (
    <>
      <div className="tasks-container">
        <div className="title-search">
          <h3 className="tasks-h3">Tasks</h3>
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
        </div>
        <div className="tasks-list">
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
        </div>
        <div className="button-container">
          <button
            className="task-list-button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous Page
          </button>
          <button
            className="task-list-button"
            disabled={tasks.length < 10}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next Page
          </button>
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
