import styles from "./styles/input.module.css";
import { Field } from "formik";

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
