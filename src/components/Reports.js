import React, { useEffect, useState } from "react";

import styles from "../css/Reports.module.css";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function Reports() {
  return (
    <div className={styles.mainSection}>
      <div className={styles.heading}>
        <span className={styles.headingText}>Reports</span>
      </div>
      <div className={styles.row}>
        <div className={styles.reportCard}>
          <Link to="http://administrator:masterpass@10.12.3.182/ReportServer/Pages/ReportViewer.aspx?%2fWastage+Management+System%2fDaily+Section-Wise+WastageRejection+Details&rs:Command=Render">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://1.bp.blogspot.com/-nzm908Pfunw/VqXgeRNp4LI/AAAAAAAACJI/wgeVntLSIT8/w1200-h630-p-k-no-nu/status-report.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h8" component="div">
                    Daily Section Wise Wastage Rejection Details
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className={styles.reportCard}>
          <Link to="http://administrator:masterpass@10.12.3.182/ReportServer/Pages/ReportViewer.aspx?%2fWastage+Management+System%2fDaily+Wastage+Dispose-Sold+Details&rs:Command=Render">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://1.bp.blogspot.com/-nzm908Pfunw/VqXgeRNp4LI/AAAAAAAACJI/wgeVntLSIT8/w1200-h630-p-k-no-nu/status-report.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h8" component="div">
                    Daily Wastage Dispose-Sold Details
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
        <div className={styles.reportCard}>
          <Link to="http://administrator:masterpass@10.12.3.182/ReportServer/Pages/ReportViewer.aspx?%2fWastage+Management+System%2fInvoice+Printing&rs:Command=Render">
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://1.bp.blogspot.com/-nzm908Pfunw/VqXgeRNp4LI/AAAAAAAACJI/wgeVntLSIT8/w1200-h630-p-k-no-nu/status-report.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h8" component="div">
                    Invoice Printing
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Reports;
