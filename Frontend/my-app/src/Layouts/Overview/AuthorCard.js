import Card from "@mui/material/Card";
import { useEffect, useState, useMemo } from "react";
import axiosInstance from "utils/axiosinstance";
import Box from "@mui/material/Box";
import UserIcon from "../../assets/profile.png";
import { Typography } from "@mui/material";
import moment from "moment/moment";

const AuthorCard = () => {
  const [authors, setAuthors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
    getAuthors();
  }, []);

  const getAuthors = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/authors`;
    const response = await axiosInstance.get(url);
    if (response.data.success) {
      setAuthors(response.data.data);
    } else {
      setAuthors([]);
    }
  };

  const getUsers = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/users`;
    const response = await axiosInstance.get(url);
    if (response.data.success) {
      setUsers(response.data.data);
    }
  };
  const usersById = useMemo(() => {
    return users.reduce((byId, user) => {
      byId[user.id] = user;
      return byId;
    }, {});
  }, [users]);

  const returnStatus = (author) => {
    const currentTime = moment();
    const startTime = moment(author.startTime, "h:mm a");
    const endTime = moment(author.endTime, "h:mm a");

    if (endTime.isBefore(startTime)) {
      endTime.add(1, "day");
    }
    if (currentTime.isBetween(startTime, endTime)) {
      return "Online";
    } else {
      return "Offline";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: "10px",
        width: "400px",
        padding: "30px",
        paddingBottom: "25px",
      }}
    >
      {!!authors.length &&
        users.length &&
        authors.map((author) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "25px",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={UserIcon}
                style={{ width: "50px", marginRight: "20px" }}
                alt="usericon"
              ></img>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{usersById[author.userId].name}</Typography>
                <Typography variant="caption">
                  {usersById[author.userId].email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  marginRight: "auto",
                  color: returnStatus(author) === "Online" ? "green" : "gray",
                }}
              >
                {returnStatus(author)}
              </Typography>
            </Box>
          </Box>
        ))}
    </Card>
  );
};
export default AuthorCard;
