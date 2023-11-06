import { Formik, Form } from "formik";
import * as Yup from "yup";
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
      .test((value) => /^\+?\d+$/.test(value)),
    password: Yup.string().required(),
    repPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords Do Not Match")
      .required(),
    isUserAdmin: Yup.string().required("required"),
  });

  const onSubmit = async (values) => {
    const submitValues = {
      ...values,
      email: values.email.toLowerCase(),
      firstName: values.firstName.toLowerCase(),
      lastName: values.lastName.toLowerCase(),
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
      alert(data.message);
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
          <Input labelName="E-Mail" name="email" type="email" id="email" />
          <Input
            labelName="First Name"
            name="firstName"
            type="text"
            id="firstName"
          />
          <Input
            labelName="Last Name"
            name="lastName"
            type="text"
            id="lastName"
          />
          <Input
            labelName="Phone Number"
            name="phoneNumber"
            type="text"
            id="phoneNumber"
          />
          <Input
            labelName="Password"
            name="password"
            type="password"
            id="password"
          />
          <Input
            labelName="Repeat Password"
            name="repPassword"
            type="password"
            id="repPassword"
            errorMsg={true}
            component={() => <TextError name="repPassword" />}
          />
          <RadioInput
            label="Select Your Role"
            name="isUserAdmin"
            options={userRoleOptions}
            errorMsg={true}
            component={TextErrorRadio}
          />
          <Button type="submit" btnName="Register" className="btnStyle" />
        </Form>
      </Formik>
    </>
  );
};
