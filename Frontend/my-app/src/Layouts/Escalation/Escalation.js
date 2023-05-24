import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EscalationCard from "./EscalationCard";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

import { useState, useMemo, useEffect } from "react";
import axiosInstance from "utils/axiosinstance";

const Escalation = () => {
  const [escalation, setEscalation] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    getEscalation();
  }, []);

  const updateEscalationHandler = async (data) => {
    let url = `http://localhost:8000/escalation`;
    try {
      const response = await axiosInstance.put(url, data);

      const newData = escalation.map((item) => {
        if (item.id === response.data.id) {
          return {
            ...response.data,
          };
          return item;
        }
        return item;
      });

      setEscalation(newData);
    } catch (error) {
      console.log("new data", error);
    }
  };

  const getEscalation = async () => {
    let url = `http://localhost:8000/escalation`;
    try {
      const response = await axiosInstance.get(url);
      setEscalation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    let url = `http://localhost:8000/users`;
    try {
      const response = await axiosInstance.get(url);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
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
