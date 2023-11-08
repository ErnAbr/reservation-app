import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./styles/modal.module.css";

export const Modal = ({ children, closeModal }) => {
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay}></div>
      <div className={styles.modal}>
        <button className={styles.modalCloseButton} onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};
