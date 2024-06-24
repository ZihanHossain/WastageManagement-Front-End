import React, { useEffect, useState } from "react";
import styles from "../css/TransferToHr.module.css";
import TransferToHrTable from "./TransferToHrTable";

function TransferToHr() {
  const [userPermissions, setUserPermissions] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const permissions = localStorage
      .getItem("userPermission")
      ?.split(/\s*,\s*/);

    if (permissions && permissions.includes("transfer_to_hr_screen")) {
      setUserPermissions(permissions);
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
        <span className={styles.headingText}>Transfer To Hr</span>
      </div>

      <div className={styles.row}>
        <div className={styles.table}>
          <TransferToHrTable />
        </div>
      </div>
    </div>
  );
}

export default TransferToHr;
