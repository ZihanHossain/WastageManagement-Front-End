import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../css/UserProfileSettings.module.css";
import { NotificationManager } from "react-notifications";

function UserProfileSettings({ isOpen, handleClose }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "server-ip"
        )}/settings/update_single_user`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("user_id"),
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            password: password,
          }),
        }
      );
      const res = await response.text();

      if (res === "success") {
        NotificationManager.success("User added successfully", "Add User");
        handleCloseModal();
      } else {
        NotificationManager.error("Something went wrong!", "Add User");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function handleCloseModal() {
    handleClose(false);
  }

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/settings/get_user_info`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: localStorage.getItem("user_id"),
          }),
        }
      );
      const res = await response.json();
      setUserName(res.user_name);
      setPassword(res.password);
      setFirstName(res.first_name);
      setLastName(res.last_name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <Modal open={isOpen} onClose={() => handleCloseModal()}>
        <Box className={styles.box}>
          <Typography className={styles.boxLegend}>
            Edit User Details
          </Typography>
          <div className={styles.inputBoxDetails}>
            <div className={styles.inputRow}>
              <TextField
                variant="outlined"
                margin="normal"
                label="User Name"
                value={userName}
                onChange={(event) => handleChange("userName", event)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Password"
                value={password}
                onChange={(event) => handleChange("password", event)}
              />
            </div>
            <div className={styles.inputRow}>
              <TextField
                variant="outlined"
                margin="normal"
                label="First Name"
                value={firstName}
                onChange={(event) => handleChange("firstName", event)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                label="Last Name"
                value={lastName}
                onChange={(event) => handleChange("lastName", event)}
              />
            </div>
            <div className={styles.saveButton}>
              <Button variant="contained" onClick={() => updateUser()}>
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default UserProfileSettings;
