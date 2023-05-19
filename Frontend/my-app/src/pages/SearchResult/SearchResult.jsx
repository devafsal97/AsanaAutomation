import { useParams } from "react-router-dom";
import { useState } from "react";
import "./SearchResult.css";
import { useEffect } from "react";
import axios from "axios";
import Task from "../../containers/contents/task/Task";

const SearchResult = () => {
  const [tasks, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const modalVisibilityHandler = () => {
    setModalVisible(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
    console.log("selected task", selectedTask);
  };

  const { keyword } = useParams();
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = tasks.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    console.log(keyword);
    const requestBody = { keyword: keyword };
    axios
      .post("http://localhost:8000/api/get-search-result", requestBody)
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="search-container">
        <div className="search-result">
          <div>
            <h3 className="keyword-h3">
              Search result for keyword : {keyword}
            </h3>
          </div>
          <div className="tasks-list">
            <div className="tasks-list-head">
              <h6 className="tasks-list-item">Id</h6>
              <h6 className="tasks-list-item">Name</h6>
              <h6 className="tasks-list-item">Created At</h6>
              <h6 className="tasks-list-item">Current Author</h6>
            </div>
            {currentItems.map((task) => (
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
              disabled={endIndex >= tasks.length}
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
      </div>
    </>
  );
};

export default SearchResult;
