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

function SellOrDisposeTable({ date, section, handleQtyChange, totalSellQty }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalAvl, setTotalAvl] = useState(0);

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
      const data = await response.json();
      setJobs(data);
      filter(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHrJobPending();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [filteredJobs]);

  useEffect(() => {
    filter();
  }, [date, section]);

  function filter(data = jobs) {
    if ((date !== "") & (section !== "all")) {
      const filteredObjects = data.filter(
        (job) => (job.created_date == date) & (job.section_id == section)
      );
      setFilteredJobs(filteredObjects);
    } else if (section !== "all") {
      const filteredObjects = data.filter((job) => job.section_id == section);
      setFilteredJobs(filteredObjects);
    } else if (date !== "") {
      const filteredObjects = data.filter((job) => job.created_date == date);
      setFilteredJobs(filteredObjects);
    } else {
      setFilteredJobs(data);
    }
  }

  function calculateTotal() {
    let totalQty = 0;
    let totalAvl = 0;
    filteredJobs.map((job) => {
      totalQty += job.qty;
      totalAvl += job.transferred_to_hr - job.invoiceQty;
      return 0;
    });
    setTotalQty(totalQty);
    setTotalAvl(totalAvl);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={9}
              align="right"
              sx={{
                fontSize: "17px",
                padding: "10px 7px",
                fontWeight: "bold",
                color: "Green",
              }}
            >
              Total:
            </TableCell>
            <TableCell
              sx={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "Green",
                borderRight: "1px solid #1565C0", // specify the border style and color
              }}
            >
              {totalQty.toFixed(2)}
            </TableCell>
            <TableCell
              sx={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "Green",
                borderRight: "1px solid #1565C0", // specify the border style and color
              }}
            >
              {totalAvl.toFixed(2)}
            </TableCell>
            <TableCell
              sx={{
                fontSize: "17px",
                fontWeight: "bold",
                color: "Green",
              }}
            >
              {totalSellQty.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "10px", padding: "10px 7px" }}>
              Date
            </TableCell>
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
          {filteredJobs.map((job) => {
            return (
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "10px 10px 10px 10px",
                  }}
                >
                  {job.created_date}
                </TableCell>
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
                    type="tel"
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
