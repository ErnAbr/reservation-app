import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./styles/loginForm.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../services/useLogin";

export const LoginForm = () => {
  const { login, loading, error } = useContext(LoginContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    await login(values);
    if (error) {
      console.error(error);
    }
    resetForm();
  };

  return (
    <>
      <h2>Please Log In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form>
            <div className={styles.formControl}>
              <label htmlFor="email">E-Mail</label>
              <Field name="email">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className={`${
                      meta.touched && meta.error ? styles.error : ""
                    }`}
                  />
                )}
              </Field>
            </div>

            <div className={styles.formControl}>
              <label htmlFor="password">Password</label>
              <Field name="password">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="text"
                    id="password"
                    className={`${
                      meta.touched && meta.error ? styles.error : ""
                    }`}
                  />
                )}
              </Field>
            </div>
            <div className={styles.callToRegister}>
              You Can Register <Link to="/register">Here</Link>
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
