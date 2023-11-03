import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles/form.module.css";
import { emailRegex } from "../../assets/constants/constants";
import { userRoleOptions } from "../../assets/constants/constants";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { TextError } from "../TextError/TextError";
import { TextErrorRadio } from "../TextError/TextErrorRadio";
import { RadioInput } from "../RadioInput/RadioInput";
import { REG_API } from "../../assets/constants/constants";
import { usePost } from "../../services/usePost";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const RegForm = () => {
  const { postData, data, error } = usePost();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    repPassword: "",
    isUserAdmin: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegex).required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phoneNumber: Yup.string()
      .required()
      .test("isNumber", "Must be a number", (val) => !isNaN(val))
      .test("isPositive", "Must be positive", (val) => val > 0)
      .test("isInteger", "Must be an integer", (val) =>
        Number.isInteger(Number(val))
      ),
    password: Yup.string().required(),
    repPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords Do Not Match")
      .required(),
    isUserAdmin: Yup.string().required("required"),
  });

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      isAdmin: values.isUserAdmin === "true",
    };

    delete submitValues.isUserAdmin;
    delete submitValues.repPassword;

    try {
      await postData(submitValues, REG_API);
    } catch (e) {
      alert("Registration failed. Please try again.");
      console.error("Registration error:", e);
    }
  };

  useEffect(() => {
    if (data) {
      alert(data);
      navigate("/");
    }
    if (error) {
      alert(error.message);
    }
  }, [data, error, navigate]);

  return (
    <>
      <h2>Please Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className={styles.formControl}>
            <Input labelName="E-Mail" name="email" type="email" id="email" />
          </div>
          <div className={styles.formControl}>
            <Input
              labelName="First Name"
              name="firstName"
              type="text"
              id="firstName"
            />
          </div>
          <div className={styles.formControl}>
            <Input
              labelName="Last Name"
              name="lastName"
              type="text"
              id="lastName"
            />
          </div>
          <div className={styles.formControl}>
            <Input
              labelName="Phone Number"
              name="phoneNumber"
              type="text"
              id="phoneNumber"
            />
          </div>
          <div className={styles.formControl}>
            <Input
              labelName="Password"
              name="password"
              type="password"
              id="password"
            />
          </div>
          <div className={styles.formControl}>
            <Input
              labelName="Repeat Password"
              name="repPassword"
              type="password"
              id="repPassword"
            />
            <ErrorMessage
              name="repPassword"
              component={() => <TextError name="repPassword" />}
            />
          </div>
          <div className={styles.formControl}>
            <RadioInput
              label="Select Your Role"
              name="isUserAdmin"
              options={userRoleOptions}
            />
            <ErrorMessage name="isUserAdmin" component={TextErrorRadio} />
          </div>
          <Button type="submit" btnName="Register" className="btnStyle" />
        </Form>
      </Formik>
    </>
  );
};
