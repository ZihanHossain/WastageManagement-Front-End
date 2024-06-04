import React, { useEffect, useState } from "react";
import styles from "../css/SellOrDisposeTable.module.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function SellOrDisposeTable({ handleQtyChange, handlePriceChange }) {
  const [jobs, setJobs] = useState([]);

  const handleTableQtyChange = (event, jdId, availableQty) => {
    handleQtyChange(event, jdId, availableQty);
  };

  const getHrJobPending = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "server-ip"
        )}/sellOrDispose/get_hr_job_pending`,
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
    getHrJobPending();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Category
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Section
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Type
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Job No
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Order No
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Article
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Color
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Defect Name
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Qty(Kg)
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Available Qty
            </TableCell>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Discard Qty
            </TableCell>
            {/* <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Price
            </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => {
            return (
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 10px 10px 10px",
                  }}
                >
                  {job.category_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.section_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.type_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.job_number}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.order_number}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.fabric_yarn_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.color_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.defect_name}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.qty}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  {job.transferred_to_hr - job.invoiceQty}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  <input
                    className={styles.tableInputQty}
                    type="number"
                    // value={""}
                    onChange={(event) =>
                      handleTableQtyChange(
                        event,
                        job.jdId,
                        job.transferred_to_hr - job.invoiceQty
                      )
                    }
                  />
                </TableCell>
                {/* <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 7px",
                  }}
                >
                  <input
                    className={styles.tableInputQty}
                    type="number"
                    // value={""}
                    onChange={(event) => handlePriceChange(event, job.jdId)}
                  />
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SellOrDisposeTable;
