import React, { useEffect, useState } from "react";
import styles from "../css/Users.module.css";
import ExistingUsers from "./ExistingUsers";

function AddUser() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const permissions = localStorage
      .getItem("userPermission")
      ?.split(/\s*,\s*/);

    if (permissions && permissions.includes("transfer_to_hr_screen")) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  if (!authorized) {
    return <div>You do not have permission for this screen!</div>;
  }

  return (
    <div className={styles.mainSection}>
      <div className={styles.heading}>
        <span className={styles.headingText}>All Users</span>
      </div>

      <div className={styles.workSection}>
        <ExistingUsers />
      </div>
    </div>
  );
}

export default AddUser;
