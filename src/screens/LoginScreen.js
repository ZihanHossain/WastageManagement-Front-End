import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, TextField } from "@mui/material";
import styles from "../css/LoginScreen.module.css";

const LoginScreen = () => {
  const [eId, setEID] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/login/validate_login_web`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eId,
            password,
          }),
        }
      );
      const json = await response.json();
      // console.log(json); //json[0] is user info, json[1] is section mapping, json[2] is permission mapping
      if (json.length < 1) {
        setMsg("Wrong Username or password!");
      } else {
        setMsg(""); //set no error message

        //storing necessary information is localStorage of browser for later use

        localStorage.setItem("user_id", json[0].id);
        localStorage.setItem("user_name", json[0].user_name);
        localStorage.setItem(
          "full_name",
          json[0].first_name + " " + json[0].last_name
        );
        const sectionIds = json[1].map((item) => item.section_id);
        localStorage.setItem("mappedSections", sectionIds);
        const userPermission = json[2].map((item) => item.task_name);
        localStorage.setItem("userPermission", userPermission);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.containerStyles}>
      <form onSubmit={handleSubmit} className={styles.formStyles}>
        <img src="/icon.png" className={styles.loginLogo} />
        <label className={styles.title}>Wastage Management Login</label>
        <label className={styles.labelStyles}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="username"
            label="Username"
            name="username"
            value={eId}
            onChange={(event) => setEID(event.target.value)}
            className={styles.inputStyles}
          />
        </label>
        <label className={styles.labelStyles}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.inputStyles}
          />
        </label>
        <button type="submit" className={styles.buttonStyles}>
          Login
        </button>
        <div className={msg.length < 1 ? styles.errorDisable : styles.error}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            <strong>{msg}!</strong>
          </Alert>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
