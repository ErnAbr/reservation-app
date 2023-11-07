import { useFormikContext } from "formik";
import styles from "./styles/textError.module.css";
import PropTypes from "prop-types";

export const TextError = ({ name }) => {
  const { values, errors, touched } = useFormikContext();

  const showError = touched[name] && !!errors[name];

  const showPasswordMismatchError =
    name === "repPassword" &&
    values[name] &&
    showError &&
    errors[name] === "Passwords Do Not Match";

  return showPasswordMismatchError ? (
    <div className={styles.error}>{errors[name]}</div>
  ) : null;
};

TextError.propTypes = {
  name: PropTypes.string.isRequired,
};
