import { Navigation } from "./Navigation";
import styles from "./styles/header.module.css";
import logo from "../../assets/images/logo.png";

export const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="LOGO" />
      </div>
      <Navigation />
    </header>
  );
};
