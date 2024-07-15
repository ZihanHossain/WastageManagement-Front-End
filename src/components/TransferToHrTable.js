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
} from "@mui/material";
import TransferToHrTableRow from "./TransferToHrTableRow";

function TransferToHrTable() {
  const [jobs, setJobs] = useState([]);
  const [sectionFilter, setSectionFilter] = useState("all");
  const [permittedSections, setPermittedSections] = useState([]);

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
      setJobs(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobs();
    let mappedSections = localStorage
      .getItem("mappedSections")
      .split(/\s*,\s*/);
    setPermittedSections(mappedSections);
  }, []);

  const triggerTransfer = () => {
    getJobs();
  };

  const changeSectionFilter = (event) => {
    setSectionFilter(event.target.value);
  };

  return (
    <div>
      <div className={styles.rowItem}>
        <div className={styles.legend}>Section:</div>
        <select
          id="dropdown"
          value={sectionFilter}
          onChange={changeSectionFilter}
          className={styles.rowItemDropdown}
        >
          <option key={500} value={"all"}>
            All
          </option>
          {permittedSections.map((option) => {
            for (const job of jobs) {
              if (job.section_id === option) {
                return (
                  <option key={option} value={option}>
                    {job.section_name}
                  </option>
                );
              }
            }
          })}
        </select>
      </div>

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
              <TableCell>Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) =>
              localStorage.getItem("mappedSections").includes(job.section_id) &
              (sectionFilter == "all" || sectionFilter == job.section_id) ? (
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
    </div>
  );
}

export default TransferToHrTable;
