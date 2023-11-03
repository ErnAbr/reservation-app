import React from "react";
import styles from "./styles/textError.module.css";

export const TextErrorRadio = ({ children }) => {
  return <div className={styles.errorRadio}>{children}</div>;
};
