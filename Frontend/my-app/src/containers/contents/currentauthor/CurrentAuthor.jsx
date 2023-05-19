import "./CurrentAuthor.css";
import { useEffect } from "react";
import { useState } from "react";
import AxiosInstance from "../../../utils/axiosinstance";

const CurrentAuthor = () => {
  const [currentAuthor, setCurrentAuthor] = useState({});
  const [editData, setEditData] = useState(false);
  const [authorNameInput, setAuthorNameInput] = useState("");
  const [authorContactInput, setAuthorConatctInput] = useState("");

  const editHandler = () => {
    setEditData(true);
  };
  const handleNameInputChange = (event) => {
    setAuthorNameInput(event.target.value);
  };
  const handleConatcInputChange = (event) => {
    setAuthorConatctInput(event.target.value);
  };

  const updataHandler = () => {
    const requestBody = {
      name: authorNameInput,
      contactnumber: authorContactInput,
      id: currentAuthor.id,
    };
    AxiosInstance.post(
      "http://localhost:8000/api/update-current-author",
      requestBody
    )
      .then((response) => {
        console.log("author", response.data);
        setCurrentAuthor(response.data);
        setEditData(false);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    AxiosInstance.get("http://localhost:8000/api/get-current-author")
      .then((response) => {
        console.log("author", response.data);
        setCurrentAuthor(response.data);
        console.log("idddd", response.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="modal-author">
        <div className="author-cont">
          <h2 className="author-head">Current Author</h2>
          <div className="author-data">
            <h3 className="author-dvalue">Name:</h3>
            <h3>{currentAuthor.Name}</h3>
          </div>
          <div className="author-data">
            <h3 className="author-dvalue">Contact number:</h3>
            <h3>{currentAuthor.PhoneNumber}</h3>
          </div>
          {editData === true ? (
            <div>
              <h2 className="author-head">Edit Data</h2>
              <div className="author-data">
                <h3 className="author-dvalue">Name:</h3>
                <input
                  className="author-input"
                  value={authorNameInput}
                  onChange={handleNameInputChange}
                ></input>
              </div>
              <div className="author-data">
                <h3 className="author-dvalue">Contact number:</h3>
                <input
                  className="author-input"
                  value={authorContactInput}
                  onChange={handleConatcInputChange}
                ></input>
              </div>
              <div className="btn-align">
                <button
                  className="task-list-button btn-athr"
                  onClick={updataHandler}
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <div className="btn-align">
              <button
                className="task-list-button btn-athr"
                onClick={editHandler}
              >
                Edit Data
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentAuthor;
