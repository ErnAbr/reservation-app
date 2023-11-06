import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./styles/header.module.css";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../services/LoginProvider";
import { useLogout } from "../../services/useLogout";
import { LOGOUT_API } from "../../assets/constants/constants";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAdmin, setData, setIsAdmin } = useContext(LoginContext);

  const navigate = useNavigate();
  const logout = useLogout(setData, LOGOUT_API);

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  const handleLogout = async () => {
    setIsActive(false);
    setIsAdmin(null);
    navigate("/");
    await logout();
  };

  const handleHamburger = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavLinkClick = () => {
    setIsActive(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isDropdownOpen]);

  return (
    <nav>
      <ul
        className={`${styles.navigationWrapper} ${
          isActive ? styles.navResponsive : ""
        }`}
      >
        {isAdmin === null && (
          <>
            <li onClick={handleNavLinkClick}>
              <NavLink to="/">Login</NavLink>
            </li>
            <li onClick={handleNavLinkClick}>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}

        {isAdmin === true && (
          <>
            <li onClick={handleNavLinkClick}>
              <NavLink to="/admin">Admin</NavLink>
            </li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Log Out
            </button>
          </>
        )}

        {isAdmin === false && (
          <>
            <li onClick={handleNavLinkClick}>
              <NavLink to="/client">Client</NavLink>
            </li>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Log Out
            </button>
          </>
        )}
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
