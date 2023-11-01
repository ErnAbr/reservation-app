import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./styles/loginForm.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../services/LoginProvider";
import { Input } from "../Input/Input";

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
              <Input labelName="E-Mail" name="email" type="email" id="email" />
            </div>
            <div className={styles.formControl}>
              <Input
                labelName="Password"
                name="password"
                type="text"
                id="password"
              />
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
