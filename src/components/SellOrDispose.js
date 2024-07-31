import React, { useEffect, useState } from "react";
import styles from "../css/SellOrDispose.module.css";
import SellOrDisposeTable from "./SellOrDisposeTable";
import { Button } from "@mui/material";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import RecyclingIcon from "@mui/icons-material/Recycling";

import "../../node_modules/react-datepicker/dist/react-datepicker.css";

function SellOrDispose() {
  const [type, setType] = useState(1); //1 = Dispose, 2 = Sell. By default order type is selected to Dispose.
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState(1);
  const [sections, setSections] = useState([]);
  const [sellDetails, setSellDetails] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [formatedDate, setFormatedDate] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [totalSellQty, setTotalSellQty] = useState(0);

  // const toggleRefreshTable = () => {
  //   setRefreshTable(!refreshTable);
  // };

  const changeOrderType = (type) => {
    setType(type);
    if (type === 2) {
      getCustomers(type);
    }
  };

  const changeCustomer = (event) => {
    setCustomer(event.target.value);
  };

  const changeSectionFilter = (event) => {
    setSectionFilter(event.target.value);
  };

  const onSellPress = () => {
    if (sellDetails.length < 1) {
      NotificationManager.error(`You did not fill anything`, "Error");
    } else {
      const isPriceAndSellQtySet = sellDetails.every(
        (item) => item.price && item.sellQty
      );

      const isSellQtyMoreThanAvailableQty = sellDetails.every(
        (item) => item.sellQty <= item.availableQty
      );

      isPriceAndSellQtySet
        ? isSellQtyMoreThanAvailableQty
          ? createInvoice()
          : NotificationManager.error(
              `Discard Qty can not be more than Available Qty`,
              "Error"
            )
        : NotificationManager.error(
            "Please fill up Price and Discard Qty both",
            "Error"
          );
    }
  };

  const handleQtyChange = (event, id, availableQty) => {
    const value = parseFloat(event.target.value);

    if (value === 0 || event.target.value === "") {
      // Remove the record if value is 0 or an empty string
      const updatedSellDetails = sellDetails.filter(
        (obj) => obj.jobDetailsId !== id
      );
      setSellDetails(updatedSellDetails);
      event.target.value = ""; // Optional: Clear the input field if you want
    } else if (value > 0) {
      if (sellDetails.length < 1) {
        setSellDetails([
          {
            jobDetailsId: id,
            sellQty: value,
            availableQty,
            price: "0",
          },
        ]);
      } else {
        const newData = sellDetails.map((obj) => {
          if (obj.jobDetailsId === id) {
            return {
              ...obj,
              sellQty: value,
              availableQty,
              price: "0",
            };
          } else {
            return obj;
          }
        });

        const existingObj = newData.find((obj) => obj.jobDetailsId === id);
        if (!existingObj) {
          newData.push({
            jobDetailsId: id,
            sellQty: value,
            availableQty: availableQty,
            price: "0",
          });
        }

        setSellDetails(newData);
      }
    } else {
      event.target.value = "";
    }
  };

  function calculateTotalSellQty() {
    let totalSellQty = 0;
    sellDetails.map((item) => {
      totalSellQty += item.sellQty;
      return 0;
    });
    setTotalSellQty(totalSellQty);
  }

  useEffect(() => {
    calculateTotalSellQty();
  }, [sellDetails]);

  // const handlePriceChange = (event, id) => {
  //   if (event.target.value > 0) {
  //     if (sellDetails.length < 1) {
  //       setSellDetails([{ jobDetailsId: id, price: event.target.value }]);
  //     } else {
  //       const newData = sellDetails.map((obj) => {
  //         if (obj.jobDetailsId === id) {
  //           return { ...obj, price: event.target.value };
  //         } else {
  //           return obj;
  //         }
  //       });

  //       const existingObj = newData.find((obj) => obj.jobDetailsId === id);
  //       if (!existingObj) {
  //         newData.push({
  //           jobDetailsId: id,
  //           price: event.target.value,
  //         });
  //       }

  //       setSellDetails(newData);
  //     }
  //   } else {
  //     event.target.value = "";
  //   }
  // };

  const createInvoice = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "server-ip"
        )}/sellOrDispose/createInvoice`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: type,
            customer: customer,
            sellDetails: sellDetails,
            sold_by: localStorage.getItem("user_id"),
          }),
        }
      );
      // const json = await response.json();
      if (response.status === 201) {
        NotificationManager.success("Invoice Created Successfully", "Success");
        // toggleRefreshTable();
        setRefreshTable(!refreshTable);
        setSellDetails([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomers = async (type1) => {
    let sellType = type1 == null ? type : type1;
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "server-ip"
        )}/sellOrDispose/get_customers`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: sellType,
          }),
        }
      );
      const json = await response.json();
      setCustomers(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getSections = async (type1) => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem(
          "server-ip"
        )}/sellOrDispose/get_sections`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      setSections(json);
    } catch (error) {
      console.error(error);
    }
  };

  const formateDate = (date) => {
    const startDate = new Date(date);
    const year = startDate.getFullYear();
    const month = String(startDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(startDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setFormatedDate(formateDate(date));
  };

  useEffect(() => {
    const permissions = localStorage
      .getItem("userPermission")
      ?.split(/\s*,\s*/);

    if (permissions && permissions.includes("sell_or_dispose_screen")) {
      setUserPermissions(permissions);
      setAuthorized(true);
      getCustomers();
      getSections();
    } else {
      setAuthorized(false);
    }
  }, []);

  if (!authorized) {
    return <div>You do not have permission for this screen!</div>;
  }

  return (
    <div className={styles.mainSection}>
      <div className={styles.sectionNormal}>
        <div className={styles.legend}>
          <div className={styles.legendText}>Filters</div>
        </div>
        <div className={styles.filterSection}>
          <div className={styles.rowNormal}>
            <div className={styles.rowItem}>
              <div>Date:</div>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  handleDateChange(date);
                }}
              />
            </div>
          </div>
          <div className={styles.rowNormal}>
            <div className={styles.rowItem}>
              <div>Section:</div>
              <select
                id="dropdown"
                value={sectionFilter}
                onChange={changeSectionFilter}
                className={styles.rowItemDropdown}
              >
                <option key={500} value={"all"}>
                  All
                </option>
                {sections.map((option) => {
                  return (
                    <option key={option.id} value={option.id}>
                      {option.section_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.rowNormal}>
          <div className={styles.rowItem}>
            <div>
              Type: <span> *</span>
            </div>
            <div className={styles.rowItemInput}>
              <button
                className={
                  type === 1
                    ? styles.orderTypeButtonSelected
                    : styles.orderTypeButton
                }
                onClick={() => changeOrderType(1)}
              >
                Dispose
              </button>
              <button
                className={
                  type === 2
                    ? styles.orderTypeButtonSelected
                    : styles.orderTypeButton
                }
                onClick={() => changeOrderType(2)}
              >
                Sell
              </button>
            </div>
          </div>
        </div>
        {type === 2 ? (
          <div className={styles.rowNormal}>
            <div className={styles.rowItem}>
              <div>
                Customer: <span> *</span>
              </div>
              <select
                id="dropdown"
                value={customer}
                onChange={changeCustomer}
                className={styles.rowItemDropdown}
              >
                {customers.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.customer_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : null}

        <div className={styles.rowItemSellButton}>
          <Button variant="contained" onClick={onSellPress}>
            Dispose -
            <RecyclingIcon sx={{ color: "#FFFFFF", fontSize: 25 }} />
          </Button>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.table}>
          <SellOrDisposeTable
            handleQtyChange={handleQtyChange}
            // handlePriceChange={handlePriceChange}
            date={formatedDate}
            section={sectionFilter}
            totalSellQty={totalSellQty}
            key={refreshTable}
          />
        </div>
      </div>
    </div>
  );
}

export default SellOrDispose;
