import React, { useEffect, useState } from "react";
import styles from "../css/NavPanel.module.css";
import { Link, useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import SellIcon from "@mui/icons-material/Sell";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";

const NavPanel = ({ onSetRender }) => {
  const [navSelected, setNavSelected] = useState("");

  const handleNavClick = (component) => {
    onSetRender(component);
    setNavSelected(component);
  };

  return (
    <div className={styles.navSection}>
      <div className={styles.navUserName}>
        <AccountBoxIcon sx={{ color: "#00ABE4", fontSize: 45 }} />
        <div className={styles.navLinkText}>
          {localStorage.getItem("full_name")}
        </div>
      </div>
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
      {/* <Link
        to="/add_high_defects"
        className={
          location.pathname === "/add_high_defects"
            ? styles.navLinkSelected
            : styles.navLink
        }
      >
        <PriorityHighIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
        <div className={styles.navLinkText}>No of High Defects</div>
      </Link> */}

      {/* <div
        onClick={() =>
          setShowDropdown(showDropdown == "settings" ? "" : "settings")
        }
        className={
          location.pathname === "/configuration"
            ? styles.navLinkSelected
            : styles.navLink
        }
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
      </div> */}
      {/* <div style={{ display: showDropdown === "settings" ? "block" : "none" }}>
        <Link
          to="/add_user"
          className={
            location.pathname === "/configuration"
              ? styles.navLinkSelected
              : "nav-link-dropdown"
          }
        >
          <PersonAddIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
          <div className={styles.navLinkText}>Add User</div>
        </Link>
        <Link
          to="/user_permission"
          className={
            location.pathname === "/configuration"
              ? styles.navLinkSelected
              : "nav-link-dropdown"
          }
        >
          <AccountTreeIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
          <div className={styles.navLinkText}>User Permissions</div>
        </Link>
        <Link
          to="/add_machines"
          className={
            location.pathname === "/configuration"
              ? styles.navLinkSelected
              : "nav-link-dropdown"
          }
        >
          <PrecisionManufacturingIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
          <div className={styles.navLinkText}>Add Machines</div>
        </Link>
        <Link
          to="/add_defects"
          className={
            location.pathname === "/configuration"
              ? styles.navLinkSelected
              : "nav-link-dropdown"
          }
        >
          <AnnouncementIcon sx={{ color: "#00ABE4", fontSize: 20 }} />
          <div className={styles.navLinkText}>Add Defects</div>
        </Link>
      </div> */}
    </div>
  );
};

export default NavPanel;
