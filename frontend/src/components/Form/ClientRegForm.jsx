import { Formik, Form } from "formik";
import * as Yup from "yup";
import { emailRegex } from "../../assets/constants/constants";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { DatePicker } from "../DatePicker/DatePicker";
import { TextErrorRadio } from "../TextError/TextErrorRadio";
import { usePost } from "../../services/usePost";
import { CLIENT_REG_API } from "../../assets/constants/constants";
import { LOGOUT_API } from "../../assets/constants/constants";
import { useContext, useEffect } from "react";
import { useLogout } from "../../services/useLogout";
import { useNavigate } from "react-router";
import { LoginContext } from "../../services/LoginProvider";

export const ClientRegFrom = () => {
  const { postData, data, error } = usePost();
  const { setIsAdmin, setData } = useContext(LoginContext);
  const logout = useLogout(setData, LOGOUT_API);
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    registrationDate: null,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().matches(emailRegex).required(),
    phoneNumber: Yup.string()
      .required()
      .test((value) => /^\+?\d+$/.test(value)),
    registrationDate: Yup.date().nullable().required("required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log(values);
    await postData(values, CLIENT_REG_API);
    resetForm();
  };

  useEffect(() => {
    (async () => {
      if (error) {
        alert(error.message);
        try {
          setIsAdmin(null);
          navigate("/");
          await logout();
        } catch (logoutError) {
          console.error("Logout failed:", logoutError);
        }
      } else if (data) {
        alert(data.message);
      }
    })();
  }, [data, error, logout, navigate, setIsAdmin]);

  return (
    <>
      <span>Register a Client for a Visit</span>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
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
            <Input labelName="E-Mail" name="email" type="email" id="email" />
            <Input
              labelName="Phone Number"
              name="phoneNumber"
              type="text"
              id="phoneNumber"
            />
            <DatePicker
              name="registrationDate"
              value={values.registrationDate}
              onChange={setFieldValue}
              errorMsg={true}
              component={TextErrorRadio}
            />
            <Button
              type="submit"
              btnName="Register Client"
              className="btnStyle"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
