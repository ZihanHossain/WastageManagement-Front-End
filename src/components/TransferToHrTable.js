import React, { useEffect, useState } from "react";
import styles from "../css/TransferToHrTable.module.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TransferToHrTableRow from "./TransferToHrTableRow";

function TransferToHrTable() {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/transferToHr/get_jobs`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      console.log(json);
      setJobs(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const triggerTransfer = () => {
    getJobs();
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Job Number</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Remaining Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) =>
            localStorage.getItem("mappedSections").includes(job.section_id) ? (
              <TransferToHrTableRow
                key={job.id}
                job={job}
                handleTrigger={triggerTransfer}
              />
            ) : null
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransferToHrTable;
