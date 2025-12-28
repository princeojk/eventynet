import React from "react";
import MainNavbar from "../navbars/mainNavbar/mainNavbar";
import css from "./header.module.scss";

interface headerProps {
  user: string;
}

const user = "d";
const Header: React.FC<headerProps> = () => {
  return (
    <div className={css.headerContainer}>
      <MainNavbar user={user} />
      <div className={css.mainText}>
        <h1>Event Predictions Platform</h1>
      </div>
      <div className={css.divider}></div>
    </div>
  );
};

export default Header;
