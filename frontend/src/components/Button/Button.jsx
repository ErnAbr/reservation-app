import PropTypes from "prop-types";
import styles from "./styles/button.module.css";

export const Button = ({ type, btnName, className, onClick }) => {
  const buttonClass = `${styles[className] || ""}`;

  return (
    <button onClick={onClick} className={buttonClass} type={type}>
      {btnName}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  btnName: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
