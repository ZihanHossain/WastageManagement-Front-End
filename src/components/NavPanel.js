import React, { useEffect, useState } from "react";
import styles from "../css/NavPanel.module.css";
import { Link, useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SellIcon from "@mui/icons-material/Sell";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button, Divider } from "@mui/material";
import UserProfileSettings from "./UserProfileSettings";

const NavPanel = ({ onSetRender }) => {
  const [navSelected, setNavSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState("");
  const [isUserSetOpen, setIsUserSetOpen] = useState(false);

  const handleNavClick = (component) => {
    onSetRender(component);
    setNavSelected(component);
  };

  const handleUserSetOpen = (status) => {
    setIsUserSetOpen(status);
  };

  return (
    <div className={styles.navSection}>
      <div className={styles.navTop}>
        <div className={styles.navUserName}>
          <AccountBoxIcon sx={{ color: "#00ABE4", fontSize: 45 }} />
          <div className={styles.navUserNameText}>
            {localStorage.getItem("full_name")}
          </div>
        </div>
        <div className={styles.userSettings}>
          <Button
            sx={{ padding: "1%", minWidth: "40px" }}
            onClick={() => handleUserSetOpen(true)}
          >
            <ManageAccountsIcon sx={{ color: "#1976D2", fontSize: 25 }} />
          </Button>
        </div>
      </div>
      <Divider color="#BDA590" sx={{ height: "2px" }} />

      <Link
        // to="/final_inspection"
        onClick={handleNavClick}
        className={
          navSelected === "/final_inspection"
            ? styles.navLinkSelected
            : styles.navLink
        }
      >
        <HomeIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
        <div className={styles.navLinkText}>Home</div>
      </Link>
      <Link
        // to="/create-jobs"
        onClick={() => handleNavClick("create_job")}
        className={
          navSelected === "create_job" ? styles.navLinkSelected : styles.navLink
        }
      >
        <AddCircleOutlinedIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
        <div className={styles.navLinkText}>Create Job</div>
      </Link>
      <Link
        onClick={() => handleNavClick("transfer_to_hr")}
        className={
          navSelected === "transfer_to_hr"
            ? styles.navLinkSelected
            : styles.navLink
        }
      >
        <MoveUpIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
        <div className={styles.navLinkText}>Transfer To HR</div>
      </Link>
      <Link
        onClick={() => handleNavClick("sell_dispose")}
        className={
          navSelected === "sell_dispose"
            ? styles.navLinkSelected
            : styles.navLink
        }
      >
        <SellIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
        <div className={styles.navLinkText}>Sell / Dispose</div>
      </Link>
      <Link
        onClick={() => handleNavClick("reports")}
        className={
          navSelected === "reports" ? styles.navLinkSelected : styles.navLink
        }
      >
        <DocumentScannerIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
        <div className={styles.navLinkText}>Reports</div>
      </Link>
      <div
        onClick={() =>
          setShowDropdown(showDropdown == "settings" ? "" : "settings")
        }
        className={styles.navLink}
      >
        <SettingsApplicationsIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
        <div className={styles.navLinkText}>Settings</div>
        {showDropdown === "settings" ? (
          <KeyboardArrowUpIcon
            sx={{
              marginTop: "2%",
              marginLeft: "50%",
              "@media screen and (max-width: 1366px)": {
                marginLeft: "40%",
              },
              color: "#00ABE4",
              fontSize: 20,
            }}
          />
        ) : (
          <KeyboardArrowDownIcon
            sx={{
              marginTop: "2%",
              marginLeft: "50%",
              "@media screen and (max-width: 1366px)": {
                marginLeft: "40%",
              },
              color: "#00ABE4",
              fontSize: 20,
            }}
          />
        )}
      </div>
      <div style={{ display: showDropdown === "settings" ? "block" : "none" }}>
        <Link
          onClick={() => handleNavClick("add_user")}
          className={
            navSelected === "add_user"
              ? styles.navLinkDropdownSelected
              : styles.navLinkDropdown
          }
        >
          <PersonAddIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
          <div className={styles.navLinkDropdownText}>Add User</div>
        </Link>
        <Link
          onClick={() => handleNavClick("user_permission")}
          className={
            navSelected === "user_permission"
              ? styles.navLinkDropdownSelected
              : styles.navLinkDropdown
          }
        >
          <AccountTreeIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
          <div className={styles.navLinkDropdownText}>User Permissions</div>
        </Link>
      </div>
      {isUserSetOpen ? (
        <UserProfileSettings
          isOpen={isUserSetOpen}
          handleClose={handleUserSetOpen}
        />
      ) : null}
    </div>
  );
};

export default NavPanel;
