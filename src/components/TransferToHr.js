import React, { useEffect, useState } from "react";
import styles from "../css/TransferToHr.module.css";
import TransferToHrTable from "./TransferToHrTable";

function TransferToHr() {
  return (
    <div className={styles.mainSection}>
      <div className={styles.row}>
        <div className={styles.table}>
          <TransferToHrTable />
        </div>
      </div>
    </div>
  );
}

export default TransferToHr;
