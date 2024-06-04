//This is the job Entry screen from where jobs will be entered.

import React, { useEffect, useState } from "react";
import styles from "../css/JobEntry.module.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchableDropdown from "./SearchableDropdown";
import { NotificationManager } from "react-notifications";

const today = new Date();

const formattedDate = today.toLocaleDateString();

function JobEntry() {
  const [orderType, setOrderType] = useState(1); //1 = T-Aps, 2 = AOP and 3 = Others. By default order type is selected to T-Aps.
  const [orderNumber, setOrderNumber] = useState("");
  const [orderNumbers, setOrderNumbers] = useState([]);
  const [orderNumberExists, setOrderNumberExists] = useState(false);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState("");
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState("");
  const [defectCategories, setdefectCategories] = useState([
    { id: "", category_name: "Select a Category" },
  ]); //This variable will be filled from database.
  const [defectCategory, setdefectCategory] = useState(""); //This variable is for -> select opion of wastage category
  const [sections, setSections] = useState([
    { id: "", section_name: "Select a Section" },
  ]); //This variable will be filled from database.
  const [section, setSection] = useState(""); //This variable is for -> select opion of section
  const [jobTypes, setJobTypes] = useState([
    { id: "", type_name: "Select a Type" },
  ]); //job type eg: Wastage and Rejection. This variable will be filled from database.
  const [jobType, setJobType] = useState(""); //This variable is for -> select opion of job type eg: Wastage or Rejection
  const [jobDetails, setJobDetails] = useState([]); //This variable will hold all the defects and it will uopdate according to catagory and job type.
  const [remarks, setRemarks] = useState("");

  const changeOrderType = (type) => {
    setOrderType(type);
  };

  const handleArticleChange = (value) => {
    setArticle(value);
  };

  const handleCreateArticle = async (value) => {
    if (article.length < 1) {
      NotificationManager.error("Article can not be empty", "Article");
    } else {
      let response = await createArticle();
      console.log(response[0]);
      if (response[0] > 0) {
        NotificationManager.success("Article Created", "Article");
        getArticles();
      }
    }
  };

  const handleColorChange = (value) => {
    setColor(value);
  };

  const handleCreateColor = async (value) => {
    if (color.length < 1) {
      NotificationManager.error("Color can not be empty", "Color");
    } else {
      let response = await createColor();
      console.log(response[0]);
      if (response[0] > 0) {
        NotificationManager.success("Color Created", "Color");
        getColors();
      }
    }
  };

  const changeCategory = (event) => {
    setdefectCategory(event.target.value);
  };

  const changeSection = (event) => {
    setSection(event.target.value);
  };

  const changeJobType = (event) => {
    setJobType(event.target.value);
  };

  const handleQtyChange = (event, defectCode) => {
    if (event.target.value >= 0 || event.target.value == "") {
      const updatedJobDetails = jobDetails.map((defect) => {
        if (defect.defect_code === defectCode) {
          return { ...defect, qty: parseFloat(event.target.value) };
        }
        return defect;
      });

      setJobDetails(updatedJobDetails);
    } else {
      event.target.value = "";
    }
  };

  const handleCmtChange = (event, defectCode) => {
    const updatedJobDetails = jobDetails.map((defect) => {
      if (defect.defect_code === defectCode) {
        return { ...defect, comment: event.target.value };
      }
      return defect;
    });

    setJobDetails(updatedJobDetails);
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleOrderNumberChangeTaps = (value) => {
    setOrderNumber(value);
    orderNumbers.map((order) => {
      if (order.orderNo === value) {
        setArticle(order.article);
        setColor(order.color);
      }
    });
  };

  const handleOrderNumberChange = (event) => {
    setOrderNumber(event.target.value);
  };

  const handleOrderNumberBlur = () => {
    if (orderType != 1) {
      getOrder();
    }
  };

  const handleCreateJob = () => {
    if (article.length < 1) {
      NotificationManager.error("Select an article", "Article");
    } else if (color.length < 1) {
      NotificationManager.error("Select an color", "Color");
    } else if (defectCategory.length < 1) {
      NotificationManager.error("Select a defect category", "Defect Category");
    } else if (section.length < 1) {
      NotificationManager.error("Select a section", "Section");
    } else if (jobType.length < 1) {
      NotificationManager.error("Select a type", "Type");
    } else {
      createJob();
    }
  };

  //Start API calls

  //gets all the necessary master data after landing on this page.
  const getMasterData = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/get_master_data`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      const updatedDefectCategories = [
        { id: "", category_name: "Select a Category" },
        ...json.defectCategories,
      ]; //adding one new entry with database result so that the first option could be value:'' and title: Select something
      setdefectCategories(updatedDefectCategories);
      const updatedJobTypes = [
        { id: "", type_name: "Select a Type" },
        ...json.wastageTypes,
      ]; //adding one new entry with database result so that the first option could be value:'' and title: Select something
      setJobTypes(updatedJobTypes);
      const updatedSections = [
        { id: "", section_name: "Select a Section" },
        ...json.sections,
      ]; //adding one new entry with database result so that the first option could be value:'' and title: Select something
      setSections(updatedSections);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrder = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/get_order`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderNumber: orderNumber,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.length > 0) {
        setArticle(json[0].fabric_yarn_name);
        setColor(json[0].color_name);
        setOrderNumberExists(true);
      } else {
        setArticle("");
        setColor("");
        setOrderNumberExists(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getArticles = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/get_articles`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            article: article,
          }),
        }
      );
      const json = await response.json();
      setArticles(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getTapsOrders = async (order) => {
    try {
      const response = await fetch(
        `http://10.12.3.182:3010/tapsConnect/get_taps_order`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderNumber: order,
          }),
        }
      );
      const json = await response.json();
      setOrderNumbers(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  //this API is to create article if the article is not found in the dropdown
  const createArticle = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/create_article`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            article: article,
          }),
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getColors = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/get_colors`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            color: color,
          }),
        }
      );
      const json = await response.json();
      setColors(json);
    } catch (error) {
      console.error(error);
    }
  };

  const createColor = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/create_color`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            color: color,
          }),
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  //gets defect after defect catagory and job type is selected
  const getDefects = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/get_defects`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            defectCategory: defectCategory,
            jobType: jobType,
          }),
        }
      );
      const json = await response.json();
      let jobDetails = [];
      json.forEach((defect) => {
        jobDetails.push({
          defect_id: defect.id,
          defect_code: defect.defect_code,
          defect_name: defect.defect_name,
          qty: null,
          comment: null,
        });
      });
      setJobDetails(jobDetails);
    } catch (error) {
      console.error(error);
    }
  };

  //creates the job after Create Job button is pressed
  const createJob = async () => {
    try {
      const response = await fetch(
        `http://${localStorage.getItem("server-ip")}/jobCreate/create_job`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderType: orderType,
            orderNumber: orderNumber,
            article: article,
            color: color,
            defectCategory: defectCategory,
            jobType: jobType,
            section: section,
            jobDetails: jobDetails,
            remarks: remarks,
            created_by: localStorage.getItem("user_id"),
          }),
        }
      );
      if (response.status) {
        setOrderNumber("");
        setArticle("");
        setColor("");
        getDefects();
        NotificationManager.success("Job Created", "Job");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //End API calls

  useEffect(() => {
    getMasterData();
  }, []);

  useEffect(() => {
    if (jobType != "") {
      getDefects();
    }
  }, [defectCategory, jobType]); //after selecting type getDefects() will be called

  return (
    <div className={styles.mainSection}>
      <div className={styles.heading}>
        <span className={styles.headingText}>Create Job</span>
      </div>
      <div className={styles.row}>
        <div className={styles.rowItem}>
          <div>Date:</div>
          <div className={styles.rowItemInput}>{formattedDate}</div>
        </div>
        <div className={styles.rowItem}>
          <div>
            Select Order Type:<span> *</span>
          </div>
          <div className={styles.rowItemInput}>
            <button
              className={
                orderType == 1
                  ? styles.orderTypeButtonSelected
                  : styles.orderTypeButton
              }
              onClick={() => changeOrderType(1)}
            >
              T-Aps
            </button>
            <button
              className={
                orderType == 2
                  ? styles.orderTypeButtonSelected
                  : styles.orderTypeButton
              }
              onClick={() => changeOrderType(2)}
            >
              AOP
            </button>
            <button
              className={
                orderType == 3
                  ? styles.orderTypeButtonSelected
                  : styles.orderTypeButton
              }
              onClick={() => changeOrderType(3)}
            >
              Others
            </button>
          </div>
        </div>
        <div className={styles.rowItem}>
          <div>
            Order Number: <span> *</span>
          </div>
          {orderType == 1 ? (
            <div className={styles.rowItemDropdown}>
              <SearchableDropdown
                options={orderNumbers}
                label={"orderNo"}
                id={"id"}
                selectedVal={orderNumber}
                handleChange={handleOrderNumberChangeTaps}
                onSearch={getTapsOrders}
              />
            </div>
          ) : (
            <input
              className={styles.rowItemInput}
              placeholder="Enter Order Number..."
              value={orderNumber}
              onChange={(event) => handleOrderNumberChange(event)}
              onBlur={() => handleOrderNumberBlur()}
            ></input>
          )}
        </div>
        <div className={styles.rowItem}>
          <div>
            Fabric/Yarn: <span> *</span>
          </div>
          {orderType == 1 || orderNumberExists ? (
            <div className={styles.rowItemInput}>{article}</div>
          ) : (
            <div className={styles.rowItemDropdown}>
              <SearchableDropdown
                options={articles}
                label={"article_name"}
                id={"id"}
                selectedVal={article}
                handleChange={handleArticleChange}
                onSearch={getArticles}
              />
              <button
                className={styles.dropdownCreateButton}
                onClick={handleCreateArticle}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.rowItem}>
          <div>
            Color: <span> *</span>
          </div>
          {orderType == 1 || orderNumberExists ? (
            <div className={styles.rowItemInput}>{color}</div>
          ) : (
            <div className={styles.rowItemDropdown}>
              <SearchableDropdown
                options={colors}
                label={"color_name"}
                id={"id"}
                selectedVal={color}
                handleChange={handleColorChange}
                onSearch={getColors}
              />
              <button
                className={styles.dropdownCreateButton}
                onClick={handleCreateColor}
              >
                Create
              </button>
            </div>
          )}
        </div>
        <div className={styles.rowItem}>
          <div>
            Category: <span> *</span>
          </div>
          <select
            id="dropdown"
            value={defectCategory}
            onChange={changeCategory}
            className={styles.rowItemDropdown}
          >
            {defectCategories.map((option) => (
              <option key={option.id} value={option.id}>
                {option.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.rowItem}>
          <div>
            Section: <span> *</span>
          </div>
          <select
            id="dropdown"
            value={section}
            onChange={changeSection}
            className={styles.rowItemDropdown}
          >
            {sections.map((option) => (
              <option key={option.value} value={option.id}>
                {option.section_name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.rowItem}>
          <div>
            Type: <span> *</span>
          </div>
          <select
            id="dropdown"
            value={jobType}
            onChange={changeJobType}
            className={styles.rowItemDropdown}
          >
            {jobTypes.map((option) => (
              <option key={option.id} value={option.id}>
                {option.type_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.table}>
          <TableContainer component={Paper} className={styles.tableContainer}>
            <Table sx={{ minWidth: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Defect Code</TableCell>
                  <TableCell>Defect Name</TableCell>
                  <TableCell>Qty (Kg)</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobDetails.map((defect) => (
                  <TableRow sx={{ width: 10 }}>
                    <TableCell className={styles.tableCellMui}>
                      {defect.defect_code}
                    </TableCell>
                    <TableCell className={styles.tableCellMui}>
                      {defect.defect_name}
                    </TableCell>
                    <TableCell className={styles.tableCellMui}>
                      <input
                        className={styles.tableInputQty}
                        type="number"
                        value={defect.qty || ""}
                        onChange={(event) =>
                          handleQtyChange(event, defect.defect_code)
                        }
                      ></input>
                    </TableCell>
                    <TableCell className={styles.tableCellMui}>
                      <input
                        className={styles.tableInputCmt}
                        value={defect.comment || ""}
                        onChange={(event) =>
                          handleCmtChange(event, defect.defect_code)
                        }
                        placeholder="N/A"
                      ></input>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className={styles.rowWithoutJustify}>
        <div className={styles.remarks}>Remarks:</div>
        <div className={styles.remarksInput}>
          <input
            placeholder="Type your remarks..."
            onChange={(event) => handleRemarksChange(event)}
          ></input>
        </div>
        <div className={styles.createJobButton}>
          <Button variant="contained" onClick={() => handleCreateJob()}>
            Create Job
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobEntry;
