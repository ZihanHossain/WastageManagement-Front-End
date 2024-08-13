import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import styles from "../css/ExistingUsers.module.css";
import { NotificationManager } from "react-notifications";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

function ExistingUsers() {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(0);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sections, setSections] = React.useState([]);
  const [checked, setChecked] = React.useState([]);
  const [modalMood, setModalMood] = React.useState(1); // 1 is from add user and 2 is for update user

  const getUsers = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/settings/get_users`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllSections = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/settings/get_all_sections`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setSections(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserSectionMapping = async (userId) => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "server-ip"
        )}/settings/get_user_section_mapping`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
          }),
        }
      );
      const json = await response.json();

      setChecked(json);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/settings/update_user`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
            checked: checked,
          }),
        }
      );
      const res = await response.text();

      if (res === "success") {
        NotificationManager.success("User updated successfully", "Edit User");
        getUsers();
        handleCloseModal();
      } else {
        NotificationManager.error("Something went wrong!", "Edit User");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/settings/add_user`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
            checked: checked,
          }),
        }
      );
      const res = await response.text();

      if (res === "success") {
        NotificationManager.success("User added successfully", "Add User");
        getUsers();
        handleCloseModal();
      } else {
        NotificationManager.error("Something went wrong!", "Add User");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleUser = async (userId, status) => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/settings/toggle_user`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userId,
            status: status,
          }),
        }
      );
      const res = await response.text();

      if (res === "success") {
        NotificationManager.success(
          "User status changed successfully",
          "Active Status"
        );
        getUsers();
        handleCloseModal();
      } else {
        NotificationManager.error("Something went wrong!", "Active Status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
    getAllSections();
  }, []);

  function handleCloseModal() {
    setOpenModal(false);
    setUserName("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setId("");
    setChecked([]);
  }

  function handleOpenModal(userId, user_name, password, first_name, last_name) {
    setOpenModal(true);
    setModalMood(2);
    setUserName(user_name);
    setPassword(password);
    setFirstName(first_name);
    setLastName(last_name);
    setId(userId);
    getUserSectionMapping(userId);
  }

  function handleOpenModalAdd() {
    setOpenModal(true);
    setModalMood(1);
  }

  function handleChange(type, event) {
    if (type === "userName") {
      setUserName(event.target.value);
    }
    if (type === "password") {
      setPassword(event.target.value);
    }
    if (type === "firstName") {
      setFirstName(event.target.value);
    }
    if (type === "lastName") {
      setLastName(event.target.value);
    }
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <div>
      <div className={styles.topButtons}>
        <Button onClick={() => handleOpenModalAdd()}>
          <PersonAddAltIcon />
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Active Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.user_name}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    {user.first_name + " " + user.last_name}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        handleOpenModal(
                          user.id,
                          user.user_name,
                          user.password,
                          user.first_name,
                          user.last_name
                        )
                      }
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    {user.active == false ? (
                      <Button onClick={() => toggleUser(user.id, !user.active)}>
                        <ToggleOffIcon sx={{ color: "yellow" }} />
                      </Button>
                    ) : (
                      <Button onClick={() => toggleUser(user.id, !user.active)}>
                        <ToggleOnIcon sx={{ color: "#1976D2" }} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box className={styles.box}>
          <Typography className={styles.boxLegend}>Edit User</Typography>
          <div className={styles.inputBoxDetails}>
            <div className={styles.inputBoxLeft}>
              <div className={styles.inputRow}>
                <TextField
                  className={styles.inputBoxI}
                  variant="outlined"
                  margin="normal"
                  label="User Name"
                  value={userName}
                  onChange={(event) => handleChange("userName", event)}
                />
                <TextField
                  className={styles.inputBoxI}
                  variant="outlined"
                  margin="normal"
                  label="Password"
                  value={password}
                  onChange={(event) => handleChange("password", event)}
                />
              </div>
              <div className={styles.inputRow}>
                <TextField
                  className={styles.inputBoxI}
                  variant="outlined"
                  margin="normal"
                  label="First Name"
                  value={firstName}
                  onChange={(event) => handleChange("firstName", event)}
                />
                <TextField
                  className={styles.inputBoxI}
                  variant="outlined"
                  margin="normal"
                  label="Last Name"
                  value={lastName}
                  onChange={(event) => handleChange("lastName", event)}
                />
              </div>
            </div>
            <div className={styles.inputBoxRight}>
              <div className={styles.listL}>Mapped Sections</div>
              <div className={styles.list}>
                <List className={styles.listBox}>
                  {sections.map((section) => {
                    const labelId = `checkbox-list-label-${section.id}`;

                    return (
                      <ListItem key={section.id} disablePadding>
                        <ListItemButton
                          role={undefined}
                          onClick={handleToggle(section.id)}
                          dense
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(section.id) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ "aria-labelledby": labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={section.section_name}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            {modalMood === 2 ? (
              <Button variant="contained" onClick={() => updateUser()}>
                Update
              </Button>
            ) : (
              <Button variant="contained" onClick={() => addUser()}>
                Add User
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ExistingUsers;
