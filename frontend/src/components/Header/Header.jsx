import { Navigation } from "./Navigation";
import styles from "./styles/header.module.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logo} alt="LOGO" />
        </Link>
      </div>
      <Navigation />
    </header>
  );
};
