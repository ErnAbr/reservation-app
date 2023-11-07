import React from "react";
import styles from "./styles/textError.module.css";
import PropTypes from "prop-types";

export const TextErrorRadio = ({ children }) => {
  return <div className={styles.errorRadio}>{children}</div>;
};

TextErrorRadio.propTypes = {
  children: PropTypes.node.isRequired,
};
