import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import NavPanel from "../components/NavPanel";
import styles from "../css/MainLayout.module.css";
import JobEntry from "../components/JobEntry";
import TransferToHr from "../components/TransferToHr";
import { NotificationContainer } from "react-notifications";
import SellOrDispose from "../components/SellOrDispose";
import { useNavigate } from "react-router-dom";
import Reports from "../components/Reports";

function MainLayout() {
  const navigate = useNavigate();
  const [renderedComponent, setRenderedComponent] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_name") == null) {
      navigate("/");
    }
    // else {
    //   if (!localStorage.getItem("permissions").includes("edit_inspection")) {
    //     return navigate("/access-denied");
    //   }
    // }
  }, []);

  return (
    <div className={styles.container}>
      <HeaderBar />
      <div className={styles.bottomSection}>
        <NavPanel onSetRender={setRenderedComponent} />
        <div className={styles.bottomRightSection}>
          {(() => {
            switch (true) {
              case renderedComponent === "create_job":
                return <JobEntry />;
              case renderedComponent === "transfer_to_hr":
                return <TransferToHr />;
              case renderedComponent === "sell_dispose":
                return <SellOrDispose />;
              case renderedComponent === "reports":
                return <Reports />;
              default:
                return null;
            }
          })()}
        </div>
        <NotificationContainer />
      </div>
    </div>
  );
}

export default MainLayout;
