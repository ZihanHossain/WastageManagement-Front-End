import { Button } from "@mui/material";
import React, { useState } from "react";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/HeaderBar.module.css";

const HeaderBar = ({ title, module }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.topSection}>
      <div className={styles.topSectionLeft}>
        <div className={styles.logo}>
          <div>Wastage Management</div>
          {/* <img src="/icon.png" className="logo" /> */}
        </div>
      </div>

      <div className={styles.topSectionRight}>
        <Button
          variant="outlined"
          style={{
            color: "#00ABE4",
            backgroundColor: "white",
            minWidth: "none",
            padding: "5px 10%", // Adjust the padding as needed
            border: "none",
            marginRight: "10%",
          }}
          startIcon={<LogoutTwoToneIcon />}
          onClick={() => {
            localStorage.removeItem("user_name");
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default HeaderBar;
