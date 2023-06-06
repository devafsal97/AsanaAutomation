import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EscalationCard from "./EscalationCard";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toast from "components/Toast/Toast";

import { useState, useMemo, useEffect } from "react";
import axiosInstance from "utils/axiosinstance";

const Escalation = () => {
  const [escalation, setEscalation] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setToastOpen] = useState(false);
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    getUsers();
    getEscalation();
  }, []);

  const toastCloseHandler = () => {
    setToastOpen(false);
  };

  const updateEscalationHandler = async (data) => {
    let url = `${process.env.REACT_APP_ServerUrl}/escalation`;
    const response = await axiosInstance.put(url, data);

    if (response.data.success) {
      console.log(response.data.data);
      const newData = escalation.map((item) => {
        if (item.id === response.data.data.id) {
          return {
            ...response.data.data,
          };
        }
        return item;
      });
      setEscalation(newData);
      setMessage("escalation contact updated successfully");
      setSeverity("success");
      setToastOpen(true);
    } else {
      setMessage(response.data.error);
      setSeverity("error");
      setToastOpen(true);
    }
  };

  const getEscalation = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/escalation`;
    const response = await axiosInstance.get(url);
    if (response.data.success) {
      setEscalation(response.data.data);
    } else {
      setEscalation([]);
    }
  };

  const getUsers = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/users`;

    const response = await axiosInstance.get(url);
    if (response.data.success) {
      setUsers(response.data.data);
    } else {
      setUsers([]);
    }
  };
  const usersById = useMemo(() => {
    return users.reduce((byId, user) => {
      byId[user.id] = user;
      return byId;
    }, {});
  }, [users]);

  return (
    <>
      <Toast
        open={open}
        message={message}
        severity={severity}
        closeHandler={toastCloseHandler}
      ></Toast>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {!!escalation.length &&
          !!users.length &&
          escalation.map((escalation) => (
            <EscalationCard
              key={escalation.id}
              userData={usersById[escalation.userId]}
              escalationData={escalation}
              users={users}
              updateEscalationHandler={updateEscalationHandler}
            ></EscalationCard>
          ))}
      </Box>
    </>
  );
};

export default Escalation;
