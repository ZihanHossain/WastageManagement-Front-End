import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "../css/TransferToHrTableRow.module.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import moment from "moment-timezone";

function TransferToHrTableRow(props) {
  const { job, handleTrigger } = props;
  const [open, setOpen] = React.useState(false);
  const [jobDetails, setJobDetails] = React.useState([]);
  const [transferDetails, setTransferDetails] = React.useState([]);

  const getJobDetails = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "server-ip"
        )}/transferToHr/get_job_details`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId: job.id,
          }),
        }
      );
      const json = await response.json();
      setJobDetails(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  const transfer = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/transferToHr/transfer`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transferDetails: transferDetails,
            transfer_by: localStorage.getItem("user_id"),
          }),
        }
      );
      // const json = await response.json();
      if (response.status === 200) {
        handleTrigger();
        getJobDetails();
        let tempDetails = [];
        tempDetails = transferDetails.map((item) => {
          return {
            ...item,
            availableQty: item.availableQty - item.transferQty,
          };
        });
        setTransferDetails(tempDetails);
        NotificationManager.success("Transfer Successful", "Transfer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleQtyChange = (event, id, availableQty) => {
    if (event.target.value > 0) {
      if (transferDetails.length < 1) {
        setTransferDetails([
          {
            jobDetailsId: id,
            transferQty: event.target.value,
            availableQty: availableQty,
          },
        ]);
      } else {
        const newData = transferDetails.map((obj) => {
          if (obj.jobDetailsId === id) {
            return {
              ...obj,
              transferQty: event.target.value,
              availableQty: availableQty,
            };
          } else {
            return obj;
          }
        });

        const existingObj = newData.find((obj) => obj.jobDetailsId === id);
        if (!existingObj) {
          newData.push({
            jobDetailsId: id,
            transferQty: event.target.value,
            availableQty: availableQty,
          });
        }

        setTransferDetails(newData);
      }
    } else {
      event.target.value = "";
    }
  };

  const handleTransfer = () => {
    if (transferDetails.length < 1) {
      NotificationManager.error(`You did not fill anything`, "Error");
    } else {
      const isQtyMoreThanAvailableQty = transferDetails.every(
        (item) => item.transferQty <= item.availableQty
      );
      console.log(transferDetails);
      isQtyMoreThanAvailableQty
        ? transfer()
        : NotificationManager.error(
            `Qty can not be more than Available Qty`,
            "Error"
          );
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {moment.utc(job.created_date).format("MM/DD/YYYY HH:mm:ss")}
        </TableCell>
        <TableCell>{job.job_number}</TableCell>
        <TableCell>{job.section_name}</TableCell>
        <TableCell>{job.type_name}</TableCell>
        <TableCell>{job.active_qty}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Job Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Defect Name</TableCell>
                    <TableCell>Qty(Kg)</TableCell>
                    <TableCell align="right">Available Qty</TableCell>
                    <TableCell align="right">Qty to Transfer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobDetails.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.defect_name}
                      </TableCell>
                      <TableCell>{item.qty}</TableCell>
                      <TableCell align="right">
                        {item.qty - item.transferred_to_hr}
                      </TableCell>
                      <TableCell align="right">
                        <input
                          className={styles.tableInputQty}
                          type="number"
                          //   value={defect.qty || ""}
                          onChange={(event) =>
                            handleQtyChange(
                              event,
                              item.jdId,
                              item.qty - item.transferred_to_hr
                            )
                          }
                        ></input>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={handleTransfer}>
                      Transfer
                    </Button>
                  </TableCell>
                </TableRow>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default TransferToHrTableRow;
