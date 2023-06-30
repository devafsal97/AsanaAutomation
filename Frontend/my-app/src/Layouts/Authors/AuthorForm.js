import Drawer from "components/Drawer";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Authors from "./Authors";
import { useEffect, useState } from "react";
import axiosInstance from "utils/axiosinstance";
import { Identity } from "@mui/base";
import { margin } from "@mui/system";

const AuthorForm = ({ isOpen, toggleDrawer, addAuthorHandler }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const data = {
    userId: "",
    startTime: null,
    endTime: null,
  };

  const onDateChangeHandler = (date, formik, key) => {
    if (key == "startTime") {
      formik.setFieldValue("startTime", date);
      setStartDate(
        new Date(date.$d).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
    } else {
      setEndDate(
        new Date(date.$d).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
      formik.setFieldValue("endTime", date);
    }
  };

  const getUsers = async () => {
    let url = `${process.env.REACT_APP_ServerUrl}/users`;
    const response = await axiosInstance.get(url);
    setUsers(response.data.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Drawer isOpen={isOpen} onClose={toggleDrawer} title="Create Author">
      <Formik
        initialValues={data}
        validationSchema={Yup.object({
          userId: Yup.string().required("name is required"),
          startTime: Yup.string().required("starttime is required"),
          endTime: Yup.string().required("endtime is required"),
        })}
        onSubmit={(values) => {
          addAuthorHandler({
            userId: values.userId,
            startTime: startDate,
            endTime: endDate,
          });
        }}
      >
        {(formik) => (
          <Form>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">name</InputLabel>
              <Select
                id="userId"
                name="userId"
                label="Name"
                fullWidth
                value={formik.values.userId}
                onChange={formik.handleChange}
                sx={{
                  mb: formik.touched.userId && formik.errors.userId ? 0 : 2,
                }}
                error={formik.touched.userId && Boolean(formik.errors.userId)}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
              <ErrorMessage name="userId">
                {(msg) => (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginLeft: "14px",
                      marginBottom: "14px",
                    }}
                  >
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimePicker"]}
                sx={{
                  mb:
                    formik.touched.startTime && Boolean(formik.errors.startTime)
                      ? 0
                      : 2,
                }}
              >
                <TimePicker
                  label="start time"
                  value={formik.values.startTime}
                  onChange={(value) => {
                    onDateChangeHandler(value, formik, "startTime");
                  }}
                  error={
                    formik.touched.startTime && Boolean(formik.errors.startTime)
                  }
                  helperText={
                    formik.touched.startTime && formik.errors.startTime
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
            <ErrorMessage name="startTime">
              {(msg) => (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "14px",
                    marginBottom: "14px",
                  }}
                >
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["TimePicker"]}
                sx={{
                  mb:
                    formik.touched.endTime && Boolean(formik.errors.endTime)
                      ? 0
                      : 2,
                }}
              >
                <TimePicker
                  label="end time"
                  value={formik.values.endTime}
                  onChange={(value) =>
                    onDateChangeHandler(value, formik, "endTime")
                  }
                  error={
                    formik.touched.endTime && Boolean(formik.errors.endTime)
                  }
                  helperText={formik.touched.endTime && formik.errors.endTime}
                />
              </DemoContainer>
            </LocalizationProvider>
            <ErrorMessage name="endTime">
              {(msg) => (
                <div
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginLeft: "14px",
                    marginBottom: "14px",
                  }}
                >
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <Button type="submit" variant="contained">
              submit
            </Button>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default AuthorForm;
