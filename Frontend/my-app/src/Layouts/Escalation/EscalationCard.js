import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import * as Yup from "yup";

import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "utils/axiosinstance";
import { loggedInContext } from "App";

import { async } from "q";

const EscalationCard = ({
  userData,
  escalationData,
  users,
  updateEscalationHandler,
}) => {
  const [edit, setEditMode] = useState(false);
  //const [selectedUser, setSelectedUser] = useState(null);

  const data = {
    userId: "",
    email: "",
    phoneNumber: "",
  };

  const { auth, setIsLoggedIn } = useContext(loggedInContext);

  const editHandler = () => {
    setEditMode(true);
  };

  const closeHandler = () => {
    setEditMode(false);
  };

  const onSelectedHandler = async (event, formik) => {
    const id = event.target.value;
    const selectedUser = users.find((user) => user.id === id);
    console.log("selectedUSer", selectedUser);
    await formik.setFieldValue("userId", selectedUser.id);
    await formik.setFieldValue("email", selectedUser.email);
    await formik.setFieldValue("phoneNumber", selectedUser.phoneNumber);

    // to update the error messages
    formik.setFieldTouched("userId", true);
    formik.setFieldTouched("email", true);
    formik.setFieldTouched("phoneNumber", true);
  };

  return (
    <Card sx={{ width: "25%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "10px 10px 10px 10px",
          position: "relative",
          minHeight: "342px",
        }}
      >
        {edit === true && auth.currentUser.role === "admin" && (
          <IconButton
            sx={{ position: "absolute", right: "10px", color: "gray" }}
            onClick={closeHandler}
          >
            <CloseIcon />
          </IconButton>
        )}

        {edit === false && auth.currentUser.role === "admin" && (
          <IconButton
            sx={{ position: "absolute", right: "10px", color: "gray" }}
            onClick={editHandler}
          >
            <EditIcon />
          </IconButton>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography variant="subtitle2">priority</Typography>
        </Box>
        <Typography variant="h4">{escalationData.priority}</Typography>

        {edit ? (
          <Formik
            initialValues={data}
            validationSchema={Yup.object({
              userId: Yup.string().required(),
              email: Yup.string().email("Invalid email address").required(),
              phoneNumber: Yup.string()
                .required()
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(10, "Must be exactly 10 digits")
                .max(510, "Must be exactly 10 digits"),
            })}
            onSubmit={(values) => {
              updateEscalationHandler({
                id: escalationData.id,
                userId: values.userId,
                priority: escalationData.priority,
              });
              console.log("values", values);
              setEditMode(false);
            }}
          >
            {(formik) => (
              <Form>
                {console.log({ formik })}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">name</InputLabel>
                  <Select
                    id="userId"
                    name="userId"
                    label="Name"
                    fullWidth
                    value={formik.values.userId}
                    onChange={(value) => onSelectedHandler(value, formik)}
                    sx={{
                      mb: formik.touched.userId && formik.errors.userId ? 0 : 2,
                    }}
                    error={
                      formik.touched.userId && Boolean(formik.errors.userId)
                    }
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
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ mb: 2 }}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  label="PhoneNumber"
                  value={formik.values.phoneNumber}
                  variant="outlined"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  sx={{ mb: 2 }}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  label="submit"
                  fullWidth
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "0px 20px 0px 20px",
            }}
          >
            <Divider sx={{ width: "100%" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "20px", width: "50px" }}
              >
                Name:
              </Typography>
              <Typography>{userData.name}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "20px", width: "50px" }}
              >
                Email:
              </Typography>
              <Typography>{userData.email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ marginRight: "20px", width: "50px" }}
              >
                Phone:
              </Typography>
              <Typography>{userData.phoneNumber}</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default EscalationCard;
