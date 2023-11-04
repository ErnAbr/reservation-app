import styles from "./styles/radioInput.module.css";
import React from "react";
import { Field, ErrorMessage } from "formik";

export const RadioInput = ({
  label,
  name,
  options,
  errorMsg,
  component,
  ...rest
}) => {
  return (
    <div className={styles.formControl}>
      <div className={styles.radioInputWrapper}>
        <label>{label}</label>
        <Field name={name} {...rest}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <React.Fragment key={option.key}>
                  <div className={styles.radioControl}>
                    <input
                      type="radio"
                      id={option.value}
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                    />
                    <label htmlFor={option.value}>{option.key}</label>
                  </div>
                </React.Fragment>
              );
            });
          }}
        </Field>
        {errorMsg && <ErrorMessage name={name} component={component} />}
      </div>
    </div>
  );
};
