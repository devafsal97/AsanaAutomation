import Drawer from "components/Drawer";
import { Formik, Field, Form, ErrorMessage } from "formik";

import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "components/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const UserForm = ({ isOpen, toggleDrawer, user = {}, addUserHandler }) => {
  const data = {
    ...{
      name: "",
      email: "",
      phoneNumber: "",
      role: "user",
    },
    ...user,
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={toggleDrawer}
      title={user ? "Edit User" : "Create User"}
    >
      <Formik
        initialValues={data}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          phoneNumber: Yup.string()
            .required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, "Must be exactly 10 digits")
            .max(510, "Must be exactly 10 digits"),
          role: Yup.string().required("Required"),
        })}
        onSubmit={(values) => {
          addUserHandler(values);
        }}
      >
        {(formik) => (
          <Form>
            <TextField
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              variant="outlined"
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 2 }}
              fullWidth
            />
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
            />
            <TextField
              id="phoneNumber"
              name="phoneNumber"
              label="PhoneNumber"
              value={formik.values.phoneNumber}
              variant="outlined"
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              sx={{ mb: 2 }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>

              <Select
                id="role"
                name="role"
                label="Role"
                sx={{ mb: 2 }}
                fullWidth
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
            <Button size="large" type="submit" label="submit" />
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default UserForm;
