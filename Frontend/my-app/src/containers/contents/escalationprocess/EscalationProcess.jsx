import "./EscalationProcess.css";
import { useState, useEffect } from "react";
import axios from "axios";

const EscalationProcess = () => {
  const [escalationData, setEscalationData] = useState({});
  const [escalationInputData, setEscalationInpuData] = useState({
    FirstContact: "",
    SecondContact: "",
    ThirdContact: "",
  });
  const [editData, setEditData] = useState(false);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setEscalationInpuData({ ...escalationInputData, [name]: value });
    console.log(escalationInputData);
  };

  const editHandler = () => {
    setEditData(true);
  };
  const updatEscalationHandler = () => {
    const requestBody = {
      escalationData: { id: escalationData.id, ...escalationInputData },
    };
    axios
      .post("http://localhost:8000/api/post-escalation-contacts", requestBody)
      .then((response) => {
        console.log("author", response.data);
        setEscalationData(response.data);
        setEditData(false);
        console.log(escalationData);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get-escalation-contacts")
      .then((response) => {
        console.log("author", response.data);
        setEscalationData(response.data);
        console.log(escalationData);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="modal-escalation">
        <div className="escalation-contents esc-con-left">
          <h2 className="author-head">Escalation Contacts</h2>
          <h3>First Contact</h3>
          <div className="author-data">
            <h3 className="author-dvalue">Name:</h3>
            <h3></h3>
          </div>
          <div className="author-data">
            <h3 className="author-dvalue">Contact number:</h3>
            <h3>{escalationData.FirstContact}</h3>
          </div>
          <h3>Second Contact</h3>
          <div className="author-data">
            <h3 className="author-dvalue">Name:</h3>
            <h3></h3>
          </div>
          <div className="author-data">
            <h3 className="author-dvalue">Contact number:</h3>
            <h3>{escalationData.SecondContact}</h3>
          </div>
          <h3>Third Contact</h3>
          <div className="author-data">
            <h3 className="author-dvalue">Name:</h3>
            <h3></h3>
          </div>
          <div className="author-data">
            <h3 className="author-dvalue">Contact number:</h3>
            <h3>{escalationData.ThirdContact}</h3>
          </div>
          {!editData && (
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

        {editData && (
          <div className="escalation-contents esc-con-right">
            <div>
              <h2 className="author-head">Edit Data</h2>
              <h3 className="contact-prio">First Contact</h3>
              <div className="author-data">
                <h3 className="author-dvalue">Name:</h3>
                <input className="author-input"></input>
              </div>
              <div className="author-data">
                <h3 className="author-dvalue">Contact number:</h3>
                <input
                  name="FirstContact"
                  value={escalationInputData.FirstContact}
                  onChange={handleInputChange}
                  className="author-input"
                ></input>
              </div>
              <h3 className="contact-prio">Second Contact</h3>
              <div className="author-data">
                <h3 className="author-dvalue">Name:</h3>
                <input className="author-input"></input>
              </div>
              <div className="author-data">
                <h3 className="author-dvalue">Contact number:</h3>
                <input
                  className="author-input"
                  name="SecondContact"
                  value={escalationInputData.SecondContact}
                  onChange={handleInputChange}
                ></input>
              </div>
              <h3 className="contact-prio">Third Contact</h3>
              <div className="author-data">
                <h3 className="author-dvalue">Name:</h3>
                <input className="author-input"></input>
              </div>
              <div className="author-data">
                <h3 className="author-dvalue">Contact number:</h3>
                <input
                  className="author-input"
                  name="ThirdContact"
                  value={escalationInputData.ThirdContact}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="btn-align-esc">
                <button
                  className="task-list-button btn-athr"
                  onClick={updatEscalationHandler}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default EscalationProcess;
