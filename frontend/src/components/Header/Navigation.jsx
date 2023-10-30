import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./styles/header.module.css";
import { useState } from "react";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsActive(false);
    navigate("/");
  };

  const handleHamburger = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleNavLinkClick = () => {
    setIsActive(false);
  };

  return (
    <nav>
      <ul
        className={`${styles.navigationWrapper} ${
          isActive ? styles.navResponsive : ""
        }`}
      >
        <li onClick={handleNavLinkClick}>
          <NavLink to="/">Login</NavLink>
        </li>
        <li onClick={handleNavLinkClick}>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li onClick={handleNavLinkClick}>
          <NavLink to="/admin">Admin</NavLink>
        </li>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </ul>
      <div
        onClick={handleHamburger}
        className={`${styles.hamburger} ${
          isActive ? styles.navResponsive : ""
        }`}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
    </nav>
  );
};
