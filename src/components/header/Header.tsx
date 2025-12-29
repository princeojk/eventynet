import React from "react";
import MainNavbar from "../navbars/mainNavbar/mainNavbar";
import css from "./header.module.scss";

// interface headerProps {}

const Header: React.FC = () => {
  return (
    <div className={css.headerContainer}>
      <MainNavbar />
      <div className={css.mainText}>
        <h1>Event Predictions Platform</h1>
      </div>
      <div className={css.divider}></div>
    </div>
  );
};

export default Header;
