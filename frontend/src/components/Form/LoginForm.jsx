import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./styles/form.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../services/LoginProvider";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { emailRegex } from "../../assets/constants/constants";

export const LoginForm = () => {
  const { login, loading, error } = useContext(LoginContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegex).required(),
    password: Yup.string().required(),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    await login({ email: email.toLowerCase(), password });
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
        <Form>
          <Input labelName="E-Mail" name="email" type="email" id="email" />
          <Input
            labelName="Password"
            name="password"
            type="password"
            id="password"
          />
          <div className={styles.callToRegister}>
            You Can Register <Link to="/register">Here</Link>
          </div>
          <Button type="submit" btnName="Submit" className="btnStyle" />
        </Form>
      </Formik>
    </>
  );
};
