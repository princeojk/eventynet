import React from "react";
import css from "./mainNavbar.module.scss";
import { NavLink } from "react-router-dom";

interface MainNavbarProps {
  user: string;
}

const MainNavbar: React.FC<MainNavbarProps> = ({ user }) => {
  return (
    <nav className={css.mainNavbar}>
      <ul>
        <Customlink to="/">Site Name</Customlink>
      </ul>
      {user ? (
        <ul>
          <Customlink to="/">Home</Customlink>
          <Customlink to="/profile">Profile</Customlink>
        </ul>
      ) : (
        <ul>
          <Customlink to="/login">Login</Customlink>
          <Customlink to="/signUp">Sign up</Customlink>
        </ul>
      )}
    </nav>
  );
};

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

const Customlink: React.FC<CustomLinkProps> = ({ to, children, ...props }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? css.active : "")}
        {...props}
      >
        {children}
      </NavLink>
    </li>
  );
};
export default MainNavbar;
