import PropTypes from "prop-types";
import { Field } from "formik";
import styles from "./styles/input.module.css";

export const Input = ({ type, id, name, labelName }) => {
  return (
    <>
      <label htmlFor={name}>{labelName}</label>
      <Field name={name}>
        {({ field, meta }) => (
          <input
            {...field}
            type={type}
            id={id}
            className={`${meta.touched && meta.error ? styles.error : ""}`}
          />
        )}
      </Field>
    </>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
};
